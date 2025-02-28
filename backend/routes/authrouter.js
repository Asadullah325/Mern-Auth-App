import express from 'express';
import { login, register } from '../controllers/authController.js';
import { loginvalidate, signupvalidate } from '../middlewares/validation.js';

const router = express.Router();

router.post('/login',loginvalidate, login);

router.post('/register',signupvalidate, register);

export default router;