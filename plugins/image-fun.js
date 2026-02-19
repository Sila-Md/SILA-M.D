const config = require('../config')
const axios = require('axios');
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const fs = require('fs');

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

var imgmsg = "*Give me a anime name !*"
var descgs = "It gives details of given anime name."
var cants = "I cant find this anime."

//====================================================================================
cmd({
    pattern: "garl",
    alias: ["imgloli"],
    react: '😎',
    desc: "Download anime loli images.",
    category: "anime",
    use: '.loli',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let res = await axios.get('https://api.lolicon.app/setu/v2?num=1&r18=0&tag=lolicon')
let wm = `😎 𝚁𝚊𝚗𝚍𝚘𝚖 𝙻𝚘𝚕𝚒 𝙸𝚖𝚊𝚐𝚎

> © Powered by Sila Tech`

await conn.sendMessage(from, { 
    image: { url: res.data.data[0].urls.original }, 
    caption: wm,
    contextInfo: getContextInfo({ sender: sender })
}, { quoted: fkontak })

} catch (e) {
await conn.sendMessage(from, { 
    text: `❌ 𝙸 𝚌𝚊𝚗𝚝 𝚏𝚒𝚗𝚍 𝚝𝚑𝚒𝚜 𝚊𝚗𝚒𝚖𝚎.\n\n> © Powered by Sila Tech`, 
    contextInfo: getContextInfo({ sender: sender })
}, { quoted: fkontak })
console.log(e)
}
})

//=====================================================================
cmd({
    pattern: "waifu",
    alias: ["imgwaifu"],
    react: '💫',
    desc: "Download anime waifu images.",
    category: "anime",
    use: '.waifu',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let res = await axios.get('https://api.waifu.pics/sfw/waifu')
let wm = `🩵 𝚁𝚊𝚗𝚍𝚘𝚖 𝚆𝚊𝚒𝚏𝚞 𝙸𝚖𝚊𝚐𝚎

> © Powered by Sila Tech`

await conn.sendMessage(from, { 
    image: { url: res.data.url }, 
    caption: wm,
    contextInfo: getContextInfo({ sender: sender })
}, { quoted: fkontak })

} catch (e) {
await conn.sendMessage(from, { 
    text: `❌ 𝙸 𝚌𝚊𝚗𝚝 𝚏𝚒𝚗𝚍 𝚝𝚑𝚒𝚜 𝚊𝚗𝚒𝚖𝚎.\n\n> © Powered by Sila Tech`, 
    contextInfo: getContextInfo({ sender: sender })
}, { quoted: fkontak })
console.log(e)
}
})

//================================================================
cmd({
    pattern: "neko",
    alias: ["imgneko"],
    react: '💫',
    desc: "Download anime neko images.",
    category: "anime",
    use: '.neko',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let res = await axios.get('https://api.waifu.pics/sfw/neko')
let wm = `🩷 𝚁𝚊𝚗𝚍𝚘𝚖 𝙽𝚎𝚔𝚘 𝙸𝚖𝚊𝚐𝚎

> © Powered by Sila Tech`

await conn.sendMessage(from, { 
    image: { url: res.data.url  }, 
    caption: wm,
    contextInfo: getContextInfo({ sender: sender })
}, { quoted: fkontak })

} catch (e) {
await conn.sendMessage(from, { 
    text: `❌ 𝙸 𝚌𝚊𝚗𝚝 𝚏𝚒𝚗𝚍 𝚝𝚑𝚒𝚜 𝚊𝚗𝚒𝚖𝚎.\n\n> © Powered by Sila Tech`, 
    contextInfo: getContextInfo({ sender: sender })
}, { quoted: fkontak })
console.log(e)
}
})
  
//=====================================================================
cmd({
    pattern: "megumin",
    alias: ["imgmegumin"],
    react: '💕',
    desc: "Download anime megumin images.",
    category: "anime",
    use: '.megumin',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let res = await axios.get('https://api.waifu.pics/sfw/megumin')
let wm = `❤️‍🔥 𝚁𝚊𝚗𝚍𝚘𝚖 𝙼𝚎𝚐𝚞𝚖𝚒𝚗 𝙸𝚖𝚊𝚐𝚎

> © Powered by Sila Tech`

await conn.sendMessage(from, { 
    image: { url: res.data.url }, 
    caption: wm,
    contextInfo: getContextInfo({ sender: sender })
}, { quoted: fkontak })

} catch (e) {
await conn.sendMessage(from, { 
    text: `❌ 𝙸 𝚌𝚊𝚗𝚝 𝚏𝚒𝚗𝚍 𝚝𝚑𝚒𝚜 𝚊𝚗𝚒𝚖𝚎.\n\n> © Powered by Sila Tech`, 
    contextInfo: getContextInfo({ sender: sender })
}, { quoted: fkontak })
console.log(e)
}
})

//================================================================
cmd({
    pattern: "maid",
    alias: ["imgmaid"],
    react: '💫',
    desc: "Download anime maid images.",
    category: "anime",
    use: '.maid',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let res = await axios.get('https://api.waifu.im/search/?included_tags=maid')
let wm = `😎 𝚁𝚊𝚗𝚍𝚘𝚖 𝙼𝚊𝚒𝚍 𝙸𝚖𝚊𝚐𝚎

> © Powered by Sila Tech`

await conn.sendMessage(from, { 
    image: { url: res.data.images[0].url  }, 
    caption: wm,
    contextInfo: getContextInfo({ sender: sender })
}, { quoted: fkontak })

} catch (e) {
await conn.sendMessage(from, { 
    text: `❌ 𝙸 𝚌𝚊𝚗𝚝 𝚏𝚒𝚗𝚍 𝚝𝚑𝚒𝚜 𝚊𝚗𝚒𝚖𝚎.\n\n> © Powered by Sila Tech`, 
    contextInfo: getContextInfo({ sender: sender })
}, { quoted: fkontak })
console.log(e)
}
})

