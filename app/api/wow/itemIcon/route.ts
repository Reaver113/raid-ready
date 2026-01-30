import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { getItemImage } from "@/lib/api";
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
    const itemIdParam = url.searchParams.get("itemId");

    if (!itemIdParam) {
      return Response.json(
        {
          error: "Missing required query parameters: itemId",
        },
        { status: 400 },
      );
    }

    const appearance = await getItemImage(session, Number(itemIdParam));
    return Response.json(appearance);
  } catch (error) {
    console.error("Error fetching item image:", error);
    return Response.json(
      { error: "Failed to fetch item image" },
      { status: 500 },
    );
  }
}
