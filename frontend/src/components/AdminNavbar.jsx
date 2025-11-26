import { Link } from "react-router-dom";

const navStyle = {
  padding: "15px 20px",
  background: "#1e1e2f",
  display: "flex",
  gap: "20px",
  marginBottom: "25px",
  alignItems: "center",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "bold",
  padding: "8px 12px",
  borderRadius: "6px",
};

const hoverStyle = {
  background: "#33334d",
};

export default function AdminNavbar() {
  return (
    <nav style={navStyle}>
      <Link
        to="/admin"
        style={linkStyle}
        onMouseEnter={(e) => (e.target.style.background = hoverStyle.background)}
        onMouseLeave={(e) => (e.target.style.background = "transparent")}
      >
        User Approvals
      </Link>

      <Link
        to="/admin/create-election"
        style={linkStyle}
        onMouseEnter={(e) => (e.target.style.background = hoverStyle.background)}
        onMouseLeave={(e) => (e.target.style.background = "transparent")}
      >
        Create Election
      </Link>

      <Link
        to="/admin/add-contenders"
        style={linkStyle}
        onMouseEnter={(e) => (e.target.style.background = hoverStyle.background)}
        onMouseLeave={(e) => (e.target.style.background = "transparent")}
      >
        Add Contenders
      </Link>
    </nav>
  );
}
