import Link from "next/link";
import styles from "./button.module.css";

export interface ButtonProps {
  label: string;
  link?: string;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, link, onClick, className }) => {
  const handleOnClick = () => {
    if (onClick) {
      onClick();
    }
  };

  if (link) {
    return (
      <Link className={`${styles.button} ${className}`} href={link}>
        {label}
      </Link>
    );
  }
  if (onClick) {
    return (
      <div className={`${styles.button} ${className}`} onClick={handleOnClick}>
        {label}
      </div>
    );
  }
};

export default Button;
