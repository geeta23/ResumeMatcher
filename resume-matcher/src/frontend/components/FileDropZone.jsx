import { useCallback } from "react";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function FileDropZone({ onTextExtracted }) {
  const handleFile = async (file) => {
    if (!file) return;

    if (file.type === "application/pdf") {
      const pdf = await pdfjs.getDocument(await file.arrayBuffer()).promise;
      let extractedText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        extractedText += textContent.items.map((t) => t.str).join(" ") + "\n";
      }

      onTextExtracted(extractedText);
      return;
    }

    // For text-based files
    const reader = new FileReader();
    reader.onload = (e) => onTextExtracted(e.target.result);
    reader.readAsText(file);
  };

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      handleFile(file);
    },
    [onTextExtracted]
  );

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-gray-400 p-4 rounded-lg text-center cursor-pointer bg-white hover:bg-gray-50"
    >
      <p className="text-gray-600">Drag & drop file here</p>
      <p className="text-sm text-gray-400">or click to upload</p>

      <input
        type="file"
        className="mt-2 cursor-pointer"
        accept=".txt,.md,.json,.pdf"
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </div>
  );
}
