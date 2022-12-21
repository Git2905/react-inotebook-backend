const express = require("express");
const router = express.Router();
const { validateUser, validateLoginDetails } = require("../middlewares/UserValidator");
const fetchUser = require("../middlewares/FetchUser");
const userController = require("../controllers/UserController");

router.post("/createuser", validateUser, userController.createUser);
router.post("/login", validateLoginDetails, userController.login);
router.post("/getuser", fetchUser, userController.getUser);

module.exports = router;