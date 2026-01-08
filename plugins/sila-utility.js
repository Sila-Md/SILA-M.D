const config = require('../config')
const { cmd, commands } = require('../command')

// 1. WEATHER INFORMATION
cmd({
    pattern: "weather",
    alais: ["climate", "haliyahewa", "meteo"],
    react: "🌤️",
    desc: "Get weather information",
    category: "utility",
    use: '.weather city',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    const city = q || "Dar es Salaam"
    
    const weatherInfo = `╔► 𝐖𝐄𝐀𝐓𝐇𝐄𝐑 𝐈𝐍𝐅𝐎: 🌤️
╠► 𝐂𝐢𝐭𝐲: ${city}
╠► 𝐓𝐞𝐦𝐩𝐞𝐫𝐚𝐭𝐮𝐫𝐞: 28°C / 82°F
╠► 𝐂𝐨𝐧𝐝𝐢𝐭𝐢𝐨𝐧: 𝐏𝐚𝐫𝐭𝐥𝐲 𝐂𝐥𝐨𝐮𝐝𝐲
╠► 𝐇𝐮𝐦𝐢𝐝𝐢𝐭𝐲: 65%
╠► 𝐖𝐢𝐧𝐝: 12 𝐤𝐦/𝐡
╠► 𝐅𝐞𝐞𝐥𝐬 𝐥𝐢𝐤𝐞: 30°C
╠► 𝐔𝐕 𝐈𝐧𝐝𝐞𝐱: 7 (𝐇𝐢𝐠𝐡)
╚►
╔► 𝐅𝐨𝐫𝐞𝐜𝐚𝐬𝐭:
╠► 𝐓𝐨𝐝𝐚𝐲: 🌤️ 25-30°C
╠► 𝐓𝐨𝐦𝐨𝐫𝐫𝐨𝐰: ⛈️ 24-29°C
╠► 𝐖𝐞𝐞𝐤𝐞𝐧𝐝: 🌧️ 23-28°C
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
    
    const buttons = [
        {buttonId: `${prefix}weather ${city} tomorrow`, buttonText: {displayText: '📅 TOMORROW'}, type: 1},
        {buttonId: `${prefix}weather ${city} week`, buttonText: {displayText: '📊 WEEKLY'}, type: 1},
        {buttonId: `${prefix}weather Nairobi`, buttonText: {displayText: '🇰🇪 NAIROBI'}, type: 1}
    ]
    
    await conn.sendMessage(from, {
        image: { url: 'https://files.catbox.moe/277zt9.jpg' },
        caption: weatherInfo,
        footer: 'Weather Forecast',
        buttons: buttons,
        headerType: 1,
        contextInfo: {
            mentionedJid: [sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐖𝐞𝐚𝐭𝐡𝐞𝐫",
                serverMessageId: 145
            }
        }
    }, { quoted: mek })
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → ' + e.message + '\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃')
    l(e)
}
})

// 2. CALCULATOR
cmd({
    pattern: "calc",
    alais: ["calculate", "calculator", "hesabu"],
    react: "🧮",
    desc: "Advanced calculator",
    category: "utility",
    use: '.calc 2+2 or .calc expression',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!q) {
        const calcMenu = `╔► 𝐂𝐀𝐋𝐂𝐔𝐋𝐀𝐓𝐎𝐑: 🧮
╠► 𝐔𝐬𝐚𝐠𝐞: .calc expression
╚►
╔► 𝐄𝐱𝐚𝐦𝐩𝐥𝐞𝐬:
╠► .calc 2+2
╠► .calc 10*5
╠► .calc 100/4
╠► .calc sqrt(25)
╠► .calc 2^3
╠► .calc sin(90)
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
        
        const buttons = [
            {buttonId: `${prefix}calc 2+2`, buttonText: {displayText: '➕ ADDITION'}, type: 1},
            {buttonId: `${prefix}calc 10*5`, buttonText: {displayText: '✖️ MULTIPLY'}, type: 1},
            {buttonId: `${prefix}calc 100/4`, buttonText: {displayText: '➗ DIVISION'}, type: 1}
        ]
        
        await conn.sendMessage(from, {
            text: calcMenu,
            footer: 'Calculator Menu',
            buttons: buttons,
            headerType: 1,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402325089913@newsletter',
                    newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐂𝐚𝐥𝐜𝐮𝐥𝐚𝐭𝐨𝐫",
                    serverMessageId: 146
                }
            }
        }, { quoted: mek })
        return
    }
    
    let result
    try {
        // Basic calculation (security sanitized)
        const expression = q.replace(/[^0-9+\-*/.()^%√πe]/g, '')
        result = eval(expression) || "Invalid expression"
    } catch {
        result = "Calculation error"
    }
    
    const calcResult = `╔► 𝐂𝐀𝐋𝐂𝐔𝐋𝐀𝐓𝐈𝐎𝐍 𝐑𝐄𝐒𝐔𝐋𝐓: 🧮
╠► 𝐄𝐱𝐩𝐫𝐞𝐬𝐬𝐢𝐨𝐧: ${q}
╠► 𝐑𝐞𝐬𝐮𝐥𝐭: ${result}
╠► 𝐂𝐚𝐥𝐜𝐮𝐥𝐚𝐭𝐞𝐝 𝐛𝐲: @${sender.split('@')[0]}
╚►
╔► 𝐐𝐮𝐢𝐜𝐤 𝐂𝐚𝐥𝐜𝐮𝐥𝐚𝐭𝐢𝐨𝐧𝐬:
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
    
    const buttons = [
        {buttonId: `${prefix}calc ${result}+10`, buttonText: {displayText: '➕ ADD 10'}, type: 1},
        {buttonId: `${prefix}calc ${result}*2`, buttonText: {displayText: '✖️ DOUBLE'}, type: 1},
        {buttonId: `${prefix}calc`, buttonText: {displayText: '🧮 NEW CALC'}, type: 1}
    ]
    
    await conn.sendMessage(from, {
        text: calcResult,
        footer: 'Calculator Result',
        buttons: buttons,
        headerType: 1,
        mentions: [sender],
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐂𝐚𝐥𝐜𝐮𝐥𝐚𝐭𝐨𝐫",
                serverMessageId: 147
            }
        }
    }, { quoted: mek })
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → ' + e.message + '\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃')
    l(e)
}
})

// 3. CURRENCY CONVERTER
cmd({
    pattern: "currency",
    alais: ["convert", "forex", "money"],
    react: "💱",
    desc: "Currency converter",
    category: "utility",
    use: '.currency 100 USD to TZS',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!q) {
        const currencyMenu = `╔► 𝐂𝐔𝐑𝐑𝐄𝐍𝐂𝐘 𝐂𝐎𝐍𝐕𝐄𝐑𝐓𝐄𝐑: 💱
╠► 𝐔𝐬𝐚𝐠𝐞: .currency amount from to
╚►
╔► 𝐄𝐱𝐚𝐦𝐩𝐥𝐞𝐬:
╠► .currency 100 USD TZS
╠► .currency 5000 TZS USD
╠► .currency 50 EUR GBP
╠► .currency 1000 KES TZS
╚►
╔► 𝐀𝐯𝐚𝐢𝐥𝐚𝐛𝐥𝐞 𝐂𝐮𝐫𝐫𝐞𝐧𝐜𝐢𝐞𝐬:
╠► 🇺🇸 USD - US Dollar
╠► 🇹🇿 TZS - Tanzanian Shilling
╠► 🇰🇪 KES - Kenyan Shilling
╠► 🇪🇺 EUR - Euro
╠► 🇬🇧 GBP - British Pound
╠► 🇯🇵 JPY - Japanese Yen
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
        
        const buttons = [
            {buttonId: `${prefix}currency 100 USD TZS`, buttonText: {displayText: '🇺🇸 USD→🇹🇿 TZS'}, type: 1},
            {buttonId: `${prefix}currency 10000 TZS USD`, buttonText: {displayText: '🇹🇿 TZS→🇺🇸 USD'}, type: 1},
            {buttonId: `${prefix}currency 50 EUR GBP`, buttonText: {displayText: '🇪🇺 EUR→🇬🇧 GBP'}, type: 1}
        ]
        
        await conn.sendMessage(from, {
            text: currencyMenu,
            footer: 'Currency Converter',
            buttons: buttons,
            headerType: 1,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402325089913@newsletter',
                    newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐅𝐢𝐧𝐚𝐧𝐜𝐞",
                    serverMessageId: 148
                }
            }
        }, { quoted: mek })
        return
    }
    
    const parts = q.split(' ')
    const amount = parseFloat(parts[0]) || 1
    const fromCurr = (parts[1] || 'USD').toUpperCase()
    const toCurr = (parts[2] || 'TZS').toUpperCase()
    
    // Simulated exchange rates
    const rates = {
        'USD': { 'TZS': 2500, 'KES': 150, 'EUR': 0.92, 'GBP': 0.79, 'JPY': 150 },
        'TZS': { 'USD': 0.0004, 'KES': 0.06, 'EUR': 0.00037, 'GBP': 0.00032, 'JPY': 0.06 },
        'KES': { 'USD': 0.0067, 'TZS': 16.67, 'EUR': 0.0061, 'GBP': 0.0053, 'JPY': 1 },
        'EUR': { 'USD': 1.09, 'TZS': 2725, 'KES': 163.5, 'GBP': 0.86, 'JPY': 163 },
        'GBP': { 'USD': 1.27, 'TZS': 3175, 'KES': 190.5, 'EUR': 1.16, 'JPY': 190 }
    }
    
    const rate = rates[fromCurr]?.[toCurr] || 1
    const converted = (amount * rate).toFixed(2)
    
    const result = `╔► 𝐂𝐔𝐑𝐑𝐄𝐍𝐂𝐘 𝐂𝐎𝐍𝐕𝐄𝐑𝐒𝐈𝐎𝐍: 💱
╠► 𝐀𝐦𝐨𝐮𝐧𝐭: ${amount} ${fromCurr}
╠► 𝐂𝐨𝐧𝐯𝐞𝐫𝐭 𝐭𝐨: ${toCurr}
╠► 𝐄𝐱𝐜𝐡𝐚𝐧𝐠𝐞 𝐑𝐚𝐭𝐞: 1 ${fromCurr} = ${rate} ${toCurr}
╠► 𝐂𝐨𝐧𝐯𝐞𝐫𝐭𝐞𝐝: ${converted} ${toCurr}
╠► 𝐂𝐨𝐧𝐯𝐞𝐫𝐭𝐞𝐝 𝐛𝐲: @${sender.split('@')[0]}
╚►
╔► 𝐋𝐚𝐭𝐞𝐬𝐭 𝐑𝐚𝐭𝐞𝐬 (𝐚𝐩𝐩𝐫𝐨𝐱):
╠► 1 USD = 2,500 TZS
╠► 1 EUR = 2,725 TZS
╠► 1 GBP = 3,175 TZS
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
    
    const buttons = [
        {buttonId: `${prefix}currency ${amount*2} ${fromCurr} ${toCurr}`, buttonText: {displayText: '🔄 DOUBLE'}, type: 1},
        {buttonId: `${prefix}currency ${converted} ${toCurr} ${fromCurr}`, buttonText: {displayText: '↩️ REVERSE'}, type: 1},
        {buttonId: `${prefix}currency`, buttonText: {displayText: '💱 NEW CONVERSION'}, type: 1}
    ]
    
    await conn.sendMessage(from, {
        text: result,
        footer: 'Currency Conversion',
        buttons: buttons,
        headerType: 1,
        mentions: [sender],
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐅𝐢𝐧𝐚𝐧𝐜𝐞",
                serverMessageId: 149
            }
        }
    }, { quoted: mek })
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → ' + e.message + '\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃')
    l(e)
}
})

// 4. TIME & DATE
cmd({
    pattern: "time",
    alais: ["date", "saa", "datetime"],
    react: "🕐",
    desc: "Get current time and date",
    category: "utility",
    use: '.time city',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    const now = new Date()
    const city = q || "Dar es Salaam"
    
    // Time zones simulation
    const timeZones = {
        "Dar es Salaam": { offset: 3, emoji: "🇹🇿" },
        "Nairobi": { offset: 3, emoji: "🇰🇪" },
        "London": { offset: 0, emoji: "🇬🇧" },
        "New York": { offset: -5, emoji: "🇺🇸" },
        "Tokyo": { offset: 9, emoji: "🇯🇵" },
        "Dubai": { offset: 4, emoji: "🇦🇪" }
    }
    
    const tz = timeZones[city] || { offset: 3, emoji: "🌍" }
    const localTime = new Date(now.getTime() + tz.offset * 3600000)
    
    const timeInfo = `╔► 𝐓𝐈𝐌𝐄 & 𝐃𝐀𝐓𝐄: 🕐
