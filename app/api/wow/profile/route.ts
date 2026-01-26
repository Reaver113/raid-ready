import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { getWowAccountProfile } from "@/lib/api";
import { Session } from "next-auth";

export async function GET() {
  try {
    const session = (await getServerSession(authConfig)) as
      | (Session & {
          access_token?: string;
        })
      | null;

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await getWowAccountProfile(session);
    return Response.json(profile);
  } catch (error) {
    console.error("Error fetching WoW profile:", error);
    return Response.json(
      { error: "Failed to fetch WoW profile" },
      { status: 500 },
    );
  }
}
