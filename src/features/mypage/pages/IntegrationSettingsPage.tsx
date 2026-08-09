import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import {
  disconnectExternalAccount,
  getExternalAccounts,
  getGoogleCalendarAuthorizationUrl,
  getSpotifyAuthorizationUrl,
  updateExternalAccountSetting,
  type ExternalAccount,
  type ExternalProvider,
} from '@/features/mypage/api/integrationApi';
import { getMyAgreements } from '@/features/mypage/api/mypageApi';
import IntegrationAccountRow from '@/features/mypage/components/IntegrationAccountRow';
import IntegrationSettingRow from '@/features/mypage/components/IntegrationSettingRow';
import type { IntegrationProvider, IntegrationStatus } from '@/features/mypage/types';
import BackHeaderLayout from '@/shared/components/BackHeaderLayout';
import Modal from '@/shared/components/Modal';

const AGREEMENT_TERM_ID: Record<IntegrationProvider, number> = {
  spotify: 6,
  googleCalendar: 5,
};

const API_PROVIDER: Record<IntegrationProvider, ExternalProvider> = {
  spotify: 'SPOTIFY',
  googleCalendar: 'GOOGLE_CALENDAR',
};

const PROVIDER_NAME: Record<IntegrationProvider, string> = {
  spotify: 'Spotify',
  googleCalendar: 'Google Calendar',
};

const OAUTH_POLL_INTERVAL_MS = 1_500;
const OAUTH_MAX_POLL_COUNT = 80;

