"use client";

import { Col, Container, Row } from "react-bootstrap";
import Logout from "../logout/Logout";
import Heading from "../heading/Heading";
import UserPanel from "../userPanel/UserPanel";
import CharacterPanel from "../characterPanel/CharacterPanel";
import styles from "./landing.module.css";

const Landing: React.FC = () => {
  return (
    <Container className={styles.landingContainer}>
      <Row>
        <Col xs={12} className={styles.headingContainer}>
          <Heading />
          <Logout />
        </Col>
      </Row>
      <UserPanel xs={5} />
      <Row>
        <CharacterPanel />
      </Row>
    </Container>
  );
};

export default Landing;
