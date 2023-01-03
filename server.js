const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { DbConnection } = require("./db/dbConfig");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const database = new DbConnection();

app.listen(5000, () => {
  console.log("App is listenning on port: " + 5000);
  database.connect();
});

app.get("/", (req, res) => res.send("Hello world"));

module.exports = database;
