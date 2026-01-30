type FetchAppearanceProps = {
  setLoading: (loading: boolean) => void;
  setCharacterAppearance: (characterAppearance: any) => void;
  setError: (error: string | null) => void;
  realmSlug: string;
  characterName: string;
};

const fetchAppearance = async ({
  setLoading,
  setCharacterAppearance,
  setError,
  realmSlug,
  characterName,
}: FetchAppearanceProps) => {
  try {
    setLoading(true);
    const response = await fetch(
      `/api/wow/appearance?realmSlug=${realmSlug}&characterName=${characterName}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Appearance");
    }
    const data = await response.json();
    setCharacterAppearance(data);
  } catch (err) {
    setError(err instanceof Error ? err.message : "An error occurred");
  } finally {
    setLoading(false);
  }
};
export default fetchAppearance;
