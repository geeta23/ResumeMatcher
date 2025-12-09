import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js"

//const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/myapp");
connectDB();

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

app.use("/api/auth", authRoutes);

// app.post("/register", async (req, res) => {
//   const { username, password } = req.body;

//   // Check duplicate
//   if (users.find(u => u.username === username)) {
//     return res.status(400).json({ message: "User already exists" });
//   }

//   const hashed = await bcrypt.hash(password, 10);

//   users.push({ username, password: hashed });

//   return res.json({ message: "Registration successful" });
// });

// app.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   const user = users.find(u => u.username === username);

//   if (!user) return res.status(400).json({ message: "Invalid username" });

//   const match = await bcrypt.compare(password, user.password);

//   if (!match) return res.status(400).json({ message: "Invalid password" });

//   // JWT token (expires in 10 min)
//   const token = jwt.sign({ username }, process.env.JWT_SECRET, {
//     expiresIn: "10m"
//   });

//   res.json({ token });
// });

app.listen(3000, () => console.log("🚀 Backend running on port 3000"));
