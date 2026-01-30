import { ReactNode } from "react";

export type Difficulty = { id: string; name: string };

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

export interface ItemDetail {
  id: number;
  name?: string;
  level?: { value?: number; display_string?: string } | null;
  quality?: { type?: string; name?: string; [key: string]: any } | null;
  media?: { id?: number; key?: { href?: string }; [key: string]: any } | null;
  assets?: Array<Record<string, any>>;
  [key: string]: any;
}

export interface CharacterAppearanceAsset {
  key: string;
  value: string;
  file_data_id?: number;
  [key: string]: any;
}

export interface CharacterAppearance {
  _links?: { self?: { href?: string } };
  assets: CharacterAppearanceAsset[];
  character: {
    id: number;
    name: string;
    key?: { href?: string };
    realm?: { name?: string; id?: number; slug?: string; [key: string]: any };
    [key: string]: any;
  };
  [key: string]: any;
}

export interface JournalInstanceRef {
  id: number;
  name: string;
  key?: { href?: string };
  [key: string]: any;
}

export interface JournalEncounterRef {
  id: number;
  name: string;
  key?: { href?: string };
  [key: string]: any;
}

export interface JournalInstanceDetail {
  _links?: { self?: { href?: string } };
  id: number;
  name: string;
  map?: { id?: number; name?: string; [key: string]: any };
  description?: string;
  encounters?: JournalEncounterRef[];
  expansion?: {
    id?: number;
    name?: string;
    key?: { href?: string };
    [key: string]: any;
  };
  modes?: JournalInstanceMode[];
  media?: { id?: number; key?: { href?: string }; [key: string]: any };
  category?: { type?: string; [key: string]: any };
  order_index?: number;
  [key: string]: any;
}

export interface JournalInstanceMode {
  mode?: { type?: string; name?: string };
  players?: number;
  is_tracked?: boolean;
  [key: string]: any;
}

export interface JournalEncounterCreature {
  id: number;
  name: string;
  creature_display?: {
    key?: { href?: string };
    id?: number;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface JournalEncounterItemRef {
  id: number;
  item?: {
    key?: { href?: string };
    name?: string;
    id?: number;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface JournalEncounterSection {
  id: number;
  title?: string;
  body_text?: string;
  spell?: { id?: number; [key: string]: any };
  sections?: JournalEncounterSection[];
  [key: string]: any;
}

export interface JournalEncounterDetail {
  _links?: { self?: { href?: string } };
  id: number;
  name: string;
  description?: string;
  creatures?: JournalEncounterCreature[];
  items?: JournalEncounterItemRef[];
  sections?: JournalEncounterSection[];
  instance?:
    | JournalInstanceRef
    | { key?: { href?: string }; name?: string; id?: number };
  modes?: JournalInstanceMode[];
  category?: { type?: string; [key: string]: any };
  [key: string]: any;
}

export interface CurrentExpansion {
  _links?: { self?: { href?: string } };
  id: number;
  name: string;
  dungeons: JournalInstanceRef[];
  raids: JournalInstanceRef[];
  [key: string]: any;
}

export interface ItemHoverProps {
  itemName?: string;
  level?: {
    value?: number;
    display_string?: string;
    [key: string]: any;
  } | null;
  quality?: { type?: string; name?: string; [key: string]: any } | null;
  x?: number;
  y?: number;
  alignLeft?: boolean;
}
