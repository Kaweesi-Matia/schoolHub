import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BASE } from "../config";

export default function AddCourse() {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

 const submit = async (e) => {
  e.preventDefault();

  const res = await fetch(`${BASE}/course`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ title }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert( "Failed to add course");
    return;
  }

  alert("Course added");
  navigate("/dashboard");
};

 return (
  <form onSubmit={submit}>
    <h2>Add Course</h2>

    <input
      placeholder="Course Title"
      required
      onChange={(e) => setTitle(e.target.value)}
    />

    <button>Add</button>

    <Link to="/dashboard">Back</Link>
  </form>
);
}