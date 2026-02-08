import { Difficulty } from "./types";

export const difficulties: Difficulty[] = [
  { id: "lfr", name: "LFR" },
  { id: "normal", name: "Normal" },
  { id: "heroic", name: "Heroic" },
  { id: "mythic", name: "Mythic" },
];

export function capitalizeFirstLetter(string: string): string {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}
