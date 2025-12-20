import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CareersAdmin.css";

export default function CareersAdmin() {
  const [careers, setCareers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE = "https://astrobackend-5sr6.onrender.com/api/careers";

  const fetchCareers = async () => {
    try {
      const res = await axios.get(API_BASE);
      setCareers(res.data || []);
    } catch (err) {
      console.error("Error fetching careers:", err);
    }
  };

  const addCareer = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    try {
      setLoading(true);
      await axios.post(API_BASE, { title, description });
      setTitle("");
      setDescription("");
      fetchCareers();
    } catch (err) {
      console.error("Error adding career:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteCareer = async (id) => {
    if (!window.confirm("Are you sure you want to remove this position?")) return;
    try {
      await axios.delete(`${API_BASE}/${id}`);
      fetchCareers();
    } catch (err) {
      console.error("Error deleting career:", err);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  return (
    <div className="admin-wrapper">
      {/* <header className="admin-header">
        <h1>Careers Management</h1>
        <p>Post new job openings and manage current listings</p>
      </header> */}

      <main className="admin-main">
        {/* Form Section */}
        <section className="form-section">
          <form onSubmit={addCareer} className="admin-card">
            <h2 className="section-title">Add New Position</h2>
            <div className="input-group">
              <label>Job Title</label>
              <input
                type="text"
                placeholder="Software Engineer, Product Manager..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Description</label>
              <textarea
                placeholder="Detailed job description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="5"
              />
            </div>
            <button type="submit" className="primary-button" disabled={loading}>
              {loading ? "Processing..." : "Publish Vacancy"}
            </button>
          </form>
        </section>

        {/* Listings Section */}
        <section className="list-section">
          <div className="list-header">
            <h2 className="section-title">Current Listings</h2>
            <span className="count-badge">{careers.length} Active</span>
          </div>

          <div className="careers-grid">
            {careers.length === 0 ? (
              <div className="empty-state">No careers found in the database.</div>
            ) : (
              careers.map((career) => (
                <article key={career._id} className="career-item-card">
                  <div className="career-info">
                    <h3>{career.title}</h3>
                    <p>{career.description}</p>
                  </div>
                  <button
                    className="delete-button"
                    onClick={() => deleteCareer(career._id)}
                  >
                    Remove Listing
                  </button>
                </article>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}