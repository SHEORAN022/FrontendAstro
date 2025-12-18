import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Bell, Plus, Trash2, Edit2 } from "lucide-react";
import { io } from "socket.io-client";

/* ================= CONFIG ================= */
const API_URL =
  process.env.REACT_APP_API_URL || "https://astrobackend-5sr6.onrender.com/api";

const SOCKET_URL =
  process.env.REACT_APP_SOCKET_URL || "https://astrobackend-5sr6.onrender.com";

/* ================= COMPONENT ================= */
export default function AdminRelationshipPanel() {
  const socketRef = useRef(null);

  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    type: "BIRTHDAY",
    message: "",
    userName: "",
    userPhone: "",
  });

  /* ================= FETCH ================= */
  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin-notifications`);
      const list = res.data?.data || res.data || [];

      setNotifications(list);
      setUnreadCount(list.filter((n) => !n.read).length);
    } catch (err) {
      console.error("❌ Fetch notifications error:", err.message);
    }
  };

  /* ================= CREATE / UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.message || !form.userName || !form.userPhone) {
      alert("All fields are required");
      return;
    }

    try {
      if (editingId) {
        await axios.put(
          `${API_URL}/admin-notifications/${editingId}`,
          form
        );
      } else {
        await axios.post(`${API_URL}/admin-notifications`, form);
      }

      resetForm();
      fetchNotifications();
    } catch (err) {
      console.error("❌ Save error:", err.message);
    }
  };

  /* ================= DELETE ================= */
  const deleteNotification = async (id) => {
    if (!window.confirm("Delete this notification?")) return;

    try {
      await axios.delete(`${API_URL}/admin-notifications/${id}`);
      fetchNotifications();
    } catch (err) {
      console.error("❌ Delete error:", err.message);
    }
  };

  /* ================= MARK READ ================= */
  const markAsRead = async (id) => {
    try {
      await axios.put(`${API_URL}/admin-notifications/${id}/read`);
      fetchNotifications();
    } catch (err) {
      console.error("❌ Mark read error:", err.message);
    }
  };

  /* ================= EDIT ================= */
  const editNotification = (n) => {
    setEditingId(n._id);
    setForm({
      type: n.type,
      message: n.message,
      userName: n.userName,
      userPhone: n.userPhone,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setShowForm(false);
    setForm({
      type: "BIRTHDAY",
      message: "",
      userName: "",
      userPhone: "",
    });
  };

  /* ================= SOCKET INIT ================= */
  useEffect(() => {
    fetchNotifications();

    if (!socketRef.current) {
      socketRef.current = io(SOCKET_URL, {
        withCredentials: true,
        transports: ["websocket"], // 🔥 IMPORTANT FIX
      });
    }

    socketRef.current.on("adminNotification", (data) => {
      setNotifications((prev) => {
        const updated = [data, ...prev];
        setUnreadCount(updated.filter((n) => !n.read).length);
        return updated;
      });
    });

    return () => {
      socketRef.current?.off("adminNotification");
    };
  }, []);

  /* ================= UI ================= */
  return (
    <div>
      {/* 🔔 BELL */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "10px 16px",
          borderBottom: "1px solid #ddd",
        }}
      >
        <div
          style={{ position: "relative", cursor: "pointer" }}
          onClick={() => setOpen(!open)}
        >
          <Bell size={22} />
          {unreadCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: -6,
                right: -6,
                background: "red",
                color: "#fff",
                fontSize: 11,
                padding: "2px 6px",
                borderRadius: "50%",
              }}
            >
              {unreadCount}
            </span>
          )}
        </div>
      </div>

      {/* 🔽 PANEL */}
      {open && (
        <div style={{ padding: 20 }}>
          <h2>🎂 Relationship Intelligence Panel</h2>

          <button
            onClick={() => setShowForm(!showForm)}
            style={{ marginBottom: 12 }}
          >
            <Plus size={14} /> Add Notification
          </button>

          {/* 📝 FORM */}
          {showForm && (
            <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
              <select
                value={form.type}
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value })
                }
              >
                <option value="BIRTHDAY">Birthday</option>
                <option value="ANNIVERSARY">Anniversary</option>
              </select>

              <input
                placeholder="User Name"
                value={form.userName}
                onChange={(e) =>
                  setForm({ ...form, userName: e.target.value })
                }
                required
              />

              <input
                type="tel"
                placeholder="User Phone"
                value={form.userPhone}
                onChange={(e) =>
                  setForm({ ...form, userPhone: e.target.value })
                }
                required
              />

              <input
                placeholder="Message"
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                required
              />

              <div style={{ marginTop: 8 }}>
                <button type="submit">
                  {editingId ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  style={{ marginLeft: 8 }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* 📋 TABLE */}
          <table width="100%" cellPadding="8">
            <thead>
              <tr>
                <th>Type</th>
                <th>Message</th>
                <th>User</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {notifications.map((n) => (
                <tr key={n._id}>
                  <td>
                    {n.type === "BIRTHDAY"
                      ? "🎂 Birthday"
                      : "💍 Anniversary"}
                  </td>
                  <td>{n.message}</td>
                  <td>
                    {n.userName}
                    <br />
                    {n.userPhone}
                  </td>
                  <td>
                    {n.read ? (
                      "Read"
                    ) : (
                      <button onClick={() => markAsRead(n._id)}>
                        Mark Read
                      </button>
                    )}
                  </td>
                  <td>
                    <Edit2
                      size={14}
                      style={{ cursor: "pointer", marginRight: 8 }}
                      onClick={() => editNotification(n)}
                    />
                    <Trash2
                      size={14}
                      style={{ cursor: "pointer" }}
                      onClick={() => deleteNotification(n._id)}
                    />
                  </td>
                </tr>
              ))}

              {notifications.length === 0 && (
                <tr>
                  <td colSpan="5" align="center">
                    No notifications
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
