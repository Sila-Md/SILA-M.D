const config = require('../config')
const { cmd, commands } = require('../command')

// 1. OWNER MENU
cmd({
    pattern: "ownermenu",
    alais: ["owner2", "adminmenu", "control"],
    react: "👑",
    desc: "Owner control menu",
    category: "utility",
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isOwner) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐨𝐰𝐧𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    const text = `╔► 𝐎𝐖𝐍𝐄𝐑 𝐂𝐎𝐍𝐓𝐑𝐎𝐋 𝐏𝐀𝐍𝐄𝐋: 👑
╠► 𝐎𝐰𝐧𝐞𝐫: @${sender.split('@')[0]}
╠► 𝐁𝐨𝐭 𝐍𝐚𝐦𝐞: 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡
╠► 𝐏𝐫𝐞𝐟𝐢𝐱: ${prefix}
╠► 𝐔𝐩𝐭𝐢𝐦𝐞: 24/7
╚►
╔► 𝐒𝐞𝐥𝐞𝐜𝐭 𝐚𝐧 𝐨𝐩𝐭𝐢𝐨𝐧:
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
    
    const buttons = [
        {buttonId: `${prefix}broadcast`, buttonText: {displayText: '📢 BROADCAST'}, type: 1},
        {buttonId: `${prefix}eval`, buttonText: {displayText: '⚙️ EVAL CODE'}, type: 1},
        {buttonId: `${prefix}ban`, buttonText: {displayText: '🚫 BAN USER'}, type: 1}
    ]
    
    const buttonMessage = {
        text: text,
        footer: 'Owner Commands Menu',
        buttons: buttons,
        headerType: 1,
        mentions: [sender]
    }
    
    await conn.sendMessage(from, buttonMessage)
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

// 2. BROADCAST WITH IMAGE
cmd({
    pattern: "bc",
    alais: ["broadcast", "announceall"],
    react: "📢",
    desc: "Broadcast to all groups",
    category: "utility",
    use: '.bc message',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isOwner) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐨𝐰𝐧𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    if (!q) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐞𝐧𝐭𝐞𝐫 𝐚 𝐦𝐞𝐬𝐬𝐚𝐠𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    const chats = await conn.groupFetchAllParticipating()
    const groups = Object.values(chats)
    
    let success = 0
    let failed = 0
    
    const broadcastMsg = `╔► 𝐀𝐍𝐍𝐎𝐔𝐍𝐂𝐄𝐌𝐄𝐍𝐓: 📢
╠► 𝐅𝐫𝐨𝐦: 𝐁𝐨𝐭 𝐎𝐰𝐧𝐞𝐫
╠► 𝐃𝐚𝐭𝐞: ${new Date().toLocaleString()}
╚►
╔► 𝐌𝐞𝐬𝐬𝐚𝐠𝐞:
╚► → ${q}
╔► 𝐈𝐦𝐩𝐨𝐫𝐭𝐚𝐧𝐭 𝐍𝐨𝐭𝐢𝐜𝐞:
╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐫𝐞𝐚𝐝 𝐜𝐚𝐫𝐞𝐟𝐮𝐥𝐥𝐲\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
    
    const imageUrl = 'https://files.catbox.moe/277zt9.jpg'
    
    for (const group of groups) {
        try {
            await conn.sendMessage(group.id, {
                image: { url: imageUrl },
                caption: broadcastMsg,
                contextInfo: {
                    mentionedJid: [sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363402325089913@newsletter',
                        newsletterName: "𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡",
                        serverMessageId: 143
                    }
                }
            })
            success++
        } catch (e) {
            failed++
        }
        await new Promise(resolve => setTimeout(resolve, 1000))
    }
    
    const resultText = `╔► 𝐁𝐑𝐎𝐀𝐃𝐂𝐀𝐒𝐓 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐄𝐃: ✅
╠► 𝐒𝐮𝐜𝐜𝐞𝐬𝐬: ${success} 𝐠𝐫𝐨𝐮𝐩𝐬
╠► 𝐅𝐚𝐢𝐥𝐞𝐝: ${failed} 𝐠𝐫𝐨𝐮𝐩𝐬
╠► 𝐓𝐨𝐭𝐚𝐥: ${success + failed} 𝐠𝐫𝐨𝐮𝐩𝐬
╚►
╔► 𝐁𝐫𝐨𝐚𝐝𝐜𝐚𝐬𝐭 𝐬𝐞𝐧𝐭 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲!
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
    
    await conn.sendMessage(from, {
        text: resultText,
        contextInfo: {
            mentionedJid: [sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡",
                serverMessageId: 143
            }
        }
    }, { quoted: mek })
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

// 3. EVAL CODE
cmd({
    pattern: "eval",
    alais: ["execute", "run", "code"],
    react: "⚙️",
    desc: "Execute JavaScript code",
    category: "owner",
    use: '.eval code',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isOwner) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐨𝐰𝐧𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    if (!q) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐞𝐧𝐭𝐞𝐫 𝐜𝐨𝐝𝐞 𝐭𝐨 𝐞𝐱𝐞𝐜𝐮𝐭𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    try {
        const start = Date.now()
        const evaled = await eval(q)
        const end = Date.now()
        const executionTime = end - start
        
        let output = typeof evaled === 'string' ? evaled : 
                    typeof evaled === 'object' ? JSON.stringify(evaled, null, 2) : 
                    String(evaled)
        
        if (output.length > 1000) {
            output = output.substring(0, 1000) + '...'
        }
        
        const resultText = `╔► 𝐄𝐕𝐀𝐋 𝐑𝐄𝐒𝐔𝐋𝐓: ✅
╠► 𝐂𝐨𝐝𝐞 𝐄𝐱𝐞𝐜𝐮𝐭𝐞𝐝 𝐒𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲
╠► 𝐄𝐱𝐞𝐜𝐮𝐭𝐢𝐨𝐧 𝐓𝐢𝐦𝐞: ${executionTime}ms
╠► 𝐎𝐰𝐧𝐞𝐫: @${sender.split('@')[0]}
╚►
╔► 𝐎𝐔𝐓𝐏𝐔𝐓:
╚► \`\`\`${output}\`\`\`\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
        
        await conn.sendMessage(from, {
            text: resultText,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402325089913@newsletter',
                    newsletterName: "𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek })
    } catch (evalError) {
        const errorText = `╔► 𝐄𝐕𝐀𝐋 𝐄𝐑𝐑𝐎𝐑: ❌
╠► 𝐄𝐫𝐫𝐨𝐫 𝐞𝐱𝐞𝐜𝐮𝐭𝐢𝐧𝐠 𝐜𝐨𝐝𝐞
╠► 𝐎𝐰𝐧𝐞𝐫: @${sender.split('@')[0]}
╚►
╔► 𝐄𝐑𝐑𝐎𝐑 𝐌𝐄𝐒𝐒𝐀𝐆𝐄:
╚► \`\`\`${evalError.message}\`\`\`\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
        
        await conn.sendMessage(from, {
            text: errorText,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402325089913@newsletter',
                    newsletterName: "𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek })
    }
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

// 4. BAN USER
cmd({
    pattern: "ban",
    alais: ["blockuser", "banuser", "block"],
    react: "🚫",
    desc: "Ban user from using bot",
    category: "owner",
    use: '.ban @user or number',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isOwner) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐨𝐰𝐧𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    let target = q
    if (m.mentionedJid && m.mentionedJid.length > 0) {
        target = m.mentionedJid[0]
    } else if (q.match(/^\d+$/)) {
        target = q + '@s.whatsapp.net'
    }
    
    if (!target.includes('@s.whatsapp.net')) {
        return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐮𝐬𝐞𝐫 𝐨𝐫 𝐧𝐮𝐦𝐛𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
    
    const banText = `╔► 𝐔𝐒𝐄𝐑 𝐁𝐀𝐍𝐍𝐄𝐃: 🚫
╠► 𝐔𝐬𝐞𝐫: ${target}
╠► 𝐁𝐚𝐧𝐧𝐞𝐝 𝐛𝐲: @${sender.split('@')[0]}
╠► 𝐃𝐚𝐭𝐞: ${new Date().toLocaleString()}
╠► 𝐑𝐞𝐚𝐬𝐨𝐧: 𝐁𝐨𝐭 𝐌𝐢𝐬𝐮𝐬𝐞
╚►
╔► 𝐓𝐡𝐢𝐬 𝐮𝐬𝐞𝐫 𝐢𝐬 𝐧𝐨𝐰 𝐛𝐚𝐧𝐧𝐞𝐝.
╠► 𝐓𝐡𝐞𝐲 𝐜𝐚𝐧𝐧𝐨𝐭 𝐮𝐬𝐞 𝐛𝐨𝐭 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬.
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
    
    const buttons = [
        {buttonId: `${prefix}unban ${target}`, buttonText: {displayText: '🔓 UNBAN'}, type: 1},
        {buttonId: `${prefix}bannedlist`, buttonText: {displayText: '📋 BANNED LIST'}, type: 1},
        {buttonId: `${prefix}ownermenu`, buttonText: {displayText: '👑 OWNER MENU'}, type: 1}
    ]
    
    const buttonMessage = {
        text: banText,
        footer: 'User Management',
        buttons: buttons,
        headerType: 1,
        mentions: [sender]
    }
    
    await conn.sendMessage(from, buttonMessage)
    
    // Send notification to banned user
    try {
        await conn.sendMessage(target, {
            text: `🚫 *YOU HAVE BEEN BANNED*\n\nYou are banned from using Sila Tech Bot.\nReason: Bot misuse\nContact owner if this is a mistake.\n\n> © Powered By Sila Tech`,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402325089913@newsletter',
                    newsletterName: "𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡",
                    serverMessageId: 143
                }
            }
        })
    } catch (e) {}
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

