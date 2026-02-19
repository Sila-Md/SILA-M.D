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

// Random Boy Selection Command
cmd({
  pattern: "bacha",
  alias: ["larka"],
  desc: "Randomly selects a boy from the group",
  react: "👦",
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
    
    if (!groupMetadata?.participants) {
      return await conn.sendMessage(from, { 
        text: "⚠️ 𝙲𝚘𝚞𝚕𝚍𝚗'𝚝 𝚏𝚎𝚝𝚌𝚑 𝚐𝚛𝚘𝚞𝚙 𝚖𝚎𝚖𝚋𝚎𝚛𝚜.\n\n> © Powered by Sila Tech", 
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }

    const botNumber = conn.user.id;
    const participants = groupMetadata.participants.filter(p => p.id !== botNumber);

    if (participants.length < 1) {
      return await conn.sendMessage(from, { 
        text: "❌ 𝙽𝚘 𝚎𝚕𝚒𝚐𝚒𝚋𝚕𝚎 𝚙𝚊𝚛𝚝𝚒𝚌𝚒𝚙𝚊𝚗𝚝𝚜 𝚏𝚘𝚞𝚗𝚍!\n\n> © Powered by Sila Tech", 
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }

    const randomUser = participants[Math.floor(Math.random() * participants.length)];

    await conn.sendMessage(
      from,
      {
        text: `👦 *𝚈𝚎𝚑 𝚕𝚘 𝚝𝚞𝚖𝚑𝚊𝚛𝚊 𝙱𝚊𝚌𝚑𝚊!*\n\n@${randomUser.id.split('@')[0]} 𝚒𝚜 𝚢𝚘𝚞𝚛 𝚑𝚊𝚗𝚍𝚜𝚘𝚖𝚎 𝚋𝚘𝚢! 😎\n\n> © Powered by Sila Tech`,
        mentions: [randomUser.id],
        contextInfo: getContextInfo({ sender: sender })
      },
      { quoted: fkontak }
    );
    
  } catch (error) {
    console.error("Error in .bacha command:", error);
    await conn.sendMessage(from, { 
      text: "❌ 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚜𝚎𝚕𝚎𝚌𝚝𝚒𝚗𝚐 𝚊 𝚋𝚘𝚢.\n\n> © Powered by Sila Tech", 
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });
  }
});

// Random Girl Selection Command
cmd({
  pattern: "bachi",
  alias: ["kuri", "larki"],
  desc: "Randomly selects a girl from the group",
  react: "👧",
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
    
    if (!groupMetadata?.participants) {
      return await conn.sendMessage(from, { 
        text: "⚠️ 𝙲𝚘𝚞𝚕𝚍𝚗'𝚝 𝚏𝚎𝚝𝚌𝚑 𝚐𝚛𝚘𝚞𝚙 𝚖𝚎𝚖𝚋𝚎𝚛𝚜.\n\n> © Powered by Sila Tech", 
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }

    const botNumber = conn.user.id;
    const participants = groupMetadata.participants.filter(p => p.id !== botNumber);

    if (participants.length < 1) {
      return await conn.sendMessage(from, { 
        text: "❌ 𝙽𝚘 𝚎𝚕𝚒𝚐𝚒𝚋𝚕𝚎 𝚙𝚊𝚛𝚝𝚒𝚌𝚒𝚙𝚊𝚗𝚝𝚜 𝚏𝚘𝚞𝚗𝚍!\n\n> © Powered by Sila Tech", 
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }

    const randomUser = participants[Math.floor(Math.random() * participants.length)];

    await conn.sendMessage(
      from,
      {
        text: `👧 *𝚈𝚎𝚑 𝚕𝚘 𝚝𝚞𝚖𝚑𝚊𝚛𝚒 𝙱𝚊𝚌𝚑𝚒!*\n\n@${randomUser.id.split('@')[0]} 𝚒𝚜 𝚢𝚘𝚞𝚛 𝚋𝚎𝚊𝚞𝚝𝚒𝚏𝚞𝚕 𝚐𝚒𝚛𝚕! 💖\n\n> © Powered by Sila Tech`,
        mentions: [randomUser.id],
        contextInfo: getContextInfo({ sender: sender })
      },
      { quoted: fkontak }
    );
    
  } catch (error) {
    console.error("Error in .bachi command:", error);
    await conn.sendMessage(from, { 
      text: "❌ 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚜𝚎𝚕𝚎𝚌𝚝𝚒𝚗𝚐 𝚊 𝚐𝚒𝚛𝚕.\n\n> © Powered by Sila Tech", 
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });
  }
});