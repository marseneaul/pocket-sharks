#!/usr/bin/env python3
"""
Sprite Sheet Generator using Replicate API
Uses: Onodofthenorth/SD_PixelArt_SpriteSheet_Generator

Setup:
  pip install replicate pillow
  export REPLICATE_API_TOKEN=your_token_here

Usage:
  python scripts/generate_sprites.py "great white shark" --all-directions
  python scripts/generate_sprites.py "hammerhead shark, cute" --direction front
"""

import os
import sys
import argparse
import time
from pathlib import Path

try:
    import replicate
except ImportError:
    print("Please install replicate: pip install replicate")
    sys.exit(1)

try:
    from PIL import Image
    import requests
    from io import BytesIO
except ImportError:
    print("Please install pillow and requests: pip install pillow requests")
    sys.exit(1)

# Model version on Replicate
MODEL_VERSION = "cjwbw/sd_pixelart_spritesheet_generator:03e288270e5b93b235b18169d2678839b66500117e2b46b7f620389e1a96c002"

# Direction prompt prefixes
DIRECTIONS = {
    "front": "PixelartFSS",
    "back": "PixelartBSS",
    "left": "PixelartLSS",
    "right": "PixelartRSS",
}

def generate_sprite(
    description: str,
    direction: str = "front",
    width: int = 512,
    height: int = 512,
    steps: int = 50,
    guidance: float = 10.0,
    seed: int = None,
) -> str:
    """Generate a single sprite and return the output URL."""

    prefix = DIRECTIONS.get(direction, "PixelartFSS")
    prompt = f"{prefix}, {description}, pixel art, game sprite"

    print(f"Generating {direction} view: {prompt}")

    input_params = {
        "prompt": prompt,
        "width": width,
        "height": height,
        "num_outputs": 1,
        "num_inference_steps": steps,
        "guidance_scale": guidance,
    }

    if seed is not None:
        input_params["seed"] = seed

    output = replicate.run(MODEL_VERSION, input=input_params)

    # Output is a list of URLs
    if output and len(output) > 0:
        return output[0]
    return None


def download_image(url: str, output_path: Path) -> Image.Image:
    """Download image from URL and save it."""
    response = requests.get(url)
    response.raise_for_status()

    img = Image.open(BytesIO(response.content))
    img.save(output_path)
    print(f"Saved: {output_path}")
    return img


def create_spritesheet(images: dict[str, Image.Image], output_path: Path, scale: int = None):
    """Combine directional sprites into a single spritesheet."""

    if not images:
        return

    # Get dimensions from first image
    first_img = next(iter(images.values()))
    w, h = first_img.size

    # Scale down if requested
    if scale and scale < w:
        w, h = scale, scale
        images = {k: v.resize((w, h), Image.NEAREST) for k, v in images.items()}

    # Create spritesheet (4 columns: front, back, left, right)
    order = ["front", "back", "left", "right"]
    available = [d for d in order if d in images]

    sheet = Image.new("RGBA", (w * len(available), h))

    for i, direction in enumerate(available):
        sheet.paste(images[direction], (i * w, 0))

    sheet.save(output_path)
    print(f"Spritesheet saved: {output_path}")


def main():
    parser = argparse.ArgumentParser(description="Generate pixel art sprite sheets")
    parser.add_argument("description", help="Description of the creature/character")
    parser.add_argument("--direction", "-d", choices=list(DIRECTIONS.keys()),
                        default="front", help="Which direction to generate")
    parser.add_argument("--all-directions", "-a", action="store_true",
                        help="Generate all 4 directions")
    parser.add_argument("--output", "-o", default="sprites_output",
                        help="Output directory")
    parser.add_argument("--name", "-n", default=None,
                        help="Base filename (default: derived from description)")
    parser.add_argument("--width", type=int, default=512, choices=[128, 256, 512, 768])
    parser.add_argument("--height", type=int, default=512, choices=[128, 256, 512, 768])
    parser.add_argument("--steps", type=int, default=50, help="Inference steps (1-500)")
    parser.add_argument("--guidance", type=float, default=10.0, help="Guidance scale (1-20)")
    parser.add_argument("--seed", type=int, default=None, help="Random seed for reproducibility")
    parser.add_argument("--scale", type=int, default=None,
                        help="Scale output to this size (e.g., 32 for 32x32)")
    parser.add_argument("--spritesheet", "-s", action="store_true",
                        help="Combine into single spritesheet image")

    args = parser.parse_args()

    # Check for API token
    if not os.environ.get("REPLICATE_API_TOKEN"):
        print("Error: REPLICATE_API_TOKEN environment variable not set")
        print("Get your token at: https://replicate.com/account/api-tokens")
        sys.exit(1)

    # Setup output directory
    output_dir = Path(args.output)
    output_dir.mkdir(parents=True, exist_ok=True)

    # Generate filename base
    name_base = args.name or args.description.replace(" ", "_").replace(",", "")[:30]

    # Determine which directions to generate
    directions = list(DIRECTIONS.keys()) if args.all_directions else [args.direction]

    generated_images = {}

    for direction in directions:
        try:
            url = generate_sprite(
                description=args.description,
                direction=direction,
                width=args.width,
                height=args.height,
                steps=args.steps,
                guidance=args.guidance,
                seed=args.seed,
            )

            if url:
                output_path = output_dir / f"{name_base}_{direction}.png"
                img = download_image(url, output_path)
                generated_images[direction] = img
            else:
                print(f"Warning: No output for {direction}")

        except Exception as e:
            print(f"Error generating {direction}: {e}")

        # Small delay between requests
        if len(directions) > 1:
            time.sleep(1)

    # Create combined spritesheet if requested
    if args.spritesheet and len(generated_images) > 1:
        sheet_path = output_dir / f"{name_base}_spritesheet.png"
        create_spritesheet(generated_images, sheet_path, args.scale)

    print(f"\nDone! Generated {len(generated_images)} sprites in {output_dir}/")


if __name__ == "__main__":
    main()
