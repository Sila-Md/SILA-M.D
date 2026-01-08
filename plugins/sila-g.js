const { cmd } = require('../command');

cmd({
    pattern: "open",
    alais: ["unmute", "ungroup"],
    react: "🔓",
    desc: "Open/unmute the group",
    category: "group",
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isGroup) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐠𝐫𝐨𝐮𝐩𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    if (!isAdmins) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐘𝐨𝐮 𝐚𝐫𝐞 𝐧𝐨𝐭 𝐚𝐧 𝐚𝐝𝐦𝐢𝐧\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    if (!isBotAdmins) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐁𝐨𝐭 𝐢𝐬 𝐧𝐨𝐭 𝐚𝐧 𝐚𝐝𝐦𝐢𝐧\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    await conn.groupSettingUpdate(from, 'not_announcement')
    
    reply(`╔► 𝐆𝐫𝐨𝐮𝐩 𝐎𝐩𝐞𝐧𝐞𝐝: 🔓\n╠► 𝐆𝐫𝐨𝐮𝐩: ${groupName}\n╠► 𝐎𝐩𝐞𝐧𝐞𝐝 𝐛𝐲: ${pushname}\n╚► → 𝐀𝐥𝐥 𝐦𝐞𝐦𝐛𝐞𝐫𝐬 𝐜𝐚𝐧 𝐧𝐨𝐰 𝐬𝐞𝐧𝐝 𝐦𝐞𝐬𝐬𝐚𝐠𝐞𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`)
    
    // Optional: React to the command message
    await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐨𝐩𝐞𝐧 𝐠𝐫𝐨𝐮𝐩\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

cmd({
    pattern: "close",
    alais: ["mute", "lock"],
    react: "🔒",
    desc: "Close/mute the group",
    category: "group",
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isGroup) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐠𝐫𝐨𝐮𝐩𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    if (!isAdmins) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐘𝐨𝐮 𝐚𝐫𝐞 𝐧𝐨𝐭 𝐚𝐧 𝐚𝐝𝐦𝐢𝐧\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    if (!isBotAdmins) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐁𝐨𝐭 𝐢𝐬 𝐧𝐨𝐭 𝐚𝐧 𝐚𝐝𝐦𝐢𝐧\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    await conn.groupSettingUpdate(from, 'announcement')
    
    reply(`╔► 𝐆𝐫𝐨𝐮𝐩 𝐂𝐥𝐨𝐬𝐞𝐝: 🔒\n╠► 𝐆𝐫𝐨𝐮𝐩: ${groupName}\n╠► 𝐂𝐥𝐨𝐬𝐞𝐝 𝐛𝐲: ${pushname}\n╚► → 𝐎𝐧𝐥𝐲 𝐚𝐝𝐦𝐢𝐧𝐬 𝐜𝐚𝐧 𝐬𝐞𝐧𝐝 𝐦𝐞𝐬𝐬𝐚𝐠𝐞𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`)
    
    // Optional: React to the command message
    await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐜𝐥𝐨𝐬𝐞 𝐠𝐫𝐨𝐮𝐩\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})

cmd({
    pattern: "grouplock",
    alais: ["lockgroup", "groupstatus"],
    react: "🔐",
    desc: "Check group lock status",
    category: "group",
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isGroup) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐠𝐫𝐨𝐮𝐩𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    const groupInfo = await conn.groupMetadata(from)
    const isLocked = groupInfo.announce === true
    
    const status = isLocked ? '🔒 𝐋𝐨𝐜𝐤𝐞𝐝' : '🔓 𝐔𝐧𝐥𝐨𝐜𝐤𝐞𝐝'
    const desc = isLocked ? '𝐎𝐧𝐥𝐲 𝐚𝐝𝐦𝐢𝐧𝐬 𝐜𝐚𝐧 𝐬𝐞𝐧𝐝 𝐦𝐞𝐬𝐬𝐚𝐠𝐞𝐬' : '𝐀𝐥𝐥 𝐦𝐞𝐦𝐛𝐞𝐫𝐬 𝐜𝐚𝐧 𝐬𝐞𝐧𝐝 𝐦𝐞𝐬𝐬𝐚𝐠𝐞𝐬'
    
    reply(`╔► 𝐆𝐫𝐨𝐮𝐩 𝐒𝐭𝐚𝐭𝐮𝐬: 🔐\n╠► 𝐆𝐫𝐨𝐮𝐩: ${groupName}\n╠► 𝐒𝐭𝐚𝐭𝐮𝐬: ${status}\n╠► 𝐌𝐞𝐦𝐛𝐞𝐫𝐬: ${participants.length}\n╠► 𝐀𝐝𝐦𝐢𝐧𝐬: ${groupAdmins.length}\n╚► → ${desc}\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`)
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐜𝐡𝐞𝐜𝐤 𝐠𝐫𝐨𝐮𝐩 𝐬𝐭𝐚𝐭𝐮𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    l(e)
}
})