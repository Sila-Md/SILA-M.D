const config = require('../config');
const { cmd } = require('../command');
const fetch = require('node-fetch');

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

// Store user selections temporarily
const movieSelections = {};

cmd({
  pattern: "movieinfo",
  desc: "Search and download movies with selection",
  category: "media",
  react: "🎞️",
  filename: __filename
},
async (conn, mek, m, { from, args, sender, reply }) => {
  try {
    const query = args.join(" ");
    if (!query) {
      return await conn.sendMessage(from, { 
        text: "❗ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝚖𝚘𝚟𝚒𝚎 𝚗𝚊𝚖𝚎.\n𝙴𝚡𝚊𝚖𝚙𝚕𝚎: `.movieinfo avatar`\n\n> © Powered by Sila Tech", 
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }

    // Send loading message
    const searching = await conn.sendMessage(from, { 
      text: `🔍 *𝚂𝚎𝚊𝚛𝚌𝚑𝚒𝚗𝚐 𝚏𝚘𝚛:* _${query}_ ...`,
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });

    // Search movie from API
    const res = await fetch(`https://movieapi.giftedtech.co.ke/api/search/${encodeURIComponent(query)}`);
    const json = await res.json();

    if (!json.results || !json.results.items || json.results.items.length === 0) {
      return await conn.sendMessage(from, { 
        text: `❌ 𝙽𝚘 𝚖𝚘𝚟𝚒𝚎𝚜 𝚏𝚘𝚞𝚗𝚍 𝚏𝚘𝚛 *${query}*\n\n> © Powered by Sila Tech`, 
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }

    // Take the first 5 results
    const results = json.results.items.slice(0, 5);

    let textMsg = `╭━━〔 🎬 *𝙼𝙾𝚅𝙸𝙴 𝙵𝙸𝙽𝙳𝙴𝚁* 〕━━┈⊷
┃
┃ *𝚁𝚎𝚜𝚞𝚕𝚝𝚜 𝚏𝚘𝚛:* _${query}_
┃
┃ 𝚁𝚎𝚙𝚕𝚢 𝚠𝚒𝚝𝚑 𝚊 𝚗𝚞𝚖𝚋𝚎𝚛 *(1-5)* 𝚝𝚘 𝚌𝚑𝚘𝚘𝚜𝚎 𝚊 𝚖𝚘𝚟𝚒𝚎.
┃
`;

    results.forEach((v, i) => {
      textMsg += `┃ *${i + 1}. ${v.title}* (${v.year})\n`;
    });

    textMsg += `┃
╰━━━━━━━━━━━━━━━━━━┈⊷
> © Powered by Sila Tech`;

    // Save results for user
    movieSelections[sender] = results;

    await conn.sendMessage(from, {
      text: textMsg,
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });

  } catch (e) {
    console.log(e);
    await conn.sendMessage(from, { 
      text: `❌ 𝙴𝚛𝚛𝚘𝚛: ${e.message}\n\n> © Powered by Sila Tech`, 
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });
  }
});


// LISTENER FOR USER NUMBER REPLY (1–5)
cmd({
  on: "text",
},
async (conn, mek, m, { from, body, sender, reply }) => {
  try {
    if (!movieSelections[sender]) return;

    const msg = body.trim();
    const choice = parseInt(msg);

    if (isNaN(choice) || choice < 1 || choice > 5) return;

    const selectedMovie = movieSelections[sender][choice - 1];
    delete movieSelections[sender];

    const movieId = selectedMovie.subjectId;

    // Fetch movie info
    const info = await fetch(`https://movieapi.giftedtech.co.ke/api/info/${movieId}`);
    const infoJson = await info.json();
    const subject = infoJson.results.subject;

    // Fetch streaming sources
    const src = await fetch(`https://movieapi.giftedtech.co.ke/api/sources/${movieId}`);
    const srcJson = await src.json();
    const sources = srcJson.results;

    if (!sources || sources.length === 0) {
      return await conn.sendMessage(from, { 
        text: `❌ 𝙽𝚘 𝚍𝚘𝚠𝚗𝚕𝚘𝚊𝚍 𝚊𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎 𝚏𝚘𝚛 *${subject.title}*\n\n> © Powered by Sila Tech`, 
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }

    // Pick best quality
    const best = sources.sort((a, b) => parseInt(b.quality) - parseInt(a.quality))[0];

    // Send poster & description
    await conn.sendMessage(from, {
      image: { url: subject.cover },
      caption:
        `╭━━〔 🎬 *𝙼𝙾𝚅𝙸𝙴 𝙸𝙽𝙵𝙾* 〕━━┈⊷
┃
┃ *${subject.title}*
┃
┃ 📆 𝚁𝚎𝚕𝚎𝚊𝚜𝚎𝚍: ${subject.releaseDate}
┃ ⭐ 𝚁𝚊𝚝𝚒𝚗𝚐: ${subject.rating}
┃ ⏳ 𝙳𝚞𝚛𝚊𝚝𝚒𝚘𝚗: ${Math.floor(subject.duration / 60)} 𝚖𝚒𝚗
┃
┃ 📝 𝙳𝚎𝚜𝚌𝚛𝚒𝚙𝚝𝚒𝚘𝚗:
┃ ${subject.description}
┃
┃ 📺 𝚂𝚎𝚕𝚎𝚌𝚝𝚎𝚍 𝚀𝚞𝚊𝚕𝚒𝚝𝚢: ${best.quality}
┃
┃ 𝙿𝚛𝚎𝚙𝚊𝚛𝚒𝚗𝚐 𝚢𝚘𝚞𝚛 𝚍𝚘𝚠𝚗𝚕𝚘𝚊𝚍... ⬇️
┃
╰━━━━━━━━━━━━━━━━━━┈⊷
> © Powered by Sila Tech`,
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });

    // SEND AS DOCUMENT (not video)
    await conn.sendMessage(from, {
      document: { url: best.download_url },
      mimetype: "application/octet-stream",
      fileName: `${subject.title}-${best.quality}.mp4`,
      caption: `🎞️ *${subject.title}* • ${best.quality}\n\n> © Powered by Sila Tech`,
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });

  } catch (e) {
    console.log(e);
    await conn.sendMessage(from, { 
      text: `❌ 𝙴𝚛𝚛𝚘𝚛: ${e.message}\n\n> © Powered by Sila Tech`, 
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });
  }
});