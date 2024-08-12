import { storeToRefs } from 'pinia';
import type { LoginState, MedplumClientEventMap, ProfileResource } from '@medplum/core';
import type { AccessPolicy, UserConfiguration } from '@medplum/fhirtypes';

// SECTION Store
export const useChmsStore = defineStore('Cordina HMS', () => {
  const { $chms } = useNuxtApp();

  /// --------------------
  //  store state
  /// --------------------
  const userId = ref<string | undefined>(undefined);
  const isUserAuthenticated = ref<boolean>(false);
  const isUserAuthorized = ref<boolean>(false);
  const activeAccount = ref<LoginState | null>(null);
  const otherAccounts = ref<LoginState[] | null>(null);
  const accessPolicy = ref<AccessPolicy | null>(null);
  const profile = ref<ProfileResource | null>(null);
  const userConfiguration = ref<UserConfiguration | null>(null);

  /// --------------------
  //  store getters
  /// --------------------

  // const theme = cookieRef('theme', themeConfig.app.theme)

  /// --------------------
  //  store actions
  /// --------------------
  const $reset = () => {
    isUserAuthenticated.value = false;
    isUserAuthorized.value = false;
    profile.value = null;
  };

  const setLoggedIn = (isLogedIn: boolean) => {
    isUserAuthenticated.value = isLogedIn;
  };

  const getAuthorized = async (accessToken: string) => {
    await $chms
      .exchangeExternalAccessToken(accessToken)
      .then((prof: ProfileResource) => {
        console.info('CHMS have successfully authorized user %s', userId.value);
        console.debug('CHMS authorized user profile.', prof)
        isUserAuthorized.value = true;
        profile.value = prof;
      }).then(() => {
        activeAccount.value = $chms.getActiveLogin()
      })
      .then(() => {
        otherAccounts.value = $chms.getLogins()
      })
      .then(() => {
        accessPolicy.value = $chms.getAccessPolicy()
      })
      .then(() => {
        userConfiguration.value = $chms.getUserConfiguration()
      })
      .catch((err: Error) => {
        console.info('CHMS could not authorized user %s, becouse %s', userId.value, err.message);
      });
  };

  /// --------------------
  //  store reactive logic
  /// --------------------
  watch(
    isUserAuthenticated,
    async (val: boolean) => {
      if (val) {
        const { data: sessionData } = useAuth();
        userId.value = sessionData.value?.user.id;
        const accessToken = sessionData.value?.user.token;

        // try authorize user with chms backend
        await getAuthorized(accessToken);
      } //clean the sore
      else $reset;
    },
    { immediate: true }
  );

  /// ----------------------
  //  store accesible state
  /// ----------------------
  return {
    setLoggedIn,
    isUserAuthenticated,
    isUserAuthorized,
    activeAccount,
    otherAccounts,
    accessPolicy,
    userConfiguration,
    profile,
  };
});
// !SECTION

// SECTION Init
export const initChmsStore = () => {
  const { status } = useAuth();
  const { $chms } = useNuxtApp();
  const { setLoggedIn } = useChmsStore();

  watch(status, (_status: string) => setLoggedIn(_status == 'authenticated'));

  // Event listener function
  function eventListener(type: any): void {
    console.info('medplum event: ', type);
  }

  // List of events to track
  const EVENTS_TO_TRACK: (keyof MedplumClientEventMap)[] = [
    'change',
    'storageInitialized',
    'storageInitFailed',
    'profileRefreshing',
    'profileRefreshed',
  ];

  // Setup event listeners on component mount
  onMounted(() => {
    for (const event of EVENTS_TO_TRACK) {
      $chms?.addEventListener(event, eventListener);
    }
  });

  // Cleanup event listeners on component unmount
  onUnmounted(() => {
    for (const event of EVENTS_TO_TRACK) {
      $chms?.removeEventListener(event, eventListener);
    }
  });
};
// !SECTION
