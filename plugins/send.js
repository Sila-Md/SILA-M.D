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
  pattern: "send",
  alias: ["sendme", "save"],
  react: "📤",
  desc: "Forwards quoted message back to your DM or current chat",
  category: "utility",
  filename: __filename
}, async (conn, mek, m, { from, sender, quoted }) => {
  try {
    // 1. Check if a message is quoted
    if (!mek.quoted) {
      return await conn.sendMessage(from, {
        text: "*🍁 𝙿𝚕𝚎𝚊𝚜𝚎 𝚛𝚎𝚙𝚕𝚢 𝚝𝚘 𝚊 𝚖𝚎𝚜𝚜𝚊𝚐𝚎 (𝚒𝚖𝚊𝚐𝚎, 𝚟𝚒𝚍𝚎𝚘, 𝚊𝚞𝚍𝚒𝚘, 𝚘𝚛 𝚍𝚘𝚌)!*\n\n> © Powered by Sila Tech",
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }

    // 2. Download the media
    const buffer = await mek.quoted.download();
    const mtype = mek.quoted.mtype;
    const caption = mek.quoted.text || "";
    
    // Determine where to send: 'sender' sends to user's DM
    const target = sender; 

    let messageContent = {};

    // 3. Handle different message types
    switch (mtype) {
      case "imageMessage":
        messageContent = { image: buffer, caption };
        break;
      case "videoMessage":
        messageContent = { video: buffer, caption };
        break;
      case "audioMessage":
        messageContent = { 
            audio: buffer, 
            mimetype: mek.quoted.mimetype || "audio/mp4", 
            ptt: mek.quoted.ptt || false 
        };
        break;
      case "stickerMessage":
        messageContent = { sticker: buffer };
        break;
      case "documentMessage":
        messageContent = { 
            document: buffer, 
            mimetype: mek.quoted.mimetype, 
            fileName: mek.quoted.fileName || 'file' 
        };
        break;
      case "conversation":
      case "extendedTextMessage":
        messageContent = { text: mek.quoted.text };
        break;
      default:
        return await conn.sendMessage(from, {
          text: "❌ 𝚃𝚑𝚒𝚜 𝚖𝚎𝚜𝚜𝚊𝚐𝚎 𝚝𝚢𝚙𝚎 𝚒𝚜 𝚗𝚘𝚝 𝚜𝚞𝚙𝚙𝚘𝚛𝚝𝚎𝚍 𝚢𝚎𝚝.\n\n> © Powered by Sila Tech",
          contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }

    // 4. Send the message to DM
    await conn.sendMessage(target, {
      ...messageContent,
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });
    
    // 5. Confirm to the group that it was sent to DM
    if (target === sender && from !== sender) {
        await conn.sendMessage(from, { 
          text: "𝚂𝚎𝚗𝚝 𝚝𝚘 𝚢𝚘𝚞𝚛 𝙸𝚗𝚋𝚘𝚡! ✅\n\n> © Powered by Sila Tech",
          contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }

  } catch (error) {
    console.error("Forward Error:", error);
    await conn.sendMessage(from, {
      text: "❌ 𝙴𝚛𝚛𝚘𝚛 𝚏𝚘𝚛𝚠𝚊𝚛𝚍𝚒𝚗𝚐 𝚖𝚎𝚜𝚜𝚊𝚐𝚎:\n" + error.message + "\n\n> © Powered by Sila Tech",
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });
  }
});