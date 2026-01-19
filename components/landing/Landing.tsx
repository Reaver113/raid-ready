"use client";

import { Col, Container, Row } from "react-bootstrap";
import { Session } from "next-auth";
import Logout from "../logout/Logout";
import Heading from "../heading/Heading";
import UserPanel from "../userPanel/UserPanel";

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
      </Row>
    </Container>
  );
};

export default Landing;
