import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BASE } from "../config";

export default function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    alert(data.message);

    if (data.message === "Registered successfully") {
      navigate("/");
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Register</h2>

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        onChange={(e) =>
          setForm({ ...form, confirmPassword: e.target.value })
        }
      />

      <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="">Select Role</option>
        <option value="student">Student</option>
        <option value="admin">Admin</option>
      </select>

      <button>Register</button>

      <Link to="/">Login</Link>
    </form>
  );
}