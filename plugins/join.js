const config = require('../config');
const { cmd } = require('../command');
const { isUrl } = require('../lib/functions');

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
    pattern: "join",
    react: "📬",
    alias: ["joinme", "f_join"],
    desc: "To Join a Group from Invite link",
    category: "group",
    use: '.join < Group Link >',
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, isCreator, reply }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, { 
                text: "🚫 𝚈𝚘𝚞 𝚍𝚘𝚗'𝚝 𝚑𝚊𝚟𝚎 𝚙𝚎𝚛𝚖𝚒𝚜𝚜𝚒𝚘𝚗 𝚝𝚘 𝚞𝚜𝚎 𝚝𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        if (!q && !quoted) {
            return await conn.sendMessage(from, { 
                text: "❌ *𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚛𝚒𝚝𝚎 𝚝𝚑𝚎 𝙶𝚛𝚘𝚞𝚙 𝙻𝚒𝚗𝚔* 🖇️\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        let groupLink;

        if (quoted && quoted.type === 'conversation' && isUrl(quoted.text)) {
            groupLink = quoted.text.split('https://chat.whatsapp.com/')[1];
        } else if (q && isUrl(q)) {
            groupLink = q.split('https://chat.whatsapp.com/')[1];
        }

        if (!groupLink) {
            return await conn.sendMessage(from, { 
                text: "❌ *𝙸𝚗𝚟𝚊𝚕𝚒𝚍 𝙶𝚛𝚘𝚞𝚙 𝙻𝚒𝚗𝚔* 🖇️\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        await conn.groupAcceptInvite(groupLink);
        
        await conn.sendMessage(from, { 
            text: "✅ *𝚂𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢 𝙹𝚘𝚒𝚗𝚎𝚍*\n\n> © Powered by Sila Tech", 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });

    } catch (e) {
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        console.log(e);
        await conn.sendMessage(from, { 
            text: `❌ *𝙴𝚛𝚛𝚘𝚛 𝙾𝚌𝚌𝚞𝚛𝚛𝚎𝚍!!*\n\n${e.message}\n\n> © Powered by Sila Tech`, 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }
});