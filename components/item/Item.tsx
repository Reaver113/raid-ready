"use client";

import fetchItemIcon from "@/fetch/fetchItemIcon";
import useBoolean from "@/hooks/useBoolean";
import { useEffect, useState } from "react";
import { ItemIcon } from "@/lib/types";
import Image from "next/image";
import LoadingWheel from "../shared/loadingWheel/LoadingWheel";
import styles from "./item.module.css";
import ItemHover from "./itemHover/ItemHover";

const Item = ({ itemId }: { itemId: number }) => {
  const [loading, setLoading] = useBoolean(false);
  const [itemIcon, setItemIcon] = useState<ItemIcon | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchItemIcon({
      setLoading,
      setItemIcon,
      setError,
      itemId,
    });
  }, []);

  if (loading) {
    return <LoadingWheel />;
  }
  if (error) return <div>Error: {error}</div>;
  if (itemIcon?.assets?.[0]?.value) {
    return (
      <>
        <div className={styles.item}>
          <Image
            src={itemIcon?.assets?.[0]?.value}
            alt="Item Icon"
            width={64}
            height={64}
          />
        </div>
        <ItemHover
          itemName={itemIcon.name}
          level={itemIcon.level}
          quality={itemIcon.quality}
        />
      </>
    );
  }
};

export default Item;
