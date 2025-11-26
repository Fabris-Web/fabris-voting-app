import { useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom"; // <-- import Link

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    const { error: dbError } = await supabase
      .from("voters")
      .insert([{ auth_id: data.user.id, email, status: "pending" }]);

    if (dbError) {
      setMessage(dbError.message);
      return;
    }

    setMessage(
      "Registration successful! Wait for admin approval before logging in."
    );
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Register</button>
      </form>

      {/* Link to login page */}
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>

      {message && <p>{message}</p>}
    </div>
  );
}
