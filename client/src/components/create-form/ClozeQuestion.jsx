import React, { useState } from "react";
import generateUniqueID from "../../configs/uniqueId";

const ClozeQuestion = ({ id, addQuestion, deleteQuestion, saveQuestion }) => {
  const [sentence, setSentence] = useState("");
  const [selectedWord, setSelectedWord] = useState("");
  const [selectedWords, setSelectedWords] = useState([]);

  // console.log(selectedWords);

  const onSave = () => {
    saveQuestion(id, { question: sentence, words: selectedWords });
  };

  const handleWordSelection = () => {
    setSelectedWords([...selectedWords, selectedWord.trim()]);
    setSelectedWord("");
  };

  const preview = sentence
    .split(/\b/)
    .map((word) => (selectedWords.includes(word) ? "_____" : word))
    .join("");

  return (
    <div className="flex ">
      <div className="border-2 p-2 flex flex-col mr-2">
        <div className="flex h-14 flex-col my-3">
          <span>Preview: </span>
          <span>{preview}</span>
        </div>
        <div className="flex-col my-3">
          <label htmlFor="sentence" className="mb-1 block">
            Sentence:
          </label>
          <textarea
            rows="1"
            cols="60"
            onChange={(e) => setSentence(e.target.value)}
            className="border border-black p-2"
            value={sentence}
            id="sentence"
            type="text"
          ></textarea>
        </div>
        <div>
          Options :{" "}
          {selectedWords.map((word, i) => {
            return (
              <span
                key={i}
                className="bg-slate-600 text-white rounded p-1 mr-1"
              >
                {word}
              </span>
            );
          })}
        </div>
        <div className="flex my-3 gap-2 items-center">
          <label htmlFor="selectedWords">Select words to blank out:</label>
          <textarea
            rows="1"
            cols="5"
            onChange={(e) => setSelectedWord(e.target.value)}
            value={selectedWord}
            className="border border-black p-2"
            id="selectedWords"
            type="text"
          ></textarea>
          <button
            onClick={() => handleWordSelection()}
            className="rounded p-2 bg-slate-600 text-white"
          >
            Add
          </button>
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
          className="rounded p-3 bg-slate-600 text-white"
          onClick={() => addQuestion({ id: generateUniqueID(), type: "cloze" })}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ClozeQuestion;
