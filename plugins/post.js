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
  pattern: "post",
  alias: ["status", "story"],
  desc: "Post media to WhatsApp status",
  category: "utility",
  filename: __filename
}, async (conn, mek, m, { from, isCreator, sender, quoted }) => {
  try {
    const ownerName = "𝐒𝐈𝐋𝐀 𝐌𝐃";
    const formattedOwnerNumber = "255789661031";
    
    if (!isCreator) {
      return await conn.sendMessage(from, { 
        text: "*📛 𝙾𝚠𝚗𝚎𝚛 𝚘𝚗𝚕𝚢 𝚌𝚘𝚖𝚖𝚊𝚗𝚍*\n\n> © Powered by Sila Tech", 
        contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
      }, { quoted: fkontak });
    }

    const quotedMsg = m.quoted || m;
    
    // 1. Handle Text Status
    if (quotedMsg.text && !quotedMsg.hasMedia) {
      try {
        await conn.setStatus(quotedMsg.text);
        return await conn.sendMessage(from, { 
          text: "✅ 𝚃𝚎𝚡𝚝 𝚜𝚝𝚊𝚝𝚞𝚜 𝚞𝚙𝚍𝚊𝚝𝚎𝚍\n\n> © Powered by Sila Tech", 
          contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
        }, { quoted: fkontak });
      } catch (e) {
        return await conn.sendMessage(from, { 
          text: "❌ 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚞𝚙𝚍𝚊𝚝𝚎 𝚝𝚎𝚡𝚝 𝚜𝚝𝚊𝚝𝚞𝚜\n\n> © Powered by Sila Tech", 
          contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
        }, { quoted: fkontak });
      }
    }

    // 2. Handle Media Status
    if (quotedMsg.hasMedia) {
      try {
        const media = await quotedMsg.download();
        const caption = quotedMsg.caption || "";

        // For WhatsApp Business API
        await conn.sendMessage("status@broadcast", { 
          [quotedMsg.type.replace("Message", "")]: media,
          caption: caption
        });

        // Alternative method
        await conn.setProfilePicture(media); // For profile picture as fallback
        
        return await conn.sendMessage(from, { 
          text: "✅ 𝙼𝚎𝚍𝚒𝚊 𝚙𝚘𝚜𝚝𝚎𝚍 𝚝𝚘 𝚜𝚝𝚊𝚝𝚞𝚜\n\n> © Powered by Sila Tech", 
          contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
        }, { quoted: fkontak });
      } catch (error) {
        return await conn.sendMessage(from, { 
          text: `❌ 𝙴𝚛𝚛𝚘𝚛: ${error.message}\n\n> © Powered by Sila Tech`, 
          contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
        }, { quoted: fkontak });
      }
    }

    return await conn.sendMessage(from, { 
      text: "⚠ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚛𝚎𝚙𝚕𝚢 𝚝𝚘 𝚖𝚎𝚍𝚒𝚊 𝚘𝚛 𝚝𝚎𝚡𝚝\n\n> © Powered by Sila Tech", 
      contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
    }, { quoted: fkontak });
    
  } catch (error) {
    console.error("Post command error:", error);
    await conn.sendMessage(from, { 
      text: `❌ 𝙴𝚛𝚛𝚘𝚛: ${error.message}\n\n> © Powered by Sila Tech`, 
      contextInfo: getContextInfo({ sender: sender }, "𝐒𝐈𝐋𝐀 𝐌𝐃", "255789661031")
    }, { quoted: fkontak });
  }
});