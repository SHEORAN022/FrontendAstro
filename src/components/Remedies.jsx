// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import "./Remedies.css";

// // // export default function Remedies({ token }) {
// // //   const API_URL = "https://astrobackend-5sr6.onrender.com/api/remedies";

// // //   const [remedies, setRemedies] = useState([]);
// // //   const [editingRemedy, setEditingRemedy] = useState(null);
// // //   const [formData, setFormData] = useState({
// // //     clientName: "",
// // //     email: "",
// // //     remedyType: "Gemstone",
// // //     description: "",
// // //     status: "Pending",
// // //     file: null,
// // //   });
// // //   const [search, setSearch] = useState("");
// // //   const [selectedFileName, setSelectedFileName] = useState("");

// // //   // Fetch remedies with optional search
// // //   const fetchRemedies = async () => {
// // //     try {
// // //       const res = await axios.get(`${API_URL}${search ? `?search=${search}` : ""}`, {
// // //         headers: token ? { Authorization: `Bearer ${token}` } : {},
// // //       });
// // //       setRemedies(res.data);
// // //     } catch (err) {
// // //       console.error("Error fetching remedies:", err.response?.data || err.message);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchRemedies();
// // //   }, [search]);

// // //   // Add or Update Remedy
// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     if (!formData.clientName || !formData.email) {
// // //       return alert("Client Name and Email are required");
// // //     }

// // //     const data = new FormData();
// // //     data.append("clientName", formData.clientName);
// // //     data.append("email", formData.email);
// // //     data.append("remedyType", formData.remedyType);
// // //     data.append("description", formData.description);
// // //     data.append("status", formData.status);
// // //     if (formData.file) data.append("file", formData.file);

// // //     try {
// // //       if (editingRemedy) {
// // //         await axios.put(`${API_URL}/${editingRemedy._id}`, data, {
// // //           headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
// // //         });
// // //         alert("✅ Remedy updated successfully");
// // //         setEditingRemedy(null);
// // //       } else {
// // //         await axios.post(API_URL, data, {
// // //           headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
// // //         });
// // //         alert("✅ Remedy added successfully");
// // //       }

// // //       // Reset form
// // //       setFormData({ clientName: "", email: "", remedyType: "Gemstone", description: "", status: "Pending", file: null });
// // //       setSelectedFileName("");
// // //       fetchRemedies();
// // //     } catch (err) {
// // //       console.error("Error saving remedy:", err.response?.data || err.message);
// // //       alert("❌ " + (err.response?.data?.message || err.message));
// // //     }
// // //   };

// // //   // Edit remedy
// // //   const handleEdit = (remedy) => {
// // //     setEditingRemedy(remedy);
// // //     setFormData({
// // //       clientName: remedy.clientName,
// // //       email: remedy.email,
// // //       remedyType: remedy.remedyType,
// // //       description: remedy.description,
// // //       status: remedy.status,
// // //       file: null,
// // //     });
// // //     setSelectedFileName("");
// // //   };

// // //   // Delete remedy
// // //   const handleDelete = async (id) => {
// // //     if (!window.confirm("Are you sure you want to delete this remedy?")) return;
// // //     try {
// // //       await axios.delete(`${API_URL}/${id}`, {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       });
// // //       alert("✅ Remedy deleted successfully");
// // //       fetchRemedies();
// // //     } catch (err) {
// // //       console.error("Error deleting remedy:", err.response?.data || err.message);
// // //       alert("❌ " + (err.response?.data?.message || err.message));
// // //     }
// // //   };

// // //   const handleFileChange = (e) => {
// // //     const file = e.target.files[0];
// // //     setFormData({ ...formData, file });
// // //     setSelectedFileName(file ? file.name : "");
// // //   };

// // //   const statusBadge = (status) => (status === "Pending" ? "badge pending" : "badge completed");

// // //   return (
// // //     <div className="remedies-container">
// // //       <h2>Remedies Management</h2>

// // //       <input
// // //         type="text"
// // //         placeholder="Search by client name..."
// // //         className="search-input"
// // //         value={search}
// // //         onChange={(e) => setSearch(e.target.value)}
// // //       />

// // //       <form className="remedy-form" onSubmit={handleSubmit}>
// // //         <input
// // //           type="text"
// // //           placeholder="Client Name"
// // //           value={formData.clientName}
// // //           required
// // //           onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
// // //         />
// // //         <input
// // //           type="email"
// // //           placeholder="Client Email"
// // //           value={formData.email}
// // //           required
// // //           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// // //         />
// // //         <select value={formData.remedyType} onChange={(e) => setFormData({ ...formData, remedyType: e.target.value })}>
// // //           <option value="Gemstone">Gemstone</option>
// // //           <option value="Yantra">Yantra</option>
// // //           <option value="Mantra">Mantra</option>
// // //           <option value="Homa">Homa</option>
// // //           <option value="Rahu Yantra">Rahuu Yantra</option>
// // //           <option value="Other">Other</option>
// // //         </select>
// // //         <textarea
// // //           placeholder="Description"
// // //           value={formData.description}
// // //           onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// // //           required
// // //         />
// // //         <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
// // //           <option value="Pending">Pending</option>
// // //           <option value="Completed">Completed</option>
// // //         </select>
// // //         <input type="file" onChange={handleFileChange} />
// // //         {selectedFileName && <p className="file-preview">Selected File: {selectedFileName}</p>}
// // //         <button type="submit">{editingRemedy ? "Update" : "Add"} Remedy</button>
// // //       </form>

