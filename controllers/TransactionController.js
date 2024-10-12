const Transaction = require("../models/Transaction");
const Account = require("../models/Account");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
require("dotenv").config();

const TransactionController = {
  //crear Transaction
  async create(req, res, next) {
    try {
      const account = req.params._id;

      const transaction = await Transaction.create({
        ...req.body,
        account: account,
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

  //actualizar account
  async update(req, res) {
    try {
      const account = {
        alias: req.body.alias,
      };

      await Transaction.findOneAndUpdate({ _id: req.params._id }, account);

      res.send("Transaction actualizado con éxito");
    } catch (error) {
      console.log(error);
    }
  },

  //borrar Transaction
  async delete(req, res) {
    try {
      await Transaction.findByIdAndDelete({
        _id: req.params._id,
      });
      res.send({ message: "Transaction has been removed" });
    } catch (error) {
      console.log(error);
    }
  },

  // ver todos Transactions
  getAll(req, res) {
    Transaction.find({})
      .then((accounts) => res.send(accounts))
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: "Ha habido un problema al cargar las cuentas",
        });
      });
  },

  //get by id
  async getById(req, res) {
    try {
      const account = await Transaction.findById(req.params._id);
      console.log(account);
      if (!account) {
        res.status(500).send({ message: "Transaction no encontrado" });
      }
      res.send(account);
    } catch {
      (err) => {
        console.log(err);
        res.status(500).send({
          message: "Transaction no encontrado",
        });
      };
    }
  },

  // buscar Transaction por alias

  async getOneByName(req, res, next) {
    try {
      const account = await Transaction.findOne({
        alias: req.params.alias,
      }).exec();
      if (!account) {
        res.status(500).send({ message: "Transaction no encontrado" });
      }
      res.send(account);
    } catch {
      (err) => {
        console.log(err);
        res.status(500).send({
          message: "Transaction no encontrado",
        });
      };
    }
  },
};
module.exports = TransactionController;
