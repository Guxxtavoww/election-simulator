'use server';

import Link from 'next/link';

import { RegisterForm } from './_components/register-form';

export default async function RegisterPage() {
  return (
    <>
      <h1>Cadastro</h1>
      <RegisterForm />
      <div className="w-full flex justify-end">
        <Link
          href="/auth/login"
          className="text-purple-600 font-medium text-sm"
        >
          Já tem uma conta? Clique aqui
        </Link>
      </div>
    </>
  );
}