// // //       <div className="table-responsive">
// // //         <table className="remedies-table">
// // //           <thead>
// // //             <tr>
// // //               <th>Client Name</th>
// // //               <th>Email</th>
// // //               <th>Type</th>
// // //               <th>Description</th>
// // //               <th>Status</th>
// // //               <th>File</th>
// // //               <th>Actions</th>
// // //             </tr>
// // //           </thead>
// // //           <tbody>
// // //             {remedies.length > 0 ? (
// // //               remedies.map((r) => (
// // //                 <tr key={r._id}>
// // //                   <td>{r.clientName}</td>
// // //                   <td>{r.email}</td>
// // //                   <td>{r.remedyType}</td>
// // //                   <td>{r.description}</td>
// // //                   <td>
// // //                     <span className={statusBadge(r.status)}>{r.status}</span>
// // //                   </td>
// // //                   <td>
// // //                     {r.fileUrl ? (
// // //                       <a href={`https://astrobackend-5sr6.onrender.com/${r.fileUrl}`} target="_blank" rel="noreferrer">
// // //                         View File
// // //                       </a>
// // //                     ) : (
// // //                       "N/A"
// // //                     )}
// // //                   </td>
// // //                   <td className="action-buttons">
// // //                     <button className="edit-btn" onClick={() => handleEdit(r)}>Edit</button>
// // //                     <button className="delete-btn" onClick={() => handleDelete(r._id)}>Delete</button>
// // //                   </td>
// // //                 </tr>
// // //               ))
// // //             ) : (
// // //               <tr>
// // //                 <td colSpan="7" style={{ textAlign: "center" }}>No remedies found</td>
// // //               </tr>
// // //             )}
// // //           </tbody>
// // //         </table>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import "./Remedies.css";

// // export default function Remedies({ token }) {
// //   const API_URL = "https://astrobackend-5sr6.onrender.com/api/remedies";

// //   const [remedies, setRemedies] = useState([]);
// //   const [editingRemedyId, setEditingRemedyId] = useState(null);

// //   const [formData, setFormData] = useState({
// //     clientName: "",
// //     email: "",
// //     remedyType: "Gemstone",
// //     description: "",
// //     status: "Pending",
// //     file: null,
// //   });

// //   const [search, setSearch] = useState("");
// //   const [selectedFileName, setSelectedFileName] = useState("");

// //   // Fetch remedies
// //   const fetchRemedies = async () => {
// //     try {
// //       const res = await axios.get(
// //         `${API_URL}${search ? `?search=${search}` : ""}`,
// //         {
// //           headers: token ? { Authorization: `Bearer ${token}` } : {},
// //         }
// //       );

// //       setRemedies(Array.isArray(res.data) ? res.data : []);
// //     } catch (err) {
// //       console.error("Error fetching remedies:", err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchRemedies();
// //   }, [search]);

