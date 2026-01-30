import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { getCharacterEquipment } from "@/lib/api";
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
    const realmSlug = url.searchParams.get("realmSlug");
    const characterName = url.searchParams.get("characterName");

    if (!realmSlug || !characterName) {
      return Response.json(
        {
          error:
            "Missing required query parameters: realmSlug and characterName",
        },
        { status: 400 },
      );
    }

    const equipment = await getCharacterEquipment(
      session,
      realmSlug,
      characterName,
    );
    return Response.json(equipment);
  } catch (error) {
    console.error("Error fetching equipment:", error);
    return Response.json(
      { error: "Failed to fetch equipment" },
      { status: 500 },
    );
  }
}
