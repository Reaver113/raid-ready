import { signOut } from "next-auth/react";
import Button from "../shared/button/Button";

const Logout: React.FC = () => {
  const handleClick = () => {
    signOut();
  };

  return <Button label="Logout" onClick={handleClick} />;
};

export default Logout;
