'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { api } from '@/lib/api.lib';
import { setCookie } from '@/server/helpers/cookie.helpers';
import type { LoginPayload } from '@/app/auth/login/_schemas/login.schema';
import type { RegisterPayload } from '@/app/auth/register/_schemas/register.schema';
import { getExpirationDateFromToken } from '@/utils/get-expiration-date-from-token.util';

import type { LoginAndRegisterResponse } from './auth.types';

export async function auth<T extends boolean>(
  isRegister: T,
  payload: T extends false
    ? LoginPayload
    : Omit<RegisterPayload, 'confirmed_password'>
): Promise<void> {
  try {
    const { access_token, user } = await api
      .post<LoginAndRegisterResponse>(
        !isRegister ? '/auth/login' : '/auth/register',
        payload
      )
      .then((res) => Promise.resolve(res.data));

    const expires = getExpirationDateFromToken(access_token);

    await Promise.all([
      setCookie('access_token', access_token, expires),
      setCookie('user', user, expires),
    ]);

    const url = '/';

    revalidatePath(url);
    redirect(url);
  } catch (err) {
    throw err;
  }
}
