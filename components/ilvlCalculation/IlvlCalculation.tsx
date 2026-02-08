import { useEffect, useState } from "react";
import LoadingWheel from "../shared/loadingWheel/LoadingWheel";
import type {
  CharacterEquipmentProps,
  JournalEncounterDetail,
  JournalInstanceMode,
  JournalInstanceRef,
  ItemDetail,
} from "@/lib/types";
import { useEncounter, useItems } from "@/hooks/useEndpoints";
import styles from "./ilvl-calculation.module.css";
import { Col, Row } from "react-bootstrap";

type Props = {
  characterEquipment: CharacterEquipmentProps | null;
  selectedRaid: JournalInstanceRef;
  selectedDifficulty: JournalInstanceMode;
  firstRaidEncounterId: string | null;
};

const IlvlCalculation = ({
  characterEquipment,
  selectedRaid,
  selectedDifficulty,
  firstRaidEncounterId,
}: Props) => {
  const {
    data: encounter,
    loading: encounterLoading,
    error: encounterError,
  } = useEncounter(firstRaidEncounterId);

  const itemIds =
    encounter?.items
      ?.map((item) => item.item?.id)
      .filter((id): id is number => !!id) || [];
  const {
    data: dropsList,
    loading: itemsLoading,
    error: itemsError,
  } = useItems(itemIds);

  const [dropedItemLevel, setDropedItemLevel] = useState<number | null>(null);

  const loading = encounterLoading || itemsLoading;
  const error = encounterError || itemsError;

  console.log("Drops List:", dropsList);

  function getAverageEquippedIvl(characterEquipment: CharacterEquipmentProps) {
    const equippedItems = characterEquipment.equipped_items || [];

    // Extract item levels, filtering out undefined/null values
    const itemLevels = equippedItems
      .map((item) => item.level?.value)
      .filter((level): level is number => typeof level === "number");

    if (itemLevels.length === 0) return 0;

    const sum = itemLevels.reduce((total, level) => total + level, 0);
    return Math.round(sum / itemLevels.length);
  }

  function getMostCommonIlvl(items: ItemDetail[]) {
    if (items.length === 0) return 0;

    const levelCounts: Record<number, number> = {};

    // Count occurrences of each level
    items.forEach((item) => {
      const level = item?.level || 0;
      levelCounts[level] = (levelCounts[level] || 0) + 1;
    });

    // Find the level with the highest count
    let mostCommonLevel = 0;
    let maxCount = 0;

    for (const [level, count] of Object.entries(levelCounts)) {
      if (count > maxCount) {
        maxCount = count;
        mostCommonLevel = parseInt(level);
      }
    }

    return mostCommonLevel;
  }

  const requiredIlvl = dropsList && getMostCommonIlvl(dropsList) - 15;
  const currentAverageIlvl = characterEquipment
    ? getAverageEquippedIvl(characterEquipment)
    : 0;

  console.log("Required iLvl:", requiredIlvl);
  console.log("Current Average iLvl:", currentAverageIlvl);

  const isAboveRequirement = requiredIlvl && currentAverageIlvl >= requiredIlvl;

  const currentIlvlStyles = isAboveRequirement
    ? styles.aboveRequirement
    : styles.belowRequirement;

  const displayedContent = () => {
    if (loading) return <LoadingWheel />;
    if (error) return <div>Error: {error}</div>;
    return (
      <>
        <Row>
          <Col className={styles.ilvlContainer}>
            <div className={styles.label}>Your Item Level:</div>
            <div className={`${styles.currentIlvl} ${currentIlvlStyles}`}>
              {currentAverageIlvl}
            </div>
          </Col>
          <Col className={styles.ilvlContainer}>
            <div className={styles.label}>Required Item Level:</div>
            <div className={styles.requiredIlvl}>{requiredIlvl}</div>
          </Col>
        </Row>
        <Row>
          <Col className={`${styles.infoText} ${currentIlvlStyles}`}>
            {isAboveRequirement
              ? "You meet the item level requirement for this raid encounter!"
              : "You do not meet the item level requirement for this raid encounter."}
          </Col>
        </Row>
      </>
    );
  };

  return <Col xs={12}>{displayedContent()}</Col>;
};

export default IlvlCalculation;
