"use client";
import { WoWProfile, Character } from "@/lib/types";
import { useEffect, useState } from "react";
import type {
  CharacterAppearance,
  JournalInstanceRef,
  JournalInstanceMode,
  Setter,
} from "@/lib/types";
import styles from "./character-panel.module.css";
import { Col } from "react-bootstrap";
import fetchProfile from "@/fetch/fetchProfile";
import CharacterSelect from "./characterSelect/CharacterSelect";
import CharacterInfo from "./characterInfo/CharacterInfo";
import fetchEquipment from "@/fetch/fetchEquipment";
import LoadingWheel from "@/components/shared/loadingWheel/LoadingWheel";
import CharacterEquipment from "./characterEquipment/CharacterEquipment";
import fetchAppearance from "@/fetch/fetchAppearance";
import RaidSelect from "./raidSelect/RaidSelect";
import IlvlCalculation from "../ilvlCalculation/IlvlCalculation";

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
  const [profile, setProfile] = useState<WoWProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [equipmentLoading, setEquipmentLoading] = useState(false);
  const [equipmentError, setEquipmentError] = useState<string | null>(null);
  const [appearanceLoading, setAppearanceLoading] = useState(false);
  const [appearanceError, setAppearanceError] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [selectedRealm, setSelectedRealm] = useState<string | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null,
  );
  const [characterEquipment, setCharacterEquipment] = useState<any>(null);
  const [characterAppearance, setCharacterAppearance] =
    useState<CharacterAppearance | null>(null);

  useEffect(() => {
    fetchProfile({
      setLoading: setProfileLoading,
      setProfile,
      setError: setProfileError,
    });
  }, []);

  useEffect(() => {
    if (selectedCharacter) {
      setIsCharacterSelected.on();
      fetchEquipment({
        setLoading: setEquipmentLoading,
        setCharacterEquipment,
        setError: setEquipmentError,
        realmSlug: selectedCharacter?.realm.slug || "",
        characterName: selectedCharacter?.name.toLowerCase() || "",
      });
      fetchAppearance({
        setLoading: setAppearanceLoading,
        setCharacterAppearance,
        setError: setAppearanceError,
        realmSlug: selectedCharacter?.realm.slug || "",
        characterName: selectedCharacter?.name.toLowerCase() || "",
      });
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
          firstRaidEncounterId={firstRaidEncounterId}
          selectedRaid={selectedRaid}
          selectedDifficulty={selectedDifficulty}
        />
      )}
      {selectedCharacter && (
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
      )}
    </Col>
  );
}
