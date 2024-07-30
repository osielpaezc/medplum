import CredentialsProvider from 'next-auth/providers/credentials';
import type { NuxtError } from 'nuxt/app';
import { NuxtAuthHandler } from '#auth';
import Auth0Provider from 'next-auth/providers/auth0';
// import GoogleProvider from 'next-auth/providers/google'

const {
  nextAuthSecret,
  auth0ClientId,
  auth0ClientSecret,
  auth0Issuer,
  public: { isDeployed },
} = useRuntimeConfig();

export default NuxtAuthHandler({
  secret: nextAuthSecret,
  debug: true, //isDeployed ? false : true,
  providers: [
    // Auth0Provider.default({
    //   name: 'Auth0',
    //   clientId: auth0ClientId,
    //   clientSecret: auth0ClientSecret,
    //   issuer: auth0Issuer,
    // }),
      {
        id: "auth0",
        name: "Auth0",
        type: "oauth",
        wellKnown: `${auth0Issuer}/.well-known/openid-configuration`,
        authorization: { params: { scope: "openid email profile" } },
        idToken: true,
        checks: ["pkce", "state"],
        clientId: auth0ClientId,
        clientSecret: auth0ClientSecret,
        profile(profile) {
          console.log('profile', profile)
          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            image: profile.picture,
          }
        },
      },
    // Auth0Provider.default({
    //   id: "auth0",
    //   clientId: runtimeConfig.AUTH0_CLIENT_ID,
    //   clientSecret: runtimeConfig.AUTH0_CLIENT_SECRET,
    //   issuer: runtimeConfig.AUTH0_ISSUER,
    // }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    // CredentialsProvider.default({
    //   name: 'Credentials',
    //   credentials: {}, // Object is required but can be left empty.
    //   async authorize(credentials: any) {
    //     const { user } = await $fetch<any>(`${process.env.NUXT_PUBLIC_API_BASE_URL}/login/`, {
    //       method: 'POST',
    //       body: JSON.stringify(credentials),
    //     }).catch((err: NuxtError) => {
    //       throw createError({
    //         statusCode: err.statusCode || 403,
    //         statusMessage: JSON.stringify(err.data),
    //       })
    //     })

    //     return user || null
    //   },
    // }),
  ],
  // pages: {
  //   signIn: '/login',
  // },
  callbacks: {
    jwt: async ({ token, user }) => {
      /*
       * For adding custom parameters to user in session, we first need to add those parameters
       * in token which then will be available in the `session()` callback
       */
      if (user) {
        token.username = user.username;
        token.fullName = user.fullName;
        token.avatar = user.avatar;
        token.abilityRules = user.abilityRules;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      // Add custom params to user in session which are added in `jwt()` callback via `token` parameter
      if (session.user) {
        session.user.username = token.username;
        session.user.fullName = token.fullName;
        session.user.avatar = token.avatar;
        session.user.abilityRules = token.abilityRules;
        session.user.role = token.role;
      }

      return session;
    },
  },
  events: {
    async signIn(message) {
      /* on successful sign in */
      //console.log('signIn', message);
    },
    async signOut(message) {
      /* on signout */
      //console.log('signOut', message);
    },
    async createUser(message) {
      /* user created */
      //console.log('createUser', message);
    },
    async updateUser(message) {
      /* user updated - e.g. their email was verified */
      //console.log('updateUser', message);
    },
    async linkAccount(message) {
      /* account (e.g. GitHub) linked to a user */
      //console.log('linkAccount', message);
    },
    async session(message) {
      /* session is active */
    },
  },
});
