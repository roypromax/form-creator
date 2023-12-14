import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendURL } from "../configs/backendURL";
import { useNavigate } from "react-router-dom";

const AllForms = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // console.log(forms);

  const getForms = () => {
    setLoading(true);
    axios
      .get(`${backendURL}/form`)
      .then((res) => {
        setForms(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  };

  const deleteForm = (id) => {
    setLoading(true);
    axios
      .delete(`${backendURL}/form/${id}`)
      .then((res) => {
        setLoading(false);
        getForms();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert("Error deleting form. Please try again.");
      });
  };

  useEffect(() => {
    getForms();
  }, []);

  return (
    <div className="flex-col py-5 px-52">
      <h1 className="text-center text-4xl font-bold">All Forms</h1>
      {loading ? (
        <h1 className="text-center mt-10 text-2xl font-bold">Loading...</h1>
      ) : error ? (
        <h1 className="text-center mt-10 text-xl font-bold">
          Error getting forms data. Please try again.
        </h1>
      ) : forms.length === 0 ? (
        <h1 className="text-center mt-10 text-xl font-bold">
          No Forms Created
        </h1>
      ) : (
        forms.map((form) => {
          return (
            <div
              className="border border-slate-600 my-5 mx-48 p-5 flex justify-between"
              key={form._id}
            >
              <span className="text-lg">{form.title}</span>
              <div>
                <button
                  onClick={() => navigate(`/form-preview/${form._id}`)}
                  className="rounded p-1 text-white bg-green-600 mr-2"
                >
                  Preview
                </button>
                <button
                  onClick={() => deleteForm(form._id)}
                  className="rounded p-1 text-white bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default AllForms;
