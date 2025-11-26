import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Vote() {
  const { electionId } = useParams();
  const [contenders, setContenders] = useState([]);
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContenders = async () => {
      const { data, error } = await supabase
        .from("contenders")
        .select("*")
        .eq("election_id", electionId);

      if (error) console.log(error.message);
      else setContenders(data);
    };

    const fetchVotingToken = async () => {
      // get current user
      const user = supabase.auth.user();
      if (!user) return navigate("/login");

      const { data, error } = await supabase
        .from("voters")
        .select("id")
        .eq("auth_id", user.id)
        .single();

      if (error) return console.log(error.message);

      const { data: tokenData, error: tokenError } = await supabase
        .from("voting_tokens")
        .select("token, used")
        .eq("voter_id", data.id)
        .eq("election_id", electionId)
        .single();

      if (tokenError) return console.log(tokenError.message);
      if (tokenData.used) setMessage("You have already voted.");
      else setToken(tokenData.token);
    };

    fetchContenders();
    fetchVotingToken();
  }, [electionId, navigate]);

  const castVote = async (contenderId) => {
    if (!token) return;

    const { error } = await supabase.from("votes").insert([
      {
        election_id: electionId,
        contender_id: contenderId,
        voting_token: token,
      },
    ]);

    if (error) {
      setMessage(error.message);
      return;
    }

    // mark token as used
    await supabase
      .from("voting_tokens")
      .update({ used: true })
      .eq("token", token);

    setMessage("Vote cast successfully!");
  };

  return (
    <div className="container">
      <h2>Vote</h2>
      {message && <p>{message}</p>}
      <ul>
        {contenders.map((c) => (
          <li key={c.id}>
            {c.name} <button onClick={() => castVote(c.id)}>Vote</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
