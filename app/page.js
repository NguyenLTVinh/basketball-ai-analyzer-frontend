"use client";

import { useState, useRef } from "react";
import Upload from "../components/Upload";
import Chatbot from 'react-chatbot-kit';
import ActionProvider from '../components/chatbot/ActionProvider';
import MessageParser from '../components/chatbot/MessageParser';
import config from '../components/chatbot/config';
import 'react-chatbot-kit/build/main.css';
import './globals.css';

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
    <div className="container">
      <h1 className="title">Basketball AI Analyzer</h1>
      <div className="content">
        <div className="upload-section">
          <Upload
            onUploadComplete={(url) => setVideoUrl(url)}
            onAnalysisComplete={(events) => setEvents(events)}
          />
        </div>
        <div className="video-section">
          {videoUrl ? (
            <video ref={videoRef} controls>
              <source src={`http://127.0.0.1:8000/uploads/${videoUrl}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div style={{ width: '100%', height: '100%', backgroundColor: 'black' }}></div>
          )}
        </div>
        <div className="chatbot-section">
          <Chatbot
            config={config}
            actionProvider={ActionProvider}
            messageParser={MessageParser}
          />
        </div>
      </div>
    </div>
  );
}
