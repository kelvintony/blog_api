import express from 'express';
const router = express.Router();

import { signIn, signUp } from '../controllers/userController.js';

router.post('/signup', signUp);
router.post('/signin', signIn);

export default router;
