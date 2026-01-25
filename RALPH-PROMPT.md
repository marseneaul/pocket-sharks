# Shark Evolutions - Iterative Development

## Current State
You are working on a Pokemon-style shark game. Review `CLAUDE.md` for the full game design spec.

**Completed so far:**
- Creatures 1-78 with sprites (San Diego + Cabo regions)
- Maps: San Diego region (6 maps), Hawaii region (4 maps), Cabo region (4 maps)
- Basic game loop, battles, overworld working

**CRITICAL: Debug mode is out of date!**
- `src/renderer/debug-ui.ts` has `MAX_CREATURE_ID = 30` - needs to match highest creature ID
- `MAPS` array in debug-ui.ts is missing all new maps - must include ALL registered maps

## Your Task
Continue implementing the game according to CLAUDE.md spec. Each iteration:

1. **First, ensure debug mode is current:**
   - Update `MAX_CREATURE_ID` in debug-ui.ts to match the highest creature ID
   - Update `MAPS` array to include ALL map IDs from main.ts registrations

2. **Check what's missing** by comparing current state to spec

3. **Pick ONE focused task** from this priority order:
   - Add missing creatures for current regions (with sprites in sprites.ts)
   - Add maps for next region in order (Caribbean is next after Cabo)
   - Add gym leaders with proper teams matching CLAUDE.md
   - Add story elements (Team Finn encounters, NPCs)

4. **Implement it fully:**
   - Creatures need both front AND back sprites in sprites.ts
   - Maps need tiles, warps, NPCs, and encounter tables
   - Register new maps in main.ts
   - Update debug-ui.ts MAPS array with new map IDs

5. **Test by building**: Run `npm run build` to verify no errors

6. **Commit your work** with descriptive message

## Region Order (from CLAUDE.md)
1. San Diego (DONE)
2. Hawaii first visit (DONE)
3. Cabo/Baja (DONE - needs gym)
4. Caribbean/Florida (NEXT)
5. Hawaii return
6. Pacific Northwest
7. Europe
8. Cape Town
9. Asia/Australia
10. Roatan
11. Abyssal/Endgame

## Completion Criteria
When all 11 regions have maps, all gym leaders exist, creature count reaches 120+, and debug mode shows all content:

<promise>REGIONS COMPLETE</promise>

## Key Files
- `CLAUDE.md` - Full game design spec (READ THIS)
- `src/data/creatures.ts` - Creature definitions
- `src/renderer/sprites.ts` - Sprite data (64x64 ASCII art)
- `src/data/maps/` - Map files
- `src/main.ts` - Map registration
- `src/renderer/debug-ui.ts` - Debug mode (KEEP UPDATED!)

## Sprite Format
```typescript
{
  front: string[],  // 64 lines of 64 chars each
  back: string[]    // 64 lines of 64 chars each
}
// Characters: . (transparent), @ (dark), o (mid), O (light), # (outline)
```

## Map Format
```typescript
export const MAP_NAME: MapData = {
  id: 'map-id',           // Used in MAPS array and warps
  name: 'Display Name',
  width: 20, height: 18,  // Standard size
  tiles: number[][],
  warps: Warp[],
  npcs: NPC[],
  encounterTable: Encounter[],
  isOutdoor: boolean
};
```
