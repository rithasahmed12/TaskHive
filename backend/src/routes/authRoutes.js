import express from 'express';
import { signup, login } from '../controllers/authControllers.js';
import { signupValidation, loginValidation } from '../middlewares/validation.js';

const router = express.Router();

router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);

export default router;