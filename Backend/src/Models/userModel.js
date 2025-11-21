const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);


userSchema.statics.register = async function ({ name, email, password }) {
  const existing = await this.findOne({ email });
  if (existing) throw new Error("Email already registered");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await this.create({
    username: name,
    email,
    password: hashedPassword,
  });

  return { message: "Registered successfully" };
};

userSchema.statics.login = async function ({ email, password }) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return { email: user.email, token };
};

const User = mongoose.model("User", userSchema);
module.exports = User;
