import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [elections, setElections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchElections = async () => {
      const { data, error } = await supabase
        .from("elections")
        .select("*");
      if (error) console.log(error.message);
      else setElections(data);
    };

    fetchElections();
  }, []);

  return (
    <div className="container">
      <h2>Available Elections</h2>
      {elections.length === 0 ? (
        <p>No active elections.</p>
      ) : (
        <ul>
          {elections.map((election) => (
            <li key={election.id}>
              <h3>{election.title}</h3>
              <p>{election.description}</p>
              <button onClick={() => navigate(`/vote/${election.id}`)}>
                Vote Now
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
