const { cmd } = require('../command');
const config = require('../config');

const fakevCard = {
    key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "status@broadcast"
    },
    message: {
        contactMessage: {
            displayName: "© SILA-MD",
            vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:SILA MD\nORG:SILA TECH;\nTEL;type=CELL;type=VOICE;waid=${config.OWNER_NUMBER.replace('+', '')}:${config.OWNER_NUMBER}\nEND:VCARD`
        }
    }
};

cmd({
    pattern: "open",
    alias: ["unlock"],
    react: "🔓",
    desc: "Open group",
    category: "group",
    filename: __filename
}, async (conn, mek, m, { from, reply, isGroup, isAdmin, isBotAdmin }) => {
    try {
        if (!isGroup) return reply("*❌ Group only*");
        if (!isAdmin) return reply("*❌ Admin only*");
        if (!isBotAdmin) return reply("*❌ Bot admin required*");
        
        await conn.groupSettingUpdate(from, 'not_announcement');
        
        const successMsg = `✅ *Group Opened*\n\n🔓 Group: Unlocked\n⚡ All can send messages\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`;
        
        await conn.sendMessage(from, {
            text: successMsg,
            ...fakevCard,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402325089913@newsletter',
                    newsletterName: 'SILA MD',
                    serverMessageId: Math.floor(Math.random() * 1000)
                }
            }
        }, { quoted: mek });
        
        await conn.sendMessage(from, {
            react: { text: "✅", key: mek.key }
        });
        
    } catch (error) {
        console.error(error);
        reply(`*❌ Error:* ${error.message}\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);
    }
});