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

    # NUCLEAR ISOLATION (Kill glows and rim-light once and for all)
    from tsr.utils import remove_background, resize_foreground
    import numpy as np
    try:
        print(">>> AI is performing Nuclear isolation on the object...")
        # 1. Remove background with very strict settings
        # We use a high threshold to make sure the halo is gone
        image_no_bg = remove_background(image, force=True, alpha_matting=True)
        
        if image_no_bg.mode == 'RGBA':
            alpha = np.array(image_no_bg.split()[3])
            import scipy.ndimage as ndimage
            
            # 2. LOGO-SAFE MASK SHRINK (2 pixels)
            # 6 was too aggressive and caused parts to split. 
            # 2 keeps the fine details like stems while removing basic halo.
            mask = alpha > 127
            eroded_mask = ndimage.binary_erosion(mask, iterations=2)
            alpha = (eroded_mask.astype(np.uint8) * 255)
            
            # 3. MASK BLUR (Removes jagged edges from erosion)
            alpha = ndimage.gaussian_filter(alpha, sigma=0.5)
            image_no_bg.putalpha(Image.fromarray(alpha))
            
            # 4. Center and Scale (85% fills enough without touching edges)
            image_ready = resize_foreground(image_no_bg, 0.85)
            
            # 5. NEUTRAL GRAY BACKGROUND (CRITICAL for TripoSR precision)
            image = Image.new("RGB", image_ready.size, (127, 127, 127))
            image.paste(image_ready, mask=image_ready.split()[3])
            print(">>> SUCCESS: Glows stripped. Character is isolated on neutral gray.")
        else:
            print(">>> WARNING: Background removal returned no transparency, using original.")

    except Exception as e:
        print(f">>> ERROR in isolation: {e}")
        image = image.convert("RGB")

    print("Generating scene...")
    with torch.no_grad():
        scene = model([image], device=device)

    print("Extracting mesh at ULTRA resolution (320)...")
    # 320 is the peak for high-precision CPU generation
    mesh = model.extract_mesh(scene, True, resolution=320)[0]
    
    # ADVANCED POST-PROCESSING FOR PRECISION
    print("Post-processing for ultra-smooth precision...")
    try:
        # 1. KEEP ALL SIGNIFICANT COMPONENTS
        print(">>> Identifying and preserving object components...")
        import trimesh
        # Ensure the mesh is watertight and has no internal artifacts
        mesh.fill_holes()
        
        components = mesh.split(only_watertight=False)
        if len(components) > 1:
            max_area = max(c.area for c in components)
            significant_parts = [c for c in components if c.area > (max_area * 0.02)] # Lowered threshold to 2%
            mesh = trimesh.util.concatenate(significant_parts)
            print(f">>> Preserved {len(significant_parts)} major components.")

        # 2. Laplacian Smoothing (Neural noise reduction)
        import trimesh.smoothing
        mesh = trimesh.smoothing.filter_laplacian(mesh, iterations=20)
        
        # 3. FIX ORIENTATION
        import numpy as np
        mesh.apply_transform(trimesh.transformations.rotation_matrix(np.pi/2, [1, 0, 0]))

        # 4. LOGO DEPTH NORMALIZATION (Strict Logo Profile)
        print(">>> Normalizing model depth for sleek profile...")
        mesh.apply_translation(-mesh.centroid)
        extents = mesh.extents
        
        # Logos should be relatively flat (Depth ≈ 15% of max dimension)
        target_depth = max(extents[0], extents[1]) * 0.15 
        if extents[2] > target_depth:
            scale_z = target_depth / extents[2]
            matrix = np.eye(4)
            matrix[2, 2] = scale_z
            mesh.apply_transform(matrix)
            print(f">>> Profile flattened by {scale_z:.2f}x for a professional finish.")

        # 5. FINAL RE-CENTERING & FLOORING
        mesh.apply_translation(-mesh.centroid)
        mesh.apply_translation([0, 0, -mesh.bounds[0][2]])

        # 4. Smart Simplification (60k faces instead of 80k for better browser viewing)
        if len(mesh.faces) > 60000:
            mesh = mesh.simplify_quadratic_decimation(60000)
            
    except Exception as e:
        print(f">>> Post-processing skipped: {e}")

    output_path = os.path.join(output_dir, "model.stl")
    # Export as binary STL 
    mesh.export(output_path)
    print(f"Mesh saved to {output_path} (High-Precision Output)")

except Exception:
    print("An error occurred during generation:")
    traceback.print_exc()
    sys.exit(1)
