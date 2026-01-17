import sys
from pathlib import Path
from PIL import Image, ImageOps

# Default directories
IN_DIR = Path("assets/references")
OUT_DIR = Path("output_ascii")

SIZE = (48, 48)

# Transparency cutoff: pixels with alpha below this become '.'
ALPHA_CUTOFF = 32  # 0-255

# Auto-crop to content before resizing (fills frame better)
AUTO_CROP = True

# Padding after crop (pixels on each side, before resize)
CROP_PADDING = 2

# Horizontal stretch factor (1.0 = normal, 1.5 = 50% wider source area)
# Values > 1 make the shark wider by sampling more horizontal pixels
HORIZONTAL_STRETCH = 1.0

# Rotation in degrees (counter-clockwise). Use to straighten diagonal sharks
ROTATION = 0

# Margin: pixels of transparent padding around the sprite (prevents edge clipping)
MARGIN = 2

# Choose one:
USE_ADAPTIVE_THRESHOLDS = True

# Fixed thresholds (0..255 luma). Used if USE_ADAPTIVE_THRESHOLDS = False
T0, T1, T2 = 64, 128, 192

# Character mapping by tone index (dark -> light)
TONES = ['#', '@', 'o', 'O']  # indices 0..3


def luma_from_rgb(r, g, b):
    # Perceptual luma (close to Rec. 709)
    return int(0.2126 * r + 0.7152 * g + 0.0722 * b)


def adaptive_thresholds(lumas):
    """
    Compute 3 thresholds that split the sprite into 4 buckets.
    Uses quartiles of non-transparent pixels to keep contrast.
    """
    if not lumas:
        return 64, 128, 192
    s = sorted(lumas)
    def q(p):
        idx = int(p * (len(s) - 1))
        return s[idx]
    t0 = q(0.25)
    t1 = q(0.50)
    t2 = q(0.75)

    # Guard against flat images (thresholds collapsing)
    if t0 == t1 == t2:
        # Spread them a bit around the median
        mid = t1
        t0 = max(0, mid - 32)
        t2 = min(255, mid + 32)
    elif t0 == t1:
        t1 = min(255, t1 + 16)
    elif t1 == t2:
        t1 = max(0, t1 - 16)

    return t0, t1, t2


def tone_index(l, t0, t1, t2):
    if l < t0: return 0
    if l < t1: return 1
    if l < t2: return 2
    return 3


def auto_crop_to_content(im: Image.Image) -> Image.Image:
    """Crop image to bounding box of non-transparent pixels"""
    px = im.load()
    w, h = im.size

    # Find bounding box of non-transparent pixels
    min_x, min_y = w, h
    max_x, max_y = 0, 0

    for y in range(h):
        for x in range(w):
            if px[x, y][3] >= ALPHA_CUTOFF:  # alpha channel
                min_x = min(min_x, x)
                min_y = min(min_y, y)
                max_x = max(max_x, x)
                max_y = max(max_y, y)

    if max_x < min_x:  # No content found
        return im

    # Add padding
    min_x = max(0, min_x - CROP_PADDING)
    min_y = max(0, min_y - CROP_PADDING)
    max_x = min(w - 1, max_x + CROP_PADDING)
    max_y = min(h - 1, max_y + CROP_PADDING)

    return im.crop((min_x, min_y, max_x + 1, max_y + 1))


