import React from "react";
import { Link } from "react-router-dom";

export default function AdminNavbar() {
  return (
    <nav
      style={{
        padding: "10px",
        borderBottom: "1px solid #ccc",
        marginBottom: "20px",
      }}
    >
      <Link to="/admin" style={{ marginRight: "15px" }}>
        User Approvals
      </Link>

      <Link to="/admin/create-election" style={{ marginRight: "15px" }}>
        Create Election
      </Link>

      <Link to="/admin/add-contenders" style={{ marginRight: "15px" }}>
        Add Contenders
      </Link>
    </nav>
  );
}
