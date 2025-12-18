import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://astrobackend-5sr6.onrender.com/api/know-more";

export default function KnowMore() {
  const [title, setTitle] = useState("");
  const [pdf, setPdf] = useState(null);
  const [list, setList] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(API);
    setList(res.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const submit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("pdf", pdf);

    await axios.post(API, formData);
    setTitle("");
    setPdf(null);
    fetchData();
  };

  const remove = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchData();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Know More (PDF)</h2>

      <input
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setPdf(e.target.files[0])}
      />

      <button onClick={submit}>Save</button>

      <hr />

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Title</th>
            <th>View</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>
                <a href={item.pdfUrl} target="_blank" rel="noreferrer">
                  View PDF
                </a>
              </td>
              <td>
                <button onClick={() => remove(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
