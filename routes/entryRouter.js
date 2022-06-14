const express = require("express");
const router = express.Router();
const {
  addEntry,
  deleteEntry,
  listEntry,
} = require("../controllers/entryController");

router.route("/add").post(addEntry);
router.route("/delete").delete(deleteEntry);
router.route("/list").get(listEntry);

module.exports = router;
