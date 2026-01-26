import { Session } from "next-auth";

const BATTLENET_API_BASE = "https://us.api.blizzard.com";

export async function getWowAccountProfile(session: Session | null) {
  if (!session || !session.access_token) {
    throw new Error("No valid session or access token available");
  }

  try {
    const response = await fetch(
      `${BATTLENET_API_BASE}/profile/user/wow?namespace=profile-us&locale=en_US`,
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Battle.net API error: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch WoW account profile:", error);
    throw error;
  }
}
