import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/match", async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;
    //console.log(req.body);
    const prompt = `
      Compare this resume and job description.
      Return response in JSON only.
      
      Resume: ${resumeText}
      Job Description: ${jobDescription}

      Provide:
      - match_percentage
      - matched_skills (list)
      - missing_skills (list)
      - summary (2–3 lines)
    `;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }]
    });

    const text = completion.choices[0].message.content;

    res.json({ result: text });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("🚀 Backend running on port 3000"));
