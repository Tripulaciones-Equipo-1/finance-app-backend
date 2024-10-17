const Transaction = require("../models/Transaction");
const Account = require("../models/Account");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
const { getById } = require("./AccountController");
require("dotenv").config();

const date = () => {
  let date = new Date();

  let datetoday = date.toLocaleDateString();

  let todaydate = datetoday.split("/");
  datetoday = `${todaydate[2]}-${todaydate[1]}-${todaydate[0]} `;

  return datetoday;
};

const hours = () => {
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  let date = new Date();
  let h = addZero(date.getHours());
  let m = addZero(date.getMinutes());
  let s = addZero(date.getSeconds());
  let time = h + ":" + m + ":" + s;
  return time;
};

const datehour = () => {
  return date() + "" + hours();
};

const TransactionController = {
  //crear Transaction
  async create(req, res, next) {
    try {
      const account = req.params._id;

      const transaction = await Transaction.create({
        ...req.body,
        account: account,
        date: datehour(),
      });

      const accountdata = await Account.findById(account);
      const newvalue = accountdata.balance + transaction.value;

      await Account.findByIdAndUpdate(account, {
        balance: newvalue,
        $push: {
          transactions: transaction._id,
        },
      }),
        res.status(201).send({ message: "transaccion realizada", transaction });
    } catch (error) {
      error.origin = "account";
      next(error);
    }
  },

  // ver todos Transactions
  getAll(req, res) {
    Transaction.find({ account: req.params._id })
      .then((transactions) => res.send(transactions))
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: "Ha habido un problema al cargar las transacciones",
        });
      });
  },

  async getLatest(req, res) {
    try {
      const { limit = 3 } = req.query;

      const transactions = await Transaction.find()
        .sort({ date: -1 })
        .populate("account", "owner")
        .lean();

      const result = transactions.filter((data) => {
        return data.account.owner.equals(req.user._id);
      });

      res.send(result.slice(0, limit));
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .send({ message: "error when getting user transactions", error });
    }
  },

  async getById(req, res) {
    try {
      const transaction = await Transaction.findById(req.params._id);
      res.send(transaction);
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .send({ message: "error when getting transaction", error });
    }
  },
};

module.exports = TransactionController;
