import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#222", color: "white" }}>
      <Link to="/" style={{ marginRight: 15, color: "white" }}>Login</Link>
      <Link to="/register" style={{ marginRight: 15, color: "white" }}>Register</Link>
      <Link to="/dashboard" style={{ marginRight: 15, color: "white" }}>Dashboard</Link>
      <Link to="/vote" style={{ marginRight: 15, color: "white" }}>Vote</Link>
      <Link to="/results" style={{ marginRight: 15, color: "white" }}>Results</Link>
      <Link to="/admin" style={{ marginRight: 15, color: "white" }}>Admin</Link>
    </nav>
  );
}
