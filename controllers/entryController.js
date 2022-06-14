const NLPCloudClient = require("nlpcloud");
const User = require("../models/User");
const Entry = require("../models/Entry");

const client = new NLPCloudClient("bart-large-cnn", process.env.NLP_CLOUD_KEY);

const addEntry = async (req, res) => {
  const { email, title, text } = req.body;
  const user = await User.findOne({ email }).exec();
  client
    .summarization(text)
    .then((response) => {
      const entry = {
        title,
        date: new Date(),
        original: text,
        summary: response.data.summary_text,
        author: user,
      };
      const newEntry = new Entry(entry);
      newEntry
        .save()
        .then(() =>
          res.status(201).json({ summary: response.data.summary_text })
        )
        .catch((e) => {
          res.json(e);
        });
    })
    .catch((e) => {
      if (e.response.status === 429) return res.sendStatus(429);
    });
};

const deleteEntry = async (req, res) => {
  const { id } = req.body;
  Entry.findByIdAndDelete({ _id: id }, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      res.sendStatus(200);
    }
  });
};

const listEntry = async (req, res) => {
  const email = req.query["email"];
  const user = await User.findOne({ email }).exec();
  const entryList = await Entry.find({ author: user }).exec();

  return res.json({ entryList });
};

module.exports = { addEntry, deleteEntry, listEntry };
