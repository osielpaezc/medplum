<script lang="ts" setup>
import { useLayout } from '@/layout/composables/layout'

const { layoutConfig } = useLayout()
</script>

<template>
  <div class="layout-footer">
    <span>data collected</span>
    <!-- <img id="footer-logo" height="24" :src="'/layout/images/logo' + (layoutConfig.colorScheme.value === 'light' ? '' : '-dark') + '.png'" alt="posedion-layout" />
        <span class="footer-copy-right">Cordina © Copyright 2024 <a href="https://cordina.health/" target="_blank">Cordina Inc.</a></span>
        <div class="flex gap-2">
            <Button type="button" icon="pi pi-github" rounded text plain />
            <Button type="button" icon="pi pi-facebook" rounded text plain />
            <Button type="button" icon="pi pi-twitter" rounded text plain />
        </div> -->
  </div>
</template>
