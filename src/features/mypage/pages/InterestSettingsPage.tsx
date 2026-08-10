import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getMyPageProfile, updateInterests } from '@/features/mypage/api/mypageApi';
import BackHeaderLayout from '@/shared/components/BackHeaderLayout';

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

export default function InterestSettingsPage() {
  const navigate = useNavigate();
  const [selectedInterests, setSelectedInterests] = useState<number[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const canSave = selectedInterests.length >= MIN_INTEREST_COUNT;

  useEffect(() => {
    getMyPageProfile()
      .then((profile) =>
        setSelectedInterests(profile.interests.map((interest) => interest.interestTagId)),
      )
      .catch((error: unknown) =>
        setErrorMessage(error instanceof Error ? error.message : '관심사를 불러오지 못했습니다.'),
      );
  }, []);

  const toggleInterest = (interestId: number) => {
    setSelectedInterests((currentInterests) =>
      currentInterests.includes(interestId)
        ? currentInterests.filter((currentInterest) => currentInterest !== interestId)
        : [...currentInterests, interestId],
    );
  };

  const handleSave = async () => {
    if (!canSave) {
      return;
    }

    setIsSaving(true);
    setErrorMessage('');

    try {
      await updateInterests(selectedInterests);
      navigate('/mypage');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '관심사 수정에 실패했습니다.');
      setIsSaving(false);
    }
  };

  return (
    <main className="relative min-h-dvh w-full bg-white pb-10 text-black [&>header]:static [&>header]:h-auto [&>header]:pt-[20px]">
      <BackHeaderLayout
        title="관심사 설정"
        rightAction={{
          type: 'confirm',
          label: isSaving ? '수정 중...' : '수정',
          disabled: !canSave || isSaving,
          onClick: handleSave,
        }}
      />

      <p className="mt-2 px-4 text-subheadline tracking-[-0.24px] text-grey-500">
        * 관심사를 최소 3개 이상 선택해주세요
      </p>
      {errorMessage && <p className="mt-2 px-4 text-footnote text-error-500">{errorMessage}</p>}

      <div className="mt-[47px] flex flex-col gap-[60px] px-4">
        {INTEREST_GROUPS.map((group) => (
          <fieldset key={group.category}>
            <legend className="text-headline font-semibold tracking-[-0.41px]">
              {group.category}
            </legend>

            <div className="mt-4 flex flex-wrap gap-x-3 gap-y-3">
              {group.interests.map((interest) => {
                const isSelected = selectedInterests.includes(interest.id);

                return (
                  <button
                    key={interest.id}
                    type="button"
                    onClick={() => toggleInterest(interest.id)}
                    aria-pressed={isSelected}
                    className={[
                      'rounded-full px-2 py-1.5 text-body tracking-[-0.41px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-main-500 focus-visible:ring-offset-2',
                      isSelected
                        ? 'border border-main-500 bg-main-100 text-main-500'
                        : 'bg-grey-100 text-grey-700',
                    ].join(' ')}
                  >
                    {interest.name}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>
    </main>
  );
}
