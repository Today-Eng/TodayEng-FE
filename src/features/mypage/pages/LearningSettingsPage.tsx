import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  getMyPageProfile,
  updateEnglishLevel,
  type EnglishLevel,
} from '@/features/mypage/api/mypageApi';
import BackHeaderLayout from '@/shared/components/BackHeaderLayout';

interface LevelOption {
  value: EnglishLevel;
  title: string;
  description: [string, string];
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
    description: ['복잡한 주제도 이해하지만,', '원어민처럼 자연스러운 늬앙스를 더 다듬고 싶어요.'],
  },
];

export default function LearningSettingsPage() {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState<EnglishLevel>('INTERMEDIATE');
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getMyPageProfile()
      .then((profile) => setSelectedLevel(profile.englishLevel))
      .catch((error: unknown) =>
        setErrorMessage(
          error instanceof Error ? error.message : '학습 설정을 불러오지 못했습니다.',
        ),
      );
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setErrorMessage('');

    try {
      await updateEnglishLevel(selectedLevel);
      navigate('/mypage');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '학습 설정 수정에 실패했습니다.');
      setIsSaving(false);
    }
  };

  return (
    <main className="relative min-h-dvh w-full bg-white text-black">
      <header className="relative">
        <BackHeaderLayout title="학습 설정" />
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="absolute right-4 top-5 text-body font-semibold tracking-[-0.32px] text-main-500"
        >
          수정
        </button>
      </header>
      {errorMessage && <p className="px-4 text-footnote text-error-500">{errorMessage}</p>}

      <fieldset className="mt-[131px] flex flex-col gap-[26px] px-4">
        <legend className="sr-only">현재 영어 레벨 선택</legend>

        {LEVEL_OPTIONS.map((option) => {
          const isSelected = selectedLevel === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setSelectedLevel(option.value)}
              aria-pressed={isSelected}
              className={[
                'flex h-[100px] w-full flex-col items-start justify-center gap-1 rounded-2xl px-5 text-left transition-colors',
                isSelected
                  ? 'border-[1.5px] border-main-400 bg-main-100 text-main-500'
                  : 'border-[1.5px] border-transparent bg-grey-50 text-grey-500',
              ].join(' ')}
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
    </main>
  );
}
