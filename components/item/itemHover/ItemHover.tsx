"use client";

import { ItemHoverProps } from "@/lib/types";
import styles from "./item-hover.module.css";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ItemHover = ({
  itemName,
  level,
  quality,
  x,
  y,
  alignLeft,
}: ItemHoverProps) => {
  const transform = alignLeft
    ? "translate(calc(-100% - 12px), 12px)"
    : "translate(12px, 12px)";

  const style: CSSProperties = {
    left: x ?? 0,
    top: y ?? 0,
    transform,
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const itemData = (
    <div className={styles.itemHover} style={style}>
      <h4>{itemName}</h4>
      <p>Level: {level?.value}</p>
      <p>Quality: {quality?.name}</p>
    </div>
  );

  if (!mounted) return null;
  return createPortal(itemData, document.body);
};

export default ItemHover;
