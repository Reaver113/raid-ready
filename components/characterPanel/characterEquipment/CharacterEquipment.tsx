import Item from "@/components/item/Item";
import Bubble from "@/components/shared/bubble/Bubble";
import LoadingWheel from "@/components/shared/loadingWheel/LoadingWheel";
import type { CharacterEquipment } from "@/lib/types";
import { Col, Row } from "react-bootstrap";

import styles from "./character-equipment.module.css";
import CharacterImage from "@/components/characterImage/CharacterImage";

type Props = {
  loading: boolean;
  error: string | null;
  characterEquipment: CharacterEquipment | null;
  appearance: string | undefined;
  appearanceLoading?: boolean;
};

const CharacterEquipment = ({
  loading,
  error,
  characterEquipment,
  appearance,
  appearanceLoading,
}: Props) => {
  if (loading) {
    return <LoadingWheel />;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <Bubble xs={12} type="solid">
      <Row style={{ position: "relative" }}>
        {characterEquipment?.equipped_items.map((item, index) => (
          <Col
            xs={6}
            key={`${item.item?.id}-${index}`}
            className={styles.itemContainer}
          >
            {item?.item?.id && <Item item={item} index={index} />}
          </Col>
        ))}
        <Col xs={12} className={styles.imageContainer}>
          {(appearance || appearanceLoading) && (
            <CharacterImage
              appearance={appearance}
              appearanceLoading={appearanceLoading}
            />
          )}
        </Col>
      </Row>
    </Bubble>
  );
};

export default CharacterEquipment;
