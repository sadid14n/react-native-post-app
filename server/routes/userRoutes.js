const express = require("express");
const {
  registerController,
  loginController,
  profileUpdateController,
  requireSignIn,
} = require("../controllers/userController");

// router object
const router = express.Router();

// routes
router.post("/register", registerController);
router.post("/login", loginController);

// UPDATE || PUT
router.put("/profile-update", requireSignIn, profileUpdateController);

module.exports = router;
