#!/usr/bin/env python3
"""Generate a single SDXL image given a prompt, print absolute path."""
import sys, uuid, torch
from pathlib import Path
from diffusers import StableDiffusionPipeline
DEVICE="cpu"

def main():
    if len(sys.argv) < 2:
        print("Usage: generate_image.py <prompt>", file=sys.stderr)
        sys.exit(1)

    prompt = sys.argv[1]
    out_dir = Path(__file__).parent / "generated"
    out_dir.mkdir(exist_ok=True)
    out_file = out_dir / f"{uuid.uuid4().hex}.png"

    pipe = StableDiffusionPipeline.from_pretrained(
        "stabilityai/stable-diffusion-2-1-base", torch_dtype=torch.float32
    ).to(DEVICE)

    generator = torch.Generator(device=DEVICE).manual_seed(1127)
    image = pipe(prompt, generator=generator, num_inference_steps=10, height=512, width=512).images[0]
    image.save(out_file)
    print(out_file.resolve())

if __name__ == "__main__":
    main()