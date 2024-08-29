import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./chatpage.css";
import PDFList from './chatpage/pdflist';
import ChatWindow from './chatpage/chatwindow';

const Chatpage = () => {
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const response = await axios.get('http://localhost:5500/api/send-data');
        setPdfs(response.data.data);
      } catch (error) {
        console.error('Error fetching PDFs:', error);
      }
    };
    fetchPdfs();
  }, []);

  return (
    <div className="container">
      <div className="pdf-list">
        <PDFList pdfs={pdfs} />
      </div>
      <div className="chat-window">
        <ChatWindow />
      </div>
    </div>
  );
};

export default Chatpage;
