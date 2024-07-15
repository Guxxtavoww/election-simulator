'use client';

import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';

import { logOut, session } from '@/lib/session.lib';
import type { UserType } from '@/server/actions/auth/auth.types';
import { useMutationWithToast } from '@/hooks/use-mutation-with-toast.hook';

export interface AuthContextProps {
  user?: UserType;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: WithChildren): JSX.Element {
  const { data, isLoading } = useQuery({
    queryKey: ['get-session'],
    queryFn: async () => session<true>(true),
  });

  const { mutate, isPending } = useMutationWithToast({
    mutationKey: ['logout'],
    mutationFn: logOut,
    toastCustomSuccessMessage: 'Saiu com successo!',
  });

  return (
    <AuthContext.Provider
      value={{
        user: data?.user,
        isLoading: isLoading || isPending,
        logout: () => mutate(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
