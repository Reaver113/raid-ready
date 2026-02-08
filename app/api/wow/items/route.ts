import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { getItem } from "@/lib/api";
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
    const itemIdsParam = url.searchParams.get("itemIds");

    if (!itemIdsParam) {
      return Response.json(
        {
          error: "Missing required query parameters: itemIds",
        },
        { status: 400 },
      );
    }

    // Parse comma-separated item IDs
    const itemIds = itemIdsParam
      .split(",")
      .map((id) => parseInt(id.trim()))
      .filter((id) => !isNaN(id));

    if (itemIds.length === 0) {
      return Response.json(
        {
          error: "No valid item IDs provided",
        },
        { status: 400 },
      );
    }

    // Fetch all items concurrently
    const itemPromises = itemIds.map((itemId) => getItem(session, itemId));
    const items = await Promise.all(itemPromises);

    return Response.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    return Response.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}
