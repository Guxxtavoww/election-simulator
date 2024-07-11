'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/auth.provider';

export default function Page() {
  const { logout, isLoading } = useAuth();

  return (
    <div>
      <h1>Hello</h1>
      <Button onClick={logout} disabled={isLoading}>
        Logout
      </Button>
    </div>
  );
}
