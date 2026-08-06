interface GoogleCredentialResponse {
  credential: string;
}

interface GoogleAccountsId {
  initialize(config: {
    client_id: string;
    callback: (response: GoogleCredentialResponse) => void;
    use_fedcm_for_button?: boolean;
  }): void;
  renderButton(
    parent: HTMLElement,
    options: {
      type: 'standard';
      theme: 'outline';
      size: 'large';
      text: 'signin_with';
      shape: 'pill';
      width: number;
    },
  ): void;
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
let initializedClientId: string | null = null;
let activeCredentialHandler: ((idToken: string) => void) | null = null;

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

export async function renderGoogleSignInButton(
  element: HTMLElement,
  onCredential: (idToken: string) => void,
) {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  if (!clientId) {
    throw new Error('VITE_GOOGLE_CLIENT_ID 환경 변수가 설정되지 않았습니다.');
  }

  activeCredentialHandler = onCredential;

  await loadGoogleIdentityScript();

  if (!window.google) {
    throw new Error('Google 로그인을 초기화하지 못했습니다.');
  }

  if (initializedClientId && initializedClientId !== clientId) {
    throw new Error('Google Client ID가 이미 다른 값으로 초기화되었습니다.');
  }

  if (!initializedClientId) {
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: ({ credential }) => activeCredentialHandler?.(credential),
      use_fedcm_for_button: true,
    });
    initializedClientId = clientId;
  }

  window.google.accounts.id.renderButton(element, {
    type: 'standard',
    theme: 'outline',
    size: 'large',
    text: 'signin_with',
    shape: 'pill',
    width: Math.min(element.clientWidth, 400),
  });

  return () => {
    if (activeCredentialHandler === onCredential) {
      activeCredentialHandler = null;
    }
  };
}
