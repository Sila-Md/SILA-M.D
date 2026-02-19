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
  pattern: "quote",
  desc: "Get a random inspiring quote.",
  category: "fun",
  react: "💬",
  filename: __filename
}, async (conn, m, store, { from, reply, sender }) => {
  try {
    const response = await axios.get("https://api.quotable.io/random");
    const { content, author } = response.data;

    const message = `💬 *"${content}"*\n\n— ${author}\n\n> © Powered by Sila Tech`;
    
    await conn.sendMessage(from, { 
      text: message,
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });
    
  } catch (error) {
    console.error("Error fetching quote:", error);
    await conn.sendMessage(from, { 
      text: "⚠️ 𝙰𝙿𝙸 𝚒𝚜𝚜𝚞𝚎 𝚘𝚛 𝚌𝚘𝚍𝚒𝚗𝚐 𝚎𝚛𝚛𝚘𝚛, 𝚙𝚕𝚎𝚊𝚜𝚎 𝚌𝚑𝚎𝚌𝚔 𝚝𝚑𝚎 𝚕𝚘𝚐𝚜!\n\n> © Powered by Sila Tech", 
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });
  }
});