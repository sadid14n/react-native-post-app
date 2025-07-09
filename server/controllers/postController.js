const postModel = require("../models/postModel");

const createPostController = async (req, res) => {
  try {
    const { title, description } = req.body;
    // validation
    if (!title || !description) {
      return res.status(400).send({
        success: false,
        message: "Please add title and description",
      });
    }
    // create post
    const post = await postModel({
      title,
      description,
      postedBy: req.auth._id,
    }).save();

    res.status(201).send({
      success: true,
      message: "Post created successfully",
      post,
    });
    console.log(req.auth);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Create post API error",
      error,
    });
  }
};

// GET ALL POST
const getAllPostController = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("postedBy", "name")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "Successfully find all post",
      posts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in GetALLPost API",
      error,
    });
  }
};

// GET USER POSTS
const getUserPostController = async (req, res) => {
  try {
    const userPosts = await postModel
      .find({ postedBy: req.auth._id })
      .populate("postedBy", "name")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "Successfully find user post",
      userPosts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in GetALLPost API",
      error,
    });
  }
};

// DELETE POST CONTROLLER
const deletePostController = async (req, res) => {
  try {
    const { id } = req.params;
    await postModel.findOneAndDelete({ _id: id });
    res.status(200).send({
      success: true,
      message: "Your post has been deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in DeletePost API",
      error,
    });
  }
};

// UPDATE POST CONTROLLER
const updatePostController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    // find the post
    const post = await postModel.findById({ _id: id });

    if (!title || !description) {
      return res.status(400).send({
        success: false,
        message: "Please provide title and description",
      });
    }

    const updatePost = await postModel.findByIdAndUpdate(
      { _id: id },
      {
        title: title || post?.title,
        description: description || post?.description,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Post updated successfully",
      updatePost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in DeletePost API",
      error,
    });
  }
};

module.exports = {
  createPostController,
  getAllPostController,
  getUserPostController,
  deletePostController,
  updatePostController,
};
