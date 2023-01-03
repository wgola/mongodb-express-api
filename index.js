const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { DbConnection } = require("./db/dbConfig");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const database = new DbConnection();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("App is listenning on port: " + port);
  database.connect();
});

app.get("/", (req, res) => res.send("Hello world"));

app.get("/home", async (req, res) => {
  const product = await database.getCollection().findOne({});
  res.json(product);
});

module.exports = database;
