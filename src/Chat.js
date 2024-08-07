import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { startConversation, endConversation } from './api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTrash , faQuestionCircle} from '@fortawesome/free-solid-svg-icons';
import './Chat.css';


const Chat = () => {
    const [messages, setMessages, currentMessage] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);
    const [isHelpVisible, setIsHelpVisible] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);


    const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };
    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (input.trim() === '') return;

        // Add the user's message to the chat
        const newMessage = { text: input, sender: 'user' };
        setMessages(prevMessages => [...prevMessages, newMessage]);

        // Function to handle incoming message updates
        const handleIncomingMessage = (message) => {
            setMessages(prevMessages => {
                const lastMessage = prevMessages[prevMessages.length - 1];
                if (lastMessage && lastMessage.sender === 'bot') {
                    // Update the last bot message with new content
                    return [...prevMessages.slice(0, -1), { text: lastMessage.text + message, sender: 'bot' }];
                } else {
                    // Add new bot message
                    return [...prevMessages, { text: message, sender: 'bot' }];
                }
            });
        };

        // Start the conversation and handle messages from the server
        startConversation(input, handleIncomingMessage);

        // Clear the input field
        setInput('');
        if (introVisible) {
        setIntroVisible(false);
        }
    };

    const handleClearChat = async () => {
        // Clear the chat messages
        setMessages([]);

        // Call the endpoint to end the conversation
        try {
            await endConversation();
        } catch (error) {
            console.error('Error ending conversation:', error);
        }
    };
    useEffect(() => {
    scrollToBottom();
  }, [messages, currentMessage]);


  return (
   <div className="chat-wrapper">
      <div className="chat-header">
        <h1>Chat Feria Muestras 2024</h1>
      
      </div>
<div 
      className="messages" 
      ref={chatContainerRef}
    >        
     {introVisible && (
          <div className="intro-message">
            <p>Bienvenido a la Feria de Muestras 2024! Aquí van unos tipos para usar este chat:</p>
            <ul>
              <li>Tip 1: Describe tu consulta sobre la feria claramente.</li>
              <li>Tip 2: Usa el botón de enviar para enviar tu mensaje.</li>
              <li>Tip 3: Haz clic en el icono de basura para limpiar el chat.</li>
            </ul>
          </div>
        )}
    {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            <ReactMarkdown>{message.text}</ReactMarkdown>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje.."
        />
        <button type="submit">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
        <button type="button" onClick={handleClearChat}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </form>
    </div>
  );
};

export default Chat;
