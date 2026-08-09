import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { logout } from '@/features/auth/api';
import { OnboardingProgress } from '@/features/auth/components/OnboardingChrome';
import { disableGoogleAutoSelect } from '@/features/auth/googleIdentity';
import { clearSession, getOnboardingDraft, updateOnboardingDraft } from '@/features/auth/session';
import ButtonPair from '@/shared/components/ButtonPair';
import TextLayout from '@/shared/components/TextLayout';
import CloseCircleIcon from '@/shared/components/icons/CloseCircleIcon';

const MAX_NICKNAME_LENGTH = 20;

interface NicknameSetupPageProps {
  onNext?: (nickname: string) => void;
}

export default function NicknameSetupPage({ onNext }: NicknameSetupPageProps) {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState(() => getOnboardingDraft().nickname ?? '');
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleNext = () => {
    const trimmedNickname = nickname.trim();

    if (!trimmedNickname) {
      return;
    }

    if (onNext) {
      onNext(trimmedNickname);
      return;
    }

    updateOnboardingDraft({ nickname: trimmedNickname });
    navigate('/onboarding/english-level', {
      state: { nickname: trimmedNickname },
    });
  };

  const handlePrevious = async () => {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);

    try {
      await logout();
    } catch {
      // 서버 로그아웃 실패 여부와 관계없이 기기의 로그인 정보는 제거합니다.
    } finally {
      disableGoogleAutoSelect();
      clearSession();
      navigate('/login', { replace: true });
    }
  };

  return (
    <main className="relative min-h-dvh w-full bg-white text-black">
      <div className="px-4">
        <section className="flex flex-col gap-4">
          <OnboardingProgress currentStep={1} />

          <TextLayout
            mainText="사용할 닉네임을 설정해주세요"
            subText="대화할 때 AI가 이 이름으로 불러드려요"
            mainTextSize="title2"
          />
        </section>

        <section className="mt-11 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <label htmlFor="nickname" className="text-headline font-semibold tracking-[-0.41px]">
              닉네임
            </label>
            <span className="text-caption1 text-grey-500">최대 20자</span>
          </div>

          <div className="flex h-[52px] items-center gap-1 rounded-full border border-grey-800 bg-white px-4 py-[14px] focus-within:border-main-500">
            <input
              id="nickname"
              type="text"
              value={nickname}
              maxLength={MAX_NICKNAME_LENGTH}
              onChange={(event) => setNickname(event.target.value)}
              className="min-w-0 flex-1 bg-transparent text-body tracking-[-0.41px] outline-none"
              placeholder="닉네임을 입력해주세요"
              autoComplete="nickname"
            />
            {nickname && (
              <button
                type="button"
                onClick={() => setNickname('')}
                className="flex size-6 shrink-0 items-center justify-center"
                aria-label="닉네임 지우기"
              >
                <CloseCircleIcon />
              </button>
            )}
          </div>
        </section>
      </div>

      <div className="absolute inset-x-0 bottom-4 px-4">
        <ButtonPair
          leftLabel="이전으로"
          rightLabel="다음으로"
          disabled={!nickname.trim() || isLoggingOut}
          onSkip={handlePrevious}
          onClick={handleNext}
        />
      </div>
    </main>
  );
}
