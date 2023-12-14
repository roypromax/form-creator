import React, { useState } from "react";
import CategorizeQuestion from "../components/create-form/CategorizeQuestion";
import ClozeQuestion from "../components/create-form/ClozeQuestion";
import ComprehensionQuestion from "../components/create-form/ComprehensionQuestion";
import axios from "axios";
import { backendURL } from "../configs/backendURL";
import { useNavigate } from "react-router-dom";

const defaultQuestions = [
  { id: 1, type: "categorize" },
  { id: 2, type: "cloze" },
  { id: 3, type: "comprehension" },
];

const CreateForm = () => {
  const [formTitle, setFormTitle] = useState("");
  const [questions, setQuestions] = useState(defaultQuestions);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log("Questions", questions);

  const handleSubmit = () => {
    if (formTitle.trim() === "") {
      alert("Please enter form title");
      return;
    }
    if (questions.length === 0) {
      alert("Please add questions to the form");
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      if (questions[i].question === undefined) {
        alert("Please save all the questions and delete empty questions");
        return;
      }
    }
    setLoading(true);
    const data = {
      title: formTitle,
      questions: questions,
    };
    axios
      .post(`${backendURL}/form/new`, data)
      .then((res) => {
        alert(res.data.message);
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert("Error creating form. Please try again.");
        setLoading(false);
      });
  };

  const saveQuestion = (id, questionData) => {
    setQuestions(
      questions.map((question) => {
        if (question.id === id) {
          return { ...question, ...questionData };
        }
        return question;
      })
    );
    alert("Question saved");
  };

  const addQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  const deleteQuestion = (id) => {
    setQuestions(questions.filter((question) => question.id !== id));
  };

  return (
    <>
      {loading ? (
        <div className="fixed top-0 left-0 w-screen h-screen text-3xl bg-black bg-opacity-50 z-50 flex justify-center items-center">
          Creating the form. Please wait....
        </div>
      ) : (
        <div className="py-10 px-72 flex-col">
          <h1 className="text-center text-4xl font-bold">Create New Form</h1>
          <div className="mt-5 flex-col">
            <label className="text-xl mr-7" htmlFor="formTitle">
              Enter Form Name:
            </label>
            <input
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="border border-gray-400 rounded p-2"
              type="text"
              name="formTitle"
              id="formTitle"
            />
          </div>
          <div className="p-2 my-5">
            {questions.map((question, index) => {
              if (question.type === "categorize") {
                return (
                  <div key={question.id} className="border-2 p-3 my-3">
                    <div className="flex text-lg font-bold gap-10">
                      <span>{`Question ${index + 1}`}</span>
                      <span>Categorize</span>
                    </div>
                    <CategorizeQuestion
                      id={question.id}
                      addQuestion={addQuestion}
                      deleteQuestion={deleteQuestion}
                      saveQuestion={saveQuestion}
                    />
                    Please save all the questions before submitting the form.
                  </div>
                );
              } else if (question.type === "cloze") {
                return (
                  <div key={question.id} className="border-2 p-3 my-3">
                    <div className="flex text-lg font-bold gap-10">
                      <span>{`Question ${index + 1}`}</span>
                      <span>Cloze</span>
                    </div>
                    <ClozeQuestion
                      id={question.id}
                      Add
                      addQuestion={addQuestion}
                      deleteQuestion={deleteQuestion}
                      saveQuestion={saveQuestion}
                    />
                  </div>
                );
              } else if (question.type === "comprehension") {
                return (
                  <div key={question.id} className="border-2 p-3 my-3">
                    <div className="flex text-lg font-bold gap-10">
                      <span>{`Question ${index + 1}`}</span>
                      <span>Comprehension</span>
                    </div>
                    <ComprehensionQuestion
                      id={question.id}
                      addQuestion={addQuestion}
                      deleteQuestion={deleteQuestion}
                      saveQuestion={saveQuestion}
                    />
                  </div>
                );
              }
            })}
          </div>
          <div className="text-center">
            <h1 className="my-2 text-red-500">
              Please save all the questions before submitting the form.
            </h1>
            <h1 className="my-2 text-red-500">
              Unsaved questions will not be submitted.
            </h1>
            <button
              onClick={() => handleSubmit()}
              className="rounded p-1 bg-slate-600 text-white"
            >
              Submit Form
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateForm;
