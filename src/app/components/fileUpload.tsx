"use client";  // ✅ Add this at the top

import { useState } from "react";
import axios from "axios";
import Papa from "papaparse";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async ({ target }) => {
      if (!target?.result) return;
      const csvData = Papa.parse(target.result as string, { header: true }).data;

      await axios.post("/api/upload", csvData);
      alert("File uploaded successfully!");
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-4">
      <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleFileUpload} className="bg-blue-500 text-white p-2 ml-2">
        Upload
      </button>
    </div>
  );
}
