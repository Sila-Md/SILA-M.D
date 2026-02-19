const axios = require('axios');
const config = require('../config');
const { cmd } = require('../command');
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

const getContextInfo = (m, ownerName = "𝐒𝐈𝐋𝐀 𝐌𝐃", formattedOwnerNumber = "255789661031") => {
    return {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363402325089913@newsletter',
            newsletterName: '© 𝐒𝐈𝐋𝐀 𝐌𝐃',
            serverMessageId: 143,
        },
        externalAdReply: {
            title: `👑 𝙱𝙾𝚃 𝙾𝚆𝙽𝙴𝚁: ${ownerName}`,
            body: `📞 wa.me/${formattedOwnerNumber}`,
            mediaType: 1,
            previewType: 0,
            thumbnailUrl: 'https://files.catbox.moe/98k75b.jpeg',
            sourceUrl: `https://wa.me/${formattedOwnerNumber}`,
            renderLargerThumbnail: false,
        }
    };
};

let bioInterval;
const defaultBio = config.AUTO_BIO_TEXT || "𝚂𝙸𝙻𝙰 𝙼𝙳 | 𝚀𝚞𝚘𝚝𝚎: {quote} | 𝚃𝚒𝚖𝚎: {time}";
const quoteApiUrl = config.QUOTE_API_URL || 'https://apis.davidcyriltech.my.id/random/quotes';
const updateInterval = config.AUTO_BIO_INTERVAL || 30 * 1000;

// Fallback quotes
const fallbackQuotes = [
    "𝚂𝚝𝚊𝚢 𝚌𝚞𝚛𝚒𝚘𝚞𝚜, 𝚔𝚎𝚎𝚙 𝚕𝚎𝚊𝚛𝚗𝚒𝚗𝚐!",
    "𝙳𝚛𝚎𝚊𝚖 𝚋𝚒𝚐, 𝚠𝚘𝚛𝚔 𝚑𝚊𝚛𝚍!",
    "𝚃𝚑𝚎 𝚋𝚎𝚜𝚝 𝚒𝚜 𝚢𝚎𝚝 𝚝𝚘 𝚌𝚘𝚖𝚎.",
    "𝙺𝚎𝚎𝚙 𝚒𝚝 𝚛𝚎𝚊𝚕, 𝚊𝚕𝚠𝚊𝚢𝚜.",
    "𝙻𝚒𝚏𝚎 𝚒𝚜 𝚊 𝚓𝚘𝚞𝚛𝚗𝚎𝚢, 𝚎𝚗𝚓𝚘𝚢 𝚒𝚝!"
];

// Function to get Kenya time
function getKenyaTime() {
    const options = {
        timeZone: 'Africa/Nairobi',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    };
    
    const now = new Date();
    const kenyaTime = now.toLocaleString('en-US', options);
    return kenyaTime;
}

