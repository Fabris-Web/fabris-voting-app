import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AdminCreateElection() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleCreate = async () => {
    const { error } = await supabase.from("elections").insert([
      {
        title,
        description,
        start_date: startDate,
        end_date: endDate,
      },
    ]);

    if (error) setMessage(error.message);
    else {
      setMessage("Election created successfully!");
      // redirect to admin dashboard or contenders page
      navigate("/admin");
    }
  };

  return (
    <div className="container">
      <h2>Create Election</h2>
      {message && <p>{message}</p>}
      <input
        type="text"
        placeholder="Election Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Election Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="datetime-local"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="datetime-local"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button onClick={handleCreate}>Create Election</button>
    </div>
  );
}
