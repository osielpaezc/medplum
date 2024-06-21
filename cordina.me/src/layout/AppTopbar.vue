<script lang="ts" setup>
import { useLayout } from '@/layout/composables/layout'

const { layoutConfig, isMobile, onMenuToggle, onRightPanelToggle } = useLayout()

const onMenuButtonClick = () => {
  onMenuToggle()
}
</script>

<template>
  <div
    class="layout-topbar"
    :class="{ 'border-bottom-none': layoutConfig.topbarTheme.value !== 'light' }"
  >
    <div class="layout-topbar-start">
      <!-- <router-link to="/">
                <div class="layout-topbar-logo" id="logolink" style="cursor: pointer; outline: none">
                    <img id="app-logo" alt="posedion-layout" :src="'/layout/images/raise-group-logo-' + (layoutConfig.topbarTheme.value === 'light' ? 'cordina' : 'cordina-dark') + '.png'" />
                </div>
            </router-link> -->

      <a
        v-if="!isMobile"
        class="p-ripple"
        v-ripple
        v-styleclass="{
          selector: '@next',
          enterFromClass: 'hidden',
          enterActiveClass: 'scalein',
          leaveToClass: 'hidden',
          leaveActiveClass: 'fadeout',
          hideOnOutsideClick: true
        }"
        @click="onMenuButtonClick()"
      >
        <div class="flex gap-2">
          <a
            v-styleclass="{
              selector: '@next',
              enterFromClass: 'hidden',
              enterActiveClass: 'scalein',
              leaveToClass: 'hidden',
              leaveActiveClass: 'fadeout',
              hideOnOutsideClick: true
            }"
          >
            <img src="/layout/images/avatar-profile.png" alt="demo" class="cursor-pointer" />
          </a>
          <div class="flex flex-column">
            <span class="font-semibold">Peter Taylor</span>
            <span class="text-sm">Webmaster</span>
          </div>
        </div>
      </a>
    </div>

    <div class="layout-topbar-end surface-border">
      <div class="layout-topbar-actions-start">
        <!-- item at start of the action bar -->
      </div>

      <div class="layout-topbar-actions-end">
        <ul class="layout-topbar-items">
          <li class="layout-topbar-search hidden lg:flex">
            <i class="pi pi-search"></i>
            <InputText type="text" placeholder="Search..." />
          </li>
          <li class="lg:hidden">
            <a
              class="p-ripple"
              v-ripple
              v-styleclass="{
                selector: '@next',
                enterFromClass: 'hidden',
                enterActiveClass: 'scalein',
                leaveToClass: 'hidden',
                leaveActiveClass: 'fadeout',
                hideOnOutsideClick: true
              }"
            >
              <i class="pi pi-search"></i>
            </a>
            <div
              class="layout-topbar-search hidden absolute origin-top surface-overlay p-2 border-top-1 surface-border shadow-2"
              style="top: 3.5rem"
            >
              <IconField iconPosition="left" class="w-full">
                <InputIcon class="pi pi-search" />
                <InputText placeholder="Search" class="w-full" />
              </IconField>
            </div>
          </li>
          <li>
            <a
              class="p-ripple"
              v-ripple
              v-styleclass="{
                selector: '@next',
                enterFromClass: 'hidden',
                enterActiveClass: 'scalein',
                leaveToClass: 'hidden',
                leaveActiveClass: 'fadeout',
                hideOnOutsideClick: true
              }"
            >
              <i class="pi pi-bell" v-badge="2"></i>
            </a>
            <div class="layout-topbar-menu shadow-2 pt-0 hidden">
              <ul class="list-none p-0 m-0">
                <li
                  class="flex justify-content-between align-items-center px-3 p-3 mb-3 cursor-pointer"
                >
                  <h6 class="m-0 font-semibold">Notifications</h6>
                  <span class="p-badge">3</span>
                </li>
                <li>
                  <a class="py-2 px-3 flex gap-2 cursor-pointer hover:text-primary">
                    <div
                      class="flex align-items-center justify-content-center border-1 border-circle border-transparent bg-blue-100 text-500"
                      style="height: 30px; width: 30px"
                    >
                      <i class="pi pi-shopping-cart text-lg text-blue-500"></i>
                    </div>
                    <div>
                      <h6 class="m-0 font-semibold">Order <span>#2254</span> is placed</h6>

                      <span class="text-sm text-700"
                        >Total Amount of <span class="font-semibold">$34.50</span></span
                      >
                    </div>
                  </a>
                </li>
                <li>
                  <a class="py-2 px-3 flex gap-2 cursor-pointer hover:text-primary">
                    <div
                      class="flex align-items-center justify-content-center border-1 border-circle border-transparent bg-cyan-100 text-500"
                      style="height: 30px; width: 30px"
                    >
                      <i class="pi pi-clock text-lg text-cyan-500"></i>
                    </div>
                    <div>
                      <h6 class="m-0 font-semibold">Meeting with <span>AF04</span> Team</h6>

                      <span class="text-sm text-700">Google Meets</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a class="py-2 px-3 flex gap-2 cursor-pointer hover:text-primary">
                    <div
                      class="flex align-items-center justify-content-center border-1 border-circle border-transparent bg-pink-100 text-500"
                      style="height: 30px; width: 30px"
                    >
                      <i class="pi pi-th-large text-lg text-pink-500"></i>
                    </div>
                    <div>
                      <h6 class="m-0 font-semibold">Task <span>#41</span> is complete</h6>

                      <span class="text-sm text-700">9 Remaining Tasks</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a class="py-2 px-3 flex gap-2 cursor-pointer hover:text-primary">
                    <div
                      class="flex align-items-center justify-content-center border-1 border-circle border-transparent bg-blue-100 text-500"
                      style="height: 30px; width: 30px"
                    >
                      <i class="pi pi-shopping-cart text-lg text-blue-500"></i>
                    </div>
                    <div>
                      <h6 class="m-0 font-semibold">Order <span>#2255</span> is placed</h6>

                      <span class="text-sm text-700"
                        >Total Amount of <span class="font-semibold">$40.45</span></span
                      >
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a
              class="p-ripple"
              v-ripple
              v-styleclass="{
                selector: '@next',
                enterFromClass: 'hidden',
                enterActiveClass: 'scalein',
                leaveToClass: 'hidden',
                leaveActiveClass: 'fadeout',
                hideOnOutsideClick: true
              }"
            >
              <i class="pi pi-comments" v-badge="6"></i>
            </a>
            <div class="layout-topbar-menu shadow-2 hidden pt-0">
              <ul class="list-none p-0 m-0 flex flex-column">
                <li class="flex justify-content-between align-items-center p-3 mb-3 cursor-pointer">
                  <h6 class="m-0 font-semibold">Messages</h6>
                  <span class="p-badge">5</span>
                </li>
                <li>
                  <a
                    class="cursor-pointer flex align-items-center px-3 py-2 gap-3 hover:text-primary"
                  >
                    <img src="/demo/images/dashboard/leader-1.png" class="w-2rem h-2rem" />
                    <div>
                      <h6 class="m-0 font-semibold">Hey! I sent the sales report</h6>
                      <span class="text-sm text-700">Dusana Semenov</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    class="cursor-pointer flex align-items-center px-3 py-2 gap-3 hover:text-primary"
                  >
                    <img src="/demo/images/dashboard/leader-2.png" class="w-2rem h-2rem" />
                    <div>
                      <h6 class="m-0 font-semibold">OK. Let’s meet at 15 pm...</h6>
                      <span class="text-sm text-700">Edward Lindgren</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    class="cursor-pointer flex align-items-center px-3 py-2 gap-3 hover:text-primary"
                  >
                    <img src="/demo/images/dashboard/leader-3.png" class="w-2rem h-2rem" />
                    <div>
                      <h6 class="m-0 font-semibold">Presentation is ready</h6>
                      <span class="text-sm text-700">Noell Blue</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    class="cursor-pointer flex align-items-center px-3 py-2 gap-3 hover:text-primary"
                  >
                    <img src="/demo/images/dashboard/leader-4.png" class="w-2rem h-2rem" />
                    <div>
                      <h6 class="m-0 font-semibold">Faulty delivery on #959</h6>
                      <span class="text-sm text-700">Gvozden Boskovsky</span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a
              class="p-ripple"
              v-ripple
              v-styleclass="{
                selector: '@next',
                enterFromClass: 'hidden',
                enterActiveClass: 'scalein',
                leaveToClass: 'hidden',
                leaveActiveClass: 'fadeout',
                hideOnOutsideClick: true
              }"
            >
              <i class="pi pi-cog"></i>
            </a>
            <div class="layout-topbar-menu shadow-2 pt-0 hidden cursor-pointer">
              <ul class="list-none p-0 m-0">
                <li class="flex justify-content-between align-items-center px-3 p-3 mb-3">
                  <h6 class="m-0 font-semibold">Settings</h6>
                </li>
                <li>
                  <a class="py-2 px-3 flex gap-2 align-items-center cursor-pointer">
                    <div
                      class="flex align-items-center justify-content-center border-1 border-circle border-transparent bg-blue-100 text-500"
                      style="height: 30px; width: 30px"
                    >
                      <i class="pi pi-user text-lg text-blue-500"></i>
                    </div>
                    <h6 class="m-0 font-semibold">Account Info</h6>
                  </a>
                </li>
                <li>
                  <a class="py-2 px-3 flex gap-2 align-items-center cursor-pointer">
                    <div
                      class="flex align-items-center justify-content-center border-1 border-circle border-transparent bg-cyan-100 text-500"
                      style="height: 30px; width: 30px"
                    >
                      <i class="pi pi-users text-lg text-cyan-500"></i>
                    </div>
                    <h6 class="m-0 font-semibold">Global Accounts</h6>
                  </a>
                </li>
                <li>
                  <a class="py-2 px-3 flex gap-2 align-items-center cursor-pointer">
                    <div
                      class="flex align-items-center justify-content-center border-1 border-circle border-transparent bg-pink-100 text-500"
                      style="height: 30px; width: 30px"
                    >
                      <i class="pi pi-bell text-lg text-pink-500"></i>
                    </div>
                    <h6 class="m-0 font-semibold">Notification Preferences</h6>
                  </a>
                </li>
                <li>
                  <a class="py-2 px-3 flex gap-2 align-items-center cursor-pointer">
                    <div
                      class="flex align-items-center justify-content-center border-1 border-circle border-transparent bg-blue-100 text-500"
                      style="height: 30px; width: 30px"
                    >
                      <i class="pi pi-lock text-lg text-blue-500"></i>
                    </div>
                    <h6 class="m-0 font-semibold">Login Settings</h6>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li
            class="layout-rightmenu-button p-text-secondary p-overlay-badge"
            data-pd-badge="true"
            data-p-overlay-badge="true"
          >
            <a href="#" class="flex flex-column">
              <div class="flex align-items-center justify-content-center">Wed Apr 30th</div>
              <div class="flex align-items-center justify-content-center">3:39 PM</div>
            </a>
            <span
              id="to-do-badge"
              class="to-do-badge mt-2 p-badge p-component p-badge-danger"
              data-pc-name="badge"
              data-pc-section="root"
              v-tooltip="'Your Tasks Today'"
              @click="onRightPanelToggle"
              >10+</span
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
