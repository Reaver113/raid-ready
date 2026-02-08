"use client";

import { useEffect, useState } from "react";
import { Dropdown } from "../shared/dropdown/Dropdown";
import { useCurrentExpansion, useInstance } from "@/hooks/useEndpoints";
import { useCollapseDropdowns } from "@/hooks/useCollapseDropdowns";
import LoadingWheel from "../shared/loadingWheel/LoadingWheel";
import type {
  CurrentExpansion,
  JournalInstanceDetail,
  JournalInstanceRef,
  JournalInstanceMode,
} from "@/lib/types";
import { Col, Row } from "react-bootstrap";

import styles from "./raid-select.module.css";
import CollapseDropdowns from "../shared/collapseDropdowns/CollapseDropdowns";

type Props = {
  selectedRaid: JournalInstanceRef | null;
  setSelectedRaid: (raid: JournalInstanceRef | null) => void;
  selectedDifficulty: JournalInstanceMode | null;
  setSelectedDifficulty: (difficulty: JournalInstanceMode | null) => void;
  setFirstRaidEncounterId: (encounter: string) => void;
};
const RaidSelect = ({
  selectedRaid,
  setSelectedRaid,
  selectedDifficulty,
  setSelectedDifficulty,
  setFirstRaidEncounterId,
}: Props) => {
  const {
    data: currentExpansion,
    loading: expansionLoading,
    error: expansionError,
  } = useCurrentExpansion();

  const {
    data: currentInstance,
    loading: instanceLoading,
    error: instanceError,
  } = useInstance(selectedRaid?.id || null);

  const [modes, setModes] = useState<JournalInstanceMode[] | null>(null);
  const [raids, setRaids] = useState<JournalInstanceRef[]>([]);

  const { isExpanded, collapse } = useCollapseDropdowns({
    firstValue: selectedRaid,
    secondValue: selectedDifficulty,
    secondValueChangeKey: selectedDifficulty?.mode?.name,
  });

  useEffect(() => {
    if (currentExpansion) {
      setRaids(currentExpansion.raids || []);
    }
  }, [currentExpansion]);

  useEffect(() => {
    if (currentInstance) {
      setModes(currentInstance.modes || []);
      if (currentInstance?.encounters) {
        setFirstRaidEncounterId(currentInstance.encounters[0].id.toString());
      }
    }
  }, [currentInstance]);

  return (
    <CollapseDropdowns
      label={`${selectedRaid?.name} > ${selectedDifficulty?.mode?.name}`}
      condition={isExpanded}
    >
      <Col xs={6} md={12} className={styles.raidSelectContainer}>
        {expansionError ? (
          <div>Error: {expansionError}</div>
        ) : expansionLoading ? (
          <LoadingWheel size={24} />
        ) : (
          <>
            <label className={styles.label}>Select Raid</label>
            <Dropdown
              items={raids}
              value={selectedRaid ?? undefined}
              onChange={(raid) => {
                setSelectedRaid(raid);
                setSelectedDifficulty(null);
                collapse();
              }}
              getLabel={(raid) => raid.name}
              placeholder="Choose a raid..."
            />
          </>
        )}
      </Col>
      <Col xs={6} md={12} className={styles.raidSelectContainer}>
        {instanceError ? (
          <div>Error: {instanceError}</div>
        ) : instanceLoading ? (
          <LoadingWheel size={24} />
        ) : (
          modes && (
            <>
              <label className={styles.label}>Select Difficulty</label>
              <Dropdown
                items={modes}
                value={selectedDifficulty ?? undefined}
                onChange={(difficulty) => {
                  setSelectedDifficulty(difficulty);
                  collapse();
                }}
                getLabel={(difficulty) =>
                  difficulty.mode?.name || difficulty.mode?.type || ""
                }
                placeholder="Difficulty..."
              />
            </>
          )
        )}
      </Col>
    </CollapseDropdowns>
  );
};

export default RaidSelect;