// //   // Submit Add / Update
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!formData.clientName || !formData.email) {
// //       return alert("Client Name and Email are required");
// //     }

// //     const data = new FormData();
// //     Object.entries(formData).forEach(([k, v]) => v && data.append(k, v));

// //     try {
// //       if (editingRemedyId) {
// //         // ---------- UPDATE ----------
// //         console.log("UPDATE URL:", `${API_URL}/${editingRemedyId}`);

// //         await axios.put(`${API_URL}/${editingRemedyId}`, data, {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "Content-Type": "multipart/form-data",
// //           },
// //         });

// //         alert("✅ Remedy updated successfully");
// //       } else {
// //         // ---------- CREATE ----------
// //         await axios.post(API_URL, data, {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "Content-Type": "multipart/form-data",
// //           },
// //         });

// //         alert("✅ Remedy added successfully");
// //       }

// //       // Reset
// //       setEditingRemedyId(null);
// //       setFormData({
// //         clientName: "",
// //         email: "",
// //         remedyType: "Gemstone",
// //         description: "",
// //         status: "Pending",
// //         file: null,
// //       });
// //       setSelectedFileName("");

// //       fetchRemedies();
// //     } catch (err) {
// //       console.error("Error saving remedy:", err);
// //       alert("❌ Failed to save remedy");
// //     }
// //   };

// //   // Edit Remedy
// //   const handleEdit = (remedy) => {
// //     console.log("Editing Remedy:", remedy);

// //     setEditingRemedyId(remedy._id);

// //     setFormData({
// //       clientName: remedy.clientName,
// //       email: remedy.email,
// //       remedyType: remedy.remedyType,
// //       description: remedy.description,
// //       status: remedy.status,
// //       file: null, // new file optional
// //     });

// //     setSelectedFileName("");
// //   };

// //   // Delete Remedy
// //   const handleDelete = async (id) => {
// //     if (!window.confirm("Delete this remedy?")) return;

// //     try {
// //       await axios.delete(`${API_URL}/${id}`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });

// //       alert("🗑 Remedy deleted successfully");
// //       fetchRemedies();
// //     } catch (err) {
// //       console.error("Delete error:", err);
// //       alert("❌ Failed to delete remedy");
// //     }
// //   };

// //   // File change
// //   const handleFileChange = (e) => {
// //     const file = e.target.files[0];
// //     setFormData({ ...formData, file });
// //     setSelectedFileName(file ? file.name : "");
// //   };

// //   const statusBadge = (status) =>
// //     status === "Pending" ? "badge pending" : "badge completed";

// //   return (
// //     <div className="remedies-container">
// //       <h2>Remedies Management</h2>

// //       <input
// //         type="text"
// //         placeholder="Search by client name..."
// //         className="search-input"
// //         value={search}
// //         onChange={(e) => setSearch(e.target.value)}
// //       />

// //       {/* FORM */}
// //       <form className="remedy-form" onSubmit={handleSubmit}>
// //         <input
// //           type="text"
// //           placeholder="Client Name"
// //           required
// //           value={formData.clientName}
// //           onChange={(e) =>
// //             setFormData({ ...formData, clientName: e.target.value })
// //           }
// //         />

// //         <input
// //           type="email"
// //           placeholder="Client Email"
// //           required
// //           value={formData.email}
// //           onChange={(e) =>
// //             setFormData({ ...formData, email: e.target.value })
// //           }
// //         />

// //         <select
// //           value={formData.remedyType}
// //           onChange={(e) =>
// //             setFormData({ ...formData, remedyType: e.target.value })
// //           }
// //         >
// //           <option value="Gemstone">Gemstone</option>
// //           <option value="Yantra">Yantra</option>
// //           <option value="Mantra">Mantra</option>
// //           <option value="Homa">Homa</option>
// //           <option value="Rahu Yantra">Rahu Yantra</option>
// //           <option value="Other">Other</option>
// //         </select>

// //         <textarea
// //           placeholder="Description"
// //           required
// //           value={formData.description}
// //           onChange={(e) =>
// //             setFormData({ ...formData, description: e.target.value })
// //           }
// //         />

// //         <select
// //           value={formData.status}
// //           onChange={(e) =>
// //             setFormData({ ...formData, status: e.target.value })
// //           }
// //         >
// //           <option value="Pending">Pending</option>
// //           <option value="Completed">Completed</option>
// //         </select>

// //         <input type="file" onChange={handleFileChange} />

// //         {selectedFileName && (
// //           <p className="file-preview">Selected File: {selectedFileName}</p>
// //         )}

// //         <button type="submit">
// //           {editingRemedyId ? "Update Remedy" : "Add Remedy"}
// //         </button>
// //       </form>

// //       {/* TABLE */}
// //       <div className="table-responsive">
// //         <table className="remedies-table">
// //           <thead>
// //             <tr>
// //               <th>Client Name</th>
// //               <th>Email</th>
// //               <th>Type</th>
// //               <th>Description</th>
// //               <th>Status</th>
// //               <th>File</th>
// //               <th>Actions</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {remedies.length > 0 ? (
// //               remedies.map((r) => (
// //                 <tr key={r._id}>
// //                   <td>{r.clientName}</td>
// //                   <td>{r.email}</td>
// //                   <td>{r.remedyType}</td>
// //                   <td>{r.description}</td>

// //                   <td>
// //                     <span className={statusBadge(r.status)}>{r.status}</span>
// //                   </td>

// //                   <td>
// //                     {r.fileUrl ? (
// //                       <a
// //                         href={r.fileUrl}
// //                         target="_blank"
// //                         rel="noreferrer"
// //                       >
// //                         View File
// //                       </a>
// //                     ) : (
// //                       "N/A"
// //                     )}
// //                   </td>

// //                   <td className="action-buttons">
// //                     <button className="edit-btn" onClick={() => handleEdit(r)}>
// //                       Edit
// //                     </button>

// //                     <button
// //                       className="delete-btn"
// //                       onClick={() => handleDelete(r._id)}
// //                     >
// //                       Delete
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))
// //             ) : (
// //               <tr>
// //                 <td colSpan="7" style={{ textAlign: "center" }}>
// //                   No remedies found
// //                 </td>
// //               </tr>
// //             )}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import "./Remedies.css";

// // export default function Remedies({ token }) {
// //   const API_URL = "https://astrobackend-5sr6.onrender.com/api/remedies";

// //   const [remedies, setRemedies] = useState([]);
// //   const [editingId, setEditingId] = useState(null);

// //   const [formData, setFormData] = useState({
// //     clientName: "",
// //     email: "",
// //     remedyType: "Gemstone",
// //     description: "",
// //     status: "Pending",
// //      remedyDate: "",
// //     file: null,
// //   });

// //   const [search, setSearch] = useState("");
// //   const [selectedFileName, setSelectedFileName] = useState("");

// //   // Load remedies
// //   const fetchRemedies = async () => {
// //     try {
// //       const res = await axios.get(
// //         `${API_URL}${search ? `?search=${search}` : ""}`
// //       );

// //       setRemedies(Array.isArray(res.data) ? res.data : []);
// //     } catch (err) {
// //       console.error("Fetch error:", err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchRemedies();
// //   }, [search]);

