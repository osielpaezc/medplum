import type { MedplumClient } from "@medplum/core";
import { useNuxtApp } from '#app';

export function useMedplum(): MedplumClient {
  const { $medplum } = useNuxtApp();
  if (!$medplum) {
    throw new Error('MedplumClient has not been provided!');
  }
  return $medplum;
}