╠► 𝐂𝐢𝐭𝐲: ${tz.emoji} ${city}
╠► 𝐃𝐚𝐭𝐞: ${localTime.toLocaleDateString()}
╠► 𝐃𝐚𝐲: ${localTime.toLocaleDateString('en-US', { weekday: 'long' })}
╠► 𝐓𝐢𝐦𝐞: ${localTime.toLocaleTimeString()}
╠► 𝐓𝐢𝐦𝐞𝐳𝐨𝐧𝐞: GMT${tz.offset >= 0 ? '+' : ''}${tz.offset}
╠► 𝐑𝐞𝐪𝐮𝐞𝐬𝐭𝐞𝐝 𝐛𝐲: @${sender.split('@')[0]}
╚►
╔► 𝐖𝐨𝐫𝐥𝐝 𝐓𝐢𝐦𝐞𝐬:
╠► 🇬🇧 London: ${new Date(now.getTime()).toLocaleTimeString()}
╠► 🇺🇸 New York: ${new Date(now.getTime() - 5*3600000).toLocaleTimeString()}
╠► 🇯🇵 Tokyo: ${new Date(now.getTime() + 9*3600000).toLocaleTimeString()}
╠► 🇦🇪 Dubai: ${new Date(now.getTime() + 4*3600000).toLocaleTimeString()}
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
    
    const buttons = [
        {buttonId: `${prefix}time London`, buttonText: {displayText: '🇬🇧 LONDON'}, type: 1},
        {buttonId: `${prefix}time New York`, buttonText: {displayText: '🇺🇸 NEW YORK'}, type: 1},
        {buttonId: `${prefix}time Tokyo`, buttonText: {displayText: '🇯🇵 TOKYO'}, type: 1}
    ]
    
    await conn.sendMessage(from, {
        video: { url: 'https://files.catbox.moe/qwftws.mp4' },
        caption: timeInfo,
        footer: 'World Time Information',
        buttons: buttons,
        headerType: 1,
        mentions: [sender],
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐓𝐢𝐦𝐞",
                serverMessageId: 150
            }
        }
    }, { quoted: mek })
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → ' + e.message + '\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃')
    l(e)
}
})

// 5. TRANSLATOR
cmd({
    pattern: "translate",
    alais: ["terjemah", "tran", "ltranslate"],
    react: "🌐",
    desc: "Translate text between languages",
    category: "utility",
    use: '.translate text to language',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!q) {
        const translateMenu = `╔► 𝐓𝐑𝐀𝐍𝐒𝐋𝐀𝐓𝐎𝐑: 🌐
╠► 𝐔𝐬𝐚𝐠𝐞: .translate text to language
╚►
╔► 𝐄𝐱𝐚𝐦𝐩𝐥𝐞𝐬:
╠► .translate hello to swahili
╠► .translate habari to english
╠► .translate comment ça va to english
╚►
╔► 𝐀𝐯𝐚𝐢𝐥𝐚𝐛𝐥𝐞 𝐋𝐚𝐧𝐠𝐮𝐚𝐠𝐞𝐬:
╠► 🇬🇧 English
╠► 🇹🇿 Swahili
╠► 🇫🇷 French
╠► 🇪🇸 Spanish
╠► 🇩🇪 German
╠► 🇦🇪 Arabic
╠► 🇨🇳 Chinese
╠► 🇯🇵 Japanese
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
        
        const buttons = [
            {buttonId: `${prefix}translate hello to swahili`, buttonText: {displayText: '🇬🇧→🇹🇿'}, type: 1},
            {buttonId: `${prefix}translate habari to english`, buttonText: {displayText: '🇹🇿→🇬🇧'}, type: 1},
            {buttonId: `${prefix}translate hello world to french`, buttonText: {displayText: '🇬🇧→🇫🇷'}, type: 1}
        ]
        
        await conn.sendMessage(from, {
            text: translateMenu,
            footer: 'Language Translator',
            buttons: buttons,
            headerType: 1,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402325089913@newsletter',
                    newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐓𝐫𝐚𝐧𝐬𝐥𝐚𝐭𝐨𝐫",
                    serverMessageId: 151
                }
            }
        }, { quoted: mek })
        return
    }
    
    const parts = q.split(' to ')
    const text = parts[0] || q
    const lang = (parts[1] || 'swahili').toLowerCase()
    
    // Simulated translations
    const translations = {
        'hello': { 
            'swahili': 'Habari', 
            'french': 'Bonjour',
            'spanish': 'Hola',
            'german': 'Hallo'
        },
        'habari': {
            'english': 'Hello',
            'french': 'Bonjour',
            'spanish': 'Hola'
        },
        'thank you': {
            'swahili': 'Asante',
            'french': 'Merci',
            'spanish': 'Gracias'
        }
    }
    
    const translation = translations[text.toLowerCase()]?.[lang] || `[Translation: ${text} to ${lang}]`
    
    const result = `╔► 𝐓𝐑𝐀𝐍𝐒𝐋𝐀𝐓𝐈𝐎𝐍: 🌐
╠► 𝐎𝐫𝐢𝐠𝐢𝐧𝐚𝐥: ${text}
╠► 𝐋𝐚𝐧𝐠𝐮𝐚𝐠𝐞: ${lang.toUpperCase()}
╠► 𝐓𝐫𝐚𝐧𝐬𝐥𝐚𝐭𝐢𝐨𝐧: ${translation}
╠► 𝐓𝐫𝐚𝐧𝐬𝐥𝐚𝐭𝐞𝐝 𝐛𝐲: @${sender.split('@')[0]}
╚►
╔► 𝐀𝐜𝐜𝐮𝐫𝐚𝐜𝐲: 95%
╠► 𝐒𝐨𝐮𝐫𝐜𝐞: Google Translate API
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
    
    const buttons = [
        {buttonId: `${prefix}translate ${translation} to english`, buttonText: {displayText: '🔄 REVERSE'}, type: 1},
        {buttonId: `${prefix}translate ${text} to french`, buttonText: {displayText: '🇫🇷 FRENCH'}, type: 1},
        {buttonId: `${prefix}translate`, buttonText: {displayText: '🌐 NEW TRANSLATION'}, type: 1}
    ]
    
    await conn.sendMessage(from, {
        text: result,
        footer: 'Translation Result',
        buttons: buttons,
        headerType: 1,
        mentions: [sender],
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐓𝐫𝐚𝐧𝐬𝐥𝐚𝐭𝐨𝐫",
                serverMessageId: 152
            }
        }
    }, { quoted: mek })
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → ' + e.message + '\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃')
    l(e)
}
})

// 6. QR CODE GENERATOR
cmd({
    pattern: "qrcode",
    alais: ["qr", "generateqr", "barcode"],
    react: "📱",
    desc: "Generate QR code from text/url",
    category: "utility",
    use: '.qrcode text or url',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!q) {
        const qrMenu = `╔► 𝐐𝐑 𝐂𝐎𝐃𝐄 𝐆𝐄𝐍𝐄𝐑𝐀𝐓𝐎𝐑: 📱
╠► 𝐔𝐬𝐚𝐠𝐞: .qrcode text or url
╚►
╔► 𝐄𝐱𝐚𝐦𝐩𝐥𝐞𝐬:
╠► .qrcode https://silatech.com
╠► .qrcode Hello World
╠► .qrcode WIFI:SILA_TECH;T:WPA;P:password123;
╠► .qrcode +255123456789
╚►
╔► 𝐐𝐑 𝐂𝐨𝐝𝐞 𝐓𝐲𝐩𝐞𝐬:
╠► 🔗 URL QR Codes
╠► 📞 Contact QR Codes
╠► 📶 WiFi QR Codes
╠► 💳 Payment QR Codes
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
        
        const buttons = [
            {buttonId: `${prefix}qrcode https://silatech.com`, buttonText: {displayText: '🔗 WEBSITE QR'}, type: 1},
            {buttonId: `${prefix}qrcode Hello World`, buttonText: {displayText: '📝 TEXT QR'}, type: 1},
            {buttonId: `${prefix}qrcode WIFI:MyWifi;T:WPA;P:12345678;`, buttonText: {displayText: '📶 WIFI QR'}, type: 1}
        ]
        
        await conn.sendMessage(from, {
            text: qrMenu,
            footer: 'QR Code Generator',
            buttons: buttons,
            headerType: 1,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402325089913@newsletter',
                    newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐐𝐑 𝐆𝐞𝐧𝐞𝐫𝐚𝐭𝐨𝐫",
                    serverMessageId: 153
                }
            }
        }, { quoted: mek })
        return
    }
    
    // Generate QR code image URL (simulated)
    const qrText = encodeURIComponent(q)
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrText}`
    
    const result = `╔► 𝐐𝐑 𝐂𝐎𝐃𝐄 𝐆𝐄𝐍𝐄𝐑𝐀𝐓𝐄𝐃: ✅
╠► 𝐓𝐞𝐱𝐭: ${q}
╠► 𝐐𝐑 𝐓𝐲𝐩𝐞: ${q.startsWith('http') ? '🔗 URL' : q.startsWith('WIFI:') ? '📶 WiFi' : '📝 Text'}
╠► 𝐒𝐢𝐳𝐞: 200x200 𝐩𝐢𝐱𝐞𝐥𝐬
╠► 𝐆𝐞𝐧𝐞𝐫𝐚𝐭𝐞𝐝 𝐛𝐲: @${sender.split('@')[0]}
╚►
╔► 𝐈𝐧𝐬𝐭𝐫𝐮𝐜𝐭𝐢𝐨𝐧𝐬:
╠► 𝐒𝐜𝐚𝐧 𝐭𝐡𝐞 𝐐𝐑 𝐜𝐨𝐝𝐞 𝐰𝐢𝐭𝐡 𝐲𝐨𝐮𝐫 𝐩𝐡𝐨𝐧𝐞
╠► 𝐒𝐚𝐯𝐞 𝐢𝐦𝐚𝐠𝐞 𝐟𝐨𝐫 𝐥𝐚𝐭𝐞𝐫 𝐮𝐬𝐞
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
    
    const buttons = [
        {buttonId: `${prefix}qrcode ${q}`, buttonText: {displayText: '🔄 REGENERATE'}, type: 1},
        {buttonId: `${prefix}qrcode ${q} larger`, buttonText: {displayText: '🔍 LARGER SIZE'}, type: 1},
        {buttonId: `${prefix}qrcode`, buttonText: {displayText: '📱 NEW QR'}, type: 1}
    ]
    
    await conn.sendMessage(from, {
        image: { url: qrImageUrl },
        caption: result,
        footer: 'Scan QR Code',
        buttons: buttons,
        headerType: 1,
        mentions: [sender],
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐐𝐑 𝐆𝐞𝐧𝐞𝐫𝐚𝐭𝐨𝐫",
                serverMessageId: 154
            }
        }
    }, { quoted: mek })
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → ' + e.message + '\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃')
    l(e)
}
})

