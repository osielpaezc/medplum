import { ref, watch, Ref } from 'vue';
import { allOk, normalizeOperationOutcome, QueryTypes, ResourceArray } from '@medplum/core';
import { Bundle, ExtractResource, OperationOutcome, ResourceType } from '@medplum/fhirtypes';
import { useMedplum } from './';

type SearchFn = 'search' | 'searchOne' | 'searchResources';

/**
 * Vue composable for searching FHIR resources.
 *
 * This is a convenience composable for calling the MedplumClient.search() method.
 *
 * @param resourceType - The FHIR resource type to search.
 * @param query - Optional search parameters.
 * @returns A 3-element tuple containing the search result, loading flag, and operation outcome.
 */
export function useSearch<K extends ResourceType>(
  resourceType: K,
  query?: QueryTypes
): [Ref<Bundle<ExtractResource<K>> | undefined>, Ref<boolean>, Ref<OperationOutcome | undefined>] {
  return useSearchImpl<K, Bundle<ExtractResource<K>>>('search', resourceType, query);
}

/**
 * Vue composable for searching for a single FHIR resource.
 *
 * This is a convenience composable for calling the MedplumClient.searchOne() method.
 *
 * @param resourceType - The FHIR resource type to search.
 * @param query - Optional search parameters.
 * @returns A 3-element tuple containing the search result, loading flag, and operation outcome.
 */
export function useSearchOne<K extends ResourceType>(
  resourceType: K,
  query?: QueryTypes
): [Ref<ExtractResource<K> | undefined>, Ref<boolean>, Ref<OperationOutcome | undefined>] {
  return useSearchImpl<K, ExtractResource<K>>('searchOne', resourceType, query);
}

/**
 * Vue composable for searching for an array of FHIR resources.
 *
 * This is a convenience composable for calling the MedplumClient.searchResources() method.
 *
 * @param resourceType - The FHIR resource type to search.
 * @param query - Optional search parameters.
 * @returns A 3-element tuple containing the search result, loading flag, and operation outcome.
 */
export function useSearchResources<K extends ResourceType>(
  resourceType: K,
  query?: QueryTypes
): [Ref<ResourceArray<ExtractResource<K>> | undefined>, Ref<boolean>, Ref<OperationOutcome | undefined>] {
  return useSearchImpl<K, ResourceArray<ExtractResource<K>>>('searchResources', resourceType, query);
}

function useSearchImpl<K extends ResourceType, ReturnType>(
  searchFn: SearchFn,
  resourceType: K,
  query?: QueryTypes
): [Ref<ReturnType | undefined>, Ref<boolean>, Ref<OperationOutcome | undefined>] {
  const medplum = useMedplum();
  const searchKey = ref<string>();
  const loading = ref<boolean>(true);
  const result = ref<ReturnType>();
  const outcome = ref<OperationOutcome>();

  watch(
    () => query,
    async (newQuery) => {
      const key = medplum.fhirSearchUrl(resourceType, newQuery).toString();
      if (key !== searchKey.value) {
        searchKey.value = key;
        loading.value = true;
        try {
          const res = await medplum[searchFn](resourceType, newQuery);
          result.value = res as ReturnType;
          outcome.value = allOk;
        } catch (err) {
          result.value = undefined;
          outcome.value = normalizeOperationOutcome(err);
        } finally {
          loading.value = false;
        }
      }
    },
    { immediate: true }
  );

  return [result, loading, outcome];
}