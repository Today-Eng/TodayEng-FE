import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import IntegrationAccountRow from '@/features/mypage/components/IntegrationAccountRow';
import IntegrationSettingRow from '@/features/mypage/components/IntegrationSettingRow';
import type { IntegrationProvider, IntegrationStatus } from '@/features/mypage/types';
import BackHeaderLayout from '@/shared/components/BackHeaderLayout';
import Modal from '@/shared/components/Modal';

function getInitialStatus(queryStatus: string | null): IntegrationStatus {
  if (queryStatus === 'linked' || queryStatus === 'terms-required') return queryStatus;
  return 'unlinked';
}

export default function IntegrationSettingsPage() {
  const [searchParams] = useSearchParams();
  const queryProvider = searchParams.get('provider');
  const queryStatus = getInitialStatus(searchParams.get('status'));
  const initialStatus = (provider: IntegrationProvider): IntegrationStatus =>
    queryProvider === provider ? queryStatus : 'unlinked';
  const [statuses, setStatuses] = useState<Record<IntegrationProvider, IntegrationStatus>>({
    spotify: initialStatus('spotify'),
    googleCalendar: initialStatus('googleCalendar'),
  });
  const [settings, setSettings] = useState<Record<IntegrationProvider, boolean>>({
    spotify: initialStatus('spotify') === 'linked',
    googleCalendar: initialStatus('googleCalendar') === 'linked',
  });
  const [deleteTarget, setDeleteTarget] = useState<IntegrationProvider | null>(null);

  const updateStatus = (provider: IntegrationProvider, status: IntegrationStatus) => {
    setStatuses((current) => ({ ...current, [provider]: status }));
    setSettings((current) => ({ ...current, [provider]: status === 'linked' }));
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    updateStatus(deleteTarget, 'unlinked');
    setDeleteTarget(null);
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="min-h-screen w-full">
        <BackHeaderLayout title="연동 관리" />

        <section aria-labelledby="linked-accounts-heading">
          <h2
            id="linked-accounts-heading"
            className="flex h-[70px] items-center px-4 text-headline tracking-[-0.41px]"
          >
            연동된 계정
          </h2>

          {(['spotify', 'googleCalendar'] as const).map((provider) => (
            <IntegrationAccountRow
              key={provider}
              provider={provider}
              status={statuses[provider]}
              onLink={() => updateStatus(provider, 'linked')}
              onDelete={() => setDeleteTarget(provider)}
            />
          ))}
        </section>

        <div className="h-[10px] bg-grey-50 opacity-80" />

        <section aria-labelledby="integration-settings-heading">
          <h2
            id="integration-settings-heading"
            className="flex h-[70px] items-center px-4 text-headline tracking-[-0.41px]"
          >
            연동 설정
          </h2>

          <IntegrationSettingRow
            title="스포티파이 연동"
            description="들은 노래로 AI가 영어 회고 질문을 만들어드려요"
            enabled={settings.spotify}
            disabled={statuses.spotify !== 'linked'}
            onToggle={() => setSettings((current) => ({ ...current, spotify: !current.spotify }))}
          />
          <IntegrationSettingRow
            title="구글캘린더 연동"
            description="일정으로 AI가 영어 회고 질문을 만들어드려요"
            enabled={settings.googleCalendar}
            disabled={statuses.googleCalendar !== 'linked'}
            onToggle={() =>
              setSettings((current) => ({
                ...current,
                googleCalendar: !current.googleCalendar,
              }))
            }
          />
        </section>
      </div>

      {deleteTarget && (
        <Modal
          mainText="연동을 삭제하시겠습니까?"
          subText="다시 연동할 수 있어요"
          leftButtonText="취소"
          rightButtonText="연동 삭제"
          onLeftClick={() => setDeleteTarget(null)}
          onRightClick={confirmDelete}
        />
      )}
    </main>
  );
}
