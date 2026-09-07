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
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="dashboard-actions">
          {role === "admin" ? (
            <Link to="/add-course" className="btn btn-secondary">
              Add Course
            </Link>
          ) : null}
          <button type="button" className="btn btn-ghost" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      {error ? <p className="dashboard-error">{error}</p> : null}

      {role === "admin" ? (
        <section className="panel">
          <h2>Users</h2>
          {users.length === 0 ? (
            <p className="empty">No users yet</p>
          ) : (
            <ul className="plain-list">
              {users.map((user) => (
                <li className="list-row" key={user._id}>
                  <span>
                    {user.email} ({user.role})
                  </span>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : null}

      <section className="panel">
        <h2>Courses</h2>
        {courses.length === 0 ? (
          <p className="empty">No courses yet</p>
        ) : (
          <ul className="plain-list">
            {courses.map((course) => (
              <li className="list-row" key={course._id}>
                <span>{course.title}</span>
                {role === "admin" ? (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteCourse(course._id)}
                  >
                    Delete
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="panel">
        <h2>Enrollments</h2>
        {enrollments.length === 0 ? (
          <p className="empty">No enrollments yet</p>
        ) : (
          <ul className="plain-list">
            {enrollments.map((enrollment) => (
              <li className="list-row" key={enrollment._id}>
                <span>
                  {enrollment.email} - {enrollment.courseTitle}
                </span>
                {role === "admin" ? (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteEnrollment(enrollment._id)}
                  >
                    Delete
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}