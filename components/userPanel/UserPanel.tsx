"use client";

import { ColumnProps } from "@/lib/types";
import { useAuth } from "@/hooks/useAuth";
import Bubble from "../shared/bubble/Bubble";
import styles from "./user-panel.module.css";

const UserPanel = () => {
  const { session } = useAuth();

  return (
    <Bubble type="solid" xs={12} className={styles.userPanel}>
      <h2 className={styles.userName}>Welcome {session?.user?.name}</h2>
    </Bubble>
  );
};

export default UserPanel;
