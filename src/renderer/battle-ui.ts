import { SCREEN_WIDTH, SCREEN_HEIGHT, BATTLE_UI } from '../constants.ts';
import { clear, fillRect, drawBox, setPixel } from './canvas.ts';
import { drawText, drawTextRightAligned, drawTypewriter, startTypewriter, isTypewriterComplete } from './text.ts';
import { drawCreatureSprite } from './sprites.ts';
import { getEntryAnimationOffsets, getAttackAnimationEffects, getCageAnimationEffects } from '../engine/battle.ts';
import type { BattleState, CreatureInstance } from '../types/index.ts';

const MENU_ITEMS = ['FIGHT', 'BAG', 'SHARKS', 'RUN'];

export function renderBattle(state: BattleState): void {
  clear();

  // Draw battle scene background (simple for now)
  renderBattleBackground();

  // Get animation offsets
  const entryOffsets = getEntryAnimationOffsets(state);
  const attackEffects = getAttackAnimationEffects(state);
  const cageEffects = getCageAnimationEffects(state);

  // Combine offsets
  const enemyX = entryOffsets.enemyX + attackEffects.enemyOffsetX + attackEffects.enemyShake;
  const playerX = entryOffsets.playerX + attackEffects.playerOffsetX + attackEffects.playerShake;

  // Draw creatures with animation offsets
  // Enemy may be partially faded during cage animation
  if (cageEffects.enemyOpacity > 0.5) {
    renderEnemyCreature(state.enemyCreature, enemyX);
  } else if (cageEffects.enemyOpacity > 0) {
    // During cage animation, draw faded enemy (using darker color)
    renderEnemyCreatureFaded(state.enemyCreature, enemyX);
  }
  renderPlayerCreature(state.playerCreature, playerX);

  // Draw cage animation
  if (cageEffects.cageVisible) {
    renderCage(cageEffects.cageX, cageEffects.cageY, cageEffects.cageRotation);
  }

  // Draw screen flash for special attacks
  if (attackEffects.screenFlash > 0) {
    fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, 3);  // White flash
  }

  // Draw info boxes
  renderEnemyInfo(state.enemyCreature, state.animatingHp.enemy);
  renderPlayerInfo(state.playerCreature, state.animatingHp.player);

  // Draw text box
  renderTextBox();

  // Draw content based on phase
  switch (state.phase) {
    case 'intro':
    case 'message':
    case 'executing':
    case 'animating':
    case 'victory':
    case 'defeat':
      renderMessage();
      break;
    case 'select-action':
      renderActionMenu(state.menuIndex);
      break;
    case 'select-move':
      renderMoveMenu(state.playerCreature, state.moveMenuIndex);
      break;
  }
}

function renderBattleBackground(): void {
  // Simple platform lines for the battle arena
  // Enemy platform (top right)
  fillRect(100, 48, 56, 2, 1);
  // Player platform (bottom left)
  fillRect(4, 80, 56, 2, 1);
}

function renderEnemyCreature(creature: CreatureInstance, offsetX: number = 0): void {
  // Enemy sprite (front view) - top left area
  drawCreatureSprite(
    creature.species.id,
    BATTLE_UI.ENEMY_SPRITE_X + offsetX,
    BATTLE_UI.ENEMY_SPRITE_Y,
    true // front view
  );
}

function renderEnemyCreatureFaded(_creature: CreatureInstance, _offsetX: number = 0): void {
  // Draw enemy sprite faded (during cage capture) - simplified by skipping render
  // In a full implementation this would use alpha blending
  // For now we just don't draw anything when faded
}

// Cage sprite - 8x8 pixel art cage
const CAGE_SPRITE = [
  '..####..',
  '.#....#.',
  '#.####.#',
  '#.#..#.#',
  '#.#..#.#',
  '#.####.#',
  '.#....#.',
  '..####..',
];

function renderCage(x: number, y: number, rotation: number): void {
  // Apply rotation offset for shaking effect
  const shakeX = Math.sin(rotation) * 2;

  // Draw the cage sprite
  for (let row = 0; row < CAGE_SPRITE.length; row++) {
    for (let col = 0; col < CAGE_SPRITE[row].length; col++) {
      if (CAGE_SPRITE[row][col] === '#') {
        // Draw cage bars in dark color
        setPixel(Math.floor(x + col + shakeX), Math.floor(y + row), 1);
      }
    }
  }
}

function renderPlayerCreature(creature: CreatureInstance, offsetX: number = 0): void {
  // Player sprite (back view) - bottom right area
  drawCreatureSprite(
    creature.species.id,
    BATTLE_UI.PLAYER_SPRITE_X + offsetX,
    BATTLE_UI.PLAYER_SPRITE_Y,
    false // back view
  );
}

function renderEnemyInfo(creature: CreatureInstance, animatingHp: number): void {
  const x = BATTLE_UI.ENEMY_INFO_X;
  const y = BATTLE_UI.ENEMY_INFO_Y;
  const boxWidth = 72; // usable width inside box

  // Draw info box background
  drawBox(x - 2, y - 2, 76, 28);

  // Name (truncate if needed)
  const name = (creature.nickname || creature.species.name).substring(0, 6);
  drawText(name, x, y);

  // Level (right-aligned within box)
  const lvlText = `L${creature.level}`;
  drawTextRightAligned(lvlText, x, boxWidth, y);

  // HP label and bar
  const hpBarY = y + 12;
  drawText('HP', x, hpBarY);
  renderHpBar(x + 20, hpBarY, animatingHp, creature.maxHp);
}

