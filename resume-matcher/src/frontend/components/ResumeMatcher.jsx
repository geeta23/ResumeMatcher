import { useState } from "react";
import { matchResume } from "../api";

export default function ResumeMatcher() {
  const [resumeText, setResumeText] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);

  const handleMatch = async () => {
    const res = await matchResume(resumeText, jobDesc);
    setResult(res.data);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Resume Matcher</h2>

      <textarea
        placeholder="Paste your resume text here"
        className="border p-2 w-full h-40"
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
      />

      <textarea
        placeholder="Paste job description here"
        className="border p-2 w-full h-40 mt-4"
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
      />

      <button
        onClick={handleMatch}
        className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
      >
        Match Resume
      </button>
      {result && (
        <pre className="mt-4 bg-gray-100 p-4 rounded">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
