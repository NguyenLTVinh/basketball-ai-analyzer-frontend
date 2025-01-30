"use client";

import { useState } from "react";
import axios from "axios";

export default function Upload({ onUploadComplete, onAnalysisComplete }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
  
    setUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
  
    try {
      const uploadResponse = await axios.post("http://127.0.0.1:8000/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Upload successful:", uploadResponse.data);
      onUploadComplete(uploadResponse.data.location);
  
      setAnalyzing(true);
      const analyzeResponse = await axios.post("http://127.0.0.1:8000/analyze/", {
        video_path: `uploads/${uploadResponse.data.location}`,
      });
      console.log("Analysis successful:", analyzeResponse.data);
      onAnalysisComplete(analyzeResponse.data.events);
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    } finally {
      setUploading(false);
      setAnalyzing(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <input type="file" accept="video/*" onChange={handleFileChange} className="mb-2" />
      <button
        onClick={handleUpload}
        disabled={uploading || analyzing}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
      >
        {uploading ? "Uploading..." : analyzing ? "Analyzing..." : "Upload Video"}
      </button>
      {(uploading || analyzing) && (
        <div className="mt-2 w-full bg-gray-200 rounded-full">
          <div
            className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      )}
    </div>
  );
}
