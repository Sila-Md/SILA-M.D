const axios = require("axios");
const { cmd } = require("../command");
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
    pattern: "ringtone",
    alias: ["ringtones", "ring"],
    desc: "Get a random ringtone",
    react: "🎵",
    category: "fun",
    filename: __filename,
},
async (conn, mek, m, { from, args, sender }) => {
    try {
        const query = args.join(" ");
        if (!query) {
            return await conn.sendMessage(from, { text: "𝙴𝚡𝚊𝚖𝚙𝚕𝚎: .ringtone 𝚂𝚞𝚗𝚊", contextInfo: getContextInfo({ sender: sender }) }, { quoted: fkontak });
        }

        const { data } = await axios.get(`https://www.dark-yasiya-api.site/download/ringtone?text=${encodeURIComponent(query)}`);

        if (!data.status || !data.result?.length) {
            return await conn.sendMessage(from, { text: "❌ 𝙽𝚘 𝚛𝚒𝚗𝚐𝚝𝚘𝚗𝚎𝚜 𝚏𝚘𝚞𝚗𝚍.", contextInfo: getContextInfo({ sender: sender }) }, { quoted: fkontak });
        }

        const randomRingtone = data.result[Math.floor(Math.random() * data.result.length)];

        await conn.sendMessage(from, {
            audio: { url: randomRingtone.dl_link },
            mimetype: "audio/mpeg",
            fileName: `${randomRingtone.title}.mp3`,
            caption: `🎵 *${randomRingtone.title}*\n> © Powered by Sila Tech`,
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: m });
        
    } catch (error) {
        console.error("Ringtone Error:", error);
        await conn.sendMessage(from, { text: "❌ 𝙴𝚛𝚛𝚘𝚛 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝚛𝚒𝚗𝚐𝚝𝚘𝚗𝚎.", contextInfo: getContextInfo({ sender: sender }) }, { quoted: fkontak });
    }
});