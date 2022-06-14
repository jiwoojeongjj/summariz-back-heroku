const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).exec();
  if (!user) return res.status(404).json({ message: "No such user exists." });
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (passwordMatch) {
    const accessToken = jwt.sign(
      { email: email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ accessToken });
    console.log(accessToken);
  } else {
    res.status(401).json({ message: "Incorrect password." });
  }
};

module.exports = { handleLogin };
