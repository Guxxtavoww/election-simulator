import axios, { AxiosError } from 'axios';
import { redirect } from 'next/navigation';

import { logOut, session } from './session.lib';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

let memmoryAccessToken: Maybe<string> = undefined;

api.interceptors.request.use(async (req) => {
  console.log({ memmoryAccessToken });

  if (memmoryAccessToken) {
    req.headers.Authorization = `Bearer ${memmoryAccessToken}`;
  } else {
    const my_session = await session();

    const access_token = my_session.access_token;

    if (access_token) {
      req.headers.Authorization = `Bearer ${access_token}`;
      memmoryAccessToken = access_token;
    }
  }

  return Promise.resolve(req);
});

api.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    if (err.status === 401) {
      memmoryAccessToken = undefined;

      await logOut();

      redirect('/auth/login');
    }

    const message = String((err.response?.data as any)?.message || 'Error');

    throw new Error(message);
  }
);

export { api };
