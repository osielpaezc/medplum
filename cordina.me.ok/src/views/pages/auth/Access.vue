<script lang="ts" setup>
import AppConfig from '@/layout/AppConfig.vue'
</script>

<template>
  <div class="h-screen" style="background: linear-gradient(0deg, #812038 0%, #f16383 100%)">
    <div class="bg-gray-100 flex align-items-center justify-content-center" style="height: 30%">
      <img src="/layout/images/icon-access.png" alt="posedion-layout" width="100px" class="block" />
    </div>

    <div class="flex align-items-center flex-column" style="height: 70%">
      <div class="p-7 text-center">
        <span class="block text-white text-5xl font-bold mb-4">Access Denied</span>
        <span class="block text-white mb-6"
          >You Don't Have Permissions To Access This Resource</span
        >
        <router-link to="/">
          <Button
            label="Dashboard"
            icon="pi pi-home"
            class="w-9 block mx-auto mt-0 mb-8 surface-0 text-color border-none"
          ></Button>
        </router-link>
        <router-link to="/" class="logo">
          <img
            src="/layout/images/logo.svg"
            alt="posedion-layout"
            class="block mx-auto mt-0 mb-3"
            style="height: 56px"
          />
        </router-link>
        <span class="text-white">Cordina Health Services</span>
      </div>
    </div>
  </div>
  <AppConfig simple />
</template>
