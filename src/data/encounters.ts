import type { EncounterEntry, MapData, CertificationLevel } from '../types/overworld.ts';
import { CERT_HIERARCHY } from '../types/overworld.ts';
import type { CreatureInstance } from '../types/index.ts';
import { createCreatureInstance } from '../engine/battle.ts';
import { getCreature } from './creatures.ts';
import { isAvailableThisSeason } from '../engine/seasons.ts';

// Check if a wild encounter should occur
export function checkEncounter(encounterRate: number): boolean {
  return Math.random() * 100 < encounterRate;
}

// Check if player has required certification for an encounter
function hasRequiredCert(
  playerCerts: CertificationLevel[],
  requiredCert: CertificationLevel | undefined
): boolean {
  if (!requiredCert) return true;
  if (playerCerts.length === 0) return requiredCert === 'wading';

  const playerHighestIndex = Math.max(
    ...playerCerts.map(c => CERT_HIERARCHY.indexOf(c))
  );
  const requiredIndex = CERT_HIERARCHY.indexOf(requiredCert);

  return playerHighestIndex >= requiredIndex;
}

// Generate a wild creature from encounter table
export function generateWildCreature(
  encounterTable: EncounterEntry[],
  playerCerts: CertificationLevel[] = ['wading']
): CreatureInstance | null {
  // Filter encounters by player's certification AND seasonal availability
  const availableEncounters = encounterTable.filter(
    entry => hasRequiredCert(playerCerts, entry.requiredCert) &&
             isAvailableThisSeason(entry.seasonal)
  );

  if (availableEncounters.length === 0) return null;

  // Calculate total weight
  const totalWeight = availableEncounters.reduce((sum, entry) => sum + entry.weight, 0);

  // Roll for which species
  let roll = Math.random() * totalWeight;
  let selectedEntry: EncounterEntry | null = null;

  for (const entry of availableEncounters) {
    roll -= entry.weight;
    if (roll <= 0) {
      selectedEntry = entry;
      break;
    }
  }

  if (!selectedEntry) {
    selectedEntry = availableEncounters[0];
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
export function tryEncounter(
  map: MapData,
  encounterRate: number,
  playerCerts: CertificationLevel[] = ['wading']
): CreatureInstance | null {
  if (!checkEncounter(encounterRate)) return null;
  return generateWildCreature(map.encounterTable, playerCerts);
}

// Generate a fishing encounter based on rod power
export function generateFishingEncounter(
  encounterTable: EncounterEntry[],
  rodPower: number,
  playerCerts: CertificationLevel[] = ['wading']
): CreatureInstance | null {
  // Filter encounters to only fishing method AND matching rod power
  const fishingEncounters = encounterTable.filter(entry => {
    // Must be a fishing encounter
    if (entry.method !== 'fishing') return false;

    // Check rod power requirement (default to 1 if not specified)
    const requiredRod = entry.minRodPower || 1;
    if (rodPower < requiredRod) return false;

    // Check certification
    if (!hasRequiredCert(playerCerts, entry.requiredCert)) return false;

    // Check seasonal availability
    if (!isAvailableThisSeason(entry.seasonal)) return false;

    return true;
  });

  if (fishingEncounters.length === 0) return null;

  // Calculate total weight
  const totalWeight = fishingEncounters.reduce((sum, entry) => sum + entry.weight, 0);

  // Roll for which species
  let roll = Math.random() * totalWeight;
  let selectedEntry: EncounterEntry | null = null;

  for (const entry of fishingEncounters) {
    roll -= entry.weight;
    if (roll <= 0) {
      selectedEntry = entry;
      break;
    }
  }

  if (!selectedEntry) {
    selectedEntry = fishingEncounters[0];
  }

  // Get species
  const species = getCreature(selectedEntry.speciesId);
  if (!species) return null;

  // Random level within range
  const level = selectedEntry.minLevel +
    Math.floor(Math.random() * (selectedEntry.maxLevel - selectedEntry.minLevel + 1));

  return createCreatureInstance(species, level);
}

// Check if a map has any fishing encounters for the given rod
export function hasFishingEncounters(
  encounterTable: EncounterEntry[],
  rodPower: number
): boolean {
  return encounterTable.some(entry =>
    entry.method === 'fishing' &&
    (entry.minRodPower || 1) <= rodPower
  );
}
