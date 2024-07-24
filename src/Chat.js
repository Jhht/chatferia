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
        setMessages([...messages, newMessage]);

        try {
            const botResponse = await startConversation(input);
            console.log("Bot response:", botResponse); // Log the bot response
            
            // Add the bot's response to the chat
            const botMessage = { text: botResponse, sender: 'bot' };
            setMessages([...messages, newMessage, botMessage]);

        } catch (error) {
            const errorMessage = { text: 'Error occurred while fetching response', sender: 'bot' };
            setMessages([...messages, newMessage, errorMessage]);
        }

        setInput('');
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
