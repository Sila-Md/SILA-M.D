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
  pattern: "newgc",
  category: "group",
  desc: "Create a new group and add participants.",
  filename: __filename,
}, async (conn, mek, m, { from, isGroup, body, sender, groupMetadata, participants, reply }) => {
  try {
    if (!body) {
      return await conn.sendMessage(from, { 
        text: `𝚄𝚜𝚊𝚐𝚎: !newgc 𝚐𝚛𝚘𝚞𝚙_𝚗𝚊𝚖𝚎;𝚗𝚞𝚖𝚋𝚎𝚛𝟷,𝚗𝚞𝚖𝚋𝚎𝚛𝟸,...\n\n> © Powered by Sila Tech`, 
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }

    const [groupName, numbersString] = body.split(";");
    
    if (!groupName || !numbersString) {
      return await conn.sendMessage(from, { 
        text: `𝚄𝚜𝚊𝚐𝚎: !newgc 𝚐𝚛𝚘𝚞𝚙_𝚗𝚊𝚖𝚎;𝚗𝚞𝚖𝚋𝚎𝚛𝟷,𝚗𝚞𝚖𝚋𝚎𝚛𝟸,...\n\n> © Powered by Sila Tech`, 
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }

    const participantNumbers = numbersString.split(",").map(number => `${number.trim()}@s.whatsapp.net`);

    const group = await conn.groupCreate(groupName, participantNumbers);
    console.log('created group with id: ' + group.id);

    const inviteLink = await conn.groupInviteCode(group.id);

    await conn.sendMessage(group.id, { text: 'hello there' });

    await conn.sendMessage(from, { 
      text: `✅ 𝙶𝚛𝚘𝚞𝚙 𝚌𝚛𝚎𝚊𝚝𝚎𝚍 𝚜𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢 𝚠𝚒𝚝𝚑 𝚒𝚗𝚟𝚒𝚝𝚎 𝚕𝚒𝚗𝚔: https://chat.whatsapp.com/${inviteLink}\n𝚆𝚎𝚕𝚌𝚘𝚖𝚎 𝚖𝚎𝚜𝚜𝚊𝚐𝚎 𝚜𝚎𝚗𝚝.\n\n> © Powered by Sila Tech`, 
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });
    
  } catch (e) {
    return await conn.sendMessage(from, { 
      text: `❌ *𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚙𝚛𝚘𝚌𝚎𝚜𝚜𝚒𝚗𝚐 𝚢𝚘𝚞𝚛 𝚛𝚎𝚚𝚞𝚎𝚜𝚝.*\n\n𝙴𝚛𝚛𝚘𝚛: ${e.message}\n\n> © Powered by Sila Tech`, 
      contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });
  }
});