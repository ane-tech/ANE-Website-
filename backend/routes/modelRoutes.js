import express from 'express';
import { getPopularModels, getModelDetails } from '../controllers/modelsController.js';

const router = express.Router();

router.get('/', getPopularModels);
router.get('/:id', getModelDetails);

export default router;
