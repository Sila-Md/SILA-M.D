const { cmd } = require("../command");
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
    pattern: "character",
    alias: ["char"],
    desc: "Check the character of a mentioned user.",
    react: "🔥",
    category: "fun",
    filename: __filename,
}, 
async (conn, mek, m, { from, isGroup, sender, quoted }) => {
    try {
        const ownerName = "𝐒𝐈𝐋𝐀 𝐌𝐃";
        const formattedOwnerNumber = "255789661031";
        
        if (!isGroup) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝚃𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚌𝚊𝚗 𝚘𝚗𝚕𝚢 𝚋𝚎 𝚞𝚜𝚎𝚍 𝚒𝚗 𝚐𝚛𝚘𝚞𝚙𝚜.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });
        }

        const mentionedUser = m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!mentionedUser) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚖𝚎𝚗𝚝𝚒𝚘𝚗 𝚊 𝚞𝚜𝚎𝚛 𝚠𝚑𝚘𝚜𝚎 𝚌𝚑𝚊𝚛𝚊𝚌𝚝𝚎𝚛 𝚢𝚘𝚞 𝚠𝚊𝚗𝚝 𝚝𝚘 𝚌𝚑𝚎𝚌𝚔.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });
        }

        const userChar = [
            "𝚂𝚒𝚐𝚖𝚊",
            "𝙶𝚎𝚗𝚎𝚛𝚘𝚞𝚜",
            "𝙶𝚛𝚞𝚖𝚙𝚢",
            "𝙾𝚟𝚎𝚛𝚌𝚘𝚗𝚏𝚒𝚍𝚎𝚗𝚝",
            "𝙾𝚋𝚎𝚍𝚒𝚎𝚗𝚝",
            "𝙶𝚘𝚘𝚍",
            "𝚂𝚒𝚖𝚙",
            "𝙺𝚒𝚗𝚍",
            "𝙿𝚊𝚝𝚒𝚎𝚗𝚝",
            "𝙿𝚎𝚛𝚟𝚎𝚛𝚝",
            "𝙲𝚘𝚘𝚕",
            "𝙷𝚎𝚕𝚙𝚏𝚞𝚕",
            "𝙱𝚛𝚒𝚕𝚕𝚒𝚊𝚗𝚝",
            "𝚂𝚎𝚡𝚢",
            "𝙷𝚘𝚝",
            "𝙶𝚘𝚛𝚐𝚎𝚘𝚞𝚜",
            "𝙲𝚞𝚝𝚎",
        ];

        const userCharacterSelection = userChar[Math.floor(Math.random() * userChar.length)];

        await conn.sendMessage(from, {
            text: `🔥 *𝙲𝚑𝚊𝚛𝚊𝚌𝚝𝚎𝚛* 𝚘𝚏 @${mentionedUser.split("@")[0]} 𝚒𝚜 *${userCharacterSelection}*\n\n> © Powered by Sila Tech`,
            mentions: [mentionedUser],
            contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
        }, { quoted: fkontak });

    } catch (e) {
        console.error("Error in character command:", e);
        await conn.sendMessage(from, { 
            text: "❌ 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚙𝚛𝚘𝚌𝚎𝚜𝚜𝚒𝚗𝚐 𝚝𝚑𝚎 𝚌𝚘𝚖𝚖𝚊𝚗𝚍.\n\n> © Powered by Sila Tech", 
            contextInfo: getContextInfo({ sender: sender }, "𝐒𝐈𝐋𝐀 𝐌𝐃", "255789661031")
        }, { quoted: fkontak });
    }
});