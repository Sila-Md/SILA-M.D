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
    pattern: "truth",
    desc: "Get a random truth question",
    react: "🤔",
    category: "fun",
    use: '.truth',
    filename: __filename
},
async (conn, mek, m, { from, reply, sender }) => {
    try {
        const { data } = await axios.get('https://apis.davidcyriltech.my.id/truth');
        
        if (!data.success) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝙲𝚘𝚞𝚕𝚍𝚗'𝚝 𝚐𝚎𝚝 𝚊 𝚝𝚛𝚞𝚝𝚑 𝚚𝚞𝚎𝚜𝚝𝚒𝚘𝚗. 𝚃𝚛𝚢 𝚊𝚐𝚊𝚒𝚗!\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }
        
        const message = `🔍 *𝚃𝚛𝚞𝚝𝚑 𝚀𝚞𝚎𝚜𝚝𝚒𝚘𝚗* 🔍\n\n"${data.question}"\n\n_𝙱𝚎 𝚑𝚘𝚗𝚎𝚜𝚝!_\n\n> © Powered by Sila Tech`;
        
        await conn.sendMessage(from, { 
            text: message,
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
        
    } catch (error) {
        console.error('Truth Error:', error);
        await conn.sendMessage(from, { 
            text: "❌ 𝙲𝚊𝚗'𝚝 𝚑𝚊𝚗𝚍𝚕𝚎 𝚝𝚑𝚎 𝚝𝚛𝚞𝚝𝚑 𝚛𝚒𝚐𝚑𝚝 𝚗𝚘𝚠. 𝚃𝚛𝚢 𝚊𝚐𝚊𝚒𝚗 𝚕𝚊𝚝𝚎𝚛!\n\n> © Powered by Sila Tech", 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }
});