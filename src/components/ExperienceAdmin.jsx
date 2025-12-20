import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EnergyServicesForm.css"; // reuse SAME css

const API = "https://astrobackend-5sr6.onrender.com/api/experience";

export default function ExperienceAdmin() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pdf, setPdf] = useState(null);
  const [data, setData] = useState([]);

  // ================= LOAD =================
  const load = async () => {
    const res = await axios.get(API);
    setData(res.data.data || []);
  };

  useEffect(() => {
    load();
  }, []);

  // ================= UPLOAD =================
  const upload = async (e) => {
    e.preventDefault();
    if (!pdf || !title) return alert("Title & PDF required");

    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    fd.append("pdf", pdf);

    await axios.post(`${API}/upload`, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setTitle("");
    setDescription("");
    setPdf(null);
    load();
  };

  // ================= DELETE =================
  const remove = async (id) => {
    if (!window.confirm("Delete this experience?")) return;
    await axios.delete(`${API}/${id}`);
    load();
  };

  return (
    <div className="energy-wrapper">
      <h2 className="energy-title">Experience PDF – Admin Panel</h2>

      {/* FORM */}
      <form onSubmit={upload} className="energy-form">
        <input
          className="energy-input"
          type="text"
          placeholder="Experience Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="energy-textarea"
          placeholder="Short Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="energy-input"
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdf(e.target.files[0])}
          required
        />

        <div className="energy-btn-group">
          <button type="submit" className="btn-primary">
            Upload PDF
          </button>
        </div>
      </form>

      {/* TABLE */}
      <h3 className="energy-subtitle">Uploaded Experiences</h3>

      <div className="energy-table-wrapper">
        <table className="energy-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>PDF</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.length ? (
              data.map((item) => (
                <tr key={item._id}>
                  <td data-label="Title">{item.title}</td>
                  <td data-label="Description">
                    {item.description || "-"}
                  </td>
                  <td data-label="PDF">
                    <a
                      href={item.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View PDF
                    </a>
                  </td>
                  <td
                    data-label="Actions"
                    className="energy-actions"
                  >
                    <button
                      onClick={() => remove(item._id)}
                      className="bg-red-500 text-white px-4 py-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No experience PDFs found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
