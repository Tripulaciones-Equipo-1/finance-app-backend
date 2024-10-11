const express = require("express");
const router = express.Router();
const AccountController = require("../controllers/AccountController.js");
const { authentication } = require("../middlewares/authentication");

router.get("/", authentication, AccountController.getAll);
router.post("/", authentication, AccountController.create);
router.put("/id/:_id", authentication, AccountController.update);
router.delete("/id/:_id", authentication, AccountController.delete);
router.get("/id/:_id", authentication, AccountController.getById);
router.get("/alias/:alias", authentication, AccountController.getOneByName);
router.get(
  "/transactions/:_id",
  authentication,
  AccountController.getAllTransactions,
);

module.exports = router;
