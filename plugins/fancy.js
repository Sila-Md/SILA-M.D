const axios = require("axios");
const { cmd } = require("../command");

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
  pattern: "fancy",
  alias: ["font", "style"],
  react: "✍️",
  desc: "Convert text into various fonts.",
  category: "tools",
  filename: __filename
}, async (conn, m, store, { from, quoted, args, q, reply, sender }) => {
  try {
    const ownerName = "𝐒𝐈𝐋𝐀 𝐌𝐃";
    const formattedOwnerNumber = "255789661031";
    
    if (!q) {
      return await conn.sendMessage(from, { 
        text: "❎ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚝𝚎𝚡𝚝 𝚝𝚘 𝚌𝚘𝚗𝚟𝚎𝚛𝚝 𝚒𝚗𝚝𝚘 𝚏𝚊𝚗𝚌𝚢 𝚏𝚘𝚗𝚝𝚜.\n\n*𝙴𝚡𝚊𝚖𝚙𝚕𝚎:* .fancy 𝙷𝚎𝚕𝚕𝚘\n\n> © Powered by Sila Tech", 
        contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
      }, { quoted: fkontak });
    }

    const apiUrl = `https://www.dark-yasiya-api.site/other/font?text=${encodeURIComponent(q)}`;
    const response = await axios.get(apiUrl);
    
    if (!response.data.status) {
      return await conn.sendMessage(from, { 
        text: "❌ 𝙴𝚛𝚛𝚘𝚛 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝚏𝚘𝚗𝚝𝚜. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚝𝚛𝚢 𝚊𝚐𝚊𝚒𝚗 𝚕𝚊𝚝𝚎𝚛.\n\n> © Powered by Sila Tech", 
        contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
      }, { quoted: fkontak });
    }

    const fonts = response.data.result.map(item => `*${item.name}:*\n${item.result}`).join("\n\n");
    const resultText = `╭━━〔 ✍️ *𝙵𝙰𝙽𝙲𝚈 𝙵𝙾𝙽𝚃𝚂* 〕━━┈⊷
┃
${fonts}
┃
╰━━━━━━━━━━━━━━━━━━┈⊷
> © Powered by Sila Tech`;

    await conn.sendMessage(from, { 
      text: resultText,
      contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
    }, { quoted: fkontak });
    
  } catch (error) {
    console.error("❌ Error in fancy command:", error);
    await conn.sendMessage(from, { 
      text: "⚠️ 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝚏𝚘𝚗𝚝𝚜.\n\n> © Powered by Sila Tech", 
      contextInfo: getContextInfo({ sender: sender }, "𝐒𝐈𝐋𝐀 𝐌𝐃", "255789661031")
    }, { quoted: fkontak });
  }
});