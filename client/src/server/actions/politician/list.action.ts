'use server';

import { api } from '@/lib/api.lib';

import type { ListPoliticiansParams, Politician } from './politician.types';

export async function listPoliticians(
  params: ListPoliticiansParams
): Promise<Politician[]> {
  const { data } = await api.get<Politician[]>('/politician/list', { params });

  return data;
}
