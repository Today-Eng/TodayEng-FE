import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import checkboxChecked from '@/features/auth/assets/checkbox-checked.svg';
import checkboxUnchecked from '@/features/auth/assets/checkbox-unchecked.svg';
import termsChevron from '@/features/auth/assets/terms-chevron.svg';
import { ApiError, saveAgreements, saveOnboarding } from '@/features/auth/api';
import { OnboardingProgress } from '@/features/auth/components/OnboardingChrome';
import { getOnboardingDraft } from '@/features/auth/session';
import ButtonPair from '@/shared/components/ButtonPair';
import TextLayout from '@/shared/components/TextLayout';

const TERMS = [
  {
    id: 'service',
    apiId: 1,
    required: true,
    hasDetailsLink: true,
    title: '[필수] 서비스 이용약관 동의',
    description:
      '서비스 이용을 위한 기본 약관에 동의합니다. 약관에는 서비스 이용 조건, 회원의 권리와 의무, 서비스 이용 제한 사유 등이 포함되어 있으며, 전문은 [약관 전문 링크]에서 확인하실 수 있습니다.',
  },
  {
    id: 'privacy',
    apiId: 2,
    required: true,
    hasDetailsLink: true,
    title: '[필수] 개인정보 수집 및 이용 동의',
    description:
      '회원가입 및 서비스 제공을 위해 이메일, 비밀번호(또는 소셜 로그인 식별값), 닉네임, 그리고 회고 작성 과정에서 생성되는 회고 내용과 질문에 대한 답변을 수집합니다. 수집한 정보는 본인 확인, 회원자격 유지·관리, 회고 작성 지원(맞춤 질문 생성 및 표현 교정)을 위한 목적으로만 이용되며, 회원 탈퇴 시까지 보유한 뒤 파기됩니다. 동의를 거부할 권리가 있으나, 동의하지 않으실 경우 회원가입 및 서비스 이용이 제한됩니다.',
  },
  {
    id: 'age',
    apiId: 3,
    required: true,
    hasDetailsLink: false,
    title: '[필수] 만 14세 이상입니다.',
    description:
      '만 14세 미만인 경우 법정대리인의 동의가 필요하며, 본 서비스는 만 14세 이상 이용자를 대상으로 합니다.',
  },
  {
    id: 'ai-transfer',
    apiId: 4,
    required: true,
    hasDetailsLink: true,
    title: '[필수] 회고 내용의 AI 처리 및 국외이전 동의',
    description:
      '회고 작성 시 입력하신 내용은 맞춤 질문 생성, 표현 교정, 과거 회고 분석을 위해 [LLM 업체명]의 서버(국가: [국가명])로 전송되어 처리됩니다. 이는 서비스의 핵심 기능 제공을 위해 필요한 처리이며, 동의하지 않으실 경우 회원가입 및 서비스 이용이 제한됩니다.',
  },
  {
    id: 'calendar',
    apiId: 5,
    required: false,
    hasDetailsLink: false,
    title: '[선택] 캘린더 연동을 위한 일정 정보 수집 동의',
    description:
      '캘린더 연동 기능을 이용하시면 연동된 캘린더의 일정 정보를 수집하여 회고 작성 시 관련 일정을 참고 자료로 제공해 드립니다. 동의하지 않으셔도 서비스 이용에 제한이 없으며, 캘린더 연동 기능만 이용하실 수 없습니다. 보유 기간은 연동 해제 또는 회원 탈퇴 시까지입니다.',
  },
  {
    id: 'spotify',
    apiId: 6,
    required: false,
    hasDetailsLink: false,
    title: '[선택] 스포티파이 연동을 위한 정보 수집 동의',
    description:
      '스포티파이 계정 연동 시 재생 기록, 플레이리스트 등 [실제 가져오는 데이터 항목]을 수집하여 [실제 이용 목적 — 예: AI 대화 콘텐츠 추천, 학습 콘텐츠 매칭 등]에 활용합니다. 동의하지 않으셔도 서비스 이용에 제한이 없으며, 스포티파이 연동 기능만 이용하실 수 없습니다. 보유 기간은 연동 해제 또는 회원 탈퇴 시까지입니다.',
  },
  {
    id: 'location',
    apiId: 7,
    required: false,
    hasDetailsLink: false,
    title: '[선택] 위치정보 수집 및 이용 동의',
    description:
      '회고 작성 시 [실제 목적 — 예: 방문한 장소 자동 태깅, 주변 장소 추천 등]을 위해 기기의 위치정보(GPS)를 수집·이용합니다. 위치정보는 회고 작성 시점에 일시적으로 수집되며, [보유 기간 — 예: 회고에 첨부된 위치 정보는 해당 회고 삭제 시 또는 회원 탈퇴 시까지 보유]됩니다. 동의하지 않으셔도 서비스 이용에 제한이 없으며, 위치 기반 기능만 이용하실 수 없습니다. 위치정보는 「위치정보의 보호 및 이용 등에 관한 법률」에 따라 별도로 관리되며, 만 14세 미만 아동의 경우 법정대리인의 동의가 추가로 필요할 수 있습니다.',
  },
  {
    id: 'exif',
    apiId: 8,
    required: false,
    hasDetailsLink: false,
    title: '[선택] 위치 메타데이터(EXIF GPS) 수집 동의',
    description:
      '회고에 사진을 첨부하시는 경우, 사진 파일에 포함된 EXIF 메타데이터 중 촬영 위치(GPS 좌표) 정보를 추출하여 [실제 목적 — 예: 회고 작성 시 촬영 장소 자동 표시, 장소 기반 회고 정리 등]에 활용합니다. 동의하지 않으실 경우 위치 정보는 자동으로 제거된 상태로 사진이 저장되며, 서비스 이용에는 제한이 없습니다. 보유 기간은 해당 사진(회고) 삭제 시 또는 회원 탈퇴 시까지입니다.',
  },
  {
    id: 'marketing',
    apiId: 9,
    required: false,
    hasDetailsLink: false,
    title: '[선택] 마케팅 정보 수신 동의',
    description:
      '이벤트, 신규 기능 안내 등 마케팅 목적의 푸시 알림 및 이메일을 받아보실 수 있습니다. 동의하지 않으셔도 서비스 이용에 제한이 없으며, 마이페이지에서 언제든지 수신 설정을 변경하실 수 있습니다.',
  },
] as const;

