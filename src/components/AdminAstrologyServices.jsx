import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminAstrologyServices.css";

const API_BASE = "https://astrobackend-5sr6.onrender.com/api/astrology-services";

export default function AdminAstrologyServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
  });

  const [editId, setEditId] = useState(null);

  /* ================= FETCH ALL ================= */
  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/all`);
      setServices(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  /* ================= ADD / UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.price) {
      alert("All fields required");
      return;
    }

    try {
      const payload = { ...form, price: Number(form.price) };

      if (editId) {
        await axios.put(`${API_BASE}/update/${editId}`, payload);
        alert("Service updated");
      } else {
        await axios.post(`${API_BASE}/add`, payload);
        alert("Service added");
      }

      setForm({ title: "", description: "", price: "" });
      setEditId(null);
      fetchServices();
    } catch (err) {
      console.error("Submit error:", err.response?.data || err.message);
      alert("Failed to save service");
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (service) => {
    setEditId(service._id);
    setForm({
      title: service.title,
      description: service.description,
      price: service.price,
    });
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;

    try {
      await axios.delete(`${API_BASE}/delete/${id}`);
      fetchServices();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="admin-astro-services">
      <h2 className="page-title">Astrology Services</h2>

      {/* ===== FORM ===== */}
      <div className="card">
        <h3>{editId ? "Update Service" : "Add New Service"}</h3>

        <form onSubmit={handleSubmit} className="service-form">
          <input
            type="text"
            placeholder="Service Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <textarea
            placeholder="Service Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Price (₹)"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <div className="form-actions">
            <button type="submit" className="btn primary">
              {editId ? "Update Service" : "Add Service"}
            </button>

            {editId && (
              <button
                type="button"
                className="btn secondary"
                onClick={() => {
                  setEditId(null);
                  setForm({ title: "", description: "", price: "" });
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* ===== LIST ===== */}
      <div className="card">
        <h3>All Services</h3>

        {loading ? (
          <p className="info-text">Loading services...</p>
        ) : services.length === 0 ? (
          <p className="info-text">No services found</p>
        ) : (
          <div className="table-scroll">
            <table className="services-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {services.map((s) => (
                  <tr key={s._id}>
                    <td>{s.title}</td>
                    <td className="desc">{s.description}</td>
                    <td>₹{s.price}</td>
                    <td>
                      <span
                        className={`status ${
                          s.status === "active" ? "active" : "inactive"
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="actions">
                      <button
                        className="btn icon edit"
                        onClick={() => handleEdit(s)}
                      >
                        ✏
                      </button>
                      <button
                        className="btn icon delete"
                        onClick={() => handleDelete(s._id)}
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
