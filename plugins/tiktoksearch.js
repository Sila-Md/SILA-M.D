const fetch = require("node-fetch");
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
  pattern: "tiktoksearch",
  alias: ["tiktoks", "tiks"],
  desc: "Search for TikTok videos using a query.",
  react: '✅',
  category: 'tools',
  filename: __filename
}, async (conn, m, store, {
  from,
  args,
  reply,
  sender
}) => {
  try {
    if (!args[0]) {
      return await conn.sendMessage(from, { 
        text: "🌸 𝚆𝚑𝚊𝚝 𝚍𝚘 𝚢𝚘𝚞 𝚠𝚊𝚗𝚝 𝚝𝚘 𝚜𝚎𝚊𝚛𝚌𝚑 𝚘𝚗 𝚃𝚒𝚔𝚃𝚘𝚔?\n\n*𝚄𝚜𝚊𝚐𝚎 𝙴𝚡𝚊𝚖𝚙𝚕𝚎:*\n.tiktoksearch <𝚚𝚞𝚎𝚛𝚢>\n\n> © Powered by Sila Tech", 
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }

    const query = args.join(" ");
    
    await conn.sendMessage(from, { 
      text: `🔎 𝚂𝚎𝚊𝚛𝚌𝚑𝚒𝚗𝚐 𝚃𝚒𝚔𝚃𝚘𝚔 𝚏𝚘𝚛: *${query}*`,
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });
    
    const response = await fetch(`https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (!data || !data.data || data.data.length === 0) {
      return await conn.sendMessage(from, { 
        text: "❌ 𝙽𝚘 𝚛𝚎𝚜𝚞𝚕𝚝𝚜 𝚏𝚘𝚞𝚗𝚍 𝚏𝚘𝚛 𝚢𝚘𝚞𝚛 𝚚𝚞𝚎𝚛𝚢. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚝𝚛𝚢 𝚠𝚒𝚝𝚑 𝚊 𝚍𝚒𝚏𝚏𝚎𝚛𝚎𝚗𝚝 𝚔𝚎𝚢𝚠𝚘𝚛𝚍.\n\n> © Powered by Sila Tech", 
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }

    // Get up to 7 random results
    const results = data.data.slice(0, 7).sort(() => Math.random() - 0.5);

    for (const video of results) {
      const message = `╭━━〔 🎵 *𝚃𝙸𝙺𝚃𝙾𝙺 𝚁𝙴𝚂𝚄𝙻𝚃* 〕━━┈⊷
┃
┃ *• 𝚃𝚒𝚝𝚕𝚎*: ${video.title}
┃ *• 𝙰𝚞𝚝𝚑𝚘𝚛*: ${video.author || 'Unknown'}
┃ *• 𝙳𝚞𝚛𝚊𝚝𝚒𝚘𝚗*: ${video.duration || "Unknown"}
┃ *• 𝚄𝚁𝙻*: ${video.link}
┃
╰━━━━━━━━━━━━━━━━━━┈⊷
> © Powered by Sila Tech`;

      if (video.nowm) {
        await conn.sendMessage(from, {
          video: { url: video.nowm },
          caption: message,
          contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
      } else {
        await conn.sendMessage(from, { 
          text: `❌ 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚛𝚎𝚝𝚛𝚒𝚎𝚟𝚎 𝚟𝚒𝚍𝚎𝚘 𝚏𝚘𝚛 *"${video.title}"*.\n\n> © Powered by Sila Tech`, 
          contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
      }
    }

  } catch (error) {
    console.error("Error in TikTokSearch command:", error);
    await conn.sendMessage(from, { 
      text: "❌ 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚜𝚎𝚊𝚛𝚌𝚑𝚒𝚗𝚐 𝚃𝚒𝚔𝚃𝚘𝚔. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚝𝚛𝚢 𝚊𝚐𝚊𝚒𝚗 𝚕𝚊𝚝𝚎𝚛.\n\n> © Powered by Sila Tech", 
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });
  }
});