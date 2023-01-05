const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
  } catch (e) {
    console.log("Couldn't connect to DB");
  }
};

module.exports = { connectDB };
