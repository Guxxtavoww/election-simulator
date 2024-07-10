'use client';

import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/tools/loader';
import { auth } from '@/server/actions/auth/auth.action';
import { InputField } from '@/components/tools/fields/input-field';
import { useMutationWithToast } from '@/hooks/use-mutation-with-toast.hook';

import { type LoginPayload, loginSchema } from '../_schemas/login.schema';

export function LoginForm() {
  const { mutateAsync, isPending } = useMutationWithToast({
    mutationKey: ['login'],
    mutationFn: async (data: LoginPayload) => auth(false, data),
    toastCustomError: 'Credenciais inválidas',
  });

  const form = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
    disabled: isPending,
  });

  const handleSubmit = useCallback(
    (data: LoginPayload) => {
      return mutateAsync(data);
    },
    [mutateAsync]
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full flex flex-col gap-3"
      >
        <InputField
          name="user_email"
          type="email"
          label="E-mail"
          placeholder="Insira seu e-mail"
        />
        <InputField
          name="password"
          type="password"
          label="Senha"
          placeholder="Insira sua senha"
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? <Loader /> : 'Login'}
        </Button>
      </form>
    </Form>
  );
}
