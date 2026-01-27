import { Realm, Character } from "@/lib/types";
import { Col, Row } from "react-bootstrap";
import { Dropdown } from "@/components/shared/dropdown/Dropdown";

import styles from "./character-select.module.css";

interface CharacterSelectProps {
  uniqueRealms: Realm[];
  selectedRealm: string | null;
  setSelectedRealm: (realm: string | null) => void;
  charactersInRealm: Character[];
  selectedCharacter: Character | null;
  setSelectedCharacter: (character: Character | null) => void;
}

const CharacterSelect = ({
  uniqueRealms,
  selectedRealm,
  setSelectedRealm,
  charactersInRealm,
  selectedCharacter,
  setSelectedCharacter,
}: CharacterSelectProps) => {
  return (
    <Row className={styles.characterSelect}>
      <Col xs={6}>
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
        />
      </Col>
      <Col xs={6}>
        <label className={styles.label}>Select Character</label>
        <Dropdown
          items={charactersInRealm}
          value={selectedCharacter || undefined}
          onChange={setSelectedCharacter}
          getLabel={(char) => `${char.name} (Lvl ${char.level})`}
          placeholder="Choose a character..."
        />
      </Col>
    </Row>
  );
};
export default CharacterSelect;
