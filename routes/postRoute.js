import express from 'express';

const router = express.Router();

import {
  createPost,
  getAllPost,
  updatePost,
  deletePost,
  getPost,
} from '../controllers/postController.js';

import auth from '../middlewares/auth.js';

// authenticated route
router.post('/', auth, createPost);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

// public router
router.get('/', getAllPost);
router.get('/:id', getPost);

export default router;
