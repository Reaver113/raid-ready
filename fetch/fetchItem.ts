import type { ItemDetail } from "@/lib/types";

type FetchItemProps = {
  setLoading: (loading: boolean) => void;
  setItem: (item: ItemDetail) => void;
  setError: (error: string | null) => void;
  itemId: number;
};

const fetchItem = async ({
  setLoading,
  setItem,
  setError,
  itemId,
}: FetchItemProps) => {
  try {
    setLoading(true);
    const response = await fetch(`/api/wow/item?itemId=${itemId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch item icon");
    }
    const data = await response.json();
    setItem(data);
  } catch (err) {
    setError(err instanceof Error ? err.message : "An error occurred");
  } finally {
    setLoading(false);
  }
};
export default fetchItem;
