const express = require("express");
const FormModel = require("../models/form.model");
const CategorizeQuestionModel = require("../models/categorizeQuestion.model");
const ClozeQuestionModel = require("../models/clozeQuestion.model");
const ComprehensionQuestionModel = require("../models/comprehensionQuestion.model");

const formRouter = express.Router();

//route to get all forms
formRouter.get("/", async (req, res) => {
  try {
    const forms = await FormModel.find();
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//route to get a form by id
formRouter.get("/:id", async (req, res) => {
  try {
    let form = await FormModel.findById(req.params.id);

    form = form.toObject(); // Convert the form document to a plain JavaScript object

    // Fetch the questions from the correct collections based on their types
    for (let i = 0; i < form.questions.length; i++) {
      let question;
      if (form.questions[i].type === "categorize") {
        question = await CategorizeQuestionModel.findById(form.questions[i].id);
      } else if (form.questions[i].type === "cloze") {
        question = await ClozeQuestionModel.findById(form.questions[i].id);
      } else if (form.questions[i].type === "comprehension") {
        question = await ComprehensionQuestionModel.findById(
          form.questions[i].id
        );
      }

      if (question) {
        // Spread the properties of the fetched question into the question object
        form.questions[i] = { ...form.questions[i], ...question.toObject() };
        // Delete the 'id' property
        delete form.questions[i].id;
      }
    }

    res.json(form);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//route to create a form
formRouter.post("/new", async (req, res) => {
  const { title, image, questions } = req.body;

  let newForm = new FormModel({ title, image });

  try {
    // Save form first to get its _id
    let form = await newForm.save();

    for (let i = 0; i < questions.length; i++) {
      let newQuestion;
      if (questions[i].type === "categorize") {
        newQuestion = new CategorizeQuestionModel({
          ...questions[i],
          form: form._id,
        });
      } else if (questions[i].type === "cloze") {
        newQuestion = new ClozeQuestionModel({
          ...questions[i],
          form: form._id,
        });
      } else if (questions[i].type === "comprehension") {
        newQuestion = new ComprehensionQuestionModel({
          ...questions[i],
          form: form._id,
        });
      } else {
        return res.status(400).json({ message: "Invalid question type" });
      }

      const savedQuestion = await newQuestion.save();
      form.questions.push({ type: questions[i].type, id: savedQuestion._id });
    }

    // Update form after all questions have been saved
    await FormModel.findByIdAndUpdate(form._id, form);
    res.status(201).json({ message: "Form created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// route to update a form
formRouter.put("/update/:id", async (req, res) => {
  const { title, image, questions } = req.body;

  try {
    // Find form by id and update
    let form = await FormModel.findByIdAndUpdate(
      req.params.id,
      { title, image },
      { new: true }
    );

    // Get ids of questions in the request
    const questionIds = questions.map((question) => question._id);

    // Get ids of questions in the database
    const dbQuestionIds = form.questions.map((question) => question.id);

    // Find questions that need to be deleted
    for (let i = 0; i < dbQuestionIds.length; i++) {
      if (!questionIds.includes(dbQuestionIds[i])) {
        let questionModel;
        const questionType = form.questions.find(
          (question) => question.id === dbQuestionIds[i]
        ).type;
        if (questionType === "categorize") {
          questionModel = CategorizeQuestionModel;
        } else if (questionType === "cloze") {
          questionModel = ClozeQuestionModel;
        } else if (questionType === "comprehension") {
          questionModel = ComprehensionQuestionModel;
        }
        await questionModel.findByIdAndDelete(dbQuestionIds[i]);

        // Remove question from form's questions array
        form.questions = form.questions.filter(
          (question) => question.id !== dbQuestionIds[i]
        );
      }
    }

    // Update or add questions
    for (let i = 0; i < questions.length; i++) {
      let questionModel;
      if (questions[i].type === "categorize") {
        questionModel = CategorizeQuestionModel;
      } else if (questions[i].type === "cloze") {
        questionModel = ClozeQuestionModel;
      } else if (questions[i].type === "comprehension") {
        questionModel = ComprehensionQuestionModel;
      }

      if (dbQuestionIds.includes(questions[i]._id)) {
        // If question is in database, update it
        await questionModel.findByIdAndUpdate(questions[i]._id, questions[i]);
      } else {
        // If question is not in database, add it
        const newQuestion = new questionModel({
          ...questions[i],
          form: form._id,
        });
        await newQuestion.save();
        form.questions.push({ type: questions[i].type, id: newQuestion._id });
      }
    }

    // Save form after updating questions
    await form.save();

    res.status(200).json({ message: "Form updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//route to delete a form
formRouter.delete("/:id", async (req, res) => {
  try {
    // Find the form
    const form = await FormModel.findById(req.params.id);

    // Delete the questions
    for (let question of form.questions) {
      let questionModel;
      if (question.type === "categorize") {
        questionModel = CategorizeQuestionModel;
      } else if (question.type === "cloze") {
        questionModel = ClozeQuestionModel;
      } else if (question.type === "comprehension") {
        questionModel = ComprehensionQuestionModel;
      }
      await questionModel.findByIdAndDelete(question.id);
    }

    // Delete the form
    await FormModel.findByIdAndDelete(req.params.id);

    res.json({ message: "Form and its questions deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = formRouter;
