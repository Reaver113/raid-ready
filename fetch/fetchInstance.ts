type FetchInstanceProps = {
  setLoading: (loading: boolean) => void;
  setCurrentInstance: (currentInstance: any) => void;
  setError: (error: string | null) => void;
  instanceId: number;
};
const fetchInstance = async ({
  setLoading,
  setCurrentInstance,
  setError,
  instanceId,
}: FetchInstanceProps) => {
  try {
    setLoading(true);
    const response = await fetch(`/api/wow/instance?instanceId=${instanceId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch Appearance");
    }
    const data = await response.json();
    setCurrentInstance(data);
  } catch (err) {
    setError(err instanceof Error ? err.message : "An error occurred");
  } finally {
    setLoading(false);
  }
};
export default fetchInstance;
