// // import React, { useState } from "react";
// // import axios from "axios";
// // import "../../styles/PanchangCalculator.css";

// // const API_BASE = process.env.REACT_APP_API_URL || "https://astrobackend-5sr6.onrender.com/api";

// // export default function PanchangCalculator() {
// //   const [form, setForm] = useState({ city: "", date: "" });
// //   const [result, setResult] = useState(null);
// //   const [loading, setLoading] = useState(false);

// //   const handleChange = (e) =>
// //     setForm({ ...form, [e.target.name]: e.target.value });

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setResult(null);

// //     try {
// //       const res = await axios.post(`${API_BASE}/panchang`, form);
// //       setResult(res.data);
// //     } catch (err) {
// //       console.error("❌ Panchang Error:", err.response?.data || err.message);
// //       alert(err.response?.data?.error || "Failed to fetch Panchang");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="calculator-container">
// //       <h2>🪔 Panchang Calculator</h2>
// //       <form className="calculator-form" onSubmit={handleSubmit}>
// //         <input
// //           type="text"
// //           name="city"
// //           placeholder="City Name"
// //           value={form.city}
// //           onChange={handleChange}
// //           required
// //         />
// //         <input
// //           type="date"
// //           name="date"
// //           value={form.date}
// //           onChange={handleChange}
// //           required
// //         />
// //         <button type="submit" disabled={loading}>
// //           {loading ? "Fetching..." : "Get Panchang"}
// //         </button>
// //       </form>

// //       {result && (
// //         <div className="panchang-result">
// //           <h3>🗓️ Panchang for {result.date}</h3>
// //           <p><strong>🌅 Sunrise:</strong> {result.sunrise}</p>
// //           <p><strong>🌇 Sunset:</strong> {result.sunset}</p>
// //           <p><strong>📅 Weekday:</strong> {result.weekday}</p>
// //           <p><strong>🌙 Tithi:</strong> {result.tithi}</p>
// //           <p><strong>⭐ Nakshatra:</strong> {result.nakshatra}</p>
// //           <p><strong>🧘 Yoga:</strong> {result.yoga}</p>
// //           <p><strong>🐘 Karana:</strong> {result.karana}</p>
// //           <p><strong>🌔 Moonrise:</strong> {result.moonrise}</p>
// //           <p><strong>🌘 Moonset:</strong> {result.moonset}</p>
// //           <p><strong>🥛 Fasting:</strong> {result.fasting}</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../../styles/PanchangCalculator.css";

// const API_BASE = process.env.REACT_APP_API_URL || "https://astrobackend-5sr6.onrender.com/api";

// export default function PanchangCalculator() {
//   const [form, setForm] = useState({ city: "", date: "" });
//   const [result, setResult] = useState(null);
//   const [records, setRecords] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [editId, setEditId] = useState(null);

//   // ---------------- READ: Fetch All Panchang Records ----------------
//   const fetchRecords = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/panchang`);
//       setRecords(res.data);
//     } catch (err) {
//       console.error("❌ Fetch Error:", err.response?.data || err.message);
//     }
//   };

//   useEffect(() => {
//     fetchRecords();
//   }, []);

//   // ---------------- HANDLE FORM CHANGE ----------------
//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   // ---------------- CREATE or UPDATE Panchang ----------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setResult(null);

//     try {
//       if (editId) {
//         // UPDATE
//         const res = await axios.put(`${API_BASE}/panchang/${editId}`, form);
//         alert("✅ Panchang updated successfully!");
//         setEditId(null);
//       } else {
//         // CREATE
//         const res = await axios.post(`${API_BASE}/panchang`, form);
//         setResult(res.data);
//         alert("✅ Panchang fetched and saved!");
//       }

//       setForm({ city: "", date: "" });
//       fetchRecords();
//     } catch (err) {
//       console.error("❌ Panchang Error:", err.response?.data || err.message);
//       alert(err.response?.data?.error || "Failed to process Panchang");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------- EDIT Panchang ----------------
//   const handleEdit = (record) => {
//     setForm({ city: record.city, date: record.date });
//     setEditId(record._id);
//   };

//   // ---------------- DELETE Panchang ----------------
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this record?")) return;
//     try {
//       await axios.delete(`${API_BASE}/panchang/${id}`);
//       alert("🗑️ Panchang deleted!");
//       fetchRecords();
//     } catch (err) {
//       console.error("❌ Delete Error:", err.response?.data || err.message);
//       alert("Failed to delete record");
//     }
//   };

//   return (
//     <div className="calculator-container">
//       <h2>🪔 Panchang Calculator (CRUD)</h2>

//       {/* Form */}
//       <form className="calculator-form" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="city"
//           placeholder="City Name"
//           value={form.city}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="date"
//           name="date"
//           value={form.date}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit" disabled={loading}>
//           {loading
//             ? "Processing..."
//             : editId
//             ? "Update Panchang"
//             : "Get Panchang"}
//         </button>
//       </form>

