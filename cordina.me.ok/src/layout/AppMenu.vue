<script lang="ts" setup>
import { ref } from 'vue'
import AppMenuItem from './AppMenuItem.vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const model = ref([
  {
    label: 'Home',
    icon: 'pi pi-fw pi-home',
    to: '/'
  },
  {
    label: 'Favorites',
    icon: 'pi pi-fw pi-star',
    items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
  },
  {
    label: 'Personas',
    icon: 'pi pi-fw pi-address-book',
    to: '/personas'
  },
  {
    label: 'New',
    icon: 'pi pi-plus',
    command: () => {
      toast.add({ severity: 'success', summary: 'Success', detail: 'File created', life: 3000 })
    }
  },
  {
    label: 'Apps',
    icon: 'pi pi-fw pi-th-large',
    items: [
      {
        label: 'Blog',
        icon: 'pi pi-fw pi-comment',
        items: [
          {
            label: 'List',
            icon: 'pi pi-fw pi-image',
            to: '/apps/blog/list'
          },
          {
            label: 'Detail',
            icon: 'pi pi-fw pi-list',
            to: '/apps/blog/detail'
          },
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            to: '/apps/blog/edit'
          }
        ]
      },
      {
        label: 'Calendar',
        icon: 'pi pi-fw pi-calendar',
        to: '/apps/calendar'
      },
      {
        label: 'Chat',
        icon: 'pi pi-fw pi-comments',
        to: '/apps/chat'
      },
      {
        label: 'Files',
        icon: 'pi pi-fw pi-folder',
        to: '/apps/files'
      },
      {
        label: 'Mail',
        icon: 'pi pi-fw pi-envelope',
        badge: 5,
        items: [
          {
            label: 'Inbox',
            icon: 'pi pi-fw pi-inbox',
            to: '/apps/mail/inbox'
          },
          {
            label: 'Compose',
            icon: 'pi pi-fw pi-pencil',
            to: '/apps/mail/compose'
          },
          {
            label: 'Detail',
            icon: 'pi pi-fw pi-comment',
            to: '/apps/mail/detail/1000'
          }
        ]
      },
      {
        label: 'Task List',
        icon: 'pi pi-fw pi-check-square',
        to: '/apps/tasklist',
        badge: '9+'
      }
    ]
  },
  {
    label: 'UI Kit',
    icon: 'pi pi-fw pi-star',
    items: [
      {
        label: 'Form Layout',
        icon: 'pi pi-fw pi-id-card',
        to: '/uikit/formlayout'
      },
      {
        label: 'Input',
        icon: 'pi pi-fw pi-check-square',
        to: '/uikit/input'
      },
      {
        label: 'Float Label',
        icon: 'pi pi-fw pi-bookmark',
        to: '/uikit/floatlabel'
      },
      {
        label: 'Invalid State',
        icon: 'pi pi-fw pi-exclamation-circle',
        to: '/uikit/invalidstate'
      },
      {
        label: 'Button',
        icon: 'pi pi-fw pi-box',
        to: '/uikit/button'
      },
      {
        label: 'Table',
        icon: 'pi pi-fw pi-table',
        to: '/uikit/table'
      },
      {
        label: 'List',
        icon: 'pi pi-fw pi-list',
        to: '/uikit/list'
      },
      {
        label: 'Tree',
        icon: 'pi pi-fw pi-share-alt',
        to: '/uikit/tree'
      },
      {
        label: 'Panel',
        icon: 'pi pi-fw pi-tablet',
        to: '/uikit/panel'
      },
      {
        label: 'Overlay',
        icon: 'pi pi-fw pi-clone',
        to: '/uikit/overlay'
      },
      {
        label: 'Media',
        icon: 'pi pi-fw pi-image',
        to: '/uikit/media'
      },
      {
        label: 'Menu',
        icon: 'pi pi-fw pi-bars',
        to: '/uikit/menu'
      },
      {
        label: 'Message',
        icon: 'pi pi-fw pi-comment',
        to: '/uikit/message'
      },
      {
        label: 'File',
        icon: 'pi pi-fw pi-file',
        to: '/uikit/file'
      },
      {
        label: 'Chart',
        icon: 'pi pi-fw pi-chart-bar',
        to: '/uikit/chart'
      },
      {
        label: 'Misc',
        icon: 'pi pi-fw pi-circle-off',
        to: '/uikit/misc'
      }
    ]
  },
  {
    label: 'Prime Blocks',
    icon: 'pi pi-fw pi-prime',
    items: [
      {
        label: 'Free Blocks',
        icon: 'pi pi-fw pi-eye',
        to: '/blocks'
      },
      {
        label: 'All Blocks',
        icon: 'pi pi-fw pi-globe',
        url: 'https://blocks.primevue.org',
        target: '_blank'
      }
    ]
  },
  {
    label: 'Utilities',
    icon: 'pi pi-fw pi-compass',
    items: [
      {
        label: 'PrimeIcons',
        icon: 'pi pi-fw pi-prime',
        to: '/utilities/icons'
      },
      {
        label: 'Colors',
        icon: 'pi pi-fw pi-palette',
        to: '/utilities/colors'
      },
      {
        label: 'PrimeFlex',
        icon: 'pi pi-fw pi-desktop',
        url: 'https://www.primefaces.org/primeflex/',
        target: '_blank'
      }
    ]
  },
  {
    label: 'Pages',
    icon: 'pi pi-fw pi-briefcase',
    items: [
      {
        label: 'Landing',
        icon: 'pi pi-fw pi-globe',
        to: '/landing'
      },
      {
        label: 'Auth',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Login',
            icon: 'pi pi-fw pi-sign-in',
            to: '/auth/login'
          },

          {
            label: 'Error',
            icon: 'pi pi-fw pi-times-circle',
            to: '/auth/error'
          },

          {
            label: 'Access Denied',
            icon: 'pi pi-fw pi-lock',
            to: '/auth/access'
          }
        ]
      },
      {
        label: 'Crud',
        icon: 'pi pi-fw pi-pencil',
        to: '/pages/crud'
      },
      {
        label: 'Timeline',
        icon: 'pi pi-fw pi-calendar',
        to: '/pages/timeline'
      },
      {
        label: 'Invoice',
        icon: 'pi pi-fw pi-dollar',
        to: '/pages/invoice'
      },

      {
        label: 'Help',
        icon: 'pi pi-fw pi-question-circle',
        to: '/pages/help'
      },
      {
        label: 'Not Found',
        icon: 'pi pi-fw pi-exclamation-circle',
        to: '/pages/notfound'
      },
      {
        label: 'Empty',
        icon: 'pi pi-fw pi-circle-off',
        to: '/pages/empty'
      },
      {
        label: 'Contact Us',
        icon: 'pi pi-fw pi-phone',
        to: '/pages/contact'
      }
    ]
  },
  {
    label: 'E-Commerce',
    icon: 'pi pi-fw pi-wallet',
    items: [
      {
        label: 'Product Overview',
        icon: 'pi pi-fw pi-image',
        to: '/ecommerce/product-overview'
      },
      {
        label: 'Product List',
        icon: 'pi pi-fw pi-list',
        to: '/ecommerce/product-list'
      },
      {
        label: 'New Product',
        icon: 'pi pi-fw pi-plus',
        to: '/ecommerce/new-product'
      },
      {
        label: 'Shopping Cart',
        icon: 'pi pi-fw pi-shopping-cart',
        to: '/ecommerce/shopping-cart'
      },
      {
        label: 'Checkout Form',
        icon: 'pi pi-fw pi-check-square',
        to: '/ecommerce/checkout-form'
      },
      {
        label: 'Order History',
        icon: 'pi pi-fw pi-history',
        to: '/ecommerce/order-history'
      },
      {
        label: 'Order Summary',
        icon: 'pi pi-fw pi-file',
        to: '/ecommerce/order-summary'
      }
    ]
  },
  {
    label: 'User Management',
    icon: 'pi pi-fw pi-user',
    items: [
      {
        label: 'List',
        icon: 'pi pi-fw pi-list',
        to: '/profile/list'
      },
      {
        label: 'Create',
        icon: 'pi pi-fw pi-plus',
        to: '/profile/create'
      }
    ]
  },
  {
    label: 'Hierarchy',
    icon: 'pi pi-fw pi-align-left',
    items: [
      {
        label: 'Submenu 1',
        icon: 'pi pi-fw pi-align-left',
        items: [
          {
            label: 'Submenu 1.1',
            icon: 'pi pi-fw pi-align-left',
            items: [
              {
                label: 'Submenu 1.1.1',
                icon: 'pi pi-fw pi-align-left'
              },
              {
                label: 'Submenu 1.1.2',
                icon: 'pi pi-fw pi-align-left'
              },
              {
                label: 'Submenu 1.1.3',
                icon: 'pi pi-fw pi-align-left'
              }
            ]
          },
          {
            label: 'Submenu 1.2',
            icon: 'pi pi-fw pi-align-left',
            items: [
              {
                label: 'Submenu 1.2.1',
                icon: 'pi pi-fw pi-align-left'
              }
            ]
          }
        ]
      },
      {
        label: 'Submenu 2',
        icon: 'pi pi-fw pi-align-left',
        items: [
          {
            label: 'Submenu 2.1',
            icon: 'pi pi-fw pi-align-left',
            items: [
              {
                label: 'Submenu 2.1.1',
                icon: 'pi pi-fw pi-align-left'
              },
              {
                label: 'Submenu 2.1.2',
                icon: 'pi pi-fw pi-align-left'
              }
            ]
          },
          {
            label: 'Submenu 2.2',
            icon: 'pi pi-fw pi-align-left',
            items: [
              {
                label: 'Submenu 2.2.1',
                icon: 'pi pi-fw pi-align-left'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    label: 'Start',
    icon: 'pi pi-fw pi-download',
    items: [
      {
        label: 'Buy Now',
        icon: 'pi pi-fw pi-shopping-cart',
        url: 'https://www.primefaces.org/store'
      },
      {
        label: 'Documentation',
        icon: 'pi pi-fw pi-info-circle',
        to: '/documentation'
      }
    ]
  }
])
</script>

<template>
  <PanelMenu class="layout-menu" :model="model">
    <template #item="{ item }">
      <router-link v-if="item.to" v-slot="{ href, navigate }" :to="item.to" custom>
        <a
          v-ripple
          class="flex align-items-center cursor-pointer text-color px-3 py-2"
          :href="href"
          @click="navigate"
        >
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
          <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
        </a>
      </router-link>
      <a
        v-else
        v-ripple
        class="flex align-items-center cursor-pointer text-color px-3 py-2"
        :href="item.url"
        :target="item.target"
      >
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
        <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
        <span v-if="item.items" class="pi pi-angle-down text-primary ml-auto" />
      </a>
    </template>
  </PanelMenu>
  <!-- <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <AppMenuItem :item="item" root :index="i" />

            
        </template>
        <li>
           
        </li>
    </ul> -->
</template>

<style lang="scss" scoped></style>
