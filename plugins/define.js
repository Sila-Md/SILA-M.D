const axios = require('axios');
const { cmd } = require('../command');
const config = require('../config');

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

const getContextInfo = (m, ownerName = "𝐒𝐈𝐋𝐀 𝐌𝐃", formattedOwnerNumber = "255789661031") => {
    return {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363402325089913@newsletter',
            newsletterName: '© 𝐒𝐈𝐋𝐀 𝐌𝐃',
            serverMessageId: 143,
        },
        externalAdReply: {
            title: `👑 𝙱𝙾𝚃 𝙾𝚆𝙽𝙴𝚁: ${ownerName}`,
            body: `📞 wa.me/${formattedOwnerNumber}`,
            mediaType: 1,
            previewType: 0,
            thumbnailUrl: 'https://files.catbox.moe/98k75b.jpeg',
            sourceUrl: `https://wa.me/${formattedOwnerNumber}`,
            renderLargerThumbnail: false,
        }
    };
};

cmd({
    pattern: "define",
    desc: "📖 Get the definition of a word",
    react: "🔍",
    category: "search",
    filename: __filename
},
async (conn, mek, m, { from, q, sender }) => {
    try {
        const ownerName = "𝐒𝐈𝐋𝐀 𝐌𝐃";
        const formattedOwnerNumber = "255789661031";
        
        if (!q) {
            return await conn.sendMessage(from, { 
                text: "📌 *𝚄𝚜𝚊𝚐𝚎:* .define [𝚠𝚘𝚛𝚍]\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });
        }

        const word = q.trim();
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

        const response = await axios.get(url);
        const definitionData = response.data[0];

        const definition = definitionData.meanings[0].definitions[0].definition;
        const example = definitionData.meanings[0].definitions[0].example || '❌ 𝙽𝚘 𝚎𝚡𝚊𝚖𝚙𝚕𝚎 𝚊𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎';
        const synonyms = definitionData.meanings[0].definitions[0].synonyms.join(', ') || '❌ 𝙽𝚘 𝚜𝚢𝚗𝚘𝚗𝚢𝚖𝚜 𝚊𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎';
        const phonetics = definitionData.phonetics[0]?.text || '🔇 𝙽𝚘 𝚙𝚑𝚘𝚗𝚎𝚝𝚒𝚌𝚜 𝚊𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎';
        const audio = definitionData.phonetics[0]?.audio || null;

        const wordInfo = `
📖 *𝚆𝚘𝚛𝚍*: *${definitionData.word}*  
🗣️ *𝙿𝚛𝚘𝚗𝚞𝚗𝚌𝚒𝚊𝚝𝚒𝚘𝚗*: _${phonetics}_  
📚 *𝙳𝚎𝚏𝚒𝚗𝚒𝚝𝚒𝚘𝚗*: ${definition}  
✍️ *𝙴𝚡𝚊𝚖𝚙𝚕𝚎*: ${example}  
📝 *𝚂𝚢𝚗𝚘𝚗𝚢𝚖𝚜*: ${synonyms}  

> © Powered by Sila Tech`;

        if (audio) {
            await conn.sendMessage(from, { 
                audio: { url: audio }, 
                mimetype: 'audio/mpeg' 
            }, { quoted: fkontak });
        }

        return await conn.sendMessage(from, { 
            text: wordInfo,
            contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
        }, { quoted: fkontak });
        
    } catch (e) {
        console.error("❌ Error:", e);
        if (e.response && e.response.status === 404) {
            return await conn.sendMessage(from, { 
                text: "🚫 *𝚆𝚘𝚛𝚍 𝚗𝚘𝚝 𝚏𝚘𝚞𝚗𝚍.* 𝙿𝚕𝚎𝚊𝚜𝚎 𝚌𝚑𝚎𝚌𝚔 𝚝𝚑𝚎 𝚜𝚙𝚎𝚕𝚕𝚒𝚗𝚐.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });
        }
        return await conn.sendMessage(from, { 
            text: "⚠️ 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝚝𝚑𝚎 𝚍𝚎𝚏𝚒𝚗𝚒𝚝𝚒𝚘𝚗.\n\n> © Powered by Sila Tech", 
            contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
        }, { quoted: fkontak });
    }
});