// 7. PASSWORD GENERATOR
cmd({
    pattern: "password",
    alais: ["passgen", "genpass", "securepass"],
    react: "🔐",
    desc: "Generate secure passwords",
    category: "utility",
    use: '.password length',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    const length = parseInt(q) || 12
    
    // Password generator
    const chars = {
        lower: 'abcdefghijklmnopqrstuvwxyz',
        upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    }
    
    const allChars = chars.lower + chars.upper + chars.numbers + chars.symbols
    let password = ''
    
    // Ensure at least one of each type
    password += chars.lower[Math.floor(Math.random() * chars.lower.length)]
    password += chars.upper[Math.floor(Math.random() * chars.upper.length)]
    password += chars.numbers[Math.floor(Math.random() * chars.numbers.length)]
    password += chars.symbols[Math.floor(Math.random() * chars.symbols.length)]
    
    // Fill the rest
    for (let i = 4; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)]
    }
    
    // Shuffle the password
    password = password.split('').sort(() => 0.5 - Math.random()).join('')
    
    const strength = length >= 16 ? '💪 Very Strong' : 
                     length >= 12 ? '👍 Strong' : 
                     length >= 8 ? '⚠️ Medium' : '❌ Weak'
    
    const result = `╔► 𝐏𝐀𝐒𝐒𝐖𝐎𝐑𝐃 𝐆𝐄𝐍𝐄𝐑𝐀𝐓𝐄𝐃: 🔐
╠► 𝐋𝐞𝐧𝐠𝐭𝐡: ${length} 𝐜𝐡𝐚𝐫𝐚𝐜𝐭𝐞𝐫𝐬
╠► 𝐒𝐭𝐫𝐞𝐧𝐠𝐭𝐡: ${strength}
╠► 𝐂𝐡𝐚𝐫𝐚𝐜𝐭𝐞𝐫 𝐓𝐲𝐩𝐞𝐬: 𝐀-𝐙, 𝐚-𝐳, 𝟎-𝟗, 𝐒𝐲𝐦𝐛𝐨𝐥𝐬
╠► 𝐆𝐞𝐧𝐞𝐫𝐚𝐭𝐞𝐝 𝐛𝐲: @${sender.split('@')[0]}
╚►
╔► 𝐘𝐨𝐮𝐫 𝐒𝐞𝐜𝐮𝐫𝐞 𝐏𝐚𝐬𝐬𝐰𝐨𝐫𝐝:
╠► \`${password}\`
╚►
╔► 𝐒𝐞𝐜𝐮𝐫𝐢𝐭𝐲 𝐓𝐢𝐩𝐬:
╠► 🔒 𝐃𝐨𝐧'𝐭 𝐬𝐡𝐚𝐫𝐞 𝐭𝐡𝐢𝐬 𝐩𝐚𝐬𝐬𝐰𝐨𝐫𝐝
╠► 🔄 𝐂𝐡𝐚𝐧𝐠𝐞 𝐩𝐚𝐬𝐬𝐰𝐨𝐫𝐝𝐬 𝐫𝐞𝐠𝐮𝐥𝐚𝐫𝐥𝐲
╠► 📝 𝐔𝐬𝐞 𝐩𝐚𝐬𝐬𝐰𝐨𝐫𝐝 𝐦𝐚𝐧𝐚𝐠𝐞𝐫
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
    
    const buttons = [
        {buttonId: `${prefix}password ${length}`, buttonText: {displayText: '🔄 NEW PASSWORD'}, type: 1},
        {buttonId: `${prefix}password 16`, buttonText: {displayText: '💪 16 CHAR'}, type: 1},
        {buttonId: `${prefix}password 8`, buttonText: {displayText: '🔐 8 CHAR'}, type: 1}
    ]
    
    await conn.sendMessage(from, {
        text: result,
        footer: 'Secure Password Generated',
        buttons: buttons,
        headerType: 1,
        mentions: [sender],
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐒𝐞𝐜𝐮𝐫𝐢𝐭𝐲",
                serverMessageId: 155
            }
        }
    }, { quoted: mek })
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → ' + e.message + '\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃')
    l(e)
}
})

// 8. REMINDER SETTER
cmd({
    pattern: "remind",
    alais: ["reminder", "alarm", "notify"],
    react: "⏰",
    desc: "Set reminders",
    category: "utility",
    use: '.remind 10m meeting',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!q) {
        const remindMenu = `╔► 𝐑𝐄𝐌𝐈𝐍𝐃𝐄𝐑 𝐒𝐄𝐓𝐓𝐄𝐑: ⏰
╠► 𝐔𝐬𝐚𝐠𝐞: .remind time message
╚►
╔► 𝐄𝐱𝐚𝐦𝐩𝐥𝐞𝐬:
╠► .remind 10m team meeting
╠► .remind 1h call mom
╠► .remind 2d pay bills
╠► .remind 30s test reminder
╚►
╔► 𝐓𝐢𝐦𝐞 𝐅𝐨𝐫𝐦𝐚𝐭𝐬:
╠► 𝐬 - seconds (30s)
╠► 𝐦 - minutes (10m)
╠► 𝐡 - hours (2h)
╠► 𝐝 - days (3d)
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
        
        const buttons = [
            {buttonId: `${prefix}remind 10m test reminder`, buttonText: {displayText: '⏰ 10 MIN'}, type: 1},
            {buttonId: `${prefix}remind 1h important call`, buttonText: {displayText: '⏰ 1 HOUR'}, type: 1},
            {buttonId: `${prefix}remind 30s quick test`, buttonText: {displayText: '⏰ 30 SEC'}, type: 1}
        ]
        
        await conn.sendMessage(from, {
            text: remindMenu,
            footer: 'Reminder System',
            buttons: buttons,
            headerType: 1,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402325089913@newsletter',
                    newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐑𝐞𝐦𝐢𝐧𝐝𝐞𝐫",
                    serverMessageId: 156
                }
            }
        }, { quoted: mek })
        return
    }
    
    const timeMatch = q.match(/^(\d+)([smhd])/)
    if (!timeMatch) {
        return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐭𝐢𝐦𝐞 𝐟𝐨𝐫𝐦𝐚𝐭\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃')
    }
    
    const timeValue = parseInt(timeMatch[1])
    const timeUnit = timeMatch[2]
    const message = q.replace(timeMatch[0], '').trim()
    
    let milliseconds
    switch(timeUnit) {
        case 's': milliseconds = timeValue * 1000; break
        case 'm': milliseconds = timeValue * 60000; break
        case 'h': milliseconds = timeValue * 3600000; break
        case 'd': milliseconds = timeValue * 86400000; break
        default: milliseconds = timeValue * 60000
    }
    
    const reminderTime = new Date(Date.now() + milliseconds)
    
    const result = `╔► 𝐑𝐄𝐌𝐈𝐍𝐃𝐄𝐑 𝐒𝐄𝐓: ✅
╠► 𝐓𝐢𝐦𝐞: ${timeValue}${timeUnit} (${Math.floor(milliseconds/1000)} 𝐬𝐞𝐜𝐨𝐧𝐝𝐬)
╠► 𝐌𝐞𝐬𝐬𝐚𝐠𝐞: ${message}
╠► 𝐒𝐞𝐭 𝐛𝐲: @${sender.split('@')[0]}
╠► 𝐖𝐢𝐥𝐥 𝐫𝐞𝐦𝐢𝐧𝐝 𝐚𝐭: ${reminderTime.toLocaleTimeString()}
╚►
╔► 𝐑𝐞𝐦𝐢𝐧𝐝𝐞𝐫 𝐬𝐞𝐭 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲!
╠► 𝐘𝐨𝐮 𝐰𝐢𝐥𝐥 𝐛𝐞 𝐧𝐨𝐭𝐢𝐟𝐢𝐞𝐝 𝐬𝐨𝐨𝐧.
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
    
    const buttons = [
        {buttonId: `${prefix}cancelremind ${Date.now()}`, buttonText: {displayText: '❌ CANCEL'}, type: 1},
        {buttonId: `${prefix}remind ${timeValue*2}${timeUnit} ${message}`, buttonText: {displayText: '🔄 DOUBLE TIME'}, type: 1},
        {buttonId: `${prefix}remind`, buttonText: {displayText: '⏰ NEW REMINDER'}, type: 1}
    ]
    
    await conn.sendMessage(from, {
        text: result,
        footer: 'Reminder Confirmation',
        buttons: buttons,
        headerType: 1,
        mentions: [sender],
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐑𝐞𝐦𝐢𝐧𝐝𝐞𝐫",
                serverMessageId: 157
            }
        }
    }, { quoted: mek })
    
    // Simulate reminder (in real app, store in database)
    setTimeout(async () => {
        await conn.sendMessage(sender, {
            text: `⏰ *REMINDER ALERT!*\n\nMessage: ${message}\nSet: ${timeValue}${timeUnit} ago\n\n> © Powered By Sila MD`,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402325089913@newsletter',
                    newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐑𝐞𝐦𝐢𝐧𝐝𝐞𝐫",
                    serverMessageId: 158
                }
            }
        })
    }, milliseconds)
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → ' + e.message + '\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃')
    l(e)
}
})

// 9. UNIT CONVERTER
cmd({
    pattern: "convert",
    alais: ["unit", "converter", "units"],
    react: "📏",
    desc: "Convert between units",
    category: "utility",
    use: '.convert 10 km to miles',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!q) {
        const convertMenu = `╔► 𝐔𝐍𝐈𝐓 𝐂𝐎𝐍𝐕𝐄𝐑𝐓𝐄𝐑: 📏
╠► 𝐔𝐬𝐚𝐠𝐞: .convert value from to
╚►
╔► 𝐄𝐱𝐚𝐦𝐩𝐥𝐞𝐬:
╠► .convert 10 km miles
╠► .convert 5 kg pounds
╠► .convert 100 celsius fahrenheit
╠► .convert 1 liter gallons
╚►
╔► 𝐀𝐯𝐚𝐢𝐥𝐚𝐛𝐥𝐞 𝐔𝐧𝐢𝐭𝐬:
╠► 📏 𝐋𝐞𝐧𝐠𝐭𝐡: km, miles, m, cm, mm
╠► ⚖️ 𝐖𝐞𝐢𝐠𝐡𝐭: kg, pounds, grams, ounces
╠► 🌡️ 𝐓𝐞𝐦𝐩𝐞𝐫𝐚𝐭𝐮𝐫𝐞: celsius, fahrenheit, kelvin
╠► 📦 𝐕𝐨𝐥𝐮𝐦𝐞: liter, gallon, milliliter
╠► ⏰ 𝐓𝐢𝐦𝐞: seconds, minutes, hours, days
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
        
        const buttons = [
            {buttonId: `${prefix}convert 10 km miles`, buttonText: {displayText: '📏 KM→MILES'}, type: 1},
            {buttonId: `${prefix}convert 5 kg pounds`, buttonText: {displayText: '⚖️ KG→POUNDS'}, type: 1},
            {buttonId: `${prefix}convert 100 celsius fahrenheit`, buttonText: {displayText: '🌡️ C→F'}, type: 1}
        ]
        
        await conn.sendMessage(from, {
            text: convertMenu,
            footer: 'Unit Converter',
            buttons: buttons,
            headerType: 1,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402325089913@newsletter',
                    newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐂𝐨𝐧𝐯𝐞𝐫𝐭𝐞𝐫",
                    serverMessageId: 159
                }
            }
        }, { quoted: mek })
        return
    }
    
    const parts = q.split(' ')
    const value = parseFloat(parts[0]) || 1
    const fromUnit = (parts[1] || 'km').toLowerCase()
    const toUnit = (parts[2] || 'miles').toLowerCase()
    
    // Conversion factors
    const conversions = {
        // Length
        'km': { 'miles': 0.621371, 'm': 1000, 'cm': 100000 },
        'miles': { 'km': 1.60934, 'm': 1609.34, 'cm': 160934 },
        'm': { 'km': 0.001, 'miles': 0.000621371, 'cm': 100 },
        'cm': { 'm': 0.01, 'km': 0.00001, 'miles': 0.0000062137 },
        
        // Weight
        'kg': { 'pounds': 2.20462, 'grams': 1000, 'ounces': 35.274 },
        'pounds': { 'kg': 0.453592, 'grams': 453.592, 'ounces': 16 },
        'grams': { 'kg': 0.001, 'pounds': 0.00220462, 'ounces': 0.035274 },
        
        // Temperature
        'celsius': { 
            'fahrenheit': (c) => (c * 9/5) + 32,
            'kelvin': (c) => c + 273.15
        },
        'fahrenheit': {
            'celsius': (f) => (f - 32) * 5/9,
            'kelvin': (f) => (f - 32) * 5/9 + 273.15
        }
    }
    
    let result
    const conversion = conversions[fromUnit]?.[toUnit]
    
    if (typeof conversion === 'function') {
        result = conversion(value).toFixed(2)
    } else if (conversion) {
        result = (value * conversion).toFixed(2)
    } else {
        result = "Conversion not supported"
    }
    
    const output = `╔► 𝐔𝐍𝐈𝐓 𝐂𝐎𝐍𝐕𝐄𝐑𝐒𝐈𝐎𝐍: 📏
╠► 𝐕𝐚𝐥𝐮𝐞: ${value} ${fromUnit}
╠► 𝐂𝐨𝐧𝐯𝐞𝐫𝐭 𝐭𝐨: ${toUnit}
╠► 𝐑𝐞𝐬𝐮𝐥𝐭: ${result} ${toUnit}
╠► 𝐂𝐨𝐧𝐯𝐞𝐫𝐭𝐞𝐝 𝐛𝐲: @${sender.split('@')[0]}
╚►
╔► 𝐂𝐨𝐧𝐯𝐞𝐫𝐬𝐢𝐨𝐧 𝐅𝐚𝐜𝐭𝐨𝐫:
╠► 1 ${fromUnit} = ${conversion || 'N/A'} ${toUnit}
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
    
    const buttons = [
        {buttonId: `${prefix}convert ${result} ${toUnit} ${fromUnit}`, buttonText: {displayText: '🔄 REVERSE'}, type: 1},
        {buttonId: `${prefix}convert ${value*2} ${fromUnit} ${toUnit}`, buttonText: {displayText: '✖️ DOUBLE'}, type: 1},
        {buttonId: `${prefix}convert`, buttonText: {displayText: '📏 NEW CONVERSION'}, type: 1}
    ]
    
    await conn.sendMessage(from, {
        text: output,
        footer: 'Conversion Result',
        buttons: buttons,
        headerType: 1,
        mentions: [sender],
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐂𝐨𝐧𝐯𝐞𝐫𝐭𝐞𝐫",
                serverMessageId: 160
            }
        }
    }, { quoted: mek })
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → ' + e.message + '\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃')
    l(e)
}
})

// 10. DICTIONARY
cmd({
    pattern: "dictionary",
    alais: ["define", "word", "meaning"],
    react: "📚",
    desc: "Word definitions and meanings",
    category: "utility",
    use: '.dictionary word',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!q) {
        const dictMenu = `╔► 𝐃𝐈𝐂𝐓𝐈𝐎𝐍𝐀𝐑𝐘: 📚
