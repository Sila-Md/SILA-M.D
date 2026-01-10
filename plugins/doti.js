const config = require('../config')
const { cmd, commands } = require('../command')

cmd({
    pattern: "^\\.$",
    react: "🤖",
    desc: "Bot information",
    category: "general",
    use: '.',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    // Tafuta picture ya bot kutoka kwenye URL
    const botImage = "https://files.catbox.moe/qi3kij.jpg"
    
    // Taarifa za bot
    const botInfo = `
╔═══════════◥◤═══════════╗
       *𝐒𝐈𝐋𝐀 𝐁𝐎𝐓 𝐈𝐍𝐅𝐎* 🤖
╚═══════════◥◤═══════════╝

╔► *𝐁𝐨𝐭 𝐍𝐚𝐦𝐞:* 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡
╠► *𝐂𝐫𝐞𝐚𝐭𝐨𝐫:* 𝐒𝐢𝐥𝐚 𝐀𝐝𝐦𝐢𝐧
╠► *𝐕𝐞𝐫𝐬𝐢𝐨𝐧:* 2.0.0
╠► *𝐏𝐥𝐚𝐭𝐟𝐨𝐫𝐦:* WhatsApp Bot
╠► *𝐋𝐢𝐛𝐫𝐚𝐫𝐲:* Baileys
╠► *𝐋𝐚𝐧𝐠𝐮𝐚𝐠𝐞:* JavaScript
╠► *𝐓𝐨𝐭𝐚𝐥 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬:* ${commands ? commands.length : "50+"}
╠► *𝐔𝐩𝐭𝐢𝐦𝐞:* ${process.uptime ? `${Math.floor(process.uptime()/86400)} days ${Math.floor((process.uptime()%86400)/3600)} hours` : "24/7"}
╠► *𝐏𝐫𝐞𝐟𝐢𝐱:* [ ${prefix} ]
╠► *𝐇𝐨𝐬𝐭:* 𝐎𝐧𝐥𝐢𝐧𝐞
╚► *𝐒𝐭𝐚𝐭𝐮𝐬:* ✅ 𝐀𝐜𝐭𝐢𝐯𝐞

╔═══════════◥◤═══════════╗
   *𝐀𝐕𝐀𝐈𝐋𝐀𝐁𝐋𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒*
╚═══════════◥◤═══════════╝

╠► *Group Commands:*
║   ${prefix}mute - Mute group
║   ${prefix}unmute - Unmute group
║   ${prefix}opentime - Open group for time
║   ${prefix}tagall - Mention all members

╠► *Media Commands:*
║   ${prefix}sticker - Make sticker
║   ${prefix}toimg - Sticker to image
║   ${prefix}play - Play music

╠► *Fun Commands:*
║   ${prefix}joke - Random joke
║   ${prefix}quote - Motivational quote
║   ${prefix}fact - Interesting fact

╠► *Utility Commands:*
║   ${prefix}ping - Check bot speed
║   ${prefix}owner - Contact owner
║   ${prefix}menu - Show all commands

╔═══════════◥◤═══════════╗
 *𝐓𝐘𝐏𝐄* ${prefix}𝐡𝐞𝐥𝐩 *𝐅𝐎𝐑 𝐌𝐎𝐑𝐄*
╚═══════════◥◤═══════════╝

> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡
> 📞 𝐂𝐨𝐧𝐭𝐚𝐜𝐭: wa.me/255789661031
`
    
    // Tuma picha na caption
    await conn.sendMessage(from, {
        image: { url: botImage },
        caption: botInfo
    }, { quoted: mek })
    
    // React kwa message
    await conn.sendMessage(from, { react: { text: `🤖`, key: mek.key }}) 
})