type TermId = (typeof TERMS)[number]['id'];

const REQUIRED_TERM_IDS = TERMS.filter((term) => term.required).map((term) => term.id);

interface AgreementCheckboxProps {
  checked: boolean;
  label: string;
  onClick: () => void;
}

function AgreementCheckbox({ checked, label, onClick }: AgreementCheckboxProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="size-6 shrink-0 overflow-hidden"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
    >
      <img
        src={checked ? checkboxChecked : checkboxUnchecked}
        alt=""
        className="size-6"
        aria-hidden="true"
      />
    </button>
  );
}

interface TermsAgreementPageProps {
  onSubmit?: (agreements: TermId[]) => void;
}

export default function TermsAgreementPage({ onSubmit }: TermsAgreementPageProps) {
  const navigate = useNavigate();
  const [agreedTerms, setAgreedTerms] = useState<TermId[]>([...REQUIRED_TERM_IDS]);
  const [expandedTerms, setExpandedTerms] = useState<TermId[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const allRequiredAgreed = REQUIRED_TERM_IDS.every((id) => agreedTerms.includes(id));

  const toggleAgreement = (id: TermId) => {
    setAgreedTerms((currentTerms) =>
      currentTerms.includes(id)
        ? currentTerms.filter((currentId) => currentId !== id)
        : [...currentTerms, id],
    );
  };

  const toggleAllAgreements = () => {
    setAgreedTerms(allRequiredAgreed ? [] : TERMS.map((term) => term.id));
  };

  const toggleDetails = (id: TermId) => {
    setExpandedTerms((currentTerms) =>
      currentTerms.includes(id)
        ? currentTerms.filter((currentId) => currentId !== id)
        : [...currentTerms, id],
    );
  };

  const handleSubmit = async () => {
    if (!allRequiredAgreed || isSubmitting) {
      return;
    }

    if (onSubmit) {
      onSubmit(agreedTerms);
      return;
    }

    const { nickname, englishLevel, interestTagIds } = getOnboardingDraft();

    if (!nickname || !englishLevel || !interestTagIds?.length) {
      setErrorMessage('온보딩 정보가 없습니다. 첫 단계부터 다시 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await saveAgreements(
        TERMS.map((term) => ({
          termId: term.apiId,
          agree: agreedTerms.includes(term.id),
        })),
      );
      await saveOnboarding({
        nickname,
        profileUrl: null,
        englishLevel,
        interestTagIds,
      });
      navigate('/onboarding/complete');
    } catch (error) {
      setErrorMessage(
        error instanceof ApiError || error instanceof Error
          ? error.message
          : '회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-dvh w-full bg-white pb-24 text-black">
      <div className="px-[15px]">
        <section className="flex flex-col gap-4">
          <OnboardingProgress currentStep={4} />
          <TextLayout mainText="서비스 이용을 위해 약관에 동의해주세요" mainTextSize="title2" />
        </section>

        <section className="mt-11 flex flex-col gap-10">
          <div className="flex h-[60px] items-center gap-[18px] rounded-full bg-grey-50 px-6">
            <AgreementCheckbox
              checked={allRequiredAgreed}
              label="전체 약관 동의"
              onClick={toggleAllAgreements}
            />
            <button
              type="button"
              onClick={toggleAllAgreements}
              className="text-headline font-semibold tracking-[-0.41px] text-grey-700"
            >
              전체 동의하기
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {TERMS.map((term) => {
              const isAgreed = agreedTerms.includes(term.id);
              const isExpanded = expandedTerms.includes(term.id);

              return (
                <article key={term.id} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-[18px]">
                      <AgreementCheckbox
                        checked={isAgreed}
                        label={`${term.title} ${isAgreed ? '동의 해제' : '동의'}`}
                        onClick={() => toggleAgreement(term.id)}
                      />
                      <button
                        type="button"
                        onClick={() => toggleDetails(term.id)}
                        className={`min-w-0 text-left text-body tracking-[-0.41px] text-grey-700 ${term.hasDetailsLink ? 'underline' : ''}`}
                        aria-expanded={isExpanded}
                      >
                        {term.title}
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleDetails(term.id)}
                      className="flex size-6 shrink-0 items-center justify-center"
                      aria-label={`${term.title} 자세히 ${isExpanded ? '접기' : '보기'}`}
                      aria-expanded={isExpanded}
                    >
                      <img
                        src={termsChevron}
                        alt=""
                        className={`h-[14px] w-2 transition-transform ${isExpanded ? 'rotate-90' : 'rotate-180'}`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  {isExpanded && (
                    <p className="ml-[42px] text-caption1 leading-4 text-grey-500">
                      {term.description}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-4 z-10 w-full bg-white px-4">
        {errorMessage && (
          <p role="alert" className="mb-2 text-center text-footnote text-red-500">
            {errorMessage}
          </p>
        )}
        <ButtonPair
          leftLabel="이전으로"
          rightLabel={isSubmitting ? '처리 중...' : '회원가입'}
          disabled={!allRequiredAgreed || isSubmitting}
          onSkip={() => navigate(-1)}
          onClick={handleSubmit}
        />
      </div>
    </main>
  );
}
