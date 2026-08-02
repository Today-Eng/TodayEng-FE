import ApiError from '@/shared/api/ApiError';

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
  accessToken?: string | null;
}

export default async function request<T>(
  path: string,
  init: RequestInit = {},
  options: RequestOptions = {},
): Promise<T> {
  const headers = new Headers(init.headers);

  headers.set('Content-Type', 'application/json');

  if (options.accessToken) {
    headers.set('Authorization', `Bearer ${options.accessToken}`);
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
