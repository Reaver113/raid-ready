import Image from "next/image";

import styles from "./class-icon-determiner.module.css";

interface ClassIconDeterminerProps {
  characterClass: string;
}

const ClassIconDeterminer = ({ characterClass }: ClassIconDeterminerProps) => {
  const classImages: Record<string, string> = {
    Warrior: "Warrior.png",
    "Death Knight": "Death_Knight.png",
    "Demon Hunter": "Demon_Hunter.png",
    Druid: "Druid.png",
    Evoker: "Evoker.png",
    Hunter: "Hunter.png",
    Mage: "Mage.png",
    Monk: "Monk.png",
    Paladin: "Paladin.png",
    Priest: "Priest.png",
    Rogue: "Rogue.png",
    Shaman: "Shaman.png",
    Warlock: "Warlock.png",
  };

  const imagePath = classImages[characterClass];

  if (!imagePath) {
    return null;
  }

  return (
    <Image
      src={`/classIcons/${imagePath}`}
      alt={characterClass}
      width={60}
      height={60}
      className={styles.image}
    />
  );
};

export default ClassIconDeterminer;
