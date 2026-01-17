import { NextAuthOptions } from "next-auth";
import BattleNetProvider, {
  BattleNetIssuer,
} from "next-auth/providers/battlenet";

export const authConfig: NextAuthOptions = {
  providers: [
    BattleNetProvider({
      clientId: process.env.AUTH_BATTLENET_ID!,
      clientSecret: process.env.AUTH_BATTLENET_SECRET!,
      issuer: process.env.AUTH_BATTLENET_ISSUER! as BattleNetIssuer,
    }),
  ],
};
