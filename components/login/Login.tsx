import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./login.module.css";
import Button from "@/components/shared/button/Button";
import Heading from "../heading/Heading";

export interface LoginProps {
  bnet_id?: string;
  redirect_uri?: string;
}

const Login: React.FC<LoginProps> = ({ bnet_id, redirect_uri }) => {
  return (
    <Container className={styles.loginContainer}>
      <Heading />
      <Button
        className={styles.Button}
        label={`Login to Continue`}
        link={`https://us.battle.net/oauth/authorize?client_id=${bnet_id}&redirect_uri=${redirect_uri}&response_type=code&scope=wow.profile&state=id10T`}
      />
    </Container>
  );
};

export default Login;
