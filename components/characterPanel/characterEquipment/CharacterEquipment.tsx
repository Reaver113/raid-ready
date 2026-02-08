import Item from "@/components/item/Item";
import Bubble from "@/components/shared/bubble/Bubble";
import LoadingWheel from "@/components/shared/loadingWheel/LoadingWheel";
import type { CharacterEquipmentProps } from "@/lib/types";
import { Col, Row } from "react-bootstrap";

import styles from "./character-equipment.module.css";
import CharacterImage from "@/components/characterImage/CharacterImage";

type Props = {
  loading: boolean;
  error: string | null;
  characterEquipment: CharacterEquipmentProps | null;
  appearance: string | undefined;
  appearanceLoading?: boolean;
  appearanceError?: string | null;
};

const CharacterEquipment = ({
  loading,
  error,
  characterEquipment,
  appearance,
  appearanceLoading,
  appearanceError,
}: Props) => {
  if (loading) {
    return <LoadingWheel />;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <Bubble xs={12} type="outline">
      <Row className={styles.equipmentContainer}>
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
          {(appearance || appearanceLoading) && !appearanceError ? (
            <CharacterImage
              appearance={appearance}
              appearanceLoading={appearanceLoading}
            />
          ) : (
            <div className={styles.error}>Error: {appearanceError}</div>
          )}
        </Col>
      </Row>
    </Bubble>
  );
};

export default CharacterEquipment;
