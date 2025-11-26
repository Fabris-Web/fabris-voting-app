import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminAddContenders() {
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);
  const [contenders, setContenders] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Fetch all elections
  const fetchElections = async () => {
    const { data, error } = await supabase
      .from("elections")
      .select("*")
      .order("start_date", { ascending: true });
    if (error) console.log(error.message);
    else setElections(data);
  };

  // Fetch contenders for selected election
  const fetchContenders = async (electionId) => {
    const { data, error } = await supabase
      .from("contenders")
      .select("*")
      .eq("election_id", electionId);
    if (error) console.log(error.message);
    else setContenders(data);
  };

  useEffect(() => {
    fetchElections();
  }, []);

  const handleSelectElection = (election) => {
    setSelectedElection(election);
    fetchContenders(election.id);
    setMessage("");
  };

  const handleAddContender = async () => {
    if (!selectedElection) return;

    const { error } = await supabase.from("contenders").insert([
      {
        election_id: selectedElection.id,
        name,
        description,
      },
    ]);

    if (error) setMessage(error.message);
    else {
      setMessage("Contender added!");
      setName("");
      setDescription("");
      fetchContenders(selectedElection.id);
    }
  };

  return (
    <div className="container">
      <AdminNavbar />

      <h2>Add Contenders</h2>
      {message && <p>{message}</p>}

      {/* Step 1: Select election */}
      {!selectedElection && (
        <div>
          <h3>Select Election</h3>
          <ul>
            {elections.map((e) => (
              <li key={e.id}>
                {e.title}{" "}
                <button onClick={() => handleSelectElection(e)}>Select</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Step 2: Add contenders for selected election */}
      {selectedElection && (
        <div>
          <h3>Adding contenders for: {selectedElection.title}</h3>
          <input
            type="text"
            placeholder="Contender Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Contender Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleAddContender}>Add Contender</button>

          <h4>Current Contenders</h4>
          <ul>
            {contenders.map((c) => (
              <li key={c.id}>{c.name}</li>
            ))}
          </ul>

          <button onClick={() => setSelectedElection(null)}>Back to Elections</button>
        </div>
      )}

      <button onClick={() => navigate("/admin")}>Back to Admin Dashboard</button>
    </div>
  );
}