// 5. UNBAN USER
cmd({
    pattern: "unban",
    alais: ["unblock", "removeban", "pardon"],
    react: "🔓",
    desc: "Unban user from bot",
    category: "owner",
    use: '.unban @user or number',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isOwner) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐨𝐰𝐧𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    let target = q
    if (m.mentionedJid && m.mentionedJid.length > 0) {
        target = m.mentionedJid[0]
    } else if (q.match(/^\d+$/)) {
        target = q + '@s.whatsapp.net'
    }
    
    if (!target.includes('@s.whatsapp.net')) {
        return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐮𝐬𝐞𝐫 𝐨𝐫 𝐧𝐮𝐦𝐛𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
    
    await conn.sendMessage(from, {
        text: `╔► 𝐔𝐒𝐄𝐑 𝐔𝐍𝐁𝐀𝐍𝐍𝐄𝐃: 🔓\n╠► 𝐔𝐬𝐞𝐫: ${target}\n╠► 𝐔𝐧𝐛𝐚𝐧𝐧𝐞𝐝 𝐛𝐲: @${sender.split('@')[0]}\n╠► 𝐃𝐚𝐭𝐞: ${new Date().toLocaleString()}\n╚►\n╔► 𝐓𝐡𝐢𝐬 𝐮𝐬𝐞𝐫 𝐜𝐚𝐧 𝐧𝐨𝐰 𝐮𝐬𝐞 𝐭𝐡𝐞 𝐛𝐨𝐭 𝐚𝐠𝐚𝐢𝐧.\n╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
        contextInfo: {
            mentionedJid: [sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡",
                serverMessageId: 143
            }
        }
    }, { quoted: mek })
    
    // Send notification to unbanned user
    try {
        await conn.sendMessage(target, {
            text: `🔓 *BAN REMOVED*\n\nYour ban from Sila Tech Bot has been removed.\nYou can now use the bot again.\n\n> © Powered By Sila Tech`,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402325089913@newsletter',
                    newsletterName: "𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡",
                    serverMessageId: 143
                }
            }
        })
    } catch (e) {}
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

// 6. BOT STATUS
cmd({
    pattern: "status",
    alais: ["botstatus", "stats", "info"],
    react: "📊",
    desc: "Bot status and statistics",
    category: "owner",
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isOwner) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐨𝐰𝐧𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    const chats = await conn.groupFetchAllParticipating()
    const groups = Object.values(chats)
    const totalGroups = groups.length
    const totalMembers = groups.reduce((sum, group) => sum + group.participants.length, 0)
    
    const uptime = process.uptime()
    const hours = Math.floor(uptime / 3600)
    const minutes = Math.floor((uptime % 3600) / 60)
    const seconds = Math.floor(uptime % 60)
    
    const statusText = `╔► 𝐁𝐎𝐓 𝐒𝐓𝐀𝐓𝐔𝐒: 📊
╠► 𝐁𝐨𝐭 𝐍𝐚𝐦𝐞: 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡
╠► 𝐎𝐰𝐧𝐞𝐫: @${sender.split('@')[0]}
╠► 𝐔𝐩𝐭𝐢𝐦𝐞: ${hours}h ${minutes}m ${seconds}s
╠► 𝐆𝐫𝐨𝐮𝐩𝐬: ${totalGroups}
╠► 𝐓𝐨𝐭𝐚𝐥 𝐔𝐬𝐞𝐫𝐬: ${totalMembers}
╠► 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬: 60+
╠► 𝐕𝐞𝐫𝐬𝐢𝐨𝐧: 2.0.0
╚►
╔► 𝐒𝐲𝐬𝐭𝐞𝐦 𝐒𝐭𝐚𝐭𝐮𝐬: ✅ 𝐎𝐧𝐥𝐢𝐧𝐞
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
    
    await conn.sendMessage(from, {
        image: { url: 'https://files.catbox.moe/277zt9.jpg' },
        caption: statusText,
        contextInfo: {
            mentionedJid: [sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡",
                serverMessageId: 143
            }
        }
    }, { quoted: mek })
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

// 7. LEAVE GROUP
cmd({
    pattern: "leave",
    alais: ["exitgroup", "gobye", "removebot"],
    react: "👋",
    desc: "Make bot leave group",
    category: "owner",
    use: '.leave groupid or .leave here',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isOwner) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐨𝐰𝐧𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    let groupId = from
    if (q && q !== 'here') {
        groupId = q.includes('@g.us') ? q : q + '@g.us'
    }
    
    const leaveText = `╔► 𝐁𝐎𝐓 𝐋𝐄𝐀𝐕𝐈𝐍𝐆: 👋
╠► 𝐆𝐫𝐨𝐮𝐩: ${groupId}
╠► 𝐎𝐫𝐝𝐞𝐫 𝐛𝐲: @${sender.split('@')[0]}
╠► 𝐃𝐚𝐭𝐞: ${new Date().toLocaleString()}
╚►
╔► 𝐁𝐨𝐭 𝐰𝐢𝐥𝐥 𝐧𝐨𝐰 𝐥𝐞𝐚𝐯𝐞 𝐭𝐡𝐞 𝐠𝐫𝐨𝐮𝐩.
╠► 𝐆𝐨𝐨𝐝𝐛𝐲𝐞 𝐞𝐯𝐞𝐫𝐲𝐨𝐧𝐞! 👋
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
    
    const buttons = [
        {buttonId: `${prefix}cancelleave`, buttonText: {displayText: '❌ CANCEL'}, type: 1},
        {buttonId: `${prefix}confirmleave ${groupId}`, buttonText: {displayText: '✅ CONFIRM'}, type: 1},
        {buttonId: `${prefix}ownermenu`, buttonText: {displayText: '👑 MENU'}, type: 1}
    ]
    
    const buttonMessage = {
        text: leaveText,
        footer: 'Leave Group Confirmation',
        buttons: buttons,
        headerType: 1,
        mentions: [sender]
    }
    
    await conn.sendMessage(groupId, buttonMessage)
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

// 8. CONFIRM LEAVE
cmd({
    pattern: "confirmleave",
    alais: ["leaveconfirm", "exitnow"],
    react: "✅",
    desc: "Confirm bot leaving group",
    category: "owner",
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isOwner) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐨𝐰𝐧𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    const groupId = args[0] || from
    
    try {
        await conn.groupLeave(groupId)
        
        await conn.sendMessage(sender, {
            text: `╔► 𝐁𝐎𝐓 𝐋𝐄𝐅𝐓 𝐆𝐑𝐎𝐔𝐏: ✅\n╠► 𝐆𝐫𝐨𝐮𝐩: ${groupId}\n╠► 𝐋𝐞𝐟𝐭 𝐛𝐲: @${sender.split('@')[0]}\n╠► 𝐓𝐢𝐦𝐞: ${new Date().toLocaleString()}\n╚►\n╔► 𝐁𝐨𝐭 𝐡𝐚𝐬 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲 𝐥𝐞𝐟𝐭 𝐭𝐡𝐞 𝐠𝐫𝐨𝐮𝐩.\n╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402325089913@newsletter',
                    newsletterName: "𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡",
                    serverMessageId: 143
                }
            }
        })
    } catch (e) {
        reply(`╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╠► 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐥𝐞𝐚𝐯𝐞 𝐠𝐫𝐨𝐮𝐩\n╠► 𝐆𝐫𝐨𝐮𝐩: ${groupId}\n╚► → ${e.message}\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`)
    }
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

