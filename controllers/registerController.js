const bcrypt = require("bcrypt");
const User = require("../models/User");

const createUser = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword });
  newUser
    .save()
    .then(() =>
      res.status(201).json({ message: "Successfully created a new user." })
    )
    .catch((e) => res.json(e));
};

module.exports = createUser;
