import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ellipse16 from '@/features/auth/assets/ellipse-16.svg';
import ellipse17 from '@/features/auth/assets/ellipse-17.svg';
import ellipse18 from '@/features/auth/assets/ellipse-18.svg';
import ellipse19 from '@/features/auth/assets/ellipse-19.svg';
import { ApiError, loginWithGoogle } from '@/features/auth/api';
import { renderGoogleSignInButton } from '@/features/auth/googleIdentity';
import { clearLoginNotice, getLoginNotice, saveSession } from '@/features/auth/session';
import LogoIcon from '@/shared/components/icons/LogoIcon';
import { restorePushSubscriptionIfNeeded } from '@/features/notification/push';

import './login-font.css';

interface LoginPageProps {
  onGoogleLogin?: () => void;
}

export default function LoginPage({ onGoogleLogin }: LoginPageProps) {
  const navigate = useNavigate();
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(() => getLoginNotice() ?? '');

  useEffect(() => {
    clearLoginNotice();
  }, []);

  useEffect(() => {
    const googleButton = googleButtonRef.current;

    if (!googleButton) {
      return;
    }

    let isActive = true;
    let removeCredentialHandler: (() => void) | undefined;

    const handleCredential = async (idToken: string) => {
      if (!isActive) {
        return;
      }

      setIsLoading(true);
      setErrorMessage('');

      try {
        const loginResponse = await loginWithGoogle(idToken);

        if (!isActive) {
          return;
        }

        saveSession(loginResponse);
        if (!loginResponse.isNewUser) {
          void restorePushSubscriptionIfNeeded().catch(() => {});
        }

        onGoogleLogin?.();

        navigate(loginResponse.isNewUser ? '/onboarding/nickname' : '/home', { replace: true });
      } catch (error) {
        if (isActive) {
          setErrorMessage(
            error instanceof ApiError || error instanceof Error
              ? error.message
              : '로그인에 실패했습니다. 잠시 후 다시 시도해주세요.',
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void renderGoogleSignInButton(googleButton, handleCredential)
      .then((cleanup) => {
        if (isActive) {
          removeCredentialHandler = cleanup;
        } else {
          cleanup();
        }
      })
      .catch((error: unknown) => {
        if (isActive) {
          setErrorMessage(
            error instanceof Error ? error.message : 'Google 로그인 버튼을 불러오지 못했습니다.',
          );
        }
      });

    return () => {
      isActive = false;
      removeCredentialHandler?.();
      googleButton.replaceChildren();
    };
  }, [navigate, onGoogleLogin]);

  return (
    <main className="relative min-h-dvh w-full overflow-hidden bg-gradient-to-b from-main-500 to-[#8862C6]">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[max(100dvh,874px)] w-full max-w-[402px] -translate-x-1/2 overflow-hidden"
        aria-hidden="true"
      >
        <img
          src={ellipse19}
          alt=""
          className="absolute left-1/2 top-[330px] size-[868px] max-w-none -translate-x-[54.1%] -translate-y-1/2 -rotate-[41.6deg]"
        />
        <img
          src={ellipse18}
          alt=""
          className="absolute left-1/2 top-[331px] size-[665px] max-w-none -translate-x-[55.3%] -translate-y-1/2 rotate-[34.35deg]"
        />
        <img
          src={ellipse16}
          alt=""
          className="absolute left-1/2 top-[330px] size-[431px] max-w-none -translate-x-[58.3%] -translate-y-1/2 rotate-[145.46deg]"
        />
        <img
          src={ellipse17}
          alt=""
          className="absolute left-[-62px] top-[122px] size-[374px] max-w-none"
        />
      </div>

      <section className="relative z-10 mx-auto h-[max(100dvh,874px)] w-full max-w-[402px]">
        <div className="absolute left-[calc(50%-185px)] top-[129px] h-[320px] w-[320px] origin-top scale-90 min-[360px]:scale-100">
          <div className="absolute left-6 top-[69px] h-[197px] w-[262px]">
            <LogoIcon width={262} height={197} />
            <div
              className="absolute left-[48px] top-[218px] -rotate-[11.15deg] font-['Nata_Sans'] text-[70px] font-extrabold leading-normal tracking-[-1.4px] text-white"
              aria-label="Today Eng"
            >
              Today
            </div>
            <div
              className="absolute left-[241px] top-[190px] rotate-[11.75deg] font-['Nata_Sans'] text-[50px] font-extrabold leading-normal tracking-[-1px] text-white"
              aria-hidden="true"
            >
              Eng
            </div>
          </div>
        </div>
        <div
          ref={googleButtonRef}
          className={`absolute left-1/2 top-[581px] flex h-[54px] w-[calc(100%-32px)] max-w-[370px] -translate-x-1/2 items-center justify-center ${isLoading ? 'pointer-events-none opacity-60' : ''}`}
          aria-label="Google 로그인"
          aria-busy={isLoading}
        />
        {errorMessage && (
          <p
            role="alert"
            className="absolute left-4 right-4 top-[647px] text-center text-footnote text-white"
          >
            {errorMessage}
          </p>
        )}
      </section>
    </main>
  );
}
