const { cmd } = require("../command");
const axios = require("axios");
const fs = require("fs");

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
  pattern: "fluxai",
  alias: ["flux", "imagine"],
  react: "🚀",
  desc: "Generate an image using AI.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { q, reply, from, sender }) => {
  try {
    if (!q) {
      return await conn.sendMessage(from, { 
        text: "❌ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝚙𝚛𝚘𝚖𝚙𝚝 𝚏𝚘𝚛 𝚝𝚑𝚎 𝚒𝚖𝚊𝚐𝚎.\n\n> © Powered by Sila Tech", 
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }

    await conn.sendMessage(from, { 
      text: "> *𝙲𝚁𝙴𝙰𝚃𝙸𝙽𝙶 𝙸𝙼𝙰𝙶𝙴 ...🔥*",
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });

    const apiUrl = `https://api.siputzx.my.id/api/ai/flux?prompt=${encodeURIComponent(q)}`;

    const response = await axios.get(apiUrl, { responseType: "arraybuffer" });

    if (!response || !response.data) {
      return await conn.sendMessage(from, { 
        text: "❌ 𝙴𝚛𝚛𝚘𝚛: 𝚃𝚑𝚎 𝙰𝙿𝙸 𝚍𝚒𝚍 𝚗𝚘𝚝 𝚛𝚎𝚝𝚞𝚛𝚗 𝚊 𝚟𝚊𝚕𝚒𝚍 𝚒𝚖𝚊𝚐𝚎. 𝚃𝚛𝚢 𝚊𝚐𝚊𝚒𝚗 𝚕𝚊𝚝𝚎𝚛.\n\n> © Powered by Sila Tech", 
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }

    const imageBuffer = Buffer.from(response.data, "binary");

    await conn.sendMessage(from, {
      image: imageBuffer,
      caption: `🚀 *𝚂𝙸𝙻𝙰 𝙼𝙳 𝙰𝙸*\n✨ 𝙿𝚛𝚘𝚖𝚙𝚝: *${q}*\n\n> © Powered by Sila Tech`,
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });

  } catch (error) {
    console.error("FluxAI Error:", error);
    await conn.sendMessage(from, { 
      text: `❌ 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚛𝚎𝚍: ${error.message || "Unknown error"}\n\n> © Powered by Sila Tech`, 
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });
  }
});

cmd({
  pattern: "stablediffusion",
  alias: ["sdiffusion", "imagine2"],
  react: "🚀",
  desc: "Generate an image using AI.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { q, reply, from, sender }) => {
  try {
    if (!q) {
      return await conn.sendMessage(from, { 
        text: "❌ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝚙𝚛𝚘𝚖𝚙𝚝 𝚏𝚘𝚛 𝚝𝚑𝚎 𝚒𝚖𝚊𝚐𝚎.\n\n> © Powered by Sila Tech", 
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }

    await conn.sendMessage(from, { 
      text: "> *𝙲𝚁𝙴𝙰𝚃𝙸𝙽𝙶 𝙸𝙼𝙰𝙶𝙴 ...🔥*",
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });

    const apiUrl = `https://api.siputzx.my.id/api/ai/stable-diffusion?prompt=${encodeURIComponent(q)}`;

    const response = await axios.get(apiUrl, { responseType: "arraybuffer" });

    if (!response || !response.data) {
      return await conn.sendMessage(from, { 
        text: "❌ 𝙴𝚛𝚛𝚘𝚛: 𝚃𝚑𝚎 𝙰𝙿𝙸 𝚍𝚒𝚍 𝚗𝚘𝚝 𝚛𝚎𝚝𝚞𝚛𝚗 𝚊 𝚟𝚊𝚕𝚒𝚍 𝚒𝚖𝚊𝚐𝚎. 𝚃𝚛𝚢 𝚊𝚐𝚊𝚒𝚗 𝚕𝚊𝚝𝚎𝚛.\n\n> © Powered by Sila Tech", 
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }

    const imageBuffer = Buffer.from(response.data, "binary");

    await conn.sendMessage(from, {
      image: imageBuffer,
      caption: `🚀 *𝚂𝙸𝙻𝙰 𝙼𝙳 𝙰𝙸*\n✨ 𝙿𝚛𝚘𝚖𝚙𝚝: *${q}*\n\n> © Powered by Sila Tech`,
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });

  } catch (error) {
    console.error("StableDiffusion Error:", error);
    await conn.sendMessage(from, { 
      text: `❌ 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚛𝚎𝚍: ${error.message || "Unknown error"}\n\n> © Powered by Sila Tech`, 
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });
  }
});

cmd({
  pattern: "stabilityai",
  alias: ["stability", "imagine3"],
  react: "🚀",
  desc: "Generate an image using AI.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { q, reply, from, sender }) => {
  try {
    if (!q) {
      return await conn.sendMessage(from, { 
        text: "❌ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝚙𝚛𝚘𝚖𝚙𝚝 𝚏𝚘𝚛 𝚝𝚑𝚎 𝚒𝚖𝚊𝚐𝚎.\n\n> © Powered by Sila Tech", 
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }

    await conn.sendMessage(from, { 
      text: "> *𝙲𝚁𝙴𝙰𝚃𝙸𝙽𝙶 𝙸𝙼𝙰𝙶𝙴 ...🔥*",
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });

    const apiUrl = `https://api.siputzx.my.id/api/ai/stabilityai?prompt=${encodeURIComponent(q)}`;

    const response = await axios.get(apiUrl, { responseType: "arraybuffer" });

    if (!response || !response.data) {
      return await conn.sendMessage(from, { 
        text: "❌ 𝙴𝚛𝚛𝚘𝚛: 𝚃𝚑𝚎 𝙰𝙿𝙸 𝚍𝚒𝚍 𝚗𝚘𝚝 𝚛𝚎𝚝𝚞𝚛𝚗 𝚊 𝚟𝚊𝚕𝚒𝚍 𝚒𝚖𝚊𝚐𝚎. 𝚃𝚛𝚢 𝚊𝚐𝚊𝚒𝚗 𝚕𝚊𝚝𝚎𝚛.\n\n> © Powered by Sila Tech", 
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }

    const imageBuffer = Buffer.from(response.data, "binary");

    await conn.sendMessage(from, {
      image: imageBuffer,
      caption: `🚀 *𝚂𝙸𝙻𝙰 𝙼𝙳 𝙰𝙸*\n✨ 𝙿𝚛𝚘𝚖𝚙𝚝: *${q}*\n\n> © Powered by Sila Tech`,
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });

  } catch (error) {
    console.error("StabilityAI Error:", error);
    await conn.sendMessage(from, { 
      text: `❌ 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚛𝚎𝚍: ${error.message || "Unknown error"}\n\n> © Powered by Sila Tech`, 
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });
  }
});