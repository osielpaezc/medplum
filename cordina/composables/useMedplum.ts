import { MedplumContextSymbol } from "@/plugins/medplum"


export const useMedplumContext = () => {
  const context = inject(MedplumContextSymbol);
  if (!context) {
    throw new Error('No Medplum context provided');
  }
  return context;
}


export const useMedplum = () => {
  const context = useMedplumContext()
  return {
    client: context.medplum,
    navigate: context.navigate,
    profile: context.profile
  }
}