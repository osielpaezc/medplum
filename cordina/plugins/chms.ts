import { MedplumClient, type MedplumClientOptions } from '@medplum/core';
import type { Bundle, SubscriptionStatus } from '@medplum/fhirtypes';

export default defineNuxtPlugin(() => {
  
  const medplum = ref<MedplumClient | null>(null);

  const options = {
    baseUrl: useRuntimeConfig().public.medplumBaseUrl,
    clientId: useRuntimeConfig().public.medplumClientId,
    clientSecret: useRuntimeConfig().public.medplumClientSecret,
    onUnauthenticated: () => {
      const chmsStore = useChmsStore()
      console.log('CHMS is getting user unauthenticated');
      chmsStore.setLoggedIn(false)
      //useRouter().push('/logoff');
    },
  } as MedplumClientOptions;

  if (!medplum.value) medplum.value = new MedplumClient(options);

  const masterEmitter = medplum.value.getMasterSubscriptionEmitter();

  masterEmitter.addEventListener('heartbeat', (bundle: Bundle<SubscriptionStatus>) => {
    console.log(bundle?.entry?.[0]?.resource); // A `SubscriptionStatus` of type `heartbeat`
  });

  return {
    provide: {
      chms: computed(() => medplum.value).value as MedplumClient
    },
  };
});
