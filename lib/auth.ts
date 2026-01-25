import { NextAuthOptions, Session } from "next-auth";
import BattleNetProvider, {
  BattleNetIssuer,
} from "next-auth/providers/battlenet";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    access_token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token?: string;
  }
}

export const authConfig: NextAuthOptions = {
  providers: [
    BattleNetProvider({
      clientId: process.env.AUTH_BATTLENET_ID!,
      clientSecret: process.env.AUTH_BATTLENET_SECRET!,
      issuer: process.env.AUTH_BATTLENET_ISSUER! as BattleNetIssuer,
      checks: ["state", "nonce"],
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          scope: "openid wow.profile",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      // Only called on initial sign-in
      if (account?.access_token) {
        token.access_token = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Store access_token on session for server-side API route use only
      // Safe because this is only accessed server-side via getServerSession
      session.access_token = token.access_token as string;
      return session;
    },
  },
};
