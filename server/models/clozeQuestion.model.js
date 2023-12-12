const mongoose = require("mongoose");

const clozeQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    form: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
      required: true,
    },
    words: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { versionKey: false }
);

const ClozeQuestionModel = mongoose.model("ClozeQuestion", clozeQuestionSchema);
module.exports = ClozeQuestionModel;
