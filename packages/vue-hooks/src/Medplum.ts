import { App, inject, InjectionKey } from 'vue';
import { MedplumClient, ProfileResource } from '@medplum/core';
import { MedplumProvider } from './';

export const MedplumContextSymbol = Symbol("MedplumContext") as InjectionKey<MedplumContext>

export type MedplumNavigateFunction = (path: string) => void;

export interface MedplumContext {
  medplum: MedplumClient;
  navigate: MedplumNavigateFunction;
  profile?: ProfileResource;
  loading: boolean;
}

export function createMedplumClient(options: any): MedplumClient {
  console.log('creating mp client', options)
  return new MedplumClient(options);
}

export const Medplum = {
  async install(app: App, options: any) {

    const client = createMedplumClient(options);

    const medplumContext: MedplumContext = {
      medplum: client,
      navigate: (path: string) => {
        app.config.globalProperties.$router.push(path);
      },
      profile: client.getProfile(),
      loading: client.isLoading(),
    };

    app.component('MedplumProvider', MedplumProvider);
    app.provide(MedplumContextSymbol, medplumContext);
    app.config.globalProperties.$medplum = client;

  },
};

export function useMedplumContext(): MedplumContext {
  const context = inject(MedplumContextSymbol);
  if (!context) {
    throw new Error('No Medplum context provided');
  }
  return context;
}

export function useMedplum(): MedplumClient {
  return useMedplumContext().medplum;
}

export function useMedplumNavigate(): MedplumNavigateFunction {
  return useMedplumContext().navigate;
}

export function useMedplumProfile(): ProfileResource | undefined {
  return useMedplumContext().profile;
}