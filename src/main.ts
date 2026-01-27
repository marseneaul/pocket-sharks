import { initCanvas, present, drawFadeOverlay, getContext } from './renderer/canvas.ts';
import { SCREEN_HEIGHT, SCREEN_WIDTH, DMG_PALETTE } from './constants.ts';
import { renderBattle } from './renderer/battle-ui.ts';
import { renderOverworld } from './renderer/overworld-ui.ts';
import { renderDialogue, startDialogue, advanceDialogue, advanceDialogueChar, isDialogueComplete, isCurrentLineComplete, clearDialogue } from './renderer/dialogue-ui.ts';
import { renderPartyMenu, handlePartyInput, handleBattlePartyInput, initPartyMenu, getPartyMenuIndex } from './renderer/party-ui.ts';
import { renderBagMenu, handleBagInput, initBagMenu } from './renderer/bag-ui.ts';
import { renderStarterSelect, handleStarterInput, getSelectedStarterId, initStarterSelect } from './renderer/starter-ui.ts';
import { renderPC, handlePCInput, initPCUI } from './renderer/pc-ui.ts';
import { renderShop, handleShopInput, initShopUI } from './renderer/shop-ui.ts';
import { renderTMUI, handleTMInput, initTMUI } from './renderer/tm-ui.ts';
import { renderSharkedex, handleSharkedexInput, initSharkedexUI } from './renderer/sharkedex-ui.ts';
import { renderBadgeMenu, handleBadgeInput, initBadgeMenu } from './renderer/badge-ui.ts';
import { renderStartMenu, handleStartMenuInput, initStartMenu } from './renderer/start-menu-ui.ts';
import { renderTitleScreen, handleTitleInput, initTitleScreen } from './renderer/title-ui.ts';
import { renderSettings, handleSettingsInput, initSettingsUI, getPreviousMode } from './renderer/settings-ui.ts';
import { renderDebug, handleDebugInput, initDebugUI } from './renderer/debug-ui.ts';
import { renderFishing, initFishing, updateFishing, handleFishingInput } from './renderer/fishing-ui.ts';
import { getItem } from './data/items.ts';
import { getShop } from './data/shops.ts';
import { advanceTypewriter, isTypewriterComplete, drawText } from './renderer/text.ts';
import { initInput, updateInput, getJustPressed, getDirectionPressed, getInputState } from './engine/input.ts';
import { handleInput as handleBattleInput, updateHpAnimation, updateEntryAnimation, updateAttackAnimation, updateCageAnimation, useBattleItem } from './engine/battle.ts';
import { createStatStages } from './engine/stat-stages.ts';
import { updateOverworld, handleOverworldInput } from './engine/overworld.ts';
import { initStorage } from './engine/storage.ts';
import { initAudio, tryStartMusic } from './engine/audio.ts';
import { saveGame, loadGame } from './engine/save-system.ts';
import {
  initGameState,
  getGameMode,
  setGameMode,
  getBattleState,
  endBattle,
  setCurrentMap,
  registerMap,
  getPlayer,
  getParty,
  setStarterCreature,
  updateTransition,
  getTransitionAlpha,
  isTransitioning,
  startWildBattle,
  startTrainerBattle,
  getMap,
  getCurrentMap,
  resetForNewGame,
  useItemOnCreature,
  useRepelItem,
  getPlayerCertifications
} from './engine/game-state.ts';
import { generateFishingEncounter } from './data/encounters.ts';
import { getCreature } from './data/creatures.ts';
import { isCreature } from './types/index.ts';
import { createCreatureInstance } from './engine/battle.ts';
// San Diego Region maps (Region 1)
import { SCRIPPS_LAB } from './data/maps/research-station.ts';
import { LA_JOLLA_SHORES } from './data/maps/la-jolla-shores.ts';
import { LA_JOLLA_TIDE_POOLS } from './data/maps/la-jolla-tide-pools.ts';
import { KELP_FOREST_ROUTE } from './data/maps/kelp-forest-route.ts';
import { SAN_DIEGO_BAY } from './data/maps/san-diego-bay.ts';
import { RAYS_GYM } from './data/maps/rays-gym.ts';
// Hawaii Region maps (Region 2)
import { HAWAII_AIRPORT } from './data/maps/hawaii-airport.ts';
import { WAIKIKI_BEACH } from './data/maps/waikiki-beach.ts';
import { DIVE_SCHOOL } from './data/maps/dive-school.ts';
import { HAWAII_REEF } from './data/maps/hawaii-reef.ts';
// Cabo / Baja Region maps (Region 3)
import { CABO_HARBOR } from './data/maps/cabo-harbor.ts';
import { CABO_BEACH } from './data/maps/cabo-beach.ts';
import { CABO_REEF } from './data/maps/cabo-reef.ts';
import { SEA_OF_CORTEZ } from './data/maps/sea-of-cortez.ts';
import { CABO_TOWN } from './data/maps/cabo-town.ts';
import { MARTILLO_GYM } from './data/maps/martillo-gym.ts';
// Caribbean / Florida Region maps (Region 4)
import { FLORIDA_AIRPORT } from './data/maps/florida-airport.ts';
import { FLORIDA_KEYS } from './data/maps/florida-keys.ts';
import { KEY_WEST } from './data/maps/key-west.ts';
import { CARIBBEAN_REEF } from './data/maps/caribbean-reef.ts';
import { CORAL_REEF_GYM } from './data/maps/coral-reef-gym.ts';
// Hawaii Return / French Polynesia Region maps (Region 5)
import { MAUI_AIRPORT } from './data/maps/maui-airport.ts';
import { OPEN_OCEAN } from './data/maps/open-ocean.ts';
import { OCEAN_GYM } from './data/maps/ocean-gym.ts';
// Pacific Northwest Region maps (Region 6)
import { SEATTLE_AIRPORT } from './data/maps/seattle-airport.ts';
import { PUGET_SOUND } from './data/maps/puget-sound.ts';
import { PACIFIC_KELP_FOREST } from './data/maps/pacific-kelp-forest.ts';
import { COLD_WATER_TRENCH } from './data/maps/cold-water-trench.ts';
import { COLD_WATER_GYM } from './data/maps/cold-water-gym.ts';
// Europe Region maps (Region 7)
import { EUROPE_FERRY_TERMINAL } from './data/maps/europe-ferry-terminal.ts';
import { EUROPEAN_COAST } from './data/maps/european-coast.ts';
import { NORTH_SEA } from './data/maps/north-sea.ts';
import { SURVIVOR_GYM } from './data/maps/survivor-gym.ts';
// Cape Town Region maps (Region 8)
import { CAPE_TOWN_HARBOR } from './data/maps/cape-town-harbor.ts';
import { CAPE_TOWN_COAST } from './data/maps/cape-town-coast.ts';
import { CAPE_TOWN_KELP } from './data/maps/cape-town-kelp.ts';
import { SEAL_ISLAND } from './data/maps/seal-island.ts';
import { SAFARI_GYM } from './data/maps/safari-gym.ts';
// Asia/Australia Region maps (Region 9)
import { AUSTRALIA_AIRPORT } from './data/maps/australia-airport.ts';
import { GREAT_BARRIER_REEF } from './data/maps/great-barrier-reef.ts';
import { OUTBACK_GYM } from './data/maps/outback-gym.ts';
// Roatan Region maps (Region 10)
import { ROATAN_HARBOR } from './data/maps/roatan-harbor.ts';
// Abyssal/Endgame Region maps (Region 11)
import { ABYSSAL_TRENCH } from './data/maps/abyssal-trench.ts';
import { DEEPSEA_GYM } from './data/maps/deepsea-gym.ts';
// Legacy maps (will be reworked later)
import { ROUTE_1 } from './data/maps/route-1.ts';
import { ROUTE_2 } from './data/maps/route-2.ts';
import { ROUTE_3 } from './data/maps/route-3.ts';
import { CORAL_BAY } from './data/maps/coral-bay.ts';
import { CORAL_GYM } from './data/maps/coral-gym.ts';
import { KELP_HARBOR } from './data/maps/kelp-harbor.ts';
import { KELP_GYM } from './data/maps/kelp-gym.ts';
import { ROUTE_4 } from './data/maps/route-4.ts';
import { FINNER_HQ } from './data/maps/finner-hq.ts';
import { TEST_BEACH } from './data/maps/test-beach.ts';
import { TEXT_SPEED } from './constants.ts';
import { initTileAtlas } from './renderer/tile-atlas.ts';

