const { cmd } = require('../command')

cmd({
    pattern: "sila",
    react: "👑",
    desc: "Sila Bot information",
    category: "owner",
    use: '.sila',
    filename: __filename
},
async(conn, mek, m,{from, prefix, reply}) => {
    const botImage = "https://files.catbox.moe/qi3kij.jpg"
    
    const silaInfo = `
╔══════════════════════════════╗
         *𝐒𝐈𝐋𝐀 𝐓𝐄𝐂𝐇* 👑
╚══════════════════════════════╝

╔══════════════════════════════╗
        *𝐁𝐎𝐓 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍* 🤖
╚══════════════════════════════╝

╔► *Bot Name:* Sila Tech Bot
╠► *Developer:* Sila Admin
╠► *Version:* 2.0.0 Premium
╠► *Creation Date:* 2024
╠► *Platform:* WhatsApp Multi-Device
╠► *Library:* Baileys MD
╠► *Prefix:* [ ${prefix} ]
╠► *Status:* ✅ Online 24/7

╔══════════════════════════════╗
         *𝐎𝐖𝐍𝐄𝐑 𝐃𝐄𝐓𝐀𝐈𝐋𝐒* 👤
╚══════════════════════════════╝

╔► *Name:* Sila Admin
╠► *Role:* Bot Developer & Owner
╠► *Experience:* 3+ Years
╠► *Contact:* wa.me/255789661031
╠► *GitHub:* https://github.com/Sila-Md/SILA-M.D
╚► *Channel:* whatsapp.com/channel/0029VbBG4gfISTkCpKxyMH02

╔══════════════════════════════╗
        *𝐁𝐎𝐓 𝐅𝐄𝐀𝐓𝐔𝐑𝐄𝐒* ✨
╚══════════════════════════════╝

╠► *Group Management:*
║   • Mute/Unmute Groups
║   • Auto Reply
║   • Welcome Message
║   • Anti-Link System

╠► *Media Features:*
║   • Sticker Maker
║   • Image Editor
║   • Video Downloader
║   • YouTube Downloader

╠► *Entertainment:*
║   • Music Player
║   • Game Bot
║   • Quotes System
║   • Joke Generator

╠► *Utility Tools:*
║   • QR Code Generator
║   • Language Translator
║   • Calculator
║   • Weather Info

╔══════════════════════════════╗
       *𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐂𝐀𝐓𝐄𝐆𝐎𝐑𝐈𝐄𝐒* 📁
╚══════════════════════════════╝

╠► *group* - Group management
╠► *download* - Media downloader
╠► *fun* - Entertainment commands
╠► *sticker* - Sticker related
╠► *owner* - Owner only commands
╠► *tools* - Utility tools

╔══════════════════════════════╗
      *𝐐𝐔𝐈𝐂𝐊 𝐒𝐓𝐀𝐑𝐓 𝐆𝐔𝐈𝐃𝐄* 🚀
╚══════════════════════════════╝

╔► 1. *Type ${prefix}menu* - For full commands
╠► 2. *Type ${prefix}help* - For help guide
╠► 3. *Type ${prefix}owner* - Contact owner
╚► 4. *Type ${prefix}ping* - Check bot speed

╔══════════════════════════════╗
        *𝐒𝐔𝐏𝐏𝐎𝐑𝐓 𝐈𝐍𝐅𝐎* 📞
╚══════════════════════════════╝

╔► *24/7 Support:* Available
╠► *Bug Report:* Type ${prefix}report
╠► *Donate:* Type ${prefix}donate
╚► *Group:* chat.whatsapp.com/IdGNaKt80DEBqirc2ek4ks

╔══════════════════════════════╗
     *𝐓𝐇𝐀𝐍𝐊 𝐘𝐎𝐔 𝐅𝐎𝐑 𝐔𝐒𝐈𝐍𝐆* 🙏
╚══════════════════════════════╝

> © 𝐂𝐨𝐩𝐲𝐫𝐢𝐠𝐡𝐭 𝟐𝟎𝟐6 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡
> 𝐀𝐥𝐥 𝐑𝐢𝐠𝐡𝐭𝐬 𝐑𝐞𝐬𝐞𝐫𝐯𝐞𝐝
`
    
    // Tuma bila contextInfo
    await conn.sendMessage(from, {
        image: { url: botImage },
        caption: silaInfo
    }, { quoted: mek })
    
    // React kwa message
    await conn.sendMessage(from, { react: { text: `👑`, key: mek.key }}) 
})
