import { useState } from 'react';
import './ChatAssistant.css';
import chatbotImage from '../../assets/chatbot.png';
import ReactMarkdown from "react-markdown";
import arrow from '../../assets/top.png';

function ChatAssistant() {
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const toggleChatWindow = () => {
      setIsChatOpen(!isChatOpen);
    };
  
    const handleSend = async () => {
      if (!prompt.trim()) return;
  
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: prompt, sender: 'user' },
      ]);
      
      setPrompt('');

      try {
        setLoading(true);
        const response = await fetch('https://crypto-backend-production-2a02.up.railway.app/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status:: ${response.status}`);
        }
  
        const data = await response.json();
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.response, sender: 'assistant' },
        ]);
      } catch (error) {
        console.error('Error sending prompt:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Something went wrong...', sender: 'assistant' },
        ]);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="ai-assistant">
        <div className="icon" onClick={toggleChatWindow}>
          <img src={chatbotImage} alt="Chatbot" />
        </div>
  
        {isChatOpen && (
          <div className="chat-window">
            <div className="chat-header">
              AI Assistant
            </div>
  
            <div className="chat-body">
              <div className="message-container">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`message ${message.sender === 'user' ? 'user' : 'assistant'}`}
                  >
                    <p><ReactMarkdown>{message.text}</ReactMarkdown></p>
                  </div>
                ))}
                {loading && (
                    <div className="message assistant">
                    <p>AI typing...</p>
                </div>
                )}
              </div>
            </div>
  
            <div className="chat-input">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Type your message..."
                    rows="2"
                />
                <button onClick={handleSend} className="send-button">
                    <img src={arrow} alt="" />
                </button>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  export default ChatAssistant;