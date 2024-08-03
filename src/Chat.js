import React, { useState } from 'react';
import { startConversation } from './api';
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

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h1>Trade Fair Assistant</h1>
                <p>Welcome to the Gijón Trade Fair! Ask me where to buy the products you are interested in.</p>
                <ul>
                    <li>Find shops with specific products</li>
                    <li>Get directions to shops</li>
                </ul>
            </div>
            <div className="messages">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                        style={{ whiteSpace: 'pre-wrap' }} // Ensures that text wraps properly
                    >
                        {message.text}
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
            </form>
        </div>
    );
};

export default Chat;
