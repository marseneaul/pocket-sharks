// Save/Load System
// Persists game state to localStorage and restores it on continue

import type { CreatureInstance, PartyMember, EggInstance, Stats, StatusCondition, MoveInstance, IVs } from '../types/index.ts';
import type { NatureId } from '../data/natures.ts';
import { getRandomNature } from '../data/natures.ts';
import { generateRandomIVs } from './damage.ts';
import type { CertificationLevel, Direction } from '../types/overworld.ts';
import type { InventorySlot } from '../data/items.ts';
import type { PCStorage, StorageBox } from '../types/storage.ts';
import { getCreature } from '../data/creatures.ts';
import { getMove } from '../data/moves.ts';
import { getEgg } from '../data/eggs.ts';
import {
  getPlayer,
  getCurrentMap,
  setCurrentMap,
  getMap,
  getPlayerMoney,
  getInventory,
  getParty,
  getPlayerCertifications,
  getStepCount,
  setPlayerMoney,
  setPlayerInventory,
  setPlayerPosition,
  setPlayerStepCount,
  setPlayerCertifications,
  setParty,
  getDefeatedTrainers,
  setDefeatedTrainers,
  getCollectedEggs,
  setCollectedEggs,
  getRepelSteps,
  setRepelSteps
} from './game-state.ts';
import {
  getStorage,
  setStorage
} from './storage.ts';

const SAVE_KEY = 'pocket-sharks-save';
const SAVE_VERSION = 2;

// Serialized creature format (stores IDs instead of objects)
interface SerializedCreature {
  speciesId: number;
  nickname?: string;
  level: number;
  exp: number;
  currentHp: number;
  maxHp: number;
  stats: Stats;
  moves: { moveId: number; currentPp: number }[];
  status: StatusCondition;
  ivs?: IVs;           // Added in v2
  nature?: NatureId;   // Added in v2
}

// Serialized party member (can be creature or egg)
interface SerializedPartyMember {
  isEgg: boolean;
  // Creature fields (when isEgg=false)
  speciesId?: number;
  nickname?: string;
  level?: number;
  exp?: number;
  currentHp?: number;
  maxHp?: number;
  stats?: Stats;
  moves?: { moveId: number; currentPp: number }[];
  status?: StatusCondition;
  ivs?: IVs;           // Added in v2
  nature?: NatureId;   // Added in v2
  // Egg fields (when isEgg=true)
  eggItemId?: number;
  stepsRemaining?: number;
}

// Serialized PC storage
interface SerializedStorage {
  currentBox: number;
  boxes: {
    name: string;
    creatures: (SerializedCreature | null)[];
  }[];
}

// Full save data structure
interface SaveData {
  version: number;
  timestamp: number;

  // Player state
  player: {
    x: number;
    y: number;
    facing: Direction;
    stepCount: number;
    certifications: CertificationLevel[];
  };

  // Current location
  currentMapId: string;

  // Economy
  money: number;
  inventory: InventorySlot[];

  // Party (creatures and eggs)
  party: SerializedPartyMember[];

  // PC Storage
  pcStorage: SerializedStorage;

  // Progress tracking
  defeatedTrainers: string[];
  collectedEggs: string[];

  // Repel state
  repelSteps?: number;  // Optional for backwards compatibility
}

// Serialize a creature instance to save format
function serializeCreature(c: CreatureInstance): SerializedCreature {
  return {
    speciesId: c.species.id,
    nickname: c.nickname,
    level: c.level,
    exp: c.exp,
    currentHp: c.currentHp,
    maxHp: c.maxHp,
    stats: { ...c.stats },
    moves: c.moves.map(m => ({
      moveId: m.move.id,
      currentPp: m.currentPp
    })),
    status: c.status,
    ivs: c.ivs ? { ...c.ivs } : undefined,
    nature: c.nature
  };
}

