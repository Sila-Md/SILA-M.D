const fs = require('fs');
const path = require('path');
const config = require('../config');
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

// Path to config file
const configPath = path.join(__dirname, '../config.js');

cmd({
    pattern: "setprefix",
    alias: ["changeprefix", "newprefix"],
    desc: "Change bot command prefix (Owner only)",
    category: "owner",
    react: "🔧",
    filename: __filename
},
async (conn, mek, m, { from, args, q, isOwner, sender, reply }) => {
    try {
        // Owner check
        if (!isOwner) {
            return await conn.sendMessage(from, { 
                text: "🚫 *𝚃𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚒𝚜 𝚘𝚗𝚕𝚢 𝚊𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎 𝚝𝚘 𝚝𝚑𝚎 𝚋𝚘𝚝 𝚘𝚠𝚗𝚎𝚛.*\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        if (!q) {
            const currentPrefix = config.PREFIX || '.';
            return await conn.sendMessage(from, { 
                text: `🔧 *𝚂𝚎𝚝 𝙿𝚛𝚎𝚏𝚒𝚡*\n\n𝙲𝚞𝚛𝚛𝚎𝚗𝚝 𝙿𝚛𝚎𝚏𝚒𝚡: *${currentPrefix}*\n\n*𝚄𝚜𝚊𝚐𝚎:* .setprefix <𝚗𝚎𝚠_𝚙𝚛𝚎𝚏𝚒𝚡>\n𝙴𝚡𝚊𝚖𝚙𝚕𝚎: .setprefix !\n\n> © Powered by Sila Tech`, 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        // Validate new prefix
        const newPrefix = q.trim();
        if (newPrefix.length > 2) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝙿𝚛𝚎𝚏𝚒𝚡 𝚜𝚑𝚘𝚞𝚕𝚍 𝚋𝚎 𝚊 𝚜𝚒𝚗𝚐𝚕𝚎 𝚌𝚑𝚊𝚛𝚊𝚌𝚝𝚎𝚛 𝚘𝚛 𝚖𝚊𝚡 𝟸 𝚌𝚑𝚊𝚛𝚊𝚌𝚝𝚎𝚛𝚜.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        // Update config.js file
        try {
            let configContent = fs.readFileSync(configPath, 'utf8');
            
            // Replace PREFIX value
            configContent = configContent.replace(
                /PREFIX:\s*['"`].*?['"`]/,
                `PREFIX: '${newPrefix}'`
            );
            
            fs.writeFileSync(configPath, configContent, 'utf8');
            
            // Update runtime config
            config.PREFIX = newPrefix;
            
            // Success message
            await conn.sendMessage(from, { 
                text: `✅ *𝙿𝚛𝚎𝚏𝚒𝚡 𝚄𝚙𝚍𝚊𝚝𝚎𝚍 𝚂𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢!*\n\n𝙽𝚎𝚠 𝙿𝚛𝚎𝚏𝚒𝚡: *${newPrefix}*\n\n𝙿𝚕𝚎𝚊𝚜𝚎 𝚛𝚎𝚜𝚝𝚊𝚛𝚝 𝚝𝚑𝚎 𝚋𝚘𝚝 𝚏𝚘𝚛 𝚌𝚑𝚊𝚗𝚐𝚎𝚜 𝚝𝚘 𝚝𝚊𝚔𝚎 𝚎𝚏𝚏𝚎𝚌𝚝.\n\n> © Powered by Sila Tech`, 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
            
        } catch (fileError) {
            console.error("File write error:", fileError);
            await conn.sendMessage(from, { 
                text: `❌ 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚞𝚙𝚍𝚊𝚝𝚎 𝚌𝚘𝚗𝚏𝚒𝚐 𝚏𝚒𝚕𝚎: ${fileError.message}\n\n> © Powered by Sila Tech`, 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

    } catch (error) {
        console.error("Setprefix Error:", error);
        await conn.sendMessage(from, { 
            text: `❌ 𝙴𝚛𝚛𝚘𝚛: ${error.message}\n\n> © Powered by Sila Tech`, 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }
});

// Alternative command to view prefix only
cmd({
    pattern: "prefix",
    alias: ["getprefix"],
    desc: "View current bot prefix",
    category: "main",
    react: "🔤",
    filename: __filename
},
async (conn, mek, m, { from, sender }) => {
    try {
        const currentPrefix = config.PREFIX || '.';
        
        await conn.sendMessage(from, { 
            text: `🔤 *𝙱𝙾𝚃 𝙿𝚁𝙴𝙵𝙸𝚇*\n\n𝙲𝚞𝚛𝚛𝚎𝚗𝚝 𝙿𝚛𝚎𝚏𝚒𝚡: *${currentPrefix}*\n\n> © Powered by Sila Tech`, 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
        
    } catch (error) {
        console.error("Prefix Error:", error);
        await conn.sendMessage(from, { 
            text: `❌ 𝙴𝚛𝚛𝚘𝚛: ${error.message}\n\n> © Powered by Sila Tech`, 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }
});