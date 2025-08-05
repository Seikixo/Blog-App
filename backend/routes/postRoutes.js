const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { getAllPosts, updatePost, deletePost, createPost, likePost, dislikePost } = require('../controllers/postController');

router.route('/').get(getAllPosts).post(protect, createPost);
router.route('/:id').put(protect, updatePost).delete(protect, deletePost);

router.post('/:id/like', protect, likePost);
router.post('/:id/dislike', protect, dislikePost);

module.exports = router;