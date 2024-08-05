import CredentialsProvider from 'next-auth/providers/credentials';
import { type NuxtError } from 'nuxt/app';
import { NuxtAuthHandler } from '#auth';
import { Medplum } from '~/utils/medplum';
import { MedplumClientOptions, ProfileResource } from '@medplum/core';
import { useMedplum } from '~/composables/useMedplum';

const { nextAuthSecret } = useRuntimeConfig();
const { isDeployed } = useRuntimeConfig().public;

export default NuxtAuthHandler({
  secret: nextAuthSecret,
  debug: isDeployed ? false : true,
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider.default({
      name: 'Credentials',
      credentials: {}, // Object is required but can be left empty.
      async authorize(credentials: any) {
        const { email } = credentials;

        console.debug('initiating authentication for %s.', email);

        const { user } = await $fetch<any>(`${process.env.NUXT_PUBLIC_API_BASE_URL}/login/`, {
          method: 'POST',
          body: JSON.stringify(credentials),
        }).catch((err: NuxtError) => {
          console.error(err);
          throw createError({
            statusCode: err.statusCode || 403,
            statusMessage: JSON.stringify(err.data),
          });
        });

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
        token.accessToken = user.accessToken;
        token.abilityRules = user.abilityRules;
        token.avatar = user.avatar;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (!session.user) return session;

      // Add custom params to user in session which are added in `jwt()` callback via `token` parameter
      session.user.id = token.sub;
      session.user.username = token.email;
      session.user.fullName = token.name;
      session.user.avatar = token.avatar;
      session.user.abilityRules = token.abilityRules;
      session.user.role = token.role;
      session.user.token =  token.accessToken;

      // console.info('HMS initiating authentication for %s.', token.sub);
      // // Add to Health Management System info if user is in Medplum
      // const medplum = Medplum.getInstance({
      //   baseUrl: process.env.MEDPLUM_BASE_URL,
      //   clientId: process.env.MEDPLUM_CLIENT_ID,
      //   clientSecret: process.env.MEDPLUM_CLIENT_SECRET,
      //   // onUnauthenticated: () => {
      //   //   console.log("User is unauthenticated. Redirecting to login...");
      //   //   //router.push('/login');
      //   // }
      // } as MedplumClientOptions);

      // await medplum.exchangeExternalAccessToken(token.accessToken)
      // .then((medplum: ProfileResource) => {
      //   session.hms = medplum;
      //   session.hms.token = token.accessToken
      //   console.info('HMS authentication success for %s.', token.sub);
      // })
      // .catch((err: NuxtError) => {
      //   console.error('HMS authentication error for %s.', token.sub);
      //   // throw createError({
      //   //   statusCode: err.statusCode,
      //   //   statusMessage: err.data,
      //   // });
      // });
      return session;
    },
  },
  events: {
    async signIn(o) {
      /* on successful sign in */
      console.info('%s - successfully authenticated.', o.user.id);
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
    async session(o) {
      /* session is active */
      console.info('%s - session successfully created.', o.token.sub);
    },
  },
});
