import type { MedplumClient, ProfileResource } from "@medplum/core"


export interface CHMSContext {
  client: Ref<MedplumClient | null>,
  isInitialized: Ref<boolean>
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