// Deserialize a creature from save format
function deserializeCreature(data: SerializedCreature): CreatureInstance | null {
  const species = getCreature(data.speciesId);
  if (!species) {
    console.warn(`Species ${data.speciesId} not found, skipping creature`);
    return null;
  }

  const moves: MoveInstance[] = [];
  for (const moveData of data.moves) {
    const move = getMove(moveData.moveId);
    if (move) {
      moves.push({
        move,
        currentPp: moveData.currentPp
      });
    }
  }

  // If no valid moves, give a default move (shouldn't happen normally)
  if (moves.length === 0) {
    const defaultMove = getMove(1); // Tackle
    if (defaultMove) {
      moves.push({ move: defaultMove, currentPp: defaultMove.pp });
    }
  }

  return {
    species,
    nickname: data.nickname,
    level: data.level,
    exp: data.exp,
    currentHp: data.currentHp,
    maxHp: data.maxHp,
    stats: { ...data.stats },
    moves,
    status: data.status,
    ivs: data.ivs ? { ...data.ivs } : undefined,
    nature: data.nature
  };
}

// Serialize a party member (creature or egg)
function serializePartyMember(member: PartyMember): SerializedPartyMember {
  if ('isEgg' in member && member.isEgg) {
    // It's an egg
    const egg = member as EggInstance;
    return {
      isEgg: true,
      eggItemId: egg.eggItemId,
      stepsRemaining: egg.stepsRemaining,
      nickname: egg.nickname
    };
  } else {
    // It's a creature
    const creature = member as CreatureInstance;
    const serialized = serializeCreature(creature);
    return {
      isEgg: false,
      ...serialized
    };
  }
}

// Deserialize a party member
function deserializePartyMember(data: SerializedPartyMember): PartyMember | null {
  if (data.isEgg) {
    // It's an egg
    if (data.eggItemId === undefined || data.stepsRemaining === undefined) {
      console.warn('Invalid egg data in save');
      return null;
    }

    const eggData = getEgg(data.eggItemId);
    if (!eggData) {
      console.warn(`Egg ${data.eggItemId} not found, skipping`);
      return null;
    }

    const egg: EggInstance = {
      isEgg: true,
      eggItemId: data.eggItemId,
      stepsRemaining: data.stepsRemaining,
      nickname: data.nickname
    };
    return egg;
  } else {
    // It's a creature
    if (data.speciesId === undefined) {
      console.warn('Invalid creature data in save');
      return null;
    }

    return deserializeCreature({
      speciesId: data.speciesId,
      nickname: data.nickname,
      level: data.level!,
      exp: data.exp!,
      currentHp: data.currentHp!,
      maxHp: data.maxHp!,
      stats: data.stats!,
      moves: data.moves!,
      status: data.status!
    });
  }
}

// Serialize PC storage
function serializeStorage(storage: PCStorage): SerializedStorage {
  return {
    currentBox: storage.currentBox,
    boxes: storage.boxes.map(box => ({
      name: box.name,
      creatures: box.creatures.map(c => c ? serializeCreature(c) : null)
    }))
  };
}

// Deserialize PC storage
function deserializeStorage(data: SerializedStorage): PCStorage {
  const boxes: StorageBox[] = data.boxes.map(boxData => ({
    name: boxData.name,
    creatures: boxData.creatures.map(c => c ? deserializeCreature(c) : null)
  }));

  return {
    currentBox: data.currentBox,
    boxes
  };
}

// Migrate save data from older versions
function migrateSave(saveData: SaveData): void {
  // v1 -> v2: Add IVs and natures to all creatures
  if (saveData.version === 1) {
    console.log('Migrating v1 save: Adding IVs and natures to creatures');

    // Migrate party creatures
    for (const member of saveData.party) {
      if (!member.isEgg) {
        // Add random IVs if not present
        if (!member.ivs) {
          member.ivs = generateRandomIVs();
        }
        // Add random nature if not present
        if (!member.nature) {
          member.nature = getRandomNature();
        }
      }
    }

    // Migrate PC storage creatures
    for (const box of saveData.pcStorage.boxes) {
      for (const creature of box.creatures) {
        if (creature) {
          if (!creature.ivs) {
            creature.ivs = generateRandomIVs();
          }
          if (!creature.nature) {
            creature.nature = getRandomNature();
          }
        }
      }
    }

    saveData.version = 2;
  }

  // Future migrations can be added here
  // if (saveData.version === 2) { ... }
}

