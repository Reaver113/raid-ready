"use client";

import { useState } from "react";
import styles from "./dropdown.module.css";

type DropdownProps<T> = {
  items: T[];
  value?: T;
  onChange?: (value: T) => void;
  getLabel?: (item: T) => string;
  placeholder?: string;
  className?: string;
};

export function Dropdown<T>({
  items,
  value,
  onChange,
  getLabel = (item) => String(item),
  placeholder = "Select...",
  className = "",
}: DropdownProps<T>) {
  const [internalValue, setInternalValue] = useState<T | undefined>(value);

  const selected = value ?? internalValue;

  function handleChange(item: T) {
    if (onChange) onChange(item);
    else setInternalValue(item);
  }

  return (
    <div className={`${styles.container} ${className}`}>
      <select
        className={styles.select}
        value={selected ? items.indexOf(selected) : ""}
        onChange={(e) => handleChange(items[Number(e.target.value)])}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {items.map((item, i) => (
          <option key={i} value={i}>
            {getLabel(item)}
          </option>
        ))}
      </select>
    </div>
  );
}
