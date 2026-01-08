const config = require('../config')
const { cmd, commands } = require('../command')

// CALCULATE UPTIME
function formatUptime(uptime) {
    const hours = Math.floor(uptime / 3600)
    const minutes = Math.floor((uptime % 3600) / 60)
    const seconds = Math.floor(uptime % 60)
    return { hours, minutes, seconds }
}

// MAIN MENU COMMAND
cmd({
    pattern: "menu",
    alais: ["help", "commands", "allmenu"],
    react: "📱",
    desc: "Show all bot commands menu",
    category: "general",
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    const uptime = process.uptime()
    const { hours, minutes, seconds } = formatUptime(uptime)
    
    // Sanitize phone number
    const sanitizedNumber = senderNumber ? senderNumber.replace('@s.whatsapp.net', '') : 'Unknown'
    
    // Active bots simulation
    const activeBots = Math.floor(Math.random() * 5) + 1
    
    const menuText = `
*╭━━━━━━━━━━━━━━━━●◌*
*│ 🤖 Greet :* *Hello ${pushname || 'User'} 👋*
*│ 🏷️ Bot Name :* SILA MD
*│ ⏰ Run Time :* ${hours}h ${minutes}m ${seconds}s
*│ 📱 Your Number :* ${sanitizedNumber}
*│ 🔢 Active Bots :* ${activeBots}
*╰━━━━━━━━━━━━━━━━●◌*

*🤖 AI & TOOLS MENU*

╭━━━━━━━━━━━━━━━━━●◌
│    *🔹 Command :* .ai
│  *✨ Chat With AI*
│
│    *🔹 Command :* .gemini
│  *✨ Chat With Gemini AI*
│
│    *🔹 Command :* .gpt
│  *✨ Chat With ChatGPT*
│
│    *🔹 Command :* .imagine
│  *✨ Generate AI Images*
│
│    *🔹 Command :* .pollcreate
│  *✨ Create Interactive Polls*
│
│    *🔹 Command :* .translate
│  *✨ Translate Messages*
╰━━━━━━━━━━━━━━━━━●◌

*👥 GROUP MANAGEMENT*

╭━━━━━━━━━━━━━━━━━●◌
│    *🔹 Command :* .ginfo
│  *👥 Show Group Information*
│
│    *🔹 Command :* .tagall
│  *👥 Mention All Members*
│
│    *🔹 Command :* .tagadmin
│  *👥 Mention Group Admins*
│
│    *🔹 Command :* .listonline
│  *👥 Show Online Members*
│
│    *🔹 Command :* .topmember
│  *👥 Top Active Members*
│
│    *🔹 Command :* .kick
│  *👥 Remove Member From Group*
│
│    *🔹 Command :* .kickall
│  *👥 Remove All Non-Admins*
│
│    *🔹 Command :* .add
│  *👥 Add Member To Group*
│
│    *🔹 Command :* .mute
│  *👥 Mute Group*
│
│    *🔹 Command :* .unmute
│  *👥 Unmute Group*
╰━━━━━━━━━━━━━━━━━●◌

*⚙️ GROUP SETTINGS*

╭━━━━━━━━━━━━━━━━━●◌
│    *🔹 Command :* .setgname
│  *⚙️ Change Group Name*
│
│    *🔹 Command :* .setgdesc
│  *⚙️ Change Group Description*
│
│    *🔹 Command :* .setgpp
│  *⚙️ Set Group Profile Picture*
│
│    *🔹 Command :* .opentime
│  *⚙️ Open Group For Time*
│
│    *🔹 Command :* .closetime
│  *⚙️ Close Group For Time*
│
│    *🔹 Command :* .welcome
│  *⚙️ Setup Welcome Message*
│
│    *🔹 Command :* .rules
│  *⚙️ Show Group Rules*
│
│    *🔹 Command :* .announce
│  *⚙️ Make Announcement*
╰━━━━━━━━━━━━━━━━━●◌

*🎮 GAMES & FUN*

╭━━━━━━━━━━━━━━━━━●◌
│    *🔹 Command :* .quiz
│  *🎮 Start Quiz Game*
│
│    *🔹 Command :* .wordgame
│  *🎮 Word Guessing Game*
│
│    *🔹 Command :* .roulette
│  *🎮 Random Selection Game*
│
│    *🔹 Command :* .memory
│  *🎮 Memory Matching Game*
│
│    *🔹 Command :* .countdown
│  *🎮 Start Countdown Timer*
│
│    *🔹 Command :* .sticker
│  *🎮 Create Sticker From Image*
│
│    *🔹 Command :* .theme
│  *🎮 Change Group Theme*
╰━━━━━━━━━━━━━━━━━●◌

*💰 GROUP ECONOMY*

╭━━━━━━━━━━━━━━━━━●◌
│    *🔹 Command :* .economy
│  *💰 Group Economy System*
│
│    *🔹 Command :* .daily
│  *💰 Claim Daily Reward*
│
│    *🔹 Command :* .shop
│  *💰 Group Shop*
│
│    *🔹 Command :* .buy
│  *💰 Buy Items From Shop*
│
│    *🔹 Command :* .leaderboard
│  *💰 Quiz Leaderboard*
│
│    *🔹 Command :* .event
│  *💰 Create Group Event*
│
│    *🔹 Command :* .rsvp
│  *💰 RSVP For Event*
╰━━━━━━━━━━━━━━━━━●◌

*📥 DOWNLOAD MENU*

╭━━━━━━━━━━━━━━━━━●◌
│    *🔹 Command :* .song
│  *⬇️ Download Youtube Songs*
│
│    *🔹 Command :* .video
│  *⬇️ Download Youtube Videos*
│
│    *🔹 Command :* .tiktok
│  *⬇️ Download Tiktok Videos*
│
│    *🔹 Command :* .fb
│  *⬇️ Download Facebook Posts*
│
│    *🔹 Command :* .img
│  *⬇️ Download Images From Google*
│
│    *🔹 Command :* .play
│  *⬇️ Search & Download Songs*
╰━━━━━━━━━━━━━━━━━●◌

*🎵 MEDIA & ENTERTAINMENT*

╭━━━━━━━━━━━━━━━━━●◌
│    *🔹 Command :* .music
│  *🎵 Group Music Player*
│
│    *🔹 Command :* .play
│  *🎵 Play Music Controls*
│
│    *🔹 Command :* .games
│  *🎵 Games Menu*
│
│    *🔹 Command :* .activity
│  *🎵 Group Activity Stats*
│
│    *🔹 Command :* .schedule
│  *🎵 Schedule Group Activities*
│
│    *🔹 Command :* .feedback
│  *🎵 Send Group Feedback*
╰━━━━━━━━━━━━━━━━━●◌

*🚨 MODERATION TOOLS*

╭━━━━━━━━━━━━━━━━━●◌
│    *🔹 Command :* .report
│  *🚨 Report A User*
│
│    *🔹 Command :* .warn
│  *🚨 Warn A User*
│
│    *🔹 Command :* .filter
│  *🚨 Content Filter*
│
│    *🔹 Command :* .antimention
│  *🚨 Anti-Mention Protection*
│
│    *🔹 Command :* .antitag
│  *🚨 Anti-Tag Protection*
│
│    *🔹 Command :* .clean
│  *🚨 Clean Group Content*
│
│    *🔹 Command :* .hidetag
│  *🚨 Hidden Tag All Members*
╰━━━━━━━━━━━━━━━━━●◌

*👑 OWNER COMMANDS*

╭━━━━━━━━━━━━━━━━━●◌
│    *🔹 Command :* .broadcast
│  *👑 Broadcast To All Groups*
│
│    *🔹 Command :* .eval
│  *👑 Execute JavaScript Code*
│
│    *🔹 Command :* .ban
│  *👑 Ban User From Bot*
│
│    *🔹 Command :* .unban
│  *👑 Unban User*
│
│    *🔹 Command :* .restart
│  *👑 Restart Bot*
│
│    *🔹 Command :* .shutdown
│  *👑 Shutdown Bot*
│
│    *🔹 Command :* .leave
│  *👑 Make Bot Leave Group*
│
│    *🔹 Command :* .setprefix
│  *👑 Change Bot Prefix*
│
│    *🔹 Command :* .sendall
│  *👑 Send Message To All Users*
│
│    *🔹 Command :* .backupdata
│  *👑 Backup Bot Data*
│
│    *🔹 Command :* .update
│  *👑 Update Bot From GitHub*
│
│    *🔹 Command :* .terminal
│  *👑 Execute Terminal Commands*
╰━━━━━━━━━━━━━━━━━●◌

*⚡ SYSTEM & INFO*

╭━━━━━━━━━━━━━━━━━●◌
│    *🔹 Command :* .status
│  *⚡ Bot Status & Statistics*
│
│    *🔹 Command :* .serverinfo
│  *⚡ Server Information*
│
│    *🔹 Command :* .logs
│  *⚡ View Bot Logs*
│
│    *🔹 Command :* .userinfo
│  *⚡ Get User Information*
│
│    *🔹 Command :* .listgroups
│  *⚡ List All Groups*
│
│    *🔹 Command :* .grouhelp
│  *⚡ Group Commands Help*
│
│    *🔹 Command :* .adminpanel
│  *⚡ Admin Control Panel*
│
│    *🔹 Command :* .ownermenu
│  *⚡ Owner Control Menu*
╰━━━━━━━━━━━━━━━━━●◌

*🛠️ UTILITY TOOLS*

╭━━━━━━━━━━━━━━━━━●◌
│    *🔹 Command :* .search
│  *🛠️ Search In Group*
│
│    *🔹 Command :* .delete
│  *🛠️ Delete Bot's Message*
│
│    *🔹 Command :* .senddm
│  *🛠️ Send Direct Message*
│
│    *🔹 Command :* .link
│  *🛠️ Get Group Invite Link*
│
│    *🔹 Command :* .join
│  *🛠️ Join Group Using Link*
│
│    *🔹 Command :* .clearall
│  *🛠️ Clear All Chats*
│
│    *🔹 Command :* .backup
│  *🛠️ Backup Group Data*
╰━━━━━━━━━━━━━━━━━●◌

> *- 🚀 POWERED BY SILA MD*
> *- 📞 Prefix: ${prefix}*
> *- 📊 Total Commands: 100+*
> *- 🕐 Time: ${new Date().toLocaleTimeString()}*

*📌 Quick Tips:*
• Use *${prefix}command* to execute
• Tag me for immediate response
• Report bugs to owner
• Read group rules before using`

    // Send menu with video
    try {
        await conn.sendMessage(from, {
            video: { url: 'https://files.catbox.moe/qwftws.mp4' },
            caption: menuText,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402325089913@newsletter',
                    newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek })
        
        // Send additional info
        await conn.sendMessage(from, {
            text: `*📋 QUICK ACCESS*\n\n` +
                  `*🔹 ${prefix}ginfo* - Group Information\n` +
                  `*🔹 ${prefix}games* - Games Menu\n` +
                  `*🔹 ${prefix}economy* - Economy System\n` +
                  `*🔹 ${prefix}ownermenu* - Owner Controls\n` +
                  `*🔹 ${prefix}groupmenu* - Group Controls\n\n` +
                  `*🤖 Type ${prefix} followed by any command above*`,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true
            }
        })
        
    } catch (e) {
        // Fallback if video fails
        await conn.sendMessage(from, {
            text: menuText,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402325089913@newsletter',
                    newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek })
    }
    
} catch (e) {
    const errorMenu = `
*╭━━━━━━━━━━━━━━━━●◌*
*│ 🤖 Greet :* *Hello 👋*
*│ 🏷️ Bot Name :* SILA MD
*│ ⏰ Run Time :* Error
*│ 📱 Status :* Menu Error
*╰━━━━━━━━━━━━━━━━●◌*

*❌ ERROR LOADING FULL MENU*

*🔹 Use these commands instead:*
• ${prefix}ginfo - Group Info
• ${prefix}games - Games
• ${prefix}economy - Economy
• ${prefix}groupmenu - Group Menu
• ${prefix}ownermenu - Owner Menu

> *- 🚀 POWERED BY SILA MD*
> *- 📞 Contact owner for help*`
    
    await conn.sendMessage(from, { text: errorMenu })
    l(e)
}
})

