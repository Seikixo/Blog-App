const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { getAllPosts, updatePost, deletePost, createPost, likePost, dislikePost } = require('../controllers/postController');
const { reactionLimiter, postLimiter } = require('../middlewares/rateLimiterMiddleware');

router.route('/').get(getAllPosts).post(protect, postLimiter, createPost);
router.route('/:id').put(protect, updatePost).delete(protect, deletePost);

router.post('/:id/like', protect, reactionLimiter, likePost);
router.post('/:id/dislike', protect, reactionLimiter, dislikePost);

module.exports = router;