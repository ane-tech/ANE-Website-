from fastapi import FastAPI, UploadFile, File
import uuid
import subprocess
import os
import shutil

app = FastAPI()

INPUT_DIR = "inputs"
OUTPUT_DIR = "outputs"

os.makedirs(INPUT_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

@app.post("/generate")
async def generate_3d(file: UploadFile = File(...)):
    job_id = str(uuid.uuid4())
    input_path = f"{INPUT_DIR}/{job_id}.png"

    with open(input_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    subprocess.run(
        ["python", "run_triposr.py", input_path, job_id],
        check=True
    )

    return {
        "job_id": job_id,
        "model_url": f"/outputs/{job_id}/mesh.obj"
    }
