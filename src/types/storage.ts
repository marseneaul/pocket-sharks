import type { CreatureInstance } from './index.ts';

// PC Storage box - holds up to 20 creatures
export interface StorageBox {
  name: string;
  creatures: (CreatureInstance | null)[];  // 20 slots per box
}

// Full PC storage system
export interface PCStorage {
  boxes: StorageBox[];      // 8 boxes = 160 total storage
  currentBox: number;       // Currently selected box index
}

// PC UI state
export interface PCUIState {
  mode: 'box' | 'party';           // Which panel is active
  boxCursor: number;               // 0-19 position in box grid
  partyCursor: number;             // 0-5 position in party list
  selectedCreature: {              // Creature being moved (if any)
    source: 'box' | 'party';
    boxIndex?: number;
    slotIndex: number;
  } | null;
  action: 'none' | 'selecting' | 'moving';
}

// Box dimensions for UI
export const BOX_SLOTS = 20;        // 4 columns x 5 rows
export const BOX_COLUMNS = 4;
export const BOX_ROWS = 5;
export const NUM_BOXES = 8;
export const MAX_PARTY_SIZE = 6;

// Default box names
export const DEFAULT_BOX_NAMES = [
  'BOX 1',
  'BOX 2',
  'BOX 3',
  'BOX 4',
  'BOX 5',
  'BOX 6',
  'BOX 7',
  'BOX 8'
];
