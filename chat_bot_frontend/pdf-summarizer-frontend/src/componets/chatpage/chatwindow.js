import React, { useState } from 'react';
import axios from 'axios';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = async () => {
    const userMessage = { text: newMessage, sender: 'You' };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    try {
      const response = await axios.post('http://localhost:5500/api/question', { question: newMessage });
      const botReply = { text: response.data.answer, sender: 'Bot' };
      setMessages([...updatedMessages, botReply]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setNewMessage('');
  };

  return (
    <div>
      <h2>Chat Window</h2>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            <strong>{msg.sender}: </strong>{msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatWindow;
