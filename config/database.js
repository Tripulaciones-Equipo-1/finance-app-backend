require("dotenv").config();

const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongodb database");
  } catch (error) {
    console.error(error);
    throw new Error("Error when trying to connect to database");
  }
};

module.exports = dbConnection;
