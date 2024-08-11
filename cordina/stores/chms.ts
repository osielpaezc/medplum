import { storeToRefs } from 'pinia';
import type { ProfileResource } from '@medplum/core';

// SECTION Store
export const useChmsStore = defineStore('Cordina HMS', () => {
  const { $chms } = useNuxtApp();

  // store states
  const isUserAuthenticated = ref<boolean>(false);
  const isUserAuthorized = ref<boolean>(false);
  const profile = ref<ProfileResource | null>(null);
  const userId = ref<string | undefined>(undefined);

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

  // const theme = cookieRef('theme', themeConfig.app.theme)

  // // 👉 isVerticalNavSemiDark
  // const isVerticalNavSemiDark = cookieRef('isVerticalNavSemiDark', themeConfig.verticalNav.isVerticalNavSemiDark)

  // // 👉 isVerticalNavSemiDark
  // const skin = cookieRef('skin', themeConfig.app.skin)

  // ℹ️ We need to use `storeToRefs` to forward the state
  // const {
  //   isLessThanOverlayNavBreakpoint,
  //   appContentWidth,
  //   navbarType,
  //   isNavbarBlurEnabled,
  //   appContentLayoutNav,
  //   isVerticalNavCollapsed,
  //   footerType,
  //   isAppRTL,
  // } = storeToRefs(useLayoutConfigStore())

  // store stters
  const setLoggedIn = (isLogedIn: boolean) => {
    isUserAuthenticated.value = isLogedIn;
  };

  const getAuthorized = async (accessToken: string) => {
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

  const $reset = () => {
    isUserAuthenticated.value = false;
    isUserAuthorized.value = false;
    profile.value = null;
  };

  // return store state
  return {
    setLoggedIn,
    isUserAuthenticated,
    isUserAuthorized,
    profile,
  };
});
// !SECTION

// SECTION Init
export const initChmsStore = () => {
  const { status } = useAuth();
  const { setLoggedIn } = useChmsStore();

  watch(status, (_status) => setLoggedIn(_status == 'authenticated'));

  onMounted(() => {
    // do nothing here yet
  });
};
// !SECTION
