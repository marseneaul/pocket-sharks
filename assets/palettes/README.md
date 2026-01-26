# Pocket Sharks Color Palette

Game Boy DMG-style 4-color palette used for all sprites.

## Colors

| Index | Name  | Hex     | RGB           | Usage in Sprites |
|-------|-------|---------|---------------|------------------|
| 0     | Black | #0f0f0f | 15, 15, 15    | Outlines, eyes, dark details |
| 1     | Dark  | #555555 | 85, 85, 85    | Body shading, darker areas |
| 2     | Light | #aaaaaa | 170, 170, 170 | Main body, lighter areas |
| 3     | White | #f0f0f0 | 240, 240, 240 | Highlights, underbelly |

## Sprite Format

Sprites are 32x32 pixels using ASCII art encoding:
- `.` = Transparent
- `#` = Black (index 0)
- `@` = Dark gray (index 1)
- `o` = Light gray (index 2)
- `O` = White (index 3, rendered same as light on GB)

## Files

- `pocket-sharks-dmg.gpl` - GIMP palette format
- `pocket-sharks-dmg.pal` - JASC/Paint Shop Pro format (works in Aseprite)
- `pocket-sharks-dmg.hex` - Simple hex color list

## How to Use in Aseprite

1. Open Aseprite
2. Go to **Sprite > Color Mode > Indexed**
3. Go to **Palette > Load Palette**
4. Select `pocket-sharks-dmg.pal`
5. Draw your sprite using only these 4 colors

## How to Use in GIMP

1. Open GIMP
2. Go to **Windows > Dockable Dialogs > Palettes**
3. Right-click > **Import Palette**
4. Select `pocket-sharks-dmg.gpl`
5. Convert image: **Image > Mode > Indexed** > Use custom palette

## Conversion Workflow

1. Import source image (photo/illustration)
2. Scale to 32x32 (nearest neighbor)
3. Convert to indexed color using this palette
4. Manual cleanup to improve readability
5. Export or copy to ASCII format for `sprites.ts`
