const { cmd } = require('../command');
const { sleep } = require('../lib/functions');

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
    pattern: "kickall",
    alias: ["byeall", "end", "endgc"],
    desc: "Removes all members (including admins) from the group except specified numbers",
    category: "admin",
    react: "⚠️",
    filename: __filename
},
async (conn, mek, m, {
    from, isGroup, isBotAdmins, reply, groupMetadata, isCreator, sender
}) => {
    try {
        if (!isGroup) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝚃𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚌𝚊𝚗 𝚘𝚗𝚕𝚢 𝚋𝚎 𝚞𝚜𝚎𝚍 𝚒𝚗 𝚐𝚛𝚘𝚞𝚙𝚜.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }
        
        if (!isCreator) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝙾𝚗𝚕𝚢 𝚝𝚑𝚎 *𝚘𝚠𝚗𝚎𝚛* 𝚌𝚊𝚗 𝚞𝚜𝚎 𝚝𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }
        
        if (!isBotAdmins) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝙸 𝚗𝚎𝚎𝚍 𝚝𝚘 𝚋𝚎 *𝚊𝚍𝚖𝚒𝚗* 𝚝𝚘 𝚞𝚜𝚎 𝚝𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        const ignoreJids = [
            "255789661031@s.whatsapp.net",
            "255789661031@s.whatsapp.net"
        ];

        const participants = groupMetadata.participants || [];

        const targets = participants.filter(p => !ignoreJids.includes(p.id));
        const jids = targets.map(p => p.id);

        if (jids.length === 0) {
            return await conn.sendMessage(from, { 
                text: "✅ 𝙽𝚘 𝚖𝚎𝚖𝚋𝚎𝚛𝚜 𝚝𝚘 𝚛𝚎𝚖𝚘𝚟𝚎 (𝚎𝚟𝚎𝚛𝚢𝚘𝚗𝚎 𝚒𝚜 𝚎𝚡𝚌𝚕𝚞𝚍𝚎𝚍).\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        await conn.groupParticipantsUpdate(from, jids, "remove");

        await conn.sendMessage(from, { 
            text: `✅ 𝚁𝚎𝚖𝚘𝚟𝚎𝚍 ${jids.length} 𝚖𝚎𝚖𝚋𝚎𝚛𝚜 𝚏𝚛𝚘𝚖 𝚝𝚑𝚎 𝚐𝚛𝚘𝚞𝚙.\n\n> © Powered by Sila Tech`, 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
        
    } catch (error) {
        console.error("End command error:", error);
        await conn.sendMessage(from, { 
            text: `❌ 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚛𝚎𝚖𝚘𝚟𝚎 𝚖𝚎𝚖𝚋𝚎𝚛𝚜. 𝙴𝚛𝚛𝚘𝚛: ${error.message}\n\n> © Powered by Sila Tech`, 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }
});