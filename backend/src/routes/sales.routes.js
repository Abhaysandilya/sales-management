import express from 'express';
import { getSales, getFilterOptions } from '../controllers/sales.controller.js';

const router = express.Router();

router.get('/', getSales);
router.get('/filter-options', getFilterOptions);

export default router;

