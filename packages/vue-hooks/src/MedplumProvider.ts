import { ref, defineComponent, provide, onMounted, onUnmounted } from 'vue';
import { MedplumClient, MedplumClientEventMap } from '@medplum/core';
import { MedplumContextSymbol, MedplumNavigateFunction } from './Medplum';



export interface MedplumProviderProps {
  medplum: MedplumClient;
  navigate?: MedplumNavigateFunction;
}


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
