type FetchEncounterProps = {
  setLoading: (loading: boolean) => void;
  setEncounter: (encounter: any) => void;
  setError: (error: string | null) => void;
  encounterId: string;
};

const fetchEncounter = async ({
  setLoading,
  setEncounter,
  setError,
  encounterId,
}: FetchEncounterProps) => {
  try {
    setLoading(true);
    const response = await fetch(
      `/api/wow/encounter?encounterId=${encounterId}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Encounter");
    }
    const data = await response.json();
    setEncounter(data);
  } catch (err) {
    setError(err instanceof Error ? err.message : "An error occurred");
  } finally {
    setLoading(false);
  }
};
export default fetchEncounter;
