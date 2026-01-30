"use client";

import { Col, Container, Row } from "react-bootstrap";
import Logout from "../logout/Logout";
import Heading from "../heading/Heading";
import UserPanel from "../userPanel/UserPanel";
import CharacterPanel from "../characterPanel/CharacterPanel";
import styles from "./landing.module.css";
import useBoolean from "../../hooks/useBoolean";

const Landing: React.FC = () => {
  const [isCharacterSelected, setIsCharacterSelected] = useBoolean(false);
  return (
    <Container className={styles.landingContainer}>
      <Row>
        <Col xs={12} className={styles.headingContainer}>
          <Heading />
          <Logout />
        </Col>
      </Row>
      <div
        className={`${styles.userPanelWrap} ${isCharacterSelected ? styles.collapseUserPanel : ""}`}
      >
        <UserPanel />
      </div>
      <Row>
        <CharacterPanel setIsCharacterSelected={setIsCharacterSelected} />
      </Row>
    </Container>
  );
};

export default Landing;
