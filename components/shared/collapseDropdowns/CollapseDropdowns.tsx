import { Container, Row } from "react-bootstrap";
import styles from "./collapse-dropdowns.module.css";
import { useEffect, useState, useRef } from "react";

interface CollapseProps {
  label: string;
  condition: boolean;
  children: React.ReactNode;
}

const CollapseDropdowns = ({ label, condition, children }: CollapseProps) => {
  const [open, setOpen] = useState(condition);
  const [isAnimating, setIsAnimating] = useState(false);
  const [conditionMet, setConditionMet] = useState(condition);
  const contentRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setOpen(condition);
    if (condition) {
      setConditionMet(true);
    }
  }, [condition]);

  const toggleOpen = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setOpen(!open);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.collapseWrapper}>
      <p
        onClick={toggleOpen}
        className={`${styles.label} ${open ? styles.labelCollapsed : styles.labelExpanded}`}
      >
        {conditionMet && (
          <>
            {label}
            <span
              className={`${styles.arrow} ${open ? styles.arrowUp : styles.arrowDown}`}
            >
              ▼
            </span>
          </>
        )}
      </p>
      <div
        ref={contentRef}
        className={`${styles.content} ${open ? styles.contentCollapsed : styles.contentExpanded}`}
      >
        <Container>
          <Row>{children}</Row>
        </Container>
      </div>
    </div>
  );
};

export default CollapseDropdowns;
