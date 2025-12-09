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
    .replace(/\s+/g, " ")                  // collapse all whitespace
    .replace(/[^\w+.\s]/g, "")             // remove weird characters
    .replace(/([A-Za-z])\s+([A-Za-z])/g, "$1$2") // fix broken words "S pring" → "Spring"
    .toLowerCase()
    .trim();
}

export default function TextUploadBox({ label, value, setValue }) {
  const [fileName, setFileName] = useState("");

  // -----------------------------
  // PDF TEXT EXTRACTION
  // -----------------------------
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

  // -----------------------------
  // FILE UPLOAD HANDLER
  // -----------------------------
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const cleanedName = cleanFileName(file.name);
    setFileName(cleanedName);

    let extractedText = "";

    if (file.type === "application/pdf" || cleanedName.toLowerCase().endsWith(".pdf")) {
      try {
        extractedText = await extractPdfText(file);
      } catch (err) {
        console.error("PDF extraction error:", err);
        alert("Unable to extract text from PDF.");
        return;
      }
    } else if (file.type === "text/plain" || cleanedName.toLowerCase().endsWith(".txt")) {
      extractedText = await file.text();
    } else {
      alert("Only PDF and TXT files are supported.");
      return;
    }

    // normalize text before passing to parent
    const cleanText = normalizeExtractedText(extractedText);

    setValue(cleanText);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <label className="font-semibold text-gray-700">{label}</label>

      <textarea
        className="w-full h-40 border p-2 rounded-md mt-2"
        placeholder={`Paste ${label} text or upload a file`}
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      />

      <div className="mt-3">
        <input
          type="file"
          accept=".pdf,.txt"
          onChange={handleFileUpload}
          className="hidden"
          id={`${label}-upload`}
        />
        <label
          htmlFor={`${label}-upload`}
          className="cursor-pointer bg-gray-200 px-4 py-2 rounded shadow hover:bg-gray-300 inline-block"
        >
          Upload PDF / TXT
        </label>

        {fileName && (
          <p className="text-sm text-gray-500 mt-1">Uploaded: {fileName}</p>
        )}
      </div>
    </div>
  );
}
