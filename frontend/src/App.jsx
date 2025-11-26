import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import AdminPanel from "./pages/AdminPanel";
import AdminCreateElection from "./pages/AdminCreateElection";
import AdminAddContenders from "./pages/AdminAddContenders";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public auth pages */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User dashboard */}
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
