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
    pattern: "out",
    alias: ["ck", "🦶"],
    desc: "Removes all members with specific country code from the group",
    category: "admin",
    react: "❌",
    filename: __filename
},
async (conn, mek, m, {
    from, q, isGroup, isBotAdmins, groupMetadata, isCreator, sender
}) => {
    if (!isGroup) {
        return await conn.sendMessage(from, { 
            text: "❌ 𝚃𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚌𝚊𝚗 𝚘𝚗𝚕𝚢 𝚋𝚎 𝚞𝚜𝚎𝚍 𝚒𝚗 𝚐𝚛𝚘𝚞𝚙𝚜.\n\n> © Powered by Sila Tech", 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }

    if (!isCreator) {
        return await conn.sendMessage(from, { 
            text: "*📛 𝚃𝚑𝚒𝚜 𝚒𝚜 𝚊𝚗 𝚘𝚠𝚗𝚎𝚛 𝚌𝚘𝚖𝚖𝚊𝚗𝚍.*\n\n> © Powered by Sila Tech", 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }

    if (!isBotAdmins) {
        return await conn.sendMessage(from, { 
            text: "❌ 𝙸 𝚗𝚎𝚎𝚍 𝚝𝚘 𝚋𝚎 𝚊𝚗 𝚊𝚍𝚖𝚒𝚗 𝚝𝚘 𝚞𝚜𝚎 𝚝𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍.\n\n> © Powered by Sila Tech", 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }
    
    if (!q) {
        return await conn.sendMessage(from, { 
            text: "❌ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝚌𝚘𝚞𝚗𝚝𝚛𝚢 𝚌𝚘𝚍𝚎. 𝙴𝚡𝚊𝚖𝚙𝚕𝚎: .out 92\n\n> © Powered by Sila Tech", 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }

    const countryCode = q.trim();
    if (!/^\d+$/.test(countryCode)) {
        return await conn.sendMessage(from, { 
            text: "❌ 𝙸𝚗𝚟𝚊𝚕𝚒𝚍 𝚌𝚘𝚞𝚗𝚝𝚛𝚢 𝚌𝚘𝚍𝚎. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚘𝚗𝚕𝚢 𝚗𝚞𝚖𝚋𝚎𝚛𝚜 (𝚎.𝚐., 92 𝚏𝚘𝚛 +92 𝚗𝚞𝚖𝚋𝚎𝚛𝚜)\n\n> © Powered by Sila Tech", 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }

    try {
        const participants = await groupMetadata.participants;
        const targets = participants.filter(
            participant => participant.id.startsWith(countryCode) && !participant.admin
        );

        if (targets.length === 0) {
            return await conn.sendMessage(from, { 
                text: `❌ 𝙽𝚘 𝚖𝚎𝚖𝚋𝚎𝚛𝚜 𝚏𝚘𝚞𝚗𝚍 𝚠𝚒𝚝𝚑 𝚌𝚘𝚞𝚗𝚝𝚛𝚢 𝚌𝚘𝚍𝚎 +${countryCode}\n\n> © Powered by Sila Tech`, 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        const jids = targets.map(p => p.id);
        await conn.groupParticipantsUpdate(from, jids, "remove");

        await conn.sendMessage(from, { 
            text: `✅ 𝚂𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢 𝚛𝚎𝚖𝚘𝚟𝚎𝚍 ${targets.length} 𝚖𝚎𝚖𝚋𝚎𝚛𝚜 𝚠𝚒𝚝𝚑 𝚌𝚘𝚞𝚗𝚝𝚛𝚢 𝚌𝚘𝚍𝚎 +${countryCode}\n\n> © Powered by Sila Tech`, 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
        
    } catch (error) {
        console.error("Out command error:", error);
        await conn.sendMessage(from, { 
            text: `❌ 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚛𝚎𝚖𝚘𝚟𝚎 𝚖𝚎𝚖𝚋𝚎𝚛𝚜. 𝙴𝚛𝚛𝚘𝚛: ${error.message}\n\n> © Powered by Sila Tech`, 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }
});