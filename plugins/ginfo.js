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
    pattern: "ginfo",
    react: "🥏",
    alias: ["groupinfo"],
    desc: "Get group information.",
    category: "group",
    use: '.ginfo',
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, isCmd, isGroup, sender, isBotAdmins,
    isAdmins, isDev, reply, groupMetadata, participants
}) => {
    try {
        if (!isGroup) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝚃𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚘𝚗𝚕𝚢 𝚠𝚘𝚛𝚔𝚜 𝚒𝚗 𝚐𝚛𝚘𝚞𝚙 𝚌𝚑𝚊𝚝𝚜.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }
        
        if (!isAdmins && !isDev) {
            return await conn.sendMessage(from, { 
                text: "⛔ 𝙾𝚗𝚕𝚢 *𝙶𝚛𝚘𝚞𝚙 𝙰𝚍𝚖𝚒𝚗𝚜* 𝚘𝚛 *𝙱𝚘𝚝 𝙳𝚎𝚟* 𝚌𝚊𝚗 𝚞𝚜𝚎 𝚝𝚑𝚒𝚜.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }
        
        if (!isBotAdmins) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝙸 𝚗𝚎𝚎𝚍 *𝚊𝚍𝚖𝚒𝚗* 𝚛𝚒𝚐𝚑𝚝𝚜 𝚝𝚘 𝚏𝚎𝚝𝚌𝚑 𝚐𝚛𝚘𝚞𝚙 𝚍𝚎𝚝𝚊𝚒𝚕𝚜.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        const fallbackPpUrls = [
            'https://files.catbox.moe/98k75b.jpeg',
            'https://files.catbox.moe/98k75b.jpeg',
        ];
        
        let ppUrl;
        try {
            ppUrl = await conn.profilePictureUrl(from, 'image');
        } catch {
            ppUrl = fallbackPpUrls[Math.floor(Math.random() * fallbackPpUrls.length)];
        }

        const metadata = await conn.groupMetadata(from);
        const groupAdmins = participants.filter(p => p.admin);
        const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n');
        const owner = metadata.owner || groupAdmins[0]?.id || "unknown";

        const gdata = `╭━━〔 🥏 *𝙶𝚁𝙾𝚄𝙿 𝙸𝙽𝙵𝙾𝚁𝙼𝙰𝚃𝙸𝙾𝙽* 〕━━┈⊷
┃
┃ *𝙽𝚊𝚖𝚎* : ${metadata.subject}
┃ *𝙸𝙳* : ${metadata.id}
┃ *𝙼𝚎𝚖𝚋𝚎𝚛𝚜* : ${metadata.size}
┃ *𝙲𝚛𝚎𝚊𝚝𝚘𝚛* : @${owner.split('@')[0]}
┃ *𝙳𝚎𝚜𝚌𝚛𝚒𝚙𝚝𝚒𝚘𝚗* : ${metadata.desc?.toString() || '𝙽𝚘 𝚍𝚎𝚜𝚌𝚛𝚒𝚙𝚝𝚒𝚘𝚗'}
┃
┃ *𝙰𝚍𝚖𝚒𝚗𝚜 (${groupAdmins.length})*:
${listAdmin}
┃
╰━━━━━━━━━━━━━━━━━━┈⊷
> © Powered by Sila Tech`;

        await conn.sendMessage(from, {
            image: { url: ppUrl },
            caption: gdata,
            mentions: groupAdmins.map(v => v.id).concat([owner]),
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        await conn.sendMessage(from, { 
            text: `❌ 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚛𝚎𝚍:\n\n${e.message}\n\n> © Powered by Sila Tech`, 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }
});