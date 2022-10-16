const express = require("express");
require("dotenv").config();
require("./models/db");
const studentRouter = require("./routes/student");

const Student = require("./models/student");
const Teacher = require("./models/teacher");
const Classroom = require("./models/classroom");
const Qrcode = require("./models/qrcode");

const app = express();

app.use(express.json());
app.use(studentRouter);

app.get("/", (req, res) => {
  res.send("<h1>Halo kamu mau ngapain?</h1>");
});

app.listen(8000, () => {
  console.log("Port is listening.");
});
