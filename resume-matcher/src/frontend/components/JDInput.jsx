// src/components/JDInput.jsx
import React from "react";

export default function JDInput({ value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Job Description</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the job description here..."
        className="w-full min-h-[220px] p-3 rounded-md border border-slate-200 resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <p className="text-xs text-slate-500 mt-2">
        Tip: include responsibilities & required skills for more accurate matching.
      </p>
    </div>
  );
}
