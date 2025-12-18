import React, { useEffect, useState } from "react";
import axios from "axios";

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

  /* ================= LOAD REMEDIES ================= */
  const load = async () => {
    try {
      const res = await axios.get(API);
      setData(res.data || []);
    } catch (err) {
      console.error("Load remedies error", err);
    }
  };

  /* ================= LOAD USERS ================= */
  const loadUsers = async () => {
    try {
      setLoadingUsers(true);
      const res = await axios.get(USERS_API);

      // 🔥 FIX HERE
      setUsers(res.data?.data || []);
    } catch (err) {
      console.error("Load users error", err);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    load();
    loadUsers();
  }, []);

  /* ================= CREATE ================= */
  const create = async () => {
    if (!form.user || !form.remedyName) {
      alert("Select user & enter remedy name");
      return;
    }

    try {
      await axios.post(API, form);
      setForm({ user: "", remedyName: "", remedyType: "Mantra" });
      load();
    } catch (err) {
      console.error("Create error", err);
      alert("Failed to assign remedy");
    }
  };

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API}/${id}/status`, { status });
      load();
    } catch (err) {
      console.error("Update status error", err);
    }
  };

  /* ================= DELETE ================= */
  const remove = async (id) => {
    if (!window.confirm("Delete remedy?")) return;

    try {
      await axios.delete(`${API}/${id}`);
      load();
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🌿 Remedy Journey (Admin)</h2>

      {/* ================= CREATE FORM ================= */}
      <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
        <select
          value={form.user}
          onChange={(e) => setForm({ ...form, user: e.target.value })}
        >
          <option value="">Select User</option>

          {loadingUsers ? (
            <option>Loading users...</option>
          ) : (
            users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name || "User"} ({u.email})
              </option>
            ))
          )}
        </select>

        <input
          placeholder="Remedy Name"
          value={form.remedyName}
          onChange={(e) =>
            setForm({ ...form, remedyName: e.target.value })
          }
        />

        <select
          value={form.remedyType}
          onChange={(e) =>
            setForm({ ...form, remedyType: e.target.value })
          }
        >
          <option value="Mantra">Mantra</option>
          <option value="Gemstone">Gemstone</option>
          <option value="Yantra">Yantra</option>
          <option value="Pooja">Pooja</option>
          <option value="Other">Other</option>
        </select>

        <button onClick={create}>Assign Remedy</button>
      </div>

      <hr />

      {/* ================= TABLE ================= */}
      <table width="100%" border="1" cellPadding="8">
        <thead>
          <tr>
            <th>User</th>
            <th>Remedy</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan="5" align="center">
                No remedies assigned
              </td>
            </tr>
          )}

          {data.map((r) => (
            <tr key={r._id}>
              <td>
                <strong>{r.user?.name}</strong>
                <br />
                <small>{r.user?.email}</small>
              </td>
              <td>{r.remedyName}</td>
              <td>{r.remedyType}</td>
              <td>{r.status}</td>
              <td>
                <button onClick={() => updateStatus(r._id, "IN_PROGRESS")}>
                  Start
                </button>{" "}
                <button onClick={() => updateStatus(r._id, "COMPLETED")}>
                  Complete
                </button>{" "}
                <button onClick={() => updateStatus(r._id, "DROPPED")}>
                  Drop
                </button>{" "}
                <button onClick={() => remove(r._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
