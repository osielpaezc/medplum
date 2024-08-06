// stores/chmsStore.ts

import { defineStore } from 'pinia';
import { type ProfileResource } from '@medplum/core';

async function authenticateWithToken(userId: string, accessToken: string): Promise<ProfileResource | null> {
  const nuxtApp = useNuxtApp();
  const medplum = nuxtApp.$chms.client;

  let profile = null;

  if (!medplum.value) {
    throw new Error('CHMS has not been initialized');
  }

  try {
    profile = await medplum.value.exchangeExternalAccessToken(accessToken);
    console.info('%s - CHMS successful authentication profile %s', userId, profile?.id);
  } catch (err) {
    console.error('%s - CHMS authentication error', userId);
    console.info('Error:', err);
  }

  return profile;
}

export const useChmsStore = defineStore('chms', {
  state: () => ({
    isAuthenticated: false as boolean,
    isInitialized: false as boolean,
    identity: null as string | null,
    profile: null as ProfileResource | null,
  }),
  actions: {
    async setAuthenticated(userId: string, accessToken: string) {
      this.identity = userId;
      await authenticateWithToken(userId, accessToken).then((resp) => {
        this.profile = resp
        this.isAuthenticated = true;
      });
    },
  },
});
