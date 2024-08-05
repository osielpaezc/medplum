// plugins/medplum.ts
import { defineNuxtPlugin } from '#app';
import { MedplumClient, type MedplumClientOptions } from '@medplum/core';

export default defineNuxtPlugin({
  name: 'Medplum Service Client Nuxt Plugin',
  enforce: 'pre', // or 'post'
  parallel: true,
  async setup(nuxtApp) {
    const { medplumBaseUrl, medplumClientId, medplumClientSecret } = useRuntimeConfig();

    const config = {
      baseUrl: medplumBaseUrl,
      clientId: medplumClientId,
      clientSecret: medplumClientSecret,
      onUnauthenticated: () => {
        console.info('User is unauthenticated. Redirecting to login...');
        useRouter().push('/login');
      },
    } as MedplumClientOptions;

    console.info('Medplum service client it is being provisioned.');

    const medplum = Medplum.getInstance(config);

    console.info('Medplum service client is ready.');

    return {
      provide: {
        medplum,
      },
    };
  },
  hooks: {
    // You can directly register Nuxt app runtime hooks here
    'app:created'() {
      const nuxtApp = useNuxtApp();
    },
  },
  env: {
    // Set this value to `false` if you don't want the plugin to run when rendering server-only or island components.
    islands: true,
  },
});