function renderPlayerInfo(creature: CreatureInstance, animatingHp: number): void {
  const x = BATTLE_UI.PLAYER_INFO_X;
  const y = BATTLE_UI.PLAYER_INFO_Y;
  const boxWidth = 68; // usable width inside box

  // Draw info box background
  drawBox(x - 2, y - 2, 72, 38);

  // Name (truncate if needed)
  const name = (creature.nickname || creature.species.name).substring(0, 6);
  drawText(name, x, y);

  // Level (right-aligned within box)
  const lvlText = `L${creature.level}`;
  drawTextRightAligned(lvlText, x, boxWidth, y);

  // HP label and bar
  const hpBarY = y + 12;
  drawText('HP', x, hpBarY);
  renderHpBar(x + 20, hpBarY, animatingHp, creature.maxHp);

  // Numeric HP (player only, right-aligned with HP bar)
  const hpText = `${Math.floor(animatingHp)}/${creature.maxHp}`;
  drawTextRightAligned(hpText, x + 20, BATTLE_UI.HP_BAR_WIDTH, hpBarY + 10);
}

function renderHpBar(x: number, y: number, currentHp: number, maxHp: number): void {
  const width = BATTLE_UI.HP_BAR_WIDTH;
  const height = BATTLE_UI.HP_BAR_HEIGHT;

  // Background (empty bar)
  fillRect(x, y, width, height, 0);

  // Calculate fill
  const fillWidth = Math.floor((currentHp / maxHp) * (width - 2));

  // HP fill color based on percentage
  const hpPercent = currentHp / maxHp;
  let colorIndex = 2; // Light green (good)
  if (hpPercent < 0.2) {
    colorIndex = 0; // Black (critical) - would be red normally
  } else if (hpPercent < 0.5) {
    colorIndex = 1; // Dark (warning) - would be yellow normally
  }

  // Fill bar
  if (fillWidth > 0) {
    fillRect(x + 1, y + 1, fillWidth, height - 2, colorIndex);
  }
}

function renderTextBox(): void {
  drawBox(0, BATTLE_UI.TEXT_BOX_Y, SCREEN_WIDTH, BATTLE_UI.TEXT_BOX_HEIGHT);
}

function renderMessage(): void {
  // Draw the typewriter text
  drawTypewriter();

  // Draw continuation arrow if message is complete
  if (isTypewriterComplete()) {
    const arrowX = SCREEN_WIDTH - 16;
    const arrowY = SCREEN_HEIGHT - 12;
    // Simple down arrow
    drawText('>', arrowX, arrowY);
  }
}

function renderActionMenu(selectedIndex: number): void {
  // Menu takes ~60% of width (right side)
  const menuX = 50;
  const menuY = BATTLE_UI.TEXT_BOX_Y;
  const menuWidth = SCREEN_WIDTH - menuX;
  const menuHeight = BATTLE_UI.TEXT_BOX_HEIGHT;

  drawBox(menuX, menuY, menuWidth, menuHeight);

  // 2x2 grid layout:
  // FIGHT  BAG
  // SHARKS RUN
  const leftPadding = 12;
  const topPadding = 10;
  const secondLeftPadding = 70;
  const positions = [
    { x: menuX + leftPadding, y: menuY + topPadding },  // FIGHT (0) - top left
    { x: menuX + secondLeftPadding, y: menuY + topPadding },  // BAG (1) - top right
    { x: menuX + leftPadding, y: menuY + 26 },  // SHARKS (2) - bottom left
    { x: menuX + secondLeftPadding, y: menuY + 26 },  // RUN (3) - bottom right
  ];

  for (let i = 0; i < MENU_ITEMS.length; i++) {
    const pos = positions[i];

    // Draw selector arrow
    if (i === selectedIndex) {
      drawText('>', pos.x - 8, pos.y);
    }

    drawText(MENU_ITEMS[i], pos.x, pos.y);
  }
}

function renderMoveMenu(creature: CreatureInstance, selectedIndex: number): void {
  // Layout: Single column move list on left, compact info on right
  // Text box: y=96, height=48, width=160
  const boxY = BATTLE_UI.TEXT_BOX_Y;

  // Moves list - single column, 10 chars max for names
  const movesX = 6;
  const movesY = boxY + 6;
  const lineHeight = 10;

  for (let i = 0; i < creature.moves.length && i < 4; i++) {
    const move = creature.moves[i];
    const y = movesY + i * lineHeight;

    // Selector arrow
    if (i === selectedIndex) {
      drawText('>', movesX, y);
    }

    // Move name - allow up to 10 chars (80px)
    const displayName = move.move.name.length > 10
      ? move.move.name.substring(0, 9) + '.'
      : move.move.name;
    drawText(displayName, movesX + 10, y);
  }

  // Info box on right - compact layout
  const selectedMove = creature.moves[selectedIndex];
  if (selectedMove) {
    const infoX = 100;
    const infoY = boxY + 4;
    drawBox(infoX, infoY, 56, 40);

    // Type on top line
    const typeDisplay = selectedMove.move.type.toUpperCase();
    const truncType = typeDisplay.length > 6 ? typeDisplay.substring(0, 5) + '.' : typeDisplay;
    drawText(truncType, infoX + 4, infoY + 6);

    // PP label and value
    drawText('PP', infoX + 4, infoY + 18);
    const ppText = `${selectedMove.currentPp}/${selectedMove.move.pp}`;
    drawText(ppText, infoX + 4, infoY + 28);
  }
}

export function setMessage(message: string, shortWidth: boolean = false): void {
  // Use shorter width when action menu is visible (leaves room for menu on right)
  const maxWidth = shortWidth ? 72 : SCREEN_WIDTH - 16;
  startTypewriter(message, 8, BATTLE_UI.TEXT_BOX_Y + 8, maxWidth);
}
