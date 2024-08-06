import type { CHMSContext } from '@/chms';
import { MedplumClient, type ProfileResource } from '@medplum/core';

const client = ref<MedplumClient | null>(null);
// computed property to get the client instance
const instance = computed(() => client.value);

const isAuthenticated = ref(false);
const profile = ref<ProfileResource | null>(null);

async function authenticateWithToken(userId: string, accessToken: string): Promise<ProfileResource | null> {
  if (!instance.value) {
    throw new Error('CHMS have not been initialized');
  }

  try {
    profile.value = await instance.value.exchangeExternalAccessToken(accessToken);

    if (profile) {
      isAuthenticated.value = true;
      console.info('%s - CHMS sucessful authentication profile %s', userId, profile.value.id);
    }

    return profile.value;
  } catch (err) {
    console.error('%s - CHMS authentication error', userId);
    console.info('Error:', err);
    return null;
  }
}

export default defineNuxtPlugin({
  name: 'CHMS (Cordina Health Management Service)',
  enforce: 'pre', // or 'post'
  parallel: true,
  async setup(nuxtApp) {
    // this is the equivalent of a normal functional plugin
    // we use hooks since we want he plugin called just once
    // when the app is created
  },
  hooks: {
    // You can directly register Nuxt app runtime hooks here
    'app:created'() {
      const nuxtApp = useNuxtApp();

      let errorMessage;

      // Define a custom configuration for MedplumClient
      const customConfig = {
        baseUrl: useRuntimeConfig().medplumBaseUrl,
        clientId: useRuntimeConfig().medplumClientId,
        clientSecret: useRuntimeConfig().medplumClientSecret,
        onUnauthenticated: () => {
          console.log('User is unauthenticated. Redirecting to login...');
          useRouter().push('/logoff');
        },
      };

      try {
        if (!instance.value) client.value = new MedplumClient(customConfig);
        console.info(
          'CHMS %s at %s/%s',
          instance.value?.isInitialized ? 'intialized' : errorMessage,
          customConfig.baseUrl,
          customConfig.clientId
        );
      } catch (e) {
        console.error(
          'CHMS endpoint: %s/%s; faild initialization becouse %s',
          customConfig.baseUrl,
          customConfig.clientId,
          e
        );
      }

      // expose pluging objects trough the context interface
      nuxtApp.provide('chms', {
        client: instance,
        isInitialized: ref(instance.value?.isInitialized),
      } as CHMSContext);
    },
  },
  env: {
    // Set this value to `false` if you don't want the plugin to run when rendering server-only or island components.
    islands: true,
  },
});
