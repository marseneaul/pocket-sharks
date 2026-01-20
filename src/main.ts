import { initCanvas, present } from './renderer/canvas.ts';
import { renderBattle } from './renderer/battle-ui.ts';
import { renderOverworld } from './renderer/overworld-ui.ts';
import { renderPartyMenu, handlePartyInput, handleBattlePartyInput, initPartyMenu } from './renderer/party-ui.ts';
import { renderStarterSelect, handleStarterInput, getSelectedStarterId, initStarterSelect } from './renderer/starter-ui.ts';
import { renderPC, handlePCInput, initPCUI } from './renderer/pc-ui.ts';
import { renderShop, handleShopInput, initShopUI } from './renderer/shop-ui.ts';
import { renderTMUI, handleTMInput, initTMUI } from './renderer/tm-ui.ts';
import { getItem } from './data/items.ts';
import { getShop } from './data/shops.ts';
import { advanceTypewriter, isTypewriterComplete } from './renderer/text.ts';
import { initInput, updateInput, getJustPressed, getDirectionPressed } from './engine/input.ts';
import { handleInput as handleBattleInput, updateHpAnimation } from './engine/battle.ts';
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
  setStarterCreature
} from './engine/game-state.ts';
import { RESEARCH_STATION } from './data/maps/research-station.ts';
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

function init(): void {
  // Initialize systems
  initCanvas();
  initInput();
  initStorage();
  initAudio();

  // Initialize game state
  initGameState();

  // Register and load maps
  registerMap(RESEARCH_STATION);
  registerMap(ROUTE_1);
  registerMap(ROUTE_2);
  registerMap(ROUTE_3);
  registerMap(CORAL_BAY);
  registerMap(CORAL_GYM);
  registerMap(KELP_HARBOR);
  registerMap(KELP_GYM);
  registerMap(ROUTE_4);
  registerMap(FINNER_HQ);
  setCurrentMap(RESEARCH_STATION);

  // Position player in research station
  const player = getPlayer();
  player.x = 10;
  player.y = 10;
  player.pixelX = player.x * 8;
  player.pixelY = player.y * 8;

  // Start in starter selection mode
  initStarterSelect();
  setGameMode('starter-select');

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
  const mode = getGameMode();

  // Try to start music on any user input (browsers require interaction first)
  const pressed = getJustPressed();
  if (pressed.a || pressed.b || pressed.start || pressed.select || getDirectionPressed()) {
    tryStartMusic();
  }

  if (mode === 'overworld') {
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
  } else if (result && typeof result === 'object' && result.type === 'shop') {
    const shop = getShop(result.shopId);
    if (shop) {
      initShopUI(shop);
      setGameMode('shop');
    }
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

  // Update HP bar animation
  updateHpAnimation(battleState, deltaTime);

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
    } else {
      handleBattleInput(battleState, 'a');
    }
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

  if (mode === 'overworld') {
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
