import React, { useEffect, useState } from "react";
import { fetchTemplates, saveTemplate, deleteTemplate } from "../../api/api";
import "./TemplateEditor.css";

export default function TemplateEditor({ onSaved }) {
  const [type, setType] = useState("email");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("Hello {{name}}, your order {{orderId}} is confirmed.");
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const res = await fetchTemplates();
      setTemplates(res.data.data || []);
    } catch (err) {
      console.error("Error loading templates:", err);
    }
  };

  const resetForm = () => {
    setName("");
    setSubject("");
    setBody("Hello {{name}}, your order {{orderId}} is confirmed.");
  };

  const save = async () => {
    if (!name.trim() || !body.trim()) {
      alert("Please fill all required fields!");
      return;
    }
    setLoading(true);
    try {
      const payload = { name, type, body };
      if (type === "email") payload.subject = subject;
      await saveTemplate(payload);
      alert("✅ Template saved successfully!");
      resetForm();
      loadTemplates();
      if (onSaved) onSaved();
    } catch (err) {
      alert("❌ Error saving template.");
    } finally {
      setLoading(false);
    }
  };

  const removeTemplate = async (id) => {
    if (!window.confirm("Delete this template?")) return;
    try {
      await deleteTemplate(id);
      loadTemplates();
    } catch (err) {
      alert("Error deleting template");
    }
  };

  return (
    <div className="template-container">
      <header className="template-header">
        <h2  className="hidden:md:block"> Message Templates</h2>
        <p>Create and customize templates for automated outreach.</p>
      </header>

      <div className="template-form-card">
        <div className="template-input-row">
          <div className="template-field" style={{ flex: 2 }}>
            <label className="template-label">Template Name *</label>
            <input 
              className="template-input"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="e.g. Booking Confirmation" 
            />
          </div>
          <div className="template-field">
            <label className="template-label">Channel *</label>
            <select className="template-select" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="email">📧 Email</option>
              <option value="whatsapp">💬 WhatsApp</option>
            </select>
          </div>
        </div>

        {type === "email" && (
          <div className="template-field" style={{ marginBottom: '1.25rem' }}>
            <label className="template-label">Subject Line *</label>
            <input 
              className="template-input"
              value={subject} 
              onChange={(e) => setSubject(e.target.value)} 
              placeholder="What the user sees in their inbox" 
            />
          </div>
        )}

        <div className="template-field" style={{ marginBottom: '1.5rem' }}>
          <label className="template-label">Message Content *</label>
          <textarea 
            className="template-textarea"
            value={body} 
            onChange={(e) => setBody(e.target.value)} 
            placeholder="Type your message... use {{name}} for dynamic data." 
          />
        </div>

        <button 
          className="template-save-btn"
          onClick={save} 
          disabled={loading}
        >
          {loading ? "Saving Template..." : "💾 Save Template"}
        </button>
      </div>

      <div className="template-list-section">
        <h3>Saved Templates</h3>
        <div className="template-grid">
          {templates.length === 0 ? (
            <p className="empty-text">No templates available yet.</p>
          ) : (
            templates.map((t) => (
              <div key={t._id} className="template-card">
                <div className="card-content">
                  <span className="badge">{t.type.toUpperCase()}</span>
                  <span className="card-name">{t.name}</span>
                </div>
                <button 
                  className="delete-icon-btn" 
                  onClick={() => removeTemplate(t._id)}
                  title="Delete Template"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}