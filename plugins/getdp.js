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
    pattern: "getdp",
    desc: "Get profile picture of a user or group",
    category: "tools",
    react: "🖼️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, isGroup, reply, sender }) => {
    try {
        // Determine whose DP to get
        let target;
        if (m.mentionedJid && m.mentionedJid[0]) {
            target = m.mentionedJid[0];
        } else if (m.msg.contextInfo && m.msg.contextInfo.participant) {
            target = m.msg.contextInfo.participant;
        } else {
            target = from;
        }

        // Fetch the Profile Picture URL
        let ppUrl;
        try {
            ppUrl = await conn.profilePictureUrl(target, 'image');
        } catch (e) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝙸 𝚌𝚘𝚞𝚕𝚍𝚗'𝚝 𝚏𝚎𝚝𝚌𝚑 𝚝𝚑𝚎 𝚙𝚛𝚘𝚏𝚒𝚕𝚎 𝚙𝚒𝚌𝚝𝚞𝚛𝚎. 𝙸𝚝 𝚖𝚒𝚐𝚑𝚝 𝚋𝚎 𝚙𝚛𝚒𝚟𝚊𝚝𝚎 𝚘𝚛 𝚗𝚘𝚝 𝚜𝚎𝚝.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        // Send the image
        await conn.sendMessage(from, { 
            image: { url: ppUrl }, 
            caption: `🖼️ *𝙿𝚛𝚘𝚏𝚒𝚕𝚎 𝙿𝚒𝚌𝚝𝚞𝚛𝚎 𝚘𝚏:* @${target.split('@')[0]}\n\n> © Powered by Sila Tech`,
            mentions: [target],
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });

    } catch (err) {
        console.error(err);
        await conn.sendMessage(from, { 
            text: "❌ 𝙴𝚛𝚛𝚘𝚛 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝚙𝚛𝚘𝚏𝚒𝚕𝚎 𝚙𝚒𝚌𝚝𝚞𝚛𝚎.\n\n> © Powered by Sila Tech", 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }
});