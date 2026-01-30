"use client";

import fetchItemIcon from "@/fetch/fetchItemIcon";
import useBoolean from "@/hooks/useBoolean";
import { useEffect, useState, useCallback, useRef } from "react";
import type React from "react";
import type { EquippedItem, ItemIcon } from "@/lib/types";
import Image from "next/image";
import LoadingWheel from "../shared/loadingWheel/LoadingWheel";
import styles from "./item.module.css";
import ItemHover from "./itemHover/ItemHover";

const Item = ({ item }: { item: EquippedItem }) => {
  const [loading, setLoading] = useBoolean(false);
  const [itemIcon, setItemIcon] = useState<ItemIcon | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);

  const id = item?.item?.id ?? item?.id;
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchItemIcon({
      setLoading,
      setItemIcon,
      setError,
      itemId: id,
    });
  }, [id, setLoading]);

  const onEnter = useCallback(() => setHovering(true), []);
  const onLeave = useCallback(() => {
    setHovering(false);
    setCoords(null);
  }, []);
  const onMove = useCallback((e: React.MouseEvent) => {
    setCoords({ x: e.clientX, y: e.clientY });
  }, []);

  const onClick = useCallback((e: React.MouseEvent) => {
    // show hover at tap/click location (useful for touch)
    setCoords({ x: e.clientX, y: e.clientY });
    setHovering((v) => !v);
  }, []);

  useEffect(() => {
    const onPointerDown = (ev: PointerEvent) => {
      const target = ev.target as Node | null;
      if (!containerRef.current) return;
      if (target && !containerRef.current.contains(target)) {
        setHovering(false);
        setCoords(null);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  if (loading) {
    return <LoadingWheel />;
  }
  if (error) return <div>Error: {error}</div>;
  if (itemIcon?.assets?.[0]?.value) {
    return (
      <>
        <div
          className={styles.item}
          ref={containerRef}
          onMouseEnter={onEnter}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          onClick={onClick}
        >
          <Image
            src={itemIcon?.assets?.[0]?.value}
            alt="Item Icon"
            width={40}
            height={40}
          />
        </div>
        {hovering && (
          <ItemHover
            itemName={item?.name}
            level={item.level}
            quality={item.quality}
            x={coords?.x}
            y={coords?.y}
          />
        )}
      </>
    );
  }
  return null;
};

export default Item;
