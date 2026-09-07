import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BASE } from "../config";

export default function Enroll() {
  const [form, setForm] = useState({});
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  /* LOAD COURSES */
  useEffect(() => {
    fetch(`${BASE}/courses`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    await fetch(`${BASE}/enroll`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });

    alert("Enrolled");
    navigate("/dashboard");
  };

  return (
    <form onSubmit={submit}>
      <h2>Enroll in Course</h2>

      <input
        type="email"
        placeholder="User Email"
        required
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      {/* SELECT COURSE INSTEAD OF TYPING */}
      {/* <select
        required
        onChange={(e) =>
          setForm({ ...form, courseTitle: e.target.value })
        }
      >
        <option value="">Select Course</option>
        {courses.map((c) => (
          <option key={c._id} value={c.title}>
            {c.title}
          </option>
        ))}
      </select> */}
      <select
        required
        onChange={
          (e) => setForm({ ...form, courseId: e.target.value }) // send _id, not title
        }
      >
        <option value="">Select Course</option>
        {courses.map((c) => (
          <option key={c._id} value={c._id}>
            {" "}
            {/* value is _id now */}
            {c.title}
          </option>
        ))}
      </select>

      <button>Enroll</button>

      <Link to="/dashboard">Back</Link>
    </form>
  );
}
