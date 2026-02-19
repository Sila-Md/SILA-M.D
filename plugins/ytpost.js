const { cmd } = require('../command');
const axios = require('axios');
const config = require('../config');

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

const getContextInfo = (m, ownerName = "𝐒𝐈𝐋𝐀 𝐌𝐃", formattedOwnerNumber = "255789661031") => {
    return {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363402325089913@newsletter',
            newsletterName: '© 𝐒𝐈𝐋𝐀 𝐌𝐃',
            serverMessageId: 143,
        },
        externalAdReply: {
            title: `👑 𝙱𝙾𝚃 𝙾𝚆𝙽𝙴𝚁: ${ownerName}`,
            body: `📞 wa.me/${formattedOwnerNumber}`,
            mediaType: 1,
            previewType: 0,
            thumbnailUrl: 'https://files.catbox.moe/98k75b.jpeg',
            sourceUrl: `https://wa.me/${formattedOwnerNumber}`,
            renderLargerThumbnail: false,
        }
    };
};

cmd({
    pattern: "ytpost",
    alias: ["ytcommunity", "ytc"],
    desc: "Download YouTube community post",
    category: "downloader",
    react: "🎥",
    filename: __filename
},
async (conn, mek, m, { from, q, sender }) => {
    try {
        if (!q) return await conn.sendMessage(from, { text: "𝙴𝚡𝚊𝚖𝚙𝚕𝚎: .ytpost <𝚞𝚛𝚕>", contextInfo: getContextInfo({ sender: sender }) }, { quoted: fkontak });

        const apiUrl = `https://api.siputzx.my.id/api/d/ytpost?url=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data.status || !data.data) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return await conn.sendMessage(from, { text: "❌ 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚏𝚎𝚝𝚌𝚑 𝚙𝚘𝚜𝚝.", contextInfo: getContextInfo({ sender: sender }) }, { quoted: fkontak });
        }

        const post = data.data;
        let caption = `📢 *𝚈𝚃 𝙲𝚘𝚖𝚖𝚞𝚗𝚒𝚝𝚢 𝙿𝚘𝚜𝚝*\n\n${post.content}\n\n> © Powered by Sila Tech`;

        if (post.images?.length > 0) {
            for (const img of post.images) {
                await conn.sendMessage(from, { image: { url: img }, caption, contextInfo: getContextInfo({ sender: sender }) }, { quoted: fkontak });
                caption = "";
            }
        } else {
            await conn.sendMessage(from, { text: caption, contextInfo: getContextInfo({ sender: sender }) }, { quoted: fkontak });
        }

        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
        
    } catch (e) {
        console.error("ytpost Error:", e);
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
        await conn.sendMessage(from, { text: "❌ 𝙴𝚛𝚛𝚘𝚛 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝚙𝚘𝚜𝚝.", contextInfo: getContextInfo({ sender: sender }) }, { quoted: fkontak });
    }
});