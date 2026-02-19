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
    pattern: "getimage",
    alias: ["tophoto","url2image","urltoimage", "imagefromurl", "fetchimage"],
    desc: "Convert image URL to WhatsApp image",
    category: "media",
    react: "🖼️",
    filename: __filename
}, async (conn, mek, m, { from, reply, text, sender }) => {
    try {
        if (!text) {
            return await conn.sendMessage(from, { 
                text: "𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊𝚗 𝚒𝚖𝚊𝚐𝚎 𝚄𝚁𝙻\n𝙴𝚡𝚊𝚖𝚙𝚕𝚎: .getimage https://example.com/image.jpg\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        const imageUrl = text.trim();

        // Validate URL
        if (!imageUrl.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i)) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝙸𝚗𝚟𝚊𝚕𝚒𝚍 𝚒𝚖𝚊𝚐𝚎 𝚄𝚁𝙻! 𝙼𝚞𝚜𝚝 𝚋𝚎 𝚍𝚒𝚛𝚎𝚌𝚝 𝚕𝚒𝚗𝚔 𝚝𝚘 𝚒𝚖𝚊𝚐𝚎 (jpg/png/gif/webp)\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        // Verify the image exists
        try {
            const response = await axios.head(imageUrl);
            if (!response.headers['content-type']?.startsWith('image/')) {
                return await conn.sendMessage(from, { 
                    text: "❌ 𝚄𝚁𝙻 𝚍𝚘𝚎𝚜 𝚗𝚘𝚝 𝚙𝚘𝚒𝚗𝚝 𝚝𝚘 𝚊 𝚟𝚊𝚕𝚒𝚍 𝚒𝚖𝚊𝚐𝚎\n\n> © Powered by Sila Tech", 
                    contextInfo: getContextInfo({ sender: sender })
                }, { quoted: fkontak });
            }
        } catch (e) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝙲𝚘𝚞𝚕𝚍 𝚗𝚘𝚝 𝚊𝚌𝚌𝚎𝚜𝚜 𝚒𝚖𝚊𝚐𝚎 𝚄𝚁𝙻. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚌𝚑𝚎𝚌𝚔 𝚝𝚑𝚎 𝚕𝚒𝚗𝚔\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        // Send the image
        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: "𝙷𝚎𝚛𝚎 𝚒𝚜 𝚢𝚘𝚞𝚛 𝚒𝚖𝚊𝚐𝚎 𝚏𝚛𝚘𝚖 𝚝𝚑𝚎 𝚄𝚁𝙻\n\n> © Powered by Sila Tech",
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });

    } catch (error) {
        console.error('GetImage Error:', error);
        await conn.sendMessage(from, { 
            text: `❌ 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚙𝚛𝚘𝚌𝚎𝚜𝚜 𝚒𝚖𝚊𝚐𝚎. 𝙴𝚛𝚛𝚘𝚛: ${error.message}\n\n> © Powered by Sila Tech`, 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }
});