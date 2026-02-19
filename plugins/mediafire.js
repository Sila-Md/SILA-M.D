const axios = require("axios");
const { cmd } = require("../command");
const config = require('../config');

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
  pattern: "mediafire",
  alias: ["mfire", "mfdownload"],
  react: '📥',
  desc: "Download files from MediaFire",
  category: "download",
  filename: __filename
}, async (conn, mek, m, { from, args, sender }) => {
  try {
    const url = args[0];
    if (!url?.includes("mediafire.com")) {
      return await conn.sendMessage(from, { text: "❌ 𝙴𝚡𝚊𝚖𝚙𝚕𝚎: .mediafire https://www.mediafire.com/file/...", contextInfo: getContextInfo({ sender: sender }) }, { quoted: fkontak });
    }

    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    const apiUrl = `https://apis.davidcyriltech.my.id/mediafire?url=${encodeURIComponent(url)}`;
    const { data } = await axios.get(apiUrl);

    if (!data?.downloadLink) {
      return await conn.sendMessage(from, { text: "❌ 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚏𝚎𝚝𝚌𝚑 𝚏𝚒𝚕𝚎.", contextInfo: getContextInfo({ sender: sender }) }, { quoted: fkontak });
    }

    await conn.sendMessage(from, { text: `📥 𝙳𝚘𝚠𝚗𝚕𝚘𝚊𝚍𝚒𝚗𝚐 (${data.size})...`, contextInfo: getContextInfo({ sender: sender }) }, { quoted: fkontak });

    const fileResponse = await axios.get(data.downloadLink, { responseType: 'arraybuffer' });
    const fileBuffer = Buffer.from(fileResponse.data);

    await conn.sendMessage(from, {
      document: fileBuffer,
      fileName: data.fileName,
      mimetype: data.mimeType,
      caption: `📄 *${data.fileName}*\n⚖️ ${data.size}\n\n> © Powered by Sila Tech`,
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });

    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

  } catch (error) {
    console.error("MediaFire Error:", error);
    await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
    await conn.sendMessage(from, { text: "❌ 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚍𝚘𝚠𝚗𝚕𝚘𝚊𝚍.", contextInfo: getContextInfo({ sender: sender }) }, { quoted: fkontak });
  }
});