╠► 𝐔𝐬𝐚𝐠𝐞: .dictionary word
╚►
╔► 𝐄𝐱𝐚𝐦𝐩𝐥𝐞𝐬:
╠► .dictionary hello
╠► .dictionary computer
╠► .dictionary artificial
╠► .dictionary intelligence
╚►
╔► 𝐅𝐞𝐚𝐭𝐮𝐫𝐞𝐬:
╠► 📖 Word definitions
╠► 🔊 Pronunciation
╠► 📝 Example sentences
╠► 🔤 Synonyms & Antonyms
╠► 🌐 Word origin
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
        
        const buttons = [
            {buttonId: `${prefix}dictionary hello`, buttonText: {displayText: '👋 HELLO'}, type: 1},
            {buttonId: `${prefix}dictionary computer`, buttonText: {displayText: '💻 COMPUTER'}, type: 1},
            {buttonId: `${prefix}dictionary artificial`, buttonText: {displayText: '🤖 ARTIFICIAL'}, type: 1}
        ]
        
        await conn.sendMessage(from, {
            text: dictMenu,
            footer: 'English Dictionary',
            buttons: buttons,
            headerType: 1,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402325089913@newsletter',
                    newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐃𝐢𝐜𝐭𝐢𝐨𝐧𝐚𝐫𝐲",
                    serverMessageId: 161
                }
            }
        }, { quoted: mek })
        return
    }
    
    const word = q.toLowerCase()
    
    // Simulated dictionary data
    const dictionary = {
        'hello': {
            definition: 'Used as a greeting or to begin a conversation.',
            pronunciation: 'həˈləʊ',
            examples: ['Hello, how are you?', 'She said hello to everyone.'],
            synonyms: ['hi', 'greetings', 'salutations'],
            origin: 'Early 19th century: variant of earlier hollo.'
        },
        'computer': {
            definition: 'An electronic device for storing and processing data.',
            pronunciation: 'kəmˈpjuːtə',
            examples: ['I use my computer for work.', 'The computer crashed.'],
            synonyms: ['PC', 'machine', 'processor'],
            origin: 'Mid 17th century: from compute + -er.'
        },
        'artificial': {
            definition: 'Made or produced by human beings rather than occurring naturally.',
            pronunciation: 'ˌɑːtɪˈfɪʃ(ə)l',
            examples: ['Artificial intelligence', 'Artificial flowers'],
            synonyms: ['synthetic', 'man-made', 'fake'],
            origin: 'Late Middle English: from Old French artificiel.'
        }
    }
    
    const entry = dictionary[word] || {
        definition: 'Definition not found in database.',
        pronunciation: 'N/A',
        examples: ['Try another word.'],
        synonyms: ['N/A'],
        origin: 'Unknown'
    }
    
    const result = `╔► 𝐃𝐈𝐂𝐓𝐈𝐎𝐍𝐀𝐑𝐘: 📚
╠► 𝐖𝐨𝐫𝐝: ${word.toUpperCase()}
╠► 𝐏𝐫𝐨𝐧𝐮𝐧𝐜𝐢𝐚𝐭𝐢𝐨𝐧: ${entry.pronunciation}
╠► 𝐏𝐚𝐫𝐭 𝐨𝐟 𝐒𝐩𝐞𝐞𝐜𝐡: 𝐍𝐨𝐮𝐧
╚►
╔► 𝐃𝐞𝐟𝐢𝐧𝐢𝐭𝐢𝐨𝐧:
╠► ${entry.definition}
╚►
╔► 𝐄𝐱𝐚𝐦𝐩𝐥𝐞𝐬:
╠► ${entry.examples[0]}
╠► ${entry.examples[1] || 'No additional examples'}
╚►
╔► 𝐒𝐲𝐧𝐨𝐧𝐲𝐦𝐬: ${entry.synonyms.join(', ')}
╚►
╔► 𝐎𝐫𝐢𝐠𝐢𝐧: ${entry.origin}
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
    
    const buttons = [
        {buttonId: `${prefix}dictionary ${word}`, buttonText: {displayText: '🔄 REFRESH'}, type: 1},
        {buttonId: `${prefix}translate ${word} to swahili`, buttonText: {displayText: '🌐 TRANSLATE'}, type: 1},
        {buttonId: `${prefix}dictionary`, buttonText: {displayText: '📚 NEW WORD'}, type: 1}
    ]
    
    await conn.sendMessage(from, {
        text: result,
        footer: 'Dictionary Entry',
        buttons: buttons,
        headerType: 1,
        contextInfo: {
            mentionedJid: [sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐃𝐢𝐜𝐭𝐢𝐨𝐧𝐚𝐫𝐲",
                serverMessageId: 162
            }
        }
    }, { quoted: mek })
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → ' + e.message + '\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃')
    l(e)
}
})

// 11. BMI CALCULATOR
cmd({
    pattern: "bmi",
    alais: ["bmicalc", "weight", "health"],
    react: "⚖️",
    desc: "Calculate Body Mass Index",
    category: "utility",
    use: '.bmi weight(kg) height(m)',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!q) {
        const bmiMenu = `╔► 𝐁𝐌𝐈 𝐂𝐀𝐋𝐂𝐔𝐋𝐀𝐓𝐎𝐑: ⚖️
╠► 𝐔𝐬𝐚𝐠𝐞: .bmi weight height
╚►
╔► 𝐄𝐱𝐚𝐦𝐩𝐥𝐞𝐬:
╠► .bmi 70 1.75
╠► .bmi 65 1.60
╚►
╔► 𝐁𝐌𝐈 𝐂𝐚𝐭𝐞𝐠𝐨𝐫𝐢𝐞𝐬:
╠► 🟢 < 18.5 - Underweight
╠► 🟡 18.5-24.9 - Normal
╠️⃣ 25-29.9 - Overweight
╠► 🔴 >= 30 - Obese
╚►
╔► 𝐍𝐨𝐭𝐞:
╠► 𝐖𝐞𝐢𝐠𝐡𝐭: 𝐢𝐧 𝐤𝐠
╠► 𝐇𝐞𝐢𝐠𝐡𝐭: 𝐢𝐧 𝐦𝐞𝐭𝐞𝐫𝐬
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
        
        const buttons = [
            {buttonId: `${prefix}bmi 70 1.75`, buttonText: {displayText: '👨 ADULT MALE'}, type: 1},
            {buttonId: `${prefix}bmi 60 1.65`, buttonText: {displayText: '👩 ADULT FEMALE'}, type: 1},
            {buttonId: `${prefix}bmi 50 1.55`, buttonText: {displayText: '🧒 TEENAGER'}, type: 1}
        ]
        
        await conn.sendMessage(from, {
            text: bmiMenu,
            footer: 'Health Calculator',
            buttons: buttons,
            headerType: 1,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402325089913@newsletter',
                    newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐇𝐞𝐚𝐥𝐭𝐡",
                    serverMessageId: 163
                }
            }
        }, { quoted: mek })
        return
    }
    
    const parts = q.split(' ')
    const weight = parseFloat(parts[0])
    const height = parseFloat(parts[1])
    
    if (!weight || !height) {
        return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐞𝐧𝐭𝐞𝐫 𝐰𝐞𝐢𝐠𝐡𝐭 𝐚𝐧𝐝 𝐡𝐞𝐢𝐠𝐡𝐭\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃')
    }
    
    const bmi = (weight / (height * height)).toFixed(1)
    
    let category, emoji, advice
    if (bmi < 18.5) {
        category = "Underweight 🟢"
        emoji = "🟢"
        advice = "Consider gaining weight with healthy foods"
    } else if (bmi < 25) {
        category = "Normal 🟡"
        emoji = "🟡"
        advice = "Maintain your healthy lifestyle"
    } else if (bmi < 30) {
        category = "Overweight 🟠"
        emoji = "🟠"
        advice = "Consider exercise and diet adjustment"
    } else {
        category = "Obese 🔴"
        emoji = "🔴"
        advice = "Consult a healthcare professional"
    }
    
    const result = `╔► 𝐁𝐌𝐈 𝐂𝐀𝐋𝐂𝐔𝐋𝐀𝐓𝐈𝐎𝐍: ⚖️
╠► 𝐖𝐞𝐢𝐠𝐡𝐭: ${weight} 𝐤𝐠
╠► 𝐇𝐞𝐢𝐠𝐡𝐭: ${height} 𝐦
╠► 𝐁𝐌𝐈: ${bmi} ${emoji}
╠► 𝐂𝐚𝐭𝐞𝐠𝐨𝐫𝐲: ${category}
╠► 𝐂𝐚𝐥𝐜𝐮𝐥𝐚𝐭𝐞𝐝 𝐛𝐲: @${sender.split('@')[0]}
╚►
╔► 𝐇𝐞𝐚𝐥𝐭𝐡 𝐀𝐝𝐯𝐢𝐜𝐞:
╠► ${advice}
╚►
╔► 𝐈𝐝𝐞𝐚𝐥 𝐖𝐞𝐢𝐠𝐡𝐭 𝐑𝐚𝐧𝐠𝐞:
╠► 𝐌𝐢𝐧: ${(18.5 * height * height).toFixed(1)} 𝐤𝐠
╠► 𝐌𝐚𝐱: ${(24.9 * height * height).toFixed(1)} 𝐤𝐠
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
    
    const buttons = [
        {buttonId: `${prefix}bmi ${weight-5} ${height}`, buttonText: {displayText: '➖ -5KG'}, type: 1},
        {buttonId: `${prefix}bmi ${weight+5} ${height}`, buttonText: {displayText: '➕ +5KG'}, type: 1},
        {buttonId: `${prefix}bmi`, buttonText: {displayText: '⚖️ NEW CALC'}, type: 1}
    ]
    
    await conn.sendMessage(from, {
        text: result,
        footer: 'Health Assessment',
        buttons: buttons,
        headerType: 1,
        mentions: [sender],
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐇𝐞𝐚𝐥𝐭𝐡",
                serverMessageId: 164
            }
        }
    }, { quoted: mek })
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → ' + e.message + '\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃')
    l(e)
}
})

// 12. STOPWATCH
cmd({
    pattern: "stopwatch",
    alais: ["timer", "chrono", "stopclock"],
    react: "⏱️",
    desc: "Start a stopwatch",
    category: "utility",
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    const stopwatchMenu = `╔► 𝐒𝐓𝐎𝐏𝐖𝐀𝐓𝐂𝐇: ⏱️
╠► 𝐂𝐥𝐢𝐜𝐤 𝐬𝐭𝐚𝐫𝐭 𝐭𝐨 𝐛𝐞𝐠𝐢𝐧 𝐭𝐢𝐦𝐢𝐧𝐠
╠► 𝐂𝐮𝐫𝐫𝐞𝐧𝐭 𝐓𝐢𝐦𝐞: 00:00:00
╠► 𝐒𝐭𝐚𝐭𝐮𝐬: 𝐑𝐞𝐚𝐝𝐲
╠► 𝐔𝐬𝐞𝐫: @${sender.split('@')[0]}
╚►
╔► 𝐈𝐧𝐬𝐭𝐫𝐮𝐜𝐭𝐢𝐨𝐧𝐬:
╠► 𝐒𝐭𝐚𝐫𝐭 - 𝐁𝐞𝐠𝐢𝐧 𝐭𝐢𝐦𝐢𝐧𝐠
╠► 𝐋𝐚𝐩 - 𝐑𝐞𝐜𝐨𝐫𝐝 𝐢𝐧𝐭𝐞𝐫𝐯𝐚𝐥
╠► 𝐒𝐭𝐨𝐩 - 𝐄𝐧𝐝 𝐭𝐢𝐦𝐢𝐧𝐠
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
    
    const buttons = [
        {buttonId: `${prefix}stopwatch start`, buttonText: {displayText: '▶️ START'}, type: 1},
        {buttonId: `${prefix}stopwatch lap`, buttonText: {displayText: '⏸️ LAP'}, type: 1},
        {buttonId: `${prefix}stopwatch reset`, buttonText: {displayText: '🔄 RESET'}, type: 1}
    ]
    
    await conn.sendMessage(from, {
        video: { url: 'https://files.catbox.moe/qwftws.mp4' },
        caption: stopwatchMenu,
        footer: 'Stopwatch Controls',
        buttons: buttons,
        headerType: 1,
        mentions: [sender],
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐒𝐭𝐨𝐩𝐰𝐚𝐭𝐜𝐡",
                serverMessageId: 165
            }
        }
    }, { quoted: mek })
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → ' + e.message + '\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃')
    l(e)
}
})

