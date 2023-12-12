import AllForms from "../components/AllForms";

const Home = () => {
  return (
    <div className="flex-col">
      <div className="text-center py-5">
        <button className="rounded p-3 bg-slate-600 text-white">
          Create New Form
        </button>
      </div>
      <AllForms />
    </div>
  );
};

export default Home;
