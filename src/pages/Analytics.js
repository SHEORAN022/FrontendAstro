import React, { useEffect, useState } from "react";
import { fetchAnalytics, createAnalytics, deleteAnalytics } from "../api/analyticsApi";
import "./Analytics.css";

export default function Analytics() {
  const [analyticsList, setAnalyticsList] = useState([]);
  const [type, setType] = useState("");
  const [data, setData] = useState("{}");
  const [loading, setLoading] = useState(false);

  useEffect(() => { loadAnalytics(); }, []);

  const loadAnalytics = async () => {
    try {
      const res = await fetchAnalytics();
      setAnalyticsList(res.data.data || []);
    } catch (err) { console.error("Load failed"); }
  };

  const saveAnalytics = async () => {
    if (!type) return alert("Enter type");
    try {
      const parsedData = JSON.parse(data);
      setLoading(true);
      await createAnalytics({ type, data: parsedData });
      setType(""); setData("{}");
      loadAnalytics();
    } catch { alert("Invalid JSON format"); } finally { setLoading(false); }
  };

  return (
    <div className="analytics-page">
      <div className="analytics-container">
        
        <header className="page-header">
          <h1> Analytics Dashboard</h1>
          <p>Real-time data insights and report management</p>
        </header>

        {/* 1. GRAPH SECTION - RESPONSIVE CONTAINER */}
        <div className="charts-section">
          <div className="chart-wrapper">
             {/* Replace this div with your actual Chart component (Chart.js, Recharts, etc.) */}
             <div className="chart-placeholder">
                <p>Interactive Graph Container</p>
                <span>(Automatically scales to fit screen)</span>
             </div>
          </div>
        </div>

        {/* 2. INPUT FORM */}
        <div className="form-section">
          <div className="form-row">
            <div className="input-group">
              <label>Report Name</label>
              <input value={type} onChange={e => setType(e.target.value)} placeholder="e.g. User Retention" />
            </div>
            <div className="input-group">
              <label>JSON Payload</label>
              <textarea value={data} onChange={e => setData(e.target.value)} rows={3} placeholder='{"status": "active"}' />
            </div>
          </div>
          <button className="main-btn" onClick={saveAnalytics} disabled={loading}>
            {loading ? "Generating..." : "Save Analytics"}
          </button>
        </div>

        {/* 3. DATA LIST (TABLE ON DESKTOP / CARDS ON MOBILE) */}
        <div className="data-list-wrapper">
          <div className="data-header">
            <span>Type</span>
            <span>Data Preview</span>
            <span>Date</span>
            <span className="text-right">Action</span>
          </div>

          <div className="data-rows">
            {analyticsList.length === 0 ? (
              <div className="empty-row">No records found.</div>
            ) : (
              analyticsList.map(a => (
                <div key={a._id} className="data-row-item">
                  <div className="col type-col" data-label="Type">
                    <span className="pill">{a.type}</span>
                  </div>
                  <div className="col data-col" data-label="Data Preview">
                    <code>{JSON.stringify(a.data)}</code>
                  </div>
                  <div className="col date-col" data-label="Created At">
                    {new Date().toLocaleDateString()}
                  </div>
                  <div className="col action-col text-right">
                    <button className="del-btn" onClick={() => deleteAnalytics(a._id).then(loadAnalytics)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}