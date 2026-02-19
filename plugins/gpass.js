const crypto = require('crypto');
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
    pattern: "gpass",
    desc: "Generate a strong password.",
    category: "other",
    react: "🔐",
    filename: __filename
},
async (conn, mek, m, { from, args, reply, sender }) => {
    try {
        const length = args[0] ? parseInt(args[0]) : 12; // Default length is 12
        
        if (isNaN(length) || length < 8) {
            return await conn.sendMessage(from, { 
                text: "𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝚟𝚊𝚕𝚒𝚍 𝚕𝚎𝚗𝚐𝚝𝚑 𝚏𝚘𝚛 𝚝𝚑𝚎 𝚙𝚊𝚜𝚜𝚠𝚘𝚛𝚍 (𝙼𝚒𝚗𝚒𝚖𝚞𝚖 𝟶𝟾 𝙲𝚑𝚊𝚛𝚊𝚌𝚝𝚎𝚛𝚜).\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        const generatePassword = (len) => {
            const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';
            let password = '';
            for (let i = 0; i < len; i++) {
                const randomIndex = crypto.randomInt(0, charset.length);
                password += charset[randomIndex];
            }
            return password;
        };

        const password = generatePassword(length);
        const message = `🔐 *𝚈𝚘𝚞𝚛 𝚂𝚝𝚛𝚘𝚗𝚐 𝙿𝚊𝚜𝚜𝚠𝚘𝚛𝚍* 🔐\n\n𝙿𝚕𝚎𝚊𝚜𝚎 𝚏𝚒𝚗𝚍 𝚢𝚘𝚞𝚛 𝚐𝚎𝚗𝚎𝚛𝚊𝚝𝚎𝚍 𝚙𝚊𝚜𝚜𝚠𝚘𝚛𝚍 𝚋𝚎𝚕𝚘𝚠:`;

        // Send initial notification message
        await conn.sendMessage(from, { 
            text: message,
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });

        // Send the password in a separate message
        await conn.sendMessage(from, { 
            text: `\`\`\`${password}\`\`\`\n\n> © Powered by Sila Tech`,
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
        
    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { 
            text: `❌ 𝙴𝚛𝚛𝚘𝚛 𝚐𝚎𝚗𝚎𝚛𝚊𝚝𝚒𝚗𝚐 𝚙𝚊𝚜𝚜𝚠𝚘𝚛𝚍🤕: ${e.message}\n\n> © Powered by Sila Tech`, 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }
});