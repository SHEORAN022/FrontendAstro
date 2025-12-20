import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  PieChart, Pie, Cell, Tooltip, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer
} from "recharts";
import API from "../api/api";
import io from "socket.io-client";
import "./Reports.css"; // We will create this file below

Modal.setAppElement("#root");
const socket = io(process.env.REACT_APP_BACKEND_URL || "https://astrobackend-5sr6.onrender.com");

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];
const ALL_REPORT_TYPES = ["remedy", "consultation", "analysis", "custom"];

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [topServices, setTopServices] = useState([]);
  const [remedyCompletion, setRemedyCompletion] = useState({});
  const [callSuccess, setCallSuccess] = useState({});
  const [filterService, setFilterService] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("create");
  const [formData, setFormData] = useState({
    title: "", service: "", revenue: "", status: "pending",
    reportType: "consultation", completedAt: "", clientName: "", astrologerName: "",
  });

  const fetchReports = async () => {
    try {
      const query = [];
      if (filterService) query.push(`service=${encodeURIComponent(filterService)}`);
      if (filterDate) query.push(`date=${filterDate}`);
      const res = await API.get(`/reports${query.length ? "?" + query.join("&") : ""}`);
      setReports(res.data.data || []);
    } catch (err) { console.error("Fetch Error:", err); }
  };

  const fetchAnalytics = async () => {
    try {
      const [rev, top, rem, call] = await Promise.all([
        API.get("/reports/analytics/revenue-by-service"),
        API.get("/reports/analytics/top-services"),
        API.get("/reports/analytics/remedy-completion-rate"),
        API.get("/reports/analytics/call-success-rate"),
      ]);
      setRevenueData(rev.data.data || []);
      setTopServices(top.data.data || []);
      setRemedyCompletion(rem.data.data || {});
      setCallSuccess(call.data.data || {});
    } catch (err) { console.error("Analytics Error:", err); }
  };

  useEffect(() => {
    fetchReports();
    fetchAnalytics();
    socket.on("reportUpdate", () => { fetchReports(); fetchAnalytics(); });
    return () => socket.off("reportUpdate");
  }, [filterService, filterDate]);

  const openModal = (type, report = null) => {
    setModalType(type);
    if (report) {
      setFormData({
        ...report,
        completedAt: report.completedAt ? new Date(report.completedAt).toISOString().split("T")[0] : "",
      });
    } else {
      setFormData({ title: "", service: "", revenue: "", status: "pending", reportType: "consultation", completedAt: "", clientName: "", astrologerName: "" });
    }
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      modalType === "create" ? await API.post("/reports", formData) : await API.put(`/reports/${formData._id}`, formData);
      fetchReports(); fetchAnalytics(); setIsModalOpen(false);
    } catch (err) { alert("Save failed"); }
  };

  return (
    <div className="reports-container">
      <h1 className="page-title"> Reports & Analytics</h1>

      {/* Filters Bar */}
      <div className="filters-bar">
        <select value={filterService} onChange={(e) => setFilterService(e.target.value)} className="custom-input">
          <option value="">Filter by Service</option>
          {ALL_REPORT_TYPES.map(t => <option key={t} value={t}>{t.toUpperCase()}</option>)}
        </select>
        <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="custom-input" />
        <button onClick={() => { setFilterService(""); setFilterDate(""); }} className="btn-blue">Clear</button>
        <button onClick={() => openModal("create")} className="btn-green">+ Add Report</button>
      </div>

      {/* Stat Cards */}
      <div className="stats-grid">
        <StatCard title=" Total Revenue" value={`₹${revenueData.reduce((a, c) => a + (c.totalRevenue || 0), 0)}`} />
        <StatCard title=" Top Services" value={topServices.map(s => s._id).join(", ") || "—"} />
        <StatCard title=" Remedy Rate" value={`${remedyCompletion.rate || 0}%`} />
        <StatCard title=" Call Success" value={`${callSuccess.rate || 0}%`} />
      </div>

      {/* Charts Grid - Uses ResponsiveContainer to prevent overflow */}
      <div className="charts-grid">
        <div className="chart-box">
          <h3>Revenue by Service</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={revenueData} dataKey="totalRevenue" nameKey="_id" cx="50%" cy="50%" outerRadius={80} label>
                {revenueData.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Top Services Usage</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topServices}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Responsive Table - Turns to Cards on Mobile */}
      <h3>All Reports</h3>
      <div className="table-wrapper">
        <table className="responsive-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Revenue</th>
              <th>Status</th>
              <th>Client</th>
              <th>Astrologer</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r._id}>
                <td data-label="Title">{r.title}</td>
                <td data-label="Type">{r.reportType}</td>
                <td data-label="Revenue">₹{r.revenue}</td>
                <td data-label="Status">{r.status}</td>
                <td data-label="Client">{r.clientName || "-"}</td>
                <td data-label="Astrologer">{r.astrologerName || "-"}</td>
                <td data-label="Date">{r.completedAt ? new Date(r.completedAt).toLocaleDateString() : "-"}</td>
                <td data-label="Actions">
                  <button className="btn-sm-blue" onClick={() => openModal("update", r)}>Edit</button>
                  <button className="btn-sm-red" onClick={() => { if(window.confirm("Delete?")) API.delete(`/reports/${r._id}`).then(fetchReports) }}>Del</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="custom-modal" overlayClassName="custom-overlay">
        <h2>{modalType === "create" ? "Add New Report" : "Edit Report"}</h2>
        <div className="modal-grid">
           <input placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="custom-input" />
           <select value={formData.reportType} onChange={e => setFormData({...formData, reportType: e.target.value})} className="custom-input">
              {ALL_REPORT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
           </select>
           <input type="number" placeholder="Revenue" value={formData.revenue} onChange={e => setFormData({...formData, revenue: e.target.value})} className="custom-input" />
           <input placeholder="Client" value={formData.clientName} onChange={e => setFormData({...formData, clientName: e.target.value})} className="custom-input" />
           <input type="date" value={formData.completedAt} onChange={e => setFormData({...formData, completedAt: e.target.value})} className="custom-input" />
           <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="custom-input">
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
           </select>
        </div>
        <div className="modal-actions">
          <button onClick={handleSave} className="btn-green">Save</button>
          <button onClick={() => setIsModalOpen(false)} className="btn-red">Cancel</button>
        </div>
      </Modal>
    </div>
  );
}

const StatCard = ({ title, value }) => (
  <div className="stat-card">
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
);