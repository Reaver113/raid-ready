"use client";

import { useEffect, useState } from "react";
import { Dropdown } from "@/components/shared/dropdown/Dropdown";
import styles from "./character-panel.module.css";
import { Col } from "react-bootstrap";

interface Character {
  id: number;
  name: string;
  realm: {
    name: string;
    slug: string;
  };
  playable_class: {
    name: string;
  };
  playable_race: {
    name: string;
  };
  level: number;
}

interface WoWProfile {
  id: number;
  wow_accounts: Array<{
    id: number;
    characters: Character[];
  }>;
}

export default function CharacterPanel() {
  const [profile, setProfile] = useState<WoWProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRealm, setSelectedRealm] = useState<string | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null,
  );

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/wow/profile");

        if (!response.ok) {
          throw new Error("Failed to fetch WoW profile");
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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
    <Col xs={12} className={styles.container}>
      <h2 className={styles.title}>WoW Profile</h2>

      <div className={styles.dropdownContainer}>
        <div className={styles.dropdownCol}>
          <label className={styles.label}>Select Realm</label>
          <Dropdown
            items={uniqueRealms}
            value={uniqueRealms.find((r) => r.slug === selectedRealm)}
            onChange={(realm) => {
              setSelectedRealm(realm.slug);
              setSelectedCharacter(null);
            }}
            getLabel={(realm) => realm.name}
            placeholder="Choose a realm..."
            className={styles.dropdownCol}
          />
        </div>

        <div className={styles.dropdownCol}>
          <label className={styles.label}>Select Character</label>
          <Dropdown
            items={charactersInRealm}
            value={selectedCharacter || undefined}
            onChange={setSelectedCharacter}
            getLabel={(char) => `${char.name} (Lvl ${char.level})`}
            placeholder="Choose a character..."
            className={styles.dropdownCol}
          />
        </div>
      </div>

      {selectedCharacter && (
        <div className={styles.characterCard}>
          <div className={styles.characterHeader}>
            <div className={styles.characterInfo}>
              <h3 className={styles.characterName}>{selectedCharacter.name}</h3>
              <p className="text-lg text-gray-600">
                {selectedCharacter.realm.name}
              </p>
            </div>
            <span className="text-lg font-medium bg-blue-100 px-4 py-2 rounded">
              Level {selectedCharacter.level}
            </span>
          </div>

          <div className="text-gray-700 space-y-2">
            <p>
              <strong>Class:</strong> {selectedCharacter.playable_class.name}
            </p>
            <p>
              <strong>Race:</strong> {selectedCharacter.playable_race.name}
            </p>
          </div>
        </div>
      )}
    </Col>
  );
}
