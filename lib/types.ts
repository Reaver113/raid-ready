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

export type Setter = ((v: boolean) => void) & {
  on: () => void;
  off: () => void;
  toggle: () => void;
};

export interface CharacterEquipment {
  _links?: { self?: { href?: string } };
  character: {
    id: number;
    name: string;
    key?: { href?: string };
    realm?: { name?: string; id?: number; slug?: string };
  };
  equipped_item_sets?: Array<Record<string, any>>;
  equipped_items: EquippedItem[];
}

export interface EquippedItem {
  quantity?: number;
  context?: number;
  name?: string;
  armor?: { value?: number; display?: Record<string, any> };
  binding?: { type?: string; name?: string };
  bonus_list?: number[];
  durability?: { value?: number; display_string?: string };
  inventory_type?: { type?: string; name?: string };
  item?: { key?: { href?: string }; id?: number };
  item_class?: { key?: { href?: string }; name?: string; id?: number };
  item_subclass?: { key?: { href?: string }; name?: string; id?: number };
  level?: { value?: number; display_string?: string };
  media?: { key?: { href?: string }; id?: number };
  modified_appearance_id?: number;
  quality?: { type?: string; name?: string };
  requirements?: Record<string, any>;
  sell_price?: { value?: number; display_strings?: Record<string, any> };
  slot?: { type?: string; name?: string };
  stats?: Array<Record<string, any>>;
  transmog?: Record<string, any>;
  [key: string]: any;
}

export interface ItemIconAsset {
  key: string;
  value: string;
  file_data_id?: number;
  [key: string]: any;
}

export interface ItemIcon {
  _links?: { self?: { href?: string } };
  assets: ItemIconAsset[];
  id: number;
  [key: string]: any;
}
