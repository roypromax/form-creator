const mongoose = require("mongoose");

const comprehensionQuestionSchema = new mongoose.Schema(
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
    subQuestions: [
      {
        question: {
          type: String,
          required: true,
        },
        answers: [
          {
            text: {
              type: String,
              required: true,
            },
            isCorrect: {
              type: Boolean,
              required: true,
            },
          },
        ],
      },
    ],
  },
  {
    versionKey: false,
  }
);

const ComprehensionQuestionModel = mongoose.model(
  "ComprehensionQuestion",
  comprehensionQuestionSchema
);

module.exports = ComprehensionQuestionModel;
