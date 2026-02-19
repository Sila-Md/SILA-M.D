const axios = require('axios');
const { cmd } = require('../command');
const config = require('../config');

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

cmd({
    pattern: "weather",
    desc: "🌤 Get weather information for a location",
    react: "🌤",
    category: "utility",
    filename: __filename
},
async (conn, mek, m, { from, args, sender }) => {
    try {
        const ownerName = "𝐒𝐈𝐋𝐀 𝐌𝐃";
        const formattedOwnerNumber = "255789661031";
        
        if (!args[0]) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝚌𝚒𝚝𝚢 𝚗𝚊𝚖𝚎\n𝙴𝚡𝚊𝚖𝚙𝚕𝚎: .weather 𝙻𝚘𝚗𝚍𝚘𝚗\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });
        }
        
        const city = args.join(' ');
        const apiUrl = `https://apis.davidcyriltech.my.id/weather?city=${encodeURIComponent(city)}`;
        
        const { data } = await axios.get(apiUrl);
        
        if (!data.success) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝙲𝚘𝚞𝚕𝚍𝚗'𝚝 𝚏𝚎𝚝𝚌𝚑 𝚠𝚎𝚊𝚝𝚑𝚎𝚛 𝚍𝚊𝚝𝚊 𝚏𝚘𝚛 𝚝𝚑𝚊𝚝 𝚕𝚘𝚌𝚊𝚝𝚒𝚘𝚗\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });
        }
        
        const weatherInfo = `
🌤 *𝚆𝚎𝚊𝚝𝚑𝚎𝚛 𝚏𝚘𝚛 ${data.data.location}, ${data.data.country}*

🌡 𝚃𝚎𝚖𝚙𝚎𝚛𝚊𝚝𝚞𝚛𝚎: ${data.data.temperature}
💭 𝙵𝚎𝚎𝚕𝚜 𝙻𝚒𝚔𝚎: ${data.data.feels_like}
☁ 𝚆𝚎𝚊𝚝𝚑𝚎𝚛: ${data.data.weather} (${data.data.description})

💧 𝙷𝚞𝚖𝚒𝚍𝚒𝚝𝚢: ${data.data.humidity}
💨 𝚆𝚒𝚗𝚍 𝚂𝚙𝚎𝚎𝚍: ${data.data.wind_speed}
📊 𝙿𝚛𝚎𝚜𝚜𝚞𝚛𝚎: ${data.data.pressure}

📍 𝙲𝚘𝚘𝚛𝚍𝚒𝚗𝚊𝚝𝚎𝚜: ${data.data.coordinates.latitude}, ${data.data.coordinates.longitude}

> © Powered by Sila Tech
`.trim();

        await conn.sendMessage(from, { 
            text: weatherInfo,
            contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
        }, { quoted: fkontak });
        
    } catch (error) {
        console.error('Weather Error:', error);
        await conn.sendMessage(from, { 
            text: "❌ 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚏𝚎𝚝𝚌𝚑 𝚠𝚎𝚊𝚝𝚑𝚎𝚛 𝚍𝚊𝚝𝚊. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚝𝚛𝚢 𝚊𝚐𝚊𝚒𝚗 𝚕𝚊𝚝𝚎𝚛.\n\n> © Powered by Sila Tech", 
            contextInfo: getContextInfo({ sender: sender }, "𝐒𝐈𝐋𝐀 𝐌𝐃", "255789661031")
        }, { quoted: fkontak });
    }
});