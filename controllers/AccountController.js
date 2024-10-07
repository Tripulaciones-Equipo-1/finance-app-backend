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
  /* 
  //actualizar user
  async update(req, res) {
    try {
      const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
      };

      await Account.findOneAndUpdate({ _id: req.params._id }, user);

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
  }, */

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
  /* 

  //get by id
  async getById(req, res) {
    try {
      const user = await Account.findById(req.params._id)
        .populate("commentId", "body")
        .populate("mylikes", "body");
      res.send(user);
    } catch {
      (err) => {
        console.log(err);
        res.status(500).send({
          message: "Usuario no encontrado",
        });
      };
    }
  },
 */
  /* 
  // buscar Account por nombre
  //HECHO PERO FALTA MENSAJE CUANDO NO CONSIGUE USUARIO
  async getOneByName(req, res, next) {
    try {
      const user = await Account.findOne(
        { name: req.params.name },
        "name age",
      ).exec();
      res.send(user);
    } catch {
      (err) => {
        console.log(err);
        res.status(500).send({
          message: "Usuario no encontrado",
        });
      };
    }
  },
 */
};
module.exports = AccountController;
