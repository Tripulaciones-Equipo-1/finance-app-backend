const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const TransactionSchema = new mongoose.Schema(
  {
    concept: {
      type: String,
      required: [
        true,
        " Por favor Ingrese cuenta destino donde quiere realizar la transaccion",
      ],
    },
    value: {
      type: Number,
      required: [true, "Por favor introduzca la cantidad"],
    },
    category: {
      type: String,
      required: [
        true,
        "Por favor ingrese la categoria a la que corresponde la transacción",
      ],
    },

    account: { type: ObjectId, ref: "Account" },

    date: {
      type: String,
    },
  },
  { timestamps: false },
);
TransactionSchema.methods.toJSON = function () {
  const transaction = this._doc;

  return transaction;
};

const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction;
