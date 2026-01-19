import { ReactNode } from "react";
import { Col } from "react-bootstrap";
import styles from "./bubble.module.css";

interface BubbleProps {
  children: ReactNode;
  type: "solid" | "outline";
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

const Bubble = ({ children, type, xs, sm, md, lg, xl }: BubbleProps) => {
  return (
    <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl} className={styles[type]}>
      {children}
    </Col>
  );
};

export default Bubble;
