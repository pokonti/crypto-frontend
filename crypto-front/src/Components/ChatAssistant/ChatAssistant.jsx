import { useState, useEffect } from 'react';
import './ChatAssistant.css';
import chatbotImage from '../../assets/chatbot.png';
import ReactMarkdown from "react-markdown";
import arrow from '../../assets/top.png';

function ChatAssistant() {
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");
    const isAuthenticated = !!token;

    const toggleChatWindow = () => {
      setIsChatOpen(!isChatOpen);
    };

    useEffect(() => {
      const fetchChatHistory = async () => {
        if (!token || !isChatOpen) return;
  
        try {
          const res = await fetch("http://127.0.0.1:8000/memory-chat/", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (!res.ok) throw new Error("Failed to load chat history");
  
          const data = await res.json();
  
          if (data.chat_history) {
            const parsedMessages = data.chat_history.map((line) => {
              const [role, ...textParts] = line.split(": ");
              return {
                sender: role.toLowerCase() === "assistant" ? "assistant" : "user",
                text: textParts.join(": "),
              };
            });
  
            setMessages(parsedMessages);
          }
        } catch (err) {
          console.error("Error loading chat history:", err);
        }
      };
  
      fetchChatHistory();
    }, [isChatOpen, token]);


    const handleSend = async () => {
      if (!prompt.trim()) return;

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: prompt, sender: 'user' },
      ]);
      
      setPrompt('');

      try {
        setLoading(true);
        const response = await fetch('http://127.0.0.1:8000/memory-chat/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
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
                {!isAuthenticated && 
                (
                  <div className='message assistant'>Please authenticate first to use the assistant.</div>
                )}
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
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();   
                        handleSend();        
                      }
                    }}
                    placeholder="Type your message..."
                    rows="2"
                />
                <button onClick={handleSend} disabled={!isAuthenticated} className="send-button">
                    <img src={arrow} alt="" />
                </button>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  export default ChatAssistant;