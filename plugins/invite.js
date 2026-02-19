const { cmd, commands } = require('../command');
const config = require('../config');
const prefix = config.PREFIX;
const fs = require('fs');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('../lib/functions2');
const { writeFileSync } = require('fs');
const path = require('path');

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
    pattern: "invite",
    alias: ["link", "grouplink"],
    desc: "Get group invite link.",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { from, isGroup, sender, reply }) => {
    try {
        if (!isGroup) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝚃𝚑𝚒𝚜 𝙵𝚎𝚊𝚝𝚞𝚛𝚎 𝙸𝚜 𝙾𝚗𝚕𝚢 𝙵𝚘𝚛 𝙶𝚛𝚘𝚞𝚙𝚜.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        const botNumber = conn.user.id.split(':')[0];

        // Get group metadata and admin list
        const groupMetadata = await conn.groupMetadata(from);
        const groupAdmins = groupMetadata.participants.filter(member => member.admin);
        const isBotAdmins = groupAdmins.some(admin => admin.id === botNumber + '@s.whatsapp.net');

        if (!isBotAdmins) {
            return await conn.sendMessage(from, { 
                text: "⚠️ 𝙿𝚕𝚎𝚊𝚜𝚎 𝙿𝚛𝚘𝚖𝚘𝚝𝚎 𝙼𝚎 𝙰𝚜 𝙰𝚍𝚖𝚒𝚗 𝚃𝚘 𝙶𝚎𝚗𝚎𝚛𝚊𝚝𝚎 𝚃𝚑𝚎 𝙶𝚛𝚘𝚞𝚙 𝙸𝚗𝚟𝚒𝚝𝚎 𝙻𝚒𝚗𝚔 ❗\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        const inviteCode = await conn.groupInviteCode(from);
        if (!inviteCode) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚛𝚎𝚝𝚛𝚒𝚎𝚟𝚎 𝚝𝚑𝚎 𝚒𝚗𝚟𝚒𝚝𝚎 𝚌𝚘𝚍𝚎.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        const inviteLink = `https://chat.whatsapp.com/${inviteCode}`;
        
        return await conn.sendMessage(from, { 
            text: `🔗 *𝙷𝚎𝚛𝚎 𝚒𝚜 𝚢𝚘𝚞𝚛 𝚐𝚛𝚘𝚞𝚙 𝚒𝚗𝚟𝚒𝚝𝚎 𝚕𝚒𝚗𝚔:*\n${inviteLink}\n\n> © Powered by Sila Tech`, 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });

    } catch (error) {
        console.error("Error in invite command:", error);
        await conn.sendMessage(from, { 
            text: `❌ 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚛𝚎𝚍: ${error.message || "Unknown error"}\n\n> © Powered by Sila Tech`, 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }
});