// //   // Submit Add / Edit
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!formData.clientName || !formData.email) {
// //       return alert("Name and Email required.");
// //     }

// //     const fd = new FormData();
// //     Object.entries(formData).forEach(([k, v]) => v && fd.append(k, v));

// //     try {
// //       if (editingId) {
// //         await axios.put(`${API_URL}/${editingId}`, fd, {
// //           headers: { "Content-Type": "multipart/form-data" },
// //         });
// //         alert("Updated Successfully");
// //       } else {
// //         await axios.post(API_URL, fd, {
// //           headers: { "Content-Type": "multipart/form-data" },
// //         });
// //         alert("Created Successfully");
// //       }

// //       setEditingId(null);
// //       setFormData({
// //         clientName: "",
// //         email: "",
// //         remedyType: "Gemstone",
// //         description: "",
// //         status: "Pending",
// //         file: null,
// //       });
// //       setSelectedFileName("");

// //       fetchRemedies();
// //     } catch (err) {
// //       console.error("Save failed:", err);
// //       alert("Save failed");
// //     }
// //   };

// //   // Edit
// //   const handleEdit = (r) => {
// //     setEditingId(r._id);
// //     setFormData({
// //       clientName: r.clientName,
// //       email: r.email,
// //       remedyType: r.remedyType,
// //       description: r.description,
// //       status: r.status,
// //       file: null,
// //     });
// //     setSelectedFileName("");
// //   };

// //   // Delete
// //   const handleDelete = async (id) => {
// //     if (!window.confirm("Delete remedy?")) return;

// //     await axios.delete(`${API_URL}/${id}`);
// //     fetchRemedies();
// //   };

// //   const handleFileChange = (e) => {
// //     const file = e.target.files[0];
// //     setFormData({ ...formData, file });
// //     setSelectedFileName(file ? file.name : "");
// //   };

// //   const statusBadge = (s) =>
// //     s === "Pending" ? "badge pending" : "badge completed";

// //   return (
// //     <div className="remedies-container">
// //       <h2>Remedies Management</h2>

// //       <input
// //         type="text"
// //         placeholder="Search by client name..."
// //         className="search-input"
// //         value={search}
// //         onChange={(e) => setSearch(e.target.value)}
// //       />

// //       {/* Form */}
// //       <form className="remedy-form" onSubmit={handleSubmit}>
// //         <input
// //           type="text"
// //           placeholder="Client Name"
// //           required
// //           value={formData.clientName}
// //           onChange={(e) =>
// //             setFormData({ ...formData, clientName: e.target.value })
// //           }
// //         />

// //         <input
// //           type="email"
// //           placeholder="Client Email"
// //           required
// //           value={formData.email}
// //           onChange={(e) =>
// //             setFormData({ ...formData, email: e.target.value })
// //           }
// //         />

// //         <select
// //           value={formData.remedyType}
// //           onChange={(e) =>
// //             setFormData({ ...formData, remedyType: e.target.value })
// //           }
// //         >
// //           <option value="Gemstone">Gemstone</option>
// //           <option value="Yantra">Yantra</option>
// //           <option value="Mantra">Mantra</option>
// //           <option value="Homa">Homa</option>
// //           <option value="Rahu Yantra">Rahu Yantra</option>
// //           <option value="Other">Other</option>
// //         </select>

// //         <textarea
// //           placeholder="Description"
// //           required
// //           value={formData.description}
// //           onChange={(e) =>
// //             setFormData({ ...formData, description: e.target.value })
// //           }
// //         />

// //         <select
// //           value={formData.status}
// //           onChange={(e) =>
// //             setFormData({ ...formData, status: e.target.value })
// //           }
// //         >
// //           <option value="Pending">Pending</option>
// //           <option value="Completed">Completed</option>
// //         </select>

// //         <input type="file" onChange={handleFileChange} />

// //         {selectedFileName && (
// //           <p className="file-preview">Selected File: {selectedFileName}</p>
// //         )}

// //         <button type="submit">
// //           {editingId ? "Update Remedy" : "Add Remedy"}
// //         </button>
// //       </form>

// //       {/* Table */}
// //       <div className="table-responsive">
// //         <table className="remedies-table">
// //           <thead>
// //             <tr>
// //               <th>Client Name</th>
// //               <th>Email</th>
// //               <th>Type</th>
// //               <th>Description</th>
// //               <th>Status</th>
// //               <th>File</th>
// //               <th>Actions</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {remedies.length > 0 ? (
// //               remedies.map((r) => (
// //                 <tr key={r._id}>
// //                   <td>{r.clientName}</td>
// //                   <td>{r.email}</td>
// //                   <td>{r.remedyType}</td>
// //                   <td>{r.description}</td>
// //                   <td>
// //                     <span className={statusBadge(r.status)}>{r.status}</span>
// //                   </td>
// //                   <td>
// //                     {r.fileUrl ? (
// //                       <a href={r.fileUrl} target="_blank" rel="noreferrer">
// //                         View
// //                       </a>
// //                     ) : (
// //                       "N/A"
// //                     )}
// //                   </td>

// //                   <td className="action-buttons">
// //                     <button className="edit-btn" onClick={() => handleEdit(r)}>
// //                       Edit
// //                     </button>
// //                     <button
// //                       className="delete-btn"
// //                       onClick={() => handleDelete(r._id)}
// //                     >
// //                       Delete
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))
// //             ) : (
// //               <tr>
// //                 <td colSpan="7" style={{ textAlign: "center" }}>
// //                   No remedies found
// //                 </td>
// //               </tr>
// //             )}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import "./Remedies.css";

