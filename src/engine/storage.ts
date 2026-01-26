import type { CreatureInstance } from '../types/index.ts';
import { isCreature } from '../types/index.ts';
import type { PCStorage, StorageBox } from '../types/storage.ts';
import { BOX_SLOTS, NUM_BOXES, DEFAULT_BOX_NAMES, MAX_PARTY_SIZE } from '../types/storage.ts';
import { getParty } from './game-state.ts';

// Initialize empty storage
let pcStorage: PCStorage;

export function initStorage(): void {
  const boxes: StorageBox[] = [];

  for (let i = 0; i < NUM_BOXES; i++) {
    boxes.push({
      name: DEFAULT_BOX_NAMES[i],
      creatures: new Array(BOX_SLOTS).fill(null)
    });
  }

  pcStorage = {
    boxes,
    currentBox: 0
  };
}

export function getStorage(): PCStorage {
  return pcStorage;
}

export function getCurrentBox(): StorageBox {
  return pcStorage.boxes[pcStorage.currentBox];
}

export function getCurrentBoxIndex(): number {
  return pcStorage.currentBox;
}

export function setCurrentBox(index: number): void {
  if (index >= 0 && index < NUM_BOXES) {
    pcStorage.currentBox = index;
  }
}

export function nextBox(): void {
  pcStorage.currentBox = (pcStorage.currentBox + 1) % NUM_BOXES;
}

export function prevBox(): void {
  pcStorage.currentBox = (pcStorage.currentBox - 1 + NUM_BOXES) % NUM_BOXES;
}

// Get creatures in a specific box
export function getBoxCreatures(boxIndex: number): (CreatureInstance | null)[] {
  if (boxIndex < 0 || boxIndex >= NUM_BOXES) {
    return [];
  }
  return pcStorage.boxes[boxIndex].creatures;
}

// Get box name
export function getBoxName(boxIndex: number): string {
  if (boxIndex < 0 || boxIndex >= NUM_BOXES) {
    return '';
  }
  return pcStorage.boxes[boxIndex].name;
}

// Set box name
export function setBoxName(boxIndex: number, name: string): void {
  if (boxIndex >= 0 && boxIndex < NUM_BOXES) {
    pcStorage.boxes[boxIndex].name = name.substring(0, 10).toUpperCase();
  }
}

// Find first empty slot in a box
export function findEmptySlot(boxIndex: number): number {
  const box = pcStorage.boxes[boxIndex];
  if (!box) return -1;

  for (let i = 0; i < BOX_SLOTS; i++) {
    if (box.creatures[i] === null) {
      return i;
    }
  }
  return -1;
}

// Find first empty slot across all boxes
export function findAnyEmptySlot(): { boxIndex: number; slotIndex: number } | null {
  for (let b = 0; b < NUM_BOXES; b++) {
    const slot = findEmptySlot(b);
    if (slot !== -1) {
      return { boxIndex: b, slotIndex: slot };
    }
  }
  return null;
}

// Deposit a creature from party to current box
export function depositCreature(partyIndex: number): boolean {
  const party = getParty();

  // Can't deposit if only one creature in party
  if (party.length <= 1) {
    return false;
  }

  // Can't deposit if party index invalid
  if (partyIndex < 0 || partyIndex >= party.length) {
    return false;
  }

  // Can't deposit eggs - only creatures
  const member = party[partyIndex];
  if (!isCreature(member)) {
    return false;
  }

  // Find empty slot in current box
  const slotIndex = findEmptySlot(pcStorage.currentBox);
  if (slotIndex === -1) {
    return false;
  }

  // Move creature from party to box
  pcStorage.boxes[pcStorage.currentBox].creatures[slotIndex] = member;
  party.splice(partyIndex, 1);

  return true;
}

// Deposit to a specific box and slot
export function depositToSlot(partyIndex: number, boxIndex: number, slotIndex: number): boolean {
  const party = getParty();

  if (party.length <= 1) return false;
  if (partyIndex < 0 || partyIndex >= party.length) return false;
  if (boxIndex < 0 || boxIndex >= NUM_BOXES) return false;
  if (slotIndex < 0 || slotIndex >= BOX_SLOTS) return false;
  if (pcStorage.boxes[boxIndex].creatures[slotIndex] !== null) return false;

  // Can't deposit eggs - only creatures
  const member = party[partyIndex];
  if (!isCreature(member)) {
    return false;
  }

  pcStorage.boxes[boxIndex].creatures[slotIndex] = member;
  party.splice(partyIndex, 1);

  return true;
}

