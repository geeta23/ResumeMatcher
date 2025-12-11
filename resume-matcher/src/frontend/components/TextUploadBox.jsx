import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

// FIX FOR VITE
import workerUrl from "pdfjs-dist/build/pdf.worker?url";
pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

// -----------------------------
// CLEAN FILE NAME
// -----------------------------
function cleanFileName(name) {
  if (!name) return name;
  const lastExtMatch = name.match(/(\.[^.]+)$/);
  if (!lastExtMatch) return name;

  const ext = lastExtMatch[1].toLowerCase();
  let cleaned = name;

  while (cleaned.toLowerCase().endsWith(ext + ext)) {
    cleaned = cleaned.slice(0, -ext.length);
  }
  return cleaned;
}

// -----------------------------
// NORMALIZE TEXT FOR ACCURATE SKILL MATCHING
// -----------------------------
function normalizeExtractedText(text) {
  return text
    .replace(/\s+/g, " ")
    .replace(/[^\w+.\s]/g, "")
    .replace(/([A-Za-z])\s+([A-Za-z])/g, "$1$2")
    .toLowerCase()
    .trim();
}

export default function TextUploadBox({ label, value, setValue }) {
  const [fileName, setFileName] = useState("");

  const extractPdfText = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((it) => it.str).join(" ") + "\n";
    }
    return text;
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const cleanedName = cleanFileName(file.name);
    setFileName(cleanedName);

    let extractedText = "";

    if (
      file.type === "application/pdf" ||
      cleanedName.toLowerCase().endsWith(".pdf")
    ) {
      try {
        extractedText = await extractPdfText(file);
      } catch (err) {
        console.error("PDF extraction error:", err);
        alert("Unable to extract text from PDF.");
        return;
      }
    } else if (
      file.type === "text/plain" ||
      cleanedName.toLowerCase().endsWith(".txt")
    ) {
      extractedText = await file.text();
    } else {
      alert("Only PDF and TXT files are supported.");
      return;
    }

    const cleanText = normalizeExtractedText(extractedText);
    setValue(cleanText);
  };

  return (
    <div
      className="
        group
        rounded-2xl 
        p-5 
        bg-white/30 
        backdrop-blur-xl 
        border border-white/50 
        shadow-lg 
        transition-all duration-300
        hover:shadow-2xl hover:shadow-blue-300/40
      "
    >
      {/* Label */}
      <label className="block text-sm font-semibold text-blue-900 mb-2">
        {label}
      </label>

      {/* Text Area */}
      <textarea
        className="
          w-full h-40 
          p-3 rounded-xl 
          border border-blue-200
          bg-white/60 
          backdrop-blur-xl 
          focus:outline-none focus:ring-2 focus:ring-blue-400
          transition
        "
        placeholder={`Paste your ${label} text or upload a file`}
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      />

      {/* Upload */}
      <div className="mt-4">
        <input
          type="file"
          accept=".pdf,.txt"
          onChange={handleFileUpload}
          className="hidden"
          id={`${label}-upload`}
        />

        <label
          htmlFor={`${label}-upload`}
          className="
            cursor-pointer 
            inline-block 
            px-6 py-2 
            rounded-xl 
          bg-blue-200 
          text-gray-800 
            font-medium
            shadow 
          hover:bg-blue-300
          hover:shadow-blue-300/60
            transition-all duration-300
          "
        >
          Upload PDF / TXT
        </label>

        {fileName && (
          <p className="text-sm text-gray-700 mt-2">Uploaded: {fileName}</p>
        )}
      </div>
    </div>
  );
}
