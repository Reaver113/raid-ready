"use client";

import { useEffect, useState } from "react";
import { Dropdown } from "../../shared/dropdown/Dropdown";
import { useCurrentExpansion, useInstance } from "@/hooks/useEndpoints";
import LoadingWheel from "../../shared/loadingWheel/LoadingWheel";
import type {
  CurrentExpansion,
  JournalInstanceDetail,
  JournalInstanceRef,
  JournalInstanceMode,
} from "@/lib/types";
import { Col, Row } from "react-bootstrap";

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
    <Row>
      <Col xs={7}>
        {expansionError ? (
          <div>Error: {expansionError}</div>
        ) : expansionLoading ? (
          <LoadingWheel size={24} />
        ) : (
          <Dropdown
            items={raids}
            value={selectedRaid ?? undefined}
            onChange={(raid) => {
              setSelectedRaid(raid);
              setSelectedDifficulty(null);
            }}
            getLabel={(raid) => raid.name}
            placeholder="Choose a raid..."
          />
        )}
      </Col>
      <Col xs={5}>
        {instanceError ? (
          <div>Error: {instanceError}</div>
        ) : instanceLoading ? (
          <LoadingWheel size={24} />
        ) : (
          modes && (
            <Dropdown
              items={modes}
              value={selectedDifficulty ?? undefined}
              onChange={(difficulty) => setSelectedDifficulty(difficulty)}
              getLabel={(difficulty) =>
                difficulty.mode?.name || difficulty.mode?.type || ""
              }
              placeholder="Difficulty..."
            />
          )
        )}
      </Col>
    </Row>
  );
};

export default RaidSelect;
