import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import AdminNavbar from "../components/AdminNavbar";

const container = {
  maxWidth: "600px",
  margin: "0 auto",
  background: "#ffffff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const userCard = {
  padding: "15px",
  borderBottom: "1px solid #ddd",
  display: "flex",
  justifyContent: "space-between",
};

const approveBtn = {
  background: "#28a745",
  color: "white",
  padding: "6px 12px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default function AdminPanel() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const { data, error } = await supabase
      .from("voters")
      .select("*")
      .eq("approved", false);

    if (!error) setUsers(data);
  };

  const approveUser = async (id) => {
    await supabase.from("voters").update({ approved: true }).eq("id", id);
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div style={container}>
        <h2 style={{ marginBottom: "20px" }}>Pending User Approvals</h2>

        {users.length === 0 ? (
          <p>No users waiting for approval.</p>
        ) : (
          users.map((u) => (
            <div key={u.id} style={userCard}>
              <span>{u.email}</span>
              <button style={approveBtn} onClick={() => approveUser(u.id)}>
                Approve
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}
