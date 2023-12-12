const mongoose = require("mongoose");

const categorizeQuestionSchema = new mongoose.Schema(
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
    categories: [
      {
        type: String,
        required: true,
      },
    ],
    items: [
      {
        name: {
          type: String,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    versionKey: false,
  }
);

const CategorizeQuestionModel = mongoose.model(
  "CategorizeQuestion",
  categorizeQuestionSchema
);

module.exports = CategorizeQuestionModel;
