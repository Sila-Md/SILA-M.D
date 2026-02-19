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

// Command to list all pending group join requests
cmd({
    pattern: "requestlist",
    desc: "Shows pending group join requests",
    category: "group",
    react: "📋",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, reply, sender }) => {
    try {
        await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

        if (!isGroup) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return await conn.sendMessage(from, { 
                text: "❌ 𝚃𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚌𝚊𝚗 𝚘𝚗𝚕𝚢 𝚋𝚎 𝚞𝚜𝚎𝚍 𝚒𝚗 𝚐𝚛𝚘𝚞𝚙𝚜.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }
        
        if (!isAdmins) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return await conn.sendMessage(from, { 
                text: "❌ 𝙾𝚗𝚕𝚢 𝚐𝚛𝚘𝚞𝚙 𝚊𝚍𝚖𝚒𝚗𝚜 𝚌𝚊𝚗 𝚞𝚜𝚎 𝚝𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }
        
        if (!isBotAdmins) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return await conn.sendMessage(from, { 
                text: "❌ 𝙸 𝚗𝚎𝚎𝚍 𝚝𝚘 𝚋𝚎 𝚊𝚗 𝚊𝚍𝚖𝚒𝚗 𝚝𝚘 𝚟𝚒𝚎𝚠 𝚓𝚘𝚒𝚗 𝚛𝚎𝚚𝚞𝚎𝚜𝚝𝚜.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        const requests = await conn.groupRequestParticipantsList(from);
        
        if (requests.length === 0) {
            await conn.sendMessage(from, { react: { text: 'ℹ️', key: m.key } });
            return await conn.sendMessage(from, { 
                text: "ℹ️ 𝙽𝚘 𝚙𝚎𝚗𝚍𝚒𝚗𝚐 𝚓𝚘𝚒𝚗 𝚛𝚎𝚚𝚞𝚎𝚜𝚝𝚜.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        let text = `╭━━〔 📋 *𝙿𝙴𝙽𝙳𝙸𝙽𝙶 𝚁𝙴𝚀𝚄𝙴𝚂𝚃𝚂* 〕━━┈⊷
┃
┃ *𝚃𝚘𝚝𝚊𝚕:* ${requests.length}
┃\n`;

        requests.forEach((user, i) => {
            text += `┃ ${i+1}. @${user.jid.split('@')[0]}\n`;
        });

        text += `┃\n╰━━━━━━━━━━━━━━━━━━┈⊷\n> © Powered by Sila Tech`;

        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
        
        await conn.sendMessage(from, { 
            text: text,
            mentions: requests.map(u => u.jid),
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
        
    } catch (error) {
        console.error("Request list error:", error);
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
        await conn.sendMessage(from, { 
            text: "❌ 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚏𝚎𝚝𝚌𝚑 𝚓𝚘𝚒𝚗 𝚛𝚎𝚚𝚞𝚎𝚜𝚝𝚜.\n\n> © Powered by Sila Tech", 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }
});

// Command to accept all pending join requests
cmd({
    pattern: "acceptall",
    desc: "Accepts all pending group join requests",
    category: "group",
    react: "✅",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, reply, sender }) => {
    try {
        await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

        if (!isGroup) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return await conn.sendMessage(from, { 
                text: "❌ 𝚃𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚌𝚊𝚗 𝚘𝚗𝚕𝚢 𝚋𝚎 𝚞𝚜𝚎𝚍 𝚒𝚗 𝚐𝚛𝚘𝚞𝚙𝚜.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }
        
        if (!isAdmins) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return await conn.sendMessage(from, { 
                text: "❌ 𝙾𝚗𝚕𝚢 𝚐𝚛𝚘𝚞𝚙 𝚊𝚍𝚖𝚒𝚗𝚜 𝚌𝚊𝚗 𝚞𝚜𝚎 𝚝𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }
        
        if (!isBotAdmins) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return await conn.sendMessage(from, { 
                text: "❌ 𝙸 𝚗𝚎𝚎𝚍 𝚝𝚘 𝚋𝚎 𝚊𝚗 𝚊𝚍𝚖𝚒𝚗 𝚝𝚘 𝚊𝚌𝚌𝚎𝚙𝚝 𝚓𝚘𝚒𝚗 𝚛𝚎𝚚𝚞𝚎𝚜𝚝𝚜.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        const requests = await conn.groupRequestParticipantsList(from);
        
        if (requests.length === 0) {
            await conn.sendMessage(from, { react: { text: 'ℹ️', key: m.key } });
            return await conn.sendMessage(from, { 
                text: "ℹ️ 𝙽𝚘 𝚙𝚎𝚗𝚍𝚒𝚗𝚐 𝚓𝚘𝚒𝚗 𝚛𝚎𝚚𝚞𝚎𝚜𝚝𝚜 𝚝𝚘 𝚊𝚌𝚌𝚎𝚙𝚝.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        const jids = requests.map(u => u.jid);
        await conn.groupRequestParticipantsUpdate(from, jids, "approve");
        
        await conn.sendMessage(from, { react: { text: '👍', key: m.key } });
        
        await conn.sendMessage(from, { 
            text: `✅ 𝚂𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢 𝚊𝚌𝚌𝚎𝚙𝚝𝚎𝚍 ${requests.length} 𝚓𝚘𝚒𝚗 𝚛𝚎𝚚𝚞𝚎𝚜𝚝𝚜.\n\n> © Powered by Sila Tech`, 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
        
    } catch (error) {
        console.error("Accept all error:", error);
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
        await conn.sendMessage(from, { 
            text: "❌ 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚊𝚌𝚌𝚎𝚙𝚝 𝚓𝚘𝚒𝚗 𝚛𝚎𝚚𝚞𝚎𝚜𝚝𝚜.\n\n> © Powered by Sila Tech", 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }
});

// Command to reject all pending join requests
cmd({
    pattern: "rejectall",
    desc: "Rejects all pending group join requests",
    category: "group",
    react: "❌",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, reply, sender }) => {
    try {
        await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

        if (!isGroup) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return await conn.sendMessage(from, { 
                text: "❌ 𝚃𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚌𝚊𝚗 𝚘𝚗𝚕𝚢 𝚋𝚎 𝚞𝚜𝚎𝚍 𝚒𝚗 𝚐𝚛𝚘𝚞𝚙𝚜.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }
        
        if (!isAdmins) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return await conn.sendMessage(from, { 
                text: "❌ 𝙾𝚗𝚕𝚢 𝚐𝚛𝚘𝚞𝚙 𝚊𝚍𝚖𝚒𝚗𝚜 𝚌𝚊𝚗 𝚞𝚜𝚎 𝚝𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }
        
        if (!isBotAdmins) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return await conn.sendMessage(from, { 
                text: "❌ 𝙸 𝚗𝚎𝚎𝚍 𝚝𝚘 𝚋𝚎 𝚊𝚗 𝚊𝚍𝚖𝚒𝚗 𝚝𝚘 𝚛𝚎𝚓𝚎𝚌𝚝 𝚓𝚘𝚒𝚗 𝚛𝚎𝚚𝚞𝚎𝚜𝚝𝚜.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        const requests = await conn.groupRequestParticipantsList(from);
        
        if (requests.length === 0) {
            await conn.sendMessage(from, { react: { text: 'ℹ️', key: m.key } });
            return await conn.sendMessage(from, { 
                text: "ℹ️ 𝙽𝚘 𝚙𝚎𝚗𝚍𝚒𝚗𝚐 𝚓𝚘𝚒𝚗 𝚛𝚎𝚚𝚞𝚎𝚜𝚝𝚜 𝚝𝚘 𝚛𝚎𝚓𝚎𝚌𝚝.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        const jids = requests.map(u => u.jid);
        await conn.groupRequestParticipantsUpdate(from, jids, "reject");
        
        await conn.sendMessage(from, { react: { text: '👎', key: m.key } });
        
        await conn.sendMessage(from, { 
            text: `✅ 𝚂𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢 𝚛𝚎𝚓𝚎𝚌𝚝𝚎𝚍 ${requests.length} 𝚓𝚘𝚒𝚗 𝚛𝚎𝚚𝚞𝚎𝚜𝚝𝚜.\n\n> © Powered by Sila Tech`, 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
        
    } catch (error) {
        console.error("Reject all error:", error);
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
        await conn.sendMessage(from, { 
            text: "❌ 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚛𝚎𝚓𝚎𝚌𝚝 𝚓𝚘𝚒𝚗 𝚛𝚎𝚚𝚞𝚎𝚜𝚝𝚜.\n\n> © Powered by Sila Tech", 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }
});