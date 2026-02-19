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

const linkPatterns = [
    /https?:\/\/(?:chat\.whatsapp\.com|wa\.me)\/\S+/gi,
    /^https?:\/\/(www\.)?whatsapp\.com\/channel\/([a-zA-Z0-9_-]+)$/,
    /wa\.me\/\S+/gi,
    /https?:\/\/(?:t\.me|telegram\.me)\/\S+/gi,
    /https?:\/\/(?:www\.)?youtube\.com\/\S+/gi,
    /https?:\/\/youtu\.be\/\S+/gi,
    /https?:\/\/(?:www\.)?facebook\.com\/\S+/gi,
    /https?:\/\/fb\.me\/\S+/gi,
    /https?:\/\/(?:www\.)?instagram\.com\/\S+/gi,
    /https?:\/\/(?:www\.)?twitter\.com\/\S+/gi,
    /https?:\/\/(?:www\.)?tiktok\.com\/\S+/gi,
    /https?:\/\/(?:www\.)?linkedin\.com\/\S+/gi,
    /https?:\/\/(?:www\.)?snapchat\.com\/\S+/gi,
    /https?:\/\/(?:www\.)?pinterest\.com\/\S+/gi,
    /https?:\/\/(?:www\.)?reddit\.com\/\S+/gi,
    /https?:\/\/ngl\/\S+/gi,
    /https?:\/\/(?:www\.)?discord\.com\/\S+/gi,
    /https?:\/\/(?:www\.)?twitch\.tv\/\S+/gi,
    /https?:\/\/(?:www\.)?vimeo\.com\/\S+/gi,
    /https?:\/\/(?:www\.)?dailymotion\.com\/\S+/gi,
    /https?:\/\/(?:www\.)?medium\.com\/\S+/gi
];

cmd({
    on: 'body'
}, async (conn, mek, m, { from, body, isGroup, isAdmins, isBotAdmins, sender }) => {
    try {
        if (!isGroup || isAdmins || !isBotAdmins) {
            return;
        }

        const containsLink = linkPatterns.some(pattern => pattern.test(body));

        if (containsLink && config.DELETE_LINKS === 'true') {
            await conn.sendMessage(from, { delete: m.key });
            
            // Optional: Send warning to group
            await conn.sendMessage(from, { 
                text: `🚫 @${sender.split("@")[0]} *𝙻𝚒𝚗𝚔𝚜 𝚊𝚛𝚎 𝚗𝚘𝚝 𝚊𝚕𝚕𝚘𝚠𝚎𝚍 𝚒𝚗 𝚝𝚑𝚒𝚜 𝚐𝚛𝚘𝚞𝚙!*`,
                mentions: [sender],
                contextInfo: getContextInfo({ sender: sender }, "𝐒𝐈𝐋𝐀 𝐌𝐃", "255789661031")
            }, { quoted: fkontak });
        }
    } catch (error) {
        console.error(error);
    }
});

// Command to toggle link deletion
cmd({
    pattern: "dellink",
    alias: ["deletelinks", "autodeletelink"],
    desc: "Toggle automatic link deletion in groups",
    category: "group",
    react: "🔗",
    filename: __filename
},
async (conn, mek, m, { from, args, isGroup, isAdmins, isOwner, sender }) => {
    try {
        const ownerName = "𝐒𝐈𝐋𝐀 𝐌𝐃";
        const formattedOwnerNumber = "255789661031";
        
        if (!isGroup) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝚃𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚒𝚜 𝚘𝚗𝚕𝚢 𝚏𝚘𝚛 𝚐𝚛𝚘𝚞𝚙𝚜\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });
        }
        
        if (!isAdmins && !isOwner) {
            return await conn.sendMessage(from, { 
                text: "🚫 *𝙰𝚍𝚖𝚒𝚗-𝚘𝚗𝚕𝚢 𝚌𝚘𝚖𝚖𝚊𝚗𝚍!*\n\n> © Powered by Sila Tech", 
                mentions: [sender],
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });
        }

        const action = args[0]?.toLowerCase();
        let statusText = "";
        let reaction = "🔗";

        if (action === "on") {
            config.DELETE_LINKS = "true";
            statusText = "✅ *𝙰𝚞𝚝𝚘 𝙻𝚒𝚗𝚔 𝙳𝚎𝚕𝚎𝚝𝚒𝚘𝚗 𝚑𝚊𝚜 𝚋𝚎𝚎𝚗 𝙴𝙽𝙰𝙱𝙻𝙴𝙳*";
            reaction = "✅";
        } 
        else if (action === "off") {
            config.DELETE_LINKS = "false";
            statusText = "❌ *𝙰𝚞𝚝𝚘 𝙻𝚒𝚗𝚔 𝙳𝚎𝚕𝚎𝚝𝚒𝚘𝚗 𝚑𝚊𝚜 𝚋𝚎𝚎𝚗 𝙳𝙸𝚂𝙰𝙱𝙻𝙴𝙳*";
            reaction = "❌";
        } 
        else {
            const currentStatus = config.DELETE_LINKS === "true" ? "𝙴𝚗𝚊𝚋𝚕𝚎𝚍 ✅" : "𝙳𝚒𝚜𝚊𝚋𝚕𝚎𝚍 ❌";
            
            return await conn.sendMessage(from, { 
                text: `╭━━〔 🔗 *𝙰𝚄𝚃𝙾 𝙻𝙸𝙽𝙺 𝙳𝙴𝙻𝙴𝚃𝙴* 〕━━┈⊷
┃
┃ 📜 *𝚄𝚜𝚊𝚐𝚎:*
┃ ➸ .dellink on  - 𝙴𝚗𝚊𝚋𝚕𝚎 𝚏𝚎𝚊𝚝𝚞𝚛𝚎
┃ ➸ .dellink off - 𝙳𝚒𝚜𝚊𝚋𝚕𝚎 𝚏𝚎𝚊𝚝𝚞𝚛𝚎
┃
┃ 💡 *𝙲𝚞𝚛𝚛𝚎𝚗𝚝 𝚂𝚝𝚊𝚝𝚞𝚜:* ${currentStatus}
┃
╰──────────────┈⊷
> © Powered by Sila Tech`, 
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });
        }

        await conn.sendMessage(from, { 
            text: `${statusText}\n\n> © Powered by Sila Tech`, 
            contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
        }, { quoted: fkontak });

        await conn.sendMessage(from, {
            react: { text: reaction, key: mek.key }
        });

    } catch (error) {
        console.error("❌ Dellink command error:", error);
        await conn.sendMessage(from, { 
            text: `⚠️ 𝙴𝚛𝚛𝚘𝚛: ${error.message}\n\n> © Powered by Sila Tech`, 
            contextInfo: getContextInfo({ sender: sender }, "𝐒𝐈𝐋𝐀 𝐌𝐃", "255789661031")
        }, { quoted: fkontak });
    }
});