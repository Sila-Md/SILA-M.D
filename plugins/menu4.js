const config = require('../config');
const moment = require('moment-timezone');
const { cmd, commands } = require('../command');

// Function to convert text to plain uppercase
const toUpper = (str) => str.toUpperCase();
const normalize = str => str.toLowerCase().replace(/\s+menu$/, '').trim();

// =============================================================
// 📌 SILA TECH MENU 4
// =============================================================
cmd({
  pattern: "menu",
  alias: ["help", "allmenu", "m", "list", "silahelp"],
  use: ".menu",
  desc: "Show all Sila Tech bot commands",
  category: "menu",
  react: "📜",
  filename: __filename
}, 
async (conn, mek, m, { from, reply, sender, pushname, prefix, isGroup, groupName }) => {

  try {
    const user = sender || mek.key.participant || 'unknown@s.whatsapp.net';
    const totalCommands = commands ? commands.length : 85;
    const userName = pushname || `@${user.split("@")[0]}`;

    const uptime = () => {
      let sec = process.uptime();
      let h = Math.floor(sec / 3600);
      let mn = Math.floor((sec % 3600) / 60);
      let s = Math.floor(sec % 60);
      return `${h}H ${mn}M ${s}S`;
    };

    const mode = config.WORK_TYPE?.toUpperCase() || "PUBLIC";

    // Header Design - Sila Tech Style
    let menu = `╔═══════════════════════════════════╗
        *𝐒𝐈𝐋𝐀 𝐓𝐄𝐂𝐇 𝐌𝐃 𝐕𝟐.𝟎* 📜
╚═══════════════════════════════════╝

╔► 𝐔𝐬𝐞𝐫: ☆ ${userName}
╠► 𝐌𝐨𝐝𝐞: ☆ ${mode}
╠► 𝐏𝐫𝐞𝐟𝐢𝐱: ☆ [ . ]
╠► 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬: ☆ ${totalCommands}+
╠► 𝐔𝐩𝐭𝐢𝐦𝐞: ☆ ${uptime()}
╚► 𝐁𝐨𝐭: ☆ 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡 𝐏𝐫𝐞𝐦𝐢𝐮𝐦

╔═══════════════════════════════════╗
   *𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐋𝐈𝐒𝐓 𝐅𝐎𝐑 ${isGroup ? groupName : '𝐒𝐈𝐋𝐀 𝐁𝐎𝐓'}*
╚═══════════════════════════════════╝`;

    // Grouping Categories
    let categories = {};
    
    for (let c of commands) {
      if (!c || !c.pattern || !c.category) continue;
      const cat = normalize(c.category);
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(c);
    }

    // Custom category order with all categories
    const categoryOrder = [
      'owner', 'group', 'ai', 'downloader', 'anime', 
      'maker', 'tools', 'search', 'fun', 'stalk',
      'random', 'media', 'image', 'audio', 'text',
      'nsfw', 'game', 'converter', 'utility'
    ];
    
    const sortedCats = categoryOrder.filter(cat => categories[cat]) || Object.keys(categories).sort();

    // Loop through Categories
    for (let cat of sortedCats) {
      // Skip nsfw in public mode
      if (cat === 'nsfw' && mode === 'PUBLIC') continue;
      
      // Category headers
      let catHeader;
      switch(cat) {
        case 'owner': catHeader = '☆ 𝐎𝐖𝐍𝐄𝐑 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒 ☆'; break;
        case 'group': catHeader = '☆ 𝐆𝐑𝐎𝐔𝐏 𝐌𝐀𝐍𝐀𝐆𝐄𝐌𝐄𝐍𝐓 ☆'; break;
        case 'ai': catHeader = '☆ 𝐀𝐈 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒 ☆'; break;
        case 'downloader': catHeader = '☆ 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑 ☆'; break;
        case 'anime': catHeader = '☆ 𝐀𝐍𝐈𝐌𝐄 ☆'; break;
        case 'maker': catHeader = '☆ 𝐌𝐀𝐊𝐄𝐑 𝐓𝐎𝐎𝐋𝐒 ☆'; break;
        case 'tools': catHeader = '☆ 𝐔𝐓𝐈𝐋𝐈𝐓𝐘 𝐓𝐎𝐎𝐋𝐒 ☆'; break;
        case 'search': catHeader = '☆ 𝐒𝐄𝐀𝐑𝐂𝐇 ☆'; break;
        case 'fun': catHeader = '☆ 𝐅𝐔𝐍 & 𝐆𝐀𝐌𝐄𝐒 ☆'; break;
        case 'stalk': catHeader = '☆ 𝐒𝐓𝐀𝐋𝐊 ☆'; break;
        case 'random': catHeader = '☆ 𝐑𝐀𝐍𝐃𝐎𝐌 ☆'; break;
        case 'media': catHeader = '☆ 𝐌𝐄𝐃𝐈𝐀 ☆'; break;
        case 'image': catHeader = '☆ 𝐈𝐌𝐀𝐆𝐄 ☆'; break;
        case 'audio': catHeader = '☆ 𝐀𝐔𝐃𝐈𝐎 ☆'; break;
        case 'text': catHeader = '☆ 𝐓𝐄𝐗𝐓 ☆'; break;
        case 'nsfw': catHeader = '☆ 𝐍𝐒𝐅𝐖 (𝟏𝟖+) ☆'; break;
        case 'game': catHeader = '☆ 𝐆𝐀𝐌𝐄𝐒 ☆'; break;
        case 'converter': catHeader = '☆ 𝐂𝐎𝐍𝐕𝐄𝐑𝐓𝐄𝐑 ☆'; break;
        case 'utility': catHeader = '☆ 𝐔𝐓𝐈𝐋𝐈𝐓𝐘 ☆'; break;
        default: catHeader = `☆ ${toUpper(cat)} ☆`;
      }

      menu += `\n\n╔═══════════════════════════════════╗
        ${catHeader}
╚═══════════════════════════════════╝\n`;

      const cmds = categories[cat]
        .filter(c => c.pattern)
        .sort((a, b) => {
          const nameA = Array.isArray(a.pattern) ? a.pattern[0] : a.pattern;
          const nameB = Array.isArray(b.pattern) ? b.pattern[0] : b.pattern;
          return nameA.localeCompare(nameB);
        })
        .slice(0, 20); // Limit to 20 commands per category

      // Add commands with your style
      let cmdList = '';
      for (let c of cmds) {
        const cmdName = Array.isArray(c.pattern) ? c.pattern[0] : c.pattern;
        cmdList += `╠► ${cmdName}\n`;
      }
      
      menu += cmdList;
      if (cmds.length === 30) {
        menu += `╠► ...and more\n`;
      }
      menu += `╚═══════════════════════════════════╝`;
    }

    // Footer
    menu += `\n\n╔═══════════════════════════════════╗
   *𝐓𝐘𝐏𝐄 𝐜𝐦𝐝 [𝐜𝐚𝐭𝐞𝐠𝐨𝐫𝐲] 𝐅𝐎𝐑 𝐌𝐎𝐑𝐄*
╠► 𝐄𝐱𝐚𝐦𝐩𝐥𝐞: cmd group
╠► 𝐄𝐱𝐚𝐦𝐩𝐥𝐞: cmd fun
╠► 𝐄𝐱𝐚𝐦𝐩𝐥𝐞: cmd downloader
╚═══════════════════════════════════╝

> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`;

    // Send the Menu
    await conn.sendMessage(from, {
      image: { url: 'https://files.catbox.moe/qi3kij.jpg' },
      caption: menu,
      contextInfo: {
        mentionedJid: [sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363402325089913@newsletter',
          newsletterName: '🎅𝚂𝙸𝙻𝙰 𝚃𝙴𝙲𝙷🎅',
          serverMessageId: 143
        }
      }
    }, { quoted: m });

  } catch (e) {
    console.error("╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► →", e);
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝 𝐰𝐡𝐢𝐥𝐞 𝐠𝐞𝐧𝐞𝐫𝐚𝐭𝐢𝐧𝐠 𝐦𝐞𝐧𝐮\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡');
  }

});

