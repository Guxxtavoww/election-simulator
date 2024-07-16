'use client';

import Image from 'next/image';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/tools/loader';
import { unVote, vote } from '@/server/actions/vote/vote.actions';
import { useMutationWithToast } from '@/hooks/use-mutation-with-toast.hook';
import type { Politician } from '@/server/actions/politician/politician.types';

function calculateAge(date_of_birth: string) {
  const birthDate = new Date(date_of_birth);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age;
}

export function PoliticianWidget({
  corruption_scandals_amount,
  date_of_birth,
  id,
  political_ideology,
  politician_name,
  politician_photo_url,
  politician_type,
  voted_by_current_user,
  votes_amount,
}: Politician) {
  const { mutateAsync, isPending, disabled } = useMutationWithToast({
    mutationKey: ['vote'],
    mutationFn: () => (voted_by_current_user ? unVote(id) : vote(id)),
  });

  return (
    <Card className="mb-3 last:mb-0">
      <CardHeader>
        <CardTitle>{politician_name}</CardTitle>
        <CardDescription>
          {calculateAge(date_of_birth)} anos, {political_ideology}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2.5">
        <Image
          src={politician_photo_url}
          alt={politician_name}
          width={100}
          height={1}
          className="w-full"
        />
        <CardDescription className="capitalize">{politician_type}</CardDescription>
        <CardDescription>Quantidade de votos: {votes_amount}</CardDescription>
        <CardDescription>
          Escandalos de corrupção: {corruption_scandals_amount}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button onClick={() => mutateAsync()} disabled={isPending || disabled}>
          {isPending ? (
            <Loader />
          ) : voted_by_current_user ? (
            'Remover Voto'
          ) : (
            'Votar'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
