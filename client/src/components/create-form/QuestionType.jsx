import React, { useState } from "react";
import CategorizeQuestion from "./CategorizeQuestion";
import ClozeQuestion from "./ClozeQuestion";
import ComprehensionQuestion from "./ComprehensionQuestion";

const QuestionType = () => {
  const [questionType, setQuestionType] = useState("categorize");

  const changeQuestionType = (value) => {
    setQuestionType(value);
  };

  return (
    <div className="flex-col border my-5 p-5">
      <div className="text-center">
        <select
          onChange={(e) => changeQuestionType(e.target.value)}
          name="questionType"
          id="questionType"
        >
          <option default value="categorize">
            Categorize
          </option>
          <option value="cloze">Cloze</option>
          <option value="comprehension">Comprehension</option>
        </select>
      </div>
      {questionType === "categorize" && <CategorizeQuestion />}
      {questionType === "cloze" && <ClozeQuestion />}
      {questionType === "comprehension" && <ComprehensionQuestion />}
    </div>
  );
};

export default QuestionType;
