import { useState } from "react";
import { supabase } from "../supabaseClient";
import AdminNavbar from "../components/AdminNavbar";

const box = {
  maxWidth: "600px",
  margin: "0 auto",
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const input = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  marginBottom: "20px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const btn = {
  background: "#0066ff",
  color: "white",
  padding: "10px 15px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

export default function AdminCreateElection() {
  const [title, setTitle] = useState("");

  const createElection = async () => {
    if (!title) return alert("Title required");

    await supabase.from("elections").insert([{ title }]);
    alert("Election created!");

    setTitle("");
  };

  return (
    <>
      <AdminNavbar />
      <div style={box}>
        <h2>Create New Election</h2>

        <input
          style={input}
          placeholder="Election title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button style={btn} onClick={createElection}>
          Create Election
        </button>
      </div>
    </>
  );
}
