import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate, Link } from "react-router-dom"; // <-- import Link

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    const { data: voterData, error: voterError } = await supabase
      .from("voters")
      .select("status, role")
      .eq("auth_id", data.user.id)
      .single();

    if (voterError) {
      setMessage(voterError.message);
      return;
    }

    if (voterData.status !== "approved") {
      setMessage("Account not approved by admin yet.");
      return;
    }

    if (voterData.role === "admin") navigate("/admin");
    else navigate("/dashboard");
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      {/* Link to register page */}
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>

      {message && <p>{message}</p>}
    </div>
  );
}
