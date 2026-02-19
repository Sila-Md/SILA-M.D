const { cmd } = require('../command');
const fetch = require('node-fetch');

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
    pattern: "trt",
    alias: ["translate", "trans"],
    react: "🌐",
    desc: "Translate text to any language.",
    category: "tools",
    use: ".trt fr Hello, how are you?",
    filename: __filename
}, async (conn, mek, m, { from, q, reply, sender }) => {
    try {
        if (!q) {
            return await conn.sendMessage(from, { 
                text: "⚙️ *𝚂𝚈𝚂𝚃𝙴𝙼:* 𝙼𝚒𝚜𝚜𝚒𝚗𝚐 𝚒𝚗𝚙𝚞𝚝.\n\n*𝚄𝚜𝚊𝚐𝚎:* .trt <𝚕𝚊𝚗𝚐_𝚌𝚘𝚍𝚎> <𝚝𝚎𝚡𝚝>\n*𝙴𝚡𝚊𝚖𝚙𝚕𝚎:* .trt fr 𝙷𝚎𝚕𝚕𝚘\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        // Split the language code (fr, es, ar, etc) from the actual text
        const args = q.split(" ");
        const targetLang = args[0]; 
        const textToTranslate = args.slice(1).join(" ");

        if (!textToTranslate) {
            return await conn.sendMessage(from, { 
                text: "❌ *𝙴𝚁𝚁𝙾𝚁:* 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚝𝚑𝚎 𝚝𝚎𝚡𝚝 𝚢𝚘𝚞 𝚠𝚊𝚗𝚝 𝚝𝚘 𝚝𝚛𝚊𝚗𝚜𝚕𝚊𝚝𝚎.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        // Initial loading message
        const { key } = await conn.sendMessage(from, { 
            text: "🔄 *𝚃𝚁𝙰𝙽𝚂𝙻𝙰𝚃𝙸𝙽𝙶:* 𝙿𝚛𝚘𝚌𝚎𝚜𝚜𝚒𝚗𝚐 𝚛𝚎𝚚𝚞𝚎𝚜𝚝...",
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });

        const apiUrl = `https://apis.davidcyriltech.my.id/tools/translate?text=${encodeURIComponent(textToTranslate)}&to=${targetLang}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data.success) {
            return await conn.sendMessage(from, { 
                text: "❌ *𝙵𝙰𝚃𝙰𝙻 𝙴𝚁𝚁𝙾𝚁:* 𝚃𝚛𝚊𝚗𝚜𝚕𝚊𝚝𝚒𝚘𝚗 𝚜𝚎𝚛𝚟𝚒𝚌𝚎 𝚞𝚗𝚊𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎.\n\n> © Powered by Sila Tech", 
                edit: key,
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        // Final Output
        let resultMsg = `╔═════════════╗
  ✰  *𝚃𝚁𝙰𝙽𝚂𝙻𝙰𝚃𝙴 𝙲𝙾𝚁𝙴* ✰
╟────────────╢
│ 🌐 *𝙵𝚁𝙾𝙼:* 𝙰𝚞𝚝𝚘-𝙳𝚎𝚝𝚎𝚌𝚝
│ 🎯 *𝚃𝙾:* ${targetLang.toUpperCase()}
╟────────────╢
│ 📝 *𝚁𝙴𝚂𝚄𝙻𝚃:* 
│ ${data.result}
╚═════════════╝
> © Powered by Sila Tech`;

        await conn.sendMessage(from, { 
            text: resultMsg, 
            edit: key,
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });

    } catch (error) {
        console.error(error);
        await conn.sendMessage(from, { 
            text: `❌ **𝚂𝚈𝚂𝚃𝙴𝙼 𝙴𝚁𝚁𝙾𝚁:** ${error.message}\n\n> © Powered by Sila Tech`, 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }
});