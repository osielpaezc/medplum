import { storeToRefs } from 'pinia';
import type { MedplumClientEventMap, ProfileResource } from '@medplum/core';

// SECTION Store
export const useChmsStore = defineStore('Cordina HMS', () => {
  const { $chms } = useNuxtApp();

  /// --------------------
  //  store state
  /// --------------------
  const isUserAuthenticated = ref<boolean>(false);
  const isUserAuthorized = ref<boolean>(false);
  // const isUserPserrojectAdmin = ref($chms?.isProjectAdmin());
  // const isUserSuperAdmin = ref($chms?.isSuperAdmin());
  const profile = ref<ProfileResource | null>(null);
  const userId = ref<string | undefined>(undefined);


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

  const getAuthorized = async (accessToken: string): Promise<void> => {
    await $chms
      ?.exchangeExternalAccessToken(accessToken)
      .then((resp) => {
        console.info('CHMS have successfully authorized user %s', userId.value);
        isUserAuthorized.value = true;
        profile.value = resp as ProfileResource;
      })
      .catch((err) => {
        console.info('CHMS could not authorized user %s, becouse %s', userId.value, (err as Error).message);
      });
  };

  /// --------------------
  //  store reactive logic
  /// --------------------
  watch(
    isUserAuthenticated,
    async (val) => {
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
    isProjectAdmin: $chms?.isProjectAdmin(),
    isSuperAdmin: $chms?.isSuperAdmin(),
    profile,
  };
});
// !SECTION

// SECTION Init
export const initChmsStore = () => {
  const { status } = useAuth();
  const { $chms } = useNuxtApp();
  const { setLoggedIn } = useChmsStore();

  watch(status, (_status) => setLoggedIn(_status == 'authenticated'));

  // Event listener function
  function eventListener(type: any): void {
    console.info('medplum event `%s`', type);
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
