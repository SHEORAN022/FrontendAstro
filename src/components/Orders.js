
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EnergyServicesForm.css";

/* ✅ DIRECT LIVE BACKEND API (NO ENV ISSUE) */
const API = "https://astrobackend-5sr6.onrender.com/api/orders";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    email: "",
    serviceType: "",
    price: "",
    status: "Pending",
    file: null,
    oldFileUrl: "", // ✅ for update image replace
  });

  // ================= FETCH =================
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}?search=${search}`);
      setOrders(Array.isArray(res.data.orders) ? res.data.orders : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [search]);

  // ================= CHANGE =================
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length) {
      setForm({ ...form, file: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) fd.append(key, value);
    });

    try {
      if (editingId) {
        await axios.put(`${API}/${editingId}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(API, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      resetForm();
      fetchOrders();
    } catch (err) {
      console.error("Save failed:", err);
      alert("Order save failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE =================
  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;

    try {
      await axios.delete(`${API}/${id}`);
      fetchOrders();
    } catch (err) {
      alert("Delete failed");
    }
  };

  // ================= EDIT =================
  const editOrder = (order) => {
    setEditingId(order._id);
    setForm({
      customerName: order.customerName,
      email: order.email,
      serviceType: order.serviceType,
      price: order.price,
      status: order.status,
      file: null,
      oldFileUrl: order.fileUrl || "",
    });
  };

  // ================= RESET =================
  const resetForm = () => {
    setEditingId(null);
    setForm({
      customerName: "",
      email: "",
      serviceType: "",
      price: "",
      status: "Pending",
      file: null,
      oldFileUrl: "",
    });
  };

  return (
    <div className="energy-wrapper">
      <h2 className="energy-title">Order Management – Admin Panel</h2>

      {/* SEARCH */}
      <input
        className="energy-input"
        type="text"
        placeholder="Search by customer name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ maxWidth: 300, marginBottom: 20 }}
      />

      {/* FORM */}
      <form className="energy-form" onSubmit={handleSubmit}>
        <input
          className="energy-input"
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={form.customerName}
          onChange={handleChange}
          required
        />

        <input
          className="energy-input"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          className="energy-input"
          type="text"
          name="serviceType"
          placeholder="Service Type"
          value={form.serviceType}
          onChange={handleChange}
          required
        />

        <input
          className="energy-input"
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <select
          className="energy-input"
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <input
          className="energy-input"
          type="file"
          name="file"
          onChange={handleChange}
        />

        <div className="energy-btn-group">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading
              ? "Saving..."
              : editingId
              ? "Update Order"
              : "Create Order"}
          </button>

          {editingId && (
            <button
              type="button"
              className="btn-secondary"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* TABLE */}
      <h3 className="energy-subtitle">All Orders</h3>

      <div className="energy-table-wrapper">
        <table className="energy-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Service</th>
              <th>Price</th>
              <th>Status</th>
              <th>File</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.length ? (
              orders.map((o) => (
                <tr key={o._id}>
                  <td>{o.customerName}</td>
                  <td>{o.email}</td>
                  <td>{o.serviceType}</td>
                  <td>₹{o.price}</td>
                  <td>{o.status}</td>
                  <td>
                    {o.fileUrl ? (
                      <a href={o.fileUrl} target="_blank" rel="noreferrer">
                        View
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="energy-actions">
                    <button
                      className="btn-edit"
                      onClick={() => editOrder(o)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2"
                      onClick={() => deleteOrder(o._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
