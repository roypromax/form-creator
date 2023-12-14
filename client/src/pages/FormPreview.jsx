import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { backendURL } from "../configs/backendURL";

const FormPreview = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`${backendURL}/form/${id}`);
        setForm(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching form:", error);
        setLoading(false);
      }
    };

    fetchForm();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{form.title}</h1>
      {form.questions.map((question, index) => {
        switch (question.type) {
          case "categorize":
            return (
              <div key={index} className="border-2 p-2 flex flex-col mb-4">
                <h2 className="text-xl font-semibold mb-2">
                  {question.question}
                </h2>
                <p>Categories: {question.categories.join(", ")}</p>
                <p>Items:</p>
                <ul>
                  {question.items.map((item, i) => (
                    <li key={i} className="ml-4">
                      {item.name} ({item.category})
                    </li>
                  ))}
                </ul>
              </div>
            );
          case "cloze":
            return (
              <div key={index} className="border-2 p-2 flex flex-col mb-4">
                <h2 className="text-xl font-semibold mb-2">
                  {question.question}
                </h2>
                <p>Words: {question.words.join(", ")}</p>
              </div>
            );
          case "comprehension":
            return (
              <div key={index} className="border-2 p-2 flex flex-col mb-4">
                <h2 className="text-xl font-semibold mb-2">
                  {question.question}
                </h2>
                <p>Sub-Questions:</p>
                <ul>
                  {question.subQuestions.map((subQuestion, i) => (
                    <li key={i} className="ml-4">
                      <p>{subQuestion.question}</p>
                      <p>Answers:</p>
                      <ul>
                        {subQuestion.answers.map((answer, j) => (
                          <li key={j} className="ml-4">
                            {answer.text} (Correct:{" "}
                            {answer.isCorrect ? "Yes" : "No"})
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default FormPreview;
