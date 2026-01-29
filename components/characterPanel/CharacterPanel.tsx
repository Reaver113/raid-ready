"use client";
import { WoWProfile, Character } from "@/lib/types";
import { useEffect, useState } from "react";
import styles from "./character-panel.module.css";
import { Col, Row } from "react-bootstrap";
import fetchProfile from "@/fetch/fetchProfile";
import CharacterSelect from "./characterSelect/CharacterSelect";
import CharacterInfo from "./characterInfo/CharacterInfo";
import fetchEquipment from "@/fetch/fetchEquipment";
import LoadingWheel from "@/components/shared/loadingWheel/LoadingWheel";

export default function CharacterPanel() {
  const [profile, setProfile] = useState<WoWProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [characterLoading, setCharacterLoading] = useState(false);
  const [characterError, setCharacterError] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [selectedRealm, setSelectedRealm] = useState<string | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null,
  );
  const [characterEquipment, setCharacterEquipment] = useState<any>(null);

  useEffect(() => {
    fetchProfile({
      setLoading: setProfileLoading,
      setProfile,
      setError: setProfileError,
    });
  }, []);

  useEffect(() => {
    if (selectedCharacter) {
      fetchEquipment({
        setLoading: setCharacterLoading,
        setCharacterEquipment,
        setError: setCharacterError,
        realmSlug: selectedCharacter?.realm.slug || "",
        characterName: selectedCharacter?.name.toLowerCase() || "",
      });
    }
  }, [selectedCharacter]);

  console.log(selectedCharacter);

  console.log(characterEquipment);

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
    </Col>
  );
}
