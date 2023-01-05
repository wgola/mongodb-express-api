const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { productsRouter } = require("./routes/products.routes");
const { connectDB } = require("./db/dbConfig");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("MongoDB + Express products API"));

app.use("/products", productsRouter);

app.listen(port, () => {
  console.log("App is listenning on port: " + port);
});