let lastTime = 0;
let typewriterTimer = 0;
let dialogueTypewriterTimer = 0;
let pendingTrainerNpcId: string | null = null;  // Track trainer battle after dialogue

function init(): void {
  // Initialize systems
  initCanvas();
  initInput();
  initStorage();
  initAudio();

  // Load tile atlas (async, but game can start without it)
  initTileAtlas().then(() => {
    console.log('Tile atlas ready');
  }).catch(err => {
    console.warn('Failed to load tile atlas, using procedural tiles:', err);
  });

  // Initialize game state
  initGameState();

  // Register San Diego Region maps (Region 1)
  registerMap(SCRIPPS_LAB);
  registerMap(LA_JOLLA_SHORES);
  registerMap(LA_JOLLA_TIDE_POOLS);
  registerMap(KELP_FOREST_ROUTE);
  registerMap(SAN_DIEGO_BAY);
  registerMap(RAYS_GYM);
  // Register Hawaii Region maps (Region 2)
  registerMap(HAWAII_AIRPORT);
  registerMap(WAIKIKI_BEACH);
  registerMap(DIVE_SCHOOL);
  registerMap(HAWAII_REEF);
  // Register Cabo / Baja Region maps (Region 3)
  registerMap(CABO_HARBOR);
  registerMap(CABO_BEACH);
  registerMap(CABO_REEF);
  registerMap(SEA_OF_CORTEZ);
  registerMap(CABO_TOWN);
  registerMap(MARTILLO_GYM);
  // Register Caribbean / Florida Region maps (Region 4)
  registerMap(FLORIDA_AIRPORT);
  registerMap(FLORIDA_KEYS);
  registerMap(KEY_WEST);
  registerMap(CARIBBEAN_REEF);
  registerMap(CORAL_REEF_GYM);
  // Register Hawaii Return / French Polynesia Region maps (Region 5)
  registerMap(MAUI_AIRPORT);
  registerMap(OPEN_OCEAN);
  registerMap(OCEAN_GYM);
  // Register Pacific Northwest Region maps (Region 6)
  registerMap(SEATTLE_AIRPORT);
  registerMap(PUGET_SOUND);
  registerMap(PACIFIC_KELP_FOREST);
  registerMap(COLD_WATER_TRENCH);
  registerMap(COLD_WATER_GYM);
  // Register Europe Region maps (Region 7)
  registerMap(EUROPE_FERRY_TERMINAL);
  registerMap(EUROPEAN_COAST);
  registerMap(NORTH_SEA);
  registerMap(SURVIVOR_GYM);
  // Register Cape Town Region maps (Region 8)
  registerMap(CAPE_TOWN_HARBOR);
  registerMap(CAPE_TOWN_COAST);
  registerMap(CAPE_TOWN_KELP);
  registerMap(SEAL_ISLAND);
  registerMap(SAFARI_GYM);
  // Register Asia/Australia Region maps (Region 9)
  registerMap(AUSTRALIA_AIRPORT);
  registerMap(GREAT_BARRIER_REEF);
  registerMap(OUTBACK_GYM);
  // Register Roatan Region maps (Region 10)
  registerMap(ROATAN_HARBOR);
  // Register Abyssal/Endgame Region maps (Region 11)
  registerMap(ABYSSAL_TRENCH);
  registerMap(DEEPSEA_GYM);
  // Register legacy maps (for backwards compatibility during transition)
  registerMap(ROUTE_1);
  registerMap(ROUTE_2);
  registerMap(ROUTE_3);
  registerMap(CORAL_BAY);
  registerMap(CORAL_GYM);
  registerMap(KELP_HARBOR);
  registerMap(KELP_GYM);
  registerMap(ROUTE_4);
  registerMap(FINNER_HQ);
  // Test map for tileset verification
  registerMap(TEST_BEACH);

  // Start player in Scripps Marine Lab (San Diego starting area)
  setCurrentMap(SCRIPPS_LAB);
  // setCurrentMap(TEST_BEACH);  // Uncomment to test tileset graphics

  // Position player in research station
  const player = getPlayer();
  player.x = 10;
  player.y = 10;
  player.pixelX = player.x * 8;
  player.pixelY = player.y * 8;

  // Check for debug mode URL parameter (?debug=1)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('debug') === '1') {
    // Start directly in debug mode with a starter so battles work
    setStarterCreature(1);
    initDebugUI();
    setGameMode('debug');
  } else {
    // Start at title screen
    initTitleScreen();
    setGameMode('title');
  }

  // Start game loop
  requestAnimationFrame(gameLoop);
}

