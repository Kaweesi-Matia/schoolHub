import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE } from "../config";

export default function Dashboard() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  /* LOAD COURSES */
  const loadCourses = async () => {
    try {
      const res = await fetch(`${BASE}/courses`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      setCourses(data);
    } catch (err) {
      setError("Error loading courses");
    }
  };

  /* LOAD USERS */
  const loadUsers = async () => {
    try {
      const res = await fetch(`${BASE}/users`, {
        credentials: "include",
      });

      if (res.status === 403) return;

      if (!res.ok) throw new Error();

      const data = await res.json();
      setUsers(data);
      setRole("admin");
    } catch (err) {
      setError("Error loading users");
    }
  };

  /* LOAD ENROLLMENTS */
  const loadEnrollments = async () => {
    try {
      const res = await fetch(`${BASE}/enrollments`, {
        credentials: "include",
      });

      if (res.status === 403) return;

      if (!res.ok) throw new Error();

      const data = await res.json();
      setEnrollments(data);
    } catch (err) {
      setError("Error loading enrollments");
    }
  };

  useEffect(() => {
    loadCourses();
    loadUsers();
    loadEnrollments();
  }, []);

  /* DELETE COURSE */
  const deleteCourse = async (id) => {
    await fetch(`${BASE}/course/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    loadCourses();
  };

  /* DELETE USER */
  const deleteUser = async (id) => {
    await fetch(`${BASE}/user/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    loadUsers();
  };

  /* DELETE ENROLLMENT */
  const deleteEnrollment = async (id) => {
    await fetch(`${BASE}/enrollment/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    loadEnrollments();
  };

  /* LOGOUT */
  const logout = async () => {
    await fetch(`${BASE}/logout`, {
      method: "GET",
      credentials: "include",
    });

    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      {error ? <p style={{ color: "red" }}>{error}</p> : null}

      <button onClick={logout}>Logout</button>

      {role === "admin" ? (
        <>
          <p>
            <Link to="/add-course">Add Course</Link>
          </p>

          <h2>Users</h2>

          <ul>
            {users.map((user) => (
              <li key={user._id}>
                {user.email} ({user.role})
                <button onClick={() => deleteUser(user._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <h2>Courses</h2>

      <ul>
        {courses.map((course) => (
          <li key={course._id}>
            {course.title}

            {role === "admin" ? (
              <button onClick={() => deleteCourse(course._id)}>
                Delete
              </button>
            ) : null}
          </li>
        ))}
      </ul>

      <h2>Enrollments</h2>

      <ul>
        {enrollments.map((enrollment) => (
          <li key={enrollment._id}>
            {enrollment.email} - {enrollment.courseTitle}

            {role === "admin" ? (
              <button
                onClick={() => deleteEnrollment(enrollment._id)}
              >
                Delete
              </button>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}