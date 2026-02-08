import { Realm, Character } from "@/lib/types";
import { Col } from "react-bootstrap";
import { Dropdown } from "@/components/shared/dropdown/Dropdown";
import { useState, useEffect } from "react";
import { useCollapseDropdowns } from "@/hooks/useCollapseDropdowns";

import styles from "./character-select.module.css";
import CollapseDropdowns from "../shared/collapseDropdowns/CollapseDropdowns";
import { capitalizeFirstLetter } from "@/lib/helpers";

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
  const { isExpanded, collapse } = useCollapseDropdowns({
    firstValue: selectedRealm,
    secondValue: selectedCharacter,
    secondValueChangeKey: selectedCharacter?.name,
  });

  return (
    <CollapseDropdowns
      label={`${selectedRealm && capitalizeFirstLetter(selectedRealm)} > ${selectedCharacter?.name}`}
      condition={isExpanded}
    >
      <Col xs={6}>
        <label className={styles.label}>Select Realm</label>
        <Dropdown
          items={uniqueRealms}
          value={uniqueRealms.find((r) => r.slug === selectedRealm)}
          onChange={(realm) => {
            setSelectedRealm(realm.slug);
            setSelectedCharacter(null);
            collapse();
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
          onChange={(character) => {
            setSelectedCharacter(character);
            collapse();
          }}
          getLabel={(char) => `${char.name} (Lvl ${char.level})`}
          placeholder="Choose a character..."
        />
      </Col>
    </CollapseDropdowns>
  );
};
export default CharacterSelect;
