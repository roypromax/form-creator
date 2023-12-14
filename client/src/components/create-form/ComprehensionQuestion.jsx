import React, { useState } from "react";
import generateUniqueID from "../../configs/uniqueId";

const ComprehensionQuestion = ({
  id,
  addQuestion,
  deleteQuestion,
  saveQuestion,
}) => {
  const [question, setQuestion] = useState("");
  const [subQuestions, setSubQuestions] = useState([]);
  const [subQuestion, setSubQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  // console.log(subQuestions);
  // console.log(answers);

  const onSave = () => {
    saveQuestion(id, { question, subQuestions });
  };

  const handleSubQuestionAdd = () => {
    setSubQuestions([...subQuestions, { question: subQuestion, answers }]);
    setSubQuestion("");
    setAnswers([]);
  };

  const handleAnswerAdd = () => {
    setAnswers([...answers, { text: answer, isCorrect }]);
    setAnswer("");
    setIsCorrect(false);
  };

  return (
    <div className="flex">
      <div className="border-2 p-2 flex flex-col mr-2">
        <div className="flex-col">
          <label htmlFor="question" className="mb-1 block">
            Comprehension:
          </label>
          <textarea
            rows="5"
            cols="60"
            onChange={(e) => setQuestion(e.target.value)}
            className="border border-black p-2"
            value={question}
            id="question"
            type="text"
          ></textarea>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col my-3">
            <label htmlFor="subQuestion" className="mb-1 block">
              Sub Question:
            </label>
            <input
              cols="60"
              onChange={(e) => setSubQuestion(e.target.value)}
              value={subQuestion}
              className="border border-black p-2"
              id="subQuestion"
              type="text"
            />
          </div>
          Answers:
          <div className="p-2 bg-slate-600 text-white">
            {answers.map((answer, index) => {
              return (
                <div key={index} className="flex ml-10 gap-2 items-center">
                  - <div>{answer.text}</div>
                  <div>{answer.isCorrect ? "Correct" : "Incorrect"}</div>
                </div>
              );
            })}
          </div>
          <div className="flex my-3 items-center gap-4">
            <div>
              <label htmlFor="answer" className="mb-1">
                Answer:{" "}
              </label>
              <input
                cols="60"
                onChange={(e) => setAnswer(e.target.value)}
                value={answer}
                className="border border-black p-1"
                id="answer"
                type="text"
              />
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="isCorrect">Is Correct: </label>
              <input
                checked={isCorrect}
                onChange={(e) => setIsCorrect(e.target.checked)}
                id="isCorrect"
                type="checkbox"
              />
            </div>

            <button
              onClick={handleAnswerAdd}
              className="rounded p-1.5 bg-slate-600 text-white"
            >
              Add Answer
            </button>
          </div>
          <div className="my-2 text-center">
            <button
              onClick={handleSubQuestionAdd}
              className="rounded p-2 bg-slate-600 text-white"
            >
              Add Sub Question
            </button>
          </div>
        </div>
        Sub Questions:
        <div>
          {subQuestions.map((subQuestion, index) => {
            return (
              <div
                key={index}
                className="flex border border-slate-800 my-2 p-3 flex-col gap-2"
              >
                <div>{subQuestion.question}</div>
                <div className="ml-16">
                  {subQuestion.answers.map((answer, index) => {
                    return (
                      <div key={index} className="flex gap-2 items-center">
                        <div>{answer.text}</div>
                        <div>{answer.isCorrect ? "Correct" : "Incorrect"}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-3 justify-center">
        <button
          className="rounded p-3 bg-slate-600 text-white"
          onClick={() => onSave()}
        >
          Save
        </button>
        <button
          onClick={() => deleteQuestion(id)}
          className="rounded p-3 bg-red-600 text-white"
        >
          Delete
        </button>
        <button
          onClick={() =>
            addQuestion({
              id: generateUniqueID(),
              type: "comprehension",
            })
          }
          className="rounded p-3 bg-slate-600 text-white"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ComprehensionQuestion;
