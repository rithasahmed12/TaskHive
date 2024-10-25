import { body } from 'express-validator';

export const signupValidation = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

export const loginValidation = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').exists().withMessage('Password is required'),
];

export const taskValidation = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').optional().isString().withMessage('Description must be a string'),
];
