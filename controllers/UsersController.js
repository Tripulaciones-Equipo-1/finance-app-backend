const User = require("../models/User.js");
const Account = require("../models/Account.js");
const jwt = require("jsonwebtoken");
const bcryptj = require("bcryptjs");

const UserController = {
  async register(req, res) {
    try {
      const passwordHash = await bcryptj.hash(req.body.password, 10);
      const user = await User.create({
        ...req.body,
        role: "user",
        password: passwordHash,
        confirmed: false,
      });
      res.status(201).send({ message: "Usuario registrado con exito", user });
    } catch (error) {
      console.error(error);
      return res.status(400).send({ message: "Error al registrar", error });
    }
  },

  async getAll(req, res) {
    try {
      const users = await User.find({});

      res.send(users);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Ha habido un problema al cargar los usuarios",
      });
    }
  },

  async getAllAccounts(req, res) {
    try {
      req.user;
      const accounts = await User.findById(req.user._id, "accounts").populate(
        "accounts",
      );

      res.send(accounts);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Ha habido un problema al cargar las cuentas",
      });
    }
  },

  async login(req, res) {
    try {
      const { dni, password } = req.body;
      const user = await User.findOne({ dni });
      if (!user) {
        return res.status(400).send("Error: Usuario no encontrado");
      }
      const isPasswordValid = await bcryptj.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).send("Error: Contraseña incorrecta");
      }
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      if (user.tokens.length > 4) user.tokens.shift();
      user.tokens.push(token);
      await user.save();
      console.log(user);
      res.send({
        message: `Inicio de sesión exitoso ${user.name}`,
        user,
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error: Ha ocurrido un error al iniciar sesión");
    }
  },

  async logout(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization },
      });
      res.send({ message: "Desconectado con éxito" });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Hubo un problema al intentar desconectar al usuario",
      });
    }
  },
};

module.exports = UserController;
