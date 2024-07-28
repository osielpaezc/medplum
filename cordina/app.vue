<script setup lang="ts">
import { useTheme } from 'vuetify'
import ScrollToTop from '@core/components/ScrollToTop.vue'
import initCore from '@core/initCore'
import { initConfigStore, useConfigStore } from '@core/stores/config'
import { hexToRgb } from '@core/utils/colorConverter'

const { global } = useTheme()

// ℹ️ Sync current theme with initial loader theme
initCore()
initConfigStore()

const configStore = useConfigStore()
const { isMobile } = useDevice()
if (isMobile)
  configStore.appContentLayoutNav = 'vertical'

const { client, navigate } = useMedplum()

</script>

<template>
  <VLocaleProvider :rtl="configStore.isAppRTL">
    <MedplumProvider :medplum="client" :navigate="navigate">
      <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
      <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
        <ScrollToTop />
      </VApp>
    </MedplumProvider>
  </VLocaleProvider>
</template>
