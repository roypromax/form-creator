import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import CreateForm from "../pages/CreateForm";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-form" element={<CreateForm />} />
    </Routes>
  );
};

export default AllRoutes;
