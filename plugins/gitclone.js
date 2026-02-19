const { cmd } = require("../command");
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
  pattern: 'gitclone',
  alias: ["git"],
  desc: "Download GitHub repository as a zip file.",
  react: '📦',
  category: "downloader",
  filename: __filename
}, async (conn, m, store, {
  from,
  quoted,
  args,
  reply,
  sender
}) => {
  if (!args[0]) {
    return await conn.sendMessage(from, { 
      text: "❌ 𝚆𝚑𝚎𝚛𝚎 𝚒𝚜 𝚝𝚑𝚎 𝙶𝚒𝚝𝙷𝚞𝚋 𝚕𝚒𝚗𝚔?\n\n𝙴𝚡𝚊𝚖𝚙𝚕𝚎:\n.gitclone https://github.com/username/repository\n\n> © Powered by Sila Tech", 
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });
  }

  if (!/^(https:\/\/)?github\.com\/.+/.test(args[0])) {
    return await conn.sendMessage(from, { 
      text: "⚠️ 𝙸𝚗𝚟𝚊𝚕𝚒𝚍 𝙶𝚒𝚝𝙷𝚞𝚋 𝚕𝚒𝚗𝚔. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝚟𝚊𝚕𝚒𝚍 𝙶𝚒𝚝𝙷𝚞𝚋 𝚛𝚎𝚙𝚘𝚜𝚒𝚝𝚘𝚛𝚢 𝚄𝚁𝙻.\n\n> © Powered by Sila Tech", 
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });
  }

  try {
    const regex = /github\.com\/([^\/]+)\/([^\/]+)(?:\.git)?/i;
    const match = args[0].match(regex);

    if (!match) {
      throw new Error("Invalid GitHub URL.");
    }

    const [, username, repo] = match;
    const zipUrl = `https://api.github.com/repos/${username}/${repo}/zipball`;

    // Check if repository exists
    const response = await fetch(zipUrl, { method: "HEAD" });
    if (!response.ok) {
      throw new Error("Repository not found.");
    }

    const contentDisposition = response.headers.get("content-disposition");
    const fileName = contentDisposition ? contentDisposition.match(/filename=(.*)/)[1] : `${repo}.zip`;

    // Notify user of the download
    await conn.sendMessage(from, { 
      text: `📥 *𝙳𝚘𝚠𝚗𝚕𝚘𝚊𝚍𝚒𝚗𝚐 𝚛𝚎𝚙𝚘𝚜𝚒𝚝𝚘𝚛𝚢...*\n\n*𝚁𝚎𝚙𝚘:* ${username}/${repo}\n*𝙵𝚒𝚕𝚎:* ${fileName}\n\n> © Powered by Sila Tech`, 
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });

    // Send the zip file to the user
    await conn.sendMessage(from, {
      document: { url: zipUrl },
      fileName: fileName,
      mimetype: 'application/zip',
      caption: `📦 *${repo}*\n\n> © Powered by Sila Tech`,
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });
 
  } catch (error) {
    console.error("Error:", error);
    await conn.sendMessage(from, { 
      text: "❌ 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚍𝚘𝚠𝚗𝚕𝚘𝚊𝚍 𝚝𝚑𝚎 𝚛𝚎𝚙𝚘𝚜𝚒𝚝𝚘𝚛𝚢. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚝𝚛𝚢 𝚊𝚐𝚊𝚒𝚗 𝚕𝚊𝚝𝚎𝚛.\n\n> © Powered by Sila Tech", 
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });
  }
});