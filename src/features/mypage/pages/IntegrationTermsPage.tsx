import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import {
  getMyAgreements,
  updateMyAgreements,
  type UserAgreement,
} from '@/features/mypage/api/mypageApi';
import type { IntegrationProvider } from '@/features/mypage/types';
import BackHeaderLayout from '@/shared/components/BackHeaderLayout';
import Button from '@/shared/components/Button';

const TERM_ID_BY_PROVIDER: Record<IntegrationProvider, number> = {
  googleCalendar: 5,
  spotify: 6,
};

const PROVIDER_LABEL: Record<IntegrationProvider, string> = {
  googleCalendar: '구글캘린더',
  spotify: '스포티파이',
};

function isIntegrationProvider(value: string | undefined): value is IntegrationProvider {
  return value === 'googleCalendar' || value === 'spotify';
}

export default function IntegrationTermsPage() {
  const { provider: providerParam } = useParams();
  const navigate = useNavigate();
  const [agreement, setAgreement] = useState<UserAgreement | null>(null);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const provider = isIntegrationProvider(providerParam) ? providerParam : null;
  const termId = provider ? TERM_ID_BY_PROVIDER[provider] : null;

  useEffect(() => {
    if (termId === null) return;

    let isActive = true;

    getMyAgreements()
      .then(({ agreements }) => {
        if (!isActive) return;

        const targetAgreement = agreements.find((item) => item.termId === termId);
        if (!targetAgreement) {
          setErrorMessage('연동 약관을 찾을 수 없습니다.');
          return;
        }

        if (targetAgreement.agreementStatus === 'AGREED') {
          navigate('/mypage/integrations', { replace: true });
          return;
        }

        setAgreement(targetAgreement);
      })
      .catch((error: unknown) => {
        if (!isActive) return;
        setErrorMessage(error instanceof Error ? error.message : '약관을 불러오지 못했습니다.');
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [navigate, termId]);

  if (!provider || termId === null) {
    return <Navigate to="/mypage/integrations" replace />;
  }

  const handleSubmit = async () => {
    if (!isAgreed || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await updateMyAgreements([{ termId, agree: true }]);
      navigate('/mypage/integrations', { replace: true });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '약관 동의를 저장하지 못했습니다.');
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-dvh bg-white pb-28 pt-[62px] text-black [&>header]:h-[62px]">
      <BackHeaderLayout title={`${PROVIDER_LABEL[provider]} 약관 동의`} />

      <div className="px-4 pt-8">
        {isLoading ? (
          <p className="text-body text-grey-500">약관을 불러오는 중입니다.</p>
        ) : agreement ? (
          <section aria-labelledby="integration-term-title">
            <h2 id="integration-term-title" className="text-title2 font-semibold text-grey-900">
              {agreement.title}
            </h2>
            <p className="mt-6 whitespace-pre-wrap text-body leading-6 text-grey-600">
              {agreement.content}
            </p>

            <label className="mt-10 flex cursor-pointer items-center gap-3 text-body font-semibold text-grey-700">
              <input
                type="checkbox"
                checked={isAgreed}
                onChange={(event) => setIsAgreed(event.target.checked)}
                className="size-5 accent-main-500"
              />
              위 약관에 동의합니다.
            </label>
          </section>
        ) : null}

        {errorMessage && (
          <p role="alert" className="mt-4 text-footnote text-error-500">
            {errorMessage}
          </p>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-4 bg-white px-4">
        <Button
          label={isSubmitting ? '저장 중...' : '동의하고 계속'}
          disabled={!agreement || !isAgreed || isSubmitting}
          onClick={handleSubmit}
        />
      </div>
    </main>
  );
}
