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
    pattern: "tiktok",
    alias: ["tt", "ttdl"],
    desc: "Download TikTok videos",
    category: "download",
    react: "📥",
    filename: __filename
},
async (conn, mek, m, { from, q, reply, sender }) => {
    try {
        if (!q) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝚃𝚒𝚔𝚃𝚘𝚔 𝚄𝚁𝙻.\n\n*𝙴𝚡𝚊𝚖𝚙𝚕𝚎:* .tiktok https://vm.tiktok.com/xxxxxx\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        // React with loading
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

        // API Request
        const apiUrl = `https://apis.davidcyriltech.my.id/download/tiktok?url=${q}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data.status || !data.result) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚏𝚎𝚝𝚌𝚑 𝚟𝚒𝚍𝚎𝚘. 𝙼𝚊𝚔𝚎 𝚜𝚞𝚛𝚎 𝚝𝚑𝚎 𝚕𝚒𝚗𝚔 𝚒𝚜 𝚟𝚊𝚕𝚒𝚍.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        const videoData = data.result;
        
        // Send Video (No Watermark)
        await conn.sendMessage(from, {
            video: { url: videoData.video },
            caption: `╭━━〔 📥 *𝚃𝙸𝙺𝚃𝙾𝙺 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝙳* 〕━━┈⊷
┃
┃ 📌 *𝚃𝚒𝚝𝚕𝚎:* ${videoData.title}
┃ 👤 *𝙰𝚞𝚝𝚑𝚘𝚛:* ${videoData.author}
┃
╰━━━━━━━━━━━━━━━━━━┈⊷
> © Powered by Sila Tech`,
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });

        // Final success reaction
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });

    } catch (err) {
        console.error(err);
        await conn.sendMessage(from, { 
            text: "❌ 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚍𝚘𝚠𝚗𝚕𝚘𝚊𝚍𝚒𝚗𝚐 𝚝𝚑𝚎 𝚟𝚒𝚍𝚎𝚘.\n\n> © Powered by Sila Tech", 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }
});