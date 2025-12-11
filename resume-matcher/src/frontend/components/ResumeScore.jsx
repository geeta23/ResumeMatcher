import { useState } from "react";
import { FileText } from "lucide-react";
import TextUploadBox from "./TextUploadBox";
import { resumeScore } from "../api";

export default function ResumeScore() {
  const [resumeText, setResumeText] = useState("");
  const [scoreData, setScoreData] = useState(null);

  async function handleSubmit() {
    if (!resumeText.trim()) return;
    const result = await resumeScore(resumeText);
    setScoreData(result);
  }

  return (
    <div
      className="
        fixed inset-0 
        flex flex-col items-center justify-center 
        bg-gradient-to-b from-blue-300 via-blue-100 to-white 
        overflow-auto pt-24 px-4
      "
    >
      {/* Glassmorphism Container */}
      <div
        className="
          animate-fadeIn
          backdrop-blur-xl bg-white/40 
          shadow-2xl rounded-3xl 
          p-10 w-full max-w-3xl
          border border-white/30
        "
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <FileText size={36} className="text-blue-700" />
          <h1 className="text-2xl font-extrabold text-blue-800 tracking-wide">
            Resume Score
          </h1>
        </div>

        <p className="text-gray-700 text-sm mb-6 leading-relaxed">
          Upload or paste your resume text below. Get instant scoring and
          insights to improve your resume.
        </p>

        {/* Upload Box */}
        <TextUploadBox text={resumeText} setText={setResumeText} />

        {/* Submit Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSubmit}
            className="
              px-8 py-3 
              rounded-xl 
              bg-blue-600 text-white font-semibold
              hover:bg-blue-700 
              hover:shadow-lg hover:shadow-blue-300/60
              transition-all duration-300
            "
          >
            Get Score
          </button>
        </div>

        {/* Score Result */}
        {scoreData && (
          <div className="mt-8 p-6 rounded-2xl bg-white/70 shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">
              Your Resume Score: {scoreData.score} / 100
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {scoreData.feedback}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
