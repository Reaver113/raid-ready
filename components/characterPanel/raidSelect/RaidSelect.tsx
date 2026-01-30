"use client";

import { useEffect, useState } from "react";
import { Dropdown } from "../../shared/dropdown/Dropdown";
import fetchCurrentExpansion from "@/fetch/fetchExpansion";
import LoadingWheel from "../../shared/loadingWheel/LoadingWheel";
import type {
  CurrentExpansion,
  JournalInstanceDetail,
  JournalInstanceRef,
  JournalInstanceMode,
} from "@/lib/types";
import { Col, Row } from "react-bootstrap";
import fetchInstance from "@/fetch/fetchInstance";

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
  const [currentExpansion, setCurrentExpansion] =
    useState<CurrentExpansion | null>(null);
  const [currentInstance, setCurrentInstance] =
    useState<JournalInstanceDetail | null>(null);
  const [instanceLoading, setInstanceLoading] = useState<boolean>(false);
  const [instanceError, setInstanceError] = useState<string | null>(null);
  const [expansionLoading, setExpansionLoading] = useState<boolean>(false);
  const [expansionError, setExpansionError] = useState<string | null>(null);
  const [modes, setModes] = useState<JournalInstanceMode[] | null>(null);
  const [raids, setRaids] = useState<JournalInstanceRef[]>([]);

  useEffect(() => {
    fetchCurrentExpansion({
      setCurrentExpansion,
      setLoading: setExpansionLoading,
      setError: setExpansionError,
    });
  }, []);

  useEffect(() => {
    if (currentExpansion) {
      setRaids(currentExpansion.raids || []);
    }
  }, [currentExpansion]);

  useEffect(() => {
    if (selectedRaid) {
      fetchInstance({
        setLoading: setInstanceLoading,
        setCurrentInstance,
        setError: setInstanceError,
        instanceId: selectedRaid.id,
      });
    }
  }, [selectedRaid]);

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
        {expansionLoading ? (
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
        {instanceLoading ? (
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
