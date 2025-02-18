import axios, { AxiosError } from 'axios';

import { session } from './session.lib';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

let memoryAccessToken: Maybe<string> = undefined;

api.interceptors.request.use(async (req) => {
  if (memoryAccessToken) {
    req.headers.Authorization = `Bearer ${memoryAccessToken}`;
  } else {
    const { access_token } = await session();

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
    }

    const response = err.response?.data as any;

    const message = String(response?.message || response?.detail || 'Error');

    throw new Error(message);
  }
);

export { api };
