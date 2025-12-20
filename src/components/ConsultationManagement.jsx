
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import FullCalendar from "@fullcalendar/react";
// // import dayGridPlugin from "@fullcalendar/daygrid";
// // import timeGridPlugin from "@fullcalendar/timegrid";
// // import interactionPlugin from "@fullcalendar/interaction";
// // import "./ConsultationManagement.css";

// // const initialForm = {
// //   clientName: "",
// //   clientEmail: "",
// //   astrologerName: "",
// //   type: "Chat",
// //   status: "Pending",
// //   scheduledAt: "",
// //   notes: "",
// // };

// // export default function ConsultationManagement() {
// //   const [consultations, setConsultations] = useState([]);
// //   const [formData, setFormData] = useState(initialForm);
// //   const [editingId, setEditingId] = useState(null);
// //   const [showForm, setShowForm] = useState(false);
// //   const [search, setSearch] = useState("");
// //   const [filterAstrologer, setFilterAstrologer] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const API_URL = "https://astrobackend-5sr6.onrender.com/api/consultations"; // Backend URL

// //   // Fetch all consultations
// //   useEffect(() => {
// //     fetchConsultations();
// //   }, []);

// //   const fetchConsultations = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await axios.get(API_URL);
// //       setConsultations(res.data);
// //     } catch (err) {
// //       console.error("Error fetching consultations:", err);
// //       alert("❌ Error fetching consultations from backend.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Add / Update consultation
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!formData.clientName || !formData.astrologerName)
// //       return alert("Please fill all required fields.");

// //     try {
// //       setLoading(true);
// //       if (editingId) {
// //         await axios.put(`${API_URL}/${editingId}`, formData);
// //         alert("✅ Consultation updated successfully!");
// //       } else {
// //         const res = await axios.post(API_URL, formData);
// //         alert("✅ Consultation added! Email & Meet link sent.");
// //         console.log("New consultation:", res.data);
// //       }
// //       setFormData(initialForm);
// //       setEditingId(null);
// //       setShowForm(false);
// //       fetchConsultations();
// //     } catch (err) {
// //       console.error("❌ Error saving consultation:", err.response?.data || err.message);
// //       alert("❌ Error saving consultation. Check backend logs.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleEdit = (c) => {
// //     setFormData({
// //       ...c,
// //       scheduledAt: c.scheduledAt
// //         ? new Date(c.scheduledAt).toISOString().slice(0, 16)
// //         : "",
// //     });
// //     setEditingId(c._id);
// //     setShowForm(true);
// //   };

// //   const handleDelete = async (id) => {
// //     if (!window.confirm("Are you sure you want to delete this consultation?")) return;
// //     try {
// //       await axios.delete(`${API_URL}/${id}`);
// //       fetchConsultations();
// //       alert("🗑️ Consultation deleted successfully");
// //     } catch (err) {
// //       console.error("Error deleting consultation:", err);
// //       alert("❌ Error deleting consultation.");
// //     }
// //   };

// //   const filteredConsultations = consultations
// //     .filter(
// //       (c) =>
// //         (c.clientName || "").toLowerCase().includes(search.toLowerCase()) ||
// //         (c.astrologerName || "").toLowerCase().includes(search.toLowerCase())
// //     )
// //     .filter((c) => !filterAstrologer || c.astrologerName === filterAstrologer);

// //   const allAstrologers = Array.from(
// //     new Set(consultations.map((c) => c.astrologerName).filter(Boolean))
// //   );

// //   const calendarEvents = consultations.map((c) => ({
// //     id: c._id,
// //     title: `${c.clientName || "Client"} — ${c.status}`,
// //     start: c.scheduledAt,
// //   }));

// //   const onEventClick = (info) => {
// //     const c = consultations.find((x) => x._id === info.event.id);
// //     if (c) handleEdit(c);
// //   };

// //   return (
// //     <div className="consultation-management-main">
// //       <div className="consultation-card">
// //         <div className="consultation-header-row">
// //           <h2>Consultation Management</h2>
// //           <button
// //             className="add-btn"
// //             onClick={() => setShowForm(!showForm)}
// //             disabled={loading}
// //           >
// //             {showForm ? "Close Form" : "Add Consultation"}
// //           </button>
// //         </div>

