import { fetchEventSource } from '@microsoft/fetch-event-source';

const API_URL = 'https://ia-chat-app-b370ea980606.herokuapp.com';

const startConversation = (question, onMessage) => {
    fetchEventSource(`${API_URL}/conversations/start`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'text/event-stream',
        },
        body: JSON.stringify({ question }),
        onmessage(event) {
            const cleanedData = event.data.replace(/^data:\s*/, ''); // Remove 'data: ' prefix
            console.log(cleanedData + cleanedData.length);
            onMessage(cleanedData); // Continuously update with the cleaned text
        },
        onerror(err) {
            console.error('There was an error from the server', err);
        },
    });
};

export { startConversation };
