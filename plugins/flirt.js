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
    pattern: "flirt",
    alias: ["line"],
    desc: "Get a random flirty message",
    react: "😘",
    category: "fun",
    use: '.flirt',
    filename: __filename
},
async (conn, mek, m, { from, reply, sender }) => {
    try {
        const apiUrl = 'https://shizoapi.onrender.com/api/texts/flirt?apikey=shizo';
        
        const { data } = await axios.get(apiUrl);
        
        if (!data.result) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝙲𝚘𝚞𝚕𝚍𝚗'𝚝 𝚏𝚎𝚝𝚌𝚑 𝚊 𝚏𝚕𝚒𝚛𝚝𝚢 𝚖𝚎𝚜𝚜𝚊𝚐𝚎. 𝚃𝚛𝚢 𝚊𝚐𝚊𝚒𝚗 𝚕𝚊𝚝𝚎𝚛!\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }
        
        const flirtMessage = `${data.result}

> © Powered by Sila Tech`;

        await conn.sendMessage(from, { 
            text: flirtMessage,
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
        
    } catch (error) {
        console.error('Flirt Error:', error);
        await conn.sendMessage(from, { 
            text: "❌ 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚏𝚎𝚝𝚌𝚑 𝚊 𝚏𝚕𝚒𝚛𝚝𝚢 𝚖𝚎𝚜𝚜𝚊𝚐𝚎. 𝙼𝚊𝚢𝚋𝚎 𝚝𝚛𝚢 𝚋𝚎𝚒𝚗𝚐 𝚛𝚘𝚖𝚊𝚗𝚝𝚒𝚌 𝚢𝚘𝚞𝚛𝚜𝚎𝚕𝚏?\n\n> © Powered by Sila Tech", 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }
});