const Account = require("../models/Account");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
require("dotenv").config();

const AccountController = {
  //crear Account
  async create(req, res, next) {
    try {
      const account = await Account.create({
        ...req.body,
        owner: req.user._id,
      });

      await User.findByIdAndUpdate(req.user._id, {
        $push: { accounts: account._id },
      }),
        res.status(201).send({ message: "Cuenta creada con éxito", account });
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

      await Account.findOneAndUpdate({ _id: req.params._id }, account);

      res.send("Account actualizado con éxito");
    } catch (error) {
      console.log(error);
    }
  },

  //borrar Account
  async delete(req, res) {
    try {
      await Account.findByIdAndDelete({
        _id: req.params._id,
      });
      res.send({ message: "Account has been removed" });
    } catch (error) {
      console.log(error);
    }
  },

  // ver todos Accounts
  getAll(req, res) {
    Account.find({ owner: req.user._id })
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
      const account = await Account.findById(req.params._id);
      let userid = req.user._id;
      let ownerid = account.owner;

      if (!account) {
        res.status(500).send({ message: "Account no encontrado" });
      }
      if (userid == ownerid) {
        res.status(500).send({ message: "Account no encontrado" });
      }

      res.send(account);
    } catch {
      (err) => {
        console.log(err);
        res.status(500).send({
          message: "Account no encontrado",
        });
      };
    }
  },

  //ver transacciones
  async getAllTransactions(req, res) {
    try {
      const transactions = await Account.findById(
        req.params._id,
        // "transactions",
      )
        .populate({ path: "transactions", options: { sort: { date: -1 } } })
        .populate("owner", "dni email name");

      res.send(transactions);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Ha habido un problema al cargar las transacciones",
      });
    }
  },

  // buscar Account por alias

  async getOneByName(req, res, next) {
    try {
      const account = await Account.findOne({ alias: req.params.alias }).exec();
      if (!account) {
        res.status(500).send({ message: "Account no encontrado" });
      }
      res.send(account);
    } catch {
      (err) => {
        console.log(err);
        res.status(500).send({
          message: "Account no encontrado",
        });
      };
    }
  },
};
module.exports = AccountController;
