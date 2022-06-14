const express = require("express");
const router = express.Router();
const deleteUser = require("../controllers/userController");

router.route("/delete").delete(deleteUser);

module.exports = router;
