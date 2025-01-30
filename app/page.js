"use client";

import { useState } from "react";
import Upload from "../components/Upload";

export default function Home() {
  const [videoUrl, setVideoUrl] = useState(null);

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-4">Basketball AI Analyzer</h1>
      <Upload onUploadComplete={(url) => setVideoUrl(url)} />
      
      {videoUrl && (
        <div className="mt-4">
          <h2 className="text-xl">Uploaded Video:</h2>
          <video controls className="mt-2 w-96">
            <source src={`http://127.0.0.1:8000/uploads/${videoUrl}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}
