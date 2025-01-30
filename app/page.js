"use client";

import { useState, useRef } from "react";
import Upload from "../components/Upload";
import Chatbot from 'react-chatbot-kit';
import ActionProvider from '../components/chatbot/ActionProvider';
import MessageParser from '../components/chatbot/MessageParser';
import config from '../components/chatbot/config';
import 'react-chatbot-kit/build/main.css';


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
      <header className="App-header">
        <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser} />
      </header>
    </div>
  );
}
