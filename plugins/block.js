const { cmd } = require('../command');
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

// BLOCK COMMAND
cmd({
    pattern: "block",
    desc: "Blocks a person",
    category: "owner",
    react: "🚫",
    filename: __filename
},
async (conn, mek, m, { from, q, quoted, mentionedJid, sender, isOwner }) => {
    try {
        const ownerName = "𝐒𝐈𝐋𝐀 𝐌𝐃";
        const formattedOwnerNumber = "255789661031";
        
        if (!isOwner) {
            await conn.sendMessage(from, {
                react: { text: "❌", key: mek.key }
            });
            return await conn.sendMessage(from, { 
                text: "🚫 *𝚃𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚒𝚜 𝚘𝚗𝚕𝚢 𝚊𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎 𝚝𝚘 𝚝𝚑𝚎 𝚋𝚘𝚝 𝚘𝚠𝚗𝚎𝚛.*\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });
        }

        let jid;
        if (quoted) {
            jid = quoted.sender;
        } else if (mentionedJid && mentionedJid.length > 0) {
            jid = mentionedJid[0];
        } else if (q && q.includes("@")) {
            jid = q.replace(/[@\s]/g, '') + "@s.whatsapp.net";
        } else {
            await conn.sendMessage(from, {
                react: { text: "❌", key: mek.key }
            });
            return await conn.sendMessage(from, { 
                text: "❌ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚖𝚎𝚗𝚝𝚒𝚘𝚗 𝚊 𝚞𝚜𝚎𝚛 𝚘𝚛 𝚛𝚎𝚙𝚕𝚢 𝚝𝚘 𝚝𝚑𝚎𝚒𝚛 𝚖𝚎𝚜𝚜𝚊𝚐𝚎.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });
        }

        await conn.updateBlockStatus(jid, "block");
        
        await conn.sendMessage(from, {
            react: { text: "✅", key: mek.key }
        });
        
        await conn.sendMessage(from, { 
            text: `✅ *𝚂𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢 𝚋𝚕𝚘𝚌𝚔𝚎𝚍* @${jid.split("@")[0]}\n\n> © Powered by Sila Tech`,
            mentions: [jid],
            contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
        }, { quoted: fkontak });
        
    } catch (error) {
        console.error("Block command error:", error);
        await conn.sendMessage(from, {
            react: { text: "❌", key: mek.key }
        });
        await conn.sendMessage(from, { 
            text: "❌ 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚋𝚕𝚘𝚌𝚔 𝚝𝚑𝚎 𝚞𝚜𝚎𝚛.\n\n> © Powered by Sila Tech", 
            contextInfo: getContextInfo({ sender: sender }, "𝐒𝐈𝐋𝐀 𝐌𝐃", "255789661031")
        }, { quoted: fkontak });
    }
});

// UNBLOCK COMMAND
cmd({
    pattern: "unblock",
    desc: "Unblocks a person",
    category: "owner",
    react: "🔓",
    filename: __filename
},
async (conn, mek, m, { from, q, quoted, mentionedJid, sender, isOwner }) => {
    try {
        const ownerName = "𝐒𝐈𝐋𝐀 𝐌𝐃";
        const formattedOwnerNumber = "255789661031";
        
        if (!isOwner) {
            await conn.sendMessage(from, {
                react: { text: "❌", key: mek.key }
            });
            return await conn.sendMessage(from, { 
                text: "🚫 *𝚃𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚒𝚜 𝚘𝚗𝚕𝚢 𝚊𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎 𝚝𝚘 𝚝𝚑𝚎 𝚋𝚘𝚝 𝚘𝚠𝚗𝚎𝚛.*\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });
        }

        let jid;
        if (quoted) {
            jid = quoted.sender;
        } else if (mentionedJid && mentionedJid.length > 0) {
            jid = mentionedJid[0];
        } else if (q && q.includes("@")) {
            jid = q.replace(/[@\s]/g, '') + "@s.whatsapp.net";
        } else {
            await conn.sendMessage(from, {
                react: { text: "❌", key: mek.key }
            });
            return await conn.sendMessage(from, { 
                text: "❌ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚖𝚎𝚗𝚝𝚒𝚘𝚗 𝚊 𝚞𝚜𝚎𝚛 𝚘𝚛 𝚛𝚎𝚙𝚕𝚢 𝚝𝚘 𝚝𝚑𝚎𝚒𝚛 𝚖𝚎𝚜𝚜𝚊𝚐𝚎.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });
        }

        await conn.updateBlockStatus(jid, "unblock");
        
        await conn.sendMessage(from, {
            react: { text: "✅", key: mek.key }
        });
        
        await conn.sendMessage(from, { 
            text: `✅ *𝚂𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢 𝚞𝚗𝚋𝚕𝚘𝚌𝚔𝚎𝚍* @${jid.split("@")[0]}\n\n> © Powered by Sila Tech`,
            mentions: [jid],
            contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
        }, { quoted: fkontak });
        
    } catch (error) {
        console.error("Unblock command error:", error);
        await conn.sendMessage(from, {
            react: { text: "❌", key: mek.key }
        });
        await conn.sendMessage(from, { 
            text: "❌ 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚞𝚗𝚋𝚕𝚘𝚌𝚔 𝚝𝚑𝚎 𝚞𝚜𝚎𝚛.\n\n> © Powered by Sila Tech", 
            contextInfo: getContextInfo({ sender: sender }, "𝐒𝐈𝐋𝐀 𝐌𝐃", "255789661031")
        }, { quoted: fkontak });
    }
});