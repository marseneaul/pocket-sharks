import type { TileDef, CertificationLevel } from '../types/overworld.ts';

// Tile index constants
export const TILE = {
  FLOOR: 0,
  WALL: 1,
  WATER: 2,      // Shallow water (wading/snorkeling) - default start
  KELP: 3,       // Kelp with encounters (wading level)
  DEEP: 4,       // Visual deep water (blocked, decorative)
  SAND: 5,
  DOCK: 6,
  HEAL: 7,
  // Certification-gated water tiles
  REEF: 8,       // Reef diving - requires openwater cert
  DEEP_REEF: 9,  // Deep reef - requires advanced cert
  CAVE: 10,      // Cave systems - requires tech cert
  PELAGIC: 11,   // Open ocean - requires openocean cert
  ABYSS: 12,     // Abyssal depths - requires submarine cert
  // Additional encounter tiles
  REEF_KELP: 13, // Reef with kelp encounters (openwater)
  TIDE_POOL: 14  // Tide pools (wading, high encounter rate)
} as const;

// Tile definitions
export const TILES: Record<number, TileDef> = {
  [TILE.FLOOR]: {
    type: 'floor',
    solid: false,
    swimOnly: false,
    encounter: false,
    encounterRate: 0
  },
  [TILE.WALL]: {
    type: 'wall',
    solid: true,
    swimOnly: false,
    encounter: false,
    encounterRate: 0
  },
  [TILE.WATER]: {
    type: 'shallow',
    solid: false,
    swimOnly: true,
    encounter: false,
    encounterRate: 0,
    requiredCert: 'wading'  // Default starting cert
  },
  [TILE.KELP]: {
    type: 'kelp',
    solid: false,
    swimOnly: true,
    encounter: true,
    encounterRate: 15,
    requiredCert: 'wading'
  },
  [TILE.DEEP]: {
    type: 'deep',
    solid: true,       // Decorative deep water (always blocked)
    swimOnly: true,
    encounter: false,
    encounterRate: 0
  },
  [TILE.SAND]: {
    type: 'sand',
    solid: false,
    swimOnly: false,
    encounter: false,
    encounterRate: 0
  },
  [TILE.DOCK]: {
    type: 'dock',
    solid: false,
    swimOnly: false,
    encounter: false,
    encounterRate: 0
  },
  [TILE.HEAL]: {
    type: 'heal',
    solid: false,
    swimOnly: false,
    encounter: false,
    encounterRate: 0,
    heal: true
  },
  // Certification-gated tiles
  [TILE.REEF]: {
    type: 'reef',
    solid: false,
    swimOnly: true,
    encounter: false,
    encounterRate: 0,
    requiredCert: 'openwater'
  },
  [TILE.DEEP_REEF]: {
    type: 'deep_reef',
    solid: false,
    swimOnly: true,
    encounter: true,
    encounterRate: 12,
    requiredCert: 'advanced'
  },
  [TILE.CAVE]: {
    type: 'cave',
    solid: false,
    swimOnly: true,
    encounter: true,
    encounterRate: 18,
    requiredCert: 'tech'
  },
  [TILE.PELAGIC]: {
    type: 'pelagic',
    solid: false,
    swimOnly: true,
    encounter: true,
    encounterRate: 10,
    requiredCert: 'openocean'
  },
  [TILE.ABYSS]: {
    type: 'abyss',
    solid: false,
    swimOnly: true,
    encounter: true,
    encounterRate: 20,
    requiredCert: 'submarine'
  },
  [TILE.REEF_KELP]: {
    type: 'reef',
    solid: false,
    swimOnly: true,
    encounter: true,
    encounterRate: 15,
    requiredCert: 'openwater'
  },
  [TILE.TIDE_POOL]: {
    type: 'shallow',
    solid: false,
    swimOnly: false,  // Can walk in tide pools!
    encounter: true,
    encounterRate: 20,  // High encounter rate
    requiredCert: 'wading'
  }
};

export function getTileDef(tileIndex: number): TileDef {
  return TILES[tileIndex] || TILES[TILE.FLOOR];
}

import { CERT_HIERARCHY } from '../types/overworld.ts';

// Check if player has required certification (certifications are cumulative)
export function hasCertification(
  playerCerts: CertificationLevel[],
  requiredCert: CertificationLevel | undefined
): boolean {
  if (!requiredCert) return true;  // No cert required
  if (playerCerts.length === 0) return requiredCert === 'wading';  // Default to wading

  // Get the highest cert the player has
  const playerHighestIndex = Math.max(
    ...playerCerts.map(c => CERT_HIERARCHY.indexOf(c))
  );
  const requiredIndex = CERT_HIERARCHY.indexOf(requiredCert);

  return playerHighestIndex >= requiredIndex;
}

export function canWalkOn(
  tileIndex: number,
  isSwimming: boolean,
  playerCerts: CertificationLevel[] = ['wading']
): boolean {
  const tile = getTileDef(tileIndex);
  if (tile.solid) return false;
  if (tile.swimOnly && !isSwimming) return false;
  if (!tile.swimOnly && isSwimming) return false; // Can't swim on land

  // Check certification requirement
  if (!hasCertification(playerCerts, tile.requiredCert)) {
    return false;
  }

  return true;
}

export function shouldSwim(tileIndex: number): boolean {
  const tile = getTileDef(tileIndex);
  return tile.swimOnly;
}

// Get message for why a tile is blocked
export function getBlockedMessage(
  tileIndex: number,
  playerCerts: CertificationLevel[]
): string | null {
  const tile = getTileDef(tileIndex);

  if (tile.solid) return null;  // Just a wall, no message needed

  if (tile.requiredCert && !hasCertification(playerCerts, tile.requiredCert)) {
    const certNames: Record<CertificationLevel, string> = {
      'wading': 'Wading/Snorkeling',
      'openwater': 'Open Water SCUBA',
      'advanced': 'Advanced SCUBA',
      'tech': 'Technical Diving',
      'openocean': 'Open Ocean Swimming',
      'submarine': 'Submarine Operation'
    };
    return `You need ${certNames[tile.requiredCert]} certification to dive here.`;
  }

  return null;
}
