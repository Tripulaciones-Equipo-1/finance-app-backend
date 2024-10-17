const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/TransactionController.js");
const { authentication } = require("../middlewares/authentication.js");

router.get("/id/:_id", authentication, TransactionController.getAll);
router.post("/id/:_id", authentication, TransactionController.create);

router.get("/latest", authentication, TransactionController.getLatest);

module.exports = router;
