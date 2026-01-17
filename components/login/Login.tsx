import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./login.module.css";
import Button from "@/components/shared/button/Button";
import Heading from "../heading/Heading";
import { signIn } from "next-auth/react";

const Login = () => {
  const handleClick = () => {
    signIn("battlenet");
  };
  return (
    <Container className={styles.loginContainer}>
      <Heading />
      <Button
        onClick={handleClick}
        className={styles.Button}
        label={`Login to Continue`}
      />
    </Container>
  );
};

export default Login;
