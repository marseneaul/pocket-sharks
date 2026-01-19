import sys
from pathlib import Path
from PIL import Image, ImageOps

# Default directories
IN_DIR = Path("assets/references")
OUT_DIR = Path("output_ascii")

SIZE = (64, 64)

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

# Number of colors/tones (excluding transparent)
# GBC sprites: 4 colors per palette, 1 transparent = 3 visible
NUM_COLORS = 4

# Fixed thresholds (0..255 luma). Used if USE_ADAPTIVE_THRESHOLDS = False
# These are generated based on NUM_COLORS if not manually set
FIXED_THRESHOLDS = None  # Set to list like [51, 102, 153, 204] for 5 colors

# Character mapping by tone index (dark -> light)
# Must have exactly NUM_COLORS characters
TONES_5 = ['#', '@', 'x', 'o', 'O']  # 5 colors: black, dark, medium, light, white
TONES_4 = ['#', '@', 'o', 'O']       # 4 colors: black, dark, light, white
TONES_3 = ['#', '@', 'O']            # 3 colors: black, gray, white

def get_tones(num_colors):
    """Get the appropriate tone characters for the given number of colors"""
    if num_colors == 5:
        return TONES_5
    elif num_colors == 4:
        return TONES_4
    elif num_colors == 3:
        return TONES_3
    else:
        # Generate a generic set
        chars = '#@x+oO'
        step = max(1, len(chars) // num_colors)
        return [chars[min(i * step, len(chars) - 1)] for i in range(num_colors)]


def luma_from_rgb(r, g, b):
    # Perceptual luma (close to Rec. 709)
    return int(0.2126 * r + 0.7152 * g + 0.0722 * b)


def adaptive_thresholds(lumas, num_colors):
    """
    Compute thresholds that split the sprite into num_colors buckets.
    Uses quantiles of non-transparent pixels to keep contrast.
    Returns a list of (num_colors - 1) thresholds.
    """
    num_thresholds = num_colors - 1

    if not lumas:
        # Return evenly spaced thresholds
        step = 256 // num_colors
        return [step * (i + 1) for i in range(num_thresholds)]

    s = sorted(lumas)

    def q(p):
        idx = int(p * (len(s) - 1))
        return s[idx]

    # Compute quantile-based thresholds
    thresholds = []
    for i in range(num_thresholds):
        percentile = (i + 1) / num_colors
        thresholds.append(q(percentile))

    # Guard against flat images (thresholds collapsing)
    # Ensure minimum spacing between thresholds
    min_spacing = 16
    for i in range(len(thresholds) - 1):
        if thresholds[i + 1] <= thresholds[i]:
            thresholds[i + 1] = min(255, thresholds[i] + min_spacing)

    return thresholds


def get_fixed_thresholds(num_colors):
    """Generate evenly spaced thresholds for fixed mode"""
    if FIXED_THRESHOLDS is not None:
        return FIXED_THRESHOLDS
    num_thresholds = num_colors - 1
    step = 256 // num_colors
    return [step * (i + 1) for i in range(num_thresholds)]


def tone_index(luma, thresholds):
    """Return the tone index for a given luma value based on thresholds list"""
    for i, t in enumerate(thresholds):
        if luma < t:
            return i
    return len(thresholds)


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


def convert_image_to_ascii(path: Path, h_stretch: float = None, rotation: float = None, margin: int = None, num_colors: int = None) -> str:
    if h_stretch is None:
        h_stretch = HORIZONTAL_STRETCH
    if rotation is None:
        rotation = ROTATION
    if margin is None:
        margin = MARGIN
    if num_colors is None:
        num_colors = NUM_COLORS

    tones = get_tones(num_colors)

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

    # Paste onto canvas, centered
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
        thresholds = adaptive_thresholds(lumas, num_colors)
    else:
        thresholds = get_fixed_thresholds(num_colors)

    lines = []
    for y in range(SIZE[1]):
        row = []
        for x in range(SIZE[0]):
            r, g, b, a = px[x, y]
            if a < ALPHA_CUTOFF:
                row.append('.')
            else:
                l = luma_from_rgb(r, g, b)
                idx = tone_index(l, thresholds)
                row.append(tones[idx])
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
    # Usage: python3 webp_to_ascii.py [file.webp] [--stretch=1.5] [--rotate=30] [--margin=2] [--size=56] [--colors=5]
    global SIZE
    h_stretch = HORIZONTAL_STRETCH
    rotation = ROTATION
    margin = MARGIN
    num_colors = NUM_COLORS
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
        elif arg.startswith('--colors='):
            num_colors = int(arg.split('=')[1])
        elif arg.startswith('-c') and arg[2:3].isdigit():
            num_colors = int(arg[2:])
        else:
            files.append(arg)

    if files:
        # Process specific file(s)
        for arg in files:
            p = Path(arg)
            if not p.exists():
                print(f"Error: File not found: {p}")
                continue
            print(f"\n=== {p.name} (stretch={h_stretch}, rotate={rotation}, margin={margin}, colors={num_colors}, size={SIZE[0]}x{SIZE[1]}) ===\n")
            ascii_sprite = convert_image_to_ascii(p, h_stretch, rotation, margin, num_colors)
            print(ascii_sprite)
            print(f"\n=== TypeScript format ===\n")
            print(format_for_typescript(ascii_sprite, p.stem))
    else:
        # Process all webp files in IN_DIR
        OUT_DIR.mkdir(parents=True, exist_ok=True)
        found = False
        for p in IN_DIR.glob("*.webp"):
            found = True
            ascii_sprite = convert_image_to_ascii(p, num_colors=num_colors)
            out_path = OUT_DIR / f"{p.stem}.txt"
            out_path.write_text(ascii_sprite + "\n", encoding="utf-8")
            print(f"Converted: {p.name} -> {out_path}")
        if not found:
            print(f"No .webp files found in {IN_DIR.resolve()}")
        else:
            print(f"Done. Wrote sprites to: {OUT_DIR.resolve()}")


if __name__ == "__main__":
    main()
