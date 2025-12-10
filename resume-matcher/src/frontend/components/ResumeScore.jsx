import { useState, useRef, useEffect } from "react";
import TextUploadBox from "./TextUploadBox";
import { resumeScore } from "../api";

export default function ResumeScore() {
  const [resumeText, setResumeText] = useState("");
  const [scoreData, setScoreData] = useState(null);
  const resultRef = useRef(null);

  // Scroll to results
  useEffect(() => {
    if (scoreData && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [scoreData]);

  // Backend call
  const getATSScore = async () => {
    if (!resumeText.trim()) {
      alert("Please upload or paste a resume first.");
      return;
    }

    try {
      const response = await resumeScore(resumeText);
      console.log("ATS SCORE RESPONSE:", response.data.result);
      setScoreData(response.data.result);
    } catch (err) {
      console.error("ATS API error:", err);
      alert("Unable to fetch ATS score.");
    }
  };

  // Circular score ring
  const CircularScore = ({ score }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
      <svg width="140" height="140" className="mx-auto my-4">
        <circle
          cx="70"
          cy="70"
          r={radius}
          stroke="#d1d5db"
          strokeWidth="12"
          fill="none"
        />

        <circle
          cx="70"
          cy="70"
          r={radius}
          stroke="#3b82f6"
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 70 70)"
        />

        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="28"
          fontWeight="bold"
          fill="#2563eb"
        >
          {score}
        </text>
      </svg>
    );
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      
      <h1 className="text-3xl font-bold text-center text-blue-600">
        Resume ATS Score Checker
      </h1>

      <p className="text-center mt-2 text-gray-600">
        Upload your resume to check its ATS compatibility and job-market readiness.
      </p>

      {/* Upload Box */}
      <div className="mt-6">
        <TextUploadBox
          label="Resume"
          value={resumeText}
          setValue={setResumeText}
        />
      </div>

      {/* Button */}
      <div className="text-center mt-6">
        <button
          onClick={getATSScore}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
        >
          Get ATS Score
        </button>
      </div>

      {/* Results */}
      {scoreData && (
        <div
          ref={resultRef}
          className="mt-10 bg-white p-6 shadow rounded-lg space-y-6"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Your ATS Score
          </h2>

          {/* Blue Circular Score */}
          <CircularScore score={scoreData.ats_score || 0} />

          {/* Missing Sections */}
          <div>
            <h3 className="font-bold text-lg">Missing Sections</h3>
            {scoreData.missing_sections?.length ? (
              <ul className="list-disc ml-6 text-red-600">
                {scoreData.missing_sections.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No major sections missing.</p>
            )}
          </div>

          {/* Formatting Issues */}
          <div>
            <h3 className="font-bold text-lg">Formatting Issues</h3>
            {scoreData.formatting_issues?.length ? (
              <ul className="list-disc ml-6 text-red-600">
                {scoreData.formatting_issues.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No major formatting issues found.</p>
            )}
          </div>

          {/* Good Keywords */}
          <div>
            <h3 className="font-bold text-lg">Good Keywords Found</h3>
            {scoreData.good_keywords?.length ? (
              <ul className="list-disc ml-6 text-green-600">
                {scoreData.good_keywords.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No strong keywords detected.</p>
            )}
          </div>

          {/* Suggestions */}
          <div>
            <h3 className="font-bold text-lg">Suggestions</h3>
            <p className="text-gray-700">
              {scoreData.suggestions || "No suggestions provided."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
