import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { OnboardingProgress } from '@/features/auth/components/OnboardingChrome';
import type { EnglishLevel } from '@/features/auth/api';
import { getOnboardingDraft, updateOnboardingDraft } from '@/features/auth/session';
import ButtonPair from '@/shared/components/ButtonPair';
import TextLayout from '@/shared/components/TextLayout';

interface LevelOption {
  value: EnglishLevel;
  title: string;
  description: [string, string];
}

interface NicknameLocationState {
  nickname?: string;
}

const LEVEL_OPTIONS: LevelOption[] = [
  {
    value: 'BEGINNER',
    title: '아직 영어가 어색해요',
    description: [
      '간단한 인사와 자기소개 정도는 할 수 있어요.',
      '짧은 문장으로 천천히 시작하고 싶어요.',
    ],
  },
  {
    value: 'INTERMEDIATE',
    title: '일상 대화는 어느정도 돼요',
    description: [
      '여행, 관심사에 대한 내 생각을 말할 수 있어요.',
      '좀더 자연스럽게 말하고 싶어요.',
    ],
  },
  {
    value: 'ADVANCED',
    title: '자유롭게 대화하고 싶어요',
    description: [
      '간단한 인사와 자기소개 정도는 할 수 있어요.',
      '짧은 문장으로 천천히 시작하고 싶어요.',
    ],
  },
];

interface EnglishLevelSetupPageProps {
  onNext?: (level: EnglishLevel) => void;
}

export default function EnglishLevelSetupPage({ onNext }: EnglishLevelSetupPageProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const draft = getOnboardingDraft();
  const [selectedLevel, setSelectedLevel] = useState<EnglishLevel | null>(
    draft.englishLevel ?? null,
  );
  const { nickname = draft.nickname ?? '사용자' } =
    (location.state as NicknameLocationState | null) ?? {};

  const handleNext = () => {
    if (!selectedLevel) {
      return;
    }

    if (onNext) {
      onNext(selectedLevel);
      return;
    }

    updateOnboardingDraft({ nickname, englishLevel: selectedLevel });
    navigate('/onboarding/interests', {
      state: {
        nickname,
        englishLevel: selectedLevel,
      },
    });
  };

  return (
    <main className="relative min-h-dvh w-full bg-white text-black">
      <div className="px-4 pt-4">
        <section className="flex flex-col gap-4">
          <OnboardingProgress currentStep={2} />

          <TextLayout
            mainText={`${nickname}님의\n현재 영어 레벨을 설정해주세요`}
            subText="나중에 마이페이지에서 학습레벨을 수정할 수 있어요"
            mainTextSize="title2"
          />
        </section>

        <fieldset className="mt-11 flex flex-col gap-4">
          <legend className="sr-only">현재 영어 레벨 선택</legend>
          {LEVEL_OPTIONS.map((option) => {
            const isSelected = selectedLevel === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setSelectedLevel(option.value)}
                aria-pressed={isSelected}
                className={`flex h-[100px] w-full flex-col items-start justify-center gap-1 rounded-2xl px-5 text-left transition-colors ${
                  isSelected
                    ? 'border-[1.5px] border-main-400 bg-main-100 text-main-500'
                    : 'border-[1.5px] border-transparent bg-grey-50 text-grey-500'
                }`}
              >
                <span className="text-subheadline font-semibold tracking-[-0.24px]">
                  {option.title}
                </span>
                <span className="text-footnote tracking-[-0.08px]">
                  {option.description.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </button>
            );
          })}
        </fieldset>
      </div>

      <div className="absolute inset-x-0 bottom-4 px-4">
        <ButtonPair
          leftLabel="이전으로"
          rightLabel="다음으로"
          disabled={!selectedLevel}
          onSkip={() => navigate(-1)}
          onClick={handleNext}
        />
      </div>
    </main>
  );
}
