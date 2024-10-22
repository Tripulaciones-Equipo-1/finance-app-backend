const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UsersController");
const { authentication, isAdmin } = require("../middlewares/authentication");

router.post("/", UserController.register);
router.get("/", authentication, isAdmin, UserController.getAll);
router.put("/id/:_id", authentication, isAdmin, UserController.update);
router.delete("/id/:_id", authentication, isAdmin, UserController.delete);

router.get("/accounts", authentication, UserController.getAllAccounts);
router.post("/login", UserController.login);
router.delete("/logout", authentication, UserController.logout);

module.exports = router;
