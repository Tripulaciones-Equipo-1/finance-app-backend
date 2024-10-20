const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UsersController");
const { authentication } = require("../middlewares/authentication");
const User = require("../models/User");

router.post("/", UserController.register);
router.get("/", authentication, UserController.getAll);
router.get("/accounts", authentication, UserController.getAllAccounts);
router.post("/login", UserController.login);
router.delete("/logout", authentication, UserController.logout);

module.exports = router;
