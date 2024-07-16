'use server';

import { revalidatePath } from 'next/cache';

import { api } from '@/lib/api.lib';

export async function vote(politician_id: string) {
  await api.post(`/vote/${politician_id}`);

  revalidatePath('/');
}

export async function unVote(politician_id: string) {
  await api.delete(`/vote/${politician_id}`);

  revalidatePath('/');
}
