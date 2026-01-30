import { ItemHoverProps } from "@/lib/types";
import styles from "./item-hover.module.css";
import type { CSSProperties } from "react";

const ItemHover = ({ itemName, level, quality, x, y }: ItemHoverProps) => {
  const style: CSSProperties = {
    left: x ?? 0,
    top: y ?? 0,
  };

  return (
    <div className={styles.itemHover} style={style}>
      <h4>{itemName}</h4>
      <p>Level: {level?.value}</p>
      <p>Quality: {quality?.name}</p>
    </div>
  );
};

export default ItemHover;
