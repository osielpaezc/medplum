import { canNavigate } from '@layouts/plugins/casl';

export default defineNuxtRouteMiddleware(async (to) => {
  /*
   * If it's a public route, continue navigation. This kind of pages are allowed to visited by login & non-login users. Basically, without any restrictions.
   * Examples of public routes are, 404, under maintenance, etc.
   */
  if (to.meta.public) return;

  const { status, data } = useAuth();
  const isLoggedIn = status.value === 'authenticated';

  /*
      If user is logged in and is trying to access login like page, redirect to home
      else allow visiting the page
      (WARN: Don't allow executing further by return statement because next code will check for permissions)
     */
  if (to.meta.unauthenticatedOnly) {
    if (isLoggedIn) return navigateTo('/');
    else return undefined;
  }

  if (!canNavigate(to) && to.matched.length) {
    /* eslint-disable indent */
    return navigateTo(
      isLoggedIn
        ? { name: 'not-authorized' }
        : {
            name: 'login',
            query: {
              ...to.query,
              to: to.fullPath !== '/' ? to.path : undefined,
            },
          }
    );
    /* eslint-enable indent */
  }

  // authenticate user with CHMS when user is login and CHMS is initialized
  const chms = useNuxtApp().$chms;
  if (isLoggedIn && chms?.isInitialized) {
    const chmsStore = useChmsStore();
    const userId = data.value?.user.id;
    const accessToken = data.value?.user.token;
    
    if (accessToken) {
      await chmsStore.setAuthenticated(userId, accessToken);
    } else {
      console.warn('%s - User Access token not found.', userId);
    }
  } else {
    console.warn('User is not logged in or CHMS is not initialized.');
  }
});
