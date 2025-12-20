import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminRemedyJourney.css";

const API = "https://astrobackend-5sr6.onrender.com/api/remedy-journey";
const USERS_API = "https://astrobackend-5sr6.onrender.com/api/userweb";

export default function AdminRemedyJourney() {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const [form, setForm] = useState({
    user: "",
    remedyName: "",
    remedyType: "Mantra",
  });

  // Load Main Data
  const load = async () => {
    try {
      const res = await axios.get(API);
      setData(res.data || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  // Load User List
  const loadUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await axios.get(USERS_API);
      setUsers(res.data?.data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    load();
    loadUsers();
  }, []);

  // Create New Remedy
  const create = async () => {
    if (!form.user || !form.remedyName) {
      alert("Please select a user and enter a remedy name");
      return;
    }
    try {
      await axios.post(API, form);
      setForm({ user: "", remedyName: "", remedyType: "Mantra" });
      load();
    } catch (err) {
      alert("Error creating remedy");
    }
  };

  // Update Status
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API}/${id}/status`, { status });
      load();
    } catch (err) {
      console.error("Error updating status");
    }
  };

  // Delete Remedy
  const remove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this remedy?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      load();
    } catch (err) {
      console.error("Error deleting remedy");
    }
  };

  return (
    <div className="admin-wrapper">
      <div className="admin-container">
        <header className="page-header">
          <h2>Remedy Journey <small>Admin Dashboard</small></h2>
        </header>

        {/* ASSIGNMENT FORM */}
        <div className="form-card">
          <div className="form-grid">
            <div className="input-group">
              <label>Assign to User</label>
              <select
                value={form.user}
                onChange={(e) => setForm({ ...form, user: e.target.value })}
              >
                <option value="">-- Select User --</option>
                {loadingUsers ? (
                  <option>Loading users...</option>
                ) : (
                  users.map((u) => (
                    <option key={u._id} value={u._id}>
                      {u.name || "Unknown"} ({u.email})
                    </option>
                  ))
                )}
              </select>
            </div>

            <div className="input-group">
              <label>Remedy Name</label>
              <input
                placeholder="Enter remedy name..."
                value={form.remedyName}
                onChange={(e) => setForm({ ...form, remedyName: e.target.value })}
              />
            </div>

            <div className="input-group">
              <label>Type</label>
              <select
                value={form.remedyType}
                onChange={(e) => setForm({ ...form, remedyType: e.target.value })}
              >
                <option value="Mantra">Mantra</option>
                <option value="Gemstone">Gemstone</option>
                <option value="Yantra">Yantra</option>
                <option value="Pooja">Pooja</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <button className="btn-assign" onClick={create}>Assign Remedy</button>
          </div>
        </div>

        {/* JOURNEY CARDS */}
        <div className="cards-grid">
          {data.length === 0 && <p className="empty-msg">No journeys found.</p>}

          {data.map((r) => (
            <div key={r._id} className="journey-card">
              <div className="card-header">
                <span className="type-tag">{r.remedyType}</span>
                <span className={`status-tag ${r.status?.toLowerCase()}`}>
                  {r.status?.replace("_", " ")}
                </span>
              </div>

              <div className="card-content">
                <h3>{r.remedyName}</h3>
                <p><strong>User:</strong> {r.user?.name || "N/A"}</p>
                <p className="email-text"><strong>Email:</strong> {r.user?.email}</p>
              </div>

              <div className="card-actions">
                <button className="btn-action btn-start" onClick={() => updateStatus(r._id, "IN_PROGRESS")}>Start</button>
                <button className="btn-action btn-complete" onClick={() => updateStatus(r._id, "COMPLETED")}>Complete</button>
                <button className="btn-action btn-drop" onClick={() => updateStatus(r._id, "DROPPED")}>Drop</button>
                <button className="btn-action text-white bg-red-500 text-white px-4 py-2" onClick={() => remove(r._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}