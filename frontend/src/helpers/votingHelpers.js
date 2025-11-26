import { supabase } from "../supabaseClient.js";
import { v4 as uuidv4 } from "uuid"; // make sure you run: npm install uuid

// Function to generate a voting token for a voter in an election
export const createVotingToken = async (voterId, electionId) => {
  const token = uuidv4(); // unique random token

  const { error } = await supabase.from("voting_tokens").insert([
    {
      election_id: electionId,
      voter_id: voterId,
      token: token,
    },
  ]);

  if (error) console.log(error.message);
  else console.log("Voting token created:", token);

  return token;
};