def convert_image_to_ascii(path: Path, h_stretch: float = None, rotation: float = None, margin: int = None) -> str:
    if h_stretch is None:
        h_stretch = HORIZONTAL_STRETCH
    if rotation is None:
        rotation = ROTATION
    if margin is None:
        margin = MARGIN

    im = Image.open(path).convert("RGBA")

    # Rotate if needed (before cropping to avoid cutting off rotated content)
    if rotation != 0:
        im = im.rotate(rotation, resample=Image.Resampling.BICUBIC, expand=True)

    # Auto-crop to content before resizing
    if AUTO_CROP:
        im = auto_crop_to_content(im)

    # Calculate the inner size (accounting for margin)
    inner_w = SIZE[0] - 2 * margin
    inner_h = SIZE[1] - 2 * margin

    # Scale to fit within inner size, respecting aspect ratio and stretch
    w, h = im.size
    aspect = (w * h_stretch) / h

    if aspect > inner_w / inner_h:
        # Width-constrained
        new_w = inner_w
        new_h = int(inner_w / aspect)
    else:
        # Height-constrained
        new_h = inner_h
        new_w = int(inner_h * aspect)

    im = im.resize((new_w, new_h), resample=Image.Resampling.LANCZOS)

    # Paste onto 32x32 canvas, centered
    canvas = Image.new('RGBA', SIZE, (0, 0, 0, 0))
    offset_x = (SIZE[0] - new_w) // 2
    offset_y = (SIZE[1] - new_h) // 2
    canvas.paste(im, (offset_x, offset_y))
    im = canvas

    # Optional: if you want a punchier Game Boy look, uncomment:
    # im = ImageOps.autocontrast(im, cutoff=2)

    px = im.load()

    # Collect lumas of non-transparent pixels for adaptive thresholds
    lumas = []
    for y in range(SIZE[1]):
        for x in range(SIZE[0]):
            r, g, b, a = px[x, y]
            if a >= ALPHA_CUTOFF:
                lumas.append(luma_from_rgb(r, g, b))

    if USE_ADAPTIVE_THRESHOLDS:
        t0, t1, t2 = adaptive_thresholds(lumas)
    else:
        t0, t1, t2 = T0, T1, T2

    lines = []
    for y in range(SIZE[1]):
        row = []
        for x in range(SIZE[0]):
            r, g, b, a = px[x, y]
            if a < ALPHA_CUTOFF:
                row.append('.')
            else:
                l = luma_from_rgb(r, g, b)
                idx = tone_index(l, t0, t1, t2)
                row.append(TONES[idx])
        lines.append("".join(row))

    return "\n".join(lines)


def format_for_typescript(ascii_sprite: str, name: str = "sprite") -> str:
    """Format the ASCII sprite as a TypeScript array for sprites.ts"""
    lines = ascii_sprite.split('\n')
    result = f"// {name}\n[\n"
    for line in lines:
        result += f"  '{line}',\n"
    result += "]"
    return result


def main():
    # Handle command line arguments
    # Usage: python3 webp_to_ascii.py [file.webp] [--stretch=1.5] [--rotate=30] [--margin=2] [--size=48]
    global SIZE
    h_stretch = HORIZONTAL_STRETCH
    rotation = ROTATION
    margin = MARGIN
    files = []

    for arg in sys.argv[1:]:
        if arg.startswith('--stretch='):
            h_stretch = float(arg.split('=')[1])
        elif arg.startswith('-s') and arg[2:3].isdigit():
            h_stretch = float(arg[2:])
        elif arg.startswith('--rotate='):
            rotation = float(arg.split('=')[1])
        elif arg.startswith('-r') and arg[2:3].lstrip('-').isdigit():
            rotation = float(arg[2:])
        elif arg.startswith('--margin='):
            margin = int(arg.split('=')[1])
        elif arg.startswith('-m') and arg[2:3].isdigit():
            margin = int(arg[2:])
        elif arg.startswith('--size='):
            size = int(arg.split('=')[1])
            SIZE = (size, size)
        else:
            files.append(arg)

    if files:
        # Process specific file(s)
        for arg in files:
            p = Path(arg)
            if not p.exists():
                print(f"Error: File not found: {p}")
                continue
            print(f"\n=== {p.name} (stretch={h_stretch}, rotate={rotation}, margin={margin}) ===\n")
            ascii_sprite = convert_image_to_ascii(p, h_stretch, rotation, margin)
            print(ascii_sprite)
            print(f"\n=== TypeScript format ===\n")
            print(format_for_typescript(ascii_sprite, p.stem))
    else:
        # Process all webp files in IN_DIR
        OUT_DIR.mkdir(parents=True, exist_ok=True)
        found = False
        for p in IN_DIR.glob("*.webp"):
            found = True
            ascii_sprite = convert_image_to_ascii(p)
            out_path = OUT_DIR / f"{p.stem}.txt"
            out_path.write_text(ascii_sprite + "\n", encoding="utf-8")
            print(f"Converted: {p.name} -> {out_path}")
        if not found:
            print(f"No .webp files found in {IN_DIR.resolve()}")
        else:
            print(f"Done. Wrote sprites to: {OUT_DIR.resolve()}")


if __name__ == "__main__":
    main()
