import sys
import os
from tsr.system import TSR
from PIL import Image
import torch

image_path = sys.argv[1]
job_id = sys.argv[2]

output_dir = f"outputs/{job_id}"
os.makedirs(output_dir, exist_ok=True)

device = "cuda" if torch.cuda.is_available() else "cpu"

model = TSR.from_pretrained("stabilityai/TripoSR")
model.to(device)

image = Image.open(image_path).convert("RGB")

with torch.no_grad():
    scene = model([image], device=device)

mesh = model.extract_mesh(scene, True)[0]
mesh.export(f"{output_dir}/mesh.obj")
