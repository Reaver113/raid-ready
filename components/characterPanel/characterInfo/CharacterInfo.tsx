import { Character } from "@/lib/types";
import styles from "./character-info.module.css";
import ClassIconDeterminer from "@/components/shared/classIconDeterminer/ClassIconDeterminer";
import Bubble from "@/components/shared/bubble/Bubble";

const CharacterInfo = ({
  name,
  level,
  playable_class,
  playable_race,
}: Character) => {
  return (
    <Bubble xs={12} type="solid">
      <div className={styles.headingContainer}>
        <ClassIconDeterminer characterClass={playable_class.name} />
        <h3 className={styles.name}>{name}</h3>
        <div className={styles.subheadingContainer}>
          <span className={styles.level}>{level}</span>
          <div className={styles.race}> {playable_race.name}</div>
        </div>
      </div>
    </Bubble>
  );
};

export default CharacterInfo;
