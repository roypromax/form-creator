import { useNavigate } from "react-router-dom";
import AllForms from "../components/AllForms";

const Home = () => {
  const navigate = useNavigate();

  const handleCreateForm = () => {
    navigate("/create-form");
  };

  return (
    <div className="flex-col">
      <div className="text-center py-5">
        <button
          onClick={() => handleCreateForm()}
          className="rounded p-3 bg-slate-600 text-white"
        >
          Create New Form
        </button>
      </div>
      <AllForms />
    </div>
  );
};

export default Home;