// =============================================================
// 📌 CMD COMMAND (SHOW COMMANDS BY CATEGORY)
// =============================================================
cmd({
  pattern: "cmd",
  alias: ["category", "commands"],
  use: ".cmd [category]",
  desc: "Show commands by category",
  category: "menu",
  react: "📁",
  filename: __filename
}, 
async (conn, mek, m, { from, reply, prefix, args, sender }) => {

  try {
    if (!args[0]) {
      const categories = ['owner', 'group', 'ai', 'downloader', 'anime', 'maker', 
                         'tools', 'search', 'fun', 'stalk', 'random', 'media', 
                         'image', 'audio', 'text', 'nsfw', 'game'];
      
      let catList = `📁 *𝐀𝐕𝐀𝐈𝐋𝐀𝐁𝐋𝐄 𝐂𝐀𝐓𝐄𝐆𝐎𝐑𝐈𝐄𝐒*\n\n`;
      
      categories.forEach(cat => {
        const count = commands.filter(c => c.category && normalize(c.category) === cat).length;
        if (count > 0) {
          catList += `• ${prefix}cmd ${cat} - ${count} commands\n`;
        }
      });
      
      catList += `\n𝐄𝐱𝐚𝐦𝐩𝐥𝐞: ${prefix}cmd fun\n`;
      catList += `> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`;
      
      await conn.sendMessage(from, {
        text: catList,
        contextInfo: {
          mentionedJid: [sender],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363402325089913@newsletter',
            newsletterName: '🎅𝚂𝙸𝙻𝙰 𝚃𝙴𝙲𝙷🎅',
            serverMessageId: 143
          }
        }
      }, { quoted: m });
      return;
    }

    const category = args[0].toLowerCase();
    const categoryCommands = commands.filter(c => c.category && normalize(c.category) === category);
    
    if (categoryCommands.length === 0) {
      reply(`╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐂𝐚𝐭𝐞𝐠𝐨𝐫𝐲 '${category}' 𝐧𝐨𝐭 𝐟𝐨𝐮𝐧𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);
      return;
    }

    let categoryHeader;
    switch(category) {
      case 'owner': categoryHeader = '𝐎𝐖𝐍𝐄𝐑 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒'; break;
      case 'group': categoryHeader = '𝐆𝐑𝐎𝐔𝐏 𝐌𝐀𝐍𝐀𝐆𝐄𝐌𝐄𝐍𝐓'; break;
      case 'ai': categoryHeader = '𝐀𝐈 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒'; break;
      case 'downloader': categoryHeader = '𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑'; break;
      case 'anime': categoryHeader = '𝐀𝐍𝐈𝐌𝐄'; break;
      case 'maker': categoryHeader = '𝐌𝐀𝐊𝐄𝐑 𝐓𝐎𝐎𝐋𝐒'; break;
      case 'tools': categoryHeader = '𝐔𝐓𝐈𝐋𝐈𝐓𝐘 𝐓𝐎𝐎𝐋𝐒'; break;
      case 'search': categoryHeader = '𝐒𝐄𝐀𝐑𝐂𝐇'; break;
      case 'fun': categoryHeader = '𝐅𝐔𝐍 & 𝐆𝐀𝐌𝐄𝐒'; break;
      case 'stalk': categoryHeader = '𝐒𝐓𝐀𝐋𝐊'; break;
      case 'random': categoryHeader = '𝐑𝐀𝐍𝐃𝐎𝐌'; break;
      case 'media': categoryHeader = '𝐌𝐄𝐃𝐈𝐀'; break;
      case 'image': categoryHeader = '𝐈𝐌𝐀𝐆𝐄'; break;
      case 'audio': categoryHeader = '𝐀𝐔𝐃𝐈𝐎'; break;
      case 'text': categoryHeader = '𝐓𝐄𝐗𝐓'; break;
      case 'nsfw': categoryHeader = '𝐍𝐒𝐅𝐖 (𝟏𝟖+)'; break;
      case 'game': categoryHeader = '𝐆𝐀𝐌𝐄𝐒'; break;
      default: categoryHeader = toUpper(category);
    }

    let cmdList = `╔═══════════════════════════════════╗
        *${categoryHeader}*
╚═══════════════════════════════════╝\n\n`;

    categoryCommands.sort((a, b) => {
      const nameA = Array.isArray(a.pattern) ? a.pattern[0] : a.pattern;
      const nameB = Array.isArray(b.pattern) ? b.pattern[0] : b.pattern;
      return nameA.localeCompare(nameB);
    });

    categoryCommands.forEach(c => {
      const cmdName = Array.isArray(c.pattern) ? c.pattern[0] : c.pattern;
      const desc = c.desc || 'No description';
      cmdList += `╔► *${prefix}${cmdName}*\n╚► → ${desc}\n\n`;
    });

    cmdList += `╔═══════════════════════════════════╗
   *${categoryCommands.length} 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬 𝐢𝐧 𝐭𝐡𝐢𝐬 𝐜𝐚𝐭𝐞𝐠𝐨𝐫𝐲*
╚═══════════════════════════════════╝

> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`;

    await conn.sendMessage(from, {
      text: cmdList,
      contextInfo: {
        mentionedJid: [sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363402325089913@newsletter',
          newsletterName: '🎅𝚂𝙸𝙻𝙰 𝚃𝙴𝙲𝙷🎅',
          serverMessageId: 143
        }
      }
    }, { quoted: m });

  } catch (e) {
    console.error("╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► →", e);
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡');
  }

});