// Withdraw a creature from box to party
export function withdrawCreature(boxIndex: number, slotIndex: number): boolean {
  const party = getParty();

  // Can't withdraw if party is full
  if (party.length >= MAX_PARTY_SIZE) {
    return false;
  }

  // Validate indices
  if (boxIndex < 0 || boxIndex >= NUM_BOXES) return false;
  if (slotIndex < 0 || slotIndex >= BOX_SLOTS) return false;

  const creature = pcStorage.boxes[boxIndex].creatures[slotIndex];
  if (creature === null) {
    return false;
  }

  // Move creature from box to party
  party.push(creature);
  pcStorage.boxes[boxIndex].creatures[slotIndex] = null;

  return true;
}

// Move creature between box slots
export function moveCreature(
  fromBox: number, fromSlot: number,
  toBox: number, toSlot: number
): boolean {
  // Validate indices
  if (fromBox < 0 || fromBox >= NUM_BOXES) return false;
  if (toBox < 0 || toBox >= NUM_BOXES) return false;
  if (fromSlot < 0 || fromSlot >= BOX_SLOTS) return false;
  if (toSlot < 0 || toSlot >= BOX_SLOTS) return false;

  const fromCreature = pcStorage.boxes[fromBox].creatures[fromSlot];
  if (fromCreature === null) return false;

  const toCreature = pcStorage.boxes[toBox].creatures[toSlot];

  // Swap (or just move if destination is empty)
  pcStorage.boxes[fromBox].creatures[fromSlot] = toCreature;
  pcStorage.boxes[toBox].creatures[toSlot] = fromCreature;

  return true;
}

// Swap party member with box slot
export function swapPartyWithBox(partyIndex: number, boxIndex: number, slotIndex: number): boolean {
  const party = getParty();

  if (partyIndex < 0 || partyIndex >= party.length) return false;
  if (boxIndex < 0 || boxIndex >= NUM_BOXES) return false;
  if (slotIndex < 0 || slotIndex >= BOX_SLOTS) return false;

  // Can't store eggs in PC - only creatures
  const partyMember = party[partyIndex];
  if (!isCreature(partyMember)) {
    return false;
  }

  const boxCreature = pcStorage.boxes[boxIndex].creatures[slotIndex];

  // If box slot is empty, just deposit
  if (boxCreature === null) {
    if (party.length <= 1) return false;  // Can't leave party empty
    pcStorage.boxes[boxIndex].creatures[slotIndex] = partyMember;
    party.splice(partyIndex, 1);
    return true;
  }

  // Swap
  party[partyIndex] = boxCreature;
  pcStorage.boxes[boxIndex].creatures[slotIndex] = partyMember;

  return true;
}

// Release a creature (permanently remove from storage)
export function releaseCreature(boxIndex: number, slotIndex: number): boolean {
  if (boxIndex < 0 || boxIndex >= NUM_BOXES) return false;
  if (slotIndex < 0 || slotIndex >= BOX_SLOTS) return false;

  if (pcStorage.boxes[boxIndex].creatures[slotIndex] === null) {
    return false;
  }

  pcStorage.boxes[boxIndex].creatures[slotIndex] = null;
  return true;
}

// Count total creatures in storage
export function getTotalStored(): number {
  let count = 0;
  for (const box of pcStorage.boxes) {
    for (const creature of box.creatures) {
      if (creature !== null) count++;
    }
  }
  return count;
}

// Find a creature by species ID in storage
export function findCreatureInStorage(speciesId: number): { boxIndex: number; slotIndex: number } | null {
  for (let b = 0; b < NUM_BOXES; b++) {
    for (let s = 0; s < BOX_SLOTS; s++) {
      const creature = pcStorage.boxes[b].creatures[s];
      if (creature && creature.species.id === speciesId) {
        return { boxIndex: b, slotIndex: s };
      }
    }
  }
  return null;
}

// Auto-deposit when catching with full party
export function autoDeposit(creature: CreatureInstance): { boxIndex: number; slotIndex: number } | null {
  const slot = findAnyEmptySlot();
  if (!slot) return null;

  pcStorage.boxes[slot.boxIndex].creatures[slot.slotIndex] = creature;
  return slot;
}
