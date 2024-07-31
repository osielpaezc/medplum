import { identity } from '@vueuse/core';
import { jwtDecode } from 'jwt-decode';
import { DefaultJWT } from 'next-auth/jwt';
import { NuxtError } from 'nuxt/app';
import { permission } from 'process';

const { auth0ClientId, auth0ClientSecret, auth0Issuer, auth0Audience } = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  if (!email || !password) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Email and Password is required to login',
      data: {
        email: ['Email and Password is required to login'],
      },
    });
  }

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const urlencoded = new URLSearchParams();
  urlencoded.append('grant_type', 'password');
  urlencoded.append('client_id', auth0ClientId);
  urlencoded.append('client_secret', auth0ClientSecret);
  urlencoded.append('audience', auth0Audience);
  urlencoded.append('username', email);
  urlencoded.append('password', password);
  urlencoded.append('scope', 'openid');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  };

  const auth = await $fetch<any>(`${auth0Issuer}/oauth/token`, requestOptions).catch((err: NuxtError) => {
    throw createError({
      statusCode: err.statusCode,
      statusMessage: err.statusMessage,
      data: {
        email: [err.data.error_description],
      },
    });
  });

  const idToken = jwtDecode(auth.id_token) as DefaultJWT;
  const accessToken = jwtDecode(auth.access_token) as DefaultJWT;
  const permissions = accessToken.permissions.map((perm) => {
    const [action, subject] = perm.split(':');
    return { action, subject };
  });

  const identity = {
    id: idToken.sub,
    name: idToken.name,
    username: idToken.nickname,
    password: password,
    avatar: idToken.picture,
    email: idToken.email,
    role: idToken.role,
    abilityRules: permissions,
    accessToken: accessToken,
  };

  // ℹ️ Don't send password in response
  const { password: _, ...user } = identity;

  return {
    user,
  };
});
