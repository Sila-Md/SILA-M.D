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

cmd(
  {
    pattern: "add",
    alias: ["invite", "addmember", "a", "summon"],
    desc: "Adds a person to group",
    category: "group",
    filename: __filename,
  },
  async (conn, mek, m, { from, quoted, args, reply, isGroup, isBotAdmins, isCreator, sender }) => {
    try {
      if (!isCreator) {
        return await conn.sendMessage(from, { 
          text: "🚫 *𝚃𝚑𝚒𝚜 𝚒𝚜 𝚊𝚗 𝚘𝚠𝚗𝚎𝚛 𝚌𝚘𝚖𝚖𝚊𝚗𝚍.*\n\n> © Powered by Sila Tech", 
          contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
      }

      if (!isGroup) {
        return await conn.sendMessage(from, { 
          text: "❌ 𝚃𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚒𝚜 𝚏𝚘𝚛 𝚐𝚛𝚘𝚞𝚙𝚜 𝚘𝚗𝚕𝚢.\n\n> © Powered by Sila Tech", 
          contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
      }
      
      if (!isBotAdmins) {
        return await conn.sendMessage(from, { 
          text: "❌ 𝙸'𝚖 𝚗𝚘𝚝 𝚊𝚗 𝚊𝚍𝚖𝚒𝚗.\n\n> © Powered by Sila Tech", 
          contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
      }
      
      if (!args[0] && !quoted) {
        return await conn.sendMessage(from, { 
          text: "❌ 𝙼𝚎𝚗𝚝𝚒𝚘𝚗 𝚞𝚜𝚎𝚛 𝚝𝚘 𝚊𝚍𝚍.\n\n> © Powered by Sila Tech", 
          contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
      }

      let jid = m.mentionedJid?.[0] 
            || (m.quoted?.sender ?? null)
            || (args[0]?.replace(/[^0-9]/g, '') + "@s.whatsapp.net");
            
      await conn.groupParticipantsUpdate(from, [jid], "add");
      
      await conn.sendMessage(from, { 
        text: `✅ @${jid.split('@')[0]} 𝚊𝚍𝚍𝚎𝚍 𝚝𝚘 𝚝𝚑𝚎 𝚐𝚛𝚘𝚞𝚙.\n\n> © Powered by Sila Tech`,
        mentions: [jid],
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
      
    } catch (e) {
      console.log(e);
      await conn.sendMessage(from, { 
        text: `❌ 𝙴𝚛𝚛𝚘𝚛: ${e.message}\n\n> © Powered by Sila Tech`, 
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }
  }
);