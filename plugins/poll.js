const { cmd, commands } = require('../command');
const config = require('../config');
const prefix = config.PREFIX;
const fs = require('fs');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('../lib/functions2');
const { writeFileSync } = require('fs');
const path = require('path');

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
  pattern: "poll",
  category: "group",
  desc: "Create a poll with a question and options in the group.",
  filename: __filename,
}, async (conn, mek, m, { from, isGroup, body, sender, groupMetadata, participants, prefix, pushname, reply }) => {
  try {
    let [question, optionsString] = body.split(";");
    
    if (!question || !optionsString) {
      return await conn.sendMessage(from, { 
        text: `𝚄𝚜𝚊𝚐𝚎: ${prefix}poll 𝚚𝚞𝚎𝚜𝚝𝚒𝚘𝚗;𝚘𝚙𝚝𝚒𝚘𝚗𝟷,𝚘𝚙𝚝𝚒𝚘𝚗𝟸,𝚘𝚙𝚝𝚒𝚘𝚗𝟹...\n\n> © Powered by Sila Tech`, 
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }

    let options = [];
    for (let option of optionsString.split(",")) {
      if (option && option.trim() !== "") {
        options.push(option.trim());
      }
    }

    if (options.length < 2) {
      return await conn.sendMessage(from, { 
        text: "*𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊𝚝 𝚕𝚎𝚊𝚜𝚝 𝚝𝚠𝚘 𝚘𝚙𝚝𝚒𝚘𝚗𝚜 𝚏𝚘𝚛 𝚝𝚑𝚎 𝚙𝚘𝚕𝚕.*\n\n> © Powered by Sila Tech", 
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }

    await conn.sendMessage(from, {
      poll: {
        name: question,
        values: options,
        selectableCount: 1,
        toAnnouncementGroup: true,
      }
    }, { quoted: mek });
    
  } catch (e) {
    return await conn.sendMessage(from, { 
      text: `❌ *𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚙𝚛𝚘𝚌𝚎𝚜𝚜𝚒𝚗𝚐 𝚢𝚘𝚞𝚛 𝚛𝚎𝚚𝚞𝚎𝚜𝚝.*\n\n𝙴𝚛𝚛𝚘𝚛: ${e.message}\n\n> © Powered by Sila Tech`, 
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });
  }
});