# ANE AI 3D Engine (based on TripoSR)

This service provides Image-to-3D generation capabilities for the ANE website.

## Prerequisites

- **Python 3.10 to 3.14**
- **Recommended RAM**: 8GB+ (Service is optimized with chunked processing)
- **GPU (Optional)**: If you have an NVIDIA GPU with CUDA, the service will run significantly faster.

## Installation

1. Navigate to the AI service directory:
   ```bash
   cd backend/ai_service
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Special Patches (Applied automatically):
   - The engine uses `scikit-image` for marching cubes to avoid C++ compilation issues on Windows.
   - Background removal is disabled in Python 3.14 due to library incompatibilities (upload images with clear backgrounds for best results).

## Running the Engine

Start the Uvicorn server on port 8001:

```bash
python -m uvicorn app:app --host 127.0.0.1 --port 8001
```

The first time you run a generation, the engine will download approximately **1.7GB** of neural network weights. This only happens once.

## Integration

The Node.js backend communicates with this service via `POST http://127.0.0.1:8001/generate-3d`. 
The results (OBJ meshes) are stored in the `outputs/` folder.
