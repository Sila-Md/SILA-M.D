const config = require('../config')
const { cmd } = require('../command')
const axios = require('axios')

// =============================================================
// 📌 ANIME COMMANDS
// =============================================================

// Anime Hug
cmd({
    pattern: "hug",
    alias: ["animehug", "cuddle"],
    react: "🤗",
    desc: "Get random anime hug image",
    category: "anime",
    use: '.hug',
    filename: __filename
},
async(conn, mek, m,{from, reply}) => {
    try {
        const response = await axios.get('https://okatsu-rolezapiiz.vercel.app/anime/hug')
        if (response.data && response.data.url) {
            await conn.sendMessage(from, {
                image: { url: response.data.url },
                caption: '🤗 *Anime Hug*\n> © Powered By Sila Tech'
            }, { quoted: mek })
        } else {
            reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐠𝐞𝐭 𝐚𝐧𝐢𝐦𝐞 𝐡𝐮𝐠\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
        }
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐠𝐞𝐭 𝐚𝐧𝐢𝐦𝐞 𝐡𝐮𝐠\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// Akiyama Anime
cmd({
    pattern: "akiyama",
    alias: ["akiyamapic"],
    react: "🌸",
    desc: "Get random Akiyama anime image",
    category: "anime",
    use: '.akiyama',
    filename: __filename
},
async(conn, mek, m,{from, reply}) => {
    try {
        const response = await axios.get('https://okatsu-rolezapiiz.vercel.app/anime/akiyama')
        if (response.data && response.data.url) {
            await conn.sendMessage(from, {
                image: { url: response.data.url },
                caption: '🌸 *Akiyama Anime*\n> © Powered By Sila Tech'
            }, { quoted: mek })
        } else {
            reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐠𝐞𝐭 𝐀𝐤𝐢𝐲𝐚𝐦𝐚 𝐢𝐦𝐚𝐠𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
        }
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐠𝐞𝐭 𝐀𝐤𝐢𝐲𝐚𝐦𝐚 𝐢𝐦𝐚𝐠𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// Deidara Anime
cmd({
    pattern: "deidara",
    alias: ["deidarapic"],
    react: "🎨",
    desc: "Get random Deidara anime image",
    category: "anime",
    use: '.deidara',
    filename: __filename
},
async(conn, mek, m,{from, reply}) => {
    try {
        const response = await axios.get('https://okatsu-rolezapiiz.vercel.app/anime/deidara')
        if (response.data && response.data.url) {
            await conn.sendMessage(from, {
                image: { url: response.data.url },
                caption: '🎨 *Deidara Anime*\n> © Powered By Sila Tech'
            }, { quoted: mek })
        } else {
            reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐠𝐞𝐭 𝐃𝐞𝐢𝐝𝐚𝐫𝐚 𝐢𝐦𝐚𝐠𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐠𝐞𝐭 𝐃𝐞𝐢𝐝𝐚𝐫𝐚 𝐢𝐦𝐚𝐠𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// Anime Fanart
cmd({
    pattern: "fanart",
    alias: ["animefanart"],
    react: "🎭",
    desc: "Get random anime fanart",
    category: "anime",
    use: '.fanart',
    filename: __filename
},
async(conn, mek, m,{from, reply}) => {
    try {
        const response = await axios.get('https://okatsu-rolezapiiz.vercel.app/anime/fanart')
        if (response.data && response.data.url) {
            await conn.sendMessage(from, {
                image: { url: response.data.url },
                caption: '🎭 *Anime Fanart*\n> © Powered By Sila Tech'
            }, { quoted: mek })
        } else {
            reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐠𝐞𝐭 𝐚𝐧𝐢𝐦𝐞 𝐟𝐚𝐧𝐚𝐫𝐭\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
        }
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐠𝐞𝐭 𝐚𝐧𝐢𝐦𝐞 𝐟𝐚𝐧𝐚𝐫𝐭\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// Anime Happy
cmd({
    pattern: "animehappy",
    alias: ["happyanime", "ahappy"],
    react: "😊",
    desc: "Get random happy anime image",
    category: "anime",
    use: '.animehappy',
    filename: __filename
},
async(conn, mek, m,{from, reply}) => {
    try {
        const response = await axios.get('https://okatsu-rolezapiiz.vercel.app/anime/happy')
        if (response.data && response.data.url) {
            await conn.sendMessage(from, {
                image: { url: response.data.url },
                caption: '😊 *Happy Anime*\n> © Powered By Sila Tech'
            }, { quoted: mek })
        } else {
            reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐠𝐞𝐭 𝐡𝐚𝐩𝐩𝐲 𝐚𝐧𝐢𝐦𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
        }
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐠𝐞𝐭 𝐡𝐚𝐩𝐩𝐲 𝐚𝐧𝐢𝐦𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// Anime Kiss
cmd({
    pattern: "animekiss",
    alias: ["kissanime", "akiss"],
    react: "💋",
    desc: "Get random anime kiss image",
    category: "anime",
    use: '.animekiss',
    filename: __filename
},
async(conn, mek, m,{from, reply}) => {
    try {
        const response = await axios.get('https://okatsu-rolezapiiz.vercel.app/anime/kiss')
        if (response.data && response.data.url) {
            await conn.sendMessage(from, {
                image: { url: response.data.url },
                caption: '💋 *Anime Kiss*\n> © Powered By Sila Tech'
            }, { quoted: mek })
        } else {
            reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐠𝐞𝐭 𝐚𝐧𝐢𝐦𝐞 𝐤𝐢𝐬𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
        }
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐠𝐞𝐭 𝐚𝐧𝐢𝐦𝐞 𝐤𝐢𝐬𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// =============================================================
// 📌 MAKER COMMANDS
// =============================================================

// Brat Maker
cmd({
    pattern: "brat",
    alias: ["bratmaker"],
    react: "👧",
    desc: "Create brat image",
    category: "maker",
    use: '.brat [text]',
    filename: __filename
},
async(conn, mek, m,{from, reply, q}) => {
    if (!q) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐭𝐞𝐱𝐭\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    try {
        const response = await axios.get(`https://okatsu-rolezapiiz.vercel.app/maker/brat?q=${encodeURIComponent(q)}`, {
            responseType: 'arraybuffer'
        })
        
        await conn.sendMessage(from, {
            image: response.data,
            caption: `👧 *Brat Maker*\n📝 ${q}\n\n> © Powered By Sila Tech`
        }, { quoted: mek })
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐜𝐫𝐞𝐚𝐭𝐞 𝐛𝐫𝐚𝐭 𝐢𝐦𝐚𝐠𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// Brat Video Maker
cmd({
    pattern: "bratvid",
    alias: ["bratvideo"],
    react: "🎬",
    desc: "Create brat video",
    category: "maker",
    use: '.bratvid [text]',
    filename: __filename
},
async(conn, mek, m,{from, reply, q}) => {
    if (!q) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐭𝐞𝐱𝐭\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    try {
        const response = await axios.get(`https://okatsu-rolezapiiz.vercel.app/maker/bratvid?q=${encodeURIComponent(q)}`)
        if (response.data && response.data.url) {
            await conn.sendMessage(from, {
                video: { url: response.data.url },
                caption: `🎬 *Brat Video*\n📝 ${q}\n\n> © Powered By Sila Tech`
            }, { quoted: mek })
        } else {
            reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐜𝐫𝐞𝐚𝐭𝐞 𝐛𝐫𝐚𝐭 𝐯𝐢𝐝𝐞𝐨\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
        }
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐜𝐫𝐞𝐚𝐭𝐞 𝐛𝐫𝐚𝐭 𝐯𝐢𝐝𝐞𝐨\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// Code Snap Maker
cmd({
    pattern: "codesnap",
    alias: ["codesnippet"],
    react: "💻",
    desc: "Create code snippet image",
    category: "maker",
    use: '.codesnap [code]',
    filename: __filename
},
async(conn, mek, m,{from, reply, q}) => {
    if (!q) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐜𝐨𝐝𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    try {
        const response = await axios.get(`https://okatsu-rolezapiiz.vercel.app/maker/codesnap?q=${encodeURIComponent(q)}`, {
            responseType: 'arraybuffer'
        })
        
        await conn.sendMessage(from, {
            image: response.data,
            caption: `💻 *Code Snap*\n\n> © Powered By Sila Tech`
        }, { quoted: mek })
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐜𝐫𝐞𝐚𝐭𝐞 𝐜𝐨𝐝𝐞 𝐬𝐧𝐚𝐩\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// Image to iOS Maker
cmd({
    pattern: "img2ios",
    alias: ["imagetios", "iphone"],
    react: "📱",
    desc: "Convert image to iOS style",
    category: "maker",
    use: '.img2ios [reply to image]',
    filename: __filename
},
async(conn, mek, m,{from, reply, quoted}) => {
    if (!quoted || !quoted.image) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐫𝐞𝐩𝐥𝐲 𝐭𝐨 𝐚𝐧 𝐢𝐦𝐚𝐠𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    try {
        reply('╔► 𝐏𝐫𝐨𝐜𝐞𝐬𝐬𝐢𝐧𝐠: ⏳\n╚► → 𝐂𝐨𝐧𝐯𝐞𝐫𝐭𝐢𝐧𝐠 𝐭𝐨 𝐢𝐎𝐒 𝐬𝐭𝐲𝐥𝐞...\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
        
        // Need to download image and upload to API
        reply('╔► 𝐍𝐨𝐭𝐞: 📝\n╚► → 𝐓𝐡𝐢𝐬 𝐟𝐞𝐚𝐭𝐮𝐫𝐞 𝐢𝐬 𝐮𝐧𝐝𝐞𝐫 𝐝𝐞𝐯𝐞𝐥𝐨𝐩𝐦𝐞𝐧𝐭\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐜𝐨𝐧𝐯𝐞𝐫𝐭 𝐢𝐦𝐚𝐠𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// JMK48 Maker
cmd({
    pattern: "jmk48",
    alias: ["jmk"],
    react: "🌟",
    desc: "Generate JMK48 image",
    category: "maker",
    use: '.jmk48',
    filename: __filename
},
async(conn, mek, m,{from, reply}) => {
    try {
        const response = await axios.get('https://okatsu-rolezapiiz.vercel.app/maker/jmk48', {
            responseType: 'arraybuffer'
        })
        
        await conn.sendMessage(from, {
            image: response.data,
            caption: '🌟 *JMK48*\n> © Powered By Sila Tech'
        }, { quoted: mek })
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐠𝐞𝐧𝐞𝐫𝐚𝐭𝐞 𝐉𝐌𝐊𝟒𝟖\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// MPLS Maker
cmd({
    pattern: "mpls",
    alias: ["mplsmaker"],
    react: "🏙️",
    desc: "Generate MPLS image",
    category: "maker",
    use: '.mpls',
    filename: __filename
},
async(conn, mek, m,{from, reply}) => {
    try {
        const response = await axios.get('https://okatsu-rolezapiiz.vercel.app/maker/mpls', {
            responseType: 'arraybuffer'
        })
        
        await conn.sendMessage(from, {
            image: response.data,
            caption: '🏙️ *MPLS*\n> © Powered By Sila Tech'
        }, { quoted: mek })
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐠𝐞𝐧𝐞𝐫𝐚𝐭𝐞 𝐌𝐏𝐋𝐒\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// =============================================================
// 📌 DOWNLOADER COMMANDS
// =============================================================

// CapCut Downloader
cmd({
    pattern: "capcut",
    alias: ["capcutdl", "ccdl"],
    react: "✂️",
    desc: "Download CapCut videos",
    category: "downloader",
    use: '.capcut [url]',
    filename: __filename
},
async(conn, mek, m,{from, reply, q}) => {
    if (!q) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐂𝐚𝐩𝐂𝐮𝐭 𝐮𝐫𝐥\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    try {
        const response = await axios.get(`https://okatsu-rolezapiiz.vercel.app/downloader/capcut?url=${encodeURIComponent(q)}`)
        if (response.data && response.data.url) {
            await conn.sendMessage(from, {
                video: { url: response.data.url },
                caption: `✂️ *CapCut Video*\n\n> © Powered By Sila Tech`
            }, { quoted: mek })
        } else {
            reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐝𝐨𝐰𝐧𝐥𝐨𝐚𝐝 𝐂𝐚𝐩𝐂𝐮𝐭 𝐯𝐢𝐝𝐞𝐨\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
        }
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐝𝐨𝐰𝐧𝐥𝐨𝐚𝐝 𝐂𝐚𝐩𝐂𝐮𝐭 𝐯𝐢𝐝𝐞𝐨\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// Git Clone Downloader
cmd({
    pattern: "gitclone",
    alias: ["gitdl", "githubclone"],
    react: "🐙",
    desc: "Clone GitHub repositories",
    category: "downloader",
    use: '.gitclone [repo url]',
    filename: __filename
},
async(conn, mek, m,{from, reply, q}) => {
    if (!q) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐆𝐢𝐭𝐇𝐮𝐛 𝐫𝐞𝐩𝐨 𝐮𝐫𝐥\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    try {
        const response = await axios.get(`https://okatsu-rolezapiiz.vercel.app/downloader/gitclone?url=${encodeURIComponent(q)}`)
        if (response.data && response.data.url) {
            reply(`🐙 *GitHub Clone*\n📦 Repository cloned successfully\n🔗 Download: ${response.data.url}\n\n> © Powered By Sila Tech`)
        } else {
            reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐜𝐥𝐨𝐧𝐞 𝐫𝐞𝐩𝐨𝐬𝐢𝐭𝐨𝐫𝐲\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
        }
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐜𝐥𝐨𝐧𝐞 𝐫𝐞𝐩𝐨𝐬𝐢𝐭𝐨𝐫𝐲\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// Pinterest Downloader
cmd({
    pattern: "pinterest",
    alias: ["pindl", "pin"],
    react: "📌",
    desc: "Download Pinterest images/videos",
    category: "downloader",
    use: '.pinterest [url]',
    filename: __filename
},
async(conn, mek, m,{from, reply, q}) => {
    if (!q) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐏𝐢𝐧𝐭𝐞𝐫𝐞𝐬𝐭 𝐮𝐫𝐥\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    try {
        const response = await axios.get(`https://okatsu-rolezapiiz.vercel.app/downloader/pinterest?url=${encodeURIComponent(q)}`)
        if (response.data && response.data.url) {
            const isVideo = response.data.url.includes('.mp4') || response.data.type === 'video'
            
            if (isVideo) {
                await conn.sendMessage(from, {
                    video: { url: response.data.url },
                    caption: `📌 *Pinterest Video*\n\n> © Powered By Sila Tech`
                }, { quoted: mek })
            } else {
                await conn.sendMessage(from, {
                    image: { url: response.data.url },
                    caption: `📌 *Pinterest Image*\n\n> © Powered By Sila Tech`
                }, { quoted: mek })
            }
        } else {
            reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐝𝐨𝐰𝐧𝐥𝐨𝐚𝐝 𝐏𝐢𝐧𝐭𝐞𝐫𝐞𝐬𝐭\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
        }
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐝𝐨𝐰𝐧𝐥𝐨𝐚𝐝 𝐏𝐢𝐧𝐭𝐞𝐫𝐞𝐬𝐭\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// =============================================================
// 📌 SEARCH COMMANDS
// =============================================================

// GitHub Trending
cmd({
    pattern: "githubtrend",
    alias: ["trendgithub", "gtrend"],
    react: "🔥",
    desc: "Get trending GitHub repositories",
    category: "search",
    use: '.githubtrend',
    filename: __filename
},
async(conn, mek, m,{from, reply}) => {
    try {
        const response = await axios.get('https://okatsu-rolezapiiz.vercel.app/search/githubtrend')
        if (response.data && response.data.result) {
            let trendList = '╔► 𝐆𝐢𝐭𝐇𝐮𝐛 𝐓𝐫𝐞𝐧𝐝𝐢𝐧𝐠: 🔥\n'
            response.data.result.slice(0, 5).forEach((repo, i) => {
                trendList += `╠► ${i+1}. ${repo.name}\n║   ⭐ ${repo.stars || 0} stars\n║   📝 ${repo.description || 'No description'}\n`
            })
            trendList += `╚►\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
            
            reply(trendList)
        } else {
            reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐠𝐞𝐭 𝐭𝐫𝐞𝐧𝐝𝐢𝐧𝐠 𝐫𝐞𝐩𝐨𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
        }
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐠𝐞𝐭 𝐆𝐢𝐭𝐇𝐮𝐛 𝐭𝐫𝐞𝐧𝐝𝐢𝐧𝐠\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// GSM Arena Search
cmd({
    pattern: "gsmarena",
    alias: ["phoneinfo", "mobileinfo"],
    react: "📱",
    desc: "Search mobile phone info",
    category: "search",
    use: '.gsmarena [phone name]',
    filename: __filename
},
async(conn, mek, m,{from, reply, q}) => {
    if (!q) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐩𝐡𝐨𝐧𝐞 𝐧𝐚𝐦𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    try {
        const response = await axios.get(`https://okatsu-rolezapiiz.vercel.app/tools/gsmarena?q=${encodeURIComponent(q)}`)
        if (response.data && response.data.result) {
            const phone = response.data.result[0]
            if (phone) {
                reply(`📱 *${phone.name}*\n📊 ${phone.specs || 'No specs available'}\n\n> © Powered By Sila Tech`)
            } else {
                reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐡𝐨𝐧𝐞 𝐧𝐨𝐭 𝐟𝐨𝐮𝐧𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
            }
        } else {
            reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐬𝐞𝐚𝐫𝐜𝐡 𝐩𝐡𝐨𝐧𝐞 𝐢𝐧𝐟𝐨\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
        }
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐬𝐞𝐚𝐫𝐜𝐡 𝐩𝐡𝐨𝐧𝐞 𝐢𝐧𝐟𝐨\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// Pixiv Search
cmd({
    pattern: "pixiv",
    alias: ["pixivsearch"],
    react: "🎨",
    desc: "Search Pixiv images",
    category: "search",
    use: '.pixiv [query]',
    filename: __filename
},
async(conn, mek, m,{from, reply, q}) => {
    if (!q) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐬𝐞𝐚𝐫𝐜𝐡 𝐪𝐮𝐞𝐫𝐲\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    try {
        const response = await axios.get(`https://okatsu-rolezapiiz.vercel.app/search/pixiv?q=${encodeURIComponent(q)}`)
        if (response.data && response.data.url) {
            await conn.sendMessage(from, {
                image: { url: response.data.url },
                caption: `🎨 *Pixiv Search*\n🔍 ${q}\n\n> © Powered By Sila Tech`
            }, { quoted: mek })
        } else {
            reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐍𝐨 𝐫𝐞𝐬𝐮𝐥𝐭𝐬 𝐟𝐨𝐮𝐧𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
        }
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐬𝐞𝐚𝐫𝐜𝐡 𝐏𝐢𝐱𝐢𝐯\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// =============================================================
// 📌 RANDOM/OTHER COMMANDS
// =============================================================

// Random BA (Beautiful Animated)
cmd({
    pattern: "ba",
    alias: ["beautifulanimated", "randomba"],
    react: "✨",
    desc: "Get random beautiful animated image",
    category: "random",
    use: '.ba',
    filename: __filename
},
async(conn, mek, m,{from, reply}) => {
    try {
        const response = await axios.get('https://okatsu-rolezapiiz.vercel.app/random/ba')
        if (response.data && response.data.url) {
            await conn.sendMessage(from, {
                image: { url: response.data.url },
                caption: '✨ *Beautiful Animated*\n> © Powered By Sila Tech'
            }, { quoted: mek })
        } else {
            reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐠𝐞𝐭 𝐫𝐚𝐧𝐝𝐨𝐦 𝐢𝐦𝐚𝐠𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
        }
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐠𝐞𝐭 𝐫𝐚𝐧𝐝𝐨𝐦 𝐢𝐦𝐚𝐠𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// Lyrics Search
cmd({
    pattern: "lyrics",
    alias: ["songlyrics", "lyric"],
    react: "🎵",
    desc: "Search song lyrics",
    category: "search",
    use: '.lyrics [song name]',
    filename: __filename
},
async(conn, mek, m,{from, reply, q}) => {
    if (!q) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐬𝐨𝐧𝐠 𝐧𝐚𝐦𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    try {
        const response = await axios.get(`https://okatsu-rolezapiiz.vercel.app/api/lyrics?q=${encodeURIComponent(q)}`)
        if (response.data) {
            const lyrics = response.data.lyrics || response.data
            const title = response.data.title || q
            
            reply(`🎵 *${title}*\n\n${lyrics.slice(0, 1500)}${lyrics.length > 1500 ? '...' : ''}\n\n> © Powered By Sila Tech`)
        } else {
            reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐋𝐲𝐫𝐢𝐜𝐬 𝐧𝐨𝐭 𝐟𝐨𝐮𝐧𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
        }
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐠𝐞𝐭 𝐥𝐲𝐫𝐢𝐜𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// AI Command
cmd({
    pattern: "aichat",
    alias: ["chatgpt", "openai"],
    react: "🤖",
    desc: "Chat with AI",
    category: "ai",
    use: '.aichat [message]',
    filename: __filename
},
async(conn, mek, m,{from, reply, q}) => {
    if (!q) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐦𝐞𝐬𝐬𝐚𝐠𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    try {
        const response = await axios.get(`https://okatsu-rolezapiiz.vercel.app/ai/ai?q=${encodeURIComponent(q)}`)
        if (response.data && response.data.result) {
            reply(`🤖 *AI Response*\n\n${response.data.result}\n\n> © Powered By Sila Tech`)
        } else {
            reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐍𝐨 𝐫𝐞𝐬𝐩𝐨𝐧𝐬𝐞 𝐟𝐫𝐨𝐦 𝐀𝐈\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
        }
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐠𝐞𝐭 𝐀𝐈 𝐫𝐞𝐬𝐩𝐨𝐧𝐬𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})