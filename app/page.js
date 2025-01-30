"use client";

import { useState, useRef } from "react";
import Upload from "../components/Upload";

export default function Home() {
  const [videoUrl, setVideoUrl] = useState(null);
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const videoRef = useRef(null);

  const handleSeek = (timestamp) => {
    if (videoRef.current) {
      videoRef.current.currentTime = timestamp;
      setResponse(`Video seeked to ${timestamp} seconds.`);
    }
  };

  const handleAsk = async () => {
    if (!query) return;

    // Simulate AI agent response
    const answer = events
      .filter((event) => event.event === "shoot")
      .map((event) => event.time)
      .join(", ");
    setResponse(`A player shoots the ball at: ${answer}`);
  };

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-4">Basketball AI Analyzer</h1>
      <Upload
        onUploadComplete={(url) => setVideoUrl(url)}
        onAnalysisComplete={(events) => setEvents(events)}
      />

      {videoUrl && (
        <div className="mt-4">
          <h2 className="text-xl">Uploaded Video:</h2>
          <video ref={videoRef} controls className="mt-2 w-96">
            <source src={`http://127.0.0.1:8000/uploads/${videoUrl}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      <div className="mt-4 w-96">
        <h2 className="text-xl">AI Agent</h2>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Ask a question..."
        />
        <button onClick={handleAsk} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          Ask
        </button>
        <p className="mt-2">{response}</p>
      </div>
    </div>
  );
}
