// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../../styles/NumerologyCalculator.css";

// const API_BASE = process.env.REACT_APP_API_URL || "https://astrobackend-5sr6.onrender.com/api";

// const NumerologyCalculator = () => {
//   const [form, setForm] = useState({ name: "", dateOfBirth: "" });
//   const [list, setList] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [showForm, setShowForm] = useState(false); // form initially hidden

//   // Fetch all saved calculations
//   const fetchData = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/numerology`);
//       setList(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Handle input change
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Calculate or Update
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingId) {
//         await axios.put(`${API_BASE}/numerology/${editingId}`, form);
//         setEditingId(null);
//       } else {
//         await axios.post(`${API_BASE}/numerology/calculate`, form);
//       }
//       setForm({ name: "", dateOfBirth: "" });
//       setShowForm(false); // hide form after submission
//       fetchData();
//     } catch (err) {
//       console.error("❌ Error:", err);
//       alert("Failed to calculate or update numerology.");
//     }
//   };

//   const handleEdit = (item) => {
//     setForm({
//       name: item.name,
//       dateOfBirth: item.dateOfBirth,
//     });
//     setEditingId(item._id);
//     setShowForm(true); // show form when editing
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this record?")) return;
//     await axios.delete(`${API_BASE}/numerology/${id}`);
//     fetchData();
//   };

//   return (
//     <div className="numerology-container">
//       <h2>🔢 Numerology Calculator</h2>

//       {/* Add Numerology Button */}
//       <button className="add-btn" onClick={() => setShowForm(!showForm)}>
//         {showForm ? "Hide Form" : "Add Numerology"}
//       </button>

//       {/* Form */}
//       {showForm && (
//         <form className="numerology-form" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="name"
//             value={form.name}
//             placeholder="Enter Full Name"
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="date"
//             name="dateOfBirth"
//             value={form.dateOfBirth}
//             onChange={handleChange}
//             required
//           />
//           <button type="submit">
//             {editingId ? "Update" : "Calculate"}
//           </button>
//         </form>
//       )}

//       {/* Results Table */}
//       <div className="numerology-list">
//         {list.length === 0 ? (
//           <p>No records found.</p>
//         ) : (
//           <table className="numerology-table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>DOB</th>
//                 <th>Life Path</th>
//                 <th>Destiny</th>
//                 <th>Soul Urge</th>
//                 <th>Personality</th>
//                 <th>Description</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {list.map((item) => (
//                 <tr key={item._id}>
//                   <td>{item.name}</td>
//                   <td>{item.dateOfBirth}</td>
//                   <td>{item.lifePathNumber}</td>
//                   <td>{item.destinyNumber}</td>
//                   <td>{item.soulUrgeNumber}</td>
//                   <td>{item.personalityNumber}</td>
//                   <td>{item.description}</td>
//                   <td>
//                     <button onClick={() => handleEdit(item)}>✏️ Edit</button>
//                     <button onClick={() => handleDelete(item._id)}>🗑 Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NumerologyCalculator;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/NumerologyCalculator.css";

const API_BASE = process.env.REACT_APP_API_URL || "https://astrobackend-5sr6.onrender.com/api";

const NumerologyCalculator = () => {
  const [form, setForm] = useState({ name: "", dateOfBirth: "" });
  const [list, setList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // ✅ Helper to show toast
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 4000);
  };

  // ✅ Fetch saved numerology records
  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_BASE}/numerology`);
      setList(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setList([]);
      showToast("Failed to load numerology records.", "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Calculate or Update Numerology
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editingId) {
        response = await axios.put(`${API_BASE}/numerology/${editingId}`, form);
        setEditingId(null);
        showToast("Numerology updated successfully.", "success");
      } else {
        response = await axios.post(`${API_BASE}/numerology/calculate`, form);
        const source = response.data?.source || "Local";
        showToast(
          source === "Prokerala"
            ? "✅ Numerology calculated via Prokerala API"
            : "⚙️ Prokerala unavailable — calculated locally",
          source === "Prokerala" ? "success" : "warning"
        );
      }
      setForm({ name: "", dateOfBirth: "" });
      setShowForm(false);
      fetchData();
    } catch (err) {
      console.error("❌ Error:", err);
      showToast("Failed to calculate or update numerology.", "error");
    }
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name,
      dateOfBirth: item.dateOfBirth,
    });
    setEditingId(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    try {
      await axios.delete(`${API_BASE}/numerology/${id}`);
      showToast("Deleted successfully.", "success");
      fetchData();
    } catch (err) {
      showToast("Failed to delete record.", "error");
    }
  };

  return (
    <div className="numerology-container">
      <h2>🔢 Numerology Calculator</h2>

      {/* Add Numerology Button */}
      <button className="add-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : "Add Numerology"}
      </button>

      {/* Toast Notification */}
      {toast.show && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <form className="numerology-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={form.name}
            placeholder="Enter Full Name"
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
            required
          />
          <button type="submit">{editingId ? "Update" : "Calculate"}</button>
        </form>
      )}

      {/* Results Table */}
      <div className="numerology-list">
        {Array.isArray(list) && list.length > 0 ? (
          <table className="numerology-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>DOB</th>
                <th>Life Path</th>
                <th>Destiny</th>
                <th>Soul Urge</th>
                <th>Personality</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.dateOfBirth}</td>
                  <td>{item.lifePathNumber}</td>
                  <td>{item.destinyNumber}</td>
                  <td>{item.soulUrgeNumber}</td>
                  <td>{item.personalityNumber}</td>
                  <td>{item.description}</td>
                  <td>
                    <button onClick={() => handleEdit(item)}>✏️ Edit</button>
                    <button onClick={() => handleDelete(item._id)}>🗑 Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No records found.</p>
        )}
      </div>
    </div>
  );
};

export default NumerologyCalculator;