// // export default function Remedies({ token }) {
// //   const API_URL = "https://astrobackend-5sr6.onrender.com/api/remedies";

// //   const [remedies, setRemedies] = useState([]);
// //   const [editingId, setEditingId] = useState(null);

// //   const [formData, setFormData] = useState({
// //     clientName: "",
// //     email: "",
// //     remedyType: "Gemstone",
// //     description: "",
// //     status: "Pending",
// //     remedyDate: "",
// //     file: null,
// //   });

// //   const [search, setSearch] = useState("");
// //   const [selectedFileName, setSelectedFileName] = useState("");

// //   // ================= FETCH REMEDIES =================
// //   const fetchRemedies = async () => {
// //     try {
// //       const res = await axios.get(
// //         `${API_URL}${search ? `?search=${search}` : ""}`
// //       );
// //       setRemedies(Array.isArray(res.data) ? res.data : []);
// //     } catch (err) {
// //       console.error("Fetch error:", err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchRemedies();
// //   }, [search]);

// //   // ================= SUBMIT =================
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!formData.clientName || !formData.email || !formData.remedyDate) {
// //       return alert("Name, Email and Remedy Date required.");
// //     }

// //     const fd = new FormData();
// //     Object.entries(formData).forEach(([k, v]) => {
// //       if (v) fd.append(k, v);
// //     });

// //     try {
// //       if (editingId) {
// //         await axios.put(`${API_URL}/${editingId}`, fd, {
// //           headers: { "Content-Type": "multipart/form-data" },
// //         });
// //         alert("Updated Successfully");
// //       } else {
// //         await axios.post(API_URL, fd, {
// //           headers: { "Content-Type": "multipart/form-data" },
// //         });
// //         alert("Created Successfully");
// //       }

// //       setEditingId(null);
// //       setFormData({
// //         clientName: "",
// //         email: "",
// //         remedyType: "Gemstone",
// //         description: "",
// //         status: "Pending",
// //         remedyDate: "",
// //         file: null,
// //       });
// //       setSelectedFileName("");

// //       fetchRemedies();
// //     } catch (err) {
// //       console.error("Save failed:", err);
// //       alert("Save failed");
// //     }
// //   };

// //   // ================= EDIT =================
// //   const handleEdit = (r) => {
// //     setEditingId(r._id);
// //     setFormData({
// //       clientName: r.clientName || "",
// //       email: r.email || "",
// //       remedyType: r.remedyType || "Gemstone",
// //       description: r.description || "",
// //       status: r.status || "Pending",
// //       remedyDate: r.remedyDate
// //         ? r.remedyDate.split("T")[0]
// //         : "",
// //       file: null,
// //     });
// //     setSelectedFileName("");
// //   };

// //   // ================= DELETE =================
// //   const handleDelete = async (id) => {
// //     if (!window.confirm("Delete remedy?")) return;
// //     await axios.delete(`${API_URL}/${id}`);
// //     fetchRemedies();
// //   };

// //   // ================= FILE =================
// //   const handleFileChange = (e) => {
// //     const file = e.target.files[0];
// //     setFormData({ ...formData, file });
// //     setSelectedFileName(file ? file.name : "");
// //   };

// //   const statusBadge = (s) =>
// //     s === "Pending" ? "badge pending" : "badge completed";

// //   return (
// //     <div className="remedies-container">
// //       <h2>Remedies Management</h2>

// //       <input
// //         type="text"
// //         placeholder="Search by client name..."
// //         className="search-input"
// //         value={search}
// //         onChange={(e) => setSearch(e.target.value)}
// //       />

// //       {/* ================= FORM ================= */}
// //       <form className="remedy-form" onSubmit={handleSubmit}>
// //         <input
// //           type="text"
// //           placeholder="Client Name"
// //           required
// //           value={formData.clientName}
// //           onChange={(e) =>
// //             setFormData({ ...formData, clientName: e.target.value })
// //           }
// //         />

// //         <input
// //           type="email"
// //           placeholder="Client Email"
// //           required
// //           value={formData.email}
// //           onChange={(e) =>
// //             setFormData({ ...formData, email: e.target.value })
// //           }
// //         />

// //         <input
// //           type="date"
// //           required
// //           value={formData.remedyDate}
// //           onChange={(e) =>
// //             setFormData({ ...formData, remedyDate: e.target.value })
// //           }
// //         />

// //         <select
// //           value={formData.remedyType}
// //           onChange={(e) =>
// //             setFormData({ ...formData, remedyType: e.target.value })
// //           }
// //         >
// //           <option value="Gemstone">Gemstone</option>
// //           <option value="Yantra">Yantra</option>
// //           <option value="Mantra">Mantra</option>
// //           <option value="Homa">Homa</option>
// //           <option value="Rahu Yantra">Rahu Yantra</option>
// //           <option value="Other">Other</option>
// //         </select>

// //         <textarea
// //           placeholder="Description"
// //           required
// //           value={formData.description}
// //           onChange={(e) =>
// //             setFormData({ ...formData, description: e.target.value })
// //           }
// //         />

// //         <select
// //           value={formData.status}
// //           onChange={(e) =>
// //             setFormData({ ...formData, status: e.target.value })
// //           }
// //         >
// //           <option value="Pending">Pending</option>
// //           <option value="Completed">Completed</option>
// //         </select>

// //         <input type="file" onChange={handleFileChange} />

// //         {selectedFileName && (
// //           <p className="file-preview">Selected File: {selectedFileName}</p>
// //         )}

// //         <button type="submit">
// //           {editingId ? "Update Remedy" : "Add Remedy"}
// //         </button>
// //       </form>

// //       {/* ================= TABLE ================= */}
// //       <div className="table-responsive">
// //         <table className="remedies-table">
// //           <thead>
// //             <tr>
// //               <th>Client Name</th>
// //               <th>Email</th>
// //               <th>Type</th>
// //               <th>Description</th>
// //               <th>Date</th>
// //               <th>Status</th>
// //               <th>File</th>
// //               <th>Actions</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {remedies.length > 0 ? (
// //               remedies.map((r) => (
// //                 <tr key={r._id}>
// //                   <td>{r.clientName}</td>
// //                   <td>{r.email}</td>
// //                   <td>{r.remedyType}</td>
// //                   <td>{r.description}</td>
// //                   <td>
// //                     {r.remedyDate
// //                       ? new Date(r.remedyDate).toLocaleDateString()
// //                       : "N/A"}
// //                   </td>
// //                   <td>
// //                     <span className={statusBadge(r.status)}>
// //                       {r.status}
// //                     </span>
// //                   </td>
// //                   <td>
// //                     {r.fileUrl ? (
// //                       <a href={r.fileUrl} target="_blank" rel="noreferrer">
// //                         View
// //                       </a>
// //                     ) : (
// //                       "N/A"
// //                     )}
// //                   </td>
// //                   <td className="action-buttons">
// //                     <button
// //                       className="edit-btn"
// //                       onClick={() => handleEdit(r)}
// //                     >
// //                       Edit
// //                     </button>
// //                     <button
// //                       className="delete-btn"
// //                       onClick={() => handleDelete(r._id)}
// //                     >
// //                       Delete
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))
// //             ) : (
// //               <tr>
// //                 <td colSpan="8" style={{ textAlign: "center" }}>
// //                   No remedies found
// //                 </td>
// //               </tr>
// //             )}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Remedies.css";

