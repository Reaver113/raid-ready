"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import Bubble from "../shared/bubble/Bubble";
import styles from "./user-panel.module.css";

const UserPanel: React.FC = () => {
  const { session, isLoading, isAuthenticated } = useAuth();

  return (
    <Bubble type="solid" xs={3}>
      <h2 className={styles.userName}>{session?.user?.name}</h2>
    </Bubble>
  );
};

export default UserPanel;
