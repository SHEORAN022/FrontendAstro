// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API = "https://astrobackend-5sr6.onrender.com/api/faqs";

// const FAQPage = () => {
//   const [faqs, setFaqs] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [form, setForm] = useState({
//     question: "",
//     answer: "",
//     category: "",
//     status: "active",
//   });

//   const loadFaqs = async () => {
//     const res = await axios.get(`${API}/list`);
//     setFaqs(res.data.faqs);
//   };

//   useEffect(() => {
//     loadFaqs();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (editId) {
//       await axios.put(`${API}/update/${editId}`, form);
//       alert("FAQ Updated");
//     } else {
//       await axios.post(`${API}/add`, form);
//       alert("FAQ Added");
//     }

//     setForm({ question: "", answer: "", category: "", status: "active" });
//     setEditId(null);
//     setShowForm(false);
//     loadFaqs();
//   };

//   const editFAQ = (faq) => {
//     setForm(faq);
//     setEditId(faq._id);
//     setShowForm(true);
//   };

//   const deleteFAQ = async (id) => {
//     if (window.confirm("Delete this FAQ?")) {
//       await axios.delete(`${API}/delete/${id}`);
//       loadFaqs();
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between mb-3">
//         <h3>FAQ Manager</h3>

//         {!showForm && (
//           <button className="btn btn-success" onClick={() => setShowForm(true)}>
//             Add FAQ
//           </button>
//         )}
//       </div>

//       {showForm && (
//         <div className="card p-3 mb-4">
//           <h5>{editId ? "Edit FAQ" : "Add FAQ"}</h5>

//           <form onSubmit={handleSubmit}>
//             <label className="mt-2">Question</label>
//             <input
//               type="text"
//               className="form-control"
//               value={form.question}
//               onChange={(e) => setForm({ ...form, question: e.target.value })}
//             />

//             <label className="mt-2">Answer</label>
//             <textarea
//               className="form-control"
//               value={form.answer}
//               onChange={(e) => setForm({ ...form, answer: e.target.value })}
//             ></textarea>

//             <label className="mt-2">Category</label>
//             <input
//               type="text"
//               className="form-control"
//               value={form.category}
//               onChange={(e) => setForm({ ...form, category: e.target.value })}
//             />

//             <label className="mt-2">Status</label>
//             <select
//               className="form-control"
//               value={form.status}
//               onChange={(e) => setForm({ ...form, status: e.target.value })}
//             >
//               <option value="active">Active</option>
//               <option value="inactive">Inactive</option>
//             </select>

//             <button className="btn btn-primary mt-3 w-100">
//               {editId ? "Update FAQ" : "Save FAQ"}
//             </button>

//             <button
//               className="btn btn-secondary mt-2 w-100"
//               onClick={() => setShowForm(false)}
//             >
//               Cancel
//             </button>
//           </form>
//         </div>
//       )}

//       {/* FAQ Table */}
//       {!showForm && (
//         <div className="card p-3">
//           <table className="table table-hover">
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Question</th>
//                 <th>Answer</th>
//                 <th>Category</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {faqs.map((f, i) => (
//                 <tr key={f._id}>
//                   <td>{i + 1}</td>
//                   <td>{f.question}</td>
//                   <td>{f.answer}</td>
//                   <td>{f.category}</td>
//                   <td>{f.status}</td>

//                   <td>
//                     <button
//                       className="btn btn-primary btn-sm me-2"
//                       onClick={() => editFAQ(f)}
//                     >
//                       Edit
//                     </button>

//                     <button
//                       className="btn btn-danger btn-sm"
//                       onClick={() => deleteFAQ(f._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FAQPage;


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API = "https://astrobackend-5sr6.onrender.com/api/faqs";

// // 🔹 Pages list (static / later backend se bhi aa sakta hai)
// const PAGES = [
//   "Home",
//   "About us",
//   "Careers",
//   "Energy",
//   "Astrology",
//   "Vastu",
//    "Manifestation",
//     "Free Calculators",
//      "Materials",
//       "Blogs",
// ];

// const FAQPage = () => {
//   const [faqs, setFaqs] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [selectedPage, setSelectedPage] = useState("");

//   const [form, setForm] = useState({
//     question: "",
//     answer: "",
//     category: "",
//     page: "",
//     status: "active",
//   });

