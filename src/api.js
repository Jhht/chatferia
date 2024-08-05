const API_URL = 'https://ia-chat-app-b370ea980606.herokuapp.com';

const startConversation = async (question, onMessage) => {
    try {
        const response = await fetch(`${API_URL}/conversations/start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            onMessage(decoder.decode(value));
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

const endConversation = async () => {
    try {
        const response = await fetch(`${API_URL}/conversations/end`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log('Conversation ended', response.status);
    } catch (error) {
        console.error('Error:', error);
    }
};

export { startConversation, endConversation };