function gameLoop(currentTime: number): void {
  const deltaTime = currentTime - lastTime;
  lastTime = currentTime;

  update(deltaTime);
  render();

  // Copy current input to previous
  updateInput();

  requestAnimationFrame(gameLoop);
}

function update(deltaTime: number): void {
  // Update screen transitions
  updateTransition(deltaTime);

  // Block gameplay updates during transitions
  if (isTransitioning()) return;

  const mode = getGameMode();

  // Try to start music on any user input (browsers require interaction first)
  const pressed = getJustPressed();
  if (pressed.a || pressed.b || pressed.start || pressed.select || getDirectionPressed()) {
    tryStartMusic();
  }

  // Select button opens debug mode from most screens
  if (pressed.select && mode !== 'debug' && mode !== 'battle') {
    previousModeBeforeDebug = mode;
    initDebugUI();
    setGameMode('debug');
    return;
  }

  if (mode === 'title') {
    updateTitleMode();
  } else if (mode === 'settings') {
    updateSettingsMode();
  } else if (mode === 'debug') {
    updateDebugMode();
  } else if (mode === 'overworld') {
    updateOverworldMode(deltaTime);
  } else if (mode === 'battle') {
    updateBattleMode(deltaTime);
  } else if (mode === 'party-menu') {
    updatePartyMenuMode();
  } else if (mode === 'battle-party') {
    updateBattlePartyMode();
  } else if (mode === 'battle-bag') {
    updateBattleBagMode();
  } else if (mode === 'starter-select') {
    updateStarterSelectMode();
  } else if (mode === 'pc') {
    updatePCMode();
  } else if (mode === 'shop') {
    updateShopMode();
  } else if (mode === 'tm') {
    updateTMMode();
  } else if (mode === 'sharkedex') {
    updateSharkedexMode();
  } else if (mode === 'badges') {
    updateBadgesMode();
  } else if (mode === 'start-menu') {
    updateStartMenuMode();
  } else if (mode === 'dialogue') {
    updateDialogueMode(deltaTime);
  } else if (mode === 'item-use-party') {
    updateItemUsePartyMode();
  } else if (mode === 'item-message') {
    updateItemMessageMode();
  } else if (mode === 'fishing') {
    updateFishingMode(deltaTime);
  }
}

