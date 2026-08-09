import ApiError from '@/shared/api/ApiError';
import {
  clearSession,
  getAccessToken,
  getRefreshToken,
  saveSessionExpiredNotice,
  updateTokens,
} from '@/features/auth/session';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080').replace(
  /\/$/,
  '',
);

interface ApiResponse<T> {
  success: boolean;
  code: string;
  message: string;
  data: T;
}

interface RequestOptions {
  auth?: boolean;
  retryOnUnauthorized?: boolean;
}

interface RefreshResponse {
  accessToken: string;
  refreshToken?: string;
}

let refreshPromise: Promise<string> | null = null;
let isHandlingSessionExpiration = false;

async function fetchApi<T>(path: string, init: RequestInit, accessToken?: string | null) {
  const headers = new Headers(init.headers);

  if (!(init.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
    credentials: 'include',
    signal: init.signal ?? AbortSignal.timeout(10_000),
  });
  const body = (await response.json().catch(() => null)) as ApiResponse<T> | null;

  if (!response.ok || !body?.success) {
    throw new ApiError(
      body?.message ?? '서버 요청에 실패했습니다. 잠시 후 다시 시도해주세요.',
      body?.code,
      response.status,
    );
  }

  return body.data;
}

async function refreshAccessToken() {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new ApiError('Refresh Token이 없습니다.', undefined, 401);
  }

  const tokens = await fetchApi<RefreshResponse>(
    '/auth/refresh',
    {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    },
    null,
  );

  updateTokens(tokens.accessToken, tokens.refreshToken);
  return tokens.accessToken;
}

function getRefreshedAccessToken() {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

function expireSession() {
  if (isHandlingSessionExpiration) {
    return;
  }

  isHandlingSessionExpiration = true;
  clearSession();
  saveSessionExpiredNotice();
  window.location.replace('/login');
}

export default async function request<T>(
  path: string,
  init: RequestInit = {},
  options: RequestOptions = {},
): Promise<T> {
  const requiresAuth = options.auth !== false;
  const requestAccessToken = requiresAuth ? getAccessToken() : null;

  try {
    return await fetchApi<T>(path, init, requestAccessToken);
  } catch (error) {
    if (
      !requiresAuth ||
      options.retryOnUnauthorized === false ||
      !(error instanceof ApiError) ||
      error.status !== 401
    ) {
      throw error;
    }

    let accessToken: string;

    try {
      const latestAccessToken = getAccessToken();
      const refreshedAccessToken =
        requestAccessToken && latestAccessToken !== requestAccessToken
          ? latestAccessToken
          : await getRefreshedAccessToken();

      if (!refreshedAccessToken) {
        throw new ApiError('Access Token을 재발급하지 못했습니다.', undefined, 401);
      }

      accessToken = refreshedAccessToken;
    } catch (refreshError) {
      expireSession();
      throw refreshError;
    }

    try {
      // fetchApi를 직접 호출해 재시도 요청에서 다시 토큰 재발급을 시도하지 않는다.
      return await fetchApi<T>(path, init, accessToken);
    } catch (retryError) {
      if (retryError instanceof ApiError && retryError.status === 401) {
        expireSession();
      }

      throw retryError;
    }
  }
}