//       {/* Result */}
//       {result && (
//         <div className="panchang-result">
//           <h3>🗓️ Panchang for {result.date}</h3>
//           <p><strong>🌅 Sunrise:</strong> {result.sunrise}</p>
//           <p><strong>🌇 Sunset:</strong> {result.sunset}</p>
//           <p><strong>📅 Weekday:</strong> {result.weekday}</p>
//           <p><strong>🌙 Tithi:</strong> {result.tithi}</p>
//           <p><strong>⭐ Nakshatra:</strong> {result.nakshatra}</p>
//           <p><strong>🧘 Yoga:</strong> {result.yoga}</p>
//           <p><strong>🐘 Karana:</strong> {result.karana}</p>
//           <p><strong>🌔 Moonrise:</strong> {result.moonrise}</p>
//           <p><strong>🌘 Moonset:</strong> {result.moonset}</p>
//           <p><strong>🥛 Fasting:</strong> {result.fasting}</p>
//         </div>
//       )}

//       {/* Table of all Panchang Records */}
//       <div className="records-table">
//         <h3>📜 Saved Panchang Records</h3>
//         {records.length === 0 ? (
//           <p>No records yet.</p>
//         ) : (
//           <table>
//             <thead>
//               <tr>
//                 <th>City</th>
//                 <th>Date</th>
//                 <th>Sunrise</th>
//                 <th>Sunset</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {records.map((rec) => (
//                 <tr key={rec._id}>
//                   <td>{rec.city}</td>
//                   <td>{rec.date}</td>
//                   <td>{rec.sunrise}</td>
//                   <td>{rec.sunset}</td>
//                   <td>
//                     <button onClick={() => handleEdit(rec)}>✏️ Edit</button>
//                     <button onClick={() => handleDelete(rec._id)}>🗑️ Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/PanchangCalculator.css";

const API_BASE = process.env.REACT_APP_API_URL || "https://astrobackend-5sr6.onrender.com/api";

export default function PanchangCalculator() {
  const [form, setForm] = useState({ city: "", date: "" });
  const [result, setResult] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  // ---------------- READ: Fetch All Panchang Records ----------------
  const fetchRecords = async () => {
    try {
      const res = await axios.get(`${API_BASE}/panchang`);
      setRecords(res.data);
    } catch (err) {
      console.error("❌ Fetch Error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // ---------------- HANDLE FORM CHANGE ----------------
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ---------------- CREATE or UPDATE Panchang ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      if (editId) {
        await axios.put(`${API_BASE}/panchang/${editId}`, form);
        alert("✅ Panchang updated successfully!");
        setEditId(null);
      } else {
        const res = await axios.post(`${API_BASE}/panchang`, form);
        setResult(res.data);
        alert("✅ Panchang fetched and saved!");
      }

      setForm({ city: "", date: "" });
      fetchRecords();
    } catch (err) {
      console.error("❌ Panchang Error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Failed to process Panchang");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- EDIT Panchang ----------------
  const handleEdit = (record) => {
    setForm({ city: record.city, date: record.date });
    setEditId(record._id);
  };

  // ---------------- DELETE Panchang ----------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await axios.delete(`${API_BASE}/panchang/${id}`);
      alert("🗑️ Panchang deleted!");
      fetchRecords();
    } catch (err) {
      console.error("❌ Delete Error:", err.response?.data || err.message);
      alert("Failed to delete record");
    }
  };

  return (
    <div className="calculator-container">
      <h2>🪔 Panchang Calculator</h2>

      {/* FORM */}
      <form className="calculator-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="city"
          placeholder="City Name"
          value={form.city}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading
            ? "Processing..."
            : editId
            ? "Update Panchang"
            : "Get Panchang"}
        </button>
      </form>

      {/* RESULT DISPLAY */}
      {result && (
        <div className="panchang-result">
          <h3>🗓️ Panchang for {result.date}</h3>
          <p><strong>🌅 Sunrise:</strong> {result.sunrise}</p>
          <p><strong>🌇 Sunset:</strong> {result.sunset}</p>
          <p><strong>📅 Weekday:</strong> {result.weekday}</p>
          <p><strong>🌙 Tithi:</strong> {result.tithi}</p>
          <p><strong>⭐ Nakshatra:</strong> {result.nakshatra}</p>
          <p><strong>🧘 Yoga:</strong> {result.yoga}</p>
          <p><strong>🐘 Karana:</strong> {result.karana}</p>
          <p><strong>🌔 Moonrise:</strong> {result.moonrise}</p>
          <p><strong>🌘 Moonset:</strong> {result.moonset}</p>
          <p><strong>🥛 Fasting:</strong> {result.fasting}</p>
        </div>
      )}

      {/* RECORDS TABLE */}
      <div className="records-table">
        <h3>📜 Saved Panchang Records</h3>
        {records.length === 0 ? (
          <p>No records yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>City</th>
                <th>Date</th>
                <th>🌅 Sunrise</th>
                <th>🌇 Sunset</th>
                <th>🌙 Tithi</th>
                <th>⭐ Nakshatra</th>
                <th>🧘 Yoga</th>
                <th>🐘 Karana</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec) => (
                <tr key={rec._id}>
                  <td>{rec.city}</td>
                  <td>{rec.date}</td>
                  <td>{rec.sunrise}</td>
                  <td>{rec.sunset}</td>
                  <td>{rec.tithi}</td>
                  <td>{rec.nakshatra}</td>
                  <td>{rec.yoga}</td>
                  <td>{rec.karana}</td>
                  <td>
                    <button onClick={() => handleEdit(rec)}>✏️</button>
                    <button onClick={() => handleDelete(rec._id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
