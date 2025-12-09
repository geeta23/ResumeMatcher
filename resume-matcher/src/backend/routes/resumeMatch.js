import express from "express";
import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const router = express.Router();

router.post("/match", async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;
    const prompt = `
 You are a skill-matching engine.  
Compare the Resume and Job Description strictly based on skills.

Tasks:
1. Extract all skills mentioned in the Job Description (JD).
2. For each JD skill, check if it is present in the Resume.
   - If present → add to "matched_skills"
   - If not present → add to "missing_skills"
3. Calculate match_percentage = (matched_skills / total JD skills) * 100.
4. Provide a short 2–3 line summary.
5. Output must be in JSON only (no explanations).

Return the response in the following JSON structure:

{
  "match_percentage": "",
  "matched_skills": [],
  "missing_skills": [],
  "summary": ""
}

Inputs:
Resume: ${resumeText}
Job Description: ${jobDescription}
    `;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: prompt }]
    });

    const text = JSON.parse(completion.choices[0].message.content);

    res.json({ result: text });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
