const Account = require("../models/Account");
const Transaction = require("../models/Transaction");
const { transactionsExamples } = require("./transaction.data");

const account = "670a44e791d5e19c99abe9d5";

const transactionSeeder = async () => {
  console.log("Uploading transactions...");

  transactionsExamples.forEach(async (element) => {
    const transaction = await Transaction.create({
      ...element,
      account: account,
    });

    const accountData = await Account.findById(account);
    const newValue = accountData.balance + transaction.value;

    await Account.findByIdAndUpdate(account, {
      balance: newValue,
      $push: {
        transactions: transaction._id,
      },
    });

    console.log("Transactions uploaded...");
  });
};

module.exports = { transactionSeeder };
