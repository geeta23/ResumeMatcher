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


router.post("/AtsScore", async (req, res) => {
  try {
    const { resumeText} = req.body;
    const prompt = `
 You are an ATS (Applicant Tracking System) evaluation engine.  
Your job is to analyze the resume and return a structured ATS score with detailed insights.

Analyze the resume on these criteria:

1. **Overall ATS Score (0–100)**
   - Keyword strength
   - Content quality
   - Formatting quality
   - ATS readability
   - Resume structure completeness

2. **Missing Sections**
   Identify important sections missing from the resume:
   - Summary / Objective
   - Skills section
   - Work Experience
   - Projects
   - Education
   - Certifications
   - Achievements
   - Contact Information

3. **Formatting Issues**
   - Improper spacing, symbols, tables
   - Overuse of graphics or images
   - Incorrect heading structure
   - File parsing issues
   - Long paragraphs
   - Missing bullets
   - Fonts that ATS may not parse well

4. **Good Keywords Found**
   Extract strong job-market relevant keywords present in the resume.
   Include both:
   - Technical keywords (if present)
   - Non-technical / soft skills (if present)

5. **Suggestions for Improvement**
   Give clear, practical recommendations to improve ATS score.

Your response MUST be JSON only.  
Use this structure exactly:

{
  "ats_score": "",
  "missing_sections": [],
  "formatting_issues": [],
  "good_keywords": [],
  "suggestions": ""
}

Input Resume:
${resumeText}
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
