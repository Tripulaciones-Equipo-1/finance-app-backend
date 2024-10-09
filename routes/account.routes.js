const express = require("express");
const router = express.Router();
const AccountController = require("../controllers/AccountController.js");
/* const { authentication, isAdmin } = require("../middlewares/authentication"); */

router.get("/", AccountController.getAll);
router.post("/", AccountController.create);
router.put("/id/:_id", AccountController.update);
router.delete("/id/:_id", AccountController.delete);
router.get("/id/:_id", AccountController.getById);
router.get("/alias/:alias", AccountController.getOneByName);

module.exports = router;
