const mongoose = require("mongoose");

const formSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    questions: [
      {
        type: {
          type: String,
          enum: ["categorize", "cloze", "comprehension"],
          required: true,
        },
        id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
      },
    ],
  },
  {
    versionKey: false,
  }
);

const FormModel = mongoose.model("Form", formSchema);

module.exports = FormModel;
