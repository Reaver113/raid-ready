"use client";

import { useState } from "react";

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
    <div className={`relative inline-block ${className}`}>
      <select
        className="
          w-full rounded-xl border
          px-3 py-2
          bg-white
          shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
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
