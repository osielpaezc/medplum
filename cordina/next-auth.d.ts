import type { DefaultSession } from 'next-auth'
import { Rule } from './plugins/casl/ability'
import { ProfileResource } from '@medplum/core';


interface UserAdditionalData {
  id: string
  username?: string
  fullName?: string
  avatar?: string
  role?: string
  abilityRules?: Rule[]
  token: string;
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends UserAdditionalData {}
}

declare module "next-auth" {
    
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: UserAdditionalData & DefaultSession['user']
    hms?: ResourceProfile
  }

  interface User extends UserAdditionalData { }
}