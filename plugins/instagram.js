const { cmd } = require("../command");
const { igdl } = require("ruhend-scraper");
const config = require("../config");

// Set to prevent duplicate processing
const processedMessages = new Set();

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
    pattern: "instagram",
    alias: ["ig2", "igdl", "instalink"],
    desc: "Download Instagram video or image",
    category: "downloader",
    react: "📎",
    filename: __filename
},
async (conn, mek, m, { from, q, reply, sender }) => {
    try {
        const ownerName = "𝐒𝐈𝐋𝐀 𝐌𝐃";
        const formattedOwnerNumber = "255789661031";
        
        if (processedMessages.has(m.key.id)) return;
        processedMessages.add(m.key.id);
        setTimeout(() => processedMessages.delete(m.key.id), 5 * 60 * 1000);

        const text = q?.trim() || m.message?.conversation || m.message?.extendedTextMessage?.text;

        if (!text) {
            return await conn.sendMessage(from, {
                text: `╭──〔 📎 *𝙸𝙽𝚂𝚃𝙰𝙶𝚁𝙰𝙼 𝙻𝙸𝙽𝙺 𝙼𝙸𝚂𝚂𝙸𝙽𝙶* 〕──
│
├─ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝚟𝚊𝚕𝚒𝚍 𝙸𝚗𝚜𝚝𝚊𝚐𝚛𝚊𝚖 𝚟𝚒𝚍𝚎𝚘 𝚕𝚒𝚗𝚔.
│
╰──〔 📥 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝙸𝙻𝙰 𝙼𝙳 〕──
> © Powered by Sila Tech`,
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });
        }

        const instagramPatterns = [
            /https?:\/\/(?:www\.)?instagram\.com\//,
            /https?:\/\/(?:www\.)?instagr\.am\//,
            /https?:\/\/(?:www\.)?instagram\.com\/p\//,
            /https?:\/\/(?:www\.)?instagram\.com\/reel\//,
            /https?:\/\/(?:www\.)?instagram\.com\/tv\//
        ];

        const isValidUrl = instagramPatterns.some(pattern => pattern.test(text));

        if (!isValidUrl) {
            return await conn.sendMessage(from, {
                text: `╭──〔 ❌ *𝙸𝙽𝚅𝙰𝙻𝙸𝙳 𝙻𝙸𝙽𝙺* 〕──
│
├─ 𝚃𝚑𝚊𝚝 𝚒𝚜 𝚗𝚘𝚝 𝚊 𝚟𝚊𝚕𝚒𝚍 𝙸𝚗𝚜𝚝𝚊𝚐𝚛𝚊𝚖 𝚙𝚘𝚜𝚝, 𝚛𝚎𝚎𝚕, 𝚘𝚛 𝚃𝚅 𝚕𝚒𝚗𝚔.
│
╰──〔 📥 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝙸𝙻𝙰 𝙼𝙳 〕──
> © Powered by Sila Tech`,
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });
        }

        // React while processing
        await conn.sendMessage(from, { react: { text: '🔄', key: m.key } });

        // Download media
        const downloadData = await igdl(text);

        if (!downloadData || !downloadData.data || downloadData.data.length === 0) {
            return await conn.sendMessage(from, {
                text: `╭──〔 ⚠️ *𝙽𝙾 𝙼𝙴𝙳𝙸𝙰 𝙵𝙾𝚄𝙽𝙳* 〕──
│
├─ 𝚃𝚑𝚎𝚛𝚎 𝚠𝚊𝚜 𝚗𝚘 𝚖𝚎𝚍𝚒𝚊 𝚊𝚝 𝚝𝚑𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎𝚍 𝚕𝚒𝚗𝚔.
│
╰──〔 📥 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝙸𝙻𝙰 𝙼𝙳 〕──
> © Powered by Sila Tech`,
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });
        }

        const mediaData = downloadData.data;
        for (let i = 0; i < Math.min(20, mediaData.length); i++) {
            const media = mediaData[i];
            const mediaUrl = media.url;

            const isVideo = /\.(mp4|mov|avi|mkv|webm)$/i.test(mediaUrl) ||
                            media.type === 'video' ||
                            text.includes('/reel/') ||
                            text.includes('/tv/');

            if (isVideo) {
                await conn.sendMessage(from, {
                    video: { url: mediaUrl },
                    mimetype: "video/mp4",
                    caption: `╭──〔 🎬 *𝙸𝙽𝚂𝚃𝙰 𝚅𝙸𝙳𝙴𝙾 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝙳* 〕──
│
├─ 𝚂𝚘𝚞𝚛𝚌𝚎: 𝙸𝚗𝚜𝚝𝚊𝚐𝚛𝚊𝚖.𝚌𝚘𝚖
├─ 𝚂𝚝𝚊𝚝𝚞𝚜: ✅ 𝙲𝚘𝚖𝚙𝚕𝚎𝚝𝚎
│
╰──〔 📥 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝙸𝙻𝙰 𝙼𝙳 〕──
> © Powered by Sila Tech`,
                    contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
                }, { quoted: fkontak });
            } else {
                await conn.sendMessage(from, {
                    image: { url: mediaUrl },
                    caption: `╭──〔 🖼️ *𝙸𝙽𝚂𝚃𝙰 𝙸𝙼𝙰𝙶𝙴 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝙳* 〕──
│
├─ 𝚂𝚘𝚞𝚛𝚌𝚎: 𝙸𝚗𝚜𝚝𝚊𝚐𝚛𝚊𝚖.𝚌𝚘𝚖
├─ 𝚂𝚝𝚊𝚝𝚞𝚜: ✅ 𝙲𝚘𝚖𝚙𝚕𝚎𝚝𝚎
│
╰──〔 📥 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝙸𝙻𝙰 𝙼𝙳 〕──
> © Powered by Sila Tech`,
                    contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
                }, { quoted: fkontak });
            }
        }

    } catch (error) {
        console.error('❌ Error in Instagram command:', error);
        await conn.sendMessage(from, {
            text: `╭──〔 ⚠️ *𝙴𝚁𝚁𝙾𝚁 𝙾𝙲𝙲𝚄𝚁𝚁𝙴𝙳* 〕──
│
├─ 𝚂𝚘𝚖𝚎𝚝𝚑𝚒𝚗𝚐 𝚠𝚎𝚗𝚝 𝚠𝚛𝚘𝚗𝚐 𝚠𝚑𝚒𝚕𝚎 𝚙𝚛𝚘𝚌𝚎𝚜𝚜𝚒𝚗𝚐 𝚝𝚑𝚎 𝚕𝚒𝚗𝚔.
│
╰──〔 📥 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝙸𝙻𝙰 𝙼𝙳 〕──
> © Powered by Sila Tech`,
            contextInfo: getContextInfo({ sender: sender }, "𝐒𝐈𝐋𝐀 𝐌𝐃", "255789661031")
        }, { quoted: fkontak });
    }
});