const { sleep } = require('../lib/functions');
const config = require('../config');
const { cmd } = require('../command');

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
    pattern: "leave",
    alias: ["left", "leftgc", "leavegc"],
    desc: "Leave the group",
    react: "🎉",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, {
    from, isGroup, isCreator, reply, sender
}) => {
    try {
        if (!isGroup) {
            return await conn.sendMessage(from, { 
                text: "❗ 𝚃𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚌𝚊𝚗 𝚘𝚗𝚕𝚢 𝚋𝚎 𝚞𝚜𝚎𝚍 𝚒𝚗 *𝚐𝚛𝚘𝚞𝚙𝚜*.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        if (!isCreator) {
            return await conn.sendMessage(from, { 
                text: "❗ 𝚃𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚌𝚊𝚗 𝚘𝚗𝚕𝚢 𝚋𝚎 𝚞𝚜𝚎𝚍 𝚋𝚢 𝚖𝚢 *𝚘𝚠𝚗𝚎𝚛*.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        await conn.sendMessage(from, { 
            text: `👋 *𝙶𝚘𝚘𝚍𝚋𝚢𝚎 𝚎𝚟𝚎𝚛𝚢𝚘𝚗𝚎!*  
𝙸 𝚊𝚖 𝚕𝚎𝚊𝚟𝚒𝚗𝚐 𝚝𝚑𝚎 𝚐𝚛𝚘𝚞𝚙 𝚗𝚘𝚠.  
𝚃𝚑𝚊𝚗𝚔𝚜 𝚏𝚘𝚛 𝚑𝚊𝚟𝚒𝚗𝚐 𝚖𝚎 𝚑𝚎𝚛𝚎! ❤️

> © Powered by Sila Tech`, 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });

        await sleep(1500);
        await conn.groupLeave(from);

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { 
            text: `❌ 𝙴𝚛𝚛𝚘𝚛: ${e.message}\n\n> © Powered by Sila Tech`, 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }
});