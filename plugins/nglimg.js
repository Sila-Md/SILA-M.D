const { cmd } = require('../command');
const axios = require('axios');

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
    pattern: "nglimg",
    alias: ["nglimage", "ngl", "getngl"],
    desc: "Generate an NGL-style image using custom text",
    category: "media",
    react: "🎨",
    filename: __filename
}, async (conn, mek, m, { from, reply, text, sender }) => {
    try {
        if (!text) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚜𝚘𝚖𝚎 𝚝𝚎𝚡𝚝 𝚝𝚘 𝚐𝚎𝚗𝚎𝚛𝚊𝚝𝚎 𝙽𝙶𝙻 𝚒𝚖𝚊𝚐𝚎.\n𝙴𝚡𝚊𝚖𝚙𝚕𝚎: .nglimg 𝙰𝚜𝚕𝚊𝚖 𝚘 𝙰𝚕𝚢𝚔𝚞𝚖\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        const encodedText = encodeURIComponent(text.trim());
        const apiUrl = `https://jawad-tech.vercel.app/random/ngl?text=${encodedText}`;

        // Check if the API returns a valid image
        try {
            const headCheck = await axios.head(apiUrl);
            if (!headCheck.headers['content-type']?.startsWith('image/')) {
                return await conn.sendMessage(from, { 
                    text: "❌ 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚐𝚎𝚗𝚎𝚛𝚊𝚝𝚎 𝚒𝚖𝚊𝚐𝚎. 𝙰𝙿𝙸 𝚍𝚒𝚍 𝚗𝚘𝚝 𝚛𝚎𝚝𝚞𝚛𝚗 𝚊𝚗 𝚒𝚖𝚊𝚐𝚎.\n\n> © Powered by Sila Tech", 
                    contextInfo: getContextInfo({ sender: sender })
                }, { quoted: fkontak });
            }
        } catch (e) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝙲𝚘𝚞𝚕𝚍 𝚗𝚘𝚝 𝚛𝚎𝚊𝚌𝚑 𝚝𝚑𝚎 𝙽𝙶𝙻 𝙰𝙿𝙸. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚝𝚛𝚢 𝚊𝚐𝚊𝚒𝚗 𝚕𝚊𝚝𝚎𝚛.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        // Send the image
        await conn.sendMessage(from, {
            image: { url: apiUrl },
            caption: `> © Powered by Sila Tech`,
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });

    } catch (err) {
        console.error('NGL Image Error:', err);
        await conn.sendMessage(from, { 
            text: `❌ 𝚂𝚘𝚖𝚎𝚝𝚑𝚒𝚗𝚐 𝚠𝚎𝚗𝚝 𝚠𝚛𝚘𝚗𝚐 𝚠𝚑𝚒𝚕𝚎 𝚐𝚎𝚗𝚎𝚛𝚊𝚝𝚒𝚗𝚐 𝚒𝚖𝚊𝚐𝚎.\n𝙴𝚛𝚛𝚘𝚛: ${err.message}\n\n> © Powered by Sila Tech`, 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }
});