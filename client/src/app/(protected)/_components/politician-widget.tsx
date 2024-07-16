'use client';

import Image from 'next/image';
import { Printer } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Icon } from '@/components/tools/icon';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/tools/loader';
import { unVote, vote } from '@/server/actions/vote/vote.actions';
import { useMutationWithToast } from '@/hooks/use-mutation-with-toast.hook';
import type { Politician } from '@/server/actions/politician/politician.types';
import { useMemo } from 'react';

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
  const isVoted = useMemo(
    () => voted_by_current_user === true,
    [voted_by_current_user]
  );

  const { mutateAsync, isPending, disabled } = useMutationWithToast({
    mutationKey: ['vote'],
    mutationFn: () => (isVoted ? unVote(id) : vote(id)),
  });

  return (
    <Card>
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
          className="max-w-sm h-[150px]"
        />
        <CardDescription className="capitalize">
          {politician_type}
        </CardDescription>
        <CardDescription>Quantidade de votos: {votes_amount}</CardDescription>
        <CardDescription>
          Escandalos de corrupção: {corruption_scandals_amount}
        </CardDescription>
      </CardContent>
      <CardFooter className="justify-end">
        <Button
          onClick={() => mutateAsync()}
          variant={isVoted ? 'destructive' : 'outline'}
          disabled={isPending || disabled}
        >
          {isPending ? (
            <Loader />
          ) : (
            <>
              <Icon icon={Printer} size="sm" />{' '}
              {voted_by_current_user ? 'Remover Voto' : 'Votar'}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
