import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ContactMessages.css";

const API = "https://astrobackend-5sr6.onrender.com/api/contact";

export default function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const loadData = async () => {
    try {
      const res = await axios.get(API);
      if (res.data.success) setMessages(res.data.messages);
    } catch (err) {
      console.error("Loading error:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      const res = await axios.post(API, form);
      if (res.data.success) {
        loadData();
        resetForm();
      }
    } catch (err) {
      console.error("Create failed:", err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API}/${editing}`, form);
      resetForm();
      loadData();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const deleteMsg = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      loadData();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const editMsg = (msg) => {
    setEditing(msg._id);
    setShowForm(true);
    setForm({
      fullName: msg.fullName,
      email: msg.email,
      phone: msg.phone,
      service: msg.service,
      message: msg.message,
    });
  };

  const resetForm = () => {
    setEditing(null);
    setShowForm(false);
    setForm({
      fullName: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
  };

  return (
    <div className="contact-admin-container">
     

      {showForm && (
        <div className="form-card">
          <h3>{editing ? "Update Record" : "Create New Record"}</h3>
          <div className="form-grid">
            <input
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
            />
            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            <input
              name="phone"
              placeholder="Phone"
              value={form.phone}
            onChange={handleChange}
            />
            <select name="service" value={form.service} onChange={handleChange}>
              <option value="">Select Service</option>
              <option value="love">Love & Relationship</option>
              <option value="career">Career Astrology</option>
              <option value="vastu">Vastu Consultation</option>
              <option value="numerology">Numerology Reading</option>
            </select>
            <textarea
              name="message"
              className="full-span"
              placeholder="Message description..."
              value={form.message}
              onChange={handleChange}
              rows="3"
            />
          </div>
          <div className="form-actions">
            <button className="btn-save" onClick={editing ? handleUpdate : handleCreate}>
              {editing ? "Update Changes" : "Save Entry"}
            </button>
            <button className="btn-cancel" onClick={resetForm}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="table-wrapper">
        <table className="responsive-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Service</th>
              <th>Message</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.length > 0 ? (
              messages.map((msg) => (
                <tr key={msg._id}>
                  <td data-label="Name">{msg.fullName}</td>
                  <td data-label="Email">{msg.email}</td>
                  <td data-label="Phone">{msg.phone}</td>
                  <td data-label="Service">{msg.service}</td>
                  <td data-label="Message">{msg.message}</td>
                  <td data-label="Created">{new Date(msg.createdAt).toLocaleDateString()}</td>
                  <td data-label="Actions">
                    <div className="action-btns">
                      <button className="edit-btn" onClick={() => editMsg(msg)}>Edit</button>
                      <button className="delete-btn" onClick={() => deleteMsg(msg._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="empty-row">
                <td colSpan="7">No messages found in the records.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}