import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { getEncounter } from "@/lib/api";
import { Session } from "next-auth";

export async function GET(request: Request) {
  try {
    const session = (await getServerSession(authConfig)) as
      | (Session & {
          access_token?: string;
        })
      | null;

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const encounterId = Number(url.searchParams.get("encounterId"));

    const equipment = await getEncounter(session, encounterId);
    return Response.json(equipment);
  } catch (error) {
    console.error("Error fetching expansion data:", error);
    return Response.json(
      { error: "Failed to fetch expansion data" },
      { status: 500 },
    );
  }
}
