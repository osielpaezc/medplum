import type { MedplumClient } from "@medplum/core"

declare module '#app' {
  interface NuxtApp {
    $medplum (): Ref<MedplumClient>
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $medplum (): Ref<MedplumClient>
  }
}

export {}