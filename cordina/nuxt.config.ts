import { fileURLToPath } from 'node:url'
import svgLoader from 'vite-svg-loader'
import vuetify from 'vite-plugin-vuetify'

const isDeployed = (
  process.env.AUTH_ORIGIN === 'http://localhost:3000'
  || !process.env.AUTH_ORIGIN
) ? false : true;
const deploymentDomain = process.env.AUTH_ORIGIN || 'http://localhost:3000';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  devServer: {
    https: {
      key: 'server.key',
      cert: 'server.crt'
    }
  },
  
  app: {
    head: {
      titleTemplate: '%s - NuxtJS Admin Template',
      title: 'Materio',

      link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: `${process.env.NUXT_APP_BASE_URL}/favicon.ico`,
      }],
    },
  },

  devtools: {
    enabled: true,
  },

  css: [
    '@core/scss/template/index.scss',
    '@styles/styles.scss',
    '@/plugins/iconify/icons.css',
  ],

  /*
    ❗ Please read the docs before updating runtimeConfig
    https://nuxt.com/docs/guide/going-further/runtime-config
  */
  runtimeConfig: {
    // Private keys are only available on the server
    AUTH_ORIGIN: process.env.AUTH_ORIGIN,
    AUTH_SECRET: process.env.AUTH_SECRET,
    nextAuthSecret: process.env.AUTH_SECRET,
    auth0ClientId: process.env.AUTH0_CLIENT_ID,
    auth0ClientSecret: process.env.AUTH0_CLIENT_SECRET,
    auth0Issuer: process.env.AUTH0_ISSUER,
    MedplumClientId: process.env.MEDPLUM_CLIENT_ID,

    // Public keys that are exposed to the client.
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || '/api',
      medplumBaseUrl: process.env.MEDPLUM_BASE_URL,  
    },
  },

  components: {
    dirs: [{
      path: '@/@core/components',
      pathPrefix: false,
    }, {
      path: '@/views/demos',
      pathPrefix: false,
    }, {
      path: '~/components/global',
      global: true,
    }, {
      path: '~/components',
      pathPrefix: false,
    }],
  },

  auth: { 
    isEnabled: true,
    disableServerSideAuth: false,
    baseURL: `${process.env.AUTH_ORIGIN}/api/auth`,
    provider: {
      type: 'authjs',
      trustHost: false,
      defaultProvider: 'auth0',
      addDefaultCallbackUrl: false
    },
    sessionRefresh: {
        enablePeriodically: true,
        enableOnWindowFocus: true,
    }

  // auth: {
  //   provider: {
  //     type: 'authjs',
  //     addDefaultCallbackUrl: false
  //   },
  //   // https://sidebase.io/nuxt-auth/v0.6/configuration/nuxt-auth-handler#nuxtauthhandler
  //   origin: deploymentDomain,
  //   // https://sidebase.io/nuxt-auth/v0.6/configuration/nuxt-config#module-nuxtconfigts
  //   baseUrl: `/api/auth`,
  //   addDefaultCallbackUrl: false,
  //   globalAppMiddleware: {
  //     isEnabled: true,
  //     allow404WithoutAuth: true,
  //     addDefaultCallbackUrl: false
  //   },
  // },

  // auth: {
  //   provider: {
  //     type: 'authjs',
  //     addDefaultCallbackUrl: true
  //   },
  //   // https://sidebase.io/nuxt-auth/v0.6/configuration/nuxt-auth-handler#nuxtauthhandler
  //   origin: deploymentDomain,
  //   // https://sidebase.io/nuxt-auth/v0.6/configuration/nuxt-config#module-nuxtconfigts
  //   baseUrl: `/api/auth`,
  //   addDefaultCallbackUrl: false,
  //   // globalAppMiddleware: {
  //   //   isEnabled: true,
  //   //   allow404WithoutAuth: true,
  //   //   addDefaultCallbackUrl: true
  //   // },
  },

  plugins: [
    '@/plugins/casl/index.ts',
    '@/plugins/vuetify/index.ts',
    '@/plugins/iconify/index.ts'
  ],

  imports: {
    dirs: ['./@core/utils', './@core/composable/', './plugins/*/composables/*'],
  },

  hooks: {},

  experimental: {
    typedPages: true,
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        paths: {
          '@/*': ['../*'],
          '@themeConfig': ['../themeConfig.ts'],
          '@layouts/*': ['../@layouts/*'],
          '@layouts': ['../@layouts'],
          '@core/*': ['../@core/*'],
          '@core': ['../@core'],
          '@images/*': ['../assets/images/*'],
          '@styles/*': ['../assets/styles/*'],
          '@validators': ['../@core/utils/validators'],
          '@db/*': ['../server/fake-db/*'],
          '@api-utils/*': ['../server/utils/*']
        },
      },
    },
  },

  // ℹ️ Disable source maps until this is resolved: https://github.com/vuetifyjs/vuetify-loader/issues/290
  sourcemap: {
    server: false,
    client: false,
  },

  vue: {
    compilerOptions: {
      isCustomElement: tag => tag === 'swiper-container' || tag === 'swiper-slide',
    },
  },

  vite: {
    define: { 'process.env': {} },

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('.', import.meta.url)),
        '@themeConfig': fileURLToPath(new URL('./themeConfig.ts', import.meta.url)),
        '@core': fileURLToPath(new URL('./@core', import.meta.url)),
        '@layouts': fileURLToPath(new URL('./@layouts', import.meta.url)),
        '@images': fileURLToPath(new URL('./assets/images/', import.meta.url)),
        '@styles': fileURLToPath(new URL('./assets/styles/', import.meta.url)),
        '@configured-variables': fileURLToPath(new URL('./assets/styles/variables/_template.scss', import.meta.url)),
        '@db': fileURLToPath(new URL('./server/fake-db/', import.meta.url)),
        '@api-utils': fileURLToPath(new URL('./server/utils/', import.meta.url)),
        '@medplum': fileURLToPath(new URL('./../packages/', import.meta.url)),
      },
    },

    build: {
      chunkSizeWarningLimit: 5000,
    },

    optimizeDeps: {
      exclude: ['vuetify'],
      entries: [
        './**/*.vue',
      ],
    },

    plugins: [
      svgLoader(),
      vuetify({
        styles: {
          configFile: 'assets/styles/variables/_vuetify.scss',
        }
      }),
    ],
  },

  build: {
    transpile: ['vuetify'],
  },

  i18n: {
    vueI18n: 'i18n.config.ts',
  },

  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/device',
    '@sidebase/nuxt-auth',
    '@pinia/nuxt'
  ],

  compatibilityDate: '2024-07-26',
})