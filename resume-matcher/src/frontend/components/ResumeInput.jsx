// src/components/ResumeInput.jsx
import React from "react";

export default function ResumeInput({ value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Resume</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your resume (or CV) here..."
        className="w-full min-h-[220px] p-3 rounded-md border border-slate-200 resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <p className="text-xs text-slate-500 mt-2">
        Tip: Paste plain text for best results (remove images/formatting).
      </p>
    </div>
  );
}
