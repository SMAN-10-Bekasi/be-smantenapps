const express = require("express");
require("dotenv").config();
require("./models/db");
const studentRouter = require("./routes/student");

const Student = require("./models/student");
const Teacher = require("./models/teacher");
const Classroom = require("./models/classroom");
const Qrcode = require("./models/qrcode");

const app = express();
const port = 8000;

app.use(express.json());
app.use(studentRouter);

app.get('/', (req, res) => {
  res.send("<h1>Halo kamu mau ngapain?</h1>");
});

app.listen(port, () => {
  console.log(`Rest API is listening at http://localhost:${port}..`);
});
