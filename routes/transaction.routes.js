const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/TransactionController.js");
const { authentication } = require("../middlewares/authentication.js");

router.get("/", authentication, TransactionController.getAll);
router.post("/id/:_id", authentication, TransactionController.create);
router.put("/id/:_id", TransactionController.update);
router.delete("/id/:_id", TransactionController.delete);
router.get("/id/:_id", TransactionController.getById);

module.exports = router;