// export default function Remedies() {
//   const API_URL = "https://astrobackend-5sr6.onrender.com/api/remedies";

//   const [remedies, setRemedies] = useState([]);
//   const [editingId, setEditingId] = useState(null);

//   const [formData, setFormData] = useState({
//     clientName: "",
//     email: "",
//     remedyType: "Gemstone",
//     description: "",
//     status: "Pending",
//     dateOfDoingRemedy: "",
//     dateOfProductDelivery: "",
//     file: null,
//   });

//   const [search, setSearch] = useState("");
//   const [selectedFileName, setSelectedFileName] = useState("");

//   // ================= FETCH =================
//   const fetchRemedies = async () => {
//     try {
//       const res = await axios.get(
//         `${API_URL}${search ? `?search=${search}` : ""}`
//       );
//       setRemedies(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       console.error("Fetch error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchRemedies();
//   }, [search]);

//   // ================= SUBMIT =================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       !formData.clientName ||
//       !formData.email ||
//       !formData.dateOfDoingRemedy
//     ) {
//       return alert("Name, Email & Date of Doing Remedy required");
//     }

//     const fd = new FormData();
//     Object.entries(formData).forEach(([k, v]) => {
//       if (v) fd.append(k, v);
//     });

//     try {
//       if (editingId) {
//         await axios.put(`${API_URL}/${editingId}`, fd);
//         alert("Updated Successfully");
//       } else {
//         await axios.post(API_URL, fd);
//         alert("Created Successfully");
//       }

//       setEditingId(null);
//       setFormData({
//         clientName: "",
//         email: "",
//         remedyType: "Gemstone",
//         description: "",
//         status: "Pending",
//         dateOfDoingRemedy: "",
//         dateOfProductDelivery: "",
//         file: null,
//       });
//       setSelectedFileName("");
//       fetchRemedies();
//     } catch (err) {
//       console.error("Save failed:", err);
//       alert("Save failed");
//     }
//   };

//   // ================= EDIT =================
//   const handleEdit = (r) => {
//     setEditingId(r._id);
//     setFormData({
//       clientName: r.clientName || "",
//       email: r.email || "",
//       remedyType: r.remedyType || "Gemstone",
//       description: r.description || "",
//       status: r.status || "Pending",
//       dateOfDoingRemedy: r.dateOfDoingRemedy
//         ? r.dateOfDoingRemedy.split("T")[0]
//         : "",
//       dateOfProductDelivery: r.dateOfProductDelivery
//         ? r.dateOfProductDelivery.split("T")[0]
//         : "",
//       file: null,
//     });
//     setSelectedFileName("");
//   };

