'use client';

import {
  useMutation,
  type DefaultError,
  type UseMutationOptions,
  type UseBaseMutationResult,
} from '@tanstack/react-query';
import { useMemo, useRef, type ReactNode } from 'react';

import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';

export type UseMutationWithToastOptions<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown
> = UseMutationOptions<TData, TError, TVariables, TContext> & {
  toastCustomError?: string;
  toastCustomSuccessMessage?: string;
  retryLimit?: number;
};

export function useMutationWithToast<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown
>({
  toastCustomSuccessMessage = 'Operation completed successfully!',
  toastCustomError = 'An error occurred during the operation.',
  onSuccess,
  onError,
  retryLimit = 6,
  ...options
}: UseMutationWithToastOptions<
  TData,
  TError,
  TVariables,
  TContext
>): UseBaseMutationResult<TData, TError, TVariables, TContext> & {
  isRetryAttemptsExceeded: boolean;
  disabled: boolean;
} {
  const { toast } = useToast();
  const retriesCountRef = useRef(0);

  const mutationResult = useMutation<TData, TError, TVariables, TContext>({
    ...options,
    onSuccess: (data, variables, context) => {
      toast({
        title: toastCustomSuccessMessage,
        variant: 'success',
      });

      return onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      if (retriesCountRef.current >= retryLimit) {
        toast({
          title: 'Retry attempts exceeded',
          description: `You have reached the maximum retry limit of ${retryLimit}.`,
        });

        return onError?.(error, variables, context);
      }

      const description: ReactNode = <p>{(error as Error).message}</p>;

      retriesCountRef.current++;

      toast({
        title: toastCustomError,
        variant: 'destructive',
        description,
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => mutationResult.mutate(variables)}
          >
            Try again
          </ToastAction>
        ),
      });

      return onError?.(error, variables, context);
    },
  });

  const disabled = useMemo(
    () => retriesCountRef.current >= retryLimit || mutationResult.isPending,
    [retryLimit, mutationResult.isPending]
  );

  return {
    ...mutationResult,
    isRetryAttemptsExceeded: retriesCountRef.current >= retryLimit,
    disabled,
  };
}
