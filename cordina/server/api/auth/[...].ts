import CredentialsProvider from 'next-auth/providers/credentials';
import type { NuxtError } from 'nuxt/app';
import { NuxtAuthHandler } from '#auth';

const {
  nextAuthSecret,
} = useRuntimeConfig();

export default NuxtAuthHandler({
  secret: nextAuthSecret,
  debug: true, //isDeployed ? false : true,
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider.default({
      name: 'Credentials',
      credentials: {}, // Object is required but can be left empty.
      async authorize(credentials: any) {

        const { user } = await $fetch<any>(`${process.env.NUXT_PUBLIC_API_BASE_URL}/login/`, {
          method: 'POST',
          body: JSON.stringify(credentials),
        }).catch((err: NuxtError) => {
          throw createError({
            statusCode: err.statusCode || 403,
            statusMessage: JSON.stringify(err.data),
          })
        })

        return user || null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    jwt: async ({ token, user, account }) => {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = user.accessToken
        token.abilityRules = user.abilityRules;
        token.avatar = user.avatar;
        token.role = user.role;
      }
      return token
    },
    async session({ session, token }) {
      // Add custom params to user in session which are added in `jwt()` callback via `token` parameter
      if (session.user) {
      session.user.username = token.email;
      session.user.fullName = token.name;
      session.user.avatar = token.avatar;
      session.user.abilityRules = token.abilityRules;
      session.user.role = token.role;
      }

      return session;
    },
  },
  events: {
    async signIn() {
      /* on successful sign in */
      //console.log('signIn', message);
    },
    async signOut() {
      /* on signout */
      //console.log('signOut', message);
    },
    async createUser() {
      /* user created */
      //console.log('createUser', message);
    },
    async updateUser() {
      /* user updated - e.g. their email was verified */
      //console.log('updateUser', message);
    },
    async linkAccount() {
      /* account (e.g. GitHub) linked to a user */
      //console.log('linkAccount', message);
    },
    async session() {
      /* session is active */
    },
  },
});
