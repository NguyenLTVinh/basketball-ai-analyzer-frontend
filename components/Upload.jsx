"use client";

import { useState } from "react";
import axios from "axios";

export default function Upload({ onUploadComplete, onAnalysisComplete }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

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
      handleAnalyze(uploadResponse.data.location);
    } catch (error) {
      console.error("Upload error:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    } finally {
      setUploading(false);
    }
  };

  const handleAnalyze = async (fileLocation) => {
    setAnalyzing(true);
  
    try {
      await axios.post("http://127.0.0.1:8000/analyze/", {
        video_path: `uploads/${fileLocation}`,
      });
  
      console.log("Analysis started... polling for results.");
  
      const pollInterval = 5000; // Poll every 5 seconds
  
      const pollForResults = async () => {
        try {
          // Check if analysis is still running
          const statusResponse = await axios.get("http://127.0.0.1:8000/status/");
          if (statusResponse.data.analyzing) {
            setTimeout(pollForResults, pollInterval); // Keep polling
          } else {
            // Analysis is complete, fetch events
            const eventsResponse = await axios.get("http://127.0.0.1:8000/events/");
            console.log("Analysis completed:", eventsResponse.data);
            onAnalysisComplete(eventsResponse.data);
            setAnalyzing(false);
          }
        } catch (error) {
          console.error("Error polling events:", error);
          setAnalyzing(false);
        }
      };
  
      pollForResults();
    } catch (error) {
      console.error("Analysis request error:", error);
      setAnalyzing(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        disabled={uploading || analyzing}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
      >
        {uploading ? "Uploading..." : analyzing ? "Analyzing..." : "Upload Video"}
      </button>
      {(uploading || analyzing) && (
        <div className="mt-2 flex justify-center">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
