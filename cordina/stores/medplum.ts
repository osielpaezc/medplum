import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMedplumStore = defineStore('medplum', () => {
  const user = ref(null);
  const isAuthenticated = ref(false);

  function setUser(newUser: any) {
    user.value = newUser;
    isAuthenticated.value = !!newUser;
  }

  return {
    user,
    isAuthenticated,
    setUser,
  };
});