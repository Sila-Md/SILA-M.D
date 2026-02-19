const axios = require('axios'); 
const config = require('../config');
const { cmd, commands } = require('../command');
const fetch = require('node-fetch'); 

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
    pattern: "praytime", 
    alias: ["prayertimes", "prayertime", "ptime" ], 
    react: "✅", 
    desc: "Get the prayer times, weather, and location for the city.", 
    category: "information", 
    filename: __filename,
},
async(conn, mek, m, {from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, isItzcp, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try {
        const ownerName = "𝐒𝐈𝐋𝐀 𝐌𝐃";
        const formattedOwnerNumber = "255789661031";
        
        const city = args.length > 0 ? args.join(" ") : "bhakkar"; // Default to Bhakkar if no city is provided
        const apiUrl = `https://api.nexoracle.com/islamic/prayer-times?city=${city}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
            return await conn.sendMessage(from, { 
                text: '𝙴𝚛𝚛𝚘𝚛 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝚙𝚛𝚊𝚢𝚎𝚛 𝚝𝚒𝚖𝚎𝚜!\n\n> © Powered by Sila Tech', 
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });
        }

        const data = await response.json();

        if (data.status !== 200) {
            return await conn.sendMessage(from, { 
                text: '𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚐𝚎𝚝 𝚙𝚛𝚊𝚢𝚎𝚛 𝚝𝚒𝚖𝚎𝚜. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚝𝚛𝚢 𝚊𝚐𝚊𝚒𝚗 𝚕𝚊𝚝𝚎𝚛.\n\n> © Powered by Sila Tech', 
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });
        }

        const prayerTimes = data.result.items[0];
        const weather = data.result.today_weather;
        const location = data.result.city;

        // Building the message content
        let dec = `╭━━〔 🕌 *𝙿𝚁𝙰𝚈𝙴𝚁 𝚃𝙸𝙼𝙴𝚂* 〕━━┈⊷
┃
┃ 📍 *𝙻𝚘𝚌𝚊𝚝𝚒𝚘𝚗*: ${location}, ${data.result.state}
┃ 🕌 *𝙼𝚎𝚝𝚑𝚘𝚍*: ${data.result.prayer_method_name}
┃
┃ ━━━━━━━━━━━━━━━━
┃
┃ 🌅 *𝙵𝚊𝚓𝚛*: ${prayerTimes.fajr}
┃ 🌄 *𝚂𝚑𝚞𝚛𝚘𝚘𝚚*: ${prayerTimes.shurooq}
┃ ☀️ *𝙳𝚑𝚞𝚑𝚛*: ${prayerTimes.dhuhr}
┃ 🌇 *𝙰𝚜𝚛*: ${prayerTimes.asr}
┃ 🌆 *𝙼𝚊𝚐𝚑𝚛𝚒𝚋*: ${prayerTimes.maghrib}
┃ 🌃 *𝙸𝚜𝚑𝚊*: ${prayerTimes.isha}
┃
┃ 🧭 *𝚀𝚒𝚋𝚕𝚊 𝙳𝚒𝚛𝚎𝚌𝚝𝚒𝚘𝚗*: ${data.result.qibla_direction}°
┃
┃ 🌡️ *𝚃𝚎𝚖𝚙𝚎𝚛𝚊𝚝𝚞𝚛𝚎*: ${weather.temperature !== null ? `${weather.temperature}°C` : '𝙳𝚊𝚝𝚊 𝚗𝚘𝚝 𝚊𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎'}
┃
╰━━━━━━━━━━━━━━━━━━┈⊷
> © Powered by Sila Tech`;

        // Send image with caption
        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/98k75b.jpeg` },
                caption: dec,
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            },
            { quoted: fkontak }
        );

    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { 
            text: '*𝙴𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝚙𝚛𝚊𝚢𝚎𝚛 𝚝𝚒𝚖𝚎𝚜 𝚊𝚗𝚍 𝚠𝚎𝚊𝚝𝚑𝚎𝚛.*\n\n> © Powered by Sila Tech', 
            contextInfo: getContextInfo({ sender: sender }, "𝐒𝐈𝐋𝐀 𝐌𝐃", "255789661031")
        }, { quoted: fkontak });
    }
});