import postModel from '../models/post.js';

//! Create Post
export const createPost = async (req, res) => {
  try {
    const post = new postModel({ ...req.body, creator: req.userId });

    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//! Get all post
export const getAllPost = async (req, res) => {
  try {
    const posts = await postModel.find().sort({ _id: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//! Update a Post
export const updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const posts = req.body;

    const userPost = await postModel.findById(id);

    if (userPost.creator !== req.userId) {
      return res
        .status(409)
        .json({ message: 'unable to delete post that does not belong to you' });
    }

    const newPost = await postModel.findByIdAndUpdate(id, posts, {
      new: true,
    });

    res.status(200).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//! Delete a Post
export const deletePost = async (req, res) => {
  try {
    const id = req.params.id;

    const userPost = await postModel.findById(id);

    if (userPost.creator !== req.userId) {
      return res
        .status(409)
        .json({ message: 'unable to delete post that does not belong to you' });
    }

    await postModel.findByIdAndRemove(id);

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//! Get Single Post
export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postModel.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
