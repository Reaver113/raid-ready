import { signOut } from "next-auth/react";
import Button from "../shared/button/Button";

import styles from "./logout.module.css";

const Logout: React.FC = () => {
  const handleClick = () => {
    signOut();
  };

  return (
    <Button className={styles.logout} label="Logout" onClick={handleClick} />
  );
};

export default Logout;
