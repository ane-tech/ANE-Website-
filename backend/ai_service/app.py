from fastapi import FastAPI, UploadFile, File, Request
import uuid
import subprocess
import os
import shutil

app = FastAPI()

INPUT_DIR = "inputs"
OUTPUT_DIR = "outputs"

os.makedirs(INPUT_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

@app.get("/")
async def root():
    return {"message": "AI Service is Up"}

@app.post("/generate-3d")
@app.post("/generate-3d/")
async def generate_3d(image: UploadFile = File(...)):
    print(f"Received generation request for: {image.filename}")
    job_id = str(uuid.uuid4())
    current_dir = os.path.dirname(os.path.abspath(__file__))
    input_path = os.path.join(current_dir, INPUT_DIR, f"{job_id}.png")
    output_folder = os.path.join(current_dir, OUTPUT_DIR, job_id)
    
    os.makedirs(os.path.dirname(input_path), exist_ok=True)

    with open(input_path, "wb") as f:
        shutil.copyfileobj(image.file, f)

    try:
        print(f"Running TripoSR for Job ID: {job_id}...")
        subprocess.run(
            ["python", "run_triposr.py", input_path, job_id],
            check=True,
            cwd=current_dir
        )
        
        model_path = os.path.join(output_folder, "mesh.obj")
        print(f"Generation successful. Model path: {model_path}")
        
        return {
            "status": "success",
            "model_path": model_path
        }
    except Exception as e:
        print(f"Error: {str(e)}")
        return {"status": "error", "message": str(e)}
