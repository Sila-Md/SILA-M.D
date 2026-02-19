const { cmd } = require('../command');
const axios = require('axios');

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
    pattern: "lyrics",
    alias: ["lyric", "songlyrics"],
    desc: "Search for song lyrics",
    category: "search",
    react: "🎶",
    filename: __filename
}, async (conn, mek, m, { from, text, q, sender }) => {
    try {
        const ownerName = "𝐒𝐈𝐋𝐀 𝐌𝐃";
        const formattedOwnerNumber = "255789661031";

        // ❌ Missing song name
        if (!q) {
            return await conn.sendMessage(from, {
                text:
`*𝙻𝚈𝚁𝙸𝙲𝚂*

❌ 𝚂𝚘𝚗𝚐 𝚗𝚊𝚖𝚎 𝚛𝚎𝚚𝚞𝚒𝚛𝚎𝚍  
✿ 𝙴𝚡𝚊𝚖𝚙𝚕𝚎: .lyrics 𝙵𝚊𝚍𝚎𝚍

> © Powered by Sila Tech`,
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });
        }

        // 🔎 Searching
        await conn.sendMessage(from, {
            text: `🌼 𝚂𝚎𝚊𝚛𝚌𝚑𝚒𝚗𝚐 𝚕𝚢𝚛𝚒𝚌𝚜 𝚏𝚘𝚛 *${q}*...`,
            contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
        }, { quoted: fkontak });

        // API
        const apiUrl = `https://apis.davidcyriltech.my.id/lyrics3?song=${encodeURIComponent(q)}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.status === 200 && data.success) {
            const { title, artist, lyrics, image } = data.result;

            let lyricsMsg =
`*𝚂𝙾𝙽𝙶 𝙻𝚈𝚁𝙸𝙲𝚂*

*𝚃𝚒𝚝𝚕𝚎:* ${title}  
*𝙰𝚛𝚝𝚒𝚜𝚝:* ${artist}

*𝙻𝚈𝚁𝙸𝙲𝚂*
${lyrics}

> © Powered by Sila Tech`;

            if (image) {
                await conn.sendMessage(from, {
                    image: { url: image },
                    caption: lyricsMsg,
                    contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
                }, { quoted: fkontak });
            } else {
                await conn.sendMessage(from, { 
                    text: lyricsMsg,
                    contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
                }, { quoted: fkontak });
            }

        } else {
            return await conn.sendMessage(from, {
                text:
`*𝙽𝚘𝚝 𝙵𝚘𝚞𝚗𝚍* 

𝙻𝚢𝚛𝚒𝚌𝚜 𝚗𝚘𝚝 𝚊𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎  
𝙲𝚑𝚎𝚌𝚔 𝚜𝚙𝚎𝚕𝚕𝚒𝚗𝚐 & 𝚛𝚎𝚝𝚛𝚢

> © Powered by Sila Tech`,
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });
        }

    } catch (e) {
        console.error("Lyrics Error:", e);
        await conn.sendMessage(from, {
            text:
`*𝙴𝚛𝚛𝚘𝚛* 

𝚄𝚗𝚊𝚋𝚕𝚎 𝚝𝚘 𝚏𝚎𝚝𝚌𝚑 𝚕𝚢𝚛𝚒𝚌𝚜  
𝚃𝚛𝚢 𝚊𝚐𝚊𝚒𝚗 𝚕𝚊𝚝𝚎𝚛

> © Powered by Sila Tech`,
            contextInfo: getContextInfo({ sender: sender }, "𝐒𝐈𝐋𝐀 𝐌𝐃", "255789661031")
        }, { quoted: fkontak });
    }
});