function updateTitleMode(): void {
  const pressed = getJustPressed();
  const direction = getDirectionPressed();

  let input: 'up' | 'down' | 'a' | 'b' | null = null;
  if (direction === 'up') input = 'up';
  else if (direction === 'down') input = 'down';
  else if (pressed.a) input = 'a';
  else if (pressed.b) input = 'b';

  if (input) {
    const result = handleTitleInput(input);
    if (result === 'new-game') {
      // Start new game - reset all progress and go to starter selection
      resetForNewGame();
      initStarterSelect();
      setGameMode('starter-select');
    } else if (result === 'continue') {
      // Load saved game
      if (loadGame()) {
        setGameMode('overworld');
      } else {
        // Save corrupted or invalid, start new game
        initStarterSelect();
        setGameMode('starter-select');
      }
    } else if (result === 'options') {
      // Go to settings
      initSettingsUI('title');
      setGameMode('settings');
    }
  }
}

function updateSettingsMode(): void {
  const pressed = getJustPressed();
  const direction = getDirectionPressed();

  let input: 'up' | 'down' | 'left' | 'right' | 'a' | 'b' | null = null;
  if (direction) input = direction;
  else if (pressed.a) input = 'a';
  else if (pressed.b) input = 'b';

  if (input) {
    const result = handleSettingsInput(input);
    if (result === 'close') {
      // Return to previous mode
      const prevMode = getPreviousMode();
      if (prevMode === 'title') {
        initTitleScreen();
        setGameMode('title');
      } else if (prevMode === 'start-menu') {
        initStartMenu();
        setGameMode('start-menu');
      } else {
        initPartyMenu();
        setGameMode('party-menu');
      }
    }
  }
}

let previousModeBeforeDebug: ReturnType<typeof getGameMode> = 'title';
let previousModeBeforeSharkedex: ReturnType<typeof getGameMode> = 'overworld';

// Overworld item usage state
let pendingOverworldItem: number | null = null;
let overworldItemMessage: string | null = null;

// Fishing state
import type { CreatureInstance } from './types/index.ts';
let pendingFishingCreature: CreatureInstance | null = null;

// Debug mode key repeat state
let debugKeyRepeatTimer = 0;
let debugKeyRepeatDirection: 'up' | 'down' | 'left' | 'right' | null = null;
const DEBUG_KEY_REPEAT_INITIAL_DELAY = 300; // ms before repeat starts
const DEBUG_KEY_REPEAT_RATE = 80; // ms between repeats

