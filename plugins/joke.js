const axios = require("axios");
const { sleep } = require('../lib/functions');
const { cmd, commands } = require("../command");

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
  pattern: "joke",
  desc: "😂 Get a random joke",
  react: "🤣",
  category: "fun",
  filename: __filename
}, async (conn, m, store, { from, reply, sender }) => {
  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    const joke = response.data;

    if (!joke || !joke.setup || !joke.punchline) {
      return await conn.sendMessage(from, { 
        text: "❌ 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚏𝚎𝚝𝚌𝚑 𝚊 𝚓𝚘𝚔𝚎. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚝𝚛𝚢 𝚊𝚐𝚊𝚒𝚗.\n\n> © Powered by Sila Tech", 
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }

    const jokeMessage = `🤣 *𝙷𝚎𝚛𝚎'𝚜 𝚊 𝚛𝚊𝚗𝚍𝚘𝚖 𝚓𝚘𝚔𝚎 𝚏𝚘𝚛 𝚢𝚘𝚞!* 🤣\n\n*${joke.setup}*\n\n${joke.punchline} 😆\n\n> © Powered by Sila Tech`;

    await conn.sendMessage(from, { 
      text: jokeMessage,
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });
    
  } catch (error) {
    console.error("❌ Error in joke command:", error);
    await conn.sendMessage(from, { 
      text: "⚠️ 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝚝𝚑𝚎 𝚓𝚘𝚔𝚎. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚝𝚛𝚢 𝚊𝚐𝚊𝚒𝚗.\n\n> © Powered by Sila Tech", 
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });
  }
});