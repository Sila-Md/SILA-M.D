const config = require('../config');
const { cmd, commands } = require('../command');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions');

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
    pattern: "lockgc",
    alias: ["lock"],
    react: "🔒",
    desc: "Lock the group (Prevents new members from joining).",
    category: "group",
    filename: __filename
},           
async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, sender }) => {
    try {
        if (!isGroup) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝚃𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚌𝚊𝚗 𝚘𝚗𝚕𝚢 𝚋𝚎 𝚞𝚜𝚎𝚍 𝚒𝚗 𝚐𝚛𝚘𝚞𝚙𝚜.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }
        
        if (!isAdmins) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝙾𝚗𝚕𝚢 𝚐𝚛𝚘𝚞𝚙 𝚊𝚍𝚖𝚒𝚗𝚜 𝚌𝚊𝚗 𝚞𝚜𝚎 𝚝𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }
        
        if (!isBotAdmins) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝙸 𝚗𝚎𝚎𝚍 𝚝𝚘 𝚋𝚎 𝚊𝚗 𝚊𝚍𝚖𝚒𝚗 𝚝𝚘 𝚕𝚘𝚌𝚔 𝚝𝚑𝚎 𝚐𝚛𝚘𝚞𝚙.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        await conn.groupSettingUpdate(from, "locked");
        
        await conn.sendMessage(from, { 
            text: "✅ 𝙶𝚛𝚘𝚞𝚙 𝚑𝚊𝚜 𝚋𝚎𝚎𝚗 𝚕𝚘𝚌𝚔𝚎𝚍. 𝙽𝚎𝚠 𝚖𝚎𝚖𝚋𝚎𝚛𝚜 𝚌𝚊𝚗𝚗𝚘𝚝 𝚓𝚘𝚒𝚗.\n\n> © Powered by Sila Tech", 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
        
    } catch (e) {
        console.error("Error locking group:", e);
        await conn.sendMessage(from, { 
            text: "❌ 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚕𝚘𝚌𝚔 𝚝𝚑𝚎 𝚐𝚛𝚘𝚞𝚙. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚝𝚛𝚢 𝚊𝚐𝚊𝚒𝚗.\n\n> © Powered by Sila Tech", 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }
});