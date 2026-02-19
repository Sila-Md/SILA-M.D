const { cmd } = require("../command");
const config = require("../config");
const fetch = require("node-fetch");

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

// === AI Chatbot Event Handler ===
cmd({ on: "body" }, async (conn, mek, m, { from, body, isGroup, isCmd, sender }) => {
  try {
    if (config.AUTO_AI === "true" && !isCmd && !isGroup && !mek.key.fromMe && body) {
      
      await conn.sendPresenceUpdate('composing', from);

      const apiKey = ""; 
      const apiUrl = `https://apis.davidcyriltech.my.id/ai/chatbot?query=${encodeURIComponent(body)}&apikey=${apiKey}`;
      
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status === 200 || data.success) {
        const aiReply = data.result;

        await conn.sendMessage(from, {
          text: `${aiReply}\n\n> © Powered by Sila Tech 🤖`,
          contextInfo: getContextInfo({ sender: sender }, "𝐒𝐈𝐋𝐀 𝐌𝐃", "255789661031")
        }, { quoted: fkontak });
      }
    }
  } catch (error) {
    console.error("❌ Chatbot Error:", error);
  }
});

// === Chatbot Toggle Command ===
cmd({
  pattern: "chatbot",
  alias: ["autoai", "aichat"],
  desc: "Toggle Auto AI Chatbot feature",
  category: "owner",
  react: "🤖",
  filename: __filename
},
async (conn, mek, m, { from, sender, args, isOwner }) => {
  try {
    const ownerName = "𝐒𝐈𝐋𝐀 𝐌𝐃";
    const formattedOwnerNumber = "255789661031";
    
    if (!isOwner) {
      return await conn.sendMessage(from, { 
        text: "🚫 *𝙾𝚠𝚗𝚎𝚛-𝚘𝚗𝚕𝚢 𝚌𝚘𝚖𝚖𝚊𝚗𝚍!*\n\n> © Powered by Sila Tech", 
        mentions: [sender],
        contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
      }, { quoted: fkontak });
    }

    const action = args[0]?.toLowerCase() || 'status';
    let statusText, reaction = "🤖", additionalInfo = "";

    switch (action) {
      case 'on':
        if (config.AUTO_AI === "true") {
          statusText = "📌 𝙰𝙸 𝙲𝚑𝚊𝚝𝚋𝚘𝚝 𝚒𝚜 𝚊𝚕𝚛𝚎𝚊𝚍𝚢 *𝙴𝙽𝙰𝙱𝙻𝙴𝙳*!";
          reaction = "ℹ️";
        } else {
          config.AUTO_AI = "true";
          statusText = "✅ 𝙰𝙸 𝙲𝚑𝚊𝚝𝚋𝚘𝚝 𝚑𝚊𝚜 𝚋𝚎𝚎𝚗 *𝙴𝙽𝙰𝙱𝙻𝙴𝙳*!";
          reaction = "✅";
          additionalInfo = "𝙸 𝚠𝚒𝚕𝚕 𝚗𝚘𝚠 𝚛𝚎𝚙𝚕𝚢 𝚝𝚘 𝚊𝚕𝚕 𝚙𝚛𝚒𝚟𝚊𝚝𝚎 𝚖𝚎𝚜𝚜𝚊𝚐𝚎𝚜 💬";
        }
        break;

      case 'off':
        if (config.AUTO_AI === "false") {
          statusText = "📌 𝙰𝙸 𝙲𝚑𝚊𝚝𝚋𝚘𝚝 𝚒𝚜 𝚊𝚕𝚛𝚎𝚊𝚍𝚢 *𝙳𝙸𝚂𝙰𝙱𝙻𝙴𝙳*!";
          reaction = "ℹ️";
        } else {
          config.AUTO_AI = "false";
          statusText = "❌ 𝙰𝙸 𝙲𝚑𝚊𝚝𝚋𝚘𝚝 𝚑𝚊𝚜 𝚋𝚎𝚎𝚗 *𝙳𝙸𝚂𝙰𝙱𝙻𝙴𝙳*!";
          reaction = "❌";
          additionalInfo = "𝙰𝚞𝚝𝚘-𝚛𝚎𝚙𝚕𝚒𝚎𝚜 𝚊𝚛𝚎 𝚗𝚘𝚠 𝚝𝚞𝚛𝚗𝚎𝚍 𝚘𝚏𝚏 🔇";
        }
        break;

      default:
        statusText = `📌 𝙲𝚑𝚊𝚝𝚋𝚘𝚝 𝚂𝚝𝚊𝚝𝚞𝚜: ${config.AUTO_AI === "true" ? "✅ *𝙴𝙽𝙰𝙱𝙻𝙴𝙳*" : "❌ *𝙳𝙸𝚂𝙰𝙱𝙻𝙴𝙳*"}`;
        additionalInfo = config.AUTO_AI === "true" ? "𝚁𝚎𝚊𝚍𝚢 𝚝𝚘 𝚌𝚑𝚊𝚝 🤖" : "𝚂𝚝𝚊𝚗𝚍𝚒𝚗𝚐 𝚋𝚢 💤";
        break;
    }

    await conn.sendMessage(from, {
      image: { url: "https://files.catbox.moe/98k75b.jpeg" },
      caption: `
${statusText}
${additionalInfo}

> © Powered by Sila Tech
      `,
      contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
    }, { quoted: fkontak });

    await conn.sendMessage(from, {
      react: { text: reaction, key: mek.key }
    });

  } catch (error) {
    console.error("❌ Chatbot command error:", error);
    await conn.sendMessage(from, { 
      text: `⚠️ 𝙴𝚛𝚛𝚘𝚛: ${error.message}\n\n> © Powered by Sila Tech`, 
      mentions: [sender],
      contextInfo: getContextInfo({ sender: sender }, "𝐒𝐈𝐋𝐀 𝐌𝐃", "255789661031")
    }, { quoted: fkontak });
  }
});