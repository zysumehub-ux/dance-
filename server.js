const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const ROBLOX_WEBHOOK_URL = process.env.ROBLOX_WEBHOOK_URL || 'http://localhost:8081';

app.post('/webhook', (req, res) => {
    const { username, eventType, giftName } = req.body;
    
    if (!username) {
        return res.status(400).json({ error: 'username required' });
    }
    
    console.log(`[${new Date().toISOString()}] Event: ${eventType || 'unknown'} | User: ${username}`);
    
    res.json({ 
        status: 'received', 
        username: username,
        event: eventType 
    });
});

app.get('/', (req, res) => {
    res.json({ 
        status: 'running',
        timestamp: Date.now(),
        message: 'TikTok to Roblox bridge is active'
    });
});

app.listen(PORT, () => {
    console.log(`Bridge server running on port ${PORT}`);
    console.log(`Ready to receive webhooks at /webhook`);
    console.log(`Roblox target: ${ROBLOX_WEBHOOK_URL}`);
});
