'use client';

import { Button } from '@/components/ui/button';
import { removeAllCookies } from '@/server/helpers/cookie.helpers';

export default function AuthErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="space-y-3">
      <h2>Something went wrong!</h2>
      <p>
        Error: {error?.message}, {JSON.stringify(error.cause)}
      </p>
      <Button
        onClick={async () => {
          await removeAllCookies();
          reset();
        }}
      >
        Try again
      </Button>
    </div>
  );
}