export default function IntegrationSettingsPage() {
  const [statuses, setStatuses] = useState<Record<IntegrationProvider, IntegrationStatus>>({
    spotify: 'terms-required',
    googleCalendar: 'terms-required',
  });
  const [settings, setSettings] = useState<Record<IntegrationProvider, boolean>>({
    spotify: false,
    googleCalendar: false,
  });
  const [accountIdentifiers, setAccountIdentifiers] = useState<
    Record<IntegrationProvider, string | null>
  >({
    spotify: null,
    googleCalendar: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [pendingSetting, setPendingSetting] = useState<IntegrationProvider | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<IntegrationProvider | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const oauthPopupRef = useRef<Window | null>(null);
  const oauthPollingRef = useRef<number | null>(null);

  const queryClient = useQueryClient();

  const refreshHomeAfterIntegrationChange = async () => {
  queryClient.removeQueries({
    queryKey: ['home-materials'],
    exact: true,
  });

  await queryClient.refetchQueries({
    queryKey: ['home'],
    type: 'all',
  });
};

  useEffect(() => {
    let isActive = true;

    Promise.allSettled([getMyAgreements(), getExternalAccounts()])
      .then(([agreementsResult, externalAccountsResult]) => {
        if (!isActive) return;

        const agreements =
          agreementsResult.status === 'fulfilled' ? agreementsResult.value.agreements : [];
        const hasAgreed = (provider: IntegrationProvider) =>
          agreements.some(
            ({ termId, agreementStatus }) =>
              termId === AGREEMENT_TERM_ID[provider] && agreementStatus === 'AGREED',
          );

        const externalAccounts =
          externalAccountsResult.status === 'fulfilled'
            ? externalAccountsResult.value.externalAccounts
            : [];
        const getAccount = (provider: IntegrationProvider) =>
          externalAccounts.find((account) => account.provider === API_PROVIDER[provider]);
        const getStatus = (provider: IntegrationProvider): IntegrationStatus => {
          if (!hasAgreed(provider)) return 'terms-required';
          return getAccount(provider)?.connected ? 'linked' : 'unlinked';
        };
        const nextStatuses: Record<IntegrationProvider, IntegrationStatus> = {
          spotify: getStatus('spotify'),
          googleCalendar: getStatus('googleCalendar'),
        };

        setStatuses(nextStatuses);
        setSettings({
          spotify: getAccount('spotify')?.useEnabled ?? false,
          googleCalendar: getAccount('googleCalendar')?.useEnabled ?? false,
        });
        setAccountIdentifiers({
          spotify: getAccount('spotify')?.accountIdentifier ?? null,
          googleCalendar: getAccount('googleCalendar')?.accountIdentifier ?? null,
        });

        if (agreementsResult.status === 'rejected') {
          const error = agreementsResult.reason as unknown;
          setErrorMessage(
            error instanceof Error ? error.message : '약관 동의 상태를 불러오지 못했습니다.',
          );
        } else if (externalAccountsResult.status === 'rejected') {
          const error = externalAccountsResult.reason as unknown;
          setErrorMessage(
            error instanceof Error ? error.message : '연동 계정 정보를 불러오지 못했습니다.',
          );
        }
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(
    () => () => {
      if (oauthPollingRef.current !== null) {
        window.clearInterval(oauthPollingRef.current);
      }
      oauthPopupRef.current?.close();
    },
    [],
  );

  const updateStatus = (provider: IntegrationProvider, status: IntegrationStatus) => {
    setStatuses((current) => ({ ...current, [provider]: status }));
    setSettings((current) => ({ ...current, [provider]: status === 'linked' }));
  };

  const stopOAuthPolling = () => {
    if (oauthPollingRef.current !== null) {
      window.clearInterval(oauthPollingRef.current);
      oauthPollingRef.current = null;
    }
    setIsAuthorizing(false);
  };

  const applyExternalAccount = (provider: IntegrationProvider, account: ExternalAccount) => {
    setStatuses((current) => ({
      ...current,
      [provider]: account.connected ? 'linked' : 'unlinked',
    }));
    setSettings((current) => ({ ...current, [provider]: account.useEnabled }));
    setAccountIdentifiers((current) => ({
      ...current,
      [provider]: account.accountIdentifier,
    }));
  };

  const handleLink = async (provider: IntegrationProvider) => {
    if (isAuthorizing) return;

    const providerName = PROVIDER_NAME[provider];
    const requestAuthorization =
      provider === 'googleCalendar'
        ? getGoogleCalendarAuthorizationUrl
        : getSpotifyAuthorizationUrl;

    const popup = window.open(
      '',
      `${provider}-oauth`,
      'popup=yes,width=520,height=720,resizable=yes,scrollbars=yes',
    );

    if (!popup) {
      setErrorMessage('팝업이 차단되었습니다. 팝업을 허용한 뒤 다시 시도해주세요.');
      return;
    }

    oauthPopupRef.current = popup;
    setIsAuthorizing(true);
    setErrorMessage('');

    try {
      const { authorizationUrl } = await requestAuthorization();
      popup.location.replace(authorizationUrl);
      popup.focus();
    } catch (error) {
      popup.close();
      oauthPopupRef.current = null;
      setIsAuthorizing(false);
      setErrorMessage(
        error instanceof Error ? error.message : `${providerName} 연동을 시작하지 못했습니다.`,
      );
      return;
    }

    let pollCount = 0;
    let isPolling = false;

    oauthPollingRef.current = window.setInterval(async () => {
      if (isPolling) return;
      isPolling = true;
      pollCount += 1;

      try {
        const { externalAccounts } = await getExternalAccounts();
        const externalAccount = externalAccounts.find(
          ({ provider: accountProvider }) => accountProvider === API_PROVIDER[provider],
        );

        if (externalAccount?.connected) {
          applyExternalAccount(provider, externalAccount);
          await refreshHomeAfterIntegrationChange();
          stopOAuthPolling();
          popup.close();
          oauthPopupRef.current = null;
          return;
        }

        if (popup.closed || pollCount >= OAUTH_MAX_POLL_COUNT) {
          stopOAuthPolling();
          popup.close();
          oauthPopupRef.current = null;
          setErrorMessage(`${providerName} 연동이 완료되지 않았습니다. 다시 시도해주세요.`);
        }
      } catch {
        if (popup.closed || pollCount >= OAUTH_MAX_POLL_COUNT) {
          stopOAuthPolling();
          popup.close();
          oauthPopupRef.current = null;
          setErrorMessage(`${providerName} 연동 결과를 확인하지 못했습니다.`);
        }
      } finally {
        isPolling = false;
      }
    }, OAUTH_POLL_INTERVAL_MS);
  };

  const handleToggle = async (provider: IntegrationProvider) => {
    if (pendingSetting) return;

    const nextEnabled = !settings[provider];
    setPendingSetting(provider);
    setErrorMessage('');

    try {
      const result = await updateExternalAccountSetting(API_PROVIDER[provider], nextEnabled);
      setSettings((current) => ({ ...current, [provider]: result.useEnabled }));
      await refreshHomeAfterIntegrationChange();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '연동 설정을 변경하지 못했습니다.');
    } finally {
      setPendingSetting(null);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget || isDeleting) return;

    const provider = deleteTarget;
    setIsDeleting(true);
    setErrorMessage('');

    try {
      await disconnectExternalAccount(API_PROVIDER[provider]);
      updateStatus(provider, 'unlinked');
      setAccountIdentifiers((current) => ({ ...current, [provider]: null }));
      setDeleteTarget(null);
      await refreshHomeAfterIntegrationChange();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '연동을 해제하지 못했습니다.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="min-h-screen w-full pt-[68px]">
        <BackHeaderLayout title="연동 관리" />

        {errorMessage && (
          <p role="alert" className="px-4 pb-3 text-footnote text-error-500">
            {errorMessage}
          </p>
        )}

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
              email={accountIdentifiers[provider] ?? undefined}
              disabled={isLoading || isDeleting || isAuthorizing}
              onLink={() => handleLink(provider)}
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
            disabled={statuses.spotify !== 'linked' || isLoading || pendingSetting === 'spotify'}
            onToggle={() => handleToggle('spotify')}
          />
          <IntegrationSettingRow
            title="구글캘린더 연동"
            description="일정으로 AI가 영어 회고 질문을 만들어드려요"
            enabled={settings.googleCalendar}
            disabled={
              statuses.googleCalendar !== 'linked' ||
              isLoading ||
              pendingSetting === 'googleCalendar'
            }
            onToggle={() => handleToggle('googleCalendar')}
          />
        </section>
      </div>

      {deleteTarget && (
        <Modal
          mainText="연동을 삭제하시겠습니까?"
          subText="다시 연동할 수 있어요"
          leftButtonText="취소"
          rightButtonText={isDeleting ? '삭제 중...' : '연동 삭제'}
          onLeftClick={() => {
            if (!isDeleting) setDeleteTarget(null);
          }}
          onRightClick={confirmDelete}
        />
      )}
    </main>
  );
}
