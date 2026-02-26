import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    name: "",
    subject: "",
    age: "",
    email: ""
  });

  const [editId, setEditId] = useState(null);

  const fetchStudents = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/students`
    );
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.subject || !form.age || !form.email) {
      alert("All fields required");
      return;
    }

    if (editId) {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/students/${editId}`,
        form
      );
      setEditId(null);
    } else {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/students`,
        form
      );
    }

    setForm({ name: "", subject: "", age: "", email: "" });
    fetchStudents();
  };

  const handleEdit = (student) => {
    setForm(student);
    setEditId(student._id);
  };

  const deleteStudent = async (id) => {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/students/${id}`
    );
    fetchStudents();
  };

  return (
    <div className="dashboard">
      <h2>Student Management System</h2>

      <div className="student-form">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
        />

        <input
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>
          {editId ? "Update Student" : "Add Student"}
        </button>
      </div>

      {students.map((s) => (
        <div key={s.id} className="student-card">
          <div>
            <strong>{s.name}</strong> <br />
            Subject: {s.subject} <br />
            Age: {s.age} <br />
            Email: {s.email}
          </div>

          <div>
            <button
              className="update-btn"
              onClick={() => handleEdit(s)}>Edit
              </button>
            <button
              className="delete-btn"
              onClick={() => deleteStudent(s._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}