// //         {showForm && (
// //           <form className="consultation-form" onSubmit={handleSubmit}>
// //             <input
// //               type="text"
// //               required
// //               placeholder="Client Name"
// //               value={formData.clientName}
// //               onChange={(e) =>
// //                 setFormData({ ...formData, clientName: e.target.value })
// //               }
// //             />
// //             <input
// //               type="email"
// //               placeholder="Client Email"
// //               value={formData.clientEmail}
// //               onChange={(e) =>
// //                 setFormData({ ...formData, clientEmail: e.target.value })
// //               }
// //             />
// //             <input
// //               type="text"
// //               required
// //               placeholder="Astrologer Name"
// //               value={formData.astrologerName}
// //               onChange={(e) =>
// //                 setFormData({ ...formData, astrologerName: e.target.value })
// //               }
// //             />
// //             <select
// //               value={formData.type}
// //               onChange={(e) =>
// //                 setFormData({ ...formData, type: e.target.value })
// //               }
// //             >
// //               <option value="Chat">Chat</option>
// //               <option value="Audio">Audio</option>
// //               <option value="Video">Video</option>
// //             </select>
// //             <select
// //               value={formData.status}
// //               onChange={(e) =>
// //                 setFormData({ ...formData, status: e.target.value })
// //               }
// //             >
// //               <option value="Pending">Pending</option>
// //               <option value="In Progress">In Progress</option>
// //               <option value="Completed">Completed</option>
// //             </select>
// //             <input
// //               type="datetime-local"
// //               value={formData.scheduledAt}
// //               onChange={(e) =>
// //                 setFormData({ ...formData, scheduledAt: e.target.value })
// //               }
// //             />
// //             <textarea
// //               placeholder="Notes"
// //               value={formData.notes}
// //               onChange={(e) =>
// //                 setFormData({ ...formData, notes: e.target.value })
// //               }
// //             />
// //             <div className="form-actions">
// //               <button type="submit" disabled={loading}>
// //                 {editingId ? "Update" : "Add"}
// //               </button>
// //               {editingId && (
// //                 <button
// //                   type="button"
// //                   className="cancel-btn"
// //                   onClick={() => {
// //                     setFormData(initialForm);
// //                     setEditingId(null);
// //                     setShowForm(false);
// //                   }}
// //                 >
// //                   Cancel
// //                 </button>
// //               )}
// //             </div>
// //           </form>
// //         )}

// //         <div className="search-row">
// //           <input
// //             type="text"
// //             className="search-bar"
// //             placeholder="Search client or astrologer..."
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //           />
// //           <select
// //             value={filterAstrologer}
// //             onChange={(e) => setFilterAstrologer(e.target.value)}
// //           >
// //             <option value="">All Astrologers</option>
// //             {allAstrologers.map((a) => (
// //               <option key={a} value={a}>
// //                 {a}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         {loading ? (
// //           <p>Loading...</p>
// //         ) : (
// //           <div className="consultation-layout">
// //             <div className="table-container">
// //               <table className="consultations-table">
// //                 <thead>
// //                   <tr>
// //                     <th>Client</th>
// //                     <th>Email</th>
// //                     <th>Astrologer</th>
// //                     <th>Type</th>
// //                     <th>Status</th>
// //                     <th>Schedule</th>
// //                     <th>Meet Link</th>
// //                     <th>Actions</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {filteredConsultations.length === 0 ? (
// //                     <tr>
// //                       <td colSpan={8}>No consultations found.</td>
// //                     </tr>
// //                   ) : (
// //                     filteredConsultations.map((c) => (
// //                       <tr key={c._id}>
// //                         <td>{c.clientName}</td>
// //                         <td>{c.clientEmail}</td>
// //                         <td>{c.astrologerName}</td>
// //                         <td>{c.type}</td>
// //                         <td>{c.status}</td>
// //                         <td>
// //                           {c.scheduledAt
// //                             ? new Date(c.scheduledAt).toLocaleString()
// //                             : ""}
// //                         </td>
// //                         <td>
// //                           {c.meetingLink ? (
// //                             <a
// //                               href={c.meetingLink}
// //                               target="_blank"
// //                               rel="noopener noreferrer"
// //                             >
// //                               Join
// //                             </a>
// //                           ) : (
// //                             "-"
// //                           )}
// //                         </td>
// //                         <td>
// //                           <button onClick={() => handleEdit(c)}>Edit</button>
// //                           <button onClick={() => handleDelete(c._id)}>
// //                             Delete
// //                           </button>
// //                         </td>
// //                       </tr>
// //                     ))
// //                   )}
// //                 </tbody>
// //               </table>
// //             </div>

// //             <div className="calendar-wrapper">
// //               <FullCalendar
// //                 plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
// //                 initialView="timeGridWeek"
// //                 events={calendarEvents}
// //                 eventClick={onEventClick}
// //                 height={550}
// //               />
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }



