import type { NuxtError } from '#app';
import { dateAndTime } from '@/views/demos/forms/form-elements/date-time-picker/demoCodeDateTimePicker';
import { MedplumClient, type MedplumClientOptions, type ProfileResource } from '@medplum/core';

export const useMedplum = () => {
  const { medplumBaseUrl, medplumClientId, medplumClientSecret } = useRuntimeConfig();

  // Reactive state for the MedplumClient instance and authentication status
  const client = ref<MedplumClient | null>(null);
  const isAuthenticated = ref(false);

  // Computed property to get the client instance
  const medplumClient = computed(() => client.value);
  console.debug('HMS (Health Management System) client initializing %s / client: %s', medplumBaseUrl, medplumClientId);
  if (!client.value)
    try {
      console.debug(
        'HMS (Health Management System) client initializing %s / client: %s',
        medplumBaseUrl,
        medplumClientId
      );
      client.value = new MedplumClient({
        baseUrl: medplumBaseUrl,
        clientId: medplumClientId,
        clientSecret: medplumClientSecret,
        onUnauthenticated: () => {
          console.info('User is unauthenticated. Redirecting to login...');
          useRouter().push('/login'); // Ensure this runs client-side
        },
      } as MedplumClientOptions);
      console.info('HMS service initialized.');
    } catch (error) {
      console.error('HMS service failed initializing.');
    }

  // Method to authenticate the user
  const authenticateWithToken = async () => {
    if (!client.value) {
      throw new Error('HMS service is not initialized');
    }

    const { data } = useAuthState();
    const userId = data.value?.user.id;

    await client.value
      .exchangeExternalAccessToken(data.value?.user.token)
      .then((profile: ProfileResource) => {
        if (profile) isAuthenticated.value = true;
        console.info('HMS service authentication success for %s.', userId);
      })
      .catch((err: NuxtError) => {
        console.error('HMS service authentication error for %s.', userId);
        console.debug('%s.', err);
      });
  };

  // Method to fetch a resource
  const getResource = async (resourceType: string, id: string) => {
    if (!client.value) {
      throw new Error('MedplumClient is not initialized');
    }

    try {
      const resource = await client.value.readResource(resourceType, id);
      return resource;
    } catch (error) {
      console.error('Error fetching resource:', error);
      throw error;
    }
  };

  return {
    medplumClient,
    isAuthenticated,
    authenticateWithToken,
    getResource,
  };
};
