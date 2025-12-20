import React, { useState, useEffect } from "react";
import {
  fetchVault,
  uploadContent,
  updateVaultItem,
  deleteVaultItem,
} from "../api/api";
import "./ContentVaultManager.css";

export default function ContentVaultManager() {
  const [contentList, setContentList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    id: null,
    title: "",
    type: "pdf",
    access: "free",
    tags: "",
    file: null,
    fileUrl: "",
    publicId: "",
    scheduledDate: "",
  });
  const [loading, setLoading] = useState(false);

  const loadContent = async () => {
    setLoading(true);
    try {
      const res = await fetchVault();
      setContentList(res.data.data || []);
    } catch (err) {
      console.error("Failed to load content:", err);
      setContentList([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadContent();
  }, []);

  const saveItem = async () => {
    if (!currentItem.title.trim()) return alert("Title cannot be empty!");
    const formData = new FormData();
    formData.append("title", currentItem.title);
    formData.append("type", currentItem.type);
    formData.append("access", currentItem.access);
    formData.append("tags", currentItem.tags);
    formData.append("publicId", currentItem.publicId || "");
    if (currentItem.scheduledDate) formData.append("scheduledDate", currentItem.scheduledDate);
    if (currentItem.file) {
      formData.append("file", currentItem.file);
      formData.append("oldFileUrl", currentItem.fileUrl || "");
    }

    try {
      if (currentItem.id) await updateVaultItem(currentItem.id, formData);
      else await uploadContent(formData);
      setModalOpen(false);
      resetCurrentItem();
      loadContent();
    } catch (err) {
      alert("Failed to save content.");
    }
  };

  const resetCurrentItem = () => {
    setCurrentItem({
      id: null, title: "", type: "pdf", access: "free",
      tags: "", file: null, fileUrl: "", publicId: "", scheduledDate: "",
    });
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Delete this content?")) return;
    try {
      await deleteVaultItem(id);
      loadContent();
    } catch (err) {
      alert("Failed to delete content.");
    }
  };

  const renderFileInTable = (item) => {
    if (!item.fileUrl) return <span className="no-file">No File</span>;
    const url = item.fileUrl;
    switch (item.type) {
      case "pdf": return <a href={url} className="file-link" target="_blank" rel="noreferrer">View PDF</a>;
      case "audio": return <audio controls src={url} className="table-audio" />;
      case "video": return <video src={url} controls className="table-video" />;
      default: return <a href={url} className="file-link" target="_blank" rel="noreferrer">Open File</a>;
    }
  };

  const formatDate = (dateStr) => dateStr ? new Date(dateStr).toLocaleDateString() : "-";

  return (
    <div className="vault-container">
      <div className="vault-header">
        <h1>Content Vault</h1>
        <button className="btn-add" onClick={() => { resetCurrentItem(); setModalOpen(true); }}>
          Add New Content
        </button>
      </div>

      {loading ? (
        <div className="loading-state">Updating Vault...</div>
      ) : (
        <div className="table-wrapper">
          <table className="vault-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Access</th>
                <th>Scheduled</th>
                <th>Preview</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contentList.map((item) => (
                <tr key={item._id}>
                  <td data-label="Title" className="title-cell">{item.title}</td>
                  <td data-label="Type"><span className={`badge type-${item.type}`}>{item.type}</span></td>
                  <td data-label="Access"><span className={`badge access-${item.access}`}>{item.access}</span></td>
                  <td data-label="Scheduled">{formatDate(item.scheduledDate)}</td>
                  <td data-label="Preview">{renderFileInTable(item)}</td>
                  <td data-label="Actions" className="actions-cell">
                    <button className="btn-edit" onClick={() => {
                       setCurrentItem({
                        id: item._id, title: item.title, type: item.type,
                        access: item.access, tags: item.tags?.join(",") || "",
                        file: null, fileUrl: item.fileUrl, publicId: item.publicId || "",
                        scheduledDate: item.scheduledDate ? item.scheduledDate.slice(0, 16) : "",
                      });
                      setModalOpen(true);
                    }}>Edit</button>
                    <button className="bg-red-500 text-white px-4 py-2 text-white" onClick={() => deleteItem(item._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{currentItem.id ? "Edit Item" : "Upload Content"}</h3>
            <div className="modal-form">
              <input placeholder="Item Title" value={currentItem.title} onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })} />
              <div className="form-row">
                <select value={currentItem.type} onChange={(e) => setCurrentItem({ ...currentItem, type: e.target.value })}>
                  <option value="pdf">PDF</option>
                  <option value="audio">Audio</option>
                  <option value="video">Video</option>
                </select>
                <select value={currentItem.access} onChange={(e) => setCurrentItem({ ...currentItem, access: e.target.value })}>
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
                  <option value="program">Program</option>
                </select>
              </div>
              <input placeholder="Tags (comma separated)" value={currentItem.tags} onChange={(e) => setCurrentItem({ ...currentItem, tags: e.target.value })} />
              <input type="datetime-local" value={currentItem.scheduledDate} onChange={(e) => setCurrentItem({ ...currentItem, scheduledDate: e.target.value })} />
              <div className="file-upload">
                <label>Upload File</label>
                <input type="file" onChange={(e) => setCurrentItem({ ...currentItem, file: e.target.files[0] })} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-save" onClick={saveItem}>Save Changes</button>
              <button className="btn-close" onClick={() => setModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}