cmd({
    pattern: 'autobio',
    alias: ['autoabout'],
    desc: 'Toggle automatic bio updates with random quotes and Kenya time',
    category: 'misc',
    filename: __filename,
    usage: `${config.PREFIX}autobio [on/off] [text]`
}, async (conn, mek, m, { args, isOwner, from, sender }) => {
    try {
        const ownerName = "𝐒𝐈𝐋𝐀 𝐌𝐃";
        const formattedOwnerNumber = "255789661031";
        
        if (!isOwner) {
            return await conn.sendMessage(from, { 
                text: "🚫 *𝚃𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚒𝚜 𝚘𝚗𝚕𝚢 𝚊𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎 𝚝𝚘 𝚝𝚑𝚎 𝚋𝚘𝚝 𝚘𝚠𝚗𝚎𝚛.*\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });
        }

        const [action, ...bioParts] = args;
        const customBio = bioParts.join(' ') || defaultBio;

        if (action === 'on') {
            if (config.AUTO_BIO === "true") {
                return await conn.sendMessage(from, { 
                    text: "ℹ️ *𝙰𝚞𝚝𝚘-𝙱𝚒𝚘 𝚒𝚜 𝚊𝚕𝚛𝚎𝚊𝚍𝚢 𝚎𝚗𝚊𝚋𝚕𝚎𝚍*", 
                    contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
                }, { quoted: fkontak });
            }

            config.AUTO_BIO = "true";
            config.AUTO_BIO_TEXT = customBio;

            startAutoBio(conn, customBio);
            
            return await conn.sendMessage(from, { 
                text: `✅ *𝙰𝚞𝚝𝚘-𝙱𝚒𝚘 𝙴𝚗𝚊𝚋𝚕𝚎𝚍*\n\n𝚃𝚎𝚡𝚝: "${customBio}"\n\n> © Powered by Sila Tech`, 
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });

        } else if (action === 'off') {
            if (config.AUTO_BIO !== "true") {
                return await conn.sendMessage(from, { 
                    text: "ℹ️ *𝙰𝚞𝚝𝚘-𝙱𝚒𝚘 𝚒𝚜 𝚊𝚕𝚛𝚎𝚊𝚍𝚢 𝚍𝚒𝚜𝚊𝚋𝚕𝚎𝚍*", 
                    contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
                }, { quoted: fkontak });
            }

            config.AUTO_BIO = "false";
            stopAutoBio();
            
            return await conn.sendMessage(from, { 
                text: "✅ *𝙰𝚞𝚝𝚘-𝙱𝚒𝚘 𝙳𝚒𝚜𝚊𝚋𝚕𝚎𝚍*\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });

        } else {
            const currentStatus = config.AUTO_BIO === "true" ? "𝙴𝚗𝚊𝚋𝚕𝚎𝚍 ✅" : "𝙳𝚒𝚜𝚊𝚋𝚕𝚎𝚍 ❌";
            
            return await conn.sendMessage(from, { 
                text: `╭━━〔 🤖 *𝙰𝚄𝚃𝙾-𝙱𝙸𝙾* 〕━━┈⊷
┃
┃ 📜 *𝚄𝚜𝚊𝚐𝚎:*
┃ ➸ .autobio on [𝚝𝚎𝚡𝚝] - 𝙴𝚗𝚊𝚋𝚕𝚎
┃ ➸ .autobio off - 𝙳𝚒𝚜𝚊𝚋𝚕𝚎
┃
┃ 🔖 *𝙿𝚕𝚊𝚌𝚎𝚑𝚘𝚕𝚍𝚎𝚛𝚜:*
┃ ➸ {quote} - 𝚁𝚊𝚗𝚍𝚘𝚖 𝚚𝚞𝚘𝚝𝚎
┃ ➸ {time} - 𝙺𝚎𝚗𝚢𝚊 𝚝𝚒𝚖𝚎
┃
┃ 💡 *𝚂𝚝𝚊𝚝𝚞𝚜:* ${currentStatus}
┃ 📝 *𝚃𝚎𝚡𝚝:* "${config.AUTO_BIO_TEXT || defaultBio}"
┃ 🕒 *𝙺𝚎𝚗𝚢𝚊 𝚃𝚒𝚖𝚎:* ${getKenyaTime()}
┃
╰──────────────┈⊷
> © Powered by Sila Tech`, 
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });
        }
    } catch (error) {
        console.error('❌ Auto-bio error:', error.message);
        await conn.sendMessage(from, { 
            text: "❌ 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚞𝚙𝚍𝚊𝚝𝚎 𝚊𝚞𝚝𝚘-𝚋𝚒𝚘 𝚜𝚎𝚝𝚝𝚒𝚗𝚐𝚜", 
            contextInfo: getContextInfo({ sender: sender }, "𝐒𝐈𝐋𝐀 𝐌𝐃", "255789661031")
        }, { quoted: fkontak });
    }
});

// Fetch random quote
async function fetchQuote() {
    try {
        const response = await axios.get(quoteApiUrl);
        if (response.status === 200 && response.data.content) {
            return response.data.content;
        }
        throw new Error('Invalid quote API response');
    } catch (error) {
        console.error('Quote fetch error:', error.message);
        return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    }
}

// Start auto-bio updates
async function startAutoBio(conn, bioText) {
    stopAutoBio();

    try {
        const quote = await fetchQuote();
        const kenyaTime = getKenyaTime();
        const formattedBio = bioText
            .replace('{quote}', quote)
            .replace('{time}', kenyaTime);
        await conn.updateProfileStatus(formattedBio);
    } catch (error) {
        console.error('❌ Initial bio update error:', error.message);
    }

    bioInterval = setInterval(async () => {
        try {
            const quote = await fetchQuote();
            const kenyaTime = getKenyaTime();
            const formattedBio = bioText
                .replace('{quote}', quote)
                .replace('{time}', kenyaTime);
            await conn.updateProfileStatus(formattedBio);
        } catch (error) {
            console.error('❌ Bio update error:', error.message);
            setTimeout(async () => {
                try {
                    const quote = await fetchQuote();
                    const kenyaTime = getKenyaTime();
                    const formattedBio = bioText
                        .replace('{quote}', quote)
                        .replace('{time}', kenyaTime);
                    await conn.updateProfileStatus(formattedBio);
                } catch (retryError) {
                    console.error('❌ Bio retry error:', retryError.message);
                    stopAutoBio();
                }
            }, 5000);
        }
    }, updateInterval);
}

// Stop auto-bio updates
function stopAutoBio() {
    if (bioInterval) {
        clearInterval(bioInterval);
        bioInterval = null;
    }
}

// Initialize auto-bio if enabled
module.exports.init = (conn) => {
    if (config.AUTO_BIO === "true") {
        const bioText = config.AUTO_BIO_TEXT || defaultBio;
        startAutoBio(conn, bioText);
    }
};