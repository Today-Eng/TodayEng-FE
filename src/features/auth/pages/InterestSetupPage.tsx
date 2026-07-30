import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { OnboardingProgress } from '@/features/auth/components/OnboardingChrome';
import { getOnboardingDraft, updateOnboardingDraft } from '@/features/auth/session';
import ButtonPair from '@/shared/components/ButtonPair';

const MIN_INTEREST_COUNT = 3;

const INTEREST_GROUPS = [
  {
    category: '엔터테인먼트 / 예술',
    interests: [
      { id: 1, name: '문화/책' },
      { id: 2, name: '영화' },
      { id: 3, name: '미술/디자인' },
      { id: 4, name: '공연/전시' },
      { id: 5, name: '음악' },
      { id: 6, name: '드라마' },
      { id: 7, name: '스타/연예인' },
      { id: 8, name: '만화/애니' },
      { id: 9, name: '방송' },
    ],
  },
  {
    category: '생활 / 노하우 / 쇼핑',
    interests: [
      { id: 10, name: '일상/생각' },
      { id: 11, name: '육아/결혼' },
      { id: 12, name: '애완/반려동물' },
      { id: 13, name: '좋은글/이미지' },
      { id: 14, name: '패션/미용' },
      { id: 15, name: '인테리어/DIY' },
      { id: 16, name: '원예/재배' },
      { id: 17, name: '상품리뷰' },
      { id: 18, name: '요리/레시피' },
    ],
  },
  {
    category: '취미 / 여가 / 여행',
    interests: [
      { id: 19, name: '게임' },
      { id: 20, name: '스포츠' },
      { id: 21, name: '사진' },
      { id: 22, name: '자동차' },
      { id: 23, name: '취미' },
      { id: 24, name: '국내여행' },
      { id: 25, name: '세계여행' },
      { id: 26, name: '맛집' },
    ],
  },
] as const;

interface InterestLocationState {
  nickname?: string;
  englishLevel?: string;
}

interface InterestSetupPageProps {
  onNext?: (interestTagIds: number[]) => void;
}

export default function InterestSetupPage({ onNext }: InterestSetupPageProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const draft = getOnboardingDraft();
  const [selectedInterests, setSelectedInterests] = useState<number[]>(draft.interestTagIds ?? []);
  const { nickname = draft.nickname ?? '사용자' } =
    (location.state as InterestLocationState | null) ?? {};
  const canContinue = selectedInterests.length >= MIN_INTEREST_COUNT;

  const toggleInterest = (interestTagId: number) => {
    setSelectedInterests((currentInterests) =>
      currentInterests.includes(interestTagId)
        ? currentInterests.filter((currentInterest) => currentInterest !== interestTagId)
        : [...currentInterests, interestTagId],
    );
  };

  const handleNext = () => {
    if (!canContinue) {
      return;
    }

    if (onNext) {
      onNext(selectedInterests);
      return;
    }

    updateOnboardingDraft({ interestTagIds: selectedInterests });
    navigate('/onboarding/terms', {
      state: {
        ...((location.state as InterestLocationState | null) ?? {}),
        interests: selectedInterests,
      },
    });
  };

  return (
    <main className="relative mx-auto min-h-dvh w-full max-w-[402px] bg-white pb-24 text-black">

      <div className="px-4 pt-4">
        <section className="flex flex-col gap-4">
          <OnboardingProgress currentStep={2} />

          <div className="flex flex-col gap-1">
            <h1 className="whitespace-pre-line text-title2 font-semibold tracking-[0.35px]">
              {`${nickname}님의 관심사 태그를\n최소 3개 이상 선택해주세요`}
            </h1>
            <p className="text-subheadline tracking-[-0.24px] text-grey-600">
              나중에 마이페이지에서 관심사 태그를 수정할 수 있어요
            </p>
          </div>
        </section>

        <div className="mt-11 flex flex-col gap-4">
          {INTEREST_GROUPS.map((group) => (
            <fieldset key={group.category} className="flex flex-col gap-4">
              <legend className="text-headline font-semibold tracking-[-0.41px]">
                {group.category}
              </legend>
              <div className="flex flex-wrap gap-x-3 gap-y-3">
                {group.interests.map((interest) => {
                  const isSelected = selectedInterests.includes(interest.id);

                  return (
                    <button
                      key={interest.id}
                      type="button"
                      onClick={() => toggleInterest(interest.id)}
                      aria-pressed={isSelected}
                      className={`rounded-full border px-2 py-1.5 text-body tracking-[-0.41px] transition-colors ${
                        isSelected
                          ? 'border-main-500 bg-main-100 text-main-500'
                          : 'border-transparent bg-grey-100 text-grey-700'
                      }`}
                    >
                      {interest.name}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-4 z-10 mx-auto w-full max-w-[402px] bg-white px-4">
        <ButtonPair
          leftLabel="이전으로"
          rightLabel="다음으로"
          disabled={!canContinue}
          onSkip={() => navigate(-1)}
          onClick={handleNext}
        />
      </div>
    </main>
  );
}