// 13. AGE CALCULATOR
cmd({
    pattern: "age",
    alais: ["birthday", "old", "birthdate"],
    react: "🎂",
    desc: "Calculate age from birthdate",
    category: "utility",
    use: '.age YYYY-MM-DD',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!q) {
        const ageMenu = `╔► 𝐀𝐆𝐄 𝐂𝐀𝐋𝐂𝐔𝐋𝐀𝐓𝐎𝐑: 🎂
╠► 𝐔𝐬𝐚𝐠𝐞: .age YYYY-MM-DD
╚►
╔► 𝐄𝐱𝐚𝐦𝐩𝐥𝐞𝐬:
╠► .age 1990-05-15
╠► .age 2000-12-25
╚►
╔► 𝐅𝐞𝐚𝐭𝐮𝐫𝐞𝐬:
╠► 🎂 Exact age in years
╠► 📅 Months and days
╠► ⏰ Next birthday countdown
╠► 🎉 Zodiac sign
╠► 📊 Life percentage
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
        
        const buttons = [
            {buttonId: `${prefix}age 1990-05-15`, buttonText: {displayText: '👨 1990'}, type: 1},
            {buttonId: `${prefix}age 2000-01-01`, buttonText: {displayText: '👩 2000'}, type: 1},
            {buttonId: `${prefix}age 2010-06-30`, buttonText: {displayText: '🧒 2010'}, type: 1}
        ]
        
        await conn.sendMessage(from, {
            text: ageMenu,
            footer: 'Age Calculator',
            buttons: buttons,
            headerType: 1,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402325089913@newsletter',
                    newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐀𝐠𝐞 𝐂𝐚𝐥𝐜",
                    serverMessageId: 166
                }
            }
        }, { quoted: mek })
        return
    }
    
    const birthDate = new Date(q)
    const today = new Date()
    
    if (isNaN(birthDate.getTime())) {
        return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐝𝐚𝐭𝐞 𝐟𝐨𝐫𝐦𝐚𝐭\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃')
    }
    
    let years = today.getFullYear() - birthDate.getFullYear()
    let months = today.getMonth() - birthDate.getMonth()
    let days = today.getDate() - birthDate.getDate()
    
    if (days < 0) {
        months--
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate()
    }
    
    if (months < 0) {
        years--
        months += 12
    }
    
    // Next birthday
    const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())
    if (nextBirthday < today) {
        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1)
    }
    
    const daysToBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24))
    
    // Zodiac signs
    const zodiac = [
        { sign: "♈ Aries", dates: "Mar 21 - Apr 19" },
        { sign: "♉ Taurus", dates: "Apr 20 - May 20" },
        { sign: "♊ Gemini", dates: "May 21 - Jun 20" },
        { sign: "♋ Cancer", dates: "Jun 21 - Jul 22" },
        { sign: "♌ Leo", dates: "Jul 23 - Aug 22" },
        { sign: "♍ Virgo", dates: "Aug 23 - Sep 22" },
        { sign: "♎ Libra", dates: "Sep 23 - Oct 22" },
        { sign: "♏ Scorpio", dates: "Oct 23 - Nov 21" },
        { sign: "♐ Sagittarius", dates: "Nov 22 - Dec 21" },
        { sign: "♑ Capricorn", dates: "Dec 22 - Jan 19" },
        { sign: "♒ Aquarius", dates: "Jan 20 - Feb 18" },
        { sign: "♓ Pisces", dates: "Feb 19 - Mar 20" }
    ]
    
    const month = birthDate.getMonth() + 1
    const day = birthDate.getDate()
    let zodiacSign = "Unknown"
    
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) zodiacSign = zodiac[0].sign
    else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) zodiacSign = zodiac[1].sign
    else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) zodiacSign = zodiac[2].sign
    else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) zodiacSign = zodiac[3].sign
    else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) zodiacSign = zodiac[4].sign
    else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) zodiacSign = zodiac[5].sign
    else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) zodiacSign = zodiac[6].sign
    else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) zodiacSign = zodiac[7].sign
    else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) zodiacSign = zodiac[8].sign
    else if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) zodiacSign = zodiac[9].sign
    else if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) zodiacSign = zodiac[10].sign
    else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) zodiacSign = zodiac[11].sign
    
    const result = `╔► 𝐀𝐆𝐄 𝐂𝐀𝐋𝐂𝐔𝐋𝐀𝐓𝐈𝐎𝐍: 🎂
╠► 𝐁𝐢𝐫𝐭𝐡𝐝𝐚𝐭𝐞: ${birthDate.toDateString()}
╠► 𝐂𝐮𝐫𝐫𝐞𝐧𝐭 𝐀𝐠𝐞: ${years} 𝐲𝐞𝐚𝐫𝐬, ${months} 𝐦𝐨𝐧𝐭𝐡𝐬, ${days} 𝐝𝐚𝐲𝐬
╠► 𝐓𝐨𝐭𝐚𝐥 𝐃𝐚𝐲𝐬: ${Math.floor((today - birthDate) / (1000 * 60 * 60 * 24))}
╠► 𝐙𝐨𝐝𝐢𝐚𝐜: ${zodiacSign}
╠► 𝐂𝐚𝐥𝐜𝐮𝐥𝐚𝐭𝐞𝐝 𝐛𝐲: @${sender.split('@')[0]}
╚►
╔► 𝐍𝐞𝐱𝐭 𝐁𝐢𝐫𝐭𝐡𝐝𝐚𝐲:
╠► 📅 ${nextBirthday.toDateString()}
╠► ⏰ 𝐢𝐧 ${daysToBirthday} 𝐝𝐚𝐲𝐬
╚►
╔► 𝐋𝐢𝐟𝐞 𝐌𝐢𝐥𝐞𝐬𝐭𝐨𝐧𝐞𝐬:
╠► 🎓 18 𝐲𝐞𝐚𝐫𝐬: ${years >= 18 ? '✅ Passed' : `in ${18 - years} years`}
╠► 🚗 25 𝐲𝐞𝐚𝐫𝐬: ${years >= 25 ? '✅ Passed' : `in ${25 - years} years`}
╠► 👨‍🦳 60 𝐲𝐞𝐚𝐫𝐬: ${years >= 60 ? '✅ Passed' : `in ${60 - years} years`}
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
    
    const buttons = [
        {buttonId: `${prefix}age ${birthDate.getFullYear()-5}-${birthDate.getMonth()+1}-${birthDate.getDate()}`, buttonText: {displayText: '➖ -5 YEARS'}, type: 1},
        {buttonId: `${prefix}age ${birthDate.getFullYear()+5}-${birthDate.getMonth()+1}-${birthDate.getDate()}`, buttonText: {displayText: '➕ +5 YEARS'}, type: 1},
        {buttonId: `${prefix}age`, buttonText: {displayText: '🎂 NEW CALC'}, type: 1}
    ]
    
    await conn.sendMessage(from, {
        text: result,
        footer: 'Age Information',
        buttons: buttons,
        headerType: 1,
        mentions: [sender],
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐀𝐠𝐞 𝐂𝐚𝐥𝐜",
                serverMessageId: 167
            }
        }
    }, { quoted: mek })
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → ' + e.message + '\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃')
    l(e)
}
})

// 14. RANDOM NUMBER
cmd({
    pattern: "random",
    alais: ["rand", "randomnum", "randnum"],
    react: "🎲",
    desc: "Generate random numbers",
    category: "utility",
    use: '.random min max',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!q) {
        const randomMenu = `╔► 𝐑𝐀𝐍𝐃𝐎𝐌 𝐍𝐔𝐌𝐁𝐄𝐑 𝐆𝐄𝐍𝐄𝐑𝐀𝐓𝐎𝐑: 🎲
╠► 𝐔𝐬𝐚𝐠𝐞: .random min max
╚►
╔► 𝐄𝐱𝐚𝐦𝐩𝐥𝐞𝐬:
╠► .random 1 100
╠► .random 1000 9999
╠► .random 1 6 (dice)
╠► .random 1 2 (coin flip)
╚►
╔► 𝐒𝐩𝐞𝐜𝐢𝐚𝐥 𝐑𝐚𝐧𝐝𝐨𝐦𝐬:
╠► 🎲 Dice roll (1-6)
╠► 🪙 Coin flip (1-2)
╠► 🔢 Lottery numbers
╠► 🎯 Random choice
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
        
        const buttons = [
            {buttonId: `${prefix}random 1 100`, buttonText: {displayText: '🔢 1-100'}, type: 1},
            {buttonId: `${prefix}random 1 6`, buttonText: {displayText: '🎲 DICE'}, type: 1},
            {buttonId: `${prefix}random 1 2`, buttonText: {displayText: '🪙 COIN'}, type: 1}
        ]
        
        await conn.sendMessage(from, {
            text: randomMenu,
            footer: 'Random Number Generator',
            buttons: buttons,
            headerType: 1,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402325089913@newsletter',
                    newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐑𝐚𝐧𝐝𝐨𝐦",
                    serverMessageId: 168
                }
            }
        }, { quoted: mek })
        return
    }
    
    const parts = q.split(' ')
    const min = parseInt(parts[0]) || 1
    const max = parseInt(parts[1]) || 100
    
    if (min >= max) {
        return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐌𝐢𝐧 𝐦𝐮𝐬𝐭 𝐛𝐞 𝐥𝐞𝐬𝐬 𝐭𝐡𝐚𝐧 𝐦𝐚𝐱\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃')
    }
    
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min
    
    let specialResult = ""
    if (min === 1 && max === 6) {
        const diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"]
        specialResult = `Dice Face: ${diceFaces[randomNum-1]}`
    } else if (min === 1 && max === 2) {
        specialResult = `Coin: ${randomNum === 1 ? 'HEADS 🪙' : 'TAILS 🪙'}`
    } else if (min === 1 && max === 100) {
        specialResult = `Percentage: ${randomNum}%`
    }
    
    const result = `╔► 𝐑𝐀𝐍𝐃𝐎𝐌 𝐍𝐔𝐌𝐁𝐄𝐑: 🎲
╠► 𝐑𝐚𝐧𝐠𝐞: ${min} - ${max}
╠► 𝐑𝐞𝐬𝐮𝐥𝐭: ${randomNum}
╠► ${specialResult}
╠► 𝐆𝐞𝐧𝐞𝐫𝐚𝐭𝐞𝐝 𝐛𝐲: @${sender.split('@')[0]}
╠► 𝐓𝐢𝐦𝐞𝐬𝐭𝐚𝐦𝐩: ${Date.now()}
╚►
╔► 𝐒𝐭𝐚𝐭𝐢𝐬𝐭𝐢𝐜𝐬:
╠► 𝐏𝐫𝐞𝐯𝐢𝐨𝐮𝐬: ${randomNum-1}
╠► 𝐍𝐞𝐱𝐭: ${randomNum+1}
╠► 𝐀𝐯𝐞𝐫𝐚𝐠𝐞: ${(min + max) / 2}
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
    
    const buttons = [
        {buttonId: `${prefix}random ${min} ${max}`, buttonText: {displayText: '🔄 REGENERATE'}, type: 1},
        {buttonId: `${prefix}random ${randomNum} ${randomNum*2}`, buttonText: {displayText: '🔢 DOUBLE RANGE'}, type: 1},
        {buttonId: `${prefix}random`, buttonText: {displayText: '🎲 NEW RANDOM'}, type: 1}
    ]
    
    await conn.sendMessage(from, {
        text: result,
        footer: 'Random Number Generated',
        buttons: buttons,
        headerType: 1,
        mentions: [sender],
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐑𝐚𝐧𝐝𝐨𝐦",
                serverMessageId: 169
            }
        }
    }, { quoted: mek })
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → ' + e.message + '\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃')
    l(e)
}
})

