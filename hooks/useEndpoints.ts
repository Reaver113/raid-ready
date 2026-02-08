import { useApi } from "@/hooks/useApi";
import type {
  WoWProfile,
  CharacterEquipmentProps,
  CharacterAppearanceProps,
  ItemDetail,
  ItemIcon,
  JournalEncounterDetail,
  JournalInstanceDetail,
  CurrentExpansion,
} from "@/lib/types";

export const useProfile = () => {
  return useApi<WoWProfile>("/api/wow/profile");
};

export const useCharacterEquipment = (
  realmSlug: string | null,
  characterName: string | null,
) => {
  const shouldFetch = !!realmSlug && !!characterName;
  return useApi<CharacterEquipmentProps>(
    shouldFetch ? "/api/wow/equipment" : null,
    shouldFetch
      ? { realmSlug, characterName: characterName.toLowerCase() }
      : undefined,
    { immediate: shouldFetch },
  );
};

export const useCharacterAppearance = (
  realmSlug: string | null,
  characterName: string | null,
) => {
  const shouldFetch = !!realmSlug && !!characterName;
  return useApi<CharacterAppearanceProps>(
    shouldFetch ? "/api/wow/appearance" : null,
    shouldFetch
      ? { realmSlug, characterName: characterName.toLowerCase() }
      : undefined,
    { immediate: shouldFetch },
  );
};

export const useItem = (itemId: number | null) => {
  return useApi<ItemDetail>(
    itemId ? "/api/wow/item" : null,
    itemId ? { itemId } : undefined,
    { immediate: !!itemId },
  );
};

export const useItems = (itemIds: number[]) => {
  const itemIdsString = itemIds.length > 0 ? itemIds.join(",") : null;
  return useApi<ItemDetail[]>(
    itemIdsString ? "/api/wow/items" : null,
    itemIdsString ? { itemIds: itemIdsString } : undefined,
    { immediate: !!itemIdsString },
  );
};

export const useItemIcon = (itemId: number | null) => {
  return useApi<ItemIcon>(
    itemId ? "/api/wow/itemIcon" : null,
    itemId ? { itemId } : undefined,
    { immediate: !!itemId },
  );
};

export const useEncounter = (encounterId: string | null) => {
  return useApi<JournalEncounterDetail>(
    encounterId ? "/api/wow/encounter" : null,
    encounterId ? { encounterId } : undefined,
    { immediate: !!encounterId },
  );
};

export const useInstance = (journalInstanceId: number | null) => {
  return useApi<JournalInstanceDetail>(
    journalInstanceId ? "/api/wow/instance" : null,
    journalInstanceId ? { instanceId: journalInstanceId } : undefined,
    { immediate: !!journalInstanceId },
  );
};

export const useCurrentExpansion = () => {
  return useApi<CurrentExpansion>("/api/wow/currentExpansion");
};
