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
    pattern: "pindl",
    alias: ["pinterestdl", "pint", "pins", "pindownload"],
    desc: "Download media from Pinterest",
    category: "download",
    react: "📌",
    filename: __filename
}, async (conn, mek, m, { args, quoted, from, reply, sender }) => {
    try {
        const ownerName = "𝐒𝐈𝐋𝐀 𝐌𝐃";
        const formattedOwnerNumber = "255789661031";
        
        // ⏳ React: Processing Start
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

        // Make sure the user provided the Pinterest URL
        if (args.length < 1) {
            await conn.sendMessage(from, { react: { text: "⚠️", key: mek.key } });
            return await conn.sendMessage(from, { 
                text: '❎ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚝𝚑𝚎 𝙿𝚒𝚗𝚝𝚎𝚛𝚎𝚜𝚝 𝚄𝚁𝙻 𝚝𝚘 𝚍𝚘𝚠𝚗𝚕𝚘𝚊𝚍 𝚏𝚛𝚘𝚖.\n\n> © Powered by Sila Tech', 
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });
        }

        const pinterestUrl = args[0];
        const response = await axios.get(`https://api.giftedtech.web.id/api/download/pinterestdl?apikey=gifted&url=${encodeURIComponent(pinterestUrl)}`);

        if (!response.data.success) {
            await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
            return await conn.sendMessage(from, { 
                text: '❎ 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚏𝚎𝚝𝚌𝚑 𝚍𝚊𝚝𝚊 𝚏𝚛𝚘𝚖 𝙿𝚒𝚗𝚝𝚎𝚛𝚎𝚜𝚝.\n\n> © Powered by Sila Tech', 
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });
        }

        const media = response.data.result.media;
        const description = response.data.result.description || '𝙽𝚘 𝚍𝚎𝚜𝚌𝚛𝚒𝚙𝚝𝚒𝚘𝚗 𝚊𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎';
        const title = response.data.result.title || '𝙽𝚘 𝚝𝚒𝚝𝚕𝚎 𝚊𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎';
        const videoUrl = media.find(item => item.type.includes('720p'))?.download_url || media[0].download_url;

        const desc = `*┏────〘 𝚂𝙸𝙻𝙰 𝙼𝙳 〙───⊷*
*┃* *𝙿𝙸𝙽𝚂 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝚁*
*┗──────────────⊷*
*┏────〘 𝙸𝙽𝙵𝙾 〙───⊷*
*┃* *𝚃𝚒𝚝𝚕𝚎* - ${title}
*┃* *𝙼𝚎𝚍𝚒𝚊 𝚃𝚢𝚙𝚎* - ${media[0].type}
*┗──────────────⊷*
> © Powered by Sila Tech`;

        // Send video or image
        if (videoUrl) {
            await conn.sendMessage(from, { 
                video: { url: videoUrl }, 
                caption: desc,
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });
        } else {
            const imageUrl = media.find(item => item.type === 'Thumbnail')?.download_url;
            await conn.sendMessage(from, { 
                image: { url: imageUrl }, 
                caption: desc,
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });
        }

        // ✅ React: Completed Successfully
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
        await conn.sendMessage(from, { 
            text: '❎ 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚙𝚛𝚘𝚌𝚎𝚜𝚜𝚒𝚗𝚐 𝚢𝚘𝚞𝚛 𝚛𝚎𝚚𝚞𝚎𝚜𝚝.\n\n> © Powered by Sila Tech', 
            contextInfo: getContextInfo({ sender: sender }, "𝐒𝐈𝐋𝐀 𝐌𝐃", "255789661031")
        }, { quoted: fkontak });
    }
});