const bcrypt = require("bcrypt");
const User = require("../models/User");
const Entry = require("../models/Entry");

const deleteUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).exec();
  if (!user) return res.status(404).json({ message: "No such user exists." });
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (passwordMatch) {
    Entry.deleteMany({ author: user }, (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        User.deleteOne({ email }, (err, docs) => {
          if (err) {
            console.log(err);
          } else {
            res.sendStatus(200);
          }
        });
      }
    });
  } else {
    res.status(401).json({ message: "Incorrect password." });
  }
};

module.exports = deleteUser;
