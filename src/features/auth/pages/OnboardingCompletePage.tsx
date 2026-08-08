import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import completeBackground from '@/features/auth/assets/onboarding-complete-bg.svg';
import completeIcon from '@/features/auth/assets/onboarding-complete-icon.svg';
import { completeOnboarding } from '@/features/auth/session';
import Button from '@/shared/components/Button';
import TextLayout from '@/shared/components/TextLayout';
import { enablePushNotification } from '@/features/notification/push';
import { updateNotificationSetting } from '@/features/notification/api';
import { startDiary } from '@/features/home/api';

export default function OnboardingCompletePage() {
  const navigate = useNavigate();
  const [isFinishing, setIsFinishing] = useState(false);

  const finishOnboarding = async (destination: 'home' | 'retrospect') => {
    if (isFinishing) return;
    setIsFinishing(true);
    completeOnboarding();

    try {
      await enablePushNotification();
      await updateNotificationSetting(true);
    } catch {
      // 푸시 활성화 실패가 온보딩 완료를 차단하지 않도록 무시
    }

    if (destination === 'retrospect') {
      try {
        const today = new Date();

        const diaryDate = [
          today.getFullYear(),
          String(today.getMonth() + 1).padStart(2, '0'),
          String(today.getDate()).padStart(2, '0'),
        ].join('-');

        const diary = await startDiary(diaryDate);

        navigate(`/retrospect/${diary.diaryId}`, {
          replace: true,
        });

        return;
      } catch {
        // 첫 회고 생성 실패 시 홈으로 이동
        navigate('/home', {
          replace: true,
        });

        return;
      }
    }

    navigate('/home', {
      replace: true,
    });
  };

  return (
    <main className="relative min-h-dvh w-full bg-white text-black">
      <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-20 px-4">
        <section className="flex w-full flex-col items-center gap-6 text-center">
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

          <TextLayout
            mainText={'회원가입이 완료되셨습니다\n첫 회고를 작성하러 가볼까요?'}
            subText={'나중에 마이페이지에서\n캘린더/스포티파이를 연동할 수 있어요.'}
            mainTextSize="title2"
            center
          />
        </section>

        <div className="flex w-full flex-col gap-2">
          <Button label="첫 회고 작성하기" disabled={isFinishing} onClick={() => finishOnboarding('retrospect')} />
          <Button label="건너뛰기" type="sub" disabled={isFinishing} onClick={() => finishOnboarding('home')} />
        </div>
      </div>
    </main>
  );
}
