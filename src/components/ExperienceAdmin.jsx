import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ExperienceAdmin.css";

const API = "https://astrobackend-5sr6.onrender.com/api/experience";

export default function ExperienceAdmin() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pdf, setPdf] = useState(null);
  const [data, setData] = useState([]);

  const load = async () => {
    const res = await axios.get(API);
    setData(res.data.data || []);
  };

  useEffect(() => {
    load();
  }, []);

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

  const remove = async (id) => {
    if (!window.confirm("Delete this experience?")) return;
    await axios.delete(`${API}/${id}`);
    load();
  };

  return (
    <div className="exp-wrapper">
      <h2>📄 Experience PDF Manager</h2>

      <form onSubmit={upload} className="exp-form">
        <input
          placeholder="Experience Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Short description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdf(e.target.files[0])}
          required
        />

        <button>Upload PDF</button>
      </form>

      <hr />

      {data.map((item) => (
        <div key={item._id} className="exp-card">
          <div>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
            <a href={item.pdfUrl} target="_blank" rel="noreferrer">
              View PDF
            </a>
          </div>

          <button onClick={() => remove(item._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