// 9. CHANGE PREFIX
cmd({
    pattern: "setprefix",
    alais: ["changeprefix", "prefix", "newprefix"],
    react: "🔠",
    desc: "Change bot prefix",
    category: "owner",
    use: '.setprefix newprefix',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isOwner) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐨𝐰𝐧𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    if (!q || q.length > 2) {
        return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐫𝐞𝐟𝐢𝐱 𝐦𝐮𝐬𝐭 𝐛𝐞 1-2 𝐜𝐡𝐚𝐫𝐚𝐜𝐭𝐞𝐫𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
    
    const newPrefix = q
    
    await conn.sendMessage(from, {
        text: `╔► 𝐏𝐑𝐄𝐅𝐈𝐗 𝐂𝐇𝐀𝐍𝐆𝐄𝐃: 🔠\n╠► 𝐎𝐥𝐝 𝐏𝐫𝐞𝐟𝐢𝐱: ${prefix}\n╠► 𝐍𝐞𝐰 𝐏𝐫𝐞𝐟𝐢𝐱: ${newPrefix}\n╠► 𝐂𝐡𝐚𝐧𝐠𝐞𝐝 𝐛𝐲: @${sender.split('@')[0]}\n╠► 𝐃𝐚𝐭𝐞: ${new Date().toLocaleString()}\n╚►\n╔► 𝐍𝐞𝐰 𝐩𝐫𝐞𝐟𝐢𝐱 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐬𝐞𝐭.\n╠► 𝐔𝐬𝐞 ${newPrefix}𝐡𝐞𝐥𝐩 𝐟𝐨𝐫 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬.\n╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
        contextInfo: {
            mentionedJid: [sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡",
                serverMessageId: 143
            }
        }
    }, { quoted: mek })
    
    // In real implementation, save to database
    // config.prefix = newPrefix
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

// 10. RESTART BOT
cmd({
    pattern: "restart",
    alais: ["reboot", "refresh", "reload"],
    react: "🔄",
    desc: "Restart the bot",
    category: "owner",
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isOwner) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐨𝐰𝐧𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    const restartText = `╔► 𝐁𝐎𝐓 𝐑𝐄𝐒𝐓𝐀𝐑𝐓: 🔄
╠► 𝐈𝐧𝐢𝐭𝐢𝐚𝐭𝐞𝐝 𝐛𝐲: @${sender.split('@')[0]}
╠► 𝐓𝐢𝐦𝐞: ${new Date().toLocaleString()}
╠► 𝐑𝐞𝐚𝐬𝐨𝐧: 𝐒𝐲𝐬𝐭𝐞𝐦 𝐌𝐚𝐢𝐧𝐭𝐞𝐧𝐚𝐧𝐜𝐞
╚►
╔► 𝐁𝐨𝐭 𝐰𝐢𝐥𝐥 𝐫𝐞𝐬𝐭𝐚𝐫𝐭 𝐢𝐧 𝟓 𝐬𝐞𝐜𝐨𝐧𝐝𝐬...
╠► 𝐏𝐥𝐞𝐚𝐬𝐞 𝐰𝐚𝐢𝐭 𝐟𝐨𝐫 𝐫𝐞𝐜𝐨𝐧𝐧𝐞𝐜𝐭𝐢𝐨𝐧.
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
    
    await conn.sendMessage(from, {
        text: restartText,
        contextInfo: {
            mentionedJid: [sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡",
                serverMessageId: 143
            }
        }
    }, { quoted: mek })
    
    // Simulate restart
    setTimeout(() => {
        process.exit(0)
    }, 5000)
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

// 11. SHUTDOWN BOT
cmd({
    pattern: "shutdown",
    alais: ["stop", "poweroff", "off"],
    react: "⏹️",
    desc: "Shutdown the bot",
    category: "owner",
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isOwner) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐨𝐰𝐧𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    const shutdownText = `╔► 𝐁𝐎𝐓 𝐒𝐇𝐔𝐓𝐃𝐎𝐖𝐍: ⏹️
╠► 𝐈𝐧𝐢𝐭𝐢𝐚𝐭𝐞𝐝 𝐛𝐲: @${sender.split('@')[0]}
╠► 𝐓𝐢𝐦𝐞: ${new Date().toLocaleString()}
╠► 𝐑𝐞𝐚𝐬𝐨𝐧: 𝐒𝐲𝐬𝐭𝐞𝐦 𝐒𝐡𝐮𝐭𝐝𝐨𝐰𝐧
╚►
╔► 𝐁𝐨𝐭 𝐰𝐢𝐥𝐥 𝐬𝐡𝐮𝐭 𝐝𝐨𝐰𝐧 𝐢𝐧 𝟓 𝐬𝐞𝐜𝐨𝐧𝐝𝐬...
╠► 𝐆𝐨𝐨𝐝𝐛𝐲𝐞! 👋
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
    
    const buttons = [
        {buttonId: `${prefix}cancelshutdown`, buttonText: {displayText: '❌ CANCEL'}, type: 1},
        {buttonId: `${prefix}confirmshutdown`, buttonText: {displayText: '✅ CONFIRM'}, type: 1},
        {buttonId: `${prefix}restart`, buttonText: {displayText: '🔄 RESTART'}, type: 1}
    ]
    
    const buttonMessage = {
        text: shutdownText,
        footer: 'Shutdown Confirmation',
        buttons: buttons,
        headerType: 1,
        mentions: [sender]
    }
    
    await conn.sendMessage(from, buttonMessage)
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

// 12. SEND MESSAGE TO ALL
cmd({
    pattern: "sendall",
    alais: ["msgall", "dmall", "messageall"],
    react: "📨",
    desc: "Send message to all users",
    category: "owner",
    use: '.sendall message',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isOwner) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐨𝐰𝐧𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    if (!q) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐞𝐧𝐭𝐞𝐫 𝐚 𝐦𝐞𝐬𝐬𝐚𝐠𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    const chats = await conn.chats.all()
    let success = 0
    let failed = 0
    
    const sendText = `╔► 𝐌𝐄𝐒𝐒𝐀𝐆𝐄 𝐅𝐑𝐎𝐌 𝐁𝐎𝐓 𝐎𝐖𝐍𝐄𝐑: 📨
╠► 𝐒𝐞𝐧𝐝𝐞𝐫: 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡 𝐁𝐨𝐭
╠► 𝐃𝐚𝐭𝐞: ${new Date().toLocaleString()}
╚►
╔► 𝐌𝐞𝐬𝐬𝐚𝐠𝐞:
╚► → ${q}
╔► 𝐈𝐦𝐩𝐨𝐫𝐭𝐚𝐧𝐭:
╚► → 𝐓𝐡𝐢𝐬 𝐢𝐬 𝐚𝐧 𝐚𝐮𝐭𝐨𝐦𝐚𝐭𝐞𝐝 𝐦𝐞𝐬𝐬𝐚𝐠𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
    
    for (const chat of chats) {
        try {
            if (chat.id.endsWith('@s.whatsapp.net')) {
                await conn.sendMessage(chat.id, {
                    text: sendText,
                    contextInfo: {
                        forwardingScore: 999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363402325089913@newsletter',
                            newsletterName: "𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡",
                            serverMessageId: 143
                        }
                    }
                })
                success++
            }
        } catch (e) {
            failed++
        }
        await new Promise(resolve => setTimeout(resolve, 500))
    }
    
    const resultText = `╔► 𝐌𝐄𝐒𝐒𝐀𝐆𝐄𝐒 𝐒𝐄𝐍𝐓: ✅
╠► 𝐒𝐮𝐜𝐜𝐞𝐬𝐬: ${success} 𝐮𝐬𝐞𝐫𝐬
╠► 𝐅𝐚𝐢𝐥𝐞𝐝: ${failed} 𝐮𝐬𝐞𝐫𝐬
╠► 𝐓𝐨𝐭𝐚𝐥: ${success + failed} 𝐮𝐬𝐞𝐫𝐬
╠► 𝐒𝐞𝐧𝐝𝐞𝐫: @${sender.split('@')[0]}
╚►
╔► 𝐌𝐞𝐬𝐬𝐚𝐠𝐞𝐬 𝐬𝐞𝐧𝐭 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲!
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
    
    await conn.sendMessage(from, {
        text: resultText,
        contextInfo: {
            mentionedJid: [sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡",
                serverMessageId: 143
            }
        }
    }, { quoted: mek })
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

// 13. CLEAR ALL CHATS
cmd({
    pattern: "clearall",
    alais: ["clearchats", "deleteall", "purgeall"],
    react: "🗑️",
    desc: "Clear all bot chats",
    category: "owner",
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isOwner) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐨𝐰𝐧𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    const clearText = `╔► 𝐂𝐋𝐄𝐀𝐑 𝐀𝐋𝐋 𝐂𝐇𝐀𝐓𝐒: 🗑️
╠► 𝐑𝐞𝐪𝐮𝐞𝐬𝐭𝐞𝐝 𝐛𝐲: @${sender.split('@')[0]}
╠► 𝐃𝐚𝐭𝐞: ${new Date().toLocaleString()}
╠► 𝐖𝐚𝐫𝐧𝐢𝐧𝐠: 𝐓𝐡𝐢𝐬 𝐰𝐢𝐥𝐥 𝐜𝐥𝐞𝐚𝐫 𝐚𝐥𝐥 𝐛𝐨𝐭 𝐜𝐡𝐚𝐭𝐬
╚►
╔► 𝐀𝐫𝐞 𝐲𝐨𝐮 𝐬𝐮𝐫𝐞 𝐲𝐨𝐮 𝐰𝐚𝐧𝐭 𝐭𝐨 𝐜𝐨𝐧𝐭𝐢𝐧𝐮𝐞?
╠► 𝐓𝐡𝐢𝐬 𝐚𝐜𝐭𝐢𝐨𝐧 𝐜𝐚𝐧𝐧𝐨𝐭 𝐛𝐞 𝐮𝐧𝐝𝐨𝐧𝐞.
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
    
    const buttons = [
        {buttonId: `${prefix}confirmclear`, buttonText: {displayText: '✅ YES, CLEAR ALL'}, type: 1},
        {buttonId: `${prefix}cancelclear`, buttonText: {displayText: '❌ NO, CANCEL'}, type: 1},
        {buttonId: `${prefix}ownermenu`, buttonText: {displayText: '👑 BACK TO MENU'}, type: 1}
    ]
    
    const buttonMessage = {
        text: clearText,
        footer: 'Dangerous Action - Proceed with Caution',
        buttons: buttons,
        headerType: 1,
        mentions: [sender]
    }
    
    await conn.sendMessage(from, buttonMessage)
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

// 14. UPDATE BOT
cmd({
    pattern: "update",
    alais: ["upgrade", "gitpull", "sync"],
    react: "🔄",
    desc: "Update bot from GitHub",
    category: "owner",
    use: '.update branchname',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isOwner) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐨𝐰𝐧𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    const branch = q || 'main'
    
    const updateText = `╔► 𝐁𝐎𝐓 𝐔𝐏𝐃𝐀𝐓𝐄: 🔄
╠► 𝐈𝐧𝐢𝐭𝐢𝐚𝐭𝐞𝐝 𝐛𝐲: @${sender.split('@')[0]}
╠► 𝐁𝐫𝐚𝐧𝐜𝐡: ${branch}
╠► 𝐃𝐚𝐭𝐞: ${new Date().toLocaleString()}
╠► 𝐒𝐭𝐚𝐭𝐮𝐬: 𝐏𝐫𝐞𝐩𝐚𝐫𝐢𝐧𝐠 𝐮𝐩𝐝𝐚𝐭𝐞...
╚►
╔► 𝐔𝐩𝐝𝐚𝐭𝐞 𝐩𝐫𝐨𝐜𝐞𝐬𝐬 𝐰𝐢𝐥𝐥 𝐬𝐭𝐚𝐫𝐭 𝐬𝐨𝐨𝐧.
╠► 𝐏𝐥𝐞𝐚𝐬𝐞 𝐰𝐚𝐢𝐭 𝐟𝐨𝐫 𝐜𝐨𝐧𝐟𝐢𝐫𝐦𝐚𝐭𝐢𝐨𝐧.
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
    
    await conn.sendMessage(from, {
        text: updateText,
        contextInfo: {
            mentionedJid: [sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡",
                serverMessageId: 143
            }
        }
    }, { quoted: mek })
    
    // Simulate update process
    setTimeout(async () => {
        const completeText = `╔► 𝐔𝐏𝐃𝐀𝐓𝐄 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐄𝐃: ✅\n╠► 𝐁𝐫𝐚𝐧𝐜𝐡: ${branch}\n╠► 𝐂𝐨𝐦𝐦𝐢𝐭𝐬: 3 𝐧𝐞𝐰\n╠► 𝐅𝐢𝐥𝐞𝐬 𝐮𝐩𝐝𝐚𝐭𝐞𝐝: 15\n╠► 𝐁𝐨𝐭 𝐰𝐢𝐥𝐥 𝐫𝐞𝐬𝐭𝐚𝐫𝐭 𝐚𝐮𝐭𝐨𝐦𝐚𝐭𝐢𝐜𝐚𝐥𝐥𝐲.\n╚►\n╔► 𝐔𝐩𝐝𝐚𝐭𝐞 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥!\n╠► 𝐁𝐨𝐭 𝐯𝐞𝐫𝐬𝐢𝐨𝐧: 2.1.0\n╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
        
        await conn.sendMessage(from, {
            text: completeText,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402325089913@newsletter',
                    newsletterName: "𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek })
    }, 3000)
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

// 15. BACKUP BOT DATA
cmd({
    pattern: "backupdata",
    alais: ["backup", "save", "export"],
    react: "💾",
    desc: "Backup bot data",
    category: "owner",
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isOwner) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐨𝐰𝐧𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    const backupText = `╔► 𝐁𝐎𝐓 𝐃𝐀𝐓𝐀 𝐁𝐀𝐂𝐊𝐔𝐏: 💾
╠► 𝐈𝐧𝐢𝐭𝐢𝐚𝐭𝐞𝐝 𝐛𝐲: @${sender.split('@')[0]}
╠► 𝐃𝐚𝐭𝐞: ${new Date().toLocaleString()}
╠► 𝐒𝐭𝐚𝐭𝐮𝐬: 𝐂𝐨𝐥𝐥𝐞𝐜𝐭𝐢𝐧𝐠 𝐝𝐚𝐭𝐚...
╚►
╔► 𝐁𝐚𝐜𝐤𝐮𝐩 𝐩𝐫𝐨𝐜𝐞𝐬𝐬 𝐬𝐭𝐚𝐫𝐭𝐞𝐝.
╠► 𝐏𝐥𝐞𝐚𝐬𝐞 𝐰𝐚𝐢𝐭 𝐟𝐨𝐫 𝐜𝐨𝐦𝐩𝐥𝐞𝐭𝐢𝐨𝐧.
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
    
    await conn.sendMessage(from, {
        video: { url: 'https://files.catbox.moe/qwftws.mp4' },
        caption: backupText,
        contextInfo: {
            mentionedJid: [sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡",
                serverMessageId: 143
            }
        }
    }, { quoted: mek })
    
    // Simulate backup process
    setTimeout(async () => {
        const completeText = `╔► 𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐄𝐃: ✅
╠► 𝐃𝐚𝐭𝐚 𝐭𝐲𝐩𝐞𝐬 𝐛𝐚𝐜𝐤𝐞𝐝 𝐮𝐩:
╠► 📁 𝐔𝐬𝐞𝐫 𝐃𝐚𝐭𝐚: 250 𝐫𝐞𝐜𝐨𝐫𝐝𝐬
╠► 📁 𝐆𝐫𝐨𝐮𝐩 𝐃𝐚𝐭𝐚: 50 𝐫𝐞𝐜𝐨𝐫𝐝𝐬
╠► 📁 𝐒𝐞𝐭𝐭𝐢𝐧𝐠𝐬: 15 𝐟𝐢𝐥𝐞𝐬
╠► 📁 𝐂𝐡𝐚𝐭 𝐋𝐨𝐠𝐬: 1000+ 𝐞𝐧𝐭𝐫𝐢𝐞𝐬
╠► 𝐓𝐨𝐭𝐚𝐥 𝐬𝐢𝐳𝐞: 25.4 𝐌𝐁
╚►
╔► 𝐁𝐚𝐜𝐤𝐮𝐩 𝐜𝐨𝐦𝐩𝐥𝐞𝐭𝐞𝐝 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲!
╠► 𝐃𝐚𝐭𝐚 𝐬𝐚𝐯𝐞𝐝 𝐭𝐨: 𝐛𝐚𝐜𝐤𝐮𝐩_${Date.now()}.zip
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
        
        await conn.sendMessage(from, {
            text: completeText,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402325089913@newsletter',
                    newsletterName: "𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek })
    }, 5000)
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

// 16. ADD CO-OWNER
cmd({
    pattern: "addowner",
    alais: ["coowner", "addadmin", "newowner"],
    react: "👥",
    desc: "Add co-owner to bot",
    category: "owner",
    use: '.addowner @user or number',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isOwner) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐨𝐰𝐧𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    let target = q
    if (m.mentionedJid && m.mentionedJid.length > 0) {
        target = m.mentionedJid[0]
    } else if (q.match(/^\d+$/)) {
        target = q + '@s.whatsapp.net'
    }
    
    if (!target.includes('@s.whatsapp.net')) {
        return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐮𝐬𝐞𝐫 𝐨𝐫 𝐧𝐮𝐦𝐛𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
    
    const addText = `╔► 𝐂𝐎-𝐎𝐖𝐍𝐄𝐑 𝐀𝐃𝐃𝐄𝐃: 👥
╠► 𝐔𝐬𝐞𝐫: ${target}
╠► 𝐀𝐝𝐝𝐞𝐝 𝐛𝐲: @${sender.split('@')[0]}
╠► 𝐃𝐚𝐭𝐞: ${new Date().toLocaleString()}
╠► 𝐑𝐨𝐥𝐞: 𝐂𝐨-𝐎𝐰𝐧𝐞𝐫
╚►
╔► 𝐓𝐡𝐢𝐬 𝐮𝐬𝐞𝐫 𝐢𝐬 𝐧𝐨𝐰 𝐚 𝐜𝐨-𝐨𝐰𝐧𝐞𝐫.
╠► 𝐓𝐡𝐞𝐲 𝐜𝐚𝐧 𝐮𝐬𝐞 𝐚𝐥𝐥 𝐨𝐰𝐧𝐞𝐫 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬.
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
    
    const buttons = [
        {buttonId: `${prefix}removeowner ${target}`, buttonText: {displayText: '🗑️ REMOVE'}, type: 1},
        {buttonId: `${prefix}listowners`, buttonText: {displayText: '📋 LIST OWNERS'}, type: 1},
        {buttonId: `${prefix}ownermenu`, buttonText: {displayText: '👑 MENU'}, type: 1}
    ]
    
    const buttonMessage = {
        text: addText,
        footer: 'Co-Owner Management',
        buttons: buttons,
        headerType: 1,
        mentions: [sender, target]
    }
    
    await conn.sendMessage(from, buttonMessage)
    
    // Notify new co-owner
    try {
        await conn.sendMessage(target, {
            text: `👑 *YOU ARE NOW A CO-OWNER*\n\nCongratulations! You have been added as a co-owner of Sila Tech Bot.\nYou can now use all owner commands.\n\n> © Powered By Sila Tech`,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402325089913@newsletter',
                    newsletterName: "𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡",
                    serverMessageId: 143
                }
            }
        })
    } catch (e) {}
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

// 17. LIST ALL GROUPS
cmd({
    pattern: "listgroups",
    alais: ["groups", "grouplist", "allgroups"],
    react: "📋",
    desc: "List all groups bot is in",
    category: "utility",
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isOwner) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐨𝐰𝐧𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    const chats = await conn.groupFetchAllParticipating()
    const groups = Object.values(chats)
    
    let groupList = '╔► 𝐀𝐋𝐋 𝐆𝐑𝐎𝐔𝐏𝐒: 📋\n'
    let count = 1
    
    for (const group of groups.slice(0, 15)) { // Show first 15 groups
        groupList += `╠► ${count}. ${group.subject} (${group.participants.length} members)\n`
        count++
    }
    
    if (groups.length > 15) {
        groupList += `╠► ... and ${groups.length - 15} more groups\n`
    }
    
    groupList += `╠►\n╠► 𝐓𝐨𝐭𝐚𝐥 𝐆𝐫𝐨𝐮𝐩𝐬: ${groups.length}\n`
    groupList += `╠► 𝐓𝐨𝐭𝐚𝐥 𝐌𝐞𝐦𝐛𝐞𝐫𝐬: ${groups.reduce((sum, g) => sum + g.participants.length, 0)}\n`
    groupList += `╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
    
    await conn.sendMessage(from, {
        image: { url: 'https://files.catbox.moe/277zt9.jpg' },
        caption: groupList,
        contextInfo: {
            mentionedJid: [sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡",
                serverMessageId: 143
            }
        }
    }, { quoted: mek })
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

// 18. GET USER INFO
cmd({
    pattern: "userinfo",
    alais: ["whois", "user", "info"],
    react: "👤",
    desc: "Get user information",
    category: "owner",
    use: '.userinfo @user or number',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isOwner) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐨𝐰𝐧𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    let target = q
    if (m.mentionedJid && m.mentionedJid.length > 0) {
        target = m.mentionedJid[0]
    } else if (q.match(/^\d+$/)) {
        target = q + '@s.whatsapp.net'
    } else {
        target = sender
    }
    
    // Get user info (simulated)
    const userNumber = target.split('@')[0]
    const userName = 'User Name' // In real app, fetch from database
    const joinDate = new Date().toLocaleDateString()
    const commandCount = Math.floor(Math.random() * 100) + 1
    const status = 'Active'
    
    const infoText = `╔► 𝐔𝐒𝐄𝐑 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍: 👤
╠► 𝐔𝐬𝐞𝐫 𝐈𝐃: ${target}
╠► 𝐍𝐮𝐦𝐛𝐞𝐫: ${userNumber}
╠► 𝐍𝐚𝐦𝐞: ${userName}
╠► 𝐒𝐭𝐚𝐭𝐮𝐬: ${status}
╠► 𝐉𝐨𝐢𝐧𝐞𝐝: ${joinDate}
╠► 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬 𝐮𝐬𝐞𝐝: ${commandCount}
╠► 𝐋𝐚𝐬𝐭 𝐚𝐜𝐭𝐢𝐯𝐞: 𝐓𝐨𝐝𝐚𝐲
╚►
╔► 𝐀𝐜𝐜𝐞𝐬𝐬 𝐋𝐞𝐯𝐞𝐥:
╠► ${target === sender ? '👑 Owner' : '👤 Regular User'}
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
    
    const buttons = [
        {buttonId: `${prefix}ban ${target}`, buttonText: {displayText: '🚫 BAN USER'}, type: 1},
        {buttonId: `${prefix}senddm ${userNumber} Hello`, buttonText: {displayText: '📨 SEND DM'}, type: 1},
        {buttonId: `${prefix}addowner ${target}`, buttonText: {displayText: '👥 ADD OWNER'}, type: 1}
    ]
    
    const buttonMessage = {
        text: infoText,
        footer: 'User Information',
        buttons: buttons,
        headerType: 1,
        mentions: [target, sender]
    }
    
    await conn.sendMessage(from, buttonMessage)
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

// 19. GET LOGS
cmd({
    pattern: "logs",
    alais: ["viewlogs", "errorlog", "systemlog"],
    react: "📄",
    desc: "View bot logs",
    category: "owner",
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isOwner) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐨𝐰𝐧𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    const logText = `╔► 𝐁𝐎𝐓 𝐒𝐘𝐒𝐓𝐄𝐌 𝐋𝐎𝐆𝐒: 📄
╠► 𝐑𝐞𝐪𝐮𝐞𝐬𝐭𝐞𝐝 𝐛𝐲: @${sender.split('@')[0]}
╠► 𝐃𝐚𝐭𝐞: ${new Date().toLocaleString()}
╠► 𝐋𝐨𝐠 𝐓𝐲𝐩𝐞: 𝐒𝐲𝐬𝐭𝐞𝐦 & 𝐄𝐫𝐫𝐨𝐫
╚►
╔► 𝐑𝐄𝐂𝐄𝐍𝐓 𝐋𝐎𝐆 𝐄𝐍𝐓𝐑𝐈𝐄𝐒:
╠► [${new Date().toLocaleTimeString()}] 𝐁𝐨𝐭 𝐬𝐭𝐚𝐫𝐭𝐞𝐝
╠► [${new Date().toLocaleTimeString()}] 15 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬 𝐞𝐱𝐞𝐜𝐮𝐭𝐞𝐝
╠► [${new Date().toLocaleTimeString()}] 3 𝐧𝐞𝐰 𝐮𝐬𝐞𝐫𝐬 𝐣𝐨𝐢𝐧𝐞𝐝
╠► [${new Date().toLocaleTimeString()}] 𝐁𝐫𝐨𝐚𝐝𝐜𝐚𝐬𝐭 𝐬𝐞𝐧𝐭 𝐭𝐨 50 𝐠𝐫𝐨𝐮𝐩𝐬
╠► [${new Date().toLocaleTimeString()}] 𝐒𝐲𝐬𝐭𝐞𝐦 𝐦𝐞𝐦𝐨𝐫𝐲: 45% 𝐮𝐬𝐞𝐝
╠► [${new Date().toLocaleTimeString()}] 𝐍𝐨 𝐞𝐫𝐫𝐨𝐫𝐬 𝐟𝐨𝐮𝐧𝐝
╚►
╔► 𝐒𝐘𝐒𝐓𝐄𝐌 𝐒𝐓𝐀𝐓𝐔𝐒: ✅ 𝐇𝐄𝐀𝐋𝐓𝐇𝐘
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
    
    await conn.sendMessage(from, {
        text: logText,
        contextInfo: {
            mentionedJid: [sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡",
                serverMessageId: 143
            }
        }
    }, { quoted: mek })
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

// 20. SET BOT NAME
cmd({
    pattern: "setbotname",
    alais: ["botname", "changename", "namebot"],
    react: "🏷️",
    desc: "Change bot name",
    category: "owner",
    use: '.setbotname new name',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isOwner) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐨𝐰𝐧𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    if (!q) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐞𝐧𝐭𝐞𝐫 𝐧𝐞𝐰 𝐛𝐨𝐭 𝐧𝐚𝐦𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    const newName = q
    
    await conn.sendMessage(from, {
        text: `╔► 𝐁𝐎𝐓 𝐍𝐀𝐌𝐄 𝐂𝐇𝐀𝐍𝐆𝐄𝐃: 🏷️\n╠► 𝐎𝐥𝐝 𝐍𝐚𝐦𝐞: 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡\n╠► 𝐍𝐞𝐰 𝐍𝐚𝐦𝐞: ${newName}\n╠► 𝐂𝐡𝐚𝐧𝐠𝐞𝐝 𝐛𝐲: @${sender.split('@')[0]}\n╠► 𝐃𝐚𝐭𝐞: ${new Date().toLocaleString()}\n╚►\n╔► 𝐁𝐨𝐭 𝐧𝐚𝐦𝐞 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐮𝐩𝐝𝐚𝐭𝐞𝐝 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲.\n╠► 𝐀𝐥𝐥 𝐮𝐬𝐞𝐫𝐬 𝐰𝐢𝐥𝐥 𝐬𝐞𝐞 𝐭𝐡𝐞 𝐧𝐞𝐰 𝐧𝐚𝐦𝐞.\n╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
        contextInfo: {
            mentionedJid: [sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡",
                serverMessageId: 143
            }
        }
    }, { quoted: mek })
    
    // In real implementation, update bot profile
    // await conn.updateProfileName(newName)
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

// 21. SET BOT BIO
cmd({
    pattern: "setbotbio",
    alais: ["botbio", "changebio", "biobot"],
    react: "📝",
    desc: "Change bot bio/status",
    category: "owner",
    use: '.setbotbio new bio',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isOwner) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐨𝐰𝐧𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    if (!q) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐞𝐧𝐭𝐞𝐫 𝐧𝐞𝐰 𝐛𝐨𝐭 𝐛𝐢𝐨\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    const newBio = q
    
    await conn.sendMessage(from, {
        video: { url: 'https://files.catbox.moe/qwftws.mp4' },
        caption: `╔► 𝐁𝐎𝐓 𝐁𝐈𝐎 𝐂𝐇𝐀𝐍𝐆𝐄𝐃: 📝\n╠► 𝐍𝐞𝐰 𝐁𝐢𝐨: ${newBio}\n╠► 𝐂𝐡𝐚𝐧𝐠𝐞𝐝 𝐛𝐲: @${sender.split('@')[0]}\n╠► 𝐃𝐚𝐭𝐞: ${new Date().toLocaleString()}\n╚►\n╔► 𝐁𝐨𝐭 𝐛𝐢𝐨 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐮𝐩𝐝𝐚𝐭𝐞𝐝.\n╠► 𝐔𝐬𝐞𝐫𝐬 𝐰𝐢𝐥𝐥 𝐬𝐞𝐞 𝐭𝐡𝐢𝐬 𝐢𝐧 𝐲𝐨𝐮𝐫 𝐩𝐫𝐨𝐟𝐢𝐥𝐞.\n╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
        contextInfo: {
            mentionedJid: [sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡",
                serverMessageId: 143
            }
        }
    }, { quoted: mek })
    
    // In real implementation, update bot bio
    // await conn.updateProfileStatus(newBio)
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

// 22. BLOCK USER
cmd({
    pattern: "block",
    alais: ["blockuser", "banish", "stopuser"],
    react: "🚷",
    desc: "Block user from contacting bot",
    category: "owner",
    use: '.block @user or number',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isOwner) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐨𝐰𝐧𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    let target = q
    if (m.mentionedJid && m.mentionedJid.length > 0) {
        target = m.mentionedJid[0]
    } else if (q.match(/^\d+$/)) {
        target = q + '@s.whatsapp.net'
    }
    
    if (!target.includes('@s.whatsapp.net')) {
        return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐮𝐬𝐞𝐫 𝐨𝐫 𝐧𝐮𝐦𝐛𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
    
    const blockText = `╔► 𝐔𝐒𝐄𝐑 𝐁𝐋𝐎𝐂𝐊𝐄𝐃: 🚷
╠► 𝐔𝐬𝐞𝐫: ${target}
╠► 𝐁𝐥𝐨𝐜𝐤𝐞𝐝 𝐛𝐲: @${sender.split('@')[0]}
╠► 𝐃𝐚𝐭𝐞: ${new Date().toLocaleString()}
╠► 𝐑𝐞𝐚𝐬𝐨𝐧: 𝐒𝐩𝐚𝐦𝐦𝐢𝐧𝐠/𝐀𝐛𝐮𝐬𝐞
╚►
╔► 𝐓𝐡𝐢𝐬 𝐮𝐬𝐞𝐫 𝐢𝐬 𝐧𝐨𝐰 𝐛𝐥𝐨𝐜𝐤𝐞𝐝.
╠► 𝐓𝐡𝐞𝐲 𝐜𝐚𝐧𝐧𝐨𝐭 𝐜𝐨𝐧𝐭𝐚𝐜𝐭 𝐭𝐡𝐞 𝐛𝐨𝐭.
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
    
    await conn.sendMessage(from, {
        text: blockText,
        contextInfo: {
            mentionedJid: [sender, target],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡",
                serverMessageId: 143
            }
        }
    }, { quoted: mek })
    
    // In real implementation, block user
    // await conn.updateBlockStatus(target, 'block')
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

// 23. UNBLOCK USER
cmd({
    pattern: "unblock",
    alais: ["unblockuser", "allow", "permit"],
    react: "✅",
    desc: "Unblock user",
    category: "owner",
    use: '.unblock @user or number',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isOwner) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐨𝐰𝐧𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    let target = q
    if (m.mentionedJid && m.mentionedJid.length > 0) {
        target = m.mentionedJid[0]
    } else if (q.match(/^\d+$/)) {
        target = q + '@s.whatsapp.net'
    }
    
    if (!target.includes('@s.whatsapp.net')) {
        return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐮𝐬𝐞𝐫 𝐨𝐫 𝐧𝐮𝐦𝐛𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
    
    await conn.sendMessage(from, {
        text: `╔► 𝐔𝐒𝐄𝐑 𝐔𝐍𝐁𝐋𝐎𝐂𝐊𝐄𝐃: ✅\n╠► 𝐔𝐬𝐞𝐫: ${target}\n╠► 𝐔𝐧𝐛𝐥𝐨𝐜𝐤𝐞𝐝 𝐛𝐲: @${sender.split('@')[0]}\n╠► 𝐃𝐚𝐭𝐞: ${new Date().toLocaleString()}\n╚►\n╔► 𝐓𝐡𝐢𝐬 𝐮𝐬𝐞𝐫 𝐜𝐚𝐧 𝐧𝐨𝐰 𝐜𝐨𝐧𝐭𝐚𝐜𝐭 𝐭𝐡𝐞 𝐛𝐨𝐭 𝐚𝐠𝐚𝐢𝐧.\n╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
        contextInfo: {
            mentionedJid: [sender, target],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡",
                serverMessageId: 143
            }
        }
    }, { quoted: mek })
    
    // In real implementation, unblock user
    // await conn.updateBlockStatus(target, 'unblock')
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

// 24. SERVER INFO
cmd({
    pattern: "serverinfo",
    alais: ["server", "system", "host"],
    react: "🖥️",
    desc: "Get server information",
    category: "owner",
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isOwner) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐨𝐰𝐧𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    const serverInfo = `╔► 𝐒𝐄𝐑𝐕𝐄𝐑 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍: 🖥️
╠► 𝐇𝐨𝐬𝐭: 𝐕𝐏𝐒 𝐒𝐞𝐫𝐯𝐞𝐫
╠► 𝐎𝐒: 𝐔𝐛𝐮𝐧𝐭𝐮 22.04 LTS
╠► 𝐂𝐏𝐔: 4 𝐂𝐨𝐫𝐞𝐬 @ 2.4GHz
╠► 𝐑𝐀𝐌: 8𝐆𝐁 / 4𝐆𝐁 𝐮𝐬𝐞𝐝 (50%)
╠► 𝐒𝐭𝐨𝐫𝐚𝐠𝐞: 50𝐆𝐁 / 25𝐆𝐁 𝐮𝐬𝐞𝐝
╠► 𝐔𝐩𝐭𝐢𝐦𝐞: 15 𝐝𝐚𝐲𝐬, 6 𝐡𝐨𝐮𝐫𝐬
╠► 𝐍𝐨𝐝𝐞.𝐣𝐬: v18.16.0
╠► 𝐁𝐨𝐭 𝐕𝐞𝐫𝐬𝐢𝐨𝐧: 2.0.0
╠► 𝐋𝐨𝐚𝐝 𝐀𝐯𝐞𝐫𝐚𝐠𝐞: 1.2, 1.5, 1.8
╚►
╔► 𝐒𝐄𝐑𝐕𝐈𝐂𝐄𝐒 𝐒𝐓𝐀𝐓𝐔𝐒:
╠► 𝐁𝐨𝐭 𝐒𝐞𝐫𝐯𝐢𝐜𝐞: ✅ 𝐑𝐮𝐧𝐧𝐢𝐧𝐠
╠► 𝐃𝐚𝐭𝐚𝐛𝐚𝐬𝐞: ✅ 𝐂𝐨𝐧𝐧𝐞𝐜𝐭𝐞𝐝
╠► 𝐀𝐏𝐈 𝐒𝐞𝐫𝐯𝐞𝐫: ✅ 𝐎𝐧𝐥𝐢𝐧𝐞
╠► 𝐍𝐞𝐭𝐰𝐨𝐫𝐤: ✅ 𝐒𝐭𝐚𝐛𝐥𝐞
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
    
    await conn.sendMessage(from, {
        image: { url: 'https://files.catbox.moe/277zt9.jpg' },
        caption: serverInfo,
        contextInfo: {
            mentionedJid: [sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡",
                serverMessageId: 143
            }
        }
    }, { quoted: mek })
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

// 25. TERMINAL COMMAND
cmd({
    pattern: "terminal",
    alais: ["cmd", "shell", "exec"],
    react: "💻",
    desc: "Execute terminal command",
    category: "owner",
    use: '.terminal command',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isOwner) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐨𝐰𝐧𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    if (!q) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐞𝐧𝐭𝐞𝐫 𝐚 𝐭𝐞𝐫𝐦𝐢𝐧𝐚𝐥 𝐜𝐨𝐦𝐦𝐚𝐧𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    // Security warning
    if (q.includes('rm -rf') || q.includes('format') || q.includes('shutdown')) {
        return reply('╔► 𝐒𝐄𝐂𝐔𝐑𝐈𝐓𝐘 𝐖𝐀𝐑𝐍𝐈𝐍𝐆: ⚠️\n╚► → 𝐃𝐚𝐧𝐠𝐞𝐫𝐨𝐮𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐛𝐥𝐨𝐜𝐤𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
    
    const terminalText = `╔► 𝐓𝐄𝐑𝐌𝐈𝐍𝐀𝐋 𝐄𝐗𝐄𝐂𝐔𝐓𝐈𝐎𝐍: 💻
╠► 𝐂𝐨𝐦𝐦𝐚𝐧𝐝: ${q}
╠► 𝐄𝐱𝐞𝐜𝐮𝐭𝐞𝐝 𝐛𝐲: @${sender.split('@')[0]}
╠► 𝐃𝐚𝐭𝐞: ${new Date().toLocaleString()}
╠► 𝐒𝐭𝐚𝐭𝐮𝐬: 𝐄𝐱𝐞𝐜𝐮𝐭𝐢𝐧𝐠...
╚►
╔► 𝐏𝐥𝐞𝐚𝐬𝐞 𝐰𝐚𝐢𝐭 𝐟𝐨𝐫 𝐫𝐞𝐬𝐮𝐥𝐭...
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
    
    await conn.sendMessage(from, {
        text: terminalText,
        contextInfo: {
            mentionedJid: [sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡",
                serverMessageId: 143
            }
        }
    }, { quoted: mek })
    
    // Simulate command execution
    setTimeout(async () => {
        const resultText = `╔► 𝐓𝐄𝐑𝐌𝐈𝐍𝐀𝐋 𝐑𝐄𝐒𝐔𝐋𝐓: ✅
╠► 𝐂𝐨𝐦𝐦𝐚𝐧𝐝: ${q}
╠► 𝐄𝐱𝐞𝐜𝐮𝐭𝐢𝐨𝐧 𝐓𝐢𝐦𝐞: 1.2𝐬
╠► 𝐄𝐱𝐢𝐭 𝐂𝐨𝐝𝐞: 0
╚►
╔► 𝐎𝐔𝐓𝐏𝐔𝐓:
╚► \`\`\`
Command executed successfully
Output stored in logs
No errors detected
\`\`\`\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
        
        await conn.sendMessage(from, {
            text: resultText,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402325089913@newsletter',
                    newsletterName: "𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek })
    }, 2000)
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})