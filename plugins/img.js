const { cmd } = require("../command");
const axios = require("axios");
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

const UNSPLASH_API_KEY = "TKwNF_gHeB4Z6ieR6sV_Q8gIkQW_VFOcmiNfD0AX0uM";

cmd({
    pattern: "img",
    alias: ["image", "searchimg"],
    react: "🫧",
    desc: "Search images from Unsplash",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { args, from, sender }) => {
    try {
        if (!args.length) return await conn.sendMessage(from, { text: "🖼️ 𝙴𝚡𝚊𝚖𝚙𝚕𝚎: .img 𝚌𝚞𝚝𝚎 𝚌𝚊𝚝𝚜 𝟹", contextInfo: getContextInfo({ sender: sender }) }, { quoted: fkontak });

        let count = parseInt(args[args.length - 1]);
        if (isNaN(count)) count = 3;
        const query = args.slice(0, isNaN(args[args.length - 1]) ? args.length : -1).join(" ");

        await conn.sendMessage(from, { text: `🔍 𝚂𝚎𝚊𝚛𝚌𝚑𝚒𝚗𝚐 "${query}"...`, contextInfo: getContextInfo({ sender: sender }) }, { quoted: fkontak });

        const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&client_id=${UNSPLASH_API_KEY}`;
        const { data } = await axios.get(url);

        if (!data.results?.length) return await conn.sendMessage(from, { text: "❌ 𝙽𝚘 𝚒𝚖𝚊𝚐𝚎𝚜 𝚏𝚘𝚞𝚗𝚍.", contextInfo: getContextInfo({ sender: sender }) }, { quoted: fkontak });

        const selectedImages = data.results.sort(() => 0.5 - Math.random()).slice(0, count);

        for (const image of selectedImages) {
            await conn.sendMessage(from, {
                image: { url: image.urls.regular },
                caption: `📷 *${query}*\n> © Powered by Sila Tech`,
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

    } catch (error) {
        console.error("Image Error:", error);
        await conn.sendMessage(from, { text: "❌ 𝙴𝚛𝚛𝚘𝚛 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝚒𝚖𝚊𝚐𝚎𝚜.", contextInfo: getContextInfo({ sender: sender }) }, { quoted: fkontak });
    }
});