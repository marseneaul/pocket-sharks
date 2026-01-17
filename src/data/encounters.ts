import type { EncounterEntry, MapData } from '../types/overworld.ts';
import type { CreatureInstance } from '../types/index.ts';
import { createCreatureInstance } from '../engine/battle.ts';
import { getCreature } from './creatures.ts';

// Check if a wild encounter should occur
export function checkEncounter(encounterRate: number): boolean {
  return Math.random() * 100 < encounterRate;
}

// Generate a wild creature from encounter table
export function generateWildCreature(encounterTable: EncounterEntry[]): CreatureInstance | null {
  if (encounterTable.length === 0) return null;

  // Calculate total weight
  const totalWeight = encounterTable.reduce((sum, entry) => sum + entry.weight, 0);

  // Roll for which species
  let roll = Math.random() * totalWeight;
  let selectedEntry: EncounterEntry | null = null;

  for (const entry of encounterTable) {
    roll -= entry.weight;
    if (roll <= 0) {
      selectedEntry = entry;
      break;
    }
  }

  if (!selectedEntry) {
    selectedEntry = encounterTable[0];
  }

  // Get species
  const species = getCreature(selectedEntry.speciesId);
  if (!species) return null;

  // Random level within range
  const level = selectedEntry.minLevel +
    Math.floor(Math.random() * (selectedEntry.maxLevel - selectedEntry.minLevel + 1));

  return createCreatureInstance(species, level);
}

// Try to trigger an encounter on a kelp tile
export function tryEncounter(map: MapData, encounterRate: number): CreatureInstance | null {
  if (!checkEncounter(encounterRate)) return null;
  return generateWildCreature(map.encounterTable);
}
