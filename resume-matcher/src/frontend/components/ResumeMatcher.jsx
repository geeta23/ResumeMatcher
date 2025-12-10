import { useState, useRef } from "react";
import { matchResume } from "../api";
import TextUploadBox from "./TextUploadBox";

export default function ResumeMatcher() {
  const [resumeText, setResumeText] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);

  // ⭐ Create a reference to the results section
  const resultRef = useRef(null);
  

  const handleMatch = async () => {
    if (!resumeText || !jobDesc)
      return alert("Please enter both resume and job description.");

    const res = await matchResume(resumeText, jobDesc);

    setResult(res.data.result);

    // ⭐ Smoothly scroll to results after update
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Smart Resume Matcher
        </h2>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TextUploadBox
            label="Resume"
            value={resumeText}
            setValue={setResumeText}
          />

          <TextUploadBox
            label="Job Description"
            value={jobDesc}
            setValue={setJobDesc}
          />
        </div>

        <button
          onClick={handleMatch}
          className="bg-blue-600 text-white px-6 py-2 mt-6 rounded-lg shadow hover:bg-blue-700"
        >
          Match Resume
        </button>

        {/* ⭐ Results Section with scroll ref */}
        {result && (
          <div
            ref={resultRef}
            className="mt-8 bg-white p-6 shadow rounded-lg space-y-4 w-full"
          >

            <div>
              <h3 className="font-bold text-lg">Match Score</h3>
              <p className="text-3xl font-extrabold text-blue-600">
                {result.match_percentage}%
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg">Summary</h3>
              <p className="text-gray-700">{result.summary}</p>
            </div>

            <div>
              <h3 className="font-bold text-lg">Strengths</h3>
              <ul className="list-disc ml-6 text-green-600">
                {result.matched_skills?.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg">Missing Skills</h3>
              <ul className="list-disc ml-6 text-red-600">
                {result.missing_skills?.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg">Recommendations</h3>
              <p className="text-gray-700">{result.recommendations}</p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
