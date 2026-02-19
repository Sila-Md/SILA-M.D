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
    pattern: "pickup",
    alias: ["pickupline", "flirtline"],
    desc: "Get a random pickup line",
    react: "💘",
    category: "fun",
    use: '.pickup',
    filename: __filename
},
async (conn, mek, m, { from, reply, sender }) => {
    try {
        const { data } = await axios.get('https://apis.davidcyriltech.my.id/pickupline');
        
        if (!data.success) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚐𝚎𝚝 𝚊 𝚙𝚒𝚌𝚔𝚞𝚙 𝚕𝚒𝚗𝚎. 𝚃𝚛𝚢 𝚊𝚐𝚊𝚒𝚗!\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }
        
        const message = `💝 *𝙿𝚒𝚌𝚔𝚞𝚙 𝙻𝚒𝚗𝚎* 💝\n\n"${data.pickupline}"\n\n_𝚄𝚜𝚎 𝚠𝚒𝚜𝚎𝚕𝚢!_\n\n> © Powered by Sila Tech`;
        
        await conn.sendMessage(from, { 
            text: message,
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
        
    } catch (error) {
        console.error('Pickup Error:', error);
        await conn.sendMessage(from, { 
            text: "❌ 𝙼𝚢 𝚌𝚑𝚊𝚛𝚖 𝚒𝚜𝚗'𝚝 𝚠𝚘𝚛𝚔𝚒𝚗𝚐 𝚛𝚒𝚐𝚑𝚝 𝚗𝚘𝚠. 𝚃𝚛𝚢 𝚊𝚐𝚊𝚒𝚗 𝚕𝚊𝚝𝚎𝚛!\n\n> © Powered by Sila Tech", 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }
});