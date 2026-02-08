"use client";
import { Character } from "@/lib/types";
import { useEffect, useState } from "react";
import type {
  JournalInstanceRef,
  JournalInstanceMode,
  Setter,
} from "@/lib/types";
import styles from "./character-panel.module.css";
import { Col, Row } from "react-bootstrap";
import CharacterSelect from "../characterSelect/CharacterSelect";
import CharacterInfo from "@/components/characterInfo/CharacterInfo";
import LoadingWheel from "@/components/shared/loadingWheel/LoadingWheel";
import RaidSelect from "@/components/raidSelect/RaidSelect";
import IlvlCalculation from "@/components/ilvlCalculation/IlvlCalculation";
import CharacterEquipment from "@/components/characterEquipment/CharacterEquipment";
import {
  useProfile,
  useCharacterEquipment,
  useCharacterAppearance,
} from "@/hooks/useEndpoints";

export default function CharacterPanel({
  setIsCharacterSelected,
}: {
  setIsCharacterSelected: Setter;
}) {
  const [firstRaidEncounterId, setFirstRaidEncounterId] = useState<
    string | null
  >(null);
  const [selectedRaid, setSelectedRaid] = useState<JournalInstanceRef | null>(
    null,
  );
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<JournalInstanceMode | null>(null);
  const [selectedRealm, setSelectedRealm] = useState<string | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null,
  );

  const {
    data: profile,
    loading: profileLoading,
    error: profileError,
  } = useProfile();

  const {
    data: characterEquipment,
    loading: equipmentLoading,
    error: equipmentError,
  } = useCharacterEquipment(
    selectedCharacter?.realm.slug || null,
    selectedCharacter?.name || null,
  );

  const {
    data: characterAppearance,
    loading: appearanceLoading,
    error: appearanceError,
  } = useCharacterAppearance(
    selectedCharacter?.realm.slug || null,
    selectedCharacter?.name || null,
  );

  useEffect(() => {
    if (selectedCharacter) {
      setIsCharacterSelected.on();
    }
  }, [selectedCharacter]);

  // Get all unique realms from the profile
  const allCharacters =
    profile?.wow_accounts?.flatMap((a) => a.characters) || [];
  const uniqueRealms = Array.from(
    new Map(
      allCharacters.map((char) => [char.realm.slug, char.realm.name]),
    ).entries(),
  ).map(([slug, name]) => ({ slug, name }));

  // Get characters for the selected realm
  const charactersInRealm = selectedRealm
    ? allCharacters.filter((char) => char.realm.slug === selectedRealm)
    : [];

  if (profileLoading)
    return (
      <Col xs={12} className={styles.loading}>
        <LoadingWheel />
      </Col>
    );
  if (profileError)
    return <div className={styles.errorText}>Error: {profileError}</div>;
  if (!profile)
    return <div className={styles.noDataText}>No profile data available</div>;

  return (
    <Col xs={12} className={styles.characterPanel}>
      <CharacterSelect
        uniqueRealms={uniqueRealms}
        selectedRealm={selectedRealm}
        setSelectedRealm={setSelectedRealm}
        charactersInRealm={charactersInRealm}
        selectedCharacter={selectedCharacter}
        setSelectedCharacter={setSelectedCharacter}
      />
      {selectedCharacter && <CharacterInfo {...selectedCharacter} />}
      <Row>
        <Col xs={12} md={6} className={styles.infoContainer}>
          {selectedCharacter && (
            <RaidSelect
              setFirstRaidEncounterId={setFirstRaidEncounterId}
              selectedRaid={selectedRaid}
              setSelectedRaid={setSelectedRaid}
              selectedDifficulty={selectedDifficulty}
              setSelectedDifficulty={setSelectedDifficulty}
            />
          )}

          {selectedRaid && selectedDifficulty && (
            <IlvlCalculation
              characterEquipment={characterEquipment}
              firstRaidEncounterId={firstRaidEncounterId}
              selectedRaid={selectedRaid}
              selectedDifficulty={selectedDifficulty}
            />
          )}
        </Col>
        {selectedCharacter && (
          <Col xs={12} md={6}>
            <CharacterEquipment
              loading={equipmentLoading}
              error={equipmentError}
              characterEquipment={characterEquipment}
              appearance={
                characterAppearance?.assets?.find(
                  (asset) => asset.key === "main-raw",
                )?.value
              }
              appearanceError={appearanceError}
              appearanceLoading={appearanceLoading}
            />
          </Col>
        )}
      </Row>
    </Col>
  );
}
