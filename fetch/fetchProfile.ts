type FetchProfileProps = {
  setLoading: (loading: boolean) => void;
  setProfile: (profile: any) => void;
  setError: (error: string | null) => void;
};

const fetchProfile = async ({
  setLoading,
  setProfile,
  setError,
}: FetchProfileProps) => {
  try {
    setLoading(true);
    const response = await fetch("/api/wow/profile");
    if (!response.ok) {
      throw new Error("Failed to fetch WoW profile");
    }
    const data = await response.json();
    setProfile(data);
  } catch (err) {
    setError(err instanceof Error ? err.message : "An error occurred");
  } finally {
    setLoading(false);
  }
};
export default fetchProfile;
