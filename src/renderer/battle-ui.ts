import { SCREEN_WIDTH, SCREEN_HEIGHT, BATTLE_UI } from '../constants.ts';
import { clear, fillRect, drawBox } from './canvas.ts';
import { drawText, drawTextRightAligned, drawTypewriter, startTypewriter, isTypewriterComplete } from './text.ts';
import { drawCreatureSprite } from './sprites.ts';
import { getEntryAnimationOffsets, getAttackAnimationEffects } from '../engine/battle.ts';
import type { BattleState, CreatureInstance } from '../types/index.ts';

const MENU_ITEMS = ['FIGHT', 'BAG', 'SHARKS', 'RUN'];

export function renderBattle(state: BattleState): void {
  clear();

  // Draw battle scene background (simple for now)
  renderBattleBackground();

  // Get animation offsets
  const entryOffsets = getEntryAnimationOffsets(state);
  const attackEffects = getAttackAnimationEffects(state);

  // Combine offsets
  const enemyX = entryOffsets.enemyX + attackEffects.enemyOffsetX + attackEffects.enemyShake;
  const playerX = entryOffsets.playerX + attackEffects.playerOffsetX + attackEffects.playerShake;

  // Draw creatures with animation offsets
  renderEnemyCreature(state.enemyCreature, enemyX);
  renderPlayerCreature(state.playerCreature, playerX);

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
  const positions = [
    { x: menuX + 12, y: menuY + 10 },  // FIGHT (0) - top left
    { x: menuX + 66, y: menuY + 10 },  // BAG (1) - top right
    { x: menuX + 12, y: menuY + 26 },  // SHARKS (2) - bottom left
    { x: menuX + 66, y: menuY + 26 },  // RUN (3) - bottom right
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
  // Layout: moves list on left (2 columns), info box on right
  // Text box: y=96, height=48, full width=160
  const boxY = BATTLE_UI.TEXT_BOX_Y;

  // Info box on right side (shows PP and type for selected move)
  const infoBoxWidth = 56;
  const infoBoxX = SCREEN_WIDTH - infoBoxWidth - 4;  // x=100
  const infoBoxY = boxY + 4;
  const infoBoxHeight = 40;

  drawBox(infoBoxX, infoBoxY, infoBoxWidth, infoBoxHeight);

  const selectedMove = creature.moves[selectedIndex];
  if (selectedMove) {
    // PP display - use 2 lines for clarity
    drawText('PP', infoBoxX + 4, infoBoxY + 6);
    const ppText = `${selectedMove.currentPp}/${selectedMove.move.pp}`;
    drawText(ppText, infoBoxX + 4, infoBoxY + 16);

    // Type display
    const typeDisplay = selectedMove.move.type.toUpperCase().substring(0, 6);
    drawText(typeDisplay, infoBoxX + 4, infoBoxY + 28);
  }

  // Moves list - fits in remaining space (x=0 to x=96)
  // 2x2 grid like action menu for up to 4 moves
  const movesStartX = 8;
  const movesStartY = boxY + 8;
  const colWidth = 44;  // Each move column is ~5 chars + arrow
  const rowHeight = 18;

  for (let i = 0; i < creature.moves.length && i < 4; i++) {
    const move = creature.moves[i];
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = movesStartX + col * colWidth;
    const y = movesStartY + row * rowHeight;

    // Selector arrow
    if (i === selectedIndex) {
      drawText('>', x, y);
    }

    // Move name - truncate to 4 chars to fit 2-column layout
    const displayName = move.move.name.substring(0, 4);
    drawText(displayName, x + 8, y);
  }
}

export function setMessage(message: string, shortWidth: boolean = false): void {
  // Use shorter width when action menu is visible (leaves room for menu on right)
  const maxWidth = shortWidth ? 72 : SCREEN_WIDTH - 16;
  startTypewriter(message, 8, BATTLE_UI.TEXT_BOX_Y + 8, maxWidth);
}
