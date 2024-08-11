import { MedplumClient, type MedplumClientOptions } from '@medplum/core';

export default defineNuxtPlugin(() => {
  const medplum = ref<MedplumClient | null>(null);
  const instance = computed(() => medplum.value);

  const options = {
    baseUrl: useRuntimeConfig().public.medplumBaseUrl,
    clientId: useRuntimeConfig().public.medplumClientId,
    clientSecret: useRuntimeConfig().public.medplumClientSecret,
    // onUnauthenticated: () => {
    //   console.log('User is unauthenticated. Redirecting to login...');
    //   //useRouter().push('/logoff');
    // },
  } as MedplumClientOptions;

  if (!medplum.value) medplum.value = new MedplumClient(options);

  const authorize = async (userId: string, accessToken: string) => {
    return await instance.value.exchangeExternalAccessToken(accessToken);
  };

  return {
    provide: {
      chms: instance.value
    },
  };
});
