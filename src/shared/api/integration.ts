import sharedRequest from '@/shared/api/request';

interface ExternalAccountAuthorizationResponse {
  authorizationUrl: string;
}

export function getExternalAccountAuthorization(
  provider: 'google-calendar' | 'spotify',
  userId: number,
) {
  return sharedRequest<ExternalAccountAuthorizationResponse>(
    `/external-accounts/${provider}/authorization?userId=${userId}`,
    {
      method: 'POST',
    },
  );
}