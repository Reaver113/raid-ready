import { useEffect, useState } from "react";
import LoadingWheel from "../shared/loadingWheel/LoadingWheel";
import type {
  JournalEncounterDetail,
  JournalInstanceMode,
  JournalInstanceRef,
  ItemDetail,
} from "@/lib/types";
import fetchEncounter from "@/fetch/fetchEncounter";
import fetchItem from "@/fetch/fetchItem";

type Props = {
  selectedRaid: JournalInstanceRef;
  selectedDifficulty: JournalInstanceMode;
  firstRaidEncounterId: string | null;
};

const IlvlCalculation = ({
  selectedRaid,
  selectedDifficulty,
  firstRaidEncounterId,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [encounter, setEncounter] = useState<JournalEncounterDetail | null>(
    null,
  );
  const [dropsList, setDropsList] = useState<ItemDetail[] | null>(null);

  const [dropedItemLevel, setDropedItemLevel] = useState<number | null>(null);

  useEffect(() => {
    if (selectedRaid && selectedDifficulty && firstRaidEncounterId) {
      fetchEncounter({
        setLoading,
        setEncounter,
        setError,
        encounterId: firstRaidEncounterId,
      });
    }
  }, [selectedRaid, selectedDifficulty, firstRaidEncounterId]);

  console.log(encounter);

  useEffect(() => {
    if (encounter?.items) {
      for (const item of encounter.items) {
        if (item.item?.id) {
          fetchItem({
            setLoading,
            setItem: (itemData) => {
              setDropsList((prev) => (prev ? [...prev, itemData] : [itemData]));
            },
            setError,
            itemId: item.item.id,
          });
        }
      }
    }
  }, [encounter]);

  console.log(dropedItemLevel);

  if (loading) return <LoadingWheel />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ color: "var(--cl-orange)" }}>
      {dropsList?.[0]?.level?.toString()}
    </div>
  );
};

export default IlvlCalculation;
