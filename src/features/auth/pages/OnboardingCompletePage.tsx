import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import completeBackground from '@/features/auth/assets/onboarding-complete-bg.svg';
import completeIcon from '@/features/auth/assets/onboarding-complete-icon.svg';
import { completeOnboarding } from '@/features/auth/session';
import Button from '@/shared/components/Button';

interface OnboardingCompletePageProps {
  onStartFirstRetrospect?: () => void;
}

export default function OnboardingCompletePage({
  onStartFirstRetrospect,
}: OnboardingCompletePageProps) {
  const navigate = useNavigate();

  useEffect(() => {
    completeOnboarding();
  }, []);

  const finishOnboarding = (destination: '/home' | '/retrospect') => {
    if (destination === '/retrospect' && onStartFirstRetrospect) {
      onStartFirstRetrospect();
      return;
    }

    navigate(destination, { replace: true });
  };

  return (
    <main className="relative mx-auto min-h-dvh w-full max-w-[402px] bg-white text-black">

      <div className="absolute left-1/2 top-1/2 flex w-[370px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-20">
        <section className="flex w-[268px] flex-col items-center gap-6 text-center">
          <div className="relative h-[135px] w-[138px]" aria-hidden="true">
            <img
              src={completeBackground}
              alt=""
              className="absolute left-0 top-0 h-[117px] w-[117px]"
            />
            <img
              src={completeIcon}
              alt=""
              className="absolute bottom-0 right-0 h-[104px] w-[104px]"
            />
          </div>

          <div className="flex flex-col items-center gap-1">
            <h1 className="whitespace-pre-line text-title2 font-semibold tracking-[0.35px]">
              {'회원가입이 완료되셨습니다\n첫 회고를 작성하러 가볼까요?'}
            </h1>
            <p className="whitespace-pre-line text-subheadline tracking-[-0.24px] text-grey-600">
              {'나중에 마이페이지에서\n캘린더/스포티파이를 연동할 수 있어요.'}
            </p>
          </div>
        </section>

        <div className="flex w-full flex-col gap-2">
          <Button label="첫 회고 작성하기" onClick={() => finishOnboarding('/retrospect')} />
          <Button label="건너뛰기" type="sub" onClick={() => finishOnboarding('/home')} />
        </div>
      </div>
    </main>
  );
}
