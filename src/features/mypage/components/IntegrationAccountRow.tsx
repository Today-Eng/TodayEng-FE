import IntegrationIcon from '@/features/mypage/components/IntegrationIcon';
import type { IntegrationProvider, IntegrationStatus } from '@/features/mypage/types';

const PROVIDER_LABEL: Record<IntegrationProvider, string> = {
  spotify: '스포티파이',
  googleCalendar: '구글캘린더',
};

interface IntegrationAccountRowProps {
  provider: IntegrationProvider;
  status: IntegrationStatus;
  email?: string;
  disabled?: boolean;
  onLink: () => void;
  onDelete: () => void;
}

export default function IntegrationAccountRow({
  provider,
  status,
  email,
  disabled = false,
  onLink,
  onDelete,
}: IntegrationAccountRowProps) {
  const isSpotify = provider === 'spotify';
  const isLinked = status === 'linked';
  const isLinkDisabled = status === 'terms-required' || disabled;

  return (
    <div className="flex min-h-[70px] items-center gap-3 px-4 py-3">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <div className="flex w-[96px] shrink-0 items-center gap-2">
          <IntegrationIcon provider={provider} />
          <span
            className={[
              'whitespace-nowrap rounded-full px-1.5 py-1 text-footnote font-semibold tracking-[-0.08px]',
              isSpotify ? 'bg-success-100 text-success-500' : 'bg-grey-100 text-grey-700',
            ].join(' ')}
          >
            {PROVIDER_LABEL[provider]}
          </span>
        </div>

        {isLinked && (
          <span className="min-w-0 flex-1 break-all text-caption1 text-grey-600">
            {email ?? '이메일 정보 없음'}
          </span>
        )}
      </div>

      {isLinked ? (
        <button
          type="button"
          disabled={disabled}
          onClick={onDelete}
          className="h-8 shrink-0 rounded-full bg-error-100 px-5 text-xs font-semibold text-error-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          연동 삭제
        </button>
      ) : (
        <button
          type="button"
          disabled={isLinkDisabled}
          onClick={onLink}
          className={[
            'h-8 shrink-0 rounded-full px-5 text-xs font-semibold',
            isLinkDisabled
              ? 'cursor-not-allowed bg-grey-100 text-grey-300'
              : 'bg-main-100 text-main-500',
          ].join(' ')}
        >
          연동
        </button>
      )}
    </div>
  );
}
