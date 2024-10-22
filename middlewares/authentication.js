const { Transaction } = require("mongodb");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: payload._id, tokens: token });
    if (!user) {
      return res.status(401).send({ message: "No estás autorizado" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ error, message: "Ha habido un problema con el token" });
  }
};

const isOwner = (model) => {
  return async (req, res, next) => {
    try {
      let elem;

      if (model.collection.collectionName === "transactions") {
        elem = await model.findById(req.params._id).populate("account");

        if (elem.account.owner.toString() !== req.user._id.toString()) {
          return res
            .status(403)
            .send({ message: "This transaction is not yours" });
        }
      } else {
        elem = await model.findById(req.params._id);

        if (elem.owner.toString() !== req.user._id.toString()) {
          return res.status(403).send({ message: "This account is not yours" });
        }
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Problem found while confirming the owner",
      });
    }
  };
};

const isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "admin")
      return res.status(401).send({ message: "You're not authorize" });

    next();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ error, message: "Problem checking administration" });
  }
};

module.exports = { authentication, isOwner, isAdmin };
