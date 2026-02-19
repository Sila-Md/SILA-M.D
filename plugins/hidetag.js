const { cmd } = require('../command');

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

// Fixed & Created By Sila MD
cmd({
  pattern: "hidetag",
  alias: ["tag", "h"],  
  react: "🔊",
  desc: "To Tag all Members for Any Message/Media",
  category: "group",
  use: '.hidetag Hello',
  filename: __filename
},
async (conn, mek, m, {
  from, q, isGroup, isCreator, isAdmins,
  participants, sender
}) => {
  try {
    const isUrl = (url) => {
      return /https?:\/\/(www\.)?[\w\-@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([\w\-@:%_\+.~#?&//=]*)/.test(url);
    };

    if (!isGroup) {
      return await conn.sendMessage(from, { 
        text: "❌ 𝚃𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚌𝚊𝚗 𝚘𝚗𝚕𝚢 𝚋𝚎 𝚞𝚜𝚎𝚍 𝚒𝚗 𝚐𝚛𝚘𝚞𝚙𝚜.\n\n> © Powered by Sila Tech", 
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }
    
    if (!isAdmins && !isCreator) {
      return await conn.sendMessage(from, { 
        text: "❌ 𝙾𝚗𝚕𝚢 𝚐𝚛𝚘𝚞𝚙 𝚊𝚍𝚖𝚒𝚗𝚜 𝚌𝚊𝚗 𝚞𝚜𝚎 𝚝𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍.\n\n> © Powered by Sila Tech", 
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }

    const mentionAll = { mentions: participants.map(u => u.id) };

    if (!q && !m.quoted) {
      return await conn.sendMessage(from, { 
        text: "❌ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝚖𝚎𝚜𝚜𝚊𝚐𝚎 𝚘𝚛 𝚛𝚎𝚙𝚕𝚢 𝚝𝚘 𝚊 𝚖𝚎𝚜𝚜𝚊𝚐𝚎 𝚝𝚘 𝚝𝚊𝚐 𝚊𝚕𝚕 𝚖𝚎𝚖𝚋𝚎𝚛𝚜.\n\n> © Powered by Sila Tech", 
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }

    if (m.quoted) {
      const type = m.quoted.mtype || '';
      
      if (type === 'extendedTextMessage') {
        return await conn.sendMessage(from, {
          text: m.quoted.text || '𝙽𝚘 𝚖𝚎𝚜𝚜𝚊𝚐𝚎 𝚌𝚘𝚗𝚝𝚎𝚗𝚝 𝚏𝚘𝚞𝚗𝚍.',
          ...mentionAll,
          contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
      }

      if (['imageMessage', 'videoMessage', 'audioMessage', 'stickerMessage', 'documentMessage'].includes(type)) {
        try {
          const buffer = await m.quoted.download?.();
          if (!buffer) {
            return await conn.sendMessage(from, { 
              text: "❌ 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚍𝚘𝚠𝚗𝚕𝚘𝚊𝚍 𝚝𝚑𝚎 𝚚𝚞𝚘𝚝𝚎𝚍 𝚖𝚎𝚍𝚒𝚊.\n\n> © Powered by Sila Tech", 
              contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
          }

          let content;
          switch (type) {
            case "imageMessage":
              content = { 
                image: buffer, 
                caption: m.quoted.text || "📷 𝙸𝚖𝚊𝚐𝚎", 
                ...mentionAll,
                contextInfo: getContextInfo({ sender: sender })
              };
              break;
            case "videoMessage":
              content = { 
                video: buffer, 
                caption: m.quoted.text || "🎥 𝚅𝚒𝚍𝚎𝚘", 
                gifPlayback: m.quoted.message?.videoMessage?.gifPlayback || false, 
                ...mentionAll,
                contextInfo: getContextInfo({ sender: sender })
              };
              break;
            case "audioMessage":
              content = { 
                audio: buffer, 
                mimetype: "audio/mp4", 
                ptt: m.quoted.message?.audioMessage?.ptt || false, 
                ...mentionAll,
                contextInfo: getContextInfo({ sender: sender })
              };
              break;
            case "stickerMessage":
              content = { 
                sticker: buffer, 
                ...mentionAll,
                contextInfo: getContextInfo({ sender: sender })
              };
              break;
            case "documentMessage":
              content = {
                document: buffer,
                mimetype: m.quoted.message?.documentMessage?.mimetype || "application/octet-stream",
                fileName: m.quoted.message?.documentMessage?.fileName || "file",
                caption: m.quoted.text || "",
                ...mentionAll,
                contextInfo: getContextInfo({ sender: sender })
              };
              break;
          }

          if (content) {
            return await conn.sendMessage(from, content, { quoted: fkontak });
          }
        } catch (e) {
          console.error("Media download/send error:", e);
          return await conn.sendMessage(from, { 
            text: "❌ 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚙𝚛𝚘𝚌𝚎𝚜𝚜 𝚝𝚑𝚎 𝚖𝚎𝚍𝚒𝚊. 𝚂𝚎𝚗𝚍𝚒𝚗𝚐 𝚊𝚜 𝚝𝚎𝚡𝚝 𝚒𝚗𝚜𝚝𝚎𝚊𝚍.\n\n> © Powered by Sila Tech", 
            contextInfo: getContextInfo({ sender: sender })
          }, { quoted: fkontak });
        }
      }

      return await conn.sendMessage(from, {
        text: m.quoted.text || "📨 𝙼𝚎𝚜𝚜𝚊𝚐𝚎",
        ...mentionAll,
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }

    if (q) {
      if (isUrl(q)) {
        return await conn.sendMessage(from, {
          text: q,
          ...mentionAll,
          contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
      }

      await conn.sendMessage(from, {
        text: q,
        ...mentionAll,
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }

  } catch (e) {
    console.error(e);
    await conn.sendMessage(from, { 
      text: `❌ *𝙴𝚛𝚛𝚘𝚛 𝙾𝚌𝚌𝚞𝚛𝚛𝚎𝚍 !!*\n\n${e.message}\n\n> © Powered by Sila Tech`, 
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });
  }
});