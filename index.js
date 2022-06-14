const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const verifyToken = require("./middleware/verifyToken");
const verifyRegister = require("./middleware/verifyRegister");
const emailLowercase = require("./middleware/emailLowercase");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(emailLowercase);

app.use("/register", verifyRegister, require("./routes/registerRouter"));
app.use("/auth", require("./routes/authRouter"));
app.use(verifyToken);
app.use("/entry", require("./routes/entryRouter"));
app.use("/user", require("./routes/userRouter"));

mongoose.connect(process.env.MONGODB_ATLAS_URI);
mongoose.connection.once("open", () => {
  console.log("MongoDB ✅");
  app.listen(process.env.PORT, () => {
    console.log("Express ✅");
  });
});
