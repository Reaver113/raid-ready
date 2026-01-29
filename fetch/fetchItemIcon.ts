type FetchProfileProps = {
  setLoading: (loading: boolean) => void;
  setItemIcon: (itemIcon: any) => void;
  setError: (error: string | null) => void;
  itemId: number;
};

const fetchItemIcon = async ({
  setLoading,
  setItemIcon,
  setError,
  itemId,
}: FetchProfileProps) => {
  try {
    setLoading(true);
    const response = await fetch(`/api/wow/item?itemId=${itemId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch item icon");
    }
    const data = await response.json();
    setItemIcon(data);
  } catch (err) {
    setError(err instanceof Error ? err.message : "An error occurred");
  } finally {
    setLoading(false);
  }
};
export default fetchItemIcon;