// QUICK MENU COMMAND
cmd({
    pattern: "silamenu",
    alais: ["smenu", "fastmenu", "minimenu"],
    react: "⚡",
    desc: "Quick commands menu",
    category: "general",
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    const quickMenu = `
*╭━━━━━━━━━━━━━━━━●◌*
*│ ⚡ QUICK MENU SILA MD*
*│ 📊 Total Commands: 100+*
*│ 🎯 Category: 10 Sections*
*╰━━━━━━━━━━━━━━━━●◌*

*🎮 MOST USED COMMANDS*

╭━━━━━━━━━━━━━━━━━●◌
│ *${prefix}menu* - Full Menu
│ *${prefix}ginfo* - Group Info
│ *${prefix}tagall* - Tag Everyone
│ *${prefix}games* - Games Menu
│ *${prefix}sticker* - Make Sticker
│ *${prefix}song* - Download Song
│ *${prefix}video* - Download Video
│ *${prefix}ai* - Chat With AI
╰━━━━━━━━━━━━━━━━━●◌

*👥 GROUP MANAGEMENT*

╭━━━━━━━━━━━━━━━━━●◌
│ *${prefix}mute* - Mute Group
│ *${prefix}unmute* - Unmute Group
│ *${prefix}kick* - Remove Member
│ *${prefix}add* - Add Member
│ *${prefix}promote* - Make Admin
│ *${prefix}demote* - Remove Admin
│ *${prefix}link* - Group Link
│ *${prefix}rules* - Group Rules
╰━━━━━━━━━━━━━━━━━●◌

*💰 ECONOMY & FUN*

╭━━━━━━━━━━━━━━━━━●◌
│ *${prefix}daily* - Daily Reward
│ *${prefix}shop* - Group Shop
│ *${prefix}quiz* - Quiz Game
│ *${prefix}event* - Create Event
│ *${prefix}music* - Music Player
│ *${prefix}theme* - Change Theme
│ *${prefix}roulette* - Random Select
│ *${prefix}countdown* - Timer
╰━━━━━━━━━━━━━━━━━●◌

*⚙️ ADMIN TOOLS*

╭━━━━━━━━━━━━━━━━━●◌
│ *${prefix}announce* - Announcement
│ *${prefix}report* - Report User
│ *${prefix}warn* - Warn User
│ *${prefix}clean* - Clean Content
│ *${prefix}filter* - Content Filter
│ *${prefix}backup* - Backup Data
│ *${prefix}search* - Search Group
│ *${prefix}hidetag* - Hidden Tag
╰━━━━━━━━━━━━━━━━━●◌

> *- 🚀 POWERED BY SILA MD*
> *- 📞 Prefix: ${prefix}*
> *- ⏰ ${new Date().toLocaleTimeString()}*
> *- 📱 Type ${prefix}menu for full list*`

    // Send with image
    try {
        await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/277zt9.jpg' },
            caption: quickMenu,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402325089913@newsletter',
                    newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek })
    } catch (e) {
        await conn.sendMessage(from, { text: quickMenu })
    }
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → ' + e.message + '\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃')
    l(e)
}
})
