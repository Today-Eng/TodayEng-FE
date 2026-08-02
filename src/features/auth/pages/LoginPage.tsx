import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ellipse16 from '@/features/auth/assets/ellipse-16.svg';
import ellipse17 from '@/features/auth/assets/ellipse-17.svg';
import ellipse18 from '@/features/auth/assets/ellipse-18.svg';
import ellipse19 from '@/features/auth/assets/ellipse-19.svg';
import { ApiError, loginWithGoogle } from '@/features/auth/api';
import GoogleIcon from '@/features/auth/components/GoogleIcon';
import { requestGoogleIdToken } from '@/features/auth/googleIdentity';
import { saveSession } from '@/features/auth/session';
import LogoIcon from '@/shared/components/icons/LogoIcon';

import './login-font.css';

interface LoginPageProps {
  onGoogleLogin?: () => void;
}

export default function LoginPage({ onGoogleLogin }: LoginPageProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleGoogleLogin = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const idToken = await requestGoogleIdToken();
      const loginResponse = await loginWithGoogle(idToken);

      saveSession(loginResponse);
      onGoogleLogin?.();
      navigate(loginResponse.isNewUser ? '/onboarding/nickname' : '/home', { replace: true });
    } catch (error) {
      setErrorMessage(
        error instanceof ApiError || error instanceof Error
          ? error.message
          : '로그인에 실패했습니다. 잠시 후 다시 시도해주세요.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-dvh w-full overflow-hidden bg-gradient-to-b from-main-500 to-main-400">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <img
          src={ellipse19}
          alt=""
          className="absolute left-1/2 top-[42.1%] h-[868px] w-[868px] max-w-none -translate-x-[54.1%] -translate-y-1/2 -rotate-[41.6deg]"
        />
        <img
          src={ellipse18}
          alt=""
          className="absolute left-1/2 top-[42.1%] h-[665px] w-[665px] max-w-none -translate-x-[55.3%] -translate-y-1/2 rotate-[34.35deg]"
        />
        <img
          src={ellipse16}
          alt=""
          className="absolute left-1/2 top-[42.1%] h-[431px] w-[431px] max-w-none -translate-x-[58.3%] -translate-y-1/2 rotate-[145.46deg]"
        />
        <img
          src={ellipse17}
          alt=""
          className="absolute left-[-62px] top-[122px] size-[374px] max-w-none"
        />
      </div>

      <section className="relative z-10 mx-auto h-[874px] min-h-dvh w-full">
      <div className="flex justify-center pt-[25vh]">
        <div className="relative h-[197px] w-[262px]">
          <LogoIcon width={262} height={197} />
          <div
            className="absolute left-5 top-[207px] -rotate-[11.15deg] font-['NanumSquareRound'] text-[70px] font-extrabold leading-normal tracking-[-1.4px] text-white"
            aria-label="Today Eng"
          >
            Today
          </div>
          <div
            className="absolute left-[206px] top-[177px] rotate-[11.75deg] font-['NanumSquareRound'] text-[50px] font-extrabold leading-normal tracking-[-1px] text-white"
            aria-hidden="true"
          >
            Eng
          </div>
        </div>
      </div>
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="absolute left-1/2 bottom-[239px] flex h-[54px] w-[calc(100%-32px)] -translate-x-1/2 items-center justify-center gap-1 rounded-full bg-white px-5 py-[14px] text-headline font-semibold tracking-[-0.41px] text-black transition-transform active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <GoogleIcon className="size-6 shrink-0" />
          <span className="px-2">{isLoading ? '로그인 중...' : 'Google 로 로그인'}</span>
        </button>
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
