import axios, { AxiosError } from 'axios';

import { logOut, session } from './session.lib';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

let memoryAccessToken: Maybe<string> = undefined;

api.interceptors.request.use(async (req) => {
  if (memoryAccessToken) {
    req.headers.Authorization = `Bearer ${memoryAccessToken}`;
  } else {
    const my_session = await session();

    const access_token = my_session.access_token;

    if (access_token) {
      req.headers.Authorization = `Bearer ${access_token}`;
      memoryAccessToken = access_token;
    }
  }

  return Promise.resolve(req);
});

api.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    if (err.response?.status === 401) {
      memoryAccessToken = undefined;

      return await logOut();
    }

    const message = String((err.response?.data as any)?.message || 'Error');

    throw new Error(message);
  }
);

export { api };
