import { ReactNode } from "react";

export interface WoWProfile {
  id: number;
  wow_accounts: Array<{
    id: number;
    characters: Character[];
  }>;
}

export interface Character {
  id: number;
  name: string;
  realm: {
    name: string;
    slug: string;
  };
  playable_class: {
    name: string;
  };
  playable_race: {
    name: string;
  };
  level: number;
}

export interface Realm {
  slug: string;
  name: string;
}

export interface ColumnProps {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export interface BubbleProps extends ColumnProps {
  children: ReactNode;
  type: "solid" | "outline";
  className?: string;
}
