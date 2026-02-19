const config = require('../config')
const { cmd, commands } = require('../command')
const { runtime } = require('../lib/functions')

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

cmd({
    pattern: "list",
    alias: ["listcmd", "commands"],
    desc: "Show all available commands with descriptions",
    category: "menu",
    react: "📜",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender }) => {
    try {
        const ownerName = "𝐒𝐈𝐋𝐀 𝐌𝐃";
        const formattedOwnerNumber = "255789661031";
        
        // Count total commands and aliases
        const totalCommands = Object.keys(commands).length
        let aliasCount = 0
        Object.values(commands).forEach(cmd => {
            if (cmd.alias) aliasCount += cmd.alias.length
        })

        // Get unique categories count
        const categories = [...new Set(Object.values(commands).map(c => c.category))]

        let menuText = `*┏────〘 𝚂𝙸𝙻𝙰 𝙼𝙳 〙───⊷*
*┃* *🛠️ 𝙱𝙾𝚃 𝙸𝙽𝙵𝙾𝚁𝙼𝙰𝚃𝙸𝙾𝙽*
*┃* • 🤖 𝙱𝚘𝚝 𝙽𝚊𝚖𝚎: ${config.BOT_NAME}
*┃* • 👑 𝙾𝚠𝚗𝚎𝚛: ${config.OWNER_NAME}
*┃* • ⚙️ 𝙿𝚛𝚎𝚏𝚒𝚡: [${config.PREFIX}]
*┃* • 🌐 𝙿𝚕𝚊𝚝𝚏𝚘𝚛𝚖: 𝙷𝚎𝚛𝚘𝚔𝚞
*┃* • 📦 𝚅𝚎𝚛𝚜𝚒𝚘𝚗: 𝟷.𝟶.𝟶
*┃* • 🕒 𝚁𝚞𝚗𝚝𝚒𝚖𝚎: ${runtime(process.uptime())}
*┃*
*┃* *📊 𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝚂𝚃𝙰𝚃𝚂*
*┃* • 📜 𝚃𝚘𝚝𝚊𝚕 𝙲𝚘𝚖𝚖𝚊𝚗𝚍𝚜: ${totalCommands}
*┃* • 🔄 𝚃𝚘𝚝𝚊𝚕 𝙰𝚕𝚒𝚊𝚜𝚎𝚜: ${aliasCount}
*┃* • 🗂️ 𝙲𝚊𝚝𝚎𝚐𝚘𝚛𝚒𝚎𝚜: ${categories.length}
*┗──────────────⊷*\n`

        // Organize commands by category
        const categorized = {}
        categories.forEach(cat => {
            categorized[cat] = Object.values(commands).filter(c => c.category === cat)
        })

        // Generate menu for each category
        for (const [category, cmds] of Object.entries(categorized)) {
            menuText += `╭───『 *${category.toUpperCase()}* 』───⳹
*┃* • 📂 𝙲𝚘𝚖𝚖𝚊𝚗𝚍𝚜: ${cmds.length}
*┃* • 🔄 𝙰𝚕𝚒𝚊𝚜𝚎𝚜: ${cmds.reduce((a, c) => a + (c.alias ? c.alias.length : 0), 0)}
*┃*
`

            cmds.forEach(c => {
                menuText += `┃▸📄 𝙲𝙾𝙼𝙼𝙰𝙽𝙳: ${config.PREFIX}${c.pattern}\n`
                menuText += `┃▸❕ ${c.desc || '𝙽𝚘 𝚍𝚎𝚜𝚌𝚛𝚒𝚙𝚝𝚒𝚘𝚗 𝚊𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎'}\n`
                if (c.alias && c.alias.length > 0) {
                    menuText += `┃▸🔹 𝙰𝚕𝚒𝚊𝚜𝚎𝚜: ${c.alias.map(a => `${config.PREFIX}${a}`).join(', ')}\n`
                }
                if (c.use) {
                    menuText += `┃▸💡 𝚄𝚜𝚊𝚐𝚎: ${c.use}\n`
                }
                menuText += `*┃*\n`
            })
            
            menuText += `*┗──────────────⊷*\n`
        }

        menuText += `\n📝 *𝙽𝚘𝚝𝚎*: 𝚄𝚜𝚎 ${config.PREFIX}help <𝚌𝚘𝚖𝚖𝚊𝚗𝚍> 𝚏𝚘𝚛 𝚍𝚎𝚝𝚊𝚒𝚕𝚎𝚍 𝚑𝚎𝚕𝚙\n`
        menuText += `> © Powered by Sila Tech`

        await conn.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/98k75b.jpeg' },
                caption: menuText,
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            },
            { quoted: fkontak }
        )

    } catch (e) {
        console.error('Command List Error:', e)
        await conn.sendMessage(from, { 
            text: `❌ 𝙴𝚛𝚛𝚘𝚛 𝚐𝚎𝚗𝚎𝚛𝚊𝚝𝚒𝚗𝚐 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚕𝚒𝚜𝚝: ${e.message}\n\n> © Powered by Sila Tech`, 
            contextInfo: getContextInfo({ sender: sender }, "𝐒𝐈𝐋𝐀 𝐌𝐃", "255789661031")
        }, { quoted: fkontak })
    }
})