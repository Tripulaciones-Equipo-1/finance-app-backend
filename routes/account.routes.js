const express = require("express");
const router = express.Router();
const AccountController = require("../controllers/AccountController.js");
/* const { authentication, isAdmin } = require("../middlewares/authentication"); */

router.get("/", AccountController.getAll);
router.post("/", AccountController.create);

/* 
router.put("/id/:_id", AccountController.update);
router.delete("/id/:_id", AccountController.delete);
router.get("/conected", AccountController.getConected);
router.get("/myinfo", AccountController.getinfo);
router.get("/id/:_id", AccountController.getById);
router.get("/name/:name", AccountController.getOneByName);
router.post("/login", AccountController.login);
router.delete("/logout", AccountController.logout); */

module.exports = router;
