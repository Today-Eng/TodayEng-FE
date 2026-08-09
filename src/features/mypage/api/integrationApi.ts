import sharedRequest from '@/shared/api/request';

export type ExternalProvider = 'GOOGLE_CALENDAR' | 'SPOTIFY';

export interface ExternalAccount {
  externalAccountId: number | null;
  provider: ExternalProvider;
  connected: boolean;
  useEnabled: boolean;
  accountIdentifier: string | null;
  connectedAt: string | null;
}

export interface ExternalAccountsData {
  externalAccounts: ExternalAccount[];
}

export interface ExternalAccountSetting {
  provider: ExternalProvider;
  connected: boolean;
  useEnabled: boolean;
}

export interface ExternalAuthorization {
  authorizationUrl: string;
}

export function getExternalAccounts() {
  return sharedRequest<ExternalAccountsData>('/integrations/external-accounts');
}

export function getGoogleCalendarAuthorizationUrl() {
  return sharedRequest<ExternalAuthorization>('/external-accounts/google-calendar/authorization', {
    method: 'POST',
  });
}

export function getSpotifyAuthorizationUrl() {
  return sharedRequest<ExternalAuthorization>('/external-accounts/spotify/authorization', {
    method: 'POST',
  });
}

export function updateExternalAccountSetting(provider: ExternalProvider, useEnabled: boolean) {
  return sharedRequest<ExternalAccountSetting>(`/external-accounts/${provider}/settings`, {
    method: 'PATCH',
    body: JSON.stringify({ useEnabled }),
  });
}

export function disconnectExternalAccount(provider: ExternalProvider) {
  return sharedRequest<null>(`/external-accounts/${provider}`, {
    method: 'DELETE',
  });
}