//   // ================= DELETE =================
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete remedy?")) return;
//     await axios.delete(`${API_URL}/${id}`);
//     fetchRemedies();
//   };

//   // ================= FILE =================
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormData({ ...formData, file });
//     setSelectedFileName(file ? file.name : "");
//   };

//   const statusBadge = (s) =>
//     s === "Pending" ? "badge pending" : "badge completed";

//   return (
//     <div className="remedies-container">
//       <h2>Remedies Management</h2>

//       <input
//         type="text"
//         placeholder="Search by client name..."
//         className="search-input"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {/* ================= FORM ================= */}
//       <form className="remedy-form" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Client Name"
//           value={formData.clientName}
//           onChange={(e) =>
//             setFormData({ ...formData, clientName: e.target.value })
//           }
//           required
//         />

//         <input
//           type="email"
//           placeholder="Client Email"
//           value={formData.email}
//           onChange={(e) =>
//             setFormData({ ...formData, email: e.target.value })
//           }
//           required
//         />

//         <label>Date of Doing Remedy</label>
//         <input
//           type="date"
//           value={formData.dateOfDoingRemedy}
//           onChange={(e) =>
//             setFormData({
//               ...formData,
//               dateOfDoingRemedy: e.target.value,
//             })
//           }
//           required
//         />

//         <label>Date of Product Delivery</label>
//         <input
//           type="date"
//           value={formData.dateOfProductDelivery}
//           onChange={(e) =>
//             setFormData({
//               ...formData,
//               dateOfProductDelivery: e.target.value,
//             })
//           }
//         />

//         <select
//           value={formData.remedyType}
//           onChange={(e) =>
//             setFormData({ ...formData, remedyType: e.target.value })
//           }
//         >
//           <option value="Gemstone">Gemstone</option>
//           <option value="Yantra">Yantra</option>
//           <option value="Mantra">Mantra</option>
//           <option value="Homa">Homa</option>
//           <option value="Rahu Yantra">Rahu Yantra</option>
//           <option value="Other">Other</option>
//         </select>

//         <textarea
//           placeholder="Description"
//           value={formData.description}
//           onChange={(e) =>
//             setFormData({ ...formData, description: e.target.value })
//           }
//           required
//         />

//         <select
//           value={formData.status}
//           onChange={(e) =>
//             setFormData({ ...formData, status: e.target.value })
//           }
//         >
//           <option value="Pending">Pending</option>
//           <option value="Completed">Completed</option>
//         </select>

//         <input type="file" onChange={handleFileChange} />

//         {selectedFileName && (
//           <p className="file-preview">📎 {selectedFileName}</p>
//         )}

//         <button type="submit">
//           {editingId ? "Update Remedy" : "Add Remedy"}
//         </button>
//       </form>

//       {/* ================= TABLE ================= */}
//       <div className="table-responsive">
//         <table className="remedies-table">
//           <thead>
//             <tr>
//               <th>Client</th>
//               <th>Email</th>
//               <th>Type</th>
//               <th>Remedy Date</th>
//               <th>Delivery Date</th>
//               <th>Status</th>
//               <th>File</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {remedies.length > 0 ? (
//               remedies.map((r) => (
//                 <tr key={r._id}>
//                   <td>{r.clientName}</td>
//                   <td>{r.email}</td>
//                   <td>{r.remedyType}</td>
//                   <td>
//                     {r.dateOfDoingRemedy
//                       ? new Date(r.dateOfDoingRemedy).toLocaleDateString()
//                       : "N/A"}
//                   </td>
//                   <td>
//                     {r.dateOfProductDelivery
//                       ? new Date(
//                           r.dateOfProductDelivery
//                         ).toLocaleDateString()
//                       : "—"}
//                   </td>
//                   <td>
//                     <span className={statusBadge(r.status)}>
//                       {r.status}
//                     </span>
//                   </td>
//                   <td>
//                     {r.fileUrl ? (
//                       <a href={r.fileUrl} target="_blank" rel="noreferrer">
//                         View
//                       </a>
//                     ) : (
//                       "N/A"
//                     )}
//                   </td>
//                   <td>
//                     <button onClick={() => handleEdit(r)}>Edit</button>
//                     <button onClick={() => handleDelete(r._id)}>
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="8" style={{ textAlign: "center" }}>
//                   No remedies found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./Remedies.css";

