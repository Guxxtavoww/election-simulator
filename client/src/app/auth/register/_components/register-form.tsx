'use client';

import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/tools/loader';
import { register } from '@/server/actions/auth/register.action';
import { InputField } from '@/components/tools/fields/input-field';
import { cpfNumberMask, phoneNumberMask } from '@/utils/masks.utils';
import { useMutationWithToast } from '@/hooks/use-mutation-with-toast.hook';
import { InputFieldWithMask } from '@/components/tools/fields/input-field-with-mask';

import {
  type RegisterPayload,
  registerSchema,
} from '../_schemas/register.schema';

export function RegisterForm() {
  const { mutateAsync, isPending } = useMutationWithToast({
    mutationKey: ['login'],
    mutationFn: async ({ confirmed_password, ...rest }: RegisterPayload) =>
      register(rest),
    toastCustomError: 'Email already exists',
  });

  const form = useForm<RegisterPayload>({
    resolver: zodResolver(registerSchema),
    disabled: isPending,
  });

  const handleSubmit = useCallback(
    (data: RegisterPayload) => {
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
          name="user_name"
          label="Nome de usuário"
          placeholder="Insira seu nome de usuário"
          isRequired
        />
        <InputField
          name="user_email"
          type="email"
          label="E-mail"
          placeholder="Insira seu e-mail"
          isRequired
        />
        <InputFieldWithMask
          name="user_cpf_number"
          label="CPF"
          placeholder="Insira seu CPF"
          maskFn={cpfNumberMask}
          isRequired
        />
        <InputFieldWithMask
          name="phone_number"
          label="Telefone"
          placeholder="Insira seu número"
          maskFn={phoneNumberMask}
        />
        <InputField
          name="password"
          type="password"
          label="Your Password"
          placeholder="Insert your password"
          isRequired
        />
        <InputField
          name="confirmed_password"
          type="password"
          label="Confirmação"
          placeholder="Confirme sua senha"
          isRequired
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? <Loader /> : 'Cadastrar'}
        </Button>
      </form>
    </Form>
  );
}
