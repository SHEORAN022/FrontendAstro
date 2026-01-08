// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API = "https://astrobackend-5sr6.onrender.com/api/chat";

// export default function AdminAstroChat() {
//   const [chats, setChats] = useState([]);
//   const [activeChat, setActiveChat] = useState(null);
//   const [reply, setReply] = useState("");

//   useEffect(() => {
//     loadChats();
//   }, []);

//   const loadChats = async () => {
//     const res = await axios.get(`${API}/all`);
//     setChats(res.data);
//   };

//   const sendReply = async () => {
//     if (!reply) return;
//     const res = await axios.post(`${API}/send/${activeChat._id}`, {
//       sender: "admin",
//       text: reply
//     });
//     setActiveChat(res.data);
//     setReply("");
//     loadChats();
//   };

//   return (
//     <div style={{ display: "flex", gap: 20 }}>
//       {/* Chat List */}
//       <div style={{ width: 280, borderRight: "1px solid #ddd" }}>
//         <h3>Chat Leads</h3>
//         {chats.map(c => (
//           <div
//             key={c._id}
//             style={{ padding: 8, cursor: "pointer" }}
//             onClick={() => setActiveChat(c)}
//           >
//             <b>{c.name}</b>
//             <div style={{ fontSize: 12 }}>{c.intent}</div>
//           </div>
//         ))}
//       </div>

//       {/* Chat Window */}
//       {activeChat && (
//         <div style={{ flex: 1 }}>
//           <h3>{activeChat.name}</h3>

//           <div style={{ height: 300, overflowY: "auto", border: "1px solid #ccc", padding: 10 }}>
//             {activeChat.messages.map((m, i) => (
//               <p key={i}>
//                 <b>{m.sender}:</b> {m.text}
//               </p>
//             ))}
//           </div>

//           <div style={{ marginTop: 10 }}>
//             <input
//               value={reply}
//               onChange={e => setReply(e.target.value)}
//               placeholder="Type reply..."
//               style={{ width: "80%" }}
//             />
//             <button onClick={sendReply}>Send</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://astrobackend-5sr6.onrender.com/api/chat";

export default function AdminAstroChat() {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [reply, setReply] = useState("");

  useEffect(() => {
    loadChats();
  }, []);

  // ================= LOAD ALL CHATS =================
  const loadChats = async () => {
    try {
      const res = await axios.get(`${API}/all`);

      // 🔑 IMPORTANT: backend { success, chats }
      setChats(Array.isArray(res.data.chats) ? res.data.chats : []);
    } catch (err) {
      console.error("Load chats error:", err);
      setChats([]);
    }
  };

  // ================= SEND ADMIN REPLY =================
  const sendReply = async () => {
    if (!reply || !activeChat) return;

    try {
      const res = await axios.post(
        `${API}/admin/send`, // 🔥 NO ID (admin simple route)
        { text: reply }
      );

      setActiveChat(res.data.chat);
      setReply("");
      loadChats();
    } catch (err) {
      console.error("Send reply error:", err);
    }
  };

  return (
    <div style={{ display: "flex", gap: 20 }}>
      {/* ================= CHAT LIST ================= */}
      <div style={{ width: 280, borderRight: "1px solid #ddd" }}>
        <h3>Chat Leads</h3>

        {chats.length === 0 && <p>No chats found</p>}

        {Array.isArray(chats) &&
          chats.map((c) => (
            <div
              key={c._id}
              style={{ padding: 8, cursor: "pointer" }}
              onClick={() => setActiveChat(c)}
            >
              <b>{c.user?.name || "User"}</b>
              <div style={{ fontSize: 12 }}>
                {c.intent || "No intent"}
              </div>
            </div>
          ))}
      </div>

      {/* ================= CHAT WINDOW ================= */}
      {activeChat && (
        <div style={{ flex: 1 }}>
          <h3>{activeChat.user?.name || "User"}</h3>

          <div
            style={{
              height: 300,
              overflowY: "auto",
              border: "1px solid #ccc",
              padding: 10,
            }}
          >
            {Array.isArray(activeChat.messages) &&
              activeChat.messages.map((m, i) => (
                <p key={i}>
                  <b>{m.sender}:</b> {m.text}
                </p>
              ))}
          </div>

          <div style={{ marginTop: 10 }}>
            <input
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Type reply..."
              style={{ width: "80%" }}
            />
            <button onClick={sendReply}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

