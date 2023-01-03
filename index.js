const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { database } = require("./db/dbConfig");
const { productsRouter } = require("./routes/products.routes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

database.connect();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send(database.connected));

app.use("/products", productsRouter);

app.listen(port, () => {
  console.log("App is listenning on port: " + port);
});
