const axios = require("axios");
const { cmd } = require("../command");
const { fetchGif, gifToVideo } = require("../lib/fetchGif");

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
  pattern: "marige",
  alias: ["shadi", "marriage", "wedding"],
  desc: "Randomly pairs two users for marriage with a wedding GIF",
  react: "💍",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, from, sender }) => {
  try {
    if (!isGroup) {
      return await conn.sendMessage(from, { 
        text: "❌ 𝚃𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚌𝚊𝚗 𝚘𝚗𝚕𝚢 𝚋𝚎 𝚞𝚜𝚎𝚍 𝚒𝚗 𝚐𝚛𝚘𝚞𝚙𝚜!\n\n> © Powered by Sila Tech", 
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }

    const participants = groupMetadata.participants.map(user => user.id);
    
    // Filter out the sender and bot number if needed
    const eligibleParticipants = participants.filter(id => id !== sender && !id.includes(conn.user.id.split('@')[0]));
    
    if (eligibleParticipants.length < 1) {
      return await conn.sendMessage(from, { 
        text: "❌ 𝙽𝚘𝚝 𝚎𝚗𝚘𝚞𝚐𝚑 𝚙𝚊𝚛𝚝𝚒𝚌𝚒𝚙𝚊𝚗𝚝𝚜 𝚝𝚘 𝚙𝚎𝚛𝚏𝚘𝚛𝚖 𝚊 𝚖𝚊𝚛𝚛𝚒𝚊𝚐𝚎!\n\n> © Powered by Sila Tech", 
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }

    // Select random pair
    const randomIndex = Math.floor(Math.random() * eligibleParticipants.length);
    const randomPair = eligibleParticipants[randomIndex];

    // Fetch wedding GIF
    const apiUrl = "https://api.waifu.pics/sfw/hug";
    let res = await axios.get(apiUrl);
    let gifUrl = res.data.url;

    let gifBuffer = await fetchGif(gifUrl);
    let videoBuffer = await gifToVideo(gifBuffer);

    const message = `💍 *𝚂𝚑𝚊𝚍𝚒 𝙼𝚞𝚋𝚊𝚛𝚊𝚔!* 💒\n\n👰 @${sender.split("@")[0]} + 🤵 @${randomPair.split("@")[0]}\n\n𝙼𝚊𝚢 𝚢𝚘𝚞 𝚋𝚘𝚝𝚑 𝚕𝚒𝚟𝚎 𝚑𝚊𝚙𝚙𝚒𝚕𝚢 𝚎𝚟𝚎𝚛 𝚊𝚏𝚝𝚎𝚛! 💖\n\n> © Powered by Sila Tech`;

    await conn.sendMessage(
      mek.chat,
      { 
        video: videoBuffer, 
        caption: message, 
        gifPlayback: true, 
        mentions: [sender, randomPair],
        contextInfo: getContextInfo({ sender: sender })
      },
      { quoted: fkontak }
    );

  } catch (error) {
    console.error("❌ Error in .marige command:", error);
    await conn.sendMessage(from, { 
      text: `❌ *𝙴𝚛𝚛𝚘𝚛:* ${error.message}\n\n> © Powered by Sila Tech`, 
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });
  }
});