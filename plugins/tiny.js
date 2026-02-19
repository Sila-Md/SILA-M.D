const { cmd } = require("../command");
const fetch = require("node-fetch");
const axios = require("axios");

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
    pattern: "tiny",
    alias: ['short', 'shorturl'],
    react: "🫧",
    desc: "Makes URL tiny.",
    category: "convert",
    use: "<url>",
    filename: __filename,
},
async (conn, mek, m, { from, quoted, isOwner, isAdmins, reply, args, sender }) => {
    try {
        if (!args[0]) {
            return await conn.sendMessage(from, { 
                text: "*🏷️ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚖𝚎 𝚊 𝚕𝚒𝚗𝚔.*\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        const link = args[0];
        const response = await axios.get(`https://tinyurl.com/api-create.php?url=${link}`);
        const shortenedUrl = response.data;

        return await conn.sendMessage(from, { 
            text: `╭━━〔 🔗 *𝚂𝙷𝙾𝚁𝚃𝙴𝙽𝙴𝙳 𝚄𝚁𝙻* 〕━━┈⊷
┃
┃ *𝚈𝙾𝚄𝚁 𝚂𝙷𝙾𝚁𝚃𝙴𝙽𝙴𝙳 𝚄𝚁𝙻*
┃ ${shortenedUrl}
┃
╰━━━━━━━━━━━━━━━━━━┈⊷
> © Powered by Sila Tech`, 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
        
    } catch (e) {
        console.error("Error shortening URL:", e);
        await conn.sendMessage(from, { 
            text: "𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚜𝚑𝚘𝚛𝚝𝚎𝚗𝚒𝚗𝚐 𝚝𝚑𝚎 𝚄𝚁𝙻. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚝𝚛𝚢 𝚊𝚐𝚊𝚒𝚗.\n\n> © Powered by Sila Tech", 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }
});