// Main save function
export function saveGame(): boolean {
  try {
    const player = getPlayer();
    const currentMap = getCurrentMap();
    const party = getParty();
    const storage = getStorage();

    const saveData: SaveData = {
      version: SAVE_VERSION,
      timestamp: Date.now(),

      player: {
        x: player.x,
        y: player.y,
        facing: player.facing,
        stepCount: getStepCount(),
        certifications: [...getPlayerCertifications()]
      },

      currentMapId: currentMap.id,
      money: getPlayerMoney(),
      inventory: getInventory().map(slot => ({ ...slot })),

      party: party.map(serializePartyMember),

      pcStorage: serializeStorage(storage),

      defeatedTrainers: getDefeatedTrainers(),
      collectedEggs: getCollectedEggs(),

      repelSteps: getRepelSteps()
    };

    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
    return true;
  } catch (error) {
    console.error('Failed to save game:', error);
    return false;
  }
}

// Main load function
export function loadGame(): boolean {
  try {
    const savedJson = localStorage.getItem(SAVE_KEY);
    if (!savedJson) {
      return false;
    }

    const saveData: SaveData = JSON.parse(savedJson);

    // Handle save migrations
    if (saveData.version < SAVE_VERSION) {
      console.log(`Migrating save from v${saveData.version} to v${SAVE_VERSION}`);
      migrateSave(saveData);
    }

    // Restore map
    const map = getMap(saveData.currentMapId);
    if (!map) {
      console.error(`Map ${saveData.currentMapId} not found`);
      return false;
    }
    setCurrentMap(map);

    // Restore player position
    setPlayerPosition(saveData.player.x, saveData.player.y, saveData.player.facing);
    setPlayerStepCount(saveData.player.stepCount);
    setPlayerCertifications(saveData.player.certifications);

    // Restore economy
    setPlayerMoney(saveData.money);
    setPlayerInventory(saveData.inventory);

    // Restore party
    const party: PartyMember[] = [];
    for (const memberData of saveData.party) {
      const member = deserializePartyMember(memberData);
      if (member) {
        party.push(member);
      }
    }

    // Ensure party isn't empty
    if (party.length === 0) {
      console.error('No valid party members in save');
      return false;
    }

    setParty(party);

    // Restore PC storage
    const storage = deserializeStorage(saveData.pcStorage);
    setStorage(storage);

    // Restore progress tracking
    setDefeatedTrainers(saveData.defeatedTrainers);
    setCollectedEggs(saveData.collectedEggs);

    // Restore repel state
    setRepelSteps(saveData.repelSteps || 0);

    // Restore NPC defeated status on current map
    for (const npc of map.npcs) {
      if (npc.trainer && saveData.defeatedTrainers.includes(npc.id)) {
        npc.defeated = true;
      }
    }

    // Restore egg collection status on current map
    if (map.groundEggs) {
      for (const egg of map.groundEggs) {
        if (saveData.collectedEggs.includes(egg.id)) {
          egg.collected = true;
        }
      }
    }

    return true;
  } catch (error) {
    console.error('Failed to load game:', error);
    return false;
  }
}

// Check if save data exists
export function hasSaveData(): boolean {
  try {
    const saved = localStorage.getItem(SAVE_KEY);
    return saved !== null;
  } catch {
    return false;
  }
}

// Delete save data
export function deleteSaveData(): void {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch (error) {
    console.error('Failed to delete save:', error);
  }
}
