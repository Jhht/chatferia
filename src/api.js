const API_BASE_URL = 'http://iachat.gjfeawd4epgadpc9.spaincentral.azurecontainer.io';

export const startConversation = async (userMessage) => {
    try {
        const response = await fetch(`${API_BASE_URL}/conversations/start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "question": userMessage }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.text(); // Change to response.text() for plain text response
        console.log("API response:", data); // Log the API response
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
