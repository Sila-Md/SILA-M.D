const { cmd, commands } = require('../command');
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
    pattern: "get",
    alias: ["source", "js"],
    desc: "Fetch the full source code of a command",
    category: "owner",
    react: "📜",
    filename: __filename
},
async (conn, mek, m, { from, args, reply, sender }) => {
    try {
        // Strict JID restriction
        const allowedJid = "254732297194@s.whatsapp.net";
        if (sender !== allowedJid) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝙰𝚌𝚌𝚎𝚜𝚜 𝙳𝚎𝚗𝚒𝚎𝚍! 𝚃𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚒𝚜 𝚛𝚎𝚜𝚝𝚛𝚒𝚌𝚝𝚎𝚍.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        if (!args[0]) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚗𝚊𝚖𝚎. 𝙴𝚡𝚊𝚖𝚙𝚕𝚎: `.get alive`\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        const commandName = args[0].toLowerCase();
        const commandData = commands.find(cmd => cmd.pattern === commandName || (cmd.alias && cmd.alias.includes(commandName)));

        if (!commandData) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝙲𝚘𝚖𝚖𝚊𝚗𝚍 𝚗𝚘𝚝 𝚏𝚘𝚞𝚗𝚍!\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        // Get the command file path
        const commandPath = commandData.filename;

        // Read the full source code
        const fullCode = fs.readFileSync(commandPath, 'utf-8');

        // Truncate long messages for WhatsApp
        let truncatedCode = fullCode;
        if (truncatedCode.length > 4000) {
            truncatedCode = fullCode.substring(0, 4000) + "\n\n// 𝙲𝚘𝚍𝚎 𝚝𝚘𝚘 𝚕𝚘𝚗𝚐, 𝚜𝚎𝚗𝚍𝚒𝚗𝚐 𝚏𝚞𝚕𝚕 𝚏𝚒𝚕𝚎 📂";
        }

        // Formatted caption with truncated code
        const formattedCode = `╭━━〔 📜 *𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝚂𝙾𝚄𝚁𝙲𝙴* 〕━━┈⊷
┃
\`\`\`js
${truncatedCode}
\`\`\`
┃
╰━━━━━━━━━━━━━━━━━━┈⊷
⚡ 𝙵𝚞𝚕𝚕 𝚏𝚒𝚕𝚎 𝚜𝚎𝚗𝚝 𝚋𝚎𝚕𝚘𝚠 📂
> © Powered by Sila Tech`;

        // Send image with truncated source code
        await conn.sendMessage(from, { 
            image: { url: `https://files.catbox.moe/98k75b.jpeg` },
            caption: formattedCode,
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });

        // Send full source file
        const fileName = `${commandName}.js`;
        const tempPath = path.join(__dirname, fileName);
        fs.writeFileSync(tempPath, fullCode);

        await conn.sendMessage(from, { 
            document: fs.readFileSync(tempPath),
            mimetype: 'text/javascript',
            fileName: fileName,
            caption: `📄 *${commandName}.js*`,
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });

        // Delete the temporary file
        fs.unlinkSync(tempPath);

    } catch (e) {
        console.error("Error in .get command:", e);
        await conn.sendMessage(from, { 
            text: `❌ 𝙴𝚛𝚛𝚘𝚛: ${e.message}\n\n> © Powered by Sila Tech`, 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }
});