

import React, { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: string;
}

interface ChatProps {
  username: string;
}

const socket: Socket = io('https://clickmate-backend.onrender.com'); // Backend Socket.IO server URL

const Chat: React.FC<ChatProps> = ({ username }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Listen for incoming messages
  useEffect(() => {
    const handleMessage = (message: Message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on('chat-message', handleMessage);

    return () => {
      socket.off('chat-message', handleMessage);
    };
  }, []);

  // Scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send a message to the server
  const sendMessage = () => {
    if (input.trim() === '') return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const message: Message = {
      id: Date.now().toString(),
      user: username || 'Customer',
      text: input.trim(),
      timestamp,
    };

    socket.emit('chat-message', message);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full border rounded p-4 bg-white shadow">
      <div className="flex-1 overflow-y-auto mb-4 max-h-64">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 ${
              msg.user === username
                ? 'text-right'
                : 'text-left'
            }`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-lg ${
                msg.user === username ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
              }`}
            >
              <div className="font-semibold">{msg.user}</div>
              <div>{msg.text}</div>
              <div className="text-xs text-gray-300 mt-1">{msg.timestamp}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex">
        <input
          type="text"
          className="flex-grow border rounded px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
