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
      const responseBody = await response
        .text()
        .catch(() => "<unable to read body>");
      console.error("Battle.net API error fetching WoW account profile", {
        url: response.url,
        status: response.status,
        statusText: response.statusText,
        body: responseBody,
      });
      throw new Error(
        `Battle.net API error: ${response.status} ${response.statusText} - ${responseBody}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch WoW account profile:", error);
    throw error;
  }
}

export async function getCharacterEquipment(
  session: Session | null,
  realmSlug: string,
  characterName: string,
) {
  if (!session || !session.access_token) {
    throw new Error("No valid session or access token available");
  }

  const realm = encodeURIComponent(realmSlug);
  const character = encodeURIComponent(characterName);

  try {
    const response = await fetch(
      `${BATTLENET_API_BASE}/profile/wow/character/${realm}/${character}/equipment?namespace=profile-us&locale=en_US`,
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      const responseBody = await response
        .text()
        .catch(() => "<unable to read body>");
      console.error("Battle.net API error fetching character equipment", {
        url: response.url,
        realm: realm,
        character: character,
        status: response.status,
        statusText: response.statusText,
        body: responseBody,
      });
      throw new Error(
        `Battle.net API error: ${response.status} ${response.statusText} - ${responseBody}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch Character Equipment:", error);
    throw error;
  }
}

export async function getCharacterAppearance(
  session: Session | null,
  realmSlug: string,
  characterName: string,
) {
  if (!session || !session.access_token) {
    throw new Error("No valid session or access token available");
  }

  const realm = encodeURIComponent(realmSlug);
  const character = encodeURIComponent(characterName);

  try {
    const response = await fetch(
      `${BATTLENET_API_BASE}/profile/wow/character/${realm}/${character}/appearance?namespace=profile-us&locale=en_US`,
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      const responseBody = await response
        .text()
        .catch(() => "<unable to read body>");
      console.error("Battle.net API error fetching character appearance", {
        url: response.url,
        realm: realm,
        character: character,
        status: response.status,
        statusText: response.statusText,
        body: responseBody,
      });
      throw new Error(
        `Battle.net API error: ${response.status} ${response.statusText} - ${responseBody}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch Character Appearance:", error);
    throw error;
  }
}

export async function getItemImage(session: Session | null, itemId: number) {
  if (!session || !session.access_token) {
    throw new Error("No valid session or access token available");
  }

  try {
    const response = await fetch(
      `${BATTLENET_API_BASE}/data/wow/media/item/${itemId}?namespace=static-us&locale=en_US`,
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      const responseBody = await response
        .text()
        .catch(() => "<unable to read body>");
      console.error("Battle.net API error fetching item image", {
        url: response.url,
        itemId: itemId,
        status: response.status,
        statusText: response.statusText,
        body: responseBody,
      });
      throw new Error(
        `Battle.net API error: ${response.status} ${response.statusText} - ${responseBody}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch Item Image:", error);
    throw error;
  }
}
