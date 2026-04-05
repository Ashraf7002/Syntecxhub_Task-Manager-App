import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [dark, setDark] = useState(false);

  const token = localStorage.getItem("token");

  // ✅ FETCH TASKS
  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await axios.get("https://task-manager-backend-pIOj.onrender.com/api/tasks", {
        headers: { Authorization: token },
      });

      setTasks(res.data);
    } catch (err) {
      toast.error("Failed to load tasks ⚠️");
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE TASK
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: token },
      });

      toast.success("Task deleted ❌");
      fetchTasks();
    } catch (err) {
      toast.error("Delete failed ❌");
    }
  };

  // ✅ CREATE TASK
  const createTask = async () => {
    if (!title) {
      return toast.error("Title is required ⚠️");
    }

    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        { title, description },
        { headers: { Authorization: token } }
      );

      toast.success("Task added successfully 🚀");

      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      toast.error("Failed to add task ❌");
    }
  };

  // ✅ UPDATE TASK
  const updateTask = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${editId}`,
        { title: editTitle, description: editDesc },
        { headers: { Authorization: token } }
      );

      toast.success("Task updated ✏️");

      setEditId(null);
      setEditTitle("");
      setEditDesc("");
      fetchTasks();
    } catch (err) {
      toast.error("Update failed ❌");
    }
  };

  useEffect(() => {
    if (!token) {
      window.location.href = "/";
    } else {
      fetchTasks();
    }
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Toaster position="top-right" />

      {/* Sidebar */}
      <div style={{ position: "fixed", height: "100vh", width: "220px" }}>
        <Sidebar dark={dark} setDark={setDark} />
      </div>

      {/* Main */}
      <div
        style={{
          marginLeft: "220px",
          flex: 1,
          padding: "40px",
          background: dark
            ? "linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
            : "linear-gradient(135deg, #667eea, #764ba2)",
          minHeight: "100vh",
          color: "white",
        }}
      >
        <h1>🚀 Task Manager</h1>
        <p style={{ opacity: 0.8 }}>
          Organize your daily tasks efficiently
        </p>

        <div style={mainCard}>
          <h3>Add Task</h3>

          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={inputStyle}
          />

          <button onClick={createTask} style={primaryBtn}>
            Add Task
          </button>

          <hr />

          {/* ✅ EDIT FORM */}
          {editId && (
            <div style={editCard}>
              <h3>Edit Task ✏️</h3>

              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                style={inputStyle}
              />

              <input
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                style={inputStyle}
              />

              <button onClick={updateTask} style={primaryBtn}>
                Update Task
              </button>

              <button
                onClick={() => {
                  setEditId(null);
                  setEditTitle("");
                  setEditDesc("");
                }}
                style={cancelBtn}
              >
                Cancel
              </button>
            </div>
          )}

          <hr />

          {/* 🔥 LOADING */}
          {loading ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <div style={spinner}></div>
              <p>Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div style={{ textAlign: "center", padding: "30px" }}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                width="100"
                alt="empty"
              />
              <h3>No Tasks Yet</h3>
              <p style={{ opacity: 0.7 }}>
                Start by adding your first task 🚀
              </p>
            </div>
          ) : (
            tasks.map((task) => (
              <div key={task._id} style={taskCard}>
                <h4>{task.title}</h4>
                <p>{task.description}</p>

                <button
                  onClick={() => {
                    setEditId(task._id);
                    setEditTitle(task.title);
                    setEditDesc(task.description);
                  }}
                  style={editBtn}
                >
                  Edit ✏️
                </button>

                <button
                  onClick={() => deleteTask(task._id)}
                  style={deleteBtn}
                >
                  Delete ❌
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/* 🎨 STYLES */

const spinner = {
  width: "40px",
  height: "40px",
  border: "4px solid #ccc",
  borderTop: "4px solid #6366f1",
  borderRadius: "50%",
  margin: "auto",
  animation: "spin 1s linear infinite",
};

const mainCard = {
  maxWidth: "720px",
  margin: "auto",
  padding: "25px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.08)",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "10px",
};

const taskCard = {
  background: "#1e293b",
  padding: "15px",
  borderRadius: "14px",
  marginBottom: "12px",
};

const primaryBtn = {
  width: "100%",
  padding: "12px",
  background: "#6366f1",
  border: "none",
  borderRadius: "10px",
  color: "white",
};

const editBtn = {
  background: "#4facfe",
  color: "white",
  padding: "6px 10px",
  marginRight: "10px",
};

const deleteBtn = {
  background: "#ff4d4d",
  color: "white",
  padding: "6px 10px",
};

const editCard = {
  marginTop: "20px",
  padding: "20px",
  borderRadius: "15px",
  background: "rgba(255,165,0,0.15)",
};

const cancelBtn = {
  marginTop: "10px",
  width: "100%",
  padding: "10px",
  background: "#888",
  border: "none",
  borderRadius: "10px",
  color: "white",
};

export default Dashboard;
