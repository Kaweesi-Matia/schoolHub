import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddCourse from "./pages/AddCourse";
import Enroll from "./pages/Enroll";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/course" element={<AddCourse />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/enroll" element={<Enroll />} />
      </Routes>
    </BrowserRouter>
  );
}
