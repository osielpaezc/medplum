import { MedplumClient, type MedplumClientOptions } from '@medplum/core';

export class Medplum {
  private static instance: MedplumClient | null = null;
  
  private constructor() {
  }

  public static getInstance(options?: MedplumClientOptions): MedplumClient {
    if (!Medplum.instance) {
      console.log('new instance')
      Medplum.instance = new MedplumClient(options);
    }
    return Medplum.instance;
  }

}