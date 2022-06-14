const User = require("../models/User");

const verifyRegister = async (req, res, next) => {
  const { email } = req.body;
  const alreadyExists = await User.findOne({ email }).exec();
  if (alreadyExists) {
    return res.status(409).json({
      message: "A user with this email already exists.",
    });
  }
  next();
};

module.exports = verifyRegister;
