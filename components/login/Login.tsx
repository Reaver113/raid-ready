"use client";

import Container from "react-bootstrap/Container";
import styles from "./login.module.css";
import Button from "@/components/shared/button/Button";
import LoadingWheel from "@/components/shared/loadingWheel/LoadingWheel";
import { useState } from "react";
import Heading from "../heading/Heading";
import { signIn } from "next-auth/react";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      await signIn("battlenet");
    } catch (e) {
      setLoading(false);
    }
  };
  return (
    <Container className={styles.loginContainer}>
      <Heading />
      {loading ? (
        <LoadingWheel />
      ) : (
        <Button
          onClick={handleClick}
          className={styles.Button}
          label={`Login to Continue`}
        />
      )}
    </Container>
  );
};

export default Login;
