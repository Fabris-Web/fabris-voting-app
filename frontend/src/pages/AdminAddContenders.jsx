import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import AdminNavbar from "../components/AdminNavbar";

const wrap = {
  maxWidth: "600px",
  margin: "0 auto",
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

export default function AdminAddContenders() {
  const [elections, setElections] = useState([]);
  const [name, setName] = useState("");
  const [selectedElection, setSelectedElection] = useState("");

  const loadElections = async () => {
    const { data } = await supabase.from("elections").select("*");
    setElections(data);
  };

  const addContender = async () => {
    if (!name || !selectedElection)
      return alert("Enter contender name & choose election.");

    await supabase.from("contenders").insert([
      { election_id: selectedElection, name },
    ]);

    alert("Contender added!");
    setName("");
  };

  useEffect(() => {
    loadElections();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div style={wrap}>
        <h2>Add Contenders</h2>

        <label>Choose Election:</label>
        <select
          style={{ ...wrap, padding: "10px", marginBottom: "15px" }}
          onChange={(e) => setSelectedElection(e.target.value)}
        >
          <option value="">Select </option>

          {elections.map((el) => (
            <option key={el.id} value={el.id}>
              {el.title}
            </option>
          ))}
        </select>

        <input
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
          placeholder="Contender name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          style={{
            background: "#0066ff",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={addContender}
        >
          Add
        </button>
      </div>
    </>
  );
}
