import { initCanvas, present, drawFadeOverlay } from './renderer/canvas.ts';
import { renderBattle } from './renderer/battle-ui.ts';
import { renderOverworld } from './renderer/overworld-ui.ts';
import { renderDialogue, startDialogue, advanceDialogue, advanceDialogueChar, isDialogueComplete, isCurrentLineComplete, clearDialogue } from './renderer/dialogue-ui.ts';
import { renderPartyMenu, handlePartyInput, handleBattlePartyInput, initPartyMenu } from './renderer/party-ui.ts';
import { renderStarterSelect, handleStarterInput, getSelectedStarterId, initStarterSelect } from './renderer/starter-ui.ts';
import { renderPC, handlePCInput, initPCUI } from './renderer/pc-ui.ts';
import { renderShop, handleShopInput, initShopUI } from './renderer/shop-ui.ts';
import { renderTMUI, handleTMInput, initTMUI } from './renderer/tm-ui.ts';
import { renderTitleScreen, handleTitleInput, initTitleScreen } from './renderer/title-ui.ts';
import { renderSettings, handleSettingsInput, initSettingsUI, getPreviousMode } from './renderer/settings-ui.ts';
import { renderDebug, handleDebugInput, initDebugUI } from './renderer/debug-ui.ts';
import { getItem } from './data/items.ts';
import { getShop } from './data/shops.ts';
import { advanceTypewriter, isTypewriterComplete } from './renderer/text.ts';
import { initInput, updateInput, getJustPressed, getDirectionPressed } from './engine/input.ts';
import { handleInput as handleBattleInput, updateHpAnimation, updateEntryAnimation, updateAttackAnimation } from './engine/battle.ts';
import { updateOverworld, handleOverworldInput } from './engine/overworld.ts';
import { initStorage } from './engine/storage.ts';
import { initAudio, tryStartMusic } from './engine/audio.ts';
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
  getCurrentMap
} from './engine/game-state.ts';
import { getCreature } from './data/creatures.ts';
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
import { TEXT_SPEED } from './constants.ts';

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
  // Start player in Scripps Marine Lab (San Diego starting area)
  setCurrentMap(SCRIPPS_LAB);

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
  } else if (mode === 'starter-select') {
    updateStarterSelectMode();
  } else if (mode === 'pc') {
    updatePCMode();
  } else if (mode === 'shop') {
    updateShopMode();
  } else if (mode === 'tm') {
    updateTMMode();
  } else if (mode === 'dialogue') {
    updateDialogueMode(deltaTime);
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
      // Start new game - go to starter selection
      initStarterSelect();
      setGameMode('starter-select');
    } else if (result === 'continue') {
      // Load saved game (not implemented yet)
      // For now, just start new game
      initStarterSelect();
      setGameMode('starter-select');
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
      } else {
        initPartyMenu();
        setGameMode('party-menu');
      }
    }
  }
}

let previousModeBeforeDebug: ReturnType<typeof getGameMode> = 'title';

function updateDebugMode(): void {
  const pressed = getJustPressed();
  const direction = getDirectionPressed();

  let input: 'up' | 'down' | 'left' | 'right' | 'a' | 'b' | 'l' | 'r' | null = null;
  if (direction) input = direction;
  else if (pressed.a) input = 'a';
  else if (pressed.b) input = 'b';
  else if (pressed.l) input = 'l';
  else if (pressed.r) input = 'r';

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

  // Start button opens party menu
  if (pressed.start) {
    initPartyMenu();
    setGameMode('party-menu');
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
      setGameMode('overworld');
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
        const temp = party[0];
        party[0] = party[result.index];
        party[result.index] = temp;

        // Update battle state with new active creature
        const battleState = getBattleState();
        if (battleState) {
          battleState.playerCreature = party[0];
          battleState.animatingHp.player = party[0].currentHp;
          // Queue message about switch
          battleState.messageQueue.push(`Go! ${party[0].species.name}!`);
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
  } else if (mode === 'starter-select') {
    renderStarterSelect();
  } else if (mode === 'pc') {
    renderPC();
  } else if (mode === 'shop') {
    renderShop();
  } else if (mode === 'tm') {
    renderTMUI();
  } else if (mode === 'dialogue') {
    // Render overworld behind dialogue box
    renderOverworld();
    renderDialogue();
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
