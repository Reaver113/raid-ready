import React from "react";
import styles from "./loading-wheel.module.css";

const LoadingWheel: React.FC = () => (
  <div className={styles.container} role="status" aria-label="Loading">
    <div className={styles.spinner} />
  </div>
);

export default LoadingWheel;
