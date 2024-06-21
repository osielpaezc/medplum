<script lang="ts" setup>
import AppConfig from '@/layout/AppConfig.vue'
</script>

<template>
  <div
    class="h-screen text-bluegray-200"
    style="background: linear-gradient(180deg, #525d72 0%, #69768d 100%)"
  >
    <div class="flex justify-content-center align-items-center h-full">
      <div
        class="h-full text-center py-6 px-4 flex justify-content-between flex-column max-w-30rem"
      >
        <router-link to="/" class="logo">
          <img src="/layout/images/logo-cordina-dark.svg" alt="posedion-layout" height="45px" />
        </router-link>

        <div>
          <h2 class="text-bluegray-200">Login To Your Premium Account</h2>
          <p class="font-semibold m-0 text-bluegray-100 mb-5">
            You don't have an account?
            <router-link to="/" class="cursor-pointer text-white"> Sign up</router-link>
          </p>
          <InputText
            type="text"
            autocomplete="off"
            placeholder="Email"
            class="w-11 mb-4 text-bluegray-600 surface-ground"
          />
          <InputText
            type="password"
            autocomplete="off"
            placeholder="Password"
            class="w-11 mb-4 text-bluegray-600 surface-ground"
          />
          <Button label="LOGIN" type="button" class="w-11"></Button>
        </div>

        <p>A problem? <router-link to="/">Click here</router-link> and let us help you.</p>
      </div>
    </div>
  </div>
  <AppConfig simple />
</template>
