import express from 'express';
import { body } from 'express-validator';
import { registerUser, loginUser, showProfile } from '../controller/user.controller.js';
import { authUser } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/register',[
    body('firstName').isLength({min:3}).withMessage('First name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
],registerUser);

router.post('/login',[
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
], loginUser);

router.get('/profile',authUser,showProfile);

export {router};