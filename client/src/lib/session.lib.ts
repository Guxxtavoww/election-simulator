'use server';

import { redirect } from 'next/navigation';

import { type UserType, userSchema } from '@/server/actions/auth/auth.types';
import { getCookie, removeAllCookies } from '@/server/helpers/cookie.helpers';

const cache: {
  data: Maybe<{ access_token: Maybe<string>; user: Maybe<UserType> }>;
  expiry: number;
} = {
  data: null,
  expiry: 0,
};

const CACHE_DURATION = 300000; // 5min in ms

export async function session<ForceNoUndefined extends boolean = false>(
  skipCache = false
): Promise<{
  access_token: string | undefined;
  user: ForceNoUndefined extends false ? UserType | undefined : UserType;
}> {
  const now = Date.now();

  if (!skipCache && cache.data && cache.expiry > now) return cache.data as any;

  const [user, access_token] = await Promise.all([
    getCookie('user'),
    getCookie('access_token'),
  ]);

  const userResponse = user ? userSchema.parse(JSON.parse(user)) : undefined;

  const baseAuthObject = { access_token };

  const result = userResponse
    ? {
        ...baseAuthObject,
        user: userResponse,
      }
    : {
        ...baseAuthObject,
        user: undefined,
      };

  cache.data = result;
  cache.expiry = now + CACHE_DURATION;

  return result as any;
}

export async function logOut() {
  await removeAllCookies();

  cache.data = null;
  cache.expiry = 0;

  redirect('/auth/login');
}
