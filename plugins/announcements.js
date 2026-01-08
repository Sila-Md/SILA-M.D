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
    pattern: "announcements",
    alias: ["announce", "broadcast"],
    react: "📢",
    desc: "Group announcements",
    category: "group",
    filename: __filename
}, async (conn, mek, m, { from, reply, isGroup, isAdmin }) => {
    try {
        if (!isGroup) return reply("*❌ Group only*");
        if (!isAdmin) return reply("*❌ Admin only*");
        
        const message = m.body.replace('.announcements', '').trim();
        if (!message) return reply("*❌ Provide message*");
        
        const groupMetadata = await conn.groupMetadata(from);
        const participants = groupMetadata.participants.map(p => p.id);
        
        const successMsg = `📢 *ANNOUNCEMENT*\n\n${message}\n\n👥 Sent to: ${participants.length} members\n⚡ From: Admin\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`;
        
        await conn.sendMessage(from, {
            text: successMsg,
            mentions: participants,
            ...fakevCard,
            contextInfo: {
                mentionedJid: participants,
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