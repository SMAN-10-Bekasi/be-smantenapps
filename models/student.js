const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const presenceSchema = new mongoose.Schema(
  {
    desc: String,
  },
  { timestamps: true }
);

const studentSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    nisn: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    classroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classroom",
      required: true,
    },
    presence: [presenceSchema],
    gender: { type: String, required: true },
    religion: { type: String, required: true },
    phonenumber: { type: String, required: true },
    birthdate: { type: String, required: true },
    address: { type: String, required: true },
    avatar: String,
    fathername: String,
    fatherphonenumber: String,
    mothername: String,
    motherphonenumber: String,
    parentaddress: String,
  },
  { collection: "students" }
);

studentSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, 10, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      next();
    });
  }
});

studentSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error("Password is mission, can not compare!");

  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    console.log("Error while comparing password!", error.message);
  }
};

module.exports = mongoose.model("Student", studentSchema);
