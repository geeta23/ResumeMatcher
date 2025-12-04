import axios from "axios"

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

// export async function analyzeResume({ resume, jd }) {
//   // returns the whole response data or throws
//   const res = await axios.post(`${API_BASE}/analyze`, { resume, jd });
//   return res.data;
// }

export async function analyzeResume({ resume, jd }) {
  // mock response for frontend development
  await new Promise((r) => setTimeout(r, 600)); // simulate latency
  return {
    match: "67%",
    missing: "GraphQL, Unit Tests",
    bullets: "- Built X feature that reduced load time\n- Led migration to React 18",
    summary: "Frontend engineer with 3+ years building React apps.",
    atsTips: "Add keyword: GraphQL",
  };
}