//=====================================================================
cmd({
    pattern: "awoo",
    alias: ["imgawoo"],
    react: '😎',
    desc: "Download anime awoo images.",
    category: "anime",
    use: '.awoo',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let res = await axios.get('https://api.waifu.pics/sfw/awoo')
let wm = `😎 𝚁𝚊𝚗𝚍𝚘𝚖 𝙰𝚠𝚘𝚘 𝙸𝚖𝚊𝚐𝚎

> © Powered by Sila Tech`

await conn.sendMessage(from, { 
    image: { url: res.data.url }, 
    caption: wm,
    contextInfo: getContextInfo({ sender: sender })
}, { quoted: fkontak })

} catch (e) {
await conn.sendMessage(from, { 
    text: `❌ 𝙸 𝚌𝚊𝚗𝚝 𝚏𝚒𝚗𝚍 𝚝𝚑𝚒𝚜 𝚊𝚗𝚒𝚖𝚎.\n\n> © Powered by Sila Tech`, 
    contextInfo: getContextInfo({ sender: sender })
}, { quoted: fkontak })
console.log(e)
}
})

// Anmiex
cmd({
    pattern: "animegirl",
    desc: "Fetch a random anime girl image.",
    category: "fun",
    react: "🧚🏻",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { 
            image: { url: data.url }, 
            caption: '*𝙰𝙽𝙸𝙼𝙴 𝙶𝙸𝚁𝙻 𝙸𝙼𝙰𝙶𝙴* 🥳\n\n> © Powered by Sila Tech',
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
        
    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { 
            text: `❌ 𝙴𝚛𝚛𝚘𝚛 𝙵𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝙰𝚗𝚒𝚖𝚎 𝙶𝚒𝚛𝚕 𝚒𝚖𝚊𝚐𝚎: ${e.message}\n\n> © Powered by Sila Tech`, 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }
});

cmd({
    pattern: "animegirl1",
    desc: "Fetch a random anime girl image.",
    category: "fun",
    react: "🧚🏻",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { 
            image: { url: data.url }, 
            caption: '𝙰𝙽𝙸𝙼𝙴 𝙶𝙸𝚁𝙻 𝙸𝙼𝙰𝙶𝙴 👾\n\n> © Powered by Sila Tech',
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
        
    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { 
            text: `❌ 𝙴𝚛𝚛𝚘𝚛 𝙵𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝙰𝚗𝚒𝚖𝚎 𝙶𝚒𝚛𝚕 𝚒𝚖𝚊𝚐𝚎: ${e.message}\n\n> © Powered by Sila Tech`, 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }
});

// Nimefupisha animegirl2 hadi animegirl5 kwa sababu zinafanana
// Tafadhali rudia muundo huo kwa zote

//==========anime=====
cmd({
    pattern: "anime",
    desc: "anime the bot",
    category: "main",
    react: "⛱️",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let dec = `> 𝚂𝙸𝙻𝙰 𝙼𝙳 𝙰𝙽𝙸𝙼𝙴 𝙸𝙼𝙶𝚂*`

const images = [
    'https://telegra.ph/file/b26f27aa5daaada031b90.jpg',
    'https://telegra.ph/file/51b44e4b086667361061b.jpg',
    'https://telegra.ph/file/7d165d73f914985542537.jpg',
    'https://telegra.ph/file/3d9732d2657d2d72dc102.jpg',
    'https://telegra.ph/file/8daf7e432a646f3ebe7eb.jpg',
    'https://telegra.ph/file/7514b18ea89da924e7496.jpg',
    'https://telegra.ph/file/ce9cb5acd2cec7693d76b.jpg'
];

for (let img of images) {
    await conn.sendMessage(from, {
        image: { url: img },
        caption: dec,
        contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });
}

}catch(e){
console.log(e)
await conn.sendMessage(from, { 
    text: `${e}`, 
    contextInfo: getContextInfo({ sender: sender })
}, { quoted: fkontak })
}
});

// Nimefupisha anime1 hadi anime5 kwa muundo sawa
cmd({
    pattern: "anime1",
    desc: "Animal image.",
    react: "🧚‍♀️",
    category: "other",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const images = [
    'https://i.waifu.pics/aD7t0Bc.jpg',
    'https://i.waifu.pics/PQO5wPN.jpg',
    'https://i.waifu.pics/5At1P4A.jpg',
    'https://i.waifu.pics/MjtH3Ha.jpg',
    'https://i.waifu.pics/QQW7VKy.jpg'
];

for (let img of images) {
    await conn.sendMessage(from, {
        image: { url: img },
        caption: '> © Powered by Sila Tech',
        contextInfo: getContextInfo({ sender: sender })
    }, { quoted: fkontak });
}

}catch(e){
console.log(e)
await conn.sendMessage(from, { 
    text: `${e}`, 
    contextInfo: getContextInfo({ sender: sender })
}, { quoted: fkontak })
}
})

// Rudia muundo huo kwa anime2, anime3, anime4, anime5

cmd({
    pattern: "dog",
    desc: "Fetch a random dog image.",
    category: "fun",
    react: "🐶",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://dog.ceo/api/breeds/image/random`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { 
            image: { url: data.message }, 
            caption: '> © Powered by Sila Tech',
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
        
    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { 
            text: `❌ 𝙴𝚛𝚛𝚘𝚛 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝚍𝚘𝚐 𝚒𝚖𝚊𝚐𝚎: ${e.message}\n\n> © Powered by Sila Tech`, 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }
});