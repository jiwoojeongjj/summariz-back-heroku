const emailLowercase = async (req, res, next) => {
  const { email } = req.body;
  if (email) {
    req.body.email = email.toLowerCase();
  }
  next();
};

module.exports = emailLowercase;
