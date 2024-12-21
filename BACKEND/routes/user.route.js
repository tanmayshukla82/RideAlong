import express from 'express';
import { body } from 'express-validator';
import { registerUser } from '../controller/user.controller.js';
const router = express.Router();

router.post('/register',[
    body('firstName').isLength({min:3}).withMessage('First name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
],registerUser);

export {router};