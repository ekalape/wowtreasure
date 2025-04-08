// pages/api/auth/[...nextauth].ts
import NextAuth, { SessionStrategy } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDb, wowUser } from '@/lib/services/mongoDb';

import { NextAuthOptions } from 'next-auth';

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        await connectToDb();
        const user = await wowUser.findOne({ email: credentials?.email });

        if (user && (await user.matchPassword(credentials?.password))) {
          return user;
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt' as SessionStrategy,
    maxAge: 30 * 24 * 60 * 7, // 7 days
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.email) {
        session.user.email = token.email as string;
      } else {
        console.error('session.user or token.email is undefined');
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
