const API_URL = 'http://feriantechat.fmemgncsf3e7f5aa.spaincentral.azurecontainer.io';

const startConversation = (question, onMessage) => {
    const eventSource = new EventSource(`${API_URL}/conversations/response`);

    eventSource.onopen = () => {
        console.log('Connection to server opened.');

        // Send the initial question
        fetch(`${API_URL}/conversations/response`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question }),
            mode:'cors'
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
        }).catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    };

    eventSource.onmessage = (event) => {
        const cleanedData = event.data.replace(/^data:\s*/, ''); // Remove 'data: ' prefix
        onMessage(cleanedData); // Continuously update with the cleaned text
    };

    eventSource.onerror = (err) => {
        console.error('There was an error from the server', err);
        eventSource.close();
    };
};

export { startConversation };
