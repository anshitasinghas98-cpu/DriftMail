const User = require('../Models/userModel');

const loginUser = async function (req, res) {
  // console.log("res is ", req);
  console.log("req body is ",req.body);
  if(!req || !req.body){
    return res.status(400).json({ error: "Email and password are required" });
  }
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const { email: userEmail, token } = await User.login({ email, password });
    res.status(200).json({ message: "Login successful", email: userEmail, token });
  } catch (error) {
    res.status(401).json({ error: "Login failed: " + error.message });
  }
};

const registerUser = async function (req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const { message } = await User.register({ name, email, password });
    res.status(201).json({ message });
  } catch (error) {
    res.status(400).json({ error: "Registration failed: " + error.message });
  }
};

module.exports = { loginUser, registerUser };
