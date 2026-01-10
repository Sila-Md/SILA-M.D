const config = require('../config')
const { cmd } = require('../command')
const axios = require('axios')

// =============================================================
// 📌 RANDOM/MISC COMMANDS
// =============================================================

// Random PPCouple
cmd({
    pattern: "ppcp",
    alias: ["couplepp", "randomcouple"],
    react: "👫",
    desc: "Get random profile picture couple",
    category: "random",
    use: '.ppcp',
    filename: __filename
},
async(conn, mek, m,{from, reply, sender}) => {
    try {
        const response = await axios.get('https://okatsu-rolezapiiz.vercel.app/random/ppcp')
        if (response.data && response.data.url) {
            await conn.sendMessage(from, {
                image: { url: response.data.url },
                caption: '👫 *Random Couple PP*\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡',
                contextInfo: { 
                    mentionedJid: [sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363402325089913@newsletter',
                        newsletterName: '🎅𝚂𝙸𝙻𝙰 𝚃𝙴𝙲𝙷🎅',
                        serverMessageId: 143
                    }
                }
            }, { quoted: mek })
        } else {
            reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐠𝐞𝐭 𝐫𝐚𝐧𝐝𝐨𝐦 𝐜𝐨𝐮𝐩𝐥𝐞 𝐏𝐏\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
        }
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐠𝐞𝐭 𝐫𝐚𝐧𝐝𝐨𝐦 𝐜𝐨𝐮𝐩𝐥𝐞 𝐏𝐏\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// =============================================================
// 📌 MAKER COMMANDS
// =============================================================

// QC Maker
cmd({
    pattern: "qc",
    alias: ["qcmaker", "quotecreator"],
    react: "💬",
    desc: "Create quote image",
    category: "maker",
    use: '.qc [text]',
    filename: __filename
},
async(conn, mek, m,{from, reply, q, sender}) => {
    if (!q) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐭𝐞𝐱𝐭\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    try {
        const response = await axios.get(`https://okatsu-rolezapiiz.vercel.app/maker/qc?q=${encodeURIComponent(q)}`, {
            responseType: 'arraybuffer'
        })
        
        await conn.sendMessage(from, {
            image: response.data,
            caption: `💬 *Quote Creator*\n📝 ${q}\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
            contextInfo: { 
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402325089913@newsletter',
                    newsletterName: '🎅𝚂𝙸𝙻𝙰 𝚃𝙴𝙲𝙷🎅',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek })
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐜𝐫𝐞𝐚𝐭𝐞 𝐪𝐮𝐨𝐭𝐞 𝐢𝐦𝐚𝐠𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// Tobotak Maker
cmd({
    pattern: "tobotak",
    alias: ["botakmaker"],
    react: "👨‍🦲",
    desc: "Create botak image",
    category: "maker",
    use: '.tobotak [text]',
    filename: __filename
},
async(conn, mek, m,{from, reply, q, sender}) => {
    if (!q) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐭𝐞𝐱𝐭\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    try {
        const response = await axios.get(`https://okatsu-rolezapiiz.vercel.app/maker/tobotak?q=${encodeURIComponent(q)}`, {
            responseType: 'arraybuffer'
        })
        
        await conn.sendMessage(from, {
            image: response.data,
            caption: `👨‍🦲 *Botak Maker*\n📝 ${q}\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
            contextInfo: { 
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402325089913@newsletter',
                    newsletterName: '🎅𝚂𝙸𝙻𝙰 𝚃𝙴𝙲𝙷🎅',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek })
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐜𝐫𝐞𝐚𝐭𝐞 𝐛𝐨𝐭𝐚𝐤 𝐢𝐦𝐚𝐠𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// Tocoklat Maker
cmd({
    pattern: "tocoklat",
    alias: ["coklatmaker"],
    react: "🍫",
    desc: "Create chocolate text image",
    category: "maker",
    use: '.tocoklat [text]',
    filename: __filename
},
async(conn, mek, m,{from, reply, q, sender}) => {
    if (!q) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐭𝐞𝐱𝐭\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    try {
        const response = await axios.get(`https://okatsu-rolezapiiz.vercel.app/maker/tocoklat?q=${encodeURIComponent(q)}`, {
            responseType: 'arraybuffer'
        })
        
        await conn.sendMessage(from, {
            image: response.data,
            caption: `🍫 *Chocolate Text*\n📝 ${q}\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
            contextInfo: { 
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402325089913@newsletter',
                    newsletterName: '🎅𝚂𝙸𝙻𝙰 𝚃𝙴𝙲𝙷🎅',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek })
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐜𝐫𝐞𝐚𝐭𝐞 𝐜𝐡𝐨𝐜𝐨𝐥𝐚𝐭𝐞 𝐭𝐞𝐱𝐭\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// =============================================================
// 📌 STALK COMMANDS
// =============================================================

// Roblox Stalk
cmd({
    pattern: "roblox",
    alias: ["stalkroblox", "robloxstalk"],
    react: "🎮",
    desc: "Stalk Roblox user",
    category: "stalk",
    use: '.roblox [username]',
    filename: __filename
},
async(conn, mek, m,{from, reply, q, sender}) => {
    if (!q) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐑𝐨𝐛𝐥𝐨𝐱 𝐮𝐬𝐞𝐫𝐧𝐚𝐦𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    try {
        const response = await axios.get(`https://okatsu-rolezapiiz.vercel.app/stalk/roblox?q=${encodeURIComponent(q)}`)
        if (response.data) {
            const user = response.data
            const info = `🎮 *Roblox User Info*\n\n👤 *Username:* ${user.username || q}\n📊 *User ID:* ${user.userId || 'N/A'}\n📝 *Description:* ${user.description || 'No description'}\n📅 *Created:* ${user.created || 'Unknown'}\n👥 *Followers:* ${user.followers || 0}\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
            
            await conn.sendMessage(from, {
                text: info,
                contextInfo: { 
                    mentionedJid: [sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363402325089913@newsletter',
                        newsletterName: '🎅𝚂𝙸𝙻𝙰 𝚃𝙴𝙲𝙷🎅',
                        serverMessageId: 143
                    }
                }
            }, { quoted: mek })
        } else {
            reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐔𝐬𝐞𝐫 𝐧𝐨𝐭 𝐟𝐨𝐮𝐧𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
        }
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐬𝐭𝐚𝐥𝐤 𝐑𝐨𝐛𝐥𝐨𝐱 𝐮𝐬𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// Twitter Stalk
cmd({
    pattern: "twitter",
    alias: ["stalktwitter", "twitterstalk"],
    react: "🐦",
    desc: "Stalk Twitter user",
    category: "stalk",
    use: '.twitter [username]',
    filename: __filename
},
async(conn, mek, m,{from, reply, q, sender}) => {
    if (!q) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐓𝐰𝐢𝐭𝐭𝐞𝐫 𝐮𝐬𝐞𝐫𝐧𝐚𝐦𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    try {
        const response = await axios.get(`https://okatsu-rolezapiiz.vercel.app/stalk/twitterstalk?q=${encodeURIComponent(q)}`)
        if (response.data) {
            const user = response.data
            const info = `🐦 *Twitter User Info*\n\n👤 *Username:* @${user.username || q}\n📛 *Display Name:* ${user.displayName || 'N/A'}\n📝 *Bio:* ${user.bio || 'No bio'}\n📊 *Followers:* ${user.followers || 0}\n📈 *Following:* ${user.following || 0}\n🐦 *Tweets:* ${user.tweets || 0}\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
            
            await conn.sendMessage(from, {
                text: info,
                contextInfo: { 
                    mentionedJid: [sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363402325089913@newsletter',
                        newsletterName: '🎅𝚂𝙸𝙻𝙰 𝚃𝙴𝙲𝙷🎅',
                        serverMessageId: 143
                    }
                }
            }, { quoted: mek })
        } else {
            reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐔𝐬𝐞𝐫 𝐧𝐨𝐭 𝐟𝐨𝐮𝐧𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
        }
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐬𝐭𝐚𝐥𝐤 𝐓𝐰𝐢𝐭𝐭𝐞𝐫 𝐮𝐬𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// =============================================================
// 📌 AI COMMANDS
// =============================================================

// SciTE AI
cmd({
    pattern: "scite",
    alias: ["scienceai", "sciai"],
    react: "🔬",
    desc: "Science & Technology AI",
    category: "ai",
    use: '.scite [question]',
    filename: __filename
},
async(conn, mek, m,{from, reply, q, sender}) => {
    if (!q) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐪𝐮𝐞𝐬𝐭𝐢𝐨𝐧\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    try {
        const response = await axios.get(`https://okatsu-rolezapiiz.vercel.app/ai/scite?q=${encodeURIComponent(q)}`)
        if (response.data && response.data.result) {
            await conn.sendMessage(from, {
                text: `🔬 *SciTE AI*\n\n${response.data.result}\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
                contextInfo: { 
                    mentionedJid: [sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363402325089913@newsletter',
                        newsletterName: '🎅𝚂𝙸𝙻𝙰 𝚃𝙴𝙲𝙷🎅',
                        serverMessageId: 143
                    }
                }
            }, { quoted: mek })
        } else {
            reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐍𝐨 𝐫𝐞𝐬𝐩𝐨𝐧𝐬𝐞 𝐟𝐫𝐨𝐦 𝐀𝐈\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
        }
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐠𝐞𝐭 𝐀𝐈 𝐫𝐞𝐬𝐩𝐨𝐧𝐬𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// =============================================================
// 📌 DOWNLOADER COMMANDS
// =============================================================

// Spotify Search
cmd({
    pattern: "spotify2",
    alias: ["spotisearch", "spotifind"],
    react: "🎶",
    desc: "Search Spotify songs",
    category: "downloader",
    use: '.spotify2 [song name]',
    filename: __filename
},
async(conn, mek, m,{from, reply, q, sender}) => {
    if (!q) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐬𝐨𝐧𝐠 𝐧𝐚𝐦𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    try {
        const response = await axios.get(`https://okatsu-rolezapiiz.vercel.app/search/spotify?q=${encodeURIComponent(q)}`)
        if (response.data && response.data.url) {
            await conn.sendMessage(from, {
                audio: { url: response.data.url },
                mimetype: 'audio/mpeg',
                caption: `🎶 *Spotify Song*\n🎵 ${q}\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
                contextInfo: { 
                    mentionedJid: [sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363402325089913@newsletter',
                        newsletterName: '🎅𝚂𝙸𝙻𝙰 𝚃𝙴𝙲𝙷🎅',
                        serverMessageId: 143
                    }
                }
            }, { quoted: mek })
        } else {
            reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐒𝐨𝐧𝐠 𝐧𝐨𝐭 𝐟𝐨𝐮𝐧𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
        }
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐝𝐨𝐰𝐧𝐥𝐨𝐚𝐝 𝐒𝐩𝐨𝐭𝐢𝐟𝐲 𝐬𝐨𝐧𝐠\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// TikTok Random Downloader
cmd({
    pattern: "tiktokrandom",
    alias: ["ttrandom", "tiktokrnd"],
    react: "🎵",
    desc: "Download random TikTok video",
    category: "downloader",
    use: '.tiktokrandom',
    filename: __filename
},
async(conn, mek, m,{from, reply, sender}) => {
    try {
        const response = await axios.get('https://okatsu-rolezapiiz.vercel.app/downloader/tiktokrandom')
        if (response.data && response.data.url) {
            await conn.sendMessage(from, {
                video: { url: response.data.url },
                caption: `🎵 *Random TikTok*\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
                contextInfo: { 
                    mentionedJid: [sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363402325089913@newsletter',
                        newsletterName: '🎅𝚂𝙸𝙻𝙰 𝚃𝙴𝙲𝙷🎅',
                        serverMessageId: 143
                    }
                }
            }, { quoted: mek })
        } else {
            reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐠𝐞𝐭 𝐫𝐚𝐧𝐝𝐨𝐦 𝐓𝐢𝐤𝐓𝐨𝐤\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
        }
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐠𝐞𝐭 𝐫𝐚𝐧𝐝𝐨𝐦 𝐓𝐢𝐤𝐓𝐨𝐤\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// TTSlide Downloader
cmd({
    pattern: "ttslide",
    alias: ["tiktokslide", "slideshow"],
    react: "📱",
    desc: "Download TikTok slideshow",
    category: "downloader",
    use: '.ttslide [url]',
    filename: __filename
},
async(conn, mek, m,{from, reply, q, sender}) => {
    if (!q) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐓𝐢𝐤𝐓𝐨𝐤 𝐮𝐫𝐥\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    try {
        const response = await axios.get(`https://okatsu-rolezapiiz.vercel.app/downloader/ttslide?url=${encodeURIComponent(q)}`)
        if (response.data && response.data.url) {
            await conn.sendMessage(from, {
                video: { url: response.data.url },
                caption: `📱 *TikTok Slideshow*\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
                contextInfo: { 
                    mentionedJid: [sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363402325089913@newsletter',
                        newsletterName: '🎅𝚂𝙸𝙻𝙰 𝚃𝙴𝙲𝙷🎅',
                        serverMessageId: 143
                    }
                }
            }, { quoted: mek })
        } else {
            reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐝𝐨𝐰𝐧𝐥𝐨𝐚𝐝 𝐬𝐥𝐢𝐝𝐞𝐬𝐡𝐨𝐰\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
        }
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐝𝐨𝐰𝐧𝐥𝐨𝐚𝐝 𝐬𝐥𝐢𝐝𝐞𝐬𝐡𝐨𝐰\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// TikTok Search
cmd({
    pattern: "tiktoksearch",
    alias: ["searchtiktok", "ttsearch"],
    react: "🔍",
    desc: "Search TikTok videos",
    category: "downloader",
    use: '.tiktoksearch [query]',
    filename: __filename
},
async(conn, mek, m,{from, reply, q, sender}) => {
    if (!q) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐬𝐞𝐚𝐫𝐜𝐡 𝐪𝐮𝐞𝐫𝐲\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    try {
        const response = await axios.get(`https://okatsu-rolezapiiz.vercel.app/search/tiktoksearch?q=${encodeURIComponent(q)}`)
        if (response.data && response.data.url) {
            await conn.sendMessage(from, {
                video: { url: response.data.url },
                caption: `🔍 *TikTok Search*\n🎵 ${q}\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
                contextInfo: { 
                    mentionedJid: [sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363402325089913@newsletter',
                        newsletterName: '🎅𝚂𝙸𝙻𝙰 𝚃𝙴𝙲𝙷🎅',
                        serverMessageId: 143
                    }
                }
            }, { quoted: mek })
        } else {
            reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐍𝐨 𝐫𝐞𝐬𝐮𝐥𝐭𝐬 𝐟𝐨𝐮𝐧𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
        }
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐬𝐞𝐚𝐫𝐜𝐡 𝐓𝐢𝐤𝐓𝐨𝐤\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// =============================================================
// 📌 ANIME COMMANDS
// =============================================================

// Anime List Command (Combines all anime APIs)
cmd({
    pattern: "animelist",
    alias: ["allanime", "animeall"],
    react: "📜",
    desc: "Show all anime commands",
    category: "anime",
    use: '.animelist',
    filename: __filename
},
async(conn, mek, m,{from, reply, prefix, sender}) => {
    const animeList = `📜 *𝐀𝐍𝐈𝐌𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒 𝐋𝐈𝐒𝐓*\n\n` +
        `🌸 *${prefix}akiyama* - Get Akiyama anime image\n` +
        `🎨 *${prefix}deidara* - Get Deidara anime image\n` +
        `🎭 *${prefix}fanart* - Get anime fanart\n` +
        `😊 *${prefix}animehappy* - Get happy anime image\n` +
        `🤗 *${prefix}hug* - Get anime hug image\n` +
        `💋 *${prefix}animekiss* - Get anime kiss image\n` +
        `🌸 *${prefix}waifu* - Get random waifu image\n` +
        `📜 *${prefix}anime* - Get anime quote with details\n` +
        `\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
    
    await conn.sendMessage(from, {
        text: animeList,
        contextInfo: { 
            mentionedJid: [sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: '🎅𝚂𝙸𝙻𝙰 𝚃𝙴𝙲𝙷🎅',
                serverMessageId: 143
            }
        }
    }, { quoted: mek })
})

// Waifu Image
cmd({
    pattern: "waifu",
    alias: ["waifupic", "randomwaifu"],
    react: "🌸",
    desc: "Get random waifu image",
    category: "anime",
    use: '.waifu',
    filename: __filename
},
async(conn, mek, m,{from, reply, sender}) => {
    try {
        const response = await axios.get('https://okatsu-rolezapiiz.vercel.app/anime/waifu')
        if (response.data && response.data.url) {
            await conn.sendMessage(from, {
                image: { url: response.data.url },
                caption: '🌸 *Random Waifu*\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡',
                contextInfo: { 
                    mentionedJid: [sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363402325089913@newsletter',
                        newsletterName: '🎅𝚂𝙸𝙻𝙰 𝚃𝙴𝙲𝙷🎅',
                        serverMessageId: 143
                    }
                }
            }, { quoted: mek })
        } else {
            reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐠𝐞𝐭 𝐰𝐚𝐢𝐟𝐮 𝐢𝐦𝐚𝐠𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
        }
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐠𝐞𝐭 𝐰𝐚𝐢𝐟𝐮 𝐢𝐦𝐚𝐠𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// Anime Command (General)
cmd({
    pattern: "anime",
    alias: ["animequote", "aq"],
    react: "🌸",
    desc: "Get random anime quote",
    category: "anime",
    use: '.anime',
    filename: __filename
},
async(conn, mek, m,{from, reply, sender}) => {
    try {
        const response = await axios.get('https://okatsu-rolezapiiz.vercel.app/anime/')
        if (response.data) {
            const animeData = response.data
            const info = `🌸 *𝐀𝐍𝐈𝐌𝐄 𝐐𝐔𝐎𝐓𝐄*\n\n` +
                `💬 *Quote:* ${animeData.quote || 'N/A'}\n` +
                `👤 *Character:* ${animeData.character || 'N/A'}\n` +
                `📺 *Anime:* ${animeData.anime || 'N/A'}\n` +
                `🎬 *Episode:* ${animeData.episode || 'N/A'}\n\n` +
                `> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
            
            await conn.sendMessage(from, {
                text: info,
                contextInfo: { 
                    mentionedJid: [sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363402325089913@newsletter',
                        newsletterName: '🎅𝚂𝙸𝙻𝙰 𝚃𝙴𝙲𝙷🎅',
                        serverMessageId: 143
                    }
                }
            }, { quoted: mek })
        } else {
            reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐠𝐞𝐭 𝐚𝐧𝐢𝐦𝐞 𝐪𝐮𝐨𝐭𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
        }
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐠𝐞𝐭 𝐚𝐧𝐢𝐦𝐞 𝐪𝐮𝐨𝐭𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// =============================================================
// 📌 YOUTUBE COMMANDS
// =============================================================

// YouTube Search
cmd({
    pattern: "youtube",
    alias: ["ytsearch", "searchyt"],
    react: "🎬",
    desc: "Search YouTube videos",
    category: "downloader",
    use: '.youtube [query]',
    filename: __filename
},
async(conn, mek, m,{from, reply, q, sender}) => {
    if (!q) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐬𝐞𝐚𝐫𝐜𝐡 𝐪𝐮𝐞𝐫𝐲\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    try {
        const response = await axios.get(`https://okatsu-rolezapiiz.vercel.app/search/youtube?q=${encodeURIComponent(q)}`)
        if (response.data && response.data.result) {
            const videos = response.data.result.slice(0, 3)
            let resultText = `🎬 *𝐘𝐨𝐮𝐓𝐮𝐛𝐞 𝐒𝐞𝐚𝐫𝐜𝐡 𝐑𝐞𝐬𝐮𝐥𝐭𝐬*\n🔍 *Query:* ${q}\n\n`
            
            videos.forEach((video, i) => {
                resultText += `${i+1}. *${video.title}*\n📊 ${video.views || 'N/A'} views | ⏱️ ${video.duration || 'N/A'}\n📅 ${video.uploaded || 'N/A'}\n🔗 ${video.url || 'N/A'}\n\n`
            })
            
            resultText += `> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
            
            await conn.sendMessage(from, {
                text: resultText,
                contextInfo: { 
                    mentionedJid: [sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363402325089913@newsletter',
                        newsletterName: '🎅𝚂𝙸𝙻𝙰 𝚃𝙴𝙲𝙷🎅',
                        serverMessageId: 143
                    }
                }
            }, { quoted: mek })
        } else {
            reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐍𝐨 𝐫𝐞𝐬𝐮𝐥𝐭𝐬 𝐟𝐨𝐮𝐧𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
        }
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐬𝐞𝐚𝐫𝐜𝐡 𝐘𝐨𝐮𝐓𝐮𝐛𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// =============================================================
// 📌 COOKPAD COMMANDS
// =============================================================

// Cookpad Search
cmd({
    pattern: "cookpad",
    alias: ["recipe", "recipesearch"],
    react: "🍳",
    desc: "Search recipes on Cookpad",
    category: "tools",
    use: '.cookpad [recipe name]',
    filename: __filename
},
async(conn, mek, m,{from, reply, q, sender}) => {
    if (!q) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐫𝐞𝐜𝐢𝐩𝐞 𝐧𝐚𝐦𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    try {
        const response = await axios.get(`https://okatsu-rolezapiiz.vercel.app/cookpad/search?q=${encodeURIComponent(q)}`)
        if (response.data && response.data.result) {
            const recipes = response.data.result.slice(0, 3)
            let resultText = `🍳 *𝐂𝐨𝐨𝐤𝐩𝐚𝐝 𝐑𝐞𝐜𝐢𝐩𝐞𝐬*\n🔍 *Search:* ${q}\n\n`
            
            recipes.forEach((recipe, i) => {
                resultText += `${i+1}. *${recipe.title}*\n👤 By: ${recipe.author || 'Unknown'}\n⭐ ${recipe.rating || 'No rating'}\n🔗 ${recipe.url || 'N/A'}\n\n`
            })
            
            resultText += `> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
            
            await conn.sendMessage(from, {
                text: resultText,
                contextInfo: { 
                    mentionedJid: [sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363402325089913@newsletter',
                        newsletterName: '🎅𝚂𝙸𝙻𝙰 𝚃𝙴𝙲𝙷🎅',
                        serverMessageId: 143
                    }
                }
            }, { quoted: mek })
        } else {
            reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐍𝐨 𝐫𝐞𝐜𝐢𝐩𝐞𝐬 𝐟𝐨𝐮𝐧𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
        }
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐬𝐞𝐚𝐫𝐜𝐡 𝐫𝐞𝐜𝐢𝐩𝐞𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// Cookpad Detail
cmd({
    pattern: "recipe",
    alias: ["recipedetail", "cookdetail"],
    react: "📖",
    desc: "Get recipe details",
    category: "tools",
    use: '.recipe [url]',
    filename: __filename
},
async(conn, mek, m,{from, reply, q, sender}) => {
    if (!q) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐫𝐞𝐜𝐢𝐩𝐞 𝐮𝐫𝐥\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    try {
        const response = await axios.get(`https://okatsu-rolezapiiz.vercel.app/cookpad/detail?url=${encodeURIComponent(q)}`)
        if (response.data) {
            const recipe = response.data
            const info = `📖 *𝐑𝐞𝐜𝐢𝐩𝐞 𝐃𝐞𝐭𝐚𝐢𝐥𝐬*\n\n` +
                `🍽️ *Title:* ${recipe.title || 'N/A'}\n` +
                `👨‍🍳 *Author:* ${recipe.author || 'Unknown'}\n` +
                `⏱️ *Cook Time:* ${recipe.cook_time || 'N/A'}\n` +
                `👥 *Servings:* ${recipe.servings || 'N/A'}\n` +
                `⭐ *Rating:* ${recipe.rating || 'No rating'}\n\n` +
                `📝 *Ingredients:*\n${recipe.ingredients || 'N/A'}\n\n` +
                `👨‍🍳 *Instructions:*\n${recipe.instructions || 'N/A'}\n\n` +
                `> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
            
            await conn.sendMessage(from, {
                text: info,
                contextInfo: { 
                    mentionedJid: [sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363402325089913@newsletter',
                        newsletterName: '🎅𝚂𝙸𝙻𝙰 𝚃𝙴𝙲𝙷🎅',
                        serverMessageId: 143
                    }
                }
            }, { quoted: mek })
        } else {
            reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐠𝐞𝐭 𝐫𝐞𝐜𝐢𝐩𝐞 𝐝𝐞𝐭𝐚𝐢𝐥𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
        }
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐠𝐞𝐭 𝐫𝐞𝐜𝐢𝐩𝐞 𝐝𝐞𝐭𝐚𝐢𝐥𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// =============================================================
// 📌 TOOLS COMMANDS
// =============================================================

// Image to Sketch
cmd({
    pattern: "sketch",
    alias: ["img2sketch", "pencilsketch"],
    react: "✏️",
    desc: "Convert image to sketch",
    category: "tools",
    use: '.sketch [reply to image]',
    filename: __filename
},
async(conn, mek, m,{from, reply, quoted, sender}) => {
    if (!quoted || !quoted.image) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐫𝐞𝐩𝐥𝐲 𝐭𝐨 𝐚𝐧 𝐢𝐦𝐚𝐠𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    try {
        reply('╔► 𝐏𝐫𝐨𝐜𝐞𝐬𝐬𝐢𝐧𝐠: ⏳\n╚► → 𝐂𝐨𝐧𝐯𝐞𝐫𝐭𝐢𝐧𝐠 𝐢𝐦𝐚𝐠𝐞 𝐭𝐨 𝐬𝐤𝐞𝐭𝐜𝐡...\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
        
        // Note: Need image upload functionality
        reply('╔► 𝐍𝐨𝐭𝐞: 📝\n╚► → 𝐓𝐡𝐢𝐬 𝐟𝐞𝐚𝐭𝐮𝐫𝐞 𝐫𝐞𝐪𝐮𝐢𝐫𝐞𝐬 𝐢𝐦𝐚𝐠𝐞 𝐮𝐩𝐥𝐨𝐚𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐜𝐨𝐧𝐯𝐞𝐫𝐭 𝐢𝐦𝐚𝐠𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// Remove Background
cmd({
    pattern: "removebg",
    alias: ["rmbg", "nobg"],
    react: "🏞️",
    desc: "Remove image background",
    category: "tools",
    use: '.removebg [reply to image]',
    filename: __filename
},
async(conn, mek, m,{from, reply, quoted, sender}) => {
    if (!quoted || !quoted.image) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐫𝐞𝐩𝐥𝐲 𝐭𝐨 𝐚𝐧 𝐢𝐦𝐚𝐠𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    try {
        reply('╔► 𝐏𝐫𝐨𝐜𝐞𝐬𝐬𝐢𝐧𝐠: ⏳\n╚► → 𝐑𝐞𝐦𝐨𝐯𝐢𝐧𝐠 𝐛𝐚𝐜𝐤𝐠𝐫𝐨𝐮𝐧𝐝...\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
        
        // Note: Need image upload functionality
        reply('╔► 𝐍𝐨𝐭𝐞: 📝\n╚► → 𝐓𝐡𝐢𝐬 𝐟𝐞𝐚𝐭𝐮𝐫𝐞 𝐫𝐞𝐪𝐮𝐢𝐫𝐞𝐬 𝐢𝐦𝐚𝐠𝐞 𝐮𝐩𝐥𝐨𝐚𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐫𝐞𝐦𝐨𝐯𝐞 𝐛𝐚𝐜𝐤𝐠𝐫𝐨𝐮𝐧𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})

// SS Tweet
cmd({
    pattern: "sstweet",
    alias: ["tweetscreenshot", "ssx"],
    react: "🐦",
    desc: "Take screenshot of tweet",
    category: "tools",
    use: '.sstweet [tweet url]',
    filename: __filename
},
async(conn, mek, m,{from, reply, q, sender}) => {
    if (!q) return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐭𝐰𝐞𝐞𝐭 𝐮𝐫𝐥\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    
    try {
        const response = await axios.get(`https://okatsu-rolezapiiz.vercel.app/tools/sstweet?url=${encodeURIComponent(q)}`, {
            responseType: 'arraybuffer'
        })
        
        await conn.sendMessage(from, {
            image: response.data,
            caption: `🐦 *Tweet Screenshot*\n🔗 ${q}\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
            contextInfo: { 
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402325089913@newsletter',
                    newsletterName: '🎅𝚂𝙸𝙻𝙰 𝚃𝙴𝙲𝙷🎅',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek })
    } catch (e) {
        reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐭𝐚𝐤𝐞 𝐭𝐰𝐞𝐞𝐭 𝐬𝐜𝐫𝐞𝐞𝐧𝐬𝐡𝐨𝐭\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡')
    }
})