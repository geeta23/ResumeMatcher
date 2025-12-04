// src/components/ResultCard.jsx
import React from "react";

export default function ResultCard({ result }) {
  if (!result) return null;

  // result shape expectation:
  // { match, missing, bullets, summary, raw }
  return (
    <div className="mt-6 p-5 bg-white border rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-3">Analysis Results</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-3 border rounded">
          <div className="text-xs text-slate-500">Match %</div>
          <div className="text-2xl font-bold text-blue-600">{result.match || "—"}</div>
        </div>

        <div className="p-3 border rounded">
          <div className="text-xs text-slate-500">Missing Skills</div>
          <div className="mt-2 whitespace-pre-wrap text-sm text-slate-700">{result.missing || "None detected"}</div>
        </div>

        <div className="p-3 border rounded">
          <div className="text-xs text-slate-500">ATS Tips</div>
          <div className="mt-2 text-sm text-slate-700">{result.ats || "Use job keywords and simple headings."}</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-sm font-medium mb-1">Improved bullet points</div>
        <pre className="whitespace-pre-wrap bg-slate-50 p-3 rounded border text-sm">{result.bullets || "—"}</pre>
      </div>

      <div className="mt-4">
        <div className="text-sm font-medium mb-1">Tailored summary</div>
        <pre className="whitespace-pre-wrap bg-slate-50 p-3 rounded border text-sm">{result.summary || "—"}</pre>
      </div>

      <details className="mt-3 text-xs text-slate-500">
        <summary className="cursor-pointer">Show raw AI output</summary>
        <pre className="whitespace-pre-wrap bg-slate-100 p-3 rounded mt-2 text-xs">{result.raw || ""}</pre>
      </details>
    </div>
  );
}
