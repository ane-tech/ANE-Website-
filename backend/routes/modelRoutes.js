import express from 'express';
import multer from "multer";
import { getPopularModels, getModelDetails, generate3DModel } from '../controllers/modelsController.js';

const router = express.Router();
// Use /tmp for multer because Vercel filesystem is read-only
const upload = multer({ dest: "/tmp" });

router.get('/', getPopularModels);
router.get('/:id', getModelDetails);
router.post("/generate-3d", upload.single("image"), generate3DModel);

export default router;
