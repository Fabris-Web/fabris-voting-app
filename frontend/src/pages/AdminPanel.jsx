import AdminNavbar from "../components/AdminNavbar";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { createVotingToken } from "../helpers/votingHelpers";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch all non-admin users
  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("voters")
      .select("id, email, status, role")
      .neq("role", "admin");

    if (error) {
      setMessage(error.message);
      return;
    }

    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Approve user and generate tokens for all active elections
  const approveUser = async (userId) => {
    const { error } = await supabase
      .from("voters")
      .update({ status: "approved" })
      .eq("id", userId);

    if (error) {
      setMessage(error.message);
      return;
    }

    const { data: elections, error: electionError } = await supabase
      .from("elections")
      .select("id")
      .gte("start_date", new Date().toISOString());

    if (electionError) {
      setMessage(electionError.message);
      return;
    }

    for (const election of elections) {
      await createVotingToken(userId, election.id);
    }

    setMessage("User approved and voting tokens generated for active elections!");
    fetchUsers();
  };

  const declineUser = async (userId) => {
    const { error } = await supabase
      .from("voters")
      .update({ status: "declined" })
      .eq("id", userId);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("User declined!");
    fetchUsers();
  };

  return (
    <div className="container">
      {/* ✅ Add the navbar here */}
      <AdminNavbar />

      <h2>Admin Approval Dashboard</h2>
      {message && <p>{message}</p>}

      {users.length === 0 ? (
        <p>No pending users.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ width: "100%", marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.status}</td>
                <td>
                  {user.status === "pending" ? (
                    <>
                      <button onClick={() => approveUser(user.id)}>Approve</button>{" "}
                      <button onClick={() => declineUser(user.id)}>Decline</button>
                    </>
                  ) : (
                    <span>{user.status}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
