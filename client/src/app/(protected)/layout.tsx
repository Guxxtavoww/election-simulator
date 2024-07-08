import { AuthProvider } from '@/providers/auth.provider';

export default function ProtectedLayout({ children }: WithChildren) {
  return <AuthProvider>{children}</AuthProvider>;
}
