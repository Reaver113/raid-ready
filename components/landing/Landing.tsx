"use client";

import { Col, Container, Row } from "react-bootstrap";
import Logout from "../logout/Logout";
import Heading from "../heading/Heading";
import UserPanel from "../userPanel/UserPanel";
import CharacterPanel from "../characterPanel/CharacterPanel";

const Landing: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Heading />
        </Col>
        <Col>
          <Logout />
        </Col>
      </Row>
      <Row>
        <UserPanel />
        <CharacterPanel />
      </Row>
    </Container>
  );
};

export default Landing;
