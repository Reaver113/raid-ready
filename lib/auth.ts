import { NextAuthOptions } from "next-auth";
import BattleNetProvider, {
  BattleNetIssuer,
} from "next-auth/providers/battlenet";

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
        // Added to allow fetching of WoW profile data
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
      if (account?.access_token) {
        token.access_token = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.access_token = token.access_token as string;
      return session;
    },
  },
};
