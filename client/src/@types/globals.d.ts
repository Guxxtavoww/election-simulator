import type { ReactNode } from 'react';

import type { ENV } from '@/config/env.config';

declare global {
  export type WithChildren<T extends Record<string, any> = {}> = T &
    Readonly<{ children: ReactNode }>;

  export type Maybe<T> = T | undefined | null;

  type MyRecord = Record<string, string | undefined>;

  export type ServerComponentPageProps<
    ParamsType extends MyRecord = MyRecord,
    SearchParamsType extends MyRecord = MyRecord
  > = {
    params: ParamsType;
    searchParams: SearchParamsType;
  };

  export type ErrorPageProps = {
    error: Error & { digest?: string };
    reset: () => void;
  };

  export type BaseEntity<T extends Record<string, any>> = {
    id: string;
    created_at: string;
    updated_at: string | null;
  } & T;

  export interface iPaginationMeta {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  }

  export interface iPaginationResponse<T> {
    items: T[];
    meta: iPaginationMeta;
  }

  namespace NodeJS {
    interface ProcessEnv extends ENV {}
  }
}
