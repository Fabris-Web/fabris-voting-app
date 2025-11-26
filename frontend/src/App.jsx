import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminCreateElection from "./pages/AdminCreateElection";
import AdminAddContenders from "./pages/AdminAddContenders";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/create-election" element={<AdminCreateElection />} />
        <Route path="/admin/add-contenders" element={<AdminAddContenders />} />

      </Routes>
    </Router>
  );
}

export default App;
