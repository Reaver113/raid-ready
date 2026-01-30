type FetchCurrentExpansionProps = {
  setLoading: (loading: boolean) => void;
  setCurrentExpansion: (currentExpansion: any) => void;
  setError: (error: string | null) => void;
};

const fetchCurrentExpansion = async ({
  setLoading,
  setCurrentExpansion,
  setError,
}: FetchCurrentExpansionProps) => {
  try {
    setLoading(true);
    const response = await fetch(`/api/wow/currentExpansion`);
    if (!response.ok) {
      throw new Error("Failed to fetch Appearance");
    }
    const data = await response.json();
    setCurrentExpansion(data);
  } catch (err) {
    setError(err instanceof Error ? err.message : "An error occurred");
  } finally {
    setLoading(false);
  }
};
export default fetchCurrentExpansion;
