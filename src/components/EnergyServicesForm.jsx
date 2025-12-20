// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./EnergyServicesForm.css"
// export default function EnergyServicesForm() {
//   const [services, setServices] = useState([]);
//   const [editingId, setEditingId] = useState(null);

//   const [form, setForm] = useState({
//     key: "",
//     title: "",
//     short: "",
//     desc: "",
//     price: "",
//     tag: "",
//   });

//   const API_URL = "https://astrobackend-5sr6.onrender.com/api/energy-services";

//   // FETCH ALL SERVICES
//   const fetchServices = async () => {
//     const res = await axios.get(`${API_URL}/all`);
//     if (res.data.status) setServices(res.data.services);
//   };

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   // HANDLE FORM SUBMIT — CREATE + UPDATE
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (editingId) {
//       // UPDATE SERVICE
//       const res = await axios.put(`${API_URL}/update/${editingId}`, form);
//       if (res.data.status) {
//         alert("Service Updated");
//         setEditingId(null);
//         setForm({
//           key: "",
//           title: "",
//           short: "",
//           desc: "",
//           price: "",
//           tag: "",
//         });
//         fetchServices();
//       }
//     } else {
//       // CREATE SERVICE
//       const res = await axios.post(`${API_URL}/add`, form);
//       if (res.data.status) {
//         alert("Service Added");
//         setForm({
//           key: "",
//           title: "",
//           short: "",
//           desc: "",
//           price: "",
//           tag: "",
//         });
//         fetchServices();
//       }
//     }
//   };

//   // DELETE SERVICE
//   const deleteService = async (id) => {
//     if (!window.confirm("Delete this service?")) return;
//     await axios.delete(`${API_URL}/delete/${id}`);
//     fetchServices();
//   };

//   // EDIT SERVICE — Prefill form
//   const editService = (s) => {
//     setEditingId(s._id);
//     setForm({
//       key: s.key,
//       title: s.title,
//       short: s.short,
//       desc: s.desc,
//       price: s.price,
//       tag: s.tag,
//     });
//   };

//   return (
//     <div>
//       <h2>Energy Services - Full CRUD</h2>

//       {/* FORM */}
//       <form onSubmit={handleSubmit} className="form-box">
//         <input
//           type="text"
//           placeholder="Unique Key"
//           value={form.key}
//           onChange={(e) => setForm({ ...form, key: e.target.value })}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Title"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Short Description"
//           value={form.short}
//           onChange={(e) => setForm({ ...form, short: e.target.value })}
//           required
//         />
//         <textarea
//           placeholder="Full Description"
//           value={form.desc}
//           onChange={(e) => setForm({ ...form, desc: e.target.value })}
//           required
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           value={form.price}
//           onChange={(e) => setForm({ ...form, price: e.target.value })}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Tag"
//           value={form.tag}
//           onChange={(e) => setForm({ ...form, tag: e.target.value })}
//         />

//         <button type="submit" className="edit-btn">
//           {editingId ? "Update Service" : "Add Service"}
//         </button>

//         {/* CANCEL EDIT BUTTON */}
//         {editingId && (
//           <button
//             type="button"
//             onClick={() => {
//               setEditingId(null);
//               setForm({
//                 key: "",
//                 title: "",
//                 short: "",
//                 desc: "",
//                 price: "",
//                 tag: "",
//               });
//             }}
//             className="cancel-btn"
//           >
//             Cancel Edit
//           </button>
//         )}
//       </form>

//       {/* TABLE */}
//       <h3>All Services</h3>
//       <div className="table-container">
//         <table className="admin-table">
//           <thead>
//             <tr>
//               <th>Key</th>
//               <th>Title</th>
//               <th>Short</th>
//               <th>Price</th>
//               <th>Tag</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {services.map((s) => (
//               <tr key={s._id}>
//                 <td data-label="Key">{s.key}</td>
//                 <td data-label="Title">{s.title}</td>
//                 <td data-label="Short">{s.short}</td>
//                 <td data-label="Price">₹{s.price}</td>
//                 <td data-label="Tag">{s.tag}</td>

//                 <td className="actions-cell" data-label="Actions">
//                   <button
//                     onClick={() => editService(s)}
//                     className="edit-btn"
//                   >
//                     Edit
//                   </button>

//                   <button
//                     onClick={() => deleteService(s._id)}
//                     className="delete-btn"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EnergyServicesForm.css";

export default function EnergyServicesForm() {
  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    key: "",
    title: "",
    short: "",
    desc: "",
    price: "",
    tag: "",
  });

  const API_URL = "https://astrobackend-5sr6.onrender.com/api/energy-services";

  // ================= FETCH ALL =================
  const fetchServices = async () => {
    try {
      const res = await axios.get(`${API_URL}/all`);
      if (res.data.status) setServices(res.data.services);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        const res = await axios.put(
          `${API_URL}/update/${editingId}`,
          form
        );
        if (res.data.status) {
          alert("Service Updated");
        }
      } else {
        const res = await axios.post(`${API_URL}/add`, form);
        if (res.data.status) {
          alert("Service Added");
        }
      }

      resetForm();
      fetchServices();
    } catch (err) {
      alert("Something went wrong");
      console.error(err);
    }
  };

  // ================= DELETE =================
  const deleteService = async (id) => {
    if (!window.confirm("Delete this service?")) return;

    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      fetchServices();
    } catch (err) {
      console.error(err);
    }
  };

  // ================= EDIT =================
  const editService = (service) => {
    setEditingId(service._id);
    setForm({
      key: service.key,
      title: service.title,
      short: service.short,
      desc: service.desc,
      price: service.price,
      tag: service.tag,
    });
  };

  // ================= RESET =================
  const resetForm = () => {
    setEditingId(null);
    setForm({
      key: "",
      title: "",
      short: "",
      desc: "",
      price: "",
      tag: "",
    });
  };

  return (
    <div className="energy-wrapper">
      <h2 className="energy-title">Energy Services – Admin Panel</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="energy-form">
        <input
          className="energy-input"
          type="text"
          placeholder="Unique Key"
          value={form.key}
          onChange={(e) => setForm({ ...form, key: e.target.value })}
          required
        />

        <input
          className="energy-input"
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <input
          className="energy-input"
          type="text"
          placeholder="Short Description"
          value={form.short}
          onChange={(e) => setForm({ ...form, short: e.target.value })}
          required
        />

        <textarea
          className="energy-textarea"
          placeholder="Full Description"
          value={form.desc}
          onChange={(e) => setForm({ ...form, desc: e.target.value })}
          required
        />

        <input
          className="energy-input"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />

        <input
          className="energy-input"
          type="text"
          placeholder="Tag"
          value={form.tag}
          onChange={(e) => setForm({ ...form, tag: e.target.value })}
        />

        <div className="energy-btn-group">
          <button type="submit" className="btn-primary">
            {editingId ? "Update Service" : "Add Service"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="btn-secondary"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* TABLE */}
      <h3 className="energy-subtitle">All Services</h3>

      <div className="energy-table-wrapper">
        <table className="energy-table">
          <thead>
            <tr>
              <th>Key</th>
              <th>Title</th>
              <th>Short</th>
              <th>Price</th>
              <th>Tag</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {services.map((s) => (
              <tr key={s._id}>
                <td data-label="Key">{s.key}</td>
                <td data-label="Title">{s.title}</td>
                <td data-label="Short">{s.short}</td>
                <td data-label="Price">₹{s.price}</td>
                <td data-label="Tag">{s.tag}</td>
                <td data-label="Actions" className="energy-actions">
                  <button
                    onClick={() => editService(s)}
                    className="btn-edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteService(s._id)}
                    className="bg-red-500 text-white px-4 py-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
