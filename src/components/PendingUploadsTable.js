// // import React, { useState } from "react";

// // export default function PendingUploadsTable() {
// //   const [uploads] = useState([
// //     { id: 1, client: "John Doe", report: "PDF #A12", date: "2025-10-10" },
// //     { id: 2, client: "Jane Smith", report: "PDF #A13", date: "2025-10-12" },
// //     { id: 3, client: "Alex Johnson", report: "PDF #A14", date: "2025-10-14" },
// //   ]);

// //   const sortedUploads = [...uploads].sort((a, b) => new Date(a.date) - new Date(b.date));

// //   return (
// //     <div className="table-container">
// //       <h3>Pending PDF Uploads</h3>
// //       <table>
// //         <thead>
// //           <tr>
// //             <th>Client</th>
// //             <th>Report</th>
// //             <th>Date</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {sortedUploads.map((upload) => (
// //             <tr key={upload.id}>
// //               <td>{upload.client}</td>
// //               <td>{upload.report}</td>
// //               <td>{upload.date}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // }

// import React, { useState } from "react";

// export default function PendingUploadsTable() {
//   const [uploads, setUploads] = useState([
//     { id: 1, client: "John Doe", report: "PDF #A12", date: "2025-10-10" },
//     { id: 2, client: "Jane Smith", report: "PDF #A13", date: "2025-10-12" },
//     { id: 3, client: "Alex Johnson", report: "PDF #A14", date: "2025-10-14" },
//   ]);

//   const sortByDate = () => {
//     const sorted = [...uploads].sort(
//       (a, b) => new Date(a.date) - new Date(b.date)
//     );
//     setUploads(sorted);
//   };

//   return (
//     <div className="table-container">
//       <h3>Pending PDF Uploads</h3>
//       <button onClick={sortByDate} className="action-btn" style={{marginBottom:"10px"}}>
//         Sort by Date
//       </button>
//       <table>
//         <thead>
//           <tr>
//             <th>Client</th>
//             <th>Report</th>
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {uploads.map((upload) => (
//             <tr key={upload.id}>
//               <td>{upload.client}</td>
//               <td>{upload.report}</td>
//               <td>{upload.date}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import React from "react";

export default function PendingUploadsTable({ uploads = [] }) {
  const safeRows = Array.isArray(uploads) ? uploads : [];
  const headers = ["Client", "Report", "Date"];

  const getCell = (row, key) => {
    if (!row || typeof row !== "object") return "—";
    switch (key) {
      case "Client":
        return row.client || row.clientName || "—";
      case "Report":
        return row.report || row.title || row.type || "—";
      case "Date":
        return row.date || row.createdAt || row.updatedAt || "—";
      default:
        return "—";
    }
  };

  return (
    <div className="table-container">
      <h3>Pending PDF Uploads</h3>
      <table>
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {safeRows.length === 0 ? (
            <tr>
              <td colSpan={headers.length} style={{ textAlign: "center" }}>
                No pending uploads
              </td>
            </tr>
          ) : (
            safeRows.map((row, idx) => (
              <tr key={row.id || row._id || idx}>
                {headers.map((h) => (
                  <td key={h}>{getCell(row, h)}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
