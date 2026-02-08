import { useState, useEffect } from "react";

interface UseCollapseDropdownsOptions {
  firstValue: any;
  secondValue: any;
  secondValueChangeKey: any; // Key to watch for changes in second value
}

export const useCollapseDropdowns = ({
  firstValue,
  secondValue,
  secondValueChangeKey,
}: UseCollapseDropdownsOptions) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Expand when both values are selected
  useEffect(() => {
    if (firstValue && secondValue) {
      setIsExpanded(true);
    }
  }, [firstValue, secondValue]);

  // Collapse when second value changes (but not when initially set from null)
  useEffect(() => {
    if (secondValue) {
      setIsExpanded(false);
      // Small delay to show collapse animation then expand again
      setTimeout(() => setIsExpanded(true), 100);
    }
  }, [secondValueChangeKey]); // Only trigger when the key changes

  const collapse = () => {
    setIsExpanded(false);
  };

  const collapseAndReexpand = () => {
    setIsExpanded(false);
    setTimeout(() => setIsExpanded(true), 100);
  };

  return {
    isExpanded,
    setIsExpanded,
    collapse,
    collapseAndReexpand,
  };
};
