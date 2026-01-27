import { BubbleProps } from "@/lib/types";
import { Col } from "react-bootstrap";
import styles from "./bubble.module.css";

const Bubble = ({
  children,
  type,
  xs,
  sm,
  md,
  lg,
  xl,
  className,
}: BubbleProps) => {
  return (
    <Col
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
      className={`${styles[type]} ${className || ""}`}
    >
      {children}
    </Col>
  );
};

export default Bubble;
