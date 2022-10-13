const express = require("express");
require("dotenv").config();
require("./models/db");
const studentRouter = require("./routes/student");

const Student = require("./models/student");

const app = express();

app.use(express.json());
app.use(studentRouter);

app.get("/", (req, res) => {
  res.send("<h1>Halo ini express</h1>");
});

app.listen(8000, () => {
  console.log("Port is listening.");
});
