"use client";
import { WoWProfile, Character } from "@/lib/types";
import { useEffect, useState } from "react";
import styles from "./character-panel.module.css";
import { Col, Row } from "react-bootstrap";
import fetchProfile from "@/fetch/fetchProfile";
import CharacterSelect from "./characterSelect/CharacterSelect";
import CharacterInfo from "./characterInfo/CharacterInfo";

export default function CharacterPanel() {
  const [profile, setProfile] = useState<WoWProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRealm, setSelectedRealm] = useState<string | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null,
  );

  useEffect(() => {
    fetchProfile({ setLoading, setProfile, setError });
  }, []);

  console.log(selectedCharacter);

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

  if (loading)
    return <div className={styles.loadingText}>Loading profile...</div>;
  if (error) return <div className={styles.errorText}>Error: {error}</div>;
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
