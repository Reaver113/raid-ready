import React from "react";
import styles from "./loading-wheel.module.css";

const LoadingWheel: React.FC<{ size?: number }> = ({ size }) => (
  <div className={styles.container} role="status" aria-label="Loading">
    <div
      className={styles.spinner}
      style={{ height: size ?? "60px", width: size ?? "60px" }}
    />
  </div>
);

export default LoadingWheel;
