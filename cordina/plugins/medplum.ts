import { MedplumClient, type MedplumClientEventMap, type MedplumClientOptions, type ProfileResource } from '@medplum/core';


const EVENTS_TO_TRACK: (keyof MedplumClientEventMap)[] = [
  'change',
  'storageInitialized',
  'storageInitFailed',
  'profileRefreshing',
  'profileRefreshed',
];


const defaultNavigate: MedplumNavigateFunction = (path: string): Promise<void> => {
  return new Promise((resolve) => {
    window.location.assign(path);
    resolve();
  });
};


export interface MedplumContext {
  medplum: MedplumClient;
  navigate: MedplumNavigateFunction;
  profile?: ProfileResource;
  loading: boolean;
}


export type MedplumNavigateFunction = (path: string) => void;


export const MedplumContextSymbol = Symbol("MedplumContext") as InjectionKey<MedplumContext>


export function createMedplumClient(options: MedplumClientOptions): MedplumClient {
  console.log('creating mp client', options)
  return new MedplumClient(options);
}


export interface MedplumProviderProps {
  medplum: MedplumClient;
  navigate?: MedplumNavigateFunction;
}


export const MedplumProvider = defineComponent({
  name: 'MedplumProvider',
  props: {
    medplum: {
      type: Object as () => MedplumClient,
      required: true,
    },
    navigate: {
      type: Function as unknown as () => MedplumNavigateFunction,
      default: defaultNavigate,
    },
  },
  setup(props, { slots }) {
    const state = ref({
      profile: props.medplum.getProfile(),
      loading: props.medplum.isLoading(),
    });

    const eventListener = () => {
      state.value = {
        profile: props.medplum.getProfile(),
        loading: props.medplum.isLoading(),
      };

      console.log('medplum provider installed')
    };
  

    onMounted(() => {

      for (const event of EVENTS_TO_TRACK) {
        props.medplum.addEventListener(event, eventListener);
      }
    });

    onUnmounted(() => {
      for (const event of EVENTS_TO_TRACK) {
        props.medplum.removeEventListener(event, eventListener);
      }
    });

    provide(MedplumContextSymbol, {
      ...state.value,
      medplum: props.medplum,
      navigate: props.navigate,
    });

    return () => slots.default ? slots.default() : null;
  },
});


export default defineNuxtPlugin({
  name: 'MedplumContext',
  //enforce: 'pre', // or 'post'
  parallel: true,
  async setup(nuxtApp) {
    // this is the equivalent of a normal functional plugin
  },
  hooks: {
    // You can directly register Nuxt app runtime hooks here
    'app:created'() {
      const nuxtApp = useNuxtApp();
      const { $config, $router } = nuxtApp;

      const client = new MedplumClient({
        baseUrl: $config.public.medplumBaseUrl,
        clientId: $config.MedplumClientId,
        cacheTime: 60000,
        autoBatchTime: 100,
        onUnauthenticated: () => {
          console.log('osiel')
        }
      });

      const medplumContext: MedplumContext = {
        medplum: client,
        navigate: (path: string) => {
          $router.push(path);
        },
        profile: client.getProfile(),
        loading: client.isLoading(),
      };

      nuxtApp.vueApp.component('MedplumProvider', MedplumProvider);
      nuxtApp.vueApp.provide(MedplumContextSymbol, medplumContext);
      nuxtApp.vueApp.config.globalProperties.$medplum = client;

    },
  },
  env: {
    // Set this value to `false` if you don't want the plugin to run when rendering server-only or island components.
    islands: true,
  },
});