//   /* ================= LOAD FAQS ================= */
//   const loadFaqs = async () => {
//     const res = await axios.get(
//       `${API}/list${selectedPage ? `?page=${selectedPage}` : ""}`
//     );
//     setFaqs(res.data.faqs);
//   };

//   useEffect(() => {
//     loadFaqs();
//   }, [selectedPage]);

//   /* ================= SUBMIT ================= */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.page) {
//       alert("Please select a page");
//       return;
//     }

//     if (editId) {
//       await axios.put(`${API}/update/${editId}`, form);
//       alert("FAQ Updated");
//     } else {
//       await axios.post(`${API}/add`, form);
//       alert("FAQ Added");
//     }

//     setForm({
//       question: "",
//       answer: "",
//       category: "",
//       page: "",
//       status: "active",
//     });
//     setEditId(null);
//     setShowForm(false);
//     loadFaqs();
//   };

//   /* ================= EDIT ================= */
//   const editFAQ = (faq) => {
//     setForm({
//       question: faq.question,
//       answer: faq.answer,
//       category: faq.category,
//       page: faq.page,
//       status: faq.status,
//     });
//     setEditId(faq._id);
//     setShowForm(true);
//   };

//   /* ================= DELETE ================= */
//   const deleteFAQ = async (id) => {
//     if (window.confirm("Delete this FAQ?")) {
//       await axios.delete(`${API}/delete/${id}`);
//       loadFaqs();
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between mb-3">
//         <h3>FAQ Manager</h3>

//         {!showForm && (
//           <button className="btn btn-success" onClick={() => setShowForm(true)}>
//             Add FAQ
//           </button>
//         )}
//       </div>

//       {/* ================= PAGE FILTER ================= */}
//       {!showForm && (
//         <select
//           className="form-control mb-3"
//           value={selectedPage}
//           onChange={(e) => setSelectedPage(e.target.value)}
//         >
//           <option value="">All Pages</option>
//           {PAGES.map((p) => (
//             <option key={p} value={p}>
//               {p}
//             </option>
//           ))}
//         </select>
//       )}

//       {/* ================= FORM ================= */}
//       {showForm && (
//         <div className="card p-3 mb-4">
//           <h5>{editId ? "Edit FAQ" : "Add FAQ"}</h5>

//           <form onSubmit={handleSubmit}>
//             <label className="mt-2">Page</label>
//             <select
//               className="form-control"
//               value={form.page}
//               required
//               onChange={(e) => setForm({ ...form, page: e.target.value })}
//             >
//               <option value="">Select Page</option>
//               {PAGES.map((p) => (
//                 <option key={p} value={p}>
//                   {p}
//                 </option>
//               ))}
//             </select>

//             <label className="mt-2">Question</label>
//             <input
//               type="text"
//               className="form-control"
//               value={form.question}
//               onChange={(e) =>
//                 setForm({ ...form, question: e.target.value })
//               }
//               required
//             />

//             <label className="mt-2">Answer</label>
//             <textarea
//               className="form-control"
//               value={form.answer}
//               onChange={(e) => setForm({ ...form, answer: e.target.value })}
//               required
//             />

//             <label className="mt-2">Category</label>
//             <input
//               type="text"
//               className="form-control"
//               value={form.category}
//               onChange={(e) =>
//                 setForm({ ...form, category: e.target.value })
//               }
//             />

//             <label className="mt-2">Status</label>
//             <select
//               className="form-control"
//               value={form.status}
//               onChange={(e) => setForm({ ...form, status: e.target.value })}
//             >
//               <option value="active">Active</option>
//               <option value="inactive">Inactive</option>
//             </select>

//             <button className="btn btn-primary mt-3 w-100">
//               {editId ? "Update FAQ" : "Save FAQ"}
//             </button>

//             <button
//               type="button"
//               className="btn btn-secondary mt-2 w-100"
//               onClick={() => {
//                 setShowForm(false);
//                 setEditId(null);
//               }}
//             >
//               Cancel
//             </button>
//           </form>
//         </div>
//       )}

//       {/* ================= TABLE ================= */}
//       {!showForm && (
//         <div className="card p-3">
//           <table className="table table-hover">
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Page</th>
//                 <th>Question</th>
//                 <th>Category</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {faqs.map((f, i) => (
//                 <tr key={f._id}>
//                   <td>{i + 1}</td>
//                   <td>
//                     <span className="badge bg-info">{f.page}</span>
//                   </td>
//                   <td>{f.question}</td>
//                   <td>{f.category}</td>
//                   <td>{f.status}</td>

