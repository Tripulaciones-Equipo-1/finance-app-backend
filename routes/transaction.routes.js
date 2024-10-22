const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/TransactionController.js");
const {
  authentication,
  isOwner,
  isAdmin,
} = require("../middlewares/authentication.js");
const Transaction = require("../models/Transaction.js");

router.get("/id/:_id", authentication, TransactionController.getAll);
router.post("/id/:_id", authentication, TransactionController.create);
router.put("/id/:_id", authentication, TransactionController.update);

router.get("/latest", authentication, TransactionController.getLatest);
router.get(
  "/trans/:_id",
  authentication,
  isOwner(Transaction),
  TransactionController.getById,
);

router.delete(
  "/id/:_id",
  authentication,
  isAdmin,
  TransactionController.delete,
);

module.exports = router;
