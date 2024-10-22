const express = require("express");
const router = express.Router();
const AccountController = require("../controllers/AccountController.js");
const { authentication, isOwner } = require("../middlewares/authentication");
const Account = require("../models/Account.js");

router.get("/", authentication, AccountController.getAll);
router.post("/", authentication, AccountController.create);

router.put(
  "/id/:_id",
  authentication,
  isOwner(Account),
  AccountController.update,
);
router.delete(
  "/id/:_id",
  authentication,
  isOwner(Account),
  AccountController.delete,
);
router.get(
  "/id/:_id",
  authentication,
  isOwner(Account),
  AccountController.getById,
);
router.get("/alias/:alias", authentication, AccountController.getOneByName);
router.get(
  "/transactions/:_id",
  authentication,
  isOwner(Account),
  AccountController.getAllTransactions,
);

module.exports = router;
