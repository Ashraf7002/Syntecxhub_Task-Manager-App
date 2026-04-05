import Sidebar from "../components/Sidebar";
import { useEffect, useState, useCallback } from "react";
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

  // 🔥 IMPORTANT: USE YOUR DEPLOYED BACKEND
  const API = "https://task-manager-backend-pIOj.onrender.com";

  // ✅ FETCH TASKS (FIXED WITH useCallback)
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/api/tasks`, {
        headers: { Authorization: token },
      });

      setTasks(res.data);
    } catch (err) {
      toast.error("Failed to load tasks ⚠️");
    } finally {
      setLoading(false);
    }
  }, [token]);

  // ✅ DELETE TASK
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/api/tasks/${id}`, {
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
        `${API}/api/tasks`,
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
        `${API}/api/tasks/${editId}`,
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

  // ✅ FIXED useEffect
  useEffect(() => {
    if (!token) {
      window.location.href = "/";
    } else {
      fetchTasks();
    }
  }, [fetchTasks, token]);

  return (
    <div style={{ display: "flex" }}>
      <Toaster position="top-right" />

      <div style={{ position: "fixed", height: "100vh", width: "220px" }}>
        <Sidebar dark={dark} setDark={setDark} />
      </div>

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

          {editId && (
            <div style={editCard}>
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

          {loading ? (
            <p>Loading...</p>
          ) : tasks.length === 0 ? (
            <p>No Tasks Yet 🚀</p>
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
                  Edit
                </button>

                <button
                  onClick={() => deleteTask(task._id)}
                  style={deleteBtn}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/* styles same as before */
const mainCard = { maxWidth: "720px", margin: "auto", padding: "25px" };
const inputStyle = { width: "100%", padding: "10px", marginBottom: "10px" };
const taskCard = { background: "#1e293b", padding: "10px", marginBottom: "10px" };
const primaryBtn = { width: "100%", padding: "10px", background: "#6366f1", color: "#fff" };
const editBtn = { marginRight: "10px" };
const deleteBtn = { background: "red", color: "#fff" };
const editCard = { marginTop: "20px" };
const cancelBtn = { marginTop: "10px" };

export default Dashboard;
