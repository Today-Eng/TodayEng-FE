interface GoogleCredentialResponse {
  credential: string;
}

interface GoogleAccountsId {
  initialize(config: {
    client_id: string;
    callback: (response: GoogleCredentialResponse) => void;
  }): void;
  prompt(callback?: (notification: { isNotDisplayed: () => boolean }) => void): void;
  disableAutoSelect(): void;
}

export function disableGoogleAutoSelect() {
  window.google?.accounts.id.disableAutoSelect();
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: GoogleAccountsId;
      };
    };
  }
}

const GOOGLE_SCRIPT_ID = 'google-identity-services';

function loadGoogleIdentityScript() {
  if (window.google) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve, reject) => {
    const existingScript = document.getElementById(GOOGLE_SCRIPT_ID) as HTMLScriptElement | null;

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener('error', () => reject(new Error('Google 로그인 로드 실패')), {
        once: true,
      });
      return;
    }

    const script = document.createElement('script');
    script.id = GOOGLE_SCRIPT_ID;
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Google 로그인 로드 실패'));
    document.head.appendChild(script);
  });
}

export async function requestGoogleIdToken() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  if (!clientId) {
    throw new Error('VITE_GOOGLE_CLIENT_ID 환경 변수가 설정되지 않았습니다.');
  }

  await loadGoogleIdentityScript();

  return new Promise<string>((resolve, reject) => {
    if (!window.google) {
      reject(new Error('Google 로그인을 초기화하지 못했습니다.'));
      return;
    }

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: ({ credential }) => resolve(credential),
    });
    window.google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed()) {
        reject(new Error('Google 로그인 창을 표시하지 못했습니다.'));
      }
    });
  });
}
