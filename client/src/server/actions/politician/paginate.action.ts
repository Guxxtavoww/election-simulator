'use server';

import { unstable_noStore } from 'next/cache';

import { api } from '@/lib/api.lib';

import type {
  PaginatePoliticiansParams,
  PaginatePoliticiansResponse,
} from './politician.types';

export async function paginatePoliticians(
  params: PaginatePoliticiansParams
): Promise<PaginatePoliticiansResponse> {
  unstable_noStore();

  const { data } = await api.get<PaginatePoliticiansResponse>(
    '/politician/paginate',
    { params }
  );

  return data;
}
