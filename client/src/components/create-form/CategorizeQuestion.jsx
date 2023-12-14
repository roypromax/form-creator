import React, { useState } from "react";
import generateUniqueID from "../../configs/uniqueId";

const CategorizeQuestion = ({
  id,
  addQuestion,
  deleteQuestion,
  saveQuestion,
}) => {
  const [question, setQuestion] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({ name: "", category: "" });

  // console.log(categories);
  // console.log(items);

  const onSave = () => {
    saveQuestion(id, {
      question,
      categories,
      items,
    });
  };

  const handleCategoryAdd = () => {
    setCategories([...categories, category.trim()]);
    setCategory("");
  };

  const handleCategoryDelete = (index) => {
    const newCategories = categories.filter(
      (_, categoryIndex) => categoryIndex !== index
    );
    setCategories(newCategories);
  };

  const handleItemChange = (value, field) => {
    setItem({ ...item, [field]: value });
  };

  const addItem = () => {
    setItems([...items, item]);
    setItem({ name: "", category: "" });
  };

  const deleteItem = (index) => {
    const newItems = items.filter((_, itemIndex) => itemIndex !== index);
    setItems(newItems);
  };

  return (
    <div className="flex">
      <div className="border-2 p-2 flex flex-col mr-2">
        <div className="flex-col my-3">
          <label htmlFor="question" className="mb-1 block">
            Question:
          </label>
          <textarea
            rows="1"
            cols="60"
            onChange={(e) => setQuestion(e.target.value)}
            className="border border-black p-2"
            value={question}
            id="question"
            type="text"
          ></textarea>
        </div>
        <div className="flex flex-col my-3">
          <label htmlFor="categories" className="mb-1 block">
            Add Categories:
          </label>
          <div className="flex gap-2 my-3">
            <input
              cols="5"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="border border-black p-2"
              id="categories"
              type="text"
            />
            <button
              onClick={handleCategoryAdd}
              className="rounded p-2 bg-slate-600 text-white"
            >
              Add
            </button>
          </div>

          <div>
            Categories:{" "}
            <div className="flex gap-2 items-center">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="flex border border-slate-800 p-1 gap-2 items-center"
                >
                  {" "}
                  <span
                    key={index}
                    className="bg-slate-600 text-white rounded p-1 mr-1"
                  >
                    {category}
                  </span>
                  <button
                    onClick={(e) => handleCategoryDelete(index)}
                    className="rounded p-1 bg-red-600 text-white"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col my-3 ">
          <div className="flex gap-3 items-center m-2">
            <label htmlFor="items" className="mb-1 ">
              Add Items:
            </label>
            <input
              cols="5"
              onChange={(e) => handleItemChange(e.target.value, "name")}
              value={item.name}
              className="border border-black p-1"
              id="items"
              type="text"
            />
            <select
              value={item.category}
              onChange={(e) => handleItemChange(e.target.value, "category")}
              className="border border-black p-1.5"
            >
              <option default value="">
                Select category
              </option>
              {categories.map((category, categoryIndex) => (
                <option key={categoryIndex} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button
              onClick={addItem}
              className="rounded p-1.5 bg-slate-600 text-white"
            >
              Add
            </button>
          </div>
          <div className="flex gap-5 flex-wrap p-3">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex border border-slate-800 p-1 gap-2 items-center"
              >
                <span className="bg-slate-600 text-white rounded p-1 mr-1">
                  {item.name} ({item.category})
                </span>
                <button
                  onClick={() => deleteItem(index)}
                  className="rounded p-1 bg-red-600 text-white"
                >
                  x
                </button>
              </div>
            ))}
          </div>
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
          onClick={() =>
            addQuestion({ id: generateUniqueID(), type: "categorize" })
          }
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CategorizeQuestion;