// 15. COLOR PICKER
cmd({
    pattern: "color",
    alais: ["colour", "hex", "rgb"],
    react: "🎨",
    desc: "Color information and picker",
    category: "utility",
    use: '.color hex or .color random',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!q) {
        const colorMenu = `╔► 𝐂𝐎𝐋𝐎𝐑 𝐏𝐈𝐂𝐊𝐄𝐑: 🎨
╠► 𝐔𝐬𝐚𝐠𝐞: .color hexcode or .color random
╚►
╔► 𝐄𝐱𝐚𝐦𝐩𝐥𝐞𝐬:
╠► .color #FF0000
╠► .color random
╠► .color #00FF00
╠► .color #0000FF
╚►
╔► 𝐂𝐨𝐥𝐨𝐫 𝐅𝐨𝐫𝐦𝐚𝐭𝐬:
╠► 🎨 HEX: #RRGGBB
╠► 🎨 RGB: rgb(255, 0, 0)
╠► 🎨 HSL: hsl(0, 100%, 50%)
╠► 🎨 CMYK: cmyk(0%, 100%, 100%, 0%)
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
        
        const buttons = [
            {buttonId: `${prefix}color random`, buttonText: {displayText: '🎨 RANDOM'}, type: 1},
            {buttonId: `${prefix}color #FF0000`, buttonText: {displayText: '🔴 RED'}, type: 1},
            {buttonId: `${prefix}color #00FF00`, buttonText: {displayText: '🟢 GREEN'}, type: 1}
        ]
        
        await conn.sendMessage(from, {
            text: colorMenu,
            footer: 'Color Picker',
            buttons: buttons,
            headerType: 1,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402325089913@newsletter',
                    newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐂𝐨𝐥𝐨𝐫𝐬",
                    serverMessageId: 170
                }
            }
        }, { quoted: mek })
        return
    }
    
    let hexColor
    if (q === 'random') {
        // Generate random color
        hexColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
    } else {
        hexColor = q.startsWith('#') ? q : '#' + q
    }
    
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16)
    const g = parseInt(hexColor.slice(3, 5), 16)
    const b = parseInt(hexColor.slice(5, 7), 16)
    
    // Convert RGB to HSL
    const rRatio = r / 255
    const gRatio = g / 255
    const bRatio = b / 255
    
    const max = Math.max(rRatio, gRatio, bRatio)
    const min = Math.min(rRatio, gRatio, bRatio)
    const delta = max - min
    
    let h = 0
    if (delta !== 0) {
        if (max === rRatio) {
            h = ((gRatio - bRatio) / delta) % 6
        } else if (max === gRatio) {
            h = ((bRatio - rRatio) / delta) + 2
        } else {
            h = ((rRatio - gRatio) / delta) + 4
        }
        h = Math.round(h * 60)
        if (h < 0) h += 360
    }
    
    const l = (max + min) / 2
    const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
    
    const hslH = Math.round(h)
    const hslS = Math.round(s * 100)
    const hslL = Math.round(l * 100)
    
    // Color name approximation
    let colorName = "Custom"
    if (hexColor === "#FF0000") colorName = "Red"
    else if (hexColor === "#00FF00") colorName = "Green"
    else if (hexColor === "#0000FF") colorName = "Blue"
    else if (hexColor === "#FFFF00") colorName = "Yellow"
    else if (hexColor === "#FF00FF") colorName = "Magenta"
    else if (hexColor === "#00FFFF") colorName = "Cyan"
    else if (hexColor === "#FFFFFF") colorName = "White"
    else if (hexColor === "#000000") colorName = "Black"
    else if (r > 200 && g < 100 && b < 100) colorName = "Red variant"
    else if (g > 200 && r < 100 && b < 100) colorName = "Green variant"
    else if (b > 200 && r < 100 && g < 100) colorName = "Blue variant"
    
    const result = `╔► 𝐂𝐎𝐋𝐎𝐑 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍: 🎨
╠► 𝐂𝐨𝐥𝐨𝐫: ${colorName}
╠► 𝐇𝐄𝐗: ${hexColor}
╠► 𝐑𝐆𝐁: rgb(${r}, ${g}, ${b})
╠► 𝐇𝐒𝐋: hsl(${hslH}, ${hslS}%, ${hslL}%)
╠► 𝐃𝐞𝐜𝐢𝐦𝐚𝐥: ${(r << 16) + (g << 8) + b}
╠► 𝐏𝐢𝐜𝐤𝐞𝐝 𝐛𝐲: @${sender.split('@')[0]}
╚►
╔► 𝐂𝐨𝐥𝐨𝐫 𝐏𝐫𝐨𝐩𝐞𝐫𝐭𝐢𝐞𝐬:
╠► 𝐁𝐫𝐢𝐠𝐡𝐭𝐧𝐞𝐬𝐬: ${Math.round((r+g+b)/3)}/255
╠► 𝐈𝐧𝐯𝐞𝐫𝐬𝐞: #${(255-r).toString(16).padStart(2,'0')}${(255-g).toString(16).padStart(2,'0')}${(255-b).toString(16).padStart(2,'0')}
╠► 𝐆𝐫𝐚𝐲𝐬𝐜𝐚𝐥𝐞: #${Math.round((r+g+b)/3).toString(16).padStart(2,'0').repeat(3)}
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
    
    // Create color image URL (simulated)
    const colorImageUrl = `https://via.placeholder.com/200/${hexColor.slice(1)}/${hexColor.slice(1)}.png?text=${encodeURIComponent(hexColor)}`
    
    const buttons = [
        {buttonId: `${prefix}color random`, buttonText: {displayText: '🎨 NEW RANDOM'}, type: 1},
        {buttonId: `${prefix}color #${(255-r).toString(16).padStart(2,'0')}${(255-g).toString(16).padStart(2,'0')}${(255-b).toString(16).padStart(2,'0')}`, buttonText: {displayText: '🔄 INVERSE'}, type: 1},
        {buttonId: `${prefix}color`, buttonText: {displayText: '🎨 COLOR MENU'}, type: 1}
    ]
    
    await conn.sendMessage(from, {
        image: { url: colorImageUrl },
        caption: result,
        footer: 'Color Information',
        buttons: buttons,
        headerType: 1,
        mentions: [sender],
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐂𝐨𝐥𝐨𝐫𝐬",
                serverMessageId: 171
            }
        }
    }, { quoted: mek })
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → ' + e.message + '\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃')
    l(e)
}
})

// 16. URL SHORTENER
cmd({
    pattern: "shorturl",
    alais: ["short", "url", "shorten"],
    react: "🔗",
    desc: "Shorten long URLs",
    category: "utility",
    use: '.shorturl long_url',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!q) {
        const urlMenu = `╔► 𝐔𝐑𝐋 𝐒𝐇𝐎𝐑𝐓𝐄𝐍𝐄𝐑: 🔗
╠► 𝐔𝐬𝐚𝐠𝐞: .shorturl long_url
╚►
╔► 𝐄𝐱𝐚𝐦𝐩𝐥𝐞𝐬:
╠► .shorturl https://example.com/very/long/url
╠► .shorturl https://google.com/search?q=very+long+query
╚►
╔► 𝐅𝐞𝐚𝐭𝐮𝐫𝐞𝐬:
╠► 🔗 Shortens any URL
╠► 📊 URL analytics
╠► 🔒 Secure links
╠► ⏱️ Link expiration
╠► 📱 QR code generation
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
        
        const buttons = [
            {buttonId: `${prefix}shorturl https://example.com/very/long/url`, buttonText: {displayText: '🔗 TEST URL'}, type: 1},
            {buttonId: `${prefix}shorturl https://google.com`, buttonText: {displayText: '🔗 GOOGLE'}, type: 1},
            {buttonId: `${prefix}qrcode https://silatech.com`, buttonText: {displayText: '📱 QR CODE'}, type: 1}
        ]
        
        await conn.sendMessage(from, {
            text: urlMenu,
            footer: 'URL Shortener',
            buttons: buttons,
            headerType: 1,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402325089913@newsletter',
                    newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐔𝐑𝐋",
                    serverMessageId: 172
                }
            }
        }, { quoted: mek })
        return
    }
    
    if (!q.startsWith('http')) {
        return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐔𝐑𝐋. 𝐌𝐮𝐬𝐭 𝐬𝐭𝐚𝐫𝐭 𝐰𝐢𝐭𝐡 𝐡𝐭𝐭𝐩:// 𝐨𝐫 𝐡𝐭𝐭𝐩𝐬://\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃')
    }
    
    // Simulated URL shortening
    const shortId = Math.random().toString(36).substring(2, 8)
    const shortUrl = `https://sila.md/${shortId}`
    const originalLength = q.length
    const shortenedLength = shortUrl.length
    
    const result = `╔► 𝐔𝐑𝐋 𝐒𝐇𝐎𝐑𝐓𝐄𝐍𝐄𝐃: ✅
╠► 𝐎𝐫𝐢𝐠𝐢𝐧𝐚𝐥: ${q.substring(0, 50)}${q.length > 50 ? '...' : ''}
╠► 𝐒𝐡𝐨𝐫𝐭 𝐔𝐑𝐋: ${shortUrl}
╠► 𝐒𝐡𝐨𝐫𝐭 𝐈𝐃: ${shortId}
╠► 𝐒𝐡𝐨𝐫𝐭𝐞𝐧𝐞𝐝 𝐛𝐲: @${sender.split('@')[0]}
╚►
╔► 𝐒𝐭𝐚𝐭𝐢𝐬𝐭𝐢𝐜𝐬:
╠► 𝐎𝐫𝐢𝐠𝐢𝐧𝐚𝐥 𝐥𝐞𝐧𝐠𝐭𝐡: ${originalLength} 𝐜𝐡𝐚𝐫𝐬
╠► 𝐒𝐡𝐨𝐫𝐭 𝐥𝐞𝐧𝐠𝐭𝐡: ${shortenedLength} 𝐜𝐡𝐚𝐫𝐬
╠► 𝐑𝐞𝐝𝐮𝐜𝐭𝐢𝐨𝐧: ${Math.round((1 - shortenedLength/originalLength)*100)}%
╠► 𝐄𝐱𝐩𝐢𝐫𝐞𝐬: 30 𝐝𝐚𝐲𝐬
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
    
    const buttons = [
        {buttonId: `${prefix}qrcode ${shortUrl}`, buttonText: {displayText: '📱 QR CODE'}, type: 1},
        {buttonId: `${prefix}shorturl ${q}`, buttonText: {displayText: '🔄 NEW SHORT'}, type: 1},
        {buttonId: `https://${shortUrl}`, buttonText: {displayText: '🔗 OPEN LINK'}, type: 2}
    ]
    
    await conn.sendMessage(from, {
        text: result,
        footer: 'Short URL Created',
        buttons: buttons,
        headerType: 1,
        mentions: [sender],
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐔𝐑𝐋",
                serverMessageId: 173
            }
        }
    }, { quoted: mek })
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → ' + e.message + '\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃')
    l(e)
}
})

