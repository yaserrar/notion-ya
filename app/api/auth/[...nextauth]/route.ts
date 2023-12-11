import { prisma } from "@/lib/prisma";
import NextAuth, { AuthOptions, Session, SessionStrategy } from "next-auth";
import { JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { User } from "@prisma/client";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_ID!,
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    jwt: ({ token, user }: { token: JWT; user: User | any }) => {
      if (user) {
        return {
          ...token,
          user: user,
        };
      }
      return token;
    },
    session: ({ session, token }: { session: Session; token: JWT }) => {
      const newSession = { ...session, user: token.user } as Session;
      return newSession;
    },
  },

  pages: {
    signIn: "/auth",
    error: "/auth",
  },
};
const handler = NextAuth({ ...authOptions });

export { handler as GET, handler as POST };
