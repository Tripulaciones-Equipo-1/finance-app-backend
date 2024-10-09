const Account = require("../models/Account");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
require("dotenv").config();

const AccountController = {
  //crear Account
  create(req, res, next) {
    Account.create({ ...req.body })
      .then((account) =>
        res.status(201).send({ message: "Cuenta creada con éxito", account }),
      )
      .catch((err) => {
        err.origin = "account";
        next(err);
      });
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
    Account.find({})
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
      console.log(account);
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
