// import { ref, watch, defineComponent, provide, PropType } from 'vue';
// import { MedplumClient, MedplumClientEventMap } from '@medplum/core';
// import { MedplumContextSymbol, MedplumNavigateFunction } from './Medplum';



// const defaultNavigate = (path: string): void => {
//   console.log('path', path)
//   window.location.assign(path);
// };

// export const MedplumProvider = defineComponent({
//   name: 'MedplumProvider',
//   props: {
//     medplum: {
//       type: Object as PropType<MedplumClient>,
//       required: true,
//     },
//     navigate: {
//       type: Object as PropType<MedplumNavigateFunction>,
//       default: defaultNavigate,
//     },
//   },
//   setup(props, { slots }) {
//     const state = ref({
//       profile: props.medplum.getProfile(),
//       loading: props.medplum.isLoading(),
//     });

//     const eventListener = () => {
//       state.value = {
//         ...state.value,
//         profile: props.medplum.getProfile(),
//         loading: props.medplum.isLoading(),
//       };
//     };

//     const EVENTS_TO_TRACK: (keyof MedplumClientEventMap)[] = [
//       'change',
//       'storageInitialized',
//       'storageInitFailed',
//       'profileRefreshing',
//       'profileRefreshed',
//     ];

//     watch(
//       () => props.medplum,
//       (medplum) => {
//         for (const event of EVENTS_TO_TRACK) {
//           medplum.addEventListener(event, eventListener);
//         }
//         return () => {
//           for (const event of EVENTS_TO_TRACK) {
//             medplum.removeEventListener(event, eventListener);
//           }
//         };
//       },
//       { immediate: true }
//     );

//     provide(MedplumContextSymbol, {
//       ...state.value,
//       medplum: props.medplum,
//       navigate: props.navigate,
//     });

//     return () => slots.default?.();
//   },
// });
