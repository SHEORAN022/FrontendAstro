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


import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://astrobackend-5sr6.onrender.com/api/faqs";

// 🔹 Pages list (static / later backend se bhi aa sakta hai)
const PAGES = [
  "Home",
  "About us",
  "Careers",
  "Energy",
  "Astrology",
  "Vastu",
   "Manifestation",
    "Free Calculators",
     "Materials",
      "Blogs",
];

const FAQPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [selectedPage, setSelectedPage] = useState("");

  const [form, setForm] = useState({
    question: "",
    answer: "",
    category: "",
    page: "",
    status: "active",
  });

  /* ================= LOAD FAQS ================= */
  const loadFaqs = async () => {
    const res = await axios.get(
      `${API}/list${selectedPage ? `?page=${selectedPage}` : ""}`
    );
    setFaqs(res.data.faqs);
  };

  useEffect(() => {
    loadFaqs();
  }, [selectedPage]);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.page) {
      alert("Please select a page");
      return;
    }

    if (editId) {
      await axios.put(`${API}/update/${editId}`, form);
      alert("FAQ Updated");
    } else {
      await axios.post(`${API}/add`, form);
      alert("FAQ Added");
    }

    setForm({
      question: "",
      answer: "",
      category: "",
      page: "",
      status: "active",
    });
    setEditId(null);
    setShowForm(false);
    loadFaqs();
  };

  /* ================= EDIT ================= */
  const editFAQ = (faq) => {
    setForm({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      page: faq.page,
      status: faq.status,
    });
    setEditId(faq._id);
    setShowForm(true);
  };

  /* ================= DELETE ================= */
  const deleteFAQ = async (id) => {
    if (window.confirm("Delete this FAQ?")) {
      await axios.delete(`${API}/delete/${id}`);
      loadFaqs();
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h3>FAQ Manager</h3>

        {!showForm && (
          <button className="btn btn-success" onClick={() => setShowForm(true)}>
            Add FAQ
          </button>
        )}
      </div>

      {/* ================= PAGE FILTER ================= */}
      {!showForm && (
        <select
          className="form-control mb-3"
          value={selectedPage}
          onChange={(e) => setSelectedPage(e.target.value)}
        >
          <option value="">All Pages</option>
          {PAGES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      )}

      {/* ================= FORM ================= */}
      {showForm && (
        <div className="card p-3 mb-4">
          <h5>{editId ? "Edit FAQ" : "Add FAQ"}</h5>

          <form onSubmit={handleSubmit}>
            <label className="mt-2">Page</label>
            <select
              className="form-control"
              value={form.page}
              required
              onChange={(e) => setForm({ ...form, page: e.target.value })}
            >
              <option value="">Select Page</option>
              {PAGES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>

            <label className="mt-2">Question</label>
            <input
              type="text"
              className="form-control"
              value={form.question}
              onChange={(e) =>
                setForm({ ...form, question: e.target.value })
              }
              required
            />

            <label className="mt-2">Answer</label>
            <textarea
              className="form-control"
              value={form.answer}
              onChange={(e) => setForm({ ...form, answer: e.target.value })}
              required
            />

            <label className="mt-2">Category</label>
            <input
              type="text"
              className="form-control"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            />

            <label className="mt-2">Status</label>
            <select
              className="form-control"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <button className="btn btn-primary mt-3 w-100">
              {editId ? "Update FAQ" : "Save FAQ"}
            </button>

            <button
              type="button"
              className="btn btn-secondary mt-2 w-100"
              onClick={() => {
                setShowForm(false);
                setEditId(null);
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* ================= TABLE ================= */}
      {!showForm && (
        <div className="card p-3">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Page</th>
                <th>Question</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {faqs.map((f, i) => (
                <tr key={f._id}>
                  <td>{i + 1}</td>
                  <td>
                    <span className="badge bg-info">{f.page}</span>
                  </td>
                  <td>{f.question}</td>
                  <td>{f.category}</td>
                  <td>{f.status}</td>

                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => editFAQ(f)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteFAQ(f._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {faqs.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    No FAQs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FAQPage;
