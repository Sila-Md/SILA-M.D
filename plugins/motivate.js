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
    pattern: "motivate",
    alias: ["motivation", "inspire"],
    desc: "Get a random motivational quote",
    react: "💪",
    category: "fun",
    use: '.motivate',
    filename: __filename
},
async (conn, mek, m, { from, reply, sender }) => {
    try {
        const apiUrl = 'https://apis.davidcyriltech.my.id/random/quotes';
        
        const { data } = await axios.get(apiUrl);
        
        if (!data.success || !data.response) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝙲𝚘𝚞𝚕𝚍𝚗'𝚝 𝚏𝚎𝚝𝚌𝚑 𝚊 𝚚𝚞𝚘𝚝𝚎 𝚊𝚝 𝚝𝚑𝚎 𝚖𝚘𝚖𝚎𝚗𝚝. 𝚃𝚛𝚢 𝚊𝚐𝚊𝚒𝚗 𝚕𝚊𝚝𝚎𝚛!\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }
        
        const quoteMessage = `
✨ *𝙼𝙾𝚃𝙸𝚅𝙰𝚃𝙸𝙾𝙽𝙰𝙻 𝚀𝚄𝙾𝚃𝙴* ✨

"${data.response.quote}"

— ${data.response.author}

> © Powered by Sila Tech
`;

        await conn.sendMessage(from, { 
            text: quoteMessage,
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
        
    } catch (error) {
        console.error('Motivation Error:', error);
        await conn.sendMessage(from, { 
            text: "❌ 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚏𝚎𝚝𝚌𝚑 𝚊 𝚖𝚘𝚝𝚒𝚟𝚊𝚝𝚒𝚘𝚗𝚊𝚕 𝚚𝚞𝚘𝚝𝚎. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚝𝚛𝚢 𝚊𝚐𝚊𝚒𝚗 𝚕𝚊𝚝𝚎𝚛.\n\n> © Powered by Sila Tech", 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }
});