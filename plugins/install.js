const { cmd } = require('../command');
const config = require('../config');
const axios = require('axios');
const fs = require('fs');
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

// Plugin Install Command
cmd({
  pattern: 'install',
  alias: ['addplugin','installplugin'],
  react: '📥',
  desc: 'Install plugins from Gist URLs',
  category: 'plugin',
  filename: __filename,
  use: '<gist_url>',
  owner: true
}, async (conn, mek, m, { reply, args, from, sender }) => {
  try {
    const ownerName = "𝐒𝐈𝐋𝐀 𝐌𝐃";
    const formattedOwnerNumber = "255789661031";
    
    if (!args[0]) {
      return await conn.sendMessage(from, { 
        text: `❌ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝙶𝚒𝚜𝚝 𝚄𝚁𝙻\n𝙴𝚡𝚊𝚖𝚙𝚕𝚎: *${config.PREFIX}install https://gist.github.com/username/gistid*\n\n> © Powered by Sila Tech`, 
        contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
      }, { quoted: fkontak });
    }

    const url = args[0];
    const gistId = url.match(/(?:\/|gist\.github\.com\/)([a-fA-F0-9]+)/)?.[1];
    if (!gistId) {
      return await conn.sendMessage(from, { 
        text: '❌ 𝙸𝚗𝚟𝚊𝚕𝚒𝚍 𝙶𝚒𝚜𝚝 𝚄𝚁𝙻 𝚏𝚘𝚛𝚖𝚊𝚝\n\n> © Powered by Sila Tech', 
        contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
      }, { quoted: fkontak });
    }

    // Fetch Gist data
    const { data } = await axios.get(`https://api.github.com/gists/${gistId}`);
    
    // Find first JavaScript file
    const jsFile = Object.values(data.files).find(f => f.filename.endsWith('.js'));
    if (!jsFile) {
      return await conn.sendMessage(from, { 
        text: '❌ 𝙽𝚘 𝙹𝚊𝚟𝚊𝚂𝚌𝚛𝚒𝚙𝚝 𝚏𝚒𝚕𝚎 𝚏𝚘𝚞𝚗𝚍 𝚒𝚗 𝙶𝚒𝚜𝚝\n\n> © Powered by Sila Tech', 
        contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
      }, { quoted: fkontak });
    }

    // Create plugins directory if it doesn't exist
    const pluginsDir = path.join(__dirname, '..', 'plugins');
    if (!fs.existsSync(pluginsDir)) {
      fs.mkdirSync(pluginsDir);
    }

    // Check if plugin already exists
    const pluginPath = path.join(pluginsDir, jsFile.filename);
    if (fs.existsSync(pluginPath)) {
      return await conn.sendMessage(from, { 
        text: `⚠️ 𝙿𝚕𝚞𝚐𝚒𝚗 *${jsFile.filename}* 𝚊𝚕𝚛𝚎𝚊𝚍𝚢 𝚎𝚡𝚒𝚜𝚝𝚜!\n𝚄𝚜𝚎 *${config.PREFIX}pluginlist* 𝚝𝚘 𝚜𝚎𝚎 𝚙𝚕𝚞𝚐𝚒𝚗 𝚕𝚒𝚜𝚝\n\n> © Powered by Sila Tech`, 
        contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
      }, { quoted: fkontak });
    }

    // Save the file
    await fs.promises.writeFile(pluginPath, jsFile.content);
    
    await conn.sendMessage(from, { 
      text: `✅ 𝙿𝚕𝚞𝚐𝚒𝚗 *${jsFile.filename}* 𝚒𝚗𝚜𝚝𝚊𝚕𝚕𝚎𝚍 𝚜𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢!\n\n𝚄𝚜𝚎 *${config.PREFIX}restart* 𝚝𝚘 𝚕𝚘𝚊𝚍 𝚒𝚝\n\n> © Powered by Sila Tech`, 
      contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
    }, { quoted: fkontak });

  } catch (error) {
    console.error('Install error:', error);
    await conn.sendMessage(from, { 
      text: `❌ 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚒𝚗𝚜𝚝𝚊𝚕𝚕 𝚙𝚕𝚞𝚐𝚒𝚗:\n${error.message}\n\n𝙼𝚊𝚔𝚎 𝚜𝚞𝚛𝚎:\n𝟷. 𝙶𝚒𝚜𝚝 𝚎𝚡𝚒𝚜𝚝𝚜 𝚊𝚗𝚍 𝚒𝚜 𝚙𝚞𝚋𝚕𝚒𝚌\n𝟸. 𝚄𝚁𝙻 𝚒𝚜 𝚌𝚘𝚛𝚛𝚎𝚌𝚝\n\n> © Powered by Sila Tech`, 
      contextInfo: getContextInfo({ sender: sender }, "𝐒𝐈𝐋𝐀 𝐌𝐃", "255789661031")
    }, { quoted: fkontak });
  }
});

