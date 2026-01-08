import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminAffirmations.css";

export default function AdminAffirmations() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");

  const API = axios.create({
    baseURL: "http://localhost:7000/api",
  });

  /* ================= LOAD ================= */
  const load = async () => {
    try {
      const res = await API.get("/affirmations");
      setList(res.data.data || res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  /* ================= IMAGE PREVIEW ================= */
  const handleImage = (file) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ================= SUBMIT (ADD / UPDATE) ================= */
  const submit = async (e) => {
    e.preventDefault();
    if (!text) return alert("Text required");

    try {
      setLoading(true);
      const fd = new FormData();
      fd.append("text", text);
      if (image) fd.append("image", image);

      if (editing) {
        await API.put(`/affirmations/${editing._id}`, fd);
      } else {
        if (!image) return alert("Image required");
        await API.post("/affirmations", fd);
      }

      resetForm();
      load();
    } catch (err) {
      alert("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const remove = async (id) => {
    if (!window.confirm("Delete this affirmation?")) return;
    await API.delete(`/affirmations/${id}`);
    load();
  };

  /* ================= EDIT ================= */
  const edit = (item) => {
    setEditing(item);
    setText(item.text);
    setPreview(item.image);
    setImage(null);
  };

  const resetForm = () => {
    setText("");
    setImage(null);
    setPreview(null);
    setEditing(null);
  };

  /* ================= FILTER ================= */
  const filtered = list.filter((a) =>
    a.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="affirmations-admin">
      <h2 className="affirmations-title">AFFIRMATIONS</h2>

      {/* SEARCH */}
      <input
        className="affirmation-search"
        placeholder="Search affirmations..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FORM */}
      <form className="affirmation-form" onSubmit={submit}>
        <input
          type="text"
          placeholder="Enter affirmation text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImage(e.target.files[0])}
        />

        {preview && (
          <img src={preview} className="preview-image" alt="preview" />
        )}

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading
              ? "Saving..."
              : editing
              ? "Update Affirmation"
              : "Add Affirmation"}
          </button>

          {editing && (
            <button type="button" className="cancel-btn" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* LIST */}
      <div className="affirmations-grid">
        {filtered.length === 0 && <p>No affirmations found</p>}

        {filtered.map((a) => (
          <div className="affirmation-card" key={a._id}>
            <img src={a.image} alt="affirmation" />
            <p>{a.text}</p>

            <div className="card-actions">
              <button onClick={() => edit(a)}>Edit</button>
              <button className="danger" onClick={() => remove(a._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
