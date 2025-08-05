const Post = require('../models/Post');

const createPost = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  try {
    const post = await Post.create({
      title,
      content,
      user: req.user._id,
    });

    await post.populate('user', 'name email');
    
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'name email') 
      .populate('likes', 'name') 
      .populate('dislikes', 'name')
      .sort({ createdAt: -1 });
      
    const formatted = posts.map(post => ({
        ...post.toObject(),
        likesCount: post.likes.length,
        dislikesCount: post.dislikes.length
    }));
    
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: 'Post not found' });
    
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to edit this post' });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    const updated = await post.save();
    await updated.populate('user', 'name email');
    
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: 'Post not found' });
    
    // Fixed: Check user instead of user
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: 'Post not found' });

    const userId = req.user._id;

    post.dislikes = post.dislikes.filter(
      (dislikeId) => dislikeId.toString() !== userId.toString()
    );

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((likeId) => likeId.toString() !== userId.toString());
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.json({ 
      message: 'Post liked/unliked', 
      likes: post.likes.length, 
      dislikes: post.dislikes.length 
    });
  } catch (err) {
    console.error('Like post error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const dislikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: 'Post not found' });

    const userId = req.user._id;

    post.likes = post.likes.filter(
      (likeId) => likeId.toString() !== userId.toString()
    );

    if (post.dislikes.includes(userId)) {
      post.dislikes = post.dislikes.filter((id) => id.toString() !== userId.toString());
    } else {
      post.dislikes.push(userId);
    }

    await post.save();
    res.json({ 
      message: 'Post disliked/undisliked', 
      likes: post.likes.length, 
      dislikes: post.dislikes.length 
    });
  } catch (err) {
    console.error('Dislike post error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user._id })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
      
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
  getUserPosts
};
