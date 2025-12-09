import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js"
import resumeRoutes from "./routes/resumeMatch.js"

connectDB();
const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/resume", resumeRoutes);
app.use("/api/auth", authRoutes);
app.listen(3000, () => console.log("🚀 Backend running on port 3000"));