export default function Remedies() {
  const API_URL = "https://astrobackend-5sr6.onrender.com/api/remedies";

  const [remedies, setRemedies] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState("list"); 

  const [formData, setFormData] = useState({
    clientName: "", email: "", remedyType: "Gemstone",
    description: "", status: "Pending", dateOfDoingRemedy: "",
    dateOfProductDelivery: "", file: null,
  });

  const [search, setSearch] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");

  const buildCalendarEvents = (list) => {
    const events = [];
    list.forEach((r) => {
      if (r.dateOfDoingRemedy) {
        events.push({ title: `🧿 ${r.clientName}`, date: r.dateOfDoingRemedy, color: "#4f46e5" });
      }
      if (r.dateOfProductDelivery) {
        events.push({ title: `📦 ${r.clientName}`, date: r.dateOfProductDelivery, color: "#10b981" });
      }
    });
    setCalendarEvents(events);
  };

  const fetchRemedies = async () => {
    try {
      const res = await axios.get(`${API_URL}${search ? `?search=${search}` : ""}`);
      const list = Array.isArray(res.data) ? res.data : [];
      setRemedies(list);
      buildCalendarEvents(list);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchRemedies(); }, [search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(formData).forEach(([k, v]) => { if (v) fd.append(k, v); });

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, fd);
      } else {
        await axios.post(API_URL, fd);
      }
      setEditingId(null);
      setFormData({ clientName: "", email: "", remedyType: "Gemstone", description: "", status: "Pending", dateOfDoingRemedy: "", dateOfProductDelivery: "", file: null });
      setSelectedFileName("");
      fetchRemedies();
    } catch (err) { alert("Action failed"); }
  };

  const handleEdit = (r) => {
    setEditingId(r._id);
    setFormData({
      clientName: r.clientName || "", email: r.email || "",
      remedyType: r.remedyType || "Gemstone", description: r.description || "",
      status: r.status || "Pending",
      dateOfDoingRemedy: r.dateOfDoingRemedy ? r.dateOfDoingRemedy.split("T")[0] : "",
      dateOfProductDelivery: r.dateOfProductDelivery ? r.dateOfProductDelivery.split("T")[0] : "",
      file: null,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="light-theme-wrapper">
      <div className="remedies-container">
        <header className="main-header">
          <h1>Remedy Management</h1>
          <div className="tab-navigation">
            <button className={activeTab === 'list' ? 'tab-active' : ''} onClick={() => setActiveTab('list')}>Data Manager</button>
            <button className={activeTab === 'calendar' ? 'tab-active' : ''} onClick={() => setActiveTab('calendar')}>Calendar View</button>
          </div>
        </header>

        {activeTab === 'list' ? (
          <div className="content-fade">
            {/* INPUT FORM CARD */}
            <div className="white-card form-box">
              <h3>{editingId ? "Edit Existing Remedy" : "Create New Remedy"}</h3>
              <form onSubmit={handleSubmit} className="form-layout">
                <div className="input-group"><input type="text" placeholder="Client Name" value={formData.clientName} onChange={(e) => setFormData({ ...formData, clientName: e.target.value })} required /></div>
                <div className="input-group"><input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required /></div>
                
                <div className="input-group">
                  <label>Remedy Date</label>
                  <input type="date" value={formData.dateOfDoingRemedy} onChange={(e) => setFormData({ ...formData, dateOfDoingRemedy: e.target.value })} required />
                </div>
                <div className="input-group">
                  <label>Delivery Date</label>
                  <input type="date" value={formData.dateOfProductDelivery} onChange={(e) => setFormData({ ...formData, dateOfProductDelivery: e.target.value })} />
                </div>

                <select value={formData.remedyType} onChange={(e) => setFormData({ ...formData, remedyType: e.target.value })}>
                  <option value="Gemstone">Gemstone</option>
                  <option value="Yantra">Yantra</option>
                  <option value="Mantra">Mantra</option>
                  <option value="Homa">Homa</option>
                </select>

                <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>

                <textarea className="span-all" placeholder="Enter full remedy description..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
                
                <div className="file-box span-all">
                  <input type="file" id="file" onChange={(e) => { setFormData({ ...formData, file: e.target.files[0] }); setSelectedFileName(e.target.files[0]?.name); }} />
                  <label htmlFor="file" className="file-label"> {selectedFileName ? `📎 ${selectedFileName}` : "Click to upload report file"} </label>
                </div>

                <button type="submit" className="submit-action-btn">{editingId ? "Update Information" : "Assign Remedy"}</button>
              </form>
            </div>

            {/* LIST SECTION */}
            <div className="list-wrapper">
              <div className="search-row">
                <input type="text" placeholder="Search by client name..." className="light-search" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              
              <div className="table-responsive">
                <table className="light-table">
                  <thead>
                    <tr>
                      <th>Client Details</th>
                      <th>Category</th>
                      <th>Remedy Date</th>
                      <th>Status</th>
                      <th className="text-right">Manage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {remedies.map((r) => (
                      <tr key={r._id}>
                        <td data-label="Client">
                          <div className="cell-user">
                            <span className="user-name">{r.clientName}</span>
                            <span className="user-mail">{r.email}</span>
                          </div>
                        </td>
                        <td data-label="Category"><span className="cat-pill">{r.remedyType}</span></td>
                        <td data-label="Date">{new Date(r.dateOfDoingRemedy).toLocaleDateString()}</td>
                        <td data-label="Status"><span className={`status-box ${r.status}`}>{r.status}</span></td>
                        <td data-label="Manage" className="text-right">
                          <div className="btn-group">
                            <button className="edit-btn" onClick={() => handleEdit(r)}>Edit</button>
                            <button className="delete-btn" onClick={() => axios.delete(`${API_URL}/${r._id}`).then(fetchRemedies)}>Remove</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="calendar-container-box content-fade">
            <div className="white-card small-cal">
              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={calendarEvents}
                height="auto"
                headerToolbar={{ left: 'prev,next today', center: 'title', right: '' }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
