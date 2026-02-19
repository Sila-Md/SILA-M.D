const axios = require('axios');
const { cmd } = require('../command');

// FakevCard sawa na zilizopita
const fkontak = {
    "key": {
        "participant": '0@s.whatsapp.net',
        "remoteJid": '0@s.whatsapp.net',
        "fromMe": false,
        "id": "Halo"
    },
    "message": {
        "conversation": "𝚂𝙸𝙻𝙰"
    }
};

const getContextInfo = (m) => {
    return {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363402325089913@newsletter',
            newsletterName: '© 𝐒𝐈𝐋𝐀 𝐌𝐃',
            serverMessageId: 143,
        }
    };
};

cmd({
    pattern: "shayari",
    alias: ["shayar", "poetry"],
    desc: "Get a random romantic shayari",
    react: "💫",
    category: "fun",
    use: '.shayari',
    filename: __filename
},
async (conn, mek, m, { from, reply, sender }) => {
    try {
        const apiUrl = 'https://shizoapi.onrender.com/api/texts/shayari?apikey=shizo';
        
        const { data } = await axios.get(apiUrl);
        
        if (!data.result) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝚂𝚑𝚊𝚢𝚊𝚛𝚒 𝚍𝚒𝚕 𝚖𝚎𝚒𝚗 𝚗𝚊𝚑𝚒 𝚊𝚊𝚢𝚒, 𝚙𝚑𝚒𝚛 𝚝𝚛𝚢 𝚔𝚊𝚛𝚘!\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }
        
        const shayariMessage = `💫 *𝚂𝚑𝚊𝚢𝚊𝚛𝚒* 💫\n\n${data.result}\n\n> © Powered by Sila Tech`;

        await conn.sendMessage(from, { 
            text: shayariMessage,
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
        
    } catch (error) {
        console.error('Shayari Error:', error);
        await conn.sendMessage(from, { 
            text: "❌ 𝙰𝚊𝚓 𝚍𝚒𝚕 𝚖𝚎𝚒𝚗 𝚜𝚑𝚊𝚢𝚊𝚛𝚒 𝚗𝚊𝚑𝚒 𝚑𝚊𝚒... 𝙺𝚊𝚕 𝚝𝚛𝚢 𝚔𝚊𝚛𝚗𝚊!\n\n> © Powered by Sila Tech", 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }
});