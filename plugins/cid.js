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
  pattern: "cid",
  alias: ["newsletter", "id", "channelid"],
  react: "⏳",
  desc: "Get WhatsApp Channel info from link",
  category: "whatsapp",
  filename: __filename
}, async (conn, mek, m, {
  from,
  args,
  q,
  reply,
  sender
}) => {
  try {
    if (!q) {
      return await conn.sendMessage(from, { 
        text: "❎ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝚆𝚑𝚊𝚝𝚜𝙰𝚙𝚙 𝙲𝚑𝚊𝚗𝚗𝚎𝚕 𝚕𝚒𝚗𝚔.\n\n*𝙴𝚡𝚊𝚖𝚙𝚕𝚎:* .cid https://whatsapp.com/channel/123456789\n\n> © Powered by Sila Tech", 
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }

    const match = q.match(/whatsapp\.com\/channel\/([\w-]+)/);
    if (!match) {
      return await conn.sendMessage(from, { 
        text: "⚠️ *𝙸𝚗𝚟𝚊𝚕𝚒𝚍 𝚌𝚑𝚊𝚗𝚗𝚎𝚕 𝚕𝚒𝚗𝚔 𝚏𝚘𝚛𝚖𝚊𝚝.*\n\n𝙼𝚊𝚔𝚎 𝚜𝚞𝚛𝚎 𝚒𝚝 𝚕𝚘𝚘𝚔𝚜 𝚕𝚒𝚔𝚎:\nhttps://whatsapp.com/channel/xxxxxxxxx\n\n> © Powered by Sila Tech", 
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }

    const inviteId = match[1];

    let metadata;
    try {
      metadata = await conn.newsletterMetadata("invite", inviteId);
    } catch (e) {
      return await conn.sendMessage(from, { 
        text: "❌ 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚏𝚎𝚝𝚌𝚑 𝚌𝚑𝚊𝚗𝚗𝚎𝚕 𝚖𝚎𝚝𝚊𝚍𝚊𝚝𝚊. 𝙼𝚊𝚔𝚎 𝚜𝚞𝚛𝚎 𝚝𝚑𝚎 𝚕𝚒𝚗𝚔 𝚒𝚜 𝚌𝚘𝚛𝚛𝚎𝚌𝚝.\n\n> © Powered by Sila Tech", 
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }

    if (!metadata || !metadata.id) {
      return await conn.sendMessage(from, { 
        text: "❌ 𝙲𝚑𝚊𝚗𝚗𝚎𝚕 𝚗𝚘𝚝 𝚏𝚘𝚞𝚗𝚍 𝚘𝚛 𝚒𝚗𝚊𝚌𝚌𝚎𝚜𝚜𝚒𝚋𝚕𝚎.\n\n> © Powered by Sila Tech", 
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }

    const infoText = `╭━━〔 📡 *𝙲𝙷𝙰𝙽𝙽𝙴𝙻 𝙸𝙽𝙵𝙾* 〕━━┈⊷
┃
┃ 🛠️ *𝙸𝙳:* ${metadata.id}
┃ 📌 *𝙽𝚊𝚖𝚎:* ${metadata.name}
┃ 👥 *𝙵𝚘𝚕𝚕𝚘𝚠𝚎𝚛𝚜:* ${metadata.subscribers?.toLocaleString() || "𝙽/𝙰"}
┃ 📅 *𝙲𝚛𝚎𝚊𝚝𝚎𝚍:* ${metadata.creation_time ? new Date(metadata.creation_time * 1000).toLocaleString() : "𝚄𝚗𝚔𝚗𝚘𝚠𝚗"}
┃
╰━━━━━━━━━━━━━━━━━━┈⊷
> © Powered by Sila Tech`;

    if (metadata.preview) {
      await conn.sendMessage(from, {
        image: { url: `https://pps.whatsapp.net${metadata.preview}` },
        caption: infoText,
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    } else {
      await conn.sendMessage(from, { 
        text: infoText,
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }

  } catch (error) {
    console.error("❌ Error in .cid plugin:", error);
    await conn.sendMessage(from, { 
      text: "⚠️ 𝙰𝚗 𝚞𝚗𝚎𝚡𝚙𝚎𝚌𝚝𝚎𝚍 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚛𝚎𝚍.\n\n> © Powered by Sila Tech", 
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });
  }
});