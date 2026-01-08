const { cmd } = require('../command');
const os = require('os');
const { silainfo, myquoted } = require('../config');

//=========== MENU2 COMMAND ===========//
cmd({
    pattern: "menu3",
    alias: ["help3", "commands3", "list3"],
    desc: "Show enhanced command list",
    category: "main",
    react: "📜",
    filename: __filename
},
async (conn, mek, m, { from, pushName, prefix }) => {
    try {
        // System info calculations
        const totalMemMB = (os.totalmem() / 1024 / 1024).toFixed(2);
        const freeMemMB = (os.freemem() / 1024 / 1024).toFixed(2);
        
        // Uptime calculation
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        
        const menuText = `
╭─━━━━━━━━━━━━━━━━━━━━─╮
│ 🐢 𝗦𝗜𝗟𝗔 𝗠𝗗   
│ ✦ 𝐇𝐞𝐥𝐥𝐨 ${pushName || '𝐔𝐬𝐞𝐫'} 👋  
│ ✦ 𝐖𝐞𝐥𝐜𝐨𝐦𝐞 𝐭𝐨 𝐭𝐡𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐦𝐞𝐧𝐮
╰─━━━━━━━━━━━━━━━━━━━━─╯

┌───〔 📊 𝗦𝘆𝘀𝘁𝗲𝗺 𝗜𝗻𝗟𝗶𝗧𝗂𝗢 〕───┐
│• 𝐕𝐞𝐫𝐬𝐢𝐨𝐧: 2.0.0
│• 𝐏𝐫𝐞𝐟𝐢𝐱: ${prefix || '.'}
│• 𝐓𝐨𝐭𝐚𝐥 𝐑𝐀𝐌: ${totalMemMB} 𝐌𝐁
│• 𝐅𝐫𝐞𝐞 𝐑𝐀𝐌: ${freeMemMB} 𝐌𝐁
│• 𝐔𝐩𝐭𝐢𝐦𝐞: ${hours}𝐡 ${minutes}𝐦 ${seconds}𝐬
│• 𝐎𝐒: ${os.type()}
│• 𝐏𝐥𝐚𝐭𝐟𝐨𝐫𝐦: ${os.platform()}
│• 𝐂𝐏𝐔 𝐀𝐫𝐜𝐡: ${os.arch()}
└────────────────────────┘

╭───《 ⚙️ 𝗕𝗼𝘁 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 》───╮
│• 𝐚𝐥𝐢𝐯𝐞 ☺️
│• 𝐩𝐢𝐧𝐠 ⚡
│• 𝐯𝐢𝐝𝐞𝐨 🎥
│• 𝐬𝐨𝐧𝐠 🎵
│• 𝐦𝐞𝐧𝐮 📜
│• 𝐜𝐡𝐢𝐝 🆔
│• 𝐟𝐫𝐞𝐞𝐛𝐨𝐭 🆓
│• 𝐬𝐞𝐭𝐞𝐦𝐨𝐣𝐢 🐢
│• 𝐬𝐞𝐭𝐭𝐢𝐧𝐠𝐬 ⚙️
│• 𝐢𝐦𝐚𝐠𝐢𝐧𝐞 🎨
│• 𝐩𝐚𝐢𝐫 🔐
│• 𝐩𝐥𝐚𝐲 🎧
│• 𝐬𝐨𝐫𝐚 🎬
│• 𝐭𝐞𝐱𝐭𝐦𝐚𝐤𝐞𝐫 🎭
│• 𝐭𝐭𝐬 🔊
│• 𝐟𝐛 📹
│• 𝐨𝐩𝐞𝐧𝐚𝐢 🧠
│• 𝐚𝐢 🤖
│• 𝐝𝐞𝐞𝐩𝐬𝐞𝐞𝐤 👾
│• 𝐯𝐯 👁️
│• 𝐚𝐩𝐤 📱
│• 𝐢𝐠 📸
│• 𝐭𝐢𝐤𝐭𝐨𝐤 🎶
│• 𝐮𝐫𝐥 🔗
│• 𝐫𝐞𝐩𝐨 📦
│• 𝐮𝐩𝐝𝐚𝐭𝐞 🔄
│• 𝐮𝐩𝐭𝐢𝐦𝐞 ⏱️
│• 𝐫𝐞𝐬𝐭𝐚𝐫𝐭 ♻️
│• 𝐨𝐰𝐧𝐞𝐫 👑
│• 𝐛𝐨𝐭 𝐨𝐧/𝐨𝐟𝐟 🔛
│• 𝐛𝐫𝐨𝐚𝐝𝐜𝐚𝐬𝐭 📢
│• 𝐬𝐭𝐢𝐜𝐤𝐞𝐫 ✂️
│• 𝐣𝐨𝐤𝐞 😂
│• 𝐭𝐫𝐭 🔤
╰─────────────────────────╯

╭───《 👥 𝗚𝗿𝗼𝘂𝗽 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 》───╮
│• 𝐦𝐮𝐭𝐞 🔇
│• 𝐮𝐧𝐦𝐮𝐭𝐞 🔊
│• 𝐝𝐞𝐥𝐞𝐭𝐞 🗑️
│• 𝐤𝐢𝐜𝐤 👢
│• 𝐭𝐚𝐠 🏷️
│• 𝐭𝐚𝐠𝐚𝐥𝐥 📢
│• 𝐡𝐢𝐝𝐞𝐭𝐚𝐠 🙈
│• 𝐤𝐢𝐜𝐤𝐚𝐥𝐥 🚫
│• 𝐠𝐞𝐭𝐩𝐢𝐜 📸
│• 𝐥𝐢𝐧𝐤 🔗
│• 𝐣𝐨𝐢𝐧 ➕
│• 𝐚𝐝𝐝 👥
│• 𝐠𝐢𝐧𝐟𝐨 ℹ️
│• 𝐬𝐞𝐧𝐝𝐝𝐦 📨
│• 𝐥𝐢𝐬𝐭𝐨𝐧𝐥𝐢𝐧𝐞 👤
│• 𝐩𝐨𝐥𝐥 📊
│• 𝐜𝐡𝐚𝐭𝐛𝐨𝐭 💬
│• 𝐬𝐞𝐭𝐠𝐩𝐩 🖼️
│• 𝐬𝐞𝐭𝐠𝐧𝐚𝐦𝐞 📝
│• 𝐬𝐞𝐭𝐠𝐝𝐞𝐬𝐜 📋
│• 𝐚𝐧𝐭𝐢𝐭𝐚𝐠 ⚠️
│• 𝐰𝐚𝐫𝐧 ⚠️
│• 𝐜𝐥𝐞𝐚𝐫 🧹
│• 𝐚𝐧𝐭𝐢𝐥𝐢𝐧𝐤 🔗
│• 𝐚𝐧𝐭𝐢𝐦𝐞𝐧𝐭𝐢𝐨𝐧 📢
│• 𝐛𝐚𝐧 🚫
╰─────────────────────────╯

╭───《 📍 𝐇𝐨𝐰 𝐭𝐨 𝐮𝐬𝐞 》───╮
│• 𝐔𝐬𝐞: ${prefix}𝐜𝐨𝐦𝐦𝐚𝐧𝐝
│• 𝐄𝐱: ${prefix}𝐩𝐢𝐧𝐠
│• 𝐄𝐱: ${prefix}𝐚𝐥𝐢𝐯𝐞
╰─────────────────────────╯

╭───《 🐢 𝐒𝐈𝐋𝐀 𝐌𝐃 》───╮
│• 𝐁𝐨𝐭 𝐕𝐞𝐫𝐬𝐢𝐨𝐧: 2.0.0
│• 𝐂𝐫𝐞𝐚𝐭𝐞𝐝 𝐛𝐲: 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡
│• 𝐓𝐨𝐭𝐚𝐥 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬: 50+
╰─────────────────────────╯`;

        await conn.sendMessage(
            from,
            {
                text: menuText,
                ...silainfo()
            },
            { quoted: myquoted }
        );

    } catch (error) {
        console.error("Menu2 error:", error);
        await conn.sendMessage(
            from,
            {
                text: `*❌ 𝐄𝐑𝐑𝐎𝐑*\n\n𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐬𝐡𝐨𝐰 𝐦𝐞𝐧𝐮\n\n*𝐑𝐞𝐚𝐬𝐨𝐧:* ${error.message}`,
                ...silainfo()
            },
            { quoted: myquoted }
        );
    }
});
