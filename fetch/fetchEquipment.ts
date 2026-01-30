type FetchEquipmentProps = {
  setLoading: (loading: boolean) => void;
  setCharacterEquipment: (characterEquipment: any) => void;
  setError: (error: string | null) => void;
  realmSlug: string;
  characterName: string;
};

const fetchEquipment = async ({
  setLoading,
  setCharacterEquipment,
  setError,
  realmSlug,
  characterName,
}: FetchEquipmentProps) => {
  try {
    setLoading(true);
    const response = await fetch(
      `/api/wow/equipment?realmSlug=${realmSlug}&characterName=${characterName}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Equipment");
    }
    const data = await response.json();
    setCharacterEquipment(data);
  } catch (err) {
    setError(err instanceof Error ? err.message : "An error occurred");
  } finally {
    setLoading(false);
  }
};
export default fetchEquipment;
