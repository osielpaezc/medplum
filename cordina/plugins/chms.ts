import type { CHMSContext } from '@/chms';
import { MedplumClient, type ProfileResource } from '@medplum/core';

const pluginName: string = 'CHMS (Cordina Health Management Service)';

const client = ref<MedplumClient | null>(null);
// computed property to get the client instance
const instance = computed(() => client.value);

const isAuthenticated = ref(false);

async function authenticateWithToken(accessToken: string): Promise<ProfileResource | null> {
  if (!instance.value) {
    throw new Error('HMS service is not initialized');
  }

  try {
    const profile: ProfileResource = await instance.value.exchangeExternalAccessToken(accessToken);

    if (profile) {
      isAuthenticated.value = true;
      console.info('HMS service authentication success.');
    }

    return profile;
  } catch (err) {
    console.error('HMS service authentication error.');
    console.info('Error:', err);
    return null;
  }
}

export default defineNuxtPlugin({
  name: pluginName,
  enforce: 'pre', // or 'post'
  parallel: true,
  async setup(nuxtApp) {
    // this is the equivalent of a normal functional plugin
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
          '%s %s at %s/%s',
          pluginName,
          instance.value?.isInitialized ? 'intialized' : errorMessage,
          customConfig.baseUrl,
          customConfig.clientId
        );
      } catch (e) {
        console.error(
          '%s endpoint: %s/%s; faild initialization becouse %s',
          pluginName,
          customConfig.baseUrl,
          customConfig.clientId,
          e
        );
      }

      // expose pluging objects trough the context interface
      nuxtApp.provide('chms', {
        client,
        authenticateWithToken,
        isAuthenticated,
        isInitialized: ref(instance.value?.isInitialized),
        profile: ref(null),
      } as CHMSContext);
    },
  },
  env: {
    // Set this value to `false` if you don't want the plugin to run when rendering server-only or island components.
    islands: true,
  },
});
