import sys
import os
import torch
import traceback
from PIL import Image

try:
    from tsr.system import TSR
except Exception:
    print("Error importing TSR:")
    traceback.print_exc()
    sys.exit(1)

try:
    image_path = sys.argv[1]
    job_id = sys.argv[2]

    output_dir = os.path.join("outputs", job_id)
    os.makedirs(output_dir, exist_ok=True)

    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"Using device: {device}")

    print("Loading model...")
    # These are the default filenames for TripoSR on HF
    model = TSR.from_pretrained(
        "stabilityai/TripoSR", 
        config_name="config.yaml", 
        weight_name="model.ckpt"
    )
    model.to(device)
    
    # Enable chunking to save memory (CRITICAL for CPU/Limited RAM)
    if hasattr(model.renderer, 'set_chunk_size'):
        model.renderer.set_chunk_size(8192)

    print(f"Processing image: {image_path}")
    image = Image.open(image_path).convert("RGB")

    print("Generating scene...")
    with torch.no_grad():
        scene = model([image], device=device)

    print("Extracting mesh...")
    mesh = model.extract_mesh(scene, True, resolution=128)[0]
    
    output_path = os.path.join(output_dir, "mesh.obj")
    mesh.export(output_path)
    print(f"Mesh saved to {output_path}")

except Exception:
    print("An error occurred during generation:")
    traceback.print_exc()
    sys.exit(1)
