<script lang="ts" setup>
import AppMenu from './AppMenu.vue'
</script>

<template>
  <div class="layout-sidebar">
    <div ref="menuContainer" class="layout-menu-container">
      <AppMenu></AppMenu>
    </div>
    <div class="flex justify-content-center flex-wrap py-2 left-footer">
      <a
        class="flex align-items-center justify-content-center"
        href="https://cordina.health/"
        target="_blank"
      >
        <img height="24" :src="'/layout/images/logo.png'" alt="posedion-layout" />
      </a>
      <span class="flex align-items-center justify-content-center left-footer-copyright"
        ><a href="https://cordina.health/" target="_blank">Cordina</a>&nbsp;© 2024</span
      >

      <!-- <div class="flex gap-2">
                <Button type="button" icon="pi pi-github" rounded text plain />
                <Button type="button" icon="pi pi-facebook" rounded text plain />
                <Button type="button" icon="pi pi-twitter" rounded text plain />
            </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
