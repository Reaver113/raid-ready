import { useCallback, useRef, useState } from "react";
import { Setter } from "@/lib/types";

export default function useBoolean(
  initial: boolean | (() => boolean) = false,
): [boolean, Setter] {
  const [value, setValue] = useState<boolean>(initial);

  const setFnRef = useRef<Setter | null>(null);

  if (!setFnRef.current) {
    const fn = ((v: boolean) => setValue(v)) as Setter;
    fn.on = () => setValue(true);
    fn.off = () => setValue(false);
    fn.toggle = () => setValue((v) => !v);
    setFnRef.current = fn;
  }

  return [value, setFnRef.current as Setter];
}

export { useBoolean };
