import { defineStore } from 'pinia';
import { type ProfileResource } from '@medplum/core';
import { useNuxtApp } from '#app';

async function authenticateWithToken(userId: string, accessToken: string): Promise<ProfileResource | null> {
  const nuxtApp = useNuxtApp();
  const medplum = nuxtApp.$chms.client;

  if (!medplum || !medplum.value) {
    throw new Error('CHMS has not been initialized');
  }

  try {
    const profile = await medplum.value.exchangeExternalAccessToken(accessToken);
    console.info('%s - CHMS successful authentication profile %s', userId, profile.id);
    return profile;
  } catch (err) {
    console.error('%s - CHMS authentication error', userId);
    console.info('Error:', err);
    return null;
  }
}

export const useChmsStore = defineStore('chms', {
  state: () => ({
    isAuthenticated: false as boolean,
    isInitialized: false as boolean | undefined,
    identity: null as string | null,
    profile: null as ProfileResource | null,
    errorMessage: null as string | null,
  }),
  actions: {
    async setAuthenticated(userId: string, accessToken: string) {
      this.identity = userId;
      try {
        const profile = await authenticateWithToken(userId, accessToken);
        if (profile) {
          this.profile = profile;
          this.isAuthenticated = true;
          console.info('User %s successfully authenticated', userId);
        } else {
          this.errorMessage = 'Authentication failed';
          console.warn('Authentication failed for user %s', userId);
        }
      } catch (error) {
        this.errorMessage = (error as Error).message || 'Unknown authentication error';
        console.error('Error during authentication for user %s: %s', userId, this.errorMessage);
      }
    },
    setInitialized(value: boolean | undefined) {
      this.isInitialized = value;
    },
  },
});
