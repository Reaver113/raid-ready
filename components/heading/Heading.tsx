import styles from "./heading.module.css";

export interface HeadingProps {
  heading: string;
  className?: string;
}

const Heading: React.FC = () => {
  return <h1 className={styles.heading}>Ready4Raid</h1>;
};

export default Heading;
