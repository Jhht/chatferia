import React, { useState, useEffect } from 'react';
import Message from './Message';
import { sendMessageToApi, getMessagesFromApi } from './api';
import './Chat.css';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const messagesFromApi = await getMessagesFromApi();
                setMessages(messagesFromApi);
            } catch (error) {
                console.error('Failed to fetch messages:', error);
            }
        };

        fetchMessages();
    }, []);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (input.trim()) {
            try {
                const newMessage = await sendMessageToApi(input);
                setMessages([...messages, newMessage]);
                setInput('');
            } catch (error) {
                console.error('Failed to send message:', error);
            }
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
                {messages.map((msg, index) => (
                    <Message key={index} text={msg.text} />
                ))}
            </div>
            <form onSubmit={sendMessage}>
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

export default Chat
