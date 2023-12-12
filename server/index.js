const express = require("express");
require("dotenv").config();
const connection = require("./configs/db");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Form creator backend");
});

app.listen(port, async () => {
  try {
    await connection;
    console.log("Database connected");
    console.log(`Server running at port ${port}`);
  } catch (error) {
    console.log("Database connection failed");
    console.log(error);
  }
});