function updateDebugMode(): void {
  const pressed = getJustPressed();
  const direction = getDirectionPressed();
  const inputState = getInputState();

  let input: 'up' | 'down' | 'left' | 'right' | 'a' | 'b' | 'l' | 'r' | null = null;

  // Check for new direction press
  if (direction) {
    input = direction;
    debugKeyRepeatDirection = direction;
    debugKeyRepeatTimer = Date.now() + DEBUG_KEY_REPEAT_INITIAL_DELAY;
  }
  // Check for held direction (key repeat)
  else if (debugKeyRepeatDirection && inputState[debugKeyRepeatDirection]) {
    if (Date.now() >= debugKeyRepeatTimer) {
      input = debugKeyRepeatDirection;
      debugKeyRepeatTimer = Date.now() + DEBUG_KEY_REPEAT_RATE;
    }
  } else {
    // Direction key released
    debugKeyRepeatDirection = null;
  }

  // Non-direction inputs (no repeat)
  if (!input) {
    if (pressed.a) input = 'a';
    else if (pressed.b) input = 'b';
    else if (pressed.l) input = 'l';
    else if (pressed.r) input = 'r';
  }

  if (input) {
    const result = handleDebugInput(input);

    if (result.type === 'close') {
      setGameMode(previousModeBeforeDebug);
    } else if (result.type === 'warp') {
      const map = getMap(result.mapId);
      if (map) {
        setCurrentMap(map);
        const player = getPlayer();
        player.x = 5;
        player.y = 5;
        player.pixelX = player.x * 8;
        player.pixelY = player.y * 8;
        setGameMode('overworld');
      }
    } else if (result.type === 'battle') {
      const species = getCreature(result.creatureId);
      if (species) {
        const enemy = createCreatureInstance(species, result.level);
        startWildBattle(enemy);
      }
    } else if (result.type === 'screen') {
      switch (result.screen) {
        case 'title':
          initTitleScreen();
          setGameMode('title');
          break;
        case 'starter-select':
          initStarterSelect();
          setGameMode('starter-select');
          break;
        case 'overworld':
          setGameMode('overworld');
          break;
        case 'party-menu':
          initPartyMenu();
          setGameMode('party-menu');
          break;
        case 'pc':
          initPCUI();
          setGameMode('pc');
          break;
        case 'settings':
          initSettingsUI('title');
          setGameMode('settings');
          break;
        case 'sharkedex':
          previousModeBeforeSharkedex = 'debug';
          initSharkedexUI();
          setGameMode('sharkedex');
          break;
      }
    }
  }
}

function updateOverworldMode(deltaTime: number): void {
  // Update overworld logic
  updateOverworld(deltaTime);

  // Handle input
  const pressed = getJustPressed();
  const direction = getDirectionPressed();

  // Start button opens start menu
  if (pressed.start) {
    initStartMenu();
    setGameMode('start-menu');
    return;
  }

  const result = handleOverworldInput(direction, pressed.a, pressed.b);
  if (result === 'pc') {
    initPCUI();
    setGameMode('pc');
  } else if (result && typeof result === 'object') {
    if (result.type === 'shop') {
      const shop = getShop(result.shopId);
      if (shop) {
        initShopUI(shop);
        setGameMode('shop');
      }
    } else if (result.type === 'dialogue') {
      startDialogue(result.lines, result.speakerName);
      setGameMode('dialogue');
    } else if (result.type === 'trainer') {
      // Show pre-battle dialogue, then start battle
      startDialogue(result.dialogue);
      pendingTrainerNpcId = result.npcId;
      setGameMode('dialogue');
    } else if (result.type === 'fishing') {
      // Start fishing mini-game
      const map = getCurrentMap();
      const certs = getPlayerCertifications();
      const creature = generateFishingEncounter(map.encounterTable, result.rodPower, certs);
      if (creature) {
        pendingFishingCreature = creature;
        initFishing();
        setGameMode('fishing');
      } else {
        // No fishing encounters available - shouldn't happen but handle gracefully
        startDialogue(['Nothing seems to be biting here...']);
        setGameMode('dialogue');
      }
    }
  }
}

function updateDialogueMode(deltaTime: number): void {
  const pressed = getJustPressed();

  // Advance typewriter
  if (!isCurrentLineComplete()) {
    dialogueTypewriterTimer += deltaTime;
    while (dialogueTypewriterTimer >= TEXT_SPEED) {
      dialogueTypewriterTimer -= TEXT_SPEED;
      advanceDialogueChar();
    }
  }

  // A button advances dialogue or completes typewriter
  if (pressed.a) {
    advanceDialogue();

    // Check if dialogue is complete
    if (isDialogueComplete()) {
      clearDialogue();
      dialogueTypewriterTimer = 0;

      // Check for pending trainer battle
      if (pendingTrainerNpcId) {
        const map = getCurrentMap();
        const npc = map.npcs.find(n => n.id === pendingTrainerNpcId);
        pendingTrainerNpcId = null;
        if (npc) {
          startTrainerBattle(npc);
          return;
        }
      }

      setGameMode('overworld');
    }
  }

  // B button also completes typewriter
  if (pressed.b && !isCurrentLineComplete()) {
    advanceDialogue();
  }
}

