const express = require('express');

const PostController = require('../controllers/post');

const router = express.Router();

router.post(
    '/',
    PostController.createPost,
);

router.get(
    '/',
    PostController.getAllPosts,
);

router.delete(
    '/:id',
    PostController.deletePlayer
)

module.exports = router;