// Plugin List Command
cmd({
  pattern: 'pluginlist',
  alias: ['listplugins'],
  react: '️✳️',
  desc: 'List installed plugins',
  category: 'plugin',
  filename: __filename
}, async (conn, mek, m, { reply, from, sender }) => {
  try {
    const ownerName = "𝐒𝐈𝐋𝐀 𝐌𝐃";
    const formattedOwnerNumber = "255789661031";
    
    const pluginsDir = path.join(__dirname, '..', 'plugins');
    const files = fs.readdirSync(pluginsDir).filter(f => f.endsWith('.js'));
    
    if (!files.length) {
      return await conn.sendMessage(from, { 
        text: '𝙽𝚘 𝚙𝚕𝚞𝚐𝚒𝚗𝚜 𝚒𝚗𝚜𝚝𝚊𝚕𝚕𝚎𝚍\n\n> © Powered by Sila Tech', 
        contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
      }, { quoted: fkontak });
    }
    
    let msg = '📋 *𝙸𝚗𝚜𝚝𝚊𝚕𝚕𝚎𝚍 𝙿𝚕𝚞𝚐𝚒𝚗𝚜*:\n\n';
    files.forEach((file, i) => {
      msg += `${i+1}. ${file}\n`;
    });
    
    msg += `\n𝚃𝚘𝚝𝚊𝚕: ${files.length} 𝚙𝚕𝚞𝚐𝚒𝚗𝚜\n\n> © Powered by Sila Tech`;
    
    await conn.sendMessage(from, { 
      text: msg,
      contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
    }, { quoted: fkontak });
    
  } catch (error) {
    await conn.sendMessage(from, { 
      text: '❌ 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚕𝚒𝚜𝚝 𝚙𝚕𝚞𝚐𝚒𝚗𝚜\n\n> © Powered by Sila Tech', 
      contextInfo: getContextInfo({ sender: sender }, "𝐒𝐈𝐋𝐀 𝐌𝐃", "255789661031")
    }, { quoted: fkontak });
  }
});

// Plugin Delete Command
cmd({
  pattern: 'deleteplugin',
  alias: ['removeplugin', 'uninstall'],
  react: '🗑️',
  desc: 'Delete an installed plugin',
  category: 'plugin',
  filename: __filename,
  use: '<plugin_name>',
  owner: true
}, async (conn, mek, m, { reply, args, from, sender }) => {
  try {
    const ownerName = "𝐒𝐈𝐋𝐀 𝐌𝐃";
    const formattedOwnerNumber = "255789661031";
    
    if (!args[0]) {
      return await conn.sendMessage(from, { 
        text: `❌ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚜𝚙𝚎𝚌𝚒𝚏𝚢 𝚊 𝚙𝚕𝚞𝚐𝚒𝚗 𝚗𝚊𝚖𝚎\n𝙴𝚡𝚊𝚖𝚙𝚕𝚎: *${config.PREFIX}deleteplugin example.js*\n\n> © Powered by Sila Tech`, 
        contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
      }, { quoted: fkontak });
    }

    let pluginName = args[0];
    if (!pluginName.endsWith('.js')) pluginName += '.js';

    const pluginsDir = path.join(__dirname, '..', 'plugins');
    const pluginPath = path.join(pluginsDir, pluginName);

    if (!fs.existsSync(pluginPath)) {
      return await conn.sendMessage(from, { 
        text: `❌ 𝙿𝚕𝚞𝚐𝚒𝚗 *${pluginName}* 𝚗𝚘𝚝 𝚏𝚘𝚞𝚗𝚍\n𝚄𝚜𝚎 *${config.PREFIX}pluginlist* 𝚝𝚘 𝚜𝚎𝚎 𝚒𝚗𝚜𝚝𝚊𝚕𝚕𝚎𝚍 𝚙𝚕𝚞𝚐𝚒𝚗𝚜\n\n> © Powered by Sila Tech`, 
        contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
      }, { quoted: fkontak });
    }

    fs.unlinkSync(pluginPath);
    
    await conn.sendMessage(from, { 
      text: `✅ 𝙿𝚕𝚞𝚐𝚒𝚗 *${pluginName}* 𝚍𝚎𝚕𝚎𝚝𝚎𝚍 𝚜𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢!\n\n𝚄𝚜𝚎 *${config.PREFIX}restart* 𝚝𝚘 𝚊𝚙𝚙𝚕𝚢 𝚌𝚑𝚊𝚗𝚐𝚎𝚜\n\n> © Powered by Sila Tech`, 
      contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
    }, { quoted: fkontak });

  } catch (error) {
    console.error('Delete plugin error:', error);
    await conn.sendMessage(from, { 
      text: `❌ 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚍𝚎𝚕𝚎𝚝𝚎 𝚙𝚕𝚞𝚐𝚒𝚗:\n${error.message}\n\n> © Powered by Sila Tech`, 
      contextInfo: getContextInfo({ sender: sender }, "𝐒𝐈𝐋𝐀 𝐌𝐃", "255789661031")
    }, { quoted: fkontak });
  }
});