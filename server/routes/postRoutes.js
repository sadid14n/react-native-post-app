const express = require("express");
const { requireSignIn } = require("../controllers/userController");
const {
  createPostController,
  getAllPostController,
  getUserPostController,
  deletePostController,
  updatePostController,
} = require("../controllers/postController");

// router object
const router = express.Router();

// route
router.post("/create-post", requireSignIn, createPostController);

router.get("/get-all-post", getAllPostController);

router.get("/get-user-post", requireSignIn, getUserPostController);

// Delete post
router.delete("/delete-post/:id", requireSignIn, deletePostController);

// Update post
router.put("/update-post/:id", requireSignIn, updatePostController);

module.exports = router;