//                   <td>
//                     <button
//                       className="btn btn-primary btn-sm me-2"
//                       onClick={() => editFAQ(f)}
//                     >
//                       Edit
//                     </button>

//                     <button
//                       className="btn btn-danger btn-sm"
//                       onClick={() => deleteFAQ(f._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}

//               {faqs.length === 0 && (
//                 <tr>
//                   <td colSpan="6" className="text-center text-muted">
//                     No FAQs found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FAQPage;















// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./FAQPage.css";

// const API = "https://astrobackend-5sr6.onrender.com/api/faqs";

// const PAGES = [
//   "Home", "About us", "Careers", "Energy", "Astrology", 
//   "Vastu", "Manifestation", "Free Calculators", "Materials", "Blogs",
// ];

// const FAQPage = () => {
//   const [faqs, setFaqs] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [selectedPage, setSelectedPage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     question: "",
//     answer: "",
//     category: "",
//     page: "",
//     status: "active",
//   });

//   const loadFaqs = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API}/list${selectedPage ? `?page=${selectedPage}` : ""}`);
//       setFaqs(res.data.faqs || []);
//     } catch (err) {
//       console.error("Fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadFaqs();
//   }, [selectedPage]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.page) return alert("Please select a page");

//     try {
//       if (editId) {
//         await axios.put(`${API}/update/${editId}`, form);
//       } else {
//         await axios.post(`${API}/add`, form);
//       }
//       resetForm();
//       loadFaqs();
//     } catch (err) {
//       alert("Error saving FAQ");
//     }
//   };

//   const resetForm = () => {
//     setForm({ question: "", answer: "", category: "", page: "", status: "active" });
//     setEditId(null);
//     setShowForm(false);
//   };

//   const editFAQ = (faq) => {
//     setForm({ ...faq });
//     setEditId(faq._id);
//     setShowForm(true);
//   };

//   const deleteFAQ = async (id) => {
//     if (window.confirm("Delete this FAQ permanently?")) {
//       await axios.delete(`${API}/delete/${id}`);
//       loadFaqs();
//     }
//   };

//   return (
//     <div className="faq-admin-container">
//       <header className="faq-header">
//         <div className="header-text">
//           <h1>FAQ Management</h1>
//           <p>Organize questions and answers across different pages</p>
//         </div>
//         {!showForm && (
//           <button className="btn-add" onClick={() => setShowForm(true)}>
//             New FAQ
//           </button>
//         )}
//       </header>

//       {/* Filters Area */}
//       {!showForm && (
//         <div className="filter-bar">
//           <label>Filter by Page:</label>
//           <select value={selectedPage} onChange={(e) => setSelectedPage(e.target.value)}>
//             <option value="">View All Pages</option>
//             {PAGES.map((p) => <option key={p} value={p}>{p}</option>)}
//           </select>
//         </div>
//       )}

//       {/* Form Section */}
//       {showForm && (
//         <div className="faq-form-card">
//           <h2>{editId ? "Update FAQ" : "Create New FAQ"}</h2>
//           <form onSubmit={handleSubmit} className="modern-form">
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Page Assignment</label>
//                 <select 
//                   value={form.page} 
//                   required 
//                   onChange={(e) => setForm({ ...form, page: e.target.value })}
//                 >
//                   <option value="">Select Page</option>
//                   {PAGES.map((p) => <option key={p} value={p}>{p}</option>)}
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Category (Optional)</label>
//                 <input 
//                   type="text" 
//                   value={form.category} 
//                   onChange={(e) => setForm({ ...form, category: e.target.value })} 
//                 />
//               </div>
//             </div>

//             <div className="form-group">
//               <label>Question</label>
//               <input 
//                 type="text" 
//                 required 
//                 value={form.question} 
//                 onChange={(e) => setForm({ ...form, question: e.target.value })} 
//               />
//             </div>

//             <div className="form-group">
//               <label>Answer</label>
//               <textarea 
//                 rows="4" 
//                 required 
//                 value={form.answer} 
//                 onChange={(e) => setForm({ ...form, answer: e.target.value })} 
//               />
//             </div>

