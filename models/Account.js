const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const AccountSchema = new mongoose.Schema(
  {
    alias: {
      type: String,
      required: [true, "Por favor asigna un alias a la cuenta"],
    },
    owner: { type: ObjectId, ref: "User" },

    balance: {
      type: Number,
      default: 0,
    },

    transactions: [{ type: ObjectId, ref: "Transaction" }],
  },
  { timestamps: true },
);
AccountSchema.methods.toJSON = function () {
  const account = this._doc;

  return account;
};

const Account = mongoose.model("Account", AccountSchema);
module.exports = Account;