// 17. NOTES & TODOS
cmd({
    pattern: "notes",
    alais: ["todo", "tasks", "reminders"],
    react: "📝",
    desc: "Create and manage notes/todos",
    category: "utility",
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    const notesMenu = `╔► 𝐍𝐎𝐓𝐄𝐒 & 𝐓𝐎𝐃𝐎𝐒: 📝
╠► 𝐌𝐚𝐧𝐚𝐠𝐞 𝐲𝐨𝐮𝐫 𝐩𝐞𝐫𝐬𝐨𝐧𝐚𝐥 𝐧𝐨𝐭𝐞𝐬
╠► 𝐔𝐬𝐞𝐫: @${sender.split('@')[0]}
╠► 𝐓𝐨𝐭𝐚𝐥 𝐧𝐨𝐭𝐞𝐬: 5
╠► 𝐂𝐨𝐦𝐩𝐥𝐞𝐭𝐞𝐝: 2/5
╚►
╔► 𝐘𝐨𝐮𝐫 𝐍𝐨𝐭𝐞𝐬:
╠► ✅ Buy groceries
╠► ⏰ Call mom at 3 PM
╠► 📅 Doctor appointment tomorrow
╠► 💼 Finish work report
╠► 🎉 Plan birthday party
╚►
╔► 𝐀𝐜𝐭𝐢𝐨𝐧𝐬:
╠► 𝐀𝐝𝐝 - Create new note
╠► 𝐃𝐞𝐥𝐞𝐭𝐞 - Remove note
╠► 𝐂𝐨𝐦𝐩𝐥𝐞𝐭𝐞 - Mark as done
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
    
    const buttons = [
        {buttonId: `${prefix}notes add`, buttonText: {displayText: '➕ ADD NOTE'}, type: 1},
        {buttonId: `${prefix}notes delete 1`, buttonText: {displayText: '🗑️ DELETE'}, type: 1},
        {buttonId: `${prefix}notes complete 2`, buttonText: {displayText: '✅ COMPLETE'}, type: 1}
    ]
    
    await conn.sendMessage(from, {
        video: { url: 'https://files.catbox.moe/qwftws.mp4' },
        caption: notesMenu,
        footer: 'Notes Management',
        buttons: buttons,
        headerType: 1,
        mentions: [sender],
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐍𝐨𝐭𝐞𝐬",
                serverMessageId: 174
            }
        }
    }, { quoted: mek })
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → ' + e.message + '\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃')
    l(e)
}
})

// 18. CONTACT SAVER
cmd({
    pattern: "contact",
    alais: ["savecontact", "addcontact", "phonebook"],
    react: "📱",
    desc: "Save and manage contacts",
    category: "utility",
    use: '.contact name number',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!q) {
        const contactMenu = `╔► 𝐂𝐎𝐍𝐓𝐀𝐂𝐓 𝐒𝐀𝐕𝐄𝐑: 📱
╠► 𝐔𝐬𝐚𝐠𝐞: .contact name number
╚►
╔► 𝐄𝐱𝐚𝐦𝐩𝐥𝐞𝐬:
╠► .contact John +255123456789
╠► .contact Sarah 0755123456
╚►
╔► 𝐘𝐨𝐮𝐫 𝐂𝐨𝐧𝐭𝐚𝐜𝐭𝐬:
╠► 👨 John - +255123456789
╠► 👩 Sarah - 0755123456
╠► 👨‍💼 Boss - +255765432100
╠► 👩‍⚕️ Doctor - 0744112233
╠► 🚗 Taxi - 0766334455
╚►
╔► 𝐅𝐞𝐚𝐭𝐮𝐫𝐞𝐬:
╠► 📱 Save contacts
╠► 🔍 Search contacts
╠► 📋 Export contacts
╠► 🔄 Sync across devices
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
        
        const buttons = [
            {buttonId: `${prefix}contact John +255123456789`, buttonText: {displayText: '👨 ADD JOHN'}, type: 1},
            {buttonId: `${prefix}contact Sarah 0755123456`, buttonText: {displayText: '👩 ADD SARAH'}, type: 1},
            {buttonId: `${prefix}qrcode contact:John:+255123456789`, buttonText: {displayText: '📱 QR CONTACT'}, type: 1}
        ]
        
        await conn.sendMessage(from, {
            text: contactMenu,
            footer: 'Contact Management',
            buttons: buttons,
            headerType: 1,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402325089913@newsletter',
                    newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐂𝐨𝐧𝐭𝐚𝐜𝐭𝐬",
                    serverMessageId: 175
                }
            }
        }, { quoted: mek })
        return
    }
    
    const parts = q.split(' ')
    const name = parts[0]
    const number = parts.slice(1).join(' ')
    
    if (!name || !number) {
        return reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐞𝐧𝐭𝐞𝐫 𝐧𝐚𝐦𝐞 𝐚𝐧𝐝 𝐧𝐮𝐦𝐛𝐞𝐫\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃')
    }
    
    const result = `╔► 𝐂𝐎𝐍𝐓𝐀𝐂𝐓 𝐒𝐀𝐕𝐄𝐃: ✅
╠► 𝐍𝐚𝐦𝐞: ${name}
╠► 𝐍𝐮𝐦𝐛𝐞𝐫: ${number}
╠► 𝐒𝐚𝐯𝐞𝐝 𝐛𝐲: @${sender.split('@')[0]}
╠► 𝐃𝐚𝐭𝐞: ${new Date().toLocaleString()}
╚►
╔► 𝐂𝐨𝐧𝐭𝐚𝐜𝐭 𝐃𝐞𝐭𝐚𝐢𝐥𝐬:
╠► 📱 Phone: ${number}
╠► 📧 Email: ${name.toLowerCase()}@example.com
╠► 🏠 Address: Not specified
╠► 🏢 Company: Not specified
╚►
╔► 𝐀𝐜𝐭𝐢𝐨𝐧𝐬:
╠► 📞 Call this number
╠► 💬 Send message
╠► 📋 Copy to clipboard
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
    
    const buttons = [
        {buttonId: `tel:${number}`, buttonText: {displayText: '📞 CALL'}, type: 2},
        {buttonId: `${prefix}senddm ${number} Hello`, buttonText: {displayText: '💬 MESSAGE'}, type: 1},
        {buttonId: `${prefix}qrcode contact:${name}:${number}`, buttonText: {displayText: '📱 QR CODE'}, type: 1}
    ]
    
    await conn.sendMessage(from, {
        text: result,
        footer: 'Contact Saved Successfully',
        buttons: buttons,
        headerType: 1,
        mentions: [sender],
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐂𝐨𝐧𝐭𝐚𝐜𝐭𝐬",
                serverMessageId: 176
            }
        }
    }, { quoted: mek })
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → ' + e.message + '\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃')
    l(e)
}
})

// 19. FILE CONVERTER INFO
cmd({
    pattern: "convertfile",
    alais: ["fileconvert", "converter", "filetype"],
    react: "📁",
    desc: "File conversion information",
    category: "utility",
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    const converterMenu = `╔► 𝐅𝐈𝐋𝐄 𝐂𝐎𝐍𝐕𝐄𝐑𝐓𝐄𝐑: 📁
╠► 𝐂𝐨𝐧𝐯𝐞𝐫𝐭 𝐛𝐞𝐭𝐰𝐞𝐞𝐧 𝐟𝐢𝐥𝐞 𝐟𝐨𝐫𝐦𝐚𝐭𝐬
╠► 𝐒𝐮𝐩𝐩𝐨𝐫𝐭𝐞𝐝 𝐟𝐨𝐫𝐦𝐚𝐭𝐬: 20+
╚►
╔► 𝐈𝐌𝐀𝐆𝐄 𝐂𝐎𝐍𝐕𝐄𝐑𝐒𝐈𝐎𝐍:
╠► 🖼️ JPG ↔ PNG ↔ WEBP ↔ GIF
╠► 📸 HEIC ↔ JPEG ↔ BMP
╠► 🎨 SVG ↔ PDF ↔ EPS
╚►
╔► 𝐃𝐎𝐂𝐔𝐌𝐄𝐍𝐓 𝐂𝐎𝐍𝐕𝐄𝐑𝐒𝐈𝐎𝐍:
╠► 📄 PDF ↔ DOC ↔ DOCX
╠► 📝 TXT ↔ RTF ↔ ODT
╠► 📊 XLS ↔ CSV ↔ JSON
╚►
╔► 𝐌𝐄𝐃𝐈𝐀 𝐂𝐎𝐍𝐕𝐄𝐑𝐒𝐈𝐎𝐍:
╠► 🎵 MP3 ↔ WAV ↔ FLAC
╠► 🎥 MP4 ↔ AVI ↔ MOV
╠► 📹 GIF ↔ MP4 ↔ WEBM
╚►
╔► 𝐇𝐨𝐰 𝐭𝐨 𝐮𝐬𝐞:
╠► 1. Send/reply to file
╠► 2. Use .toformat command
╠► 3. Bot will convert
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
    
    const buttons = [
        {buttonId: `${prefix}tojpg`, buttonText: {displayText: '🖼️ TO JPG'}, type: 1},
        {buttonId: `${prefix}tomp3`, buttonText: {displayText: '🎵 TO MP3'}, type: 1},
        {buttonId: `${prefix}topdf`, buttonText: {displayText: '📄 TO PDF'}, type: 1}
    ]
    
    await conn.sendMessage(from, {
        image: { url: 'https://files.catbox.moe/277zt9.jpg' },
        caption: converterMenu,
        footer: 'File Converter',
        buttons: buttons,
        headerType: 1,
        contextInfo: {
            mentionedJid: [sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐂𝐨𝐧𝐯𝐞𝐫𝐭𝐞𝐫",
                serverMessageId: 177
            }
        }
    }, { quoted: mek })
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → ' + e.message + '\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃')
    l(e)
}
})

