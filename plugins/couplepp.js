const { cmd } = require('../command');
const axios = require('axios');
const config = require('../config');

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
    'pattern': "couplepp",
    'alias': ["couple", "cpp"],
    'react': '💑',
    'desc': "Get a male and female couple profile picture.",
    'category': "image",
    'filename': __filename
}, async (conn, mek, m, { from, sender }) => {
    try {
        const ownerName = "𝐒𝐈𝐋𝐀 𝐌𝐃";
        const formattedOwnerNumber = "255789661031";
        
        await conn.sendMessage(from, { 
            text: "💑 *𝙵𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝚌𝚘𝚞𝚙𝚕𝚎 𝚙𝚛𝚘𝚏𝚒𝚕𝚎 𝚙𝚒𝚌𝚝𝚞𝚛𝚎𝚜...*", 
            contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
        }, { quoted: fkontak });
        
        const response = await axios.get("https://api.davidcyriltech.my.id/couplepp");

        if (!response.data || !response.data.success) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚏𝚎𝚝𝚌𝚑 𝚌𝚘𝚞𝚙𝚕𝚎 𝚙𝚛𝚘𝚏𝚒𝚕𝚎 𝚙𝚒𝚌𝚝𝚞𝚛𝚎𝚜.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });
        }

        const malePp = response.data.male;
        const femalePp = response.data.female;

        if (malePp) {
            await conn.sendMessage(from, {
                'image': { 'url': malePp },
                'caption': "👨 *𝙼𝚊𝚕𝚎 𝙲𝚘𝚞𝚙𝚕𝚎 𝙿𝚛𝚘𝚏𝚒𝚕𝚎 𝙿𝚒𝚌𝚝𝚞𝚛𝚎*\n\n> © Powered by Sila Tech",
                'contextInfo': getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { 'quoted': fkontak });
        }

        if (femalePp) {
            await conn.sendMessage(from, {
                'image': { 'url': femalePp },
                'caption': "👩 *𝙵𝚎𝚖𝚊𝚕𝚎 𝙲𝚘𝚞𝚙𝚕𝚎 𝙿𝚛𝚘𝚏𝚒𝚕𝚎 𝙿𝚒𝚌𝚝𝚞𝚛𝚎*\n\n> © Powered by Sila Tech",
                'contextInfo': getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { 'quoted': fkontak });
        }

    } catch (error) {
        console.error(error);
        await conn.sendMessage(from, { 
            text: "❌ 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝚝𝚑𝚎 𝚌𝚘𝚞𝚙𝚕𝚎 𝚙𝚛𝚘𝚏𝚒𝚕𝚎 𝚙𝚒𝚌𝚝𝚞𝚛𝚎𝚜.\n\n> © Powered by Sila Tech", 
            contextInfo: getContextInfo({ sender: sender }, "𝐒𝐈𝐋𝐀 𝐌𝐃", "255789661031")
        }, { quoted: fkontak });
    }
});