//             <div className="form-group">
//               <label>Publish Status</label>
//               <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//               </select>
//             </div>

//             <div className="form-actions">
//               <button type="submit" className="btn-save">
//                 {editId ? "Update Changes" : "Save FAQ"}
//               </button>
//               <button type="button" className="btn-cancel" onClick={resetForm}>
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* FAQ Grid (Responsive Card View) */}
//       {!showForm && (
//         <div className="faq-grid">
//           {loading ? (
//             <p className="status-msg">Loading records...</p>
//           ) : faqs.length > 0 ? (
//             faqs.map((f) => (
//               <div key={f._id} className="faq-item-card">
//                 <div className="card-top">
//                   <span className="page-tag">{f.page}</span>
//                   <span className={`status-tag ${f.status}`}>{f.status}</span>
//                 </div>
//                 <h3>{f.question}</h3>
//                 <p className="faq-answer">{f.answer}</p>
//                 {f.category && <span className="cat-label">Category: {f.category}</span>}
//                 <div className="card-footer">
//                   <button className="btn-edit" onClick={() => editFAQ(f)}>Edit</button>
//                   <button className="bg-red-500 text-white px-4 py-2" onClick={() => deleteFAQ(f._id)}>Delete</button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="empty-box">No FAQs found for this selection.</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FAQPage;

















import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FAQPage.css";

const API = "https://astrobackend-5sr6.onrender.com/api/faqs";
const PAGES = ["Home", "About us", "Careers", "Energy", "Astrology", "Vastu", "Manifestation", "Free Calculators", "Materials", "Blogs"];

const FAQPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [selectedPage, setSelectedPage] = useState("");
  const [form, setForm] = useState({ question: "", answer: "", category: "", page: "", status: "active" });

  const loadFaqs = async () => {
    try {
      const res = await axios.get(`${API}/list${selectedPage ? `?page=${selectedPage}` : ""}`);
      setFaqs(res.data.faqs || []);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { loadFaqs(); }, [selectedPage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) await axios.put(`${API}/update/${editId}`, form);
    else await axios.post(`${API}/add`, form);
    resetForm();
    loadFaqs();
  };

  const resetForm = () => {
    setForm({ question: "", answer: "", category: "", page: "", status: "active" });
    setEditId(null);
    setShowForm(false);
  };

  const deleteFAQ = async (id) => {
    if (window.confirm("Delete this FAQ?")) {
      await axios.delete(`${API}/delete/${id}`);
      loadFaqs();
    }
  };

  return (
    <div className="faq-container">
      <div className="faq-header">
        <h2>FAQ Manager</h2>
        {!showForm && <button className="btn-main" onClick={() => setShowForm(true)}>Add FAQ</button>}
      </div>

      {!showForm && (
        <div className="filter-section">
          <select value={selectedPage} onChange={(e) => setSelectedPage(e.target.value)}>
            <option value="">All Pages</option>
            {PAGES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      )}

      {showForm ? (
        <div className="faq-card-form">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="field">
                <label>Page</label>
                <select required value={form.page} onChange={(e) => setForm({ ...form, page: e.target.value })}>
                  <option value="">Select Page</option>
                  {PAGES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Category</label>
                <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
              </div>
            </div>
            <div className="field">
              <label>Question</label>
              <input required type="text" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} />
            </div>
            <div className="field">
              <label>Answer</label>
              <textarea required rows="3" value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} />
            </div>
            <div className="form-btns">
              <button type="submit" className="btn-save">Save FAQ</button>
              <button type="button" className="btn-cancel" onClick={resetForm}>Cancel</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="faq-table">
            <thead>
              <tr>
                <th>Page</th>
                <th>Question</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {faqs.map((f) => (
                <tr key={f._id}>
                  <td data-label="Page"><span className="page-pill">{f.page}</span></td>
                  <td data-label="Question" className="q-text">{f.question}</td>
                  <td data-label="Category">{f.category || "N/A"}</td>
                  <td data-label="Status">
                    <span className={`status-dot ${f.status}`}>{f.status}</span>
                  </td>
                  <td data-label="Actions">
                    <div className="action-btns">
                      <button className="edit-link" onClick={() => { setForm(f); setEditId(f._id); setShowForm(true); }}>Edit</button>
                      <button className="delete-link" onClick={() => deleteFAQ(f._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FAQPage;