import NextAuth from 'next-auth';
import type { Role } from '@/types/api';

const issuer = process.env.AUTH_ISSUER ?? 'https://tcss-460-iam.onrender.com';

async function fetchTriageProfile(accessToken: string) {
  const base = process.env.NEXT_PUBLIC_API_URL ?? '';
  try {
    const res = await fetch(`${base}/v1/users/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: 'no-store',
    });
    if (!res.ok) {
      return { role: 'User' as Role, canTriage: false };
    }
    const body = (await res.json()) as {
      data: { role: Role; canTriage: boolean };
    };
    return {
      role: body.data.role,
      canTriage: body.data.canTriage,
    };
  } catch {
    return { role: 'User' as Role, canTriage: false };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    {
      id: 'auth2',
      name: 'TCSS 460',
      type: 'oidc',
      issuer,
      clientId: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'openid profile email',
          audience: process.env.API_AUDIENCE ?? 'group-6-api',
        },
      },
    },
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
        const profile = await fetchTriageProfile(account.access_token);
        token.role = profile.role;
        token.canTriage = profile.canTriage;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string | undefined;
      session.role = token.role as Role | undefined;
      session.canTriage = Boolean(token.canTriage);
      return session;
    },
  },
});
