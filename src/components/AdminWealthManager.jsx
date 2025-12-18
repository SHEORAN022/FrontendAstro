import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://astrobackend-5sr6.onrender.com/api/wealth";

export default function AdminWealthManager() {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= LOAD ================= */
  const load = async () => {
    const res = await axios.get(API);
    setList(res.data.data || []);
  };

  useEffect(() => {
    load();
  }, []);

  /* ================= UPLOAD ================= */
  const upload = async () => {
    if (!title || !file) {
      alert("Title & PDF required");
      return;
    }

    const fd = new FormData();
    fd.append("title", title);
    fd.append("file", file);

    try {
      setLoading(true);
      await axios.post(API, fd);
      setTitle("");
      setFile(null);
      load();
    } catch (err) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const remove = async (id) => {
    if (!window.confirm("Delete this PDF?")) return;
    await axios.delete(`${API}/${id}`);
    load();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>💰 My Wealth Tools (Admin)</h2>

      {/* ===== UPLOAD FORM ===== */}
      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 20,
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="PDF Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: 8, flex: 1 }}
        />

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button onClick={upload} disabled={loading}>
          {loading ? "Uploading..." : "Upload PDF"}
        </button>
      </div>

      {/* ===== TABLE ===== */}
      <table
        width="100%"
        cellPadding="10"
        style={{
          borderCollapse: "collapse",
          background: "#111",
          color: "#fff",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <thead style={{ background: "#222" }}>
          <tr>
            <th align="left">#</th>
            <th align="left">Title</th>
            <th align="left">Preview</th>
            <th align="center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {list.length === 0 ? (
            <tr>
              <td colSpan="4" align="center" style={{ padding: 20 }}>
                No PDFs uploaded
              </td>
            </tr>
          ) : (
            list.map((item, index) => (
              <tr key={item._id} style={{ borderBottom: "1px solid #333" }}>
                <td>{index + 1}</td>
                <td>{item.title}</td>

                {/* PREVIEW */}
                <td>
                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#00eaff" }}
                  >
                    View PDF
                  </a>
                </td>

                {/* ACTIONS */}
                <td align="center">
                  <button
                    onClick={() => remove(item._id)}
                    style={{
                      background: "red",
                      color: "#fff",
                      border: "none",
                      padding: "6px 10px",
                      cursor: "pointer",
                      borderRadius: 4,
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
