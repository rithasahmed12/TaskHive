import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskControllers.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { taskValidation } from '../middlewares/validation.js';

const router = express.Router();

router.use(verifyToken);
router.get('/', getTasks);
router.post('/', taskValidation, createTask);
router.put('/:id', taskValidation, updateTask);
router.delete('/:id', deleteTask);

export default router;