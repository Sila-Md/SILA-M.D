const { cmd } = require('../command');
const axios = require('axios');

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
  pattern: "ytstalk",
  alias: ["ytinfo"],
  desc: "Get details about a YouTube channel.",
  react: "🔍",
  category: "search",
  filename: __filename
}, async (conn, m, store, { from, quoted, q, reply, sender }) => {
  try {
    if (!q) {
      return await conn.sendMessage(from, { 
        text: "❌ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝚟𝚊𝚕𝚒𝚍 𝚈𝚘𝚞𝚃𝚞𝚋𝚎 𝚌𝚑𝚊𝚗𝚗𝚎𝚕 𝚞𝚜𝚎𝚛𝚗𝚊𝚖𝚎 𝚘𝚛 𝙸𝙳.\n\n> © Powered by Sila Tech", 
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }

    await conn.sendMessage(from, {
      react: { text: "⏳", key: m.key }
    });

    const apiUrl = `https://delirius-apiofc.vercel.app/tools/ytstalk?channel=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);

    if (!data || !data.status || !data.data) {
      return await conn.sendMessage(from, { 
        text: "⚠️ 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚏𝚎𝚝𝚌𝚑 𝚈𝚘𝚞𝚃𝚞𝚋𝚎 𝚌𝚑𝚊𝚗𝚗𝚎𝚕 𝚍𝚎𝚝𝚊𝚒𝚕𝚜. 𝙴𝚗𝚜𝚞𝚛𝚎 𝚝𝚑𝚎 𝚞𝚜𝚎𝚛𝚗𝚊𝚖𝚎 𝚘𝚛 𝙸𝙳 𝚒𝚜 𝚌𝚘𝚛𝚛𝚎𝚌𝚝.\n\n> © Powered by Sila Tech", 
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }

    const yt = data.data;
    const caption = `╭━━〔 *𝚈𝙾𝚄𝚃𝚄𝙱𝙴 𝚂𝚃𝙰𝙻𝙺𝙴𝚁* 〕━━┈⊷
┃
┃ 👤 *𝚄𝚜𝚎𝚛𝚗𝚊𝚖𝚎:* ${yt.username}
┃ 📊 *𝚂𝚞𝚋𝚜𝚌𝚛𝚒𝚋𝚎𝚛𝚜:* ${yt.subscriber_count}
┃ 🎥 *𝚅𝚒𝚍𝚎𝚘𝚜:* ${yt.video_count}
┃ 🔗 *𝙲𝚑𝚊𝚗𝚗𝚎𝚕:* ${yt.channel}
┃
╰━━━━━━━━━━━━━━━━━━┈⊷
> © Powered by Sila Tech`;

    await conn.sendMessage(from, {
      image: { url: yt.avatar },
      caption: caption,
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });

  } catch (error) {
    console.error("Error:", error);
    await conn.sendMessage(from, { 
      text: "❌ 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚙𝚛𝚘𝚌𝚎𝚜𝚜𝚒𝚗𝚐 𝚢𝚘𝚞𝚛 𝚛𝚎𝚚𝚞𝚎𝚜𝚝. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚝𝚛𝚢 𝚊𝚐𝚊𝚒𝚗.\n\n> © Powered by Sila Tech", 
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });
  }
});