function updateBattleMode(deltaTime: number): void {
  const battleState = getBattleState();
  if (!battleState) {
    // Battle ended somehow, return to overworld
    setGameMode('overworld');
    return;
  }

  // Update typewriter animation
  if (!isTypewriterComplete()) {
    typewriterTimer += deltaTime;
    while (typewriterTimer >= TEXT_SPEED) {
      typewriterTimer -= TEXT_SPEED;
      advanceTypewriter();
    }
  }

  // Update animations
  updateHpAnimation(battleState, deltaTime);
  updateEntryAnimation(battleState, deltaTime);
  updateAttackAnimation(battleState, deltaTime);
  updateCageAnimation(battleState, deltaTime);

  // Handle input
  const pressed = getJustPressed();
  const direction = getDirectionPressed();

  if (direction) {
    handleBattleInput(battleState, direction);
  }

  if (pressed.a) {
    // If typewriter is running, complete it immediately
    if (!isTypewriterComplete()) {
      while (!isTypewriterComplete()) {
        advanceTypewriter();
      }
    }
    // Always handle the input (both to advance messages and select actions)
    handleBattleInput(battleState, 'a');
  }

  if (pressed.b) {
    handleBattleInput(battleState, 'b');
  }

  // Check for battle end
  if (battleState.phase === 'victory' || battleState.phase === 'defeat') {
    // Wait for player to press a button to exit
    if (pressed.a || pressed.b) {
      endBattle();
      typewriterTimer = 0;
    }
  }
}

function updateStarterSelectMode(): void {
  const pressed = getJustPressed();
  const direction = getDirectionPressed();

  let input: 'left' | 'right' | 'a' | 'b' | null = null;
  if (direction === 'left') input = 'left';
  else if (direction === 'right') input = 'right';
  else if (pressed.a) input = 'a';
  else if (pressed.b) input = 'b';

  if (input) {
    const result = handleStarterInput(input);
    if (result === 'select') {
      // Player has chosen their starter
      const starterId = getSelectedStarterId();
      setStarterCreature(starterId);
      setGameMode('overworld');
    }
  }
}

function updatePartyMenuMode(): void {
  const pressed = getJustPressed();
  const direction = getDirectionPressed();

  let input: 'up' | 'down' | 'left' | 'right' | 'a' | 'b' | null = null;
  if (direction) input = direction;
  else if (pressed.a) input = 'a';
  else if (pressed.b) input = 'b';

  if (input) {
    const result = handlePartyInput(input);
    if (result === 'close') {
      initStartMenu();
      setGameMode('start-menu');
    }
  }
}

function updateBattlePartyMode(): void {
  const pressed = getJustPressed();
  const direction = getDirectionPressed();

  let input: 'up' | 'down' | 'left' | 'right' | 'a' | 'b' | null = null;
  if (direction) input = direction;
  else if (pressed.a) input = 'a';
  else if (pressed.b) input = 'b';

  if (input) {
    const result = handleBattlePartyInput(input);
    if (result) {
      if (result.action === 'close') {
        setGameMode('battle');
      } else if (result.action === 'switch' && result.index !== undefined) {
        // Switch the party member to front
        const party = getParty();
        const newActive = party[result.index];

        // Can only switch in creatures, not eggs
        if (!isCreature(newActive)) {
          setGameMode('battle');
          return;
        }

        const temp = party[0];
        party[0] = party[result.index];
        party[result.index] = temp;

        // Update battle state with new active creature
        const battleState = getBattleState();
        if (battleState) {
          battleState.playerCreature = newActive;
          battleState.animatingHp.player = newActive.currentHp;
          // Reset stat stages when switching out
          battleState.statStages.player = createStatStages();
          // Queue message about switch
          battleState.messageQueue.push(`Go! ${newActive.species.name}!`);
          battleState.phase = 'message';
          if (battleState.messageQueue.length > 0) {
            battleState.message = battleState.messageQueue.shift()!;
          }
        }
        setGameMode('battle');
      }
    }
  }
}

function updateBattleBagMode(): void {
  const pressed = getJustPressed();
  const direction = getDirectionPressed();

  let input: 'up' | 'down' | 'left' | 'right' | 'a' | 'b' | null = null;
  if (direction) input = direction;
  else if (pressed.a) input = 'a';
  else if (pressed.b) input = 'b';

  if (input) {
    const result = handleBagInput(input);
    if (result) {
      if (result.action === 'close') {
        // Return to battle if in battle, otherwise to start menu
        const battleState = getBattleState();
        if (battleState) {
          setGameMode('battle');
        } else {
          initStartMenu();
          setGameMode('start-menu');
        }
      } else if (result.action === 'use' && result.itemId !== undefined) {
        const battleState = getBattleState();
        if (battleState) {
          // Use the selected item in battle
          useBattleItem(battleState, result.itemId);
          setGameMode('battle');
        } else {
          // Use the item outside of battle
          const item = getItem(result.itemId);
          if (!item) return;

          // Handle different item types
          if (item.type === 'potion' || item.type === 'status') {
            // Need to select a creature to use it on
            pendingOverworldItem = result.itemId;
            initPartyMenu();
            setGameMode('item-use-party');
          } else if (item.type === 'battle' && (result.itemId === 30 || result.itemId === 31 || result.itemId === 32)) {
            // Repel items
            const message = useRepelItem(result.itemId);
            if (message) {
              overworldItemMessage = message;
              setGameMode('item-message');
            } else {
              initStartMenu();
              setGameMode('start-menu');
            }
          } else if (item.type === 'tm') {
            // TM items - use the TM teaching UI
            useTM(result.itemId);
          } else {
            // Item can't be used outside of battle
            initStartMenu();
            setGameMode('start-menu');
          }
        }
      }
    }
  }
}