import React, { useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./ConsultationManagement.css";

const initialForm = {
  clientName: "", clientEmail: "", astrologerName: "",
  type: "Chat", status: "Pending", scheduledAt: "", notes: "",
};

export default function ConsultationManagement() {
  const [consultations, setConsultations] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [filterAstrologer, setFilterAstrologer] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("list"); // 'list' or 'calendar'

  const API_URL = "https://astrobackend-5sr6.onrender.com/api/consultations";

  useEffect(() => { fetchConsultations(); }, []);

  const fetchConsultations = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setConsultations(Array.isArray(res.data.consultations) ? res.data.consultations : []);
    } catch (err) {
      console.error("Error fetching consultations:", err);
    } finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      editingId 
        ? await axios.put(`${API_URL}/${editingId}`, formData)
        : await axios.post(API_URL, formData);
      
      setFormData(initialForm);
      setEditingId(null);
      setShowForm(false);
      fetchConsultations();
    } catch (err) { alert("Error saving data"); } finally { setLoading(false); }
  };

  const handleEdit = (c) => {
    setFormData({ ...c, scheduledAt: c.scheduledAt ? new Date(c.scheduledAt).toISOString().slice(0, 16) : "" });
    setEditingId(c._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredConsultations = Array.isArray(consultations)
    ? consultations.filter(c => 
        (c.clientName || "").toLowerCase().includes(search.toLowerCase()) ||
        (c.astrologerName || "").toLowerCase().includes(search.toLowerCase())
      ).filter(c => !filterAstrologer || c.astrologerName === filterAstrologer)
    : [];

  const calendarEvents = Array.isArray(consultations)
    ? consultations.map(c => ({ id: c._id, title: `👤 ${c.clientName}`, start: c.scheduledAt, color: c.status === 'Completed' ? '#10b981' : '#4f46e5' }))
    : [];

  return (
    <div className="cm-page-wrapper">
      <div className="cm-container">
        <header className="cm-header">
          {/* <h1>Consultation Panel</h1> */}
          <div className="cm-tabs">
            <button className={activeTab === 'list' ? 'active' : ''} onClick={() => setActiveTab('list')}>Management</button>
            <button className={activeTab === 'calendar' ? 'active' : ''} onClick={() => setActiveTab('calendar')}>Schedule</button>
          </div>
        </header>

        {activeTab === 'list' ? (
          <div className="cm-content fade-in">
            <div className="cm-top-bar">
              <div className="cm-search-group">
                <input type="text" placeholder="Search client..." value={search} onChange={(e) => setSearch(e.target.value)} />
                <select value={filterAstrologer} onChange={(e) => setFilterAstrologer(e.target.value)}>
                  <option value="">All Astrologers</option>
                  {[...new Set(consultations.map(c => c.astrologerName))].map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <button className="cm-add-btn" onClick={() => setShowForm(!showForm)}>
                {showForm ? "✕ Close" : "＋ New Consultation"}
              </button>
            </div>

            {showForm && (
              <div className="cm-form-card shadow-sm">
                <form onSubmit={handleSubmit} className="cm-grid-form">
                  <input type="text" placeholder="Client Name" value={formData.clientName} onChange={e => setFormData({...formData, clientName: e.target.value})} required />
                  <input type="email" placeholder="Email" value={formData.clientEmail} onChange={e => setFormData({...formData, clientEmail: e.target.value})} />
                  <input type="text" placeholder="Astrologer" value={formData.astrologerName} onChange={e => setFormData({...formData, astrologerName: e.target.value})} required />
                  <div className="cm-input-pair">
                    <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                      <option value="Chat">Chat</option><option value="Audio">Audio</option><option value="Video">Video</option>
                    </select>
                    <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                      <option value="Pending">Pending</option><option value="In Progress">In Progress</option><option value="Completed">Completed</option>
                    </select>
                  </div>
                  <input type="datetime-local" value={formData.scheduledAt} onChange={e => setFormData({...formData, scheduledAt: e.target.value})} />
                  <textarea placeholder="Notes" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} />
                  <button type="submit" className="cm-submit-btn">{editingId ? "Update Info" : "Save Consultation"}</button>
                </form>
              </div>
            )}

            <div className="cm-table-container shadow-sm">
              <table className="cm-responsive-table">
                <thead>
                  <tr>
                    <th>Client / Email</th>
                    <th>Expert</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Schedule</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredConsultations.map(c => (
                    <tr key={c._id}>
                      <td data-label="Client">
                        <div className="cm-client-cell">
                          <strong>{c.clientName}</strong>
                          <span>{c.clientEmail}</span>
                        </div>
                      </td>
                      <td data-label="Astrologer">{c.astrologerName}</td>
                      <td data-label="Type"><span className="cm-badge">{c.type}</span></td>
                      <td data-label="Status"><span className={`cm-status ${c.status.replace(/\s+/g, '-').toLowerCase()}`}>{c.status}</span></td>
                      <td data-label="Schedule">{new Date(c.scheduledAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</td>
                      <td data-label="Actions">
                        <div className="cm-action-btns">
                          <button onClick={() => handleEdit(c)} className="edit">Edit</button>
                          <button onClick={() => handleDelete(c._id)} className="del">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="cm-calendar-container fade-in">
            <div className="cm-calendar-card shadow-sm">
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek' }}
                events={calendarEvents}
                eventClick={(info) => {
                  const c = consultations.find(x => x._id === info.event.id);
                  if (c) { handleEdit(c); setActiveTab('list'); }
                }}
                height="auto"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}