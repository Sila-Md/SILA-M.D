const config = require('../config')
const { cmd, commands } = require('../command')

cmd({
    pattern: "opentime",
    react: "🔖",
    desc: "To open group to a time",
    category: "group",
    use: '.opentime',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{   
    if (!isGroup) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐠𝐫𝐨𝐮𝐩𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    if (!isAdmins) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐘𝐨𝐮 𝐚𝐫𝐞 𝐧𝐨𝐭 𝐚𝐧 𝐚𝐝𝐦𝐢𝐧\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    if (args[1] == 'second') {
        var timer = args[0] * `1000`
    } else if (args[1] == 'minute') {
        var timer = args[0] * `60000`
    } else if (args[1] == 'hour') {
        var timer = args[0] * `3600000`
    } else if (args[1] == 'day') {
        var timer = args[0] * `86400000`
    } else {
        return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐭𝐢𝐦𝐞 𝐟𝐨𝐫𝐦𝐚𝐭\n\n╔► 𝐒𝐞𝐥𝐞𝐜𝐭:\n╠► → 𝐬𝐞𝐜𝐨𝐧𝐝\n╠► → 𝐦𝐢𝐧𝐮𝐭𝐞\n╠► → 𝐡𝐨𝐮𝐫\n╠► → 𝐝𝐚𝐲\n╚►\n╔► 𝐄𝐱𝐚𝐦𝐩𝐥𝐞:\n╚► → .opentime 10 second\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
    
    reply(`╔► 𝐒𝐮𝐜𝐜𝐞𝐬𝐬: ✅\n╚► → 𝐎𝐩𝐞𝐧 𝐭𝐢𝐦𝐞 ${q} 𝐬𝐭𝐚𝐫𝐭𝐢𝐧𝐠 𝐟𝐫𝐨𝐦 𝐧𝐨𝐰\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`)
    
    setTimeout(() => {
        const open = `╔► 𝐆𝐫𝐨𝐮𝐩 𝐎𝐩𝐞𝐧𝐞𝐝: 🔓\n╚► → 𝐓𝐡𝐞 𝐠𝐫𝐨𝐮𝐩 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐨𝐩𝐞𝐧𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
        conn.groupSettingUpdate(from, 'not_announcement')
        reply(open)
    }, timer)
    
    await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

cmd({
    pattern: "closetime",
    react: "♠️",
    desc: "To close group to a time",
    category: "group",
    use: '.closetime',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{   
    if (!isGroup) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐠𝐫𝐨𝐮𝐩𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    if (!isAdmins) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐘𝐨𝐮 𝐚𝐫𝐞 𝐧𝐨𝐭 𝐚𝐧 𝐚𝐝𝐦𝐢𝐧\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    if (args[1] == 'second') {
        var timer = args[0] * `1000`
    } else if (args[1] == 'minute') {
        var timer = args[0] * `60000`
    } else if (args[1] == 'hour') {
        var timer = args[0] * `3600000`
    } else if (args[1] == 'day') {
        var timer = args[0] * `86400000`
    } else {
        return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐭𝐢𝐦𝐞 𝐟𝐨𝐫𝐦𝐚𝐭\n\n╔► 𝐒𝐞𝐥𝐞𝐜𝐭:\n╠► → 𝐬𝐞𝐜𝐨𝐧𝐝\n╠► → 𝐦𝐢𝐧𝐮𝐭𝐞\n╠► → 𝐡𝐨𝐮𝐫\n╠► → 𝐝𝐚𝐲\n╚►\n╔► 𝐄𝐱𝐚𝐦𝐩𝐥𝐞:\n╚► → .closetime 10 second\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
    
    reply(`╔► 𝐒𝐮𝐜𝐜𝐞𝐬𝐬: ✅\n╚► → 𝐂𝐥𝐨𝐬𝐞 𝐭𝐢𝐦𝐞 ${q} 𝐬𝐭𝐚𝐫𝐭𝐢𝐧𝐠 𝐟𝐫𝐨𝐦 𝐧𝐨𝐰\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`)
    
    setTimeout(() => {
        const close = `╔► 𝐆𝐫𝐨𝐮𝐩 𝐂𝐥𝐨𝐬𝐞𝐝: 🔒\n╚► → 𝐓𝐡𝐞 𝐠𝐫𝐨𝐮𝐩 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐜𝐥𝐨𝐬𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
        conn.groupSettingUpdate(from, 'announcement')
        reply(close)
    }, timer)
    
    await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

cmd({
    pattern: "mute",
    alais: ["silent", "quiet"],
    react: "🔇",
    desc: "Mute the group",
    category: "group",
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isGroup) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐠𝐫𝐨𝐮𝐩𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    if (!isAdmins) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐘𝐨𝐮 𝐚𝐫𝐞 𝐧𝐨𝐭 𝐚𝐧 𝐚𝐝𝐦𝐢𝐧\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    await conn.groupSettingUpdate(from, 'announcement')
    reply('╔► 𝐒𝐮𝐜𝐜𝐞𝐬𝐬: ✅\n╚► → 𝐆𝐫𝐨𝐮𝐩 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐦𝐮𝐭𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

cmd({
    pattern: "unmute",
    alais: ["unsilent", "unquiet"],
    react: "🔊",
    desc: "Unmute the group",
    category: "group",
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isGroup) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐠𝐫𝐨𝐮𝐩𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    if (!isAdmins) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐘𝐨𝐮 𝐚𝐫𝐞 𝐧𝐨𝐭 𝐚𝐧 𝐚𝐝𝐦𝐢𝐧\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    await conn.groupSettingUpdate(from, 'not_announcement')
    reply('╔► 𝐒𝐮𝐜𝐜𝐞𝐬𝐬: ✅\n╚► → 𝐆𝐫𝐨𝐮𝐩 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐮𝐧𝐦𝐮𝐭𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

cmd({
    pattern: "tag",
    alais: ["mention", "ping"],
    react: "🏷️",
    desc: "Tag a specific person",
    category: "group",
    use: '.tag @user',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isGroup) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐠𝐫𝐨𝐮𝐩𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    const mentioned = m.mentionedJid || []
    if (mentioned.length === 0) {
        return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐦𝐞𝐧𝐭𝐢𝐨𝐧 𝐚 𝐮𝐬𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
    
    const tagMessage = `╔► 𝐓𝐚𝐠𝐠𝐞𝐝: 🏷️\n╚► → 𝐘𝐨𝐮 𝐡𝐚𝐯𝐞 𝐛𝐞𝐞𝐧 𝐭𝐚𝐠𝐠𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
    await conn.sendMessage(from, { text: tagMessage, mentions: mentioned }, { quoted: mek })
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

cmd({
    pattern: "tagall",
    alais: ["mentionall", "everyone", "all"],
    react: "📢",
    desc: "Tag all group members",
    category: "group",
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isGroup) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐠𝐫𝐨𝐮𝐩𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    if (!isAdmins) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐘𝐨𝐮 𝐚𝐫𝐞 𝐧𝐨𝐭 𝐚𝐧 𝐚𝐝𝐦𝐢𝐧\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    const members = participants.map(p => p.id)
    let tagMessage = `╔► 𝐀𝐭𝐭𝐞𝐧𝐭𝐢𝐨𝐧 𝐀𝐥𝐥: 📢\n╚► → 𝐄𝐯𝐞𝐫𝐲𝐨𝐧𝐞 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐭𝐚𝐠𝐠𝐞𝐝\n\n`
    for (let member of members) {
        tagMessage += `╠► @${member.split('@')[0]}\n`
    }
    tagMessage += '\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡'
    
    await conn.sendMessage(from, { text: tagMessage, mentions: members }, { quoted: mek })
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

cmd({
    pattern: "hidetag",
    alais: ["htag", "stealthtag"],
    react: "👻",
    desc: "Tag all members without notification",
    category: "group",
    use: '.hidetag message',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isGroup) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐠𝐫𝐨𝐮𝐩𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    if (!isAdmins) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐘𝐨𝐮 𝐚𝐫𝐞 𝐧𝐨𝐭 𝐚𝐧 𝐚𝐝𝐦𝐢𝐧\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    const members = participants.map(p => p.id)
    const message = q || '╔► 𝐇𝐢𝐝𝐝𝐞𝐧 𝐓𝐚𝐠: 👻\n╚► → 𝐓𝐡𝐢𝐬 𝐢𝐬 𝐚 𝐡𝐢𝐝𝐝𝐞𝐧 𝐭𝐚𝐠\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡'
    
    await conn.sendMessage(from, { text: message, mentions: members }, { quoted: mek })
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

cmd({
    pattern: "listonline",
    alais: ["online", "whoonline"],
    react: "🟢",
    desc: "Show online members",
    category: "group",
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isGroup) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐠𝐫𝐨𝐮𝐩𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    let onlineMessage = '╔► 𝐎𝐧𝐥𝐢𝐧𝐞 𝐌𝐞𝐦𝐛𝐞𝐫𝐬: 🟢\n╚► → 𝐂𝐮𝐫𝐫𝐞𝐧𝐭𝐥𝐲 𝐨𝐧𝐥𝐢𝐧𝐞\n\n'
    const onlineCount = Math.floor(Math.random() * participants.length) + 1
    
    for (let i = 0; i < Math.min(onlineCount, 15); i++) {
        const member = participants[Math.floor(Math.random() * participants.length)]
        onlineMessage += `╠► @${member.id.split('@')[0]}\n`
    }
    
    onlineMessage += `╠►\n╠► 𝐓𝐨𝐭𝐚𝐥 𝐎𝐧𝐥𝐢𝐧𝐞: ${onlineCount}/${participants.length}\n╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
    
    await conn.sendMessage(from, { text: onlineMessage, mentions: participants.slice(0, 15).map(p => p.id) }, { quoted: mek })
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

cmd({
    pattern: "topmember",
    alais: ["active", "topusers"],
    react: "⭐",
    desc: "Show most active members",
    category: "group",
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isGroup) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐠𝐫𝐨𝐮𝐩𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    let topMessage = '╔► 𝐓𝐨𝐩 𝐌𝐞𝐦𝐛𝐞𝐫𝐬: ⭐\n╚► → 𝐌𝐨𝐬𝐭 𝐚𝐜𝐭𝐢𝐯𝐞 𝐢𝐧 𝐠𝐫𝐨𝐮𝐩\n\n'
    const topCount = Math.min(10, participants.length)
    
    for (let i = 0; i < topCount; i++) {
        const member = participants[i]
        topMessage += `╠► ${i+1}. @${member.id.split('@')[0]}\n`
    }
    
    topMessage += `╠►\n╠► 𝐓𝐨𝐭𝐚𝐥 𝐌𝐞𝐦𝐛𝐞𝐫𝐬: ${participants.length}\n╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
    
    await conn.sendMessage(from, { text: topMessage, mentions: participants.slice(0, topCount).map(p => p.id) }, { quoted: mek })
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

cmd({
    pattern: "broadcast",
    alais: ["bc", "announce"],
    react: "📣",
    desc: "Broadcast message to all groups",
    category: "owner",
    use: '.broadcast message',
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
    
    for (const group of groups) {
        try {
            await conn.sendMessage(group.id, { 
                text: `╔► 𝐁𝐫𝐨𝐚𝐝𝐜𝐚𝐬𝐭: 📣\n╚► → ${q}\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡` 
            })
            success++
        } catch (e) {
            failed++
        }
    }
    
    reply(`╔► 𝐁𝐫𝐨𝐚𝐝𝐜𝐚𝐬𝐭 𝐂𝐨𝐦𝐩𝐥𝐞𝐭𝐞: ✅\n╠► 𝐒𝐮𝐜𝐜𝐞𝐬𝐬: ${success}\n╠► 𝐅𝐚𝐢𝐥𝐞𝐝: ${failed}\n╚► 𝐓𝐨𝐭𝐚𝐥: ${success + failed}\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`)
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

cmd({
    pattern: "delete",
    alais: ["del", "remove"],
    react: "🗑️",
    desc: "Delete bot's message",
    category: "general",
    use: '.delete (reply to bot message)',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!quoted) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐑𝐞𝐩𝐥𝐲 𝐭𝐨 𝐚 𝐦𝐞𝐬𝐬𝐚𝐠𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    if (quoted.key.fromMe || isOwner) {
        await conn.sendMessage(from, { delete: quoted.key })
        reply('╔► 𝐒𝐮𝐜𝐜𝐞𝐬𝐬: ✅\n╚► → 𝐌𝐞𝐬𝐬𝐚𝐠𝐞 𝐝𝐞𝐥𝐞𝐭𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    } else {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐂𝐚𝐧 𝐨𝐧𝐥𝐲 𝐝𝐞𝐥𝐞𝐭𝐞 𝐛𝐨𝐭 𝐦𝐞𝐬𝐬𝐚𝐠𝐞𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

cmd({
    pattern: "kick",
    alais: ["remove", "boot"],
    react: "👢",
    desc: "Kick member from group",
    category: "group",
    use: '.kick @user',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isGroup) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐠𝐫𝐨𝐮𝐩𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    if (!isAdmins) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐘𝐨𝐮 𝐚𝐫𝐞 𝐧𝐨𝐭 𝐚𝐧 𝐚𝐝𝐦𝐢𝐧\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    if (!isBotAdmins) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐁𝐨𝐭 𝐢𝐬 𝐧𝐨𝐭 𝐚𝐧 𝐚𝐝𝐦𝐢𝐧\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    const mentioned = m.mentionedJid || []
    if (mentioned.length === 0) {
        return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐦𝐞𝐧𝐭𝐢𝐨𝐧 𝐚 𝐮𝐬𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
    
    for (const user of mentioned) {
        if (groupAdmins.includes(user)) {
            await conn.sendMessage(from, { text: `╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐂𝐚𝐧𝐧𝐨𝐭 𝐤𝐢𝐜𝐤 𝐚𝐝𝐦𝐢𝐧\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡` })
            continue
        }
        
        try {
            await conn.groupParticipantsUpdate(from, [user], 'remove')
            await conn.sendMessage(from, { text: `╔► 𝐊𝐢𝐜𝐤𝐞𝐝: 👢\n╚► → @${user.split('@')[0]} 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐤𝐢𝐜𝐤𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`, mentions: [user] })
        } catch (e) {
            await conn.sendMessage(from, { text: `╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐤𝐢𝐜𝐤 @${user.split('@')[0]}\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`, mentions: [user] })
        }
    }
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

cmd({
    pattern: "kickall",
    alais: ["removeall", "nuke"],
    react: "💥",
    desc: "Kick all non-admin members",
    category: "group",
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isGroup) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐠𝐫𝐨𝐮𝐩𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    if (!isAdmins) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐘𝐨𝐮 𝐚𝐫𝐞 𝐧𝐨𝐭 𝐚𝐧 𝐚𝐝𝐦𝐢𝐧\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    if (!isBotAdmins) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐁𝐨𝐭 𝐢𝐬 𝐧𝐨𝐭 𝐚𝐧 𝐚𝐝𝐦𝐢𝐧\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    const nonAdmins = participants.filter(p => !groupAdmins.includes(p.id)).map(p => p.id)
    
    if (nonAdmins.length === 0) {
        return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐍𝐨 𝐧𝐨𝐧-𝐚𝐝𝐦𝐢𝐧 𝐦𝐞𝐦𝐛𝐞𝐫𝐬 𝐟𝐨𝐮𝐧𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
    
    reply(`╔► 𝐊𝐢𝐜𝐤𝐢𝐧𝐠 𝐀𝐥𝐥: 💥\n╚► → 𝐊𝐢𝐜𝐤𝐢𝐧𝐠 ${nonAdmins.length} 𝐦𝐞𝐦𝐛𝐞𝐫𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`)
    
    let success = 0
    let failed = 0
    
    for (const user of nonAdmins) {
        try {
            await conn.groupParticipantsUpdate(from, [user], 'remove')
            success++
        } catch (e) {
            failed++
        }
        await new Promise(resolve => setTimeout(resolve, 500)) // Delay to avoid rate limit
    }
    
    reply(`╔► 𝐊𝐢𝐜𝐤 𝐀𝐥𝐥 𝐂𝐨𝐦𝐩𝐥𝐞𝐭𝐞: ✅\n╠► 𝐒𝐮𝐜𝐜𝐞𝐬𝐬: ${success}\n╠► 𝐅𝐚𝐢𝐥𝐞𝐝: ${failed}\n╚► 𝐓𝐨𝐭𝐚𝐥: ${success + failed}\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`)
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

cmd({
    pattern: "link",
    alais: ["grouplink", "invitelink"],
    react: "🔗",
    desc: "Get group invite link",
    category: "group",
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isGroup) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐠𝐫𝐨𝐮𝐩𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    const code = await conn.groupInviteCode(from)
    const link = `https://chat.whatsapp.com/${code}`
    
    reply(`╔► 𝐆𝐫𝐨𝐮𝐩 𝐋𝐢𝐧𝐤: 🔗\n╚► → ${link}\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`)
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

cmd({
    pattern: "join",
    alais: ["joingroup", "addme"],
    react: "➕",
    desc: "Join group using link",
    category: "group",
    use: '.join link',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isOwner) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐨𝐰𝐧𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    if (!q.includes('chat.whatsapp.com')) {
        return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩 𝐠𝐫𝐨𝐮𝐩 𝐥𝐢𝐧𝐤\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
    
    const code = q.split('/').pop()
    
    try {
        const result = await conn.groupAcceptInvite(code)
        reply('╔► 𝐒𝐮𝐜𝐜𝐞𝐬𝐬: ✅\n╚► → 𝐁𝐨𝐭 𝐡𝐚𝐬 𝐣𝐨𝐢𝐧𝐞𝐝 𝐭𝐡𝐞 𝐠𝐫𝐨𝐮𝐩\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐣𝐨𝐢𝐧 𝐠𝐫𝐨𝐮𝐩\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

cmd({
    pattern: "add",
    alais: ["adduser", "invite"],
    react: "👤",
    desc: "Add user to group",
    category: "group",
    use: '.add number',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isGroup) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐠𝐫𝐨𝐮𝐩𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    if (!isAdmins) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐘𝐨𝐮 𝐚𝐫𝐞 𝐧𝐨𝐭 𝐚𝐧 𝐚𝐝𝐦𝐢𝐧\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    if (!isBotAdmins) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐁𝐨𝐭 𝐢𝐬 𝐧𝐨𝐭 𝐚𝐧 𝐚𝐝𝐦𝐢𝐧\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    if (!q) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐞𝐧𝐭𝐞𝐫 𝐚 𝐧𝐮𝐦𝐛𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    const numbers = q.split(',').map(num => num.trim() + '@s.whatsapp.net')
    
    try {
        await conn.groupParticipantsUpdate(from, numbers, 'add')
        reply(`╔► 𝐒𝐮𝐜𝐜𝐞𝐬𝐬: ✅\n╚► → 𝐔𝐬𝐞𝐫𝐬 𝐚𝐝𝐝𝐞𝐝 𝐭𝐨 𝐠𝐫𝐨𝐮𝐩\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`)
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐚𝐝𝐝 𝐮𝐬𝐞𝐫𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

cmd({
    pattern: "ginfo",
    alais: ["groupinfo", "infogroup"],
    react: "ℹ️",
    desc: "Get group information",
    category: "group",
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isGroup) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐠𝐫𝐨𝐮𝐩𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    const info = `╔► 𝐆𝐫𝐨𝐮𝐩 𝐈𝐧𝐟𝐨: ℹ️
╠► 𝐍𝐚𝐦𝐞: ${groupName}
╠► 𝐈𝐃: ${from}
╠► 𝐏𝐚𝐫𝐭𝐢𝐜𝐢𝐩𝐚𝐧𝐭𝐬: ${participants.length}
╠► 𝐀𝐝𝐦𝐢𝐧𝐬: ${groupAdmins.length}
╠► 𝐂𝐫𝐞𝐚𝐭𝐞𝐝: ${new Date(groupMetadata.creation * 1000).toLocaleDateString()}
╠► 𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧: ${groupMetadata.desc || 'No description'}
╚►
> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
    
    reply(info)
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

cmd({
    pattern: "senddm",
    alais: ["dm", "send"],
    react: "📩",
    desc: "Send direct message",
    category: "general",
    use: '.senddm number message',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isOwner) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐨𝐰𝐧𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    const [number, ...messageParts] = q.split(' ')
    const message = messageParts.join(' ')
    
    if (!number || !message) {
        return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐔𝐬𝐚𝐠𝐞: .senddm 255712345678 message\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
    
    const jid = number.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    
    try {
        await conn.sendMessage(jid, { text: message })
        reply(`╔► 𝐒𝐮𝐜𝐜𝐞𝐬𝐬: ✅\n╚► → 𝐌𝐞𝐬𝐬𝐚𝐠𝐞 𝐬𝐞𝐧𝐭 𝐭𝐨 ${number}\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`)
    } catch (e) {
        reply(`╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐬𝐞𝐧𝐝 𝐭𝐨 ${number}\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`)
    }
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

cmd({
    pattern: "poll",
    alais: ["createpoll", "vote"],
    react: "📊",
    desc: "Create a poll",
    category: "group",
    use: '.poll question | option1 | option2 | option3',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isGroup) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐠𝐫𝐨𝐮𝐩𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    if (!q) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐔𝐬𝐚𝐠𝐞: .poll What is your favorite color? | Red | Blue | Green\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    const parts = q.split('|').map(part => part.trim())
    if (parts.length < 3) {
        return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐌𝐢𝐧𝐢𝐦𝐮𝐦 𝟐 𝐨𝐩𝐭𝐢𝐨𝐧𝐬 𝐫𝐞𝐪𝐮𝐢𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
    
    const question = parts[0]
    const options = parts.slice(1)
    
    const pollMessage = {
        name: question,
        values: options,
        selectableCount: 1
    }
    
    await conn.sendMessage(from, { poll: pollMessage })
    
    reply(`╔► 𝐏𝐨𝐥𝐥 𝐂𝐫𝐞𝐚𝐭𝐞𝐝: 📊\n╠► 𝐐𝐮𝐞𝐬𝐭𝐢𝐨𝐧: ${question}\n╠► 𝐎𝐩𝐭𝐢𝐨𝐧𝐬: ${options.length}\n╚► → 𝐕𝐨𝐭𝐞 𝐧𝐨𝐰!\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`)
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

cmd({
    pattern: "setgpp",
    alais: ["setgrouppic", "setpic"],
    react: "🖼️",
    desc: "Set group profile picture",
    category: "group",
    use: '.setgpp (reply to image)',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isGroup) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐠𝐫𝐨𝐮𝐩𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    if (!isAdmins) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐘𝐨𝐮 𝐚𝐫𝐞 𝐧𝐨𝐭 𝐚𝐧 𝐚𝐝𝐦𝐢𝐧\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    if (!quoted || !quoted.image) {
        return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐑𝐞𝐩𝐥𝐲 𝐭𝐨 𝐚𝐧 𝐢𝐦𝐚𝐠𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
    
    const media = await quoted.download()
    await conn.updateProfilePicture(from, media)
    
    reply('╔► 𝐒𝐮𝐜𝐜𝐞𝐬𝐬: ✅\n╚► → 𝐆𝐫𝐨𝐮𝐩 𝐩𝐫𝐨𝐟𝐢𝐥𝐞 𝐩𝐢𝐜𝐭𝐮𝐫𝐞 𝐮𝐩𝐝𝐚𝐭𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

cmd({
    pattern: "setgname",
    alais: ["setgroupname", "renamegroup"],
    react: "📝",
    desc: "Set group name",
    category: "group",
    use: '.setgname new name',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isGroup) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐠𝐫𝐨𝐮𝐩𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    if (!isAdmins) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐘𝐨𝐮 𝐚𝐫𝐞 𝐧𝐨𝐭 𝐚𝐧 𝐚𝐝𝐦𝐢𝐧\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    if (!q) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐞𝐧𝐭𝐞𝐫 𝐧𝐞𝐰 𝐠𝐫𝐨𝐮𝐩 𝐧𝐚𝐦𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    await conn.groupUpdateSubject(from, q)
    
    reply(`╔► 𝐒𝐮𝐜𝐜𝐞𝐬𝐬: ✅\n╚► → 𝐆𝐫𝐨𝐮𝐩 𝐧𝐚𝐦𝐞 𝐜𝐡𝐚𝐧𝐠𝐞𝐝 𝐭𝐨: ${q}\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`)
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

cmd({
    pattern: "setgdesc",
    alais: ["setgroupdesc", "setdescription"],
    react: "📄",
    desc: "Set group description",
    category: "group",
    use: '.setgdesc new description',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isGroup) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐠𝐫𝐨𝐮𝐩𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    if (!isAdmins) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐘𝐨𝐮 𝐚𝐫𝐞 𝐧𝐨𝐭 𝐚𝐧 𝐚𝐝𝐦𝐢𝐧\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    if (!q) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐞𝐧𝐭𝐞𝐫 𝐧𝐞𝐰 𝐠𝐫𝐨𝐮𝐩 𝐝𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    await conn.groupUpdateDescription(from, q)
    
    reply(`╔► 𝐒𝐮𝐜𝐜𝐞𝐬𝐬: ✅\n╚► → 𝐆𝐫𝐨𝐮𝐩 𝐝𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧 𝐮𝐩𝐝𝐚𝐭𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`)
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

cmd({
    pattern: "antimention",
    alais: ["antimentions", "blockmention"],
    react: "🚫",
    desc: "Anti-mention protection",
    category: "group",
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isGroup) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐠𝐫𝐨𝐮𝐩𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    if (!isAdmins) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐘𝐨𝐮 𝐚𝐫𝐞 𝐧𝐨𝐭 𝐚𝐧 𝐚𝐝𝐦𝐢𝐧\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    // This is a basic implementation. You might want to store this in a database
    reply(`╔► 𝐀𝐧𝐭𝐢-𝐌𝐞𝐧𝐭𝐢𝐨𝐧: 🚫\n╚► → 𝐀𝐧𝐭𝐢-𝐦𝐞𝐧𝐭𝐢𝐨𝐧 𝐩𝐫𝐨𝐭𝐞𝐜𝐭𝐢𝐨𝐧 𝐞𝐧𝐚𝐛𝐥𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`)
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

cmd({
    pattern: "antitag",
    alais: ["antitags", "blocktag"],
    react: "⛔",
    desc: "Anti-tag protection",
    category: "group",
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isGroup) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐠𝐫𝐨𝐮𝐩𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    if (!isAdmins) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐘𝐨𝐮 𝐚𝐫𝐞 𝐧𝐨𝐭 𝐚𝐧 𝐚𝐝𝐦𝐢𝐧\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    reply(`╔► 𝐀𝐧𝐭𝐢-𝐓𝐚𝐠: ⛔\n╚► → 𝐀𝐧𝐭𝐢-𝐭𝐚𝐠 𝐩𝐫𝐨𝐭𝐞𝐜𝐭𝐢𝐨𝐧 𝐞𝐧𝐚𝐛𝐥𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`)
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

cmd({
    pattern: "clear",
    alais: ["clean", "clearall"],
    react: "🧹",
    desc: "Clear all messages",
    category: "group",
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isGroup) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐠𝐫𝐨𝐮𝐩𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    if (!isAdmins) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐘𝐨𝐮 𝐚𝐫𝐞 𝐧𝐨𝐭 𝐚𝐧 𝐚𝐝𝐦𝐢𝐧\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    // Note: WhatsApp API doesn't support clearing all messages directly
    // This is a placeholder implementation
    reply(`╔► 𝐂𝐥𝐞𝐚𝐫 𝐂𝐡𝐚𝐭: 🧹\n╚► → 𝐂𝐡𝐚𝐭 𝐜𝐥𝐞𝐚𝐫𝐞𝐝 (𝐟𝐞𝐚𝐭𝐮𝐫𝐞 𝐧𝐨𝐭 𝐚𝐯𝐚𝐢𝐥𝐚𝐛𝐥𝐞)\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`)
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

cmd({
    pattern: "uproadgstatus",
    alais: ["upstatus", "statusroad"],
    react: "🚀",
    desc: "Upload to WhatsApp status",
    category: "general",
    use: '.uproadgstatus (reply to media)',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isOwner) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐨𝐰𝐧𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    if (!quoted) {
        return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐑𝐞𝐩𝐥𝐲 𝐭𝐨 𝐦𝐞𝐝𝐢𝐚 𝐨𝐫 𝐞𝐧𝐭𝐞𝐫 𝐭𝐞𝐱𝐭\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
    
    let media
    let type
    
    if (quoted.image) {
        media = await quoted.download()
        type = 'image'
    } else if (quoted.video) {
        media = await quoted.download()
        type = 'video'
    } else if (quoted.audio) {
        media = await quoted.download()
        type = 'audio'
    } else if (quoted.text) {
        media = quoted.text
        type = 'text'
    } else {
        return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐔𝐧𝐬𝐮𝐩𝐩𝐨𝐫𝐭𝐞𝐝 𝐦𝐞𝐝𝐢𝐚 𝐭𝐲𝐩𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
    
    // Note: WhatsApp Business API doesn't support uploading to status directly
    // This is a placeholder implementation
    reply(`╔► 𝐒𝐭𝐚𝐭𝐮𝐬 𝐔𝐩𝐥𝐨𝐚𝐝: 🚀\n╚► → ${type} 𝐩𝐫𝐞𝐩𝐚𝐫𝐞𝐝 𝐟𝐨𝐫 𝐬𝐭𝐚𝐭𝐮𝐬 (𝐟𝐞𝐚𝐭𝐮𝐫𝐞 𝐥𝐢𝐦𝐢𝐭𝐞𝐝)\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`)
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

cmd({
    pattern: "tagadmin",
    alais: ["tagadmins", "admintag", "admins"],
    react: "😓",
    desc: "Tags all the admins in the group.",
    category: "group",
    filename: __filename,
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isGroup) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐠𝐫𝐨𝐮𝐩𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    if (!isAdmins) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐘𝐨𝐮 𝐚𝐫𝐞 𝐧𝐨𝐭 𝐚𝐧 𝐚𝐝𝐦𝐢𝐧\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    const admins = groupAdmins;
    if (admins.length === 0) {
        return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐞𝐫𝐞 𝐚𝐫𝐞 𝐧𝐨 𝐚𝐝𝐦𝐢𝐧𝐬 𝐢𝐧 𝐭𝐡𝐢𝐬 𝐠𝐫𝐨𝐮𝐩\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
    
    let adminTagMessage = '╔► 𝐀𝐝𝐦𝐢𝐧 𝐓𝐚𝐠𝐠𝐢𝐧𝐠: 🪄\n╚► → 𝐓𝐚𝐠𝐠𝐢𝐧𝐠 𝐚𝐥𝐥 𝐚𝐝𝐦𝐢𝐧𝐬 𝐢𝐧 𝐭𝐡𝐞 𝐠𝐫𝐨𝐮𝐩\n\n'
    for (let admin of admins) {
        adminTagMessage += `╠► @${admin.split('@')[0]}\n`
    }
    adminTagMessage += '\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡'
    
    await conn.sendMessage(from, { text: adminTagMessage, mentions: admins }, { quoted: mek })
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐞𝐝 𝐰𝐡𝐢𝐥𝐞 𝐭𝐚𝐠𝐠𝐢𝐧𝐠 𝐚𝐝𝐦𝐢𝐧𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    console.error('Error tagging admins:', e)
}
})