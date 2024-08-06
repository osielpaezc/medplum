import type { MedplumClient, ProfileResource } from "@medplum/core"


export interface CHMSContext {
  client: Ref<MedplumClient | null>,
  authenticateWithToken: (accessToken: string) => Promise<ProfileResource>;
  isAuthenticated: Ref<boolean>,
  isInitialized: Ref<boolean>,
  profile: Ref<ProfileResource | null>
}

declare module '#app' {
  interface NuxtApp {
    $chms: CHMSContext
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $chms: CHMSContext
  }
}

export {}