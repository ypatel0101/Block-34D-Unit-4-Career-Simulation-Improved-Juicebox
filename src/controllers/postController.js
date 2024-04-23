const prisma = require('../prismaClient');

const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching posts.' });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: 'Post not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching post.' });
  }
};

const createPost = async (req, res) => {
  try {
    const post = await prisma.post.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        userId: req.user.id, 
      },
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error creating post.' });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await prisma.post.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error updating post.' });
  }
};

const deletePost = async (req, res) => {
  try {
    await prisma.post.delete({
      where: { id: parseInt(req.params.id) },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting post.' });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