function updatePCMode(): void {
  const pressed = getJustPressed();
  const direction = getDirectionPressed();

  let input: 'up' | 'down' | 'left' | 'right' | 'a' | 'b' | 'l' | 'r' | null = null;
  if (direction) input = direction;
  else if (pressed.a) input = 'a';
  else if (pressed.b) input = 'b';
  else if (pressed.l) input = 'l';
  else if (pressed.r) input = 'r';

  if (input) {
    const result = handlePCInput(input);
    if (result === 'close') {
      setGameMode('overworld');
    }
  }
}

function updateShopMode(): void {
  const pressed = getJustPressed();
  const direction = getDirectionPressed();

  let input: 'up' | 'down' | 'left' | 'right' | 'a' | 'b' | null = null;
  if (direction) input = direction;
  else if (pressed.a) input = 'a';
  else if (pressed.b) input = 'b';

  if (input) {
    const result = handleShopInput(input);
    if (result === 'close') {
      setGameMode('overworld');
    }
  }
}

function updateTMMode(): void {
  const pressed = getJustPressed();
  const direction = getDirectionPressed();

  let input: 'up' | 'down' | 'left' | 'right' | 'a' | 'b' | null = null;
  if (direction) input = direction;
  else if (pressed.a) input = 'a';
  else if (pressed.b) input = 'b';

  if (input) {
    const result = handleTMInput(input);
    if (result === 'close' || result === 'used') {
      setGameMode('party-menu');
    }
  }
}

function updateSharkedexMode(): void {
  const pressed = getJustPressed();
  const direction = getDirectionPressed();

  let input: 'up' | 'down' | 'left' | 'right' | 'a' | 'b' | 'l' | 'r' | null = null;
  if (direction) input = direction;
  else if (pressed.a) input = 'a';
  else if (pressed.b) input = 'b';
  else if (pressed.l) input = 'l';
  else if (pressed.r) input = 'r';

  if (input) {
    const result = handleSharkedexInput(input);
    if (result === 'close') {
      if (previousModeBeforeSharkedex === 'start-menu') {
        initStartMenu();
      }
      setGameMode(previousModeBeforeSharkedex);
    }
  }
}

function updateBadgesMode(): void {
  const pressed = getJustPressed();
  const direction = getDirectionPressed();

  let input: 'up' | 'down' | 'left' | 'right' | 'a' | 'b' | null = null;
  if (direction) input = direction;
  else if (pressed.a) input = 'a';
  else if (pressed.b) input = 'b';

  if (input) {
    const result = handleBadgeInput(input);
    if (result === 'close') {
      initStartMenu();
      setGameMode('start-menu');
    }
  }
}

function updateStartMenuMode(): void {
  const pressed = getJustPressed();
  const direction = getDirectionPressed();

  let input: 'up' | 'down' | 'a' | 'b' | null = null;
  if (direction === 'up') input = 'up';
  else if (direction === 'down') input = 'down';
  else if (pressed.a) input = 'a';
  else if (pressed.b) input = 'b';

  if (input) {
    const result = handleStartMenuInput(input);
    if (result === 'close') {
      setGameMode('overworld');
    } else if (result && result.action === 'select') {
      switch (result.option) {
        case 'PARTY':
          initPartyMenu();
          setGameMode('party-menu');
          break;
        case 'BAG':
          initBagMenu();
          setGameMode('battle-bag');
          break;
        case 'BADGES':
          initBadgeMenu();
          setGameMode('badges');
          break;
        case 'SHARKEDEX':
          previousModeBeforeSharkedex = 'start-menu';
          initSharkedexUI();
          setGameMode('sharkedex');
          break;
        case 'SAVE':
          // Save the game
          if (saveGame()) {
            startDialogue(['Game saved!']);
          } else {
            startDialogue(['Save failed!']);
          }
          setGameMode('dialogue');
          break;
        case 'OPTIONS':
          initSettingsUI('start-menu');
          setGameMode('settings');
          break;
      }
    }
  }
}

