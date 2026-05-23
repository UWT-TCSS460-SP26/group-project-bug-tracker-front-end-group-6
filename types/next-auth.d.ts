import type { DefaultSession } from 'next-auth';
import type { Role } from '@/types/api';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken?: string;
    role?: Role;
    canTriage?: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    role?: Role;
    canTriage?: boolean;
  }
}
