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
    pattern: "uptime",
    desc: "Check how long the bot has been active",
    category: "main",
    react: "⏳",
    filename: __filename
},
async (conn, mek, m, { from, reply, sender }) => {
    try {
        // Get uptime in seconds
        const uptimeSeconds = process.uptime();
        
        // Convert seconds to a readable format
        const hours = Math.floor(uptimeSeconds / 3600);
        const minutes = Math.floor((uptimeSeconds % 3600) / 60);
        const seconds = Math.floor(uptimeSeconds % 60);

        const uptimeString = `╭━━〔 ⏳ *𝚄𝙿𝚃𝙸𝙼𝙴* 〕━━┈⊷
┃
┃ *𝚂𝙸𝙻𝙰 𝙼𝙳 𝙰𝙸*
┃
┃ *${hours}h ${minutes}m ${seconds}s*
┃
╰━━━━━━━━━━━━━━━━━━┈⊷
> © Powered by Sila Tech`;

        await conn.sendMessage(from, { 
            text: uptimeString,
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
        
    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { 
            text: "❌ 𝙴𝚛𝚛𝚘𝚛 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝚞𝚙𝚝𝚒𝚖𝚎.\n\n> © Powered by Sila Tech", 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }
});