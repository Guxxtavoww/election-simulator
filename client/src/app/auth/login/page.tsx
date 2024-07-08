/* eslint-disable react/no-unescaped-entities */

import Link from 'next/link';

import { LoginForm } from './_components/login-form';

export default async function LoginPage() {
  return (
    <>
      <h1 className="text-2xl">Login</h1>
      <LoginForm />
      <div className="w-full flex justify-end">
        <Link
          href="/auth/register"
          className="text-slate-950 font-medium text-sm"
        >
          Não tem uma conta? Clique aqui
        </Link>
      </div>
    </>
  );
}