function updateItemUsePartyMode(): void {
  const pressed = getJustPressed();
  const direction = getDirectionPressed();

  let input: 'up' | 'down' | 'left' | 'right' | 'a' | 'b' | null = null;
  if (direction) input = direction;
  else if (pressed.a) input = 'a';
  else if (pressed.b) input = 'b';

  if (input) {
    const result = handlePartyInput(input);
    if (result === 'close') {
      // Cancel item use, go back to bag
      pendingOverworldItem = null;
      initBagMenu();
      setGameMode('battle-bag');
    } else if (result === 'switch') {
      // Selected a creature to use item on
      if (pendingOverworldItem !== null) {
        const partyIndex = getPartyMenuIndex();
        const message = useItemOnCreature(pendingOverworldItem, partyIndex);
        if (message) {
          overworldItemMessage = message;
          pendingOverworldItem = null;
          setGameMode('item-message');
        } else {
          // Item couldn't be used
          pendingOverworldItem = null;
          initBagMenu();
          setGameMode('battle-bag');
        }
      }
    }
  }
}

function updateItemMessageMode(): void {
  const pressed = getJustPressed();

  // Any button dismisses the message
  if (pressed.a || pressed.b) {
    overworldItemMessage = null;
    initBagMenu();
    setGameMode('battle-bag');
  }
}

function renderItemMessage(): void {
  if (!overworldItemMessage) return;

  const ctx = getContext();

  // Draw message box at bottom of screen
  ctx.fillStyle = DMG_PALETTE.WHITE;
  ctx.fillRect(4, SCREEN_HEIGHT - 40, SCREEN_WIDTH - 8, 36);
  ctx.strokeStyle = DMG_PALETTE.BLACK;
  ctx.strokeRect(3.5, SCREEN_HEIGHT - 40.5, SCREEN_WIDTH - 7, 37);

  // Draw message text
  drawText(overworldItemMessage, 8, SCREEN_HEIGHT - 34, 0);
}

function updateFishingMode(deltaTime: number): void {
  const pressed = getJustPressed();

  // Update fishing mini-game
  updateFishing(deltaTime);

  // Handle input
  const result = handleFishingInput(pressed.a, pressed.b);

  if (result === 'battle' && pendingFishingCreature) {
    // Start battle with the fishing creature
    startWildBattle(pendingFishingCreature);
    pendingFishingCreature = null;
  } else if (result === 'close') {
    // Return to overworld
    pendingFishingCreature = null;
    setGameMode('overworld');
  }
}

function render(): void {
  const mode = getGameMode();

  if (mode === 'title') {
    renderTitleScreen();
  } else if (mode === 'settings') {
    renderSettings();
  } else if (mode === 'debug') {
    renderDebug();
  } else if (mode === 'overworld') {
    renderOverworld();
  } else if (mode === 'battle') {
    const battleState = getBattleState();
    if (battleState) {
      renderBattle(battleState);
    }
  } else if (mode === 'party-menu') {
    renderPartyMenu(false);
  } else if (mode === 'battle-party') {
    renderPartyMenu(true);
  } else if (mode === 'battle-bag') {
    renderBagMenu();
  } else if (mode === 'starter-select') {
    renderStarterSelect();
  } else if (mode === 'pc') {
    renderPC();
  } else if (mode === 'shop') {
    renderShop();
  } else if (mode === 'tm') {
    renderTMUI();
  } else if (mode === 'sharkedex') {
    renderSharkedex();
  } else if (mode === 'badges') {
    renderBadgeMenu();
  } else if (mode === 'start-menu') {
    // Render overworld behind start menu
    renderOverworld();
    renderStartMenu();
  } else if (mode === 'dialogue') {
    // Render overworld behind dialogue box
    renderOverworld();
    renderDialogue();
  } else if (mode === 'item-use-party') {
    // Party menu for selecting creature to use item on
    renderPartyMenu(false);
  } else if (mode === 'item-message') {
    // Show message about item use result
    renderOverworld();
    // Simple message box rendering
    renderItemMessage();
  } else if (mode === 'fishing') {
    // Render overworld behind fishing UI
    renderOverworld();
    renderFishing();
  }

  // Draw screen transition overlay
  const transitionAlpha = getTransitionAlpha();
  if (transitionAlpha > 0) {
    drawFadeOverlay(transitionAlpha);
  }

  present();
}

// Export function to use a TM from inventory/party menu
export function useTM(tmItemId: number): boolean {
  const item = getItem(tmItemId);
  if (!item || item.type !== 'tm') return false;

  initTMUI(tmItemId);
  setGameMode('tm');
  return true;
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