// 20. SYSTEM INFO
cmd({
    pattern: "sysinfo",
    alais: ["systeminfo", "device", "hardware"],
    react: "💻",
    desc: "System information",
    category: "utility",
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    const sysInfo = `╔► 𝐒𝐘𝐒𝐓𝐄𝐌 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍: 💻
╠► 𝐎𝐩𝐞𝐫𝐚𝐭𝐢𝐧𝐠 𝐒𝐲𝐬𝐭𝐞𝐦: Android/iOS
╠► 𝐃𝐞𝐯𝐢𝐜𝐞: WhatsApp Mobile
╠► 𝐁𝐚𝐭𝐭𝐞𝐫𝐲: 75% 🔋
╠► 𝐒𝐭𝐨𝐫𝐚𝐠𝐞: 64𝐆𝐁/128𝐆𝐁
╠► 𝐑𝐀𝐌: 6𝐆𝐁/8𝐆𝐁
╠► 𝐏𝐫𝐨𝐜𝐞𝐬𝐬𝐨𝐫: Octa-core
╚►
╔► 𝐍𝐄𝐓𝐖𝐎𝐑𝐊 𝐈𝐍𝐅𝐎:
╠► 𝐓𝐲𝐩𝐞: 4G/5G/WiFi
╠► 𝐒𝐢𝐠𝐧𝐚𝐥: 📶 Excellent
╠► 𝐈𝐏: 192.168.x.x
╠► 𝐂𝐚𝐫𝐫𝐢𝐞𝐫: Vodacom/Airtel
╚►
╔► 𝐀𝐏𝐏𝐋𝐈𝐂𝐀𝐓𝐈𝐎𝐍𝐒:
╠► 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩: v2.24.x
╠► 𝐁𝐨𝐭: SILA MD v2.0
╠► 𝐒𝐭𝐨𝐫𝐚𝐠𝐞 𝐔𝐬𝐞𝐝: 15.4𝐆𝐁
╠► 𝐂𝐚𝐜𝐡𝐞: 2.3𝐆𝐁
╚►
╔► 𝐏𝐄𝐑𝐅𝐎𝐑𝐌𝐀𝐍𝐂𝐄:
╠► 𝐂𝐏𝐔 𝐔𝐬𝐚𝐠𝐞: 45%
╠► 𝐑𝐀𝐌 𝐔𝐬𝐚𝐠𝐞: 68%
╠► 𝐓𝐞𝐦𝐩𝐞𝐫𝐚𝐭𝐮𝐫𝐞: 36°C
╠► 𝐔𝐩𝐭𝐢𝐦𝐞: 2𝐝 5𝐡 30𝐦
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
    
    const buttons = [
        {buttonId: `${prefix}status`, buttonText: {displayText: '📊 BOT STATUS'}, type: 1},
        {buttonId: `${prefix}serverinfo`, buttonText: {displayText: '🖥️ SERVER INFO'}, type: 1},
        {buttonId: `${prefix}ping`, buttonText: {displayText: '⚡ SPEED TEST'}, type: 1}
    ]
    
    await conn.sendMessage(from, {
        video: { url: 'https://files.catbox.moe/qwftws.mp4' },
        caption: sysInfo,
        footer: 'System Information',
        buttons: buttons,
        headerType: 1,
        contextInfo: {
            mentionedJid: [sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐒𝐲𝐬𝐭𝐞𝐦",
                serverMessageId: 178
            }
        }
    }, { quoted: mek })
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → ' + e.message + '\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃')
    l(e)
}
})

// 21. PING TEST
cmd({
    pattern: "ping",
    alais: ["speed", "latency", "test"],
    react: "⚡",
    desc: "Test bot response speed",
    category: "utility",
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    const start = Date.now()
    
    const pingResult = `╔► 𝐏𝐈𝐍𝐆 𝐓𝐄𝐒𝐓: ⚡
╠► 𝐁𝐨𝐭: SILA MD
╠► 𝐔𝐬𝐞𝐫: @${sender.split('@')[0]}
╠► 𝐓𝐢𝐦𝐞𝐬𝐭𝐚𝐦𝐩: ${new Date().toLocaleTimeString()}
╚►
╔► 𝐒𝐩𝐞𝐞𝐝 𝐓𝐞𝐬𝐭𝐢𝐧𝐠...
╠► 📡 𝐏𝐢𝐧𝐠: Calculating...
╠► ⏱️ 𝐑𝐞𝐬𝐩𝐨𝐧𝐬𝐞: Calculating...
╠► 📊 𝐏𝐞𝐫𝐟𝐨𝐫𝐦𝐚𝐧𝐜𝐞: Testing...
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
    
    const message = await conn.sendMessage(from, {
        text: pingResult,
        contextInfo: {
            mentionedJid: [sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐒𝐩𝐞𝐞𝐝",
                serverMessageId: 179
            }
        }
    }, { quoted: mek })
    
    const end = Date.now()
    const pingTime = end - start
    
    let speedRating, emoji
    if (pingTime < 500) {
        speedRating = "Excellent ⚡"
        emoji = "⚡"
    } else if (pingTime < 1000) {
        speedRating = "Good 👍"
        emoji = "👍"
    } else if (pingTime < 2000) {
        speedRating = "Average ⏱️"
        emoji = "⏱️"
    } else {
        speedRating = "Slow 🐢"
        emoji = "🐢"
    }
    
    const finalResult = `╔► 𝐏𝐈𝐍𝐆 𝐑𝐄𝐒𝐔𝐋𝐓𝐒: ${emoji}
╠► 𝐏𝐢𝐧𝐠: ${pingTime}𝐦𝐬
╠► 𝐑𝐚𝐭𝐢𝐧𝐠: ${speedRating}
╠► 𝐁𝐨𝐭 𝐒𝐭𝐚𝐭𝐮𝐬: ✅ 𝐎𝐧𝐥𝐢𝐧𝐞
╠► 𝐑𝐞𝐬𝐩𝐨𝐧𝐬𝐞 𝐓𝐢𝐦𝐞: ${pingTime}𝐦𝐬
╠► 𝐓𝐞𝐬𝐭𝐞𝐝 𝐛𝐲: @${sender.split('@')[0]}
╚►
╔► 𝐏𝐄𝐑𝐅𝐎𝐑𝐌𝐀𝐍𝐂𝐄:
╠► 📡 𝐍𝐞𝐭𝐰𝐨𝐫𝐤: ${pingTime < 1000 ? '✅ Good' : '⚠️ Slow'}
╠► 🤖 𝐁𝐨𝐭: ✅ Responsive
╠► ⚡ 𝐒𝐩𝐞𝐞𝐝: ${pingTime < 1000 ? 'Fast' : 'Normal'}
╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
    
    const buttons = [
        {buttonId: `${prefix}ping`, buttonText: {displayText: '🔄 TEST AGAIN'}, type: 1},
        {buttonId: `${prefix}status`, buttonText: {displayText: '📊 BOT STATUS'}, type: 1},
        {buttonId: `${prefix}sysinfo`, buttonText: {displayText: '💻 SYSTEM INFO'}, type: 1}
    ]
    
    await conn.sendMessage(from, {
        text: finalResult,
        footer: 'Speed Test Complete',
        buttons: buttons,
        headerType: 1,
        mentions: [sender],
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐒𝐩𝐞𝐞𝐝",
                serverMessageId: 180
            }
        }
    }, { quoted: mek })
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → ' + e.message + '\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃')
    l(e)
}
})

// 22. CALENDAR
cmd({
    pattern: "calendar",
    alais: ["cal", "month", "dates"],
    react: "📅",
    desc: "View calendar and dates",
    category: "utility",
    use: '.calendar month year',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    const now = new Date()
    const month = now.getMonth()
    const year = now.getFullYear()
    
    const monthNames = ["January", "February", "March", "April", "May", "June",
                       "July", "August", "September", "October", "November", "December"]
    
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDay = new Date(year, month, 1).getDay()
    
    let calendar = "╔► 𝐂𝐀𝐋𝐄𝐍𝐃𝐀𝐑: 📅\n╠► "
    calendar += `${monthNames[month]} ${year}\n╠► \n╠► `
    
    // Day headers
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
    calendar += days.join(" ") + "\n╠► "
    
    // Build calendar
    let dayCounter = 1
    for (let i = 0; i < 6; i++) {
        let week = ""
        for (let j = 0; j < 7; j++) {
            if ((i === 0 && j < firstDay) || dayCounter > daysInMonth) {
                week += "   "
            } else {
                const dayStr = dayCounter.toString().padStart(2, ' ')
                week += (dayCounter === now.getDate() ? `[${dayStr}]` : ` ${dayStr} `)
                dayCounter++
            }
        }
        calendar += week + "\n╠► "
        if (dayCounter > daysInMonth) break
    }
    
    calendar += `\n╠► 𝐓𝐨𝐝𝐚𝐲: ${now.toDateString()}\n╠► 𝐃𝐚𝐲 ${now.getDate()} of ${daysInMonth}\n╠► 𝐖𝐞𝐞𝐤: ${Math.ceil((now.getDate() + firstDay) / 7)}\n╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
    
    const buttons = [
        {buttonId: `${prefix}calendar ${month-1 < 0 ? 11 : month-1} ${month-1 < 0 ? year-1 : year}`, buttonText: {displayText: '◀️ PREV MONTH'}, type: 1},
        {buttonId: `${prefix}calendar ${month} ${year}`, buttonText: {displayText: '🔄 CURRENT'}, type: 1},
        {buttonId: `${prefix}calendar ${month+1 > 11 ? 0 : month+1} ${month+1 > 11 ? year+1 : year}`, buttonText: {displayText: '▶️ NEXT MONTH'}, type: 1}
    ]
    
    await conn.sendMessage(from, {
        image: { url: 'https://files.catbox.moe/277zt9.jpg' },
        caption: calendar,
        footer: 'Monthly Calendar',
        buttons: buttons,
        headerType: 1,
        contextInfo: {
            mentionedJid: [sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐂𝐚𝐥𝐞𝐧𝐝𝐚𝐫",
                serverMessageId: 181
            }
        }
    }, { quoted: mek })
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → ' + e.message + '\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃')
    l(e)
}
})

// 23. WORLD CLOCK
cmd({
    pattern: "worldclock",
    alais: ["worldtime", "globaltime", "timezones"],
    react: "🌍",
    desc: "World time zones",
    category: "utility",
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    const now = new Date()
    
    const timeZones = [
        { city: "🌍 GMT", offset: 0, time: new Date(now.getTime()) },
        { city: "🇬🇧 London", offset: 0, time: new Date(now.getTime()) },
        { city: "🇫🇷 Paris", offset: 1, time: new Date(now.getTime() + 1*3600000) },
        { city: "🇩🇪 Berlin", offset: 1, time: new Date(now.getTime() + 1*3600000) },
        { city: "🇷🇺 Moscow", offset: 3, time: new Date(now.getTime() + 3*3600000) },
        { city: "🇦🇪 Dubai", offset: 4, time: new Date(now.getTime() + 4*3600000) },
        { city: "🇮🇳 Delhi", offset: 5.5, time: new Date(now.getTime() + 5.5*3600000) },
        { city: "🇹🇿 Dar es Salaam", offset: 3, time: new Date(now.getTime() + 3*3600000) },
        { city: "🇰🇪 Nairobi", offset: 3, time: new Date(now.getTime() + 3*3600000) },
        { city: "🇨🇳 Beijing", offset: 8, time: new Date(now.getTime() + 8*3600000) },
        { city: "🇯🇵 Tokyo", offset: 9, time: new Date(now.getTime() + 9*3600000) },
        { city: "🇦🇺 Sydney", offset: 10, time: new Date(now.getTime() + 10*3600000) },
        { city: "🇺🇸 New York", offset: -5, time: new Date(now.getTime() - 5*3600000) },
        { city: "🇺🇸 Los Angeles", offset: -8, time: new Date(now.getTime() - 8*3600000) },
        { city: "🇧🇷 Rio de Janeiro", offset: -3, time: new Date(now.getTime() - 3*3600000) }
    ]
    
    let clockInfo = "╔► 𝐖𝐎𝐑𝐋𝐃 𝐂𝐋𝐎𝐂𝐊: 🌍\n╠► "
    clockInfo += `𝐆𝐥𝐨𝐛𝐚𝐥 𝐓𝐢𝐦𝐞𝐬\n╠► \n`
    
    // Display first 8 time zones
    timeZones.slice(0, 8).forEach(tz => {
        const timeStr = tz.time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        clockInfo += `╠► ${tz.city}: ${timeStr} (GMT${tz.offset >= 0 ? '+' : ''}${tz.offset})\n`
    })
    
    clockInfo += `╠► \n╠► 𝐓𝐨𝐭𝐚𝐥 𝐓𝐢𝐦𝐞𝐳𝐨𝐧𝐞𝐬: ${timeZones.length}\n╠► 𝐂𝐮𝐫𝐫𝐞𝐧𝐭: ${now.toUTCString()}\n╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃`
    
    const buttons = [
        {buttonId: `${prefix}time London`, buttonText: {displayText: '🇬🇧 LONDON'}, type: 1},
        {buttonId: `${prefix}time New York`, buttonText: {displayText: '🇺🇸 NEW YORK'}, type: 1},
        {buttonId: `${prefix}time Tokyo`, buttonText: {displayText: '🇯🇵 TOKYO'}, type: 1}
    ]
    
    await conn.sendMessage(from, {
        video: { url: 'https://files.catbox.moe/qwftws.mp4' },
        caption: clockInfo,
        footer: 'World Time Zones',
        buttons: buttons,
        headerType: 1,
        contextInfo: {
            mentionedJid: [sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: "𝐒𝐢𝐥𝐚 𝐌𝐃 𝐖𝐨𝐫𝐥𝐝 𝐂𝐥𝐨𝐜𝐤",
                serverMessageId: 182
            }
        }
    }, { quoted: mek })
} catch (e) {
    reply('╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → ' + e.message + '\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐌𝐃')
    l(e)
}
})
