"use client";

import { useAuth } from "@/hooks/useAuth";
import Bubble from "../shared/bubble/Bubble";
import styles from "./user-panel.module.css";

const UserPanel: React.FC = () => {
  const { session, isLoading, isAuthenticated } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Not authenticated</div>;

  return (
    <Bubble type="solid" xs={3}>
      <h2 className={styles.userName}>{session?.user?.name}</h2>
      <div>{session?.user?.email}</div>
      <div>{session?.user?.image}</div>
    </Bubble>
  );
};

export default UserPanel;
