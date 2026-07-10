document.addEventListener('DOMContentLoaded', () => {
    const chatToggle = document.getElementById('chat-toggle-btn');
    const chatWidget = document.getElementById('chat-widget');
    const closeChat = document.getElementById('close-chat');
    const chatBody = document.getElementById('chat-body');
    const chatInput = document.getElementById('chat-input-field');
    const sendChatBtn = document.getElementById('send-chat');

    if (chatToggle && chatWidget) {
        chatToggle.addEventListener('click', () => chatWidget.classList.toggle('active'));
        closeChat.addEventListener('click', () => chatWidget.classList.remove('active'));

        const addMessage = (text, sender) => {
            const msgDiv = document.createElement('div');
            msgDiv.classList.add('message', sender);
            msgDiv.innerText = text;
            chatBody.appendChild(msgDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        };

        const processChatLogic = (input) => {
            const lowerInput = input.toLowerCase();
            let response = "I am a bot trained on Nilay's profile. Ask me about his projects, skills, or certifications!";

            if (lowerInput.includes('flashdl')) {
                response = "FlashDL uses Server-Side Merging via FFmpeg to process high-quality YouTube videos (1080p/4K).";
            }
            else if (lowerInput.includes('drishtilens') || lowerInput.includes('isl')) {
                response = "DrishtiLens is a Neural Assistive Pipeline for real-time Indian Sign Language (ISL) translation.";
            }
            else if (lowerInput.includes('pypass')) {
                response = "PyPass is a security tool featuring AES-256 encryption, SHA-256 hashing, and Pandas analytics.";
            }
            else if (lowerInput.includes('crop') || lowerInput.includes('xgboost')) {
                response = "The Crop Yield Prediction System uses an XGBoost model to predict yields for Rice, Wheat, and Maize.";
            }
            else if (lowerInput.includes('netpulse')) {
                response = "NetPulse v2.0 is a Java/Kotlin internet speed meter with persistent data history.";
            }
            else if (lowerInput.includes('project') || lowerInput.includes('portfolio')) {
                response = "Nilay has developed 15+ extensive projects ranging from Full-Stack Next.js to Native Android utilities. Check the links!";
            }
            else if (lowerInput.includes('education') || lowerInput.includes('college')) {
                response = "Nilay is a 4th Year B.Tech student in CSE (AIML) at Siliguri Institute of Technology, graduating in 2026.";
            }

            setTimeout(() => addMessage(response, 'bot'), 500);
        };

        const handleSend = () => {
            const text = chatInput.value.trim();
            if (!text) return;
            addMessage(text, 'user');
            chatInput.value = '';
            processChatLogic(text);
        };

        sendChatBtn.addEventListener('click', handleSend);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });
    }
});