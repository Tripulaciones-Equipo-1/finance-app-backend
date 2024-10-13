const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const TransactionSchema = new mongoose.Schema(
  {
    to: {
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
      default: () => {
        let date = new Date();

        let datetoday = date.toLocaleDateString();
        return datetoday;
      },
    },
    hour: {
      type: String,
      default: () => {
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
      },
    },
  },
  { timestamps: true },
);
TransactionSchema.methods.toJSON = function () {
  const transaction = this._doc;

  return transaction;
};

const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction;
