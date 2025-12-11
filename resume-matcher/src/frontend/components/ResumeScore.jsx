import { useState, useRef, useEffect } from "react";
import TextUploadBox from "./TextUploadBox";
import { resumeScore } from "../api";

export default function ResumeScore() {
  const [resumeText, setResumeText] = useState("");
  const [scoreData, setScoreData] = useState(null);

  const resultRef = useRef(null);

  useEffect(() => {
    if (scoreData && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [scoreData]);

  const getATSScore = async () => {
    if (!resumeText.trim()) {
      alert("Please upload or paste a resume first.");
      return;
    }

    try {
      const response = await resumeScore(resumeText);
      setScoreData(response.data.result);
    } catch (err) {
      alert("Unable to fetch ATS score.");
      console.error(err);
    }
  };

  const CircularScore = ({ score }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
      <svg width="160" height="160" className="mx-auto my-6 drop-shadow-lg">
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="rgba(0,0,0,0.1)"
          strokeWidth="12"
          fill="none"
        />
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="#3b82f6"
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 80 80)"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="34"
          fontWeight="700"
          fill="#1e3a8a"
        >
          {score}
        </text>
      </svg>
    );
  };

  return (
    <div
      className="
        max-h-full w-full
        flex flex-col items-center justify-center 
        bg-gradient-to-b from-blue-300 via-blue-100 to-white 
        overflow-auto pt-24 px-4
      "
    >
      {/* Glassmorphism Card */}
      <div
        className="
          animate-fadeIn
          backdrop-blur-xl bg-white/40 
          shadow-2xl rounded-3xl 
          p-10 w-full max-w-3xl
          border border-white/30
        "
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-blue-700">
          Resume ATS Score Checker
        </h1>

        <p className="text-center mt-3 text-blue-600 text-lg">
          Upload your resume to check ATS compatibility.
        </p>

        {/* Upload Box */}
        <div className="mt-8">
          <TextUploadBox
            label="Resume"
            value={resumeText}
            setValue={setResumeText}
          />
        </div>

        {/* Button */}
        <div className="text-center mt-8">
          <button
            onClick={getATSScore}
            className="
            px-6 py-2 
            rounded-xl 
          bg-blue-600 text-white font-normal
          hover:bg-blue-700 
            hover:shadow-md hover:shadow-blue-300/50
            transition-all duration-300
            "
          >
            Get ATS Score
          </button>
        </div>
      </div>

      {/* Results */}
      {scoreData && (
        <div
          ref={resultRef}
          className="
            mt-8 p-8 rounded-2xl 
            bg-white/70 shadow-md border border-gray-200
            space-y-8 w-full max-w-3xl
          "
        >
          <h2 className="text-3xl font-bold text-center text-blue-800">
            Your ATS Score
          </h2>

          {/* Score Circle */}
          <CircularScore score={scoreData.ats_score || 0} />

          {/* Missing Sections */}
          <div>
            <h3 className="font-semibold text-xl text-blue-800">Missing Sections</h3>
            {scoreData.missing_sections?.length ? (
              <ul className="list-disc ml-6 text-red-600 mt-2">
                {scoreData.missing_sections.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700 mt-2">No sections missing.</p>
            )}
          </div>

          {/* Formatting Issues */}
          <div>
            <h3 className="font-semibold text-xl text-blue-800">Formatting Issues</h3>
            {scoreData.formatting_issues?.length ? (
              <ul className="list-disc ml-6 text-red-600 mt-2">
                {scoreData.formatting_issues.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700 mt-2">No formatting issues.</p>
            )}
          </div>

          {/* Good Keywords */}
          <div>
            <h3 className="font-semibold text-xl text-blue-800">Good Keywords Found</h3>
            {scoreData.good_keywords?.length ? (
              <ul className="list-disc ml-6 text-green-600 mt-2">
                {scoreData.good_keywords.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700 mt-2">No strong keywords detected.</p>
            )}
          </div>

          {/* Suggestions */}
          <div>
            <h3 className="font-semibold text-xl text-blue-800">Suggestions</h3>
            <p className="text-gray-700 mt-1">
              {scoreData.suggestions || "No suggestions provided."}
            </p>
          </div>
          {/* Back to the top */}
          <div className="flex justify-center">
              <button
                onClick={() =>
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
                className="
                  mt-3 px-5 py-2 
                  rounded-xl 
                  bg-blue-500 text-white text-sm
                  hover:bg-blue-600 
                  transition
                "
              >
                Back to upload
              </button>
            </div>
        </div>
      )}
    </div>
  );
}
