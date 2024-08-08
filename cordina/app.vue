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


</script>

<template>
  <VLocaleProvider :rtl="configStore.isAppRTL">
    <!--MedplumProvider :medplum=client :navigate=navigate-->
    <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
    <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
      <NuxtLoadingIndicator color="repeating-linear-gradient(to right, #ec1890ff 0%, #ed2328ff 5%, #1bb0efff 30%,#0358b7ff 50%, #9cd529ff 70%, #2eb248ff 80%, #00ab91ff 90%, #f6ab24ff 100%);" />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <ScrollToTop />
    </VApp>
    <!--/MedplumProvider-->
  </VLocaleProvider>
</template>
