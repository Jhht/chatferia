import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { startConversation, endConversation } from './api';
import './Chat.css';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

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

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h1>Chat Feria Muestras 2024</h1>
                <p>Bienvenido a la Feria de Muestras 2024! Aquí van unos tipos para usar este chat:</p>
                <ul>
                    <li>Pregunta por productos en los que estes interesado o información respecto a distintos stands!</li>
                    <li>Pregunta en que stands adquirir los productos en los que estes interesado!</li>
                    <li>Pregunta por un camino personalizado a través de la feria con los productos que te interesen!</li>
                    <li>El chat de la Feria de Muestras esta para ayudarte en lo que necesites</li>
                </ul>
            </div>
            <div className="messages">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`} 
                    >
                        <ReactMarkdown>{message.text}</ReactMarkdown>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button type="submit">Send</button>
                <button type="button" onClick={handleClearChat}>Clear</button>
            </form>
        </div>
    );
};

export default Chat;
