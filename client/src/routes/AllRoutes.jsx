import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import CreateForm from "../pages/CreateForm";
import FormPreview from "../pages/FormPreview";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-form" element={<CreateForm />} />
      <Route path="/form-preview/:id" element={<FormPreview />} />
    </Routes>
  );
};

export default AllRoutes;
