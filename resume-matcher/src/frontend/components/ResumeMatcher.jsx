// import { useState, useRef } from "react";
// import { matchResume } from "../api";
// import TextUploadBox from "./TextUploadBox";

// export default function ResumeMatcher() {
//   const [resumeText, setResumeText] = useState("");
//   const [jobDesc, setJobDesc] = useState("");
//   const [result, setResult] = useState(null);

//   // ⭐ Create a reference to the results section
//   const resultRef = useRef(null);

//   const handleMatch = async () => {
//     if (!resumeText || !jobDesc)
//       return alert("Please enter both resume and job description.");

//     const res = await matchResume(resumeText, jobDesc);

//     setResult(res.data.result);

//     // ⭐ Smoothly scroll to results after update
//     setTimeout(() => {
//       resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//     }, 100);
//   };

//   return (
//     <div
//       className="fixed inset-0
//         flex flex-col items-center justify-center
//         bg-gradient-to-b from-blue-300 via-blue-100 to-white
//         overflow-auto pt-24 px-4
//       "
//     >
//       {/* Glassmorphism Container */}
//       <div
//         className="
//           animate-fadeIn
//           backdrop-blur-xl bg-white/40
//           shadow-2xl rounded-3xl
//           p-10 w-full max-w-3xl
//           border border-white/30
//         "
//       >
//         <div className="max-w-6xl mx-auto p-6">
//           <h2 className="text-2xl font-bold mb-6 text-gray-800">
//             Smart Resume Matcher
//           </h2>

//           {/* Two-column layout */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <TextUploadBox
//               label="Resume"
//               value={resumeText}
//               setValue={setResumeText}
//             />

//             <TextUploadBox
//               label="Job Description"
//               value={jobDesc}
//               setValue={setJobDesc}
//             />
//           </div>

//           <button
//             onClick={handleMatch}
//             className="bg-blue-600 text-white px-6 py-2 mt-6 rounded-lg shadow hover:bg-blue-700"
//           >
//             Match Resume
//           </button>

//           {/* ⭐ Results Section with scroll ref */}
//           {result && (
//             <div
//               ref={resultRef}
//               className="mt-8 bg-white p-6 shadow rounded-lg space-y-4 w-full"
//             >
//               <div>
//                 <h3 className="font-bold text-lg">Match Score</h3>
//                 <p className="text-3xl font-extrabold text-blue-600">
//                   {result.match_percentage}%
//                 </p>
//               </div>

//               <div>
//                 <h3 className="font-bold text-lg">Summary</h3>
//                 <p className="text-gray-700">{result.summary}</p>
//               </div>

//               <div>
//                 <h3 className="font-bold text-lg">Strengths</h3>
//                 <ul className="list-disc ml-6 text-green-600">
//                   {result.matched_skills?.map((s, i) => (
//                     <li key={i}>{s}</li>
//                   ))}
//                 </ul>
//               </div>

//               <div>
//                 <h3 className="font-bold text-lg">Missing Skills</h3>
//                 <ul className="list-disc ml-6 text-red-600">
//                   {result.missing_skills?.map((s, i) => (
//                     <li key={i}>{s}</li>
//                   ))}
//                 </ul>
//               </div>

//               <div>
//                 <h3 className="font-bold text-lg">Recommendations</h3>
//                 <p className="text-gray-700">{result.recommendations}</p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useRef } from "react";
import { FileText } from "lucide-react";
import { matchResume } from "../api";
import TextUploadBox from "./TextUploadBox";

export default function ResumeMatcher() {
  const [resumeText, setResumeText] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);

  const resultRef = useRef(null);

  const handleMatch = async () => {
    if (!resumeText || !jobDesc)
      return alert("Please enter both resume and job description.");

    const res = await matchResume(resumeText, jobDesc);
    setResult(res.data.result);

    setTimeout(() => {
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);
  };

  return (
    <div
      className="
        fixed inset-0 
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
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <FileText size={36} className="text-blue-700" />
          <h1 className="text-2xl font-extrabold text-blue-800 tracking-wide">
            Smart Resume Matcher
          </h1>
        </div>

        <p className="text-gray-700 text-sm mb-6 leading-relaxed">
          Paste your resume and JD to get an instant match score, find missing
          skills, and receive personalized improvement tips.
        </p>

        {/* Two Inputs Side-by-Side */}
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

        {/* Match Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleMatch}
            className="
              px-8 py-3 
              rounded-xl 
              bg-blue-600 text-white font-semibold
              hover:bg-blue-700 
              hover:shadow-lg hover:shadow-blue-300/60
              transition-all duration-300
            "
          >
            Match Resume
          </button>
        </div>

        {/* Results Section */}
        {result && (
          <div
            ref={resultRef}
            className="
              mt-8 p-6 rounded-2xl 
              bg-white/70 shadow-md border border-gray-200
              space-y-5
            "
          >
            {/* Match Score */}
            <div>
              <h3 className="text-xl font-bold text-blue-800">Match Score</h3>
              <p className="text-3xl font-extrabold text-blue-600 mt-1">
                {result.match_percentage}%
              </p>
            </div>

            {/* Summary */}
            <div>
              <h3 className="text-xl font-bold text-blue-800">Summary</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                {result.summary}
              </p>
            </div>

            {/* Strengths */}
            <div>
              <h3 className="text-xl font-bold text-blue-800">Strengths</h3>
              <ul className="list-disc ml-6 text-green-600 text-lg">
                {result.matched_skills?.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            {/* Missing Skills */}
            <div>
              <h3 className="text-xl font-bold text-blue-800">
                Missing Skills
              </h3>
              <ul className="list-disc ml-6 text-red-600 text-lg">
                {result.missing_skills?.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            {/* Recommendations */}
            <div>
              <h3 className="text-xl font-bold text-blue-800">
                Recommendations
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {result.recommendations}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
