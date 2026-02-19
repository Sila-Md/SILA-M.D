const config = require('../config');
const { cmd } = require('../command');

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

const stylizedChars = {
    a: '🅐', b: '🅑', c: '🅒', d: '🅓', e: '🅔', f: '🅕', g: '🅖',
    h: '🅗', i: '🅘', j: '🅙', k: '🅚', l: '🅛', m: '🅜', n: '🅝',
    o: '🅞', p: '🅟', q: '🅠', r: '🅡', s: '🅢', t: '🅣', u: '🅤',
    v: '🅥', w: '🅦', x: '🅧', y: '🅨', z: '🅩',
    '0': '⓿', '1': '➊', '2': '➋', '3': '➌', '4': '➍',
    '5': '➎', '6': '➏', '7': '➐', '8': '➑', '9': '➒'
};

cmd({
    pattern: "ch",
    alias: ["chreact"],
    react: "🔤",
    desc: "React to channel messages with stylized text",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, q, sender, isCreator }) => {
    try {
        const ownerName = "𝐒𝐈𝐋𝐀 𝐌𝐃";
        const formattedOwnerNumber = "255789661031";
        
        if (!isCreator) {
            return await conn.sendMessage(from, { 
                text: "🚫 *𝚃𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚒𝚜 𝚘𝚗𝚕𝚢 𝚊𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎 𝚝𝚘 𝚝𝚑𝚎 𝚋𝚘𝚝 𝚘𝚠𝚗𝚎𝚛.*\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });
        }
        
        if (!q) {
            return await conn.sendMessage(from, { 
                text: `╭━━〔 🔤 *𝙲𝙷𝙰𝙽𝙽𝙴𝙻 𝚁𝙴𝙰𝙲𝚃* 〕━━┈⊷
┃
┃ 📜 *𝚄𝚜𝚊𝚐𝚎:*
┃ ➸ .ch <𝚌𝚑𝚊𝚗𝚗𝚎𝚕-𝚕𝚒𝚗𝚔> <𝚝𝚎𝚡𝚝>
┃
┃ 💡 *𝙴𝚡𝚊𝚖𝚙𝚕𝚎:*
┃ ➸ .ch https://whatsapp.com/channel/123 hello
┃
╰──────────────┈⊷
> © Powered by Sila Tech`, 
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });
        }

        const [link, ...textParts] = q.split(' ');
        if (!link.includes("whatsapp.com/channel/")) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝙸𝚗𝚟𝚊𝚕𝚒𝚍 𝚌𝚑𝚊𝚗𝚗𝚎𝚕 𝚕𝚒𝚗𝚔 𝚏𝚘𝚛𝚖𝚊𝚝\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });
        }
        
        const inputText = textParts.join(' ').toLowerCase();
        if (!inputText) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚝𝚎𝚡𝚝 𝚝𝚘 𝚌𝚘𝚗𝚟𝚎𝚛𝚝\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });
        }

        const emoji = inputText
            .split('')
            .map(char => {
                if (char === ' ') return '―';
                return stylizedChars[char] || char;
            })
            .join('');

        const channelId = link.split('/')[4];
        const messageId = link.split('/')[5];
        
        if (!channelId || !messageId) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝙸𝚗𝚟𝚊𝚕𝚒𝚍 𝚕𝚒𝚗𝚔 - 𝚖𝚒𝚜𝚜𝚒𝚗𝚐 𝙸𝙳𝚜\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });
        }

        const channelMeta = await conn.newsletterMetadata("invite", channelId);
        await conn.newsletterReactMessage(channelMeta.id, messageId, emoji);

        await conn.sendMessage(from, { 
            text: `╭━━〔 ✅ *𝚂𝚄𝙲𝙲𝙴𝚂𝚂* 〕━━┈⊷
┃
┃ ▸ *𝚁𝚎𝚊𝚌𝚝𝚒𝚘𝚗 𝚂𝚎𝚗𝚝!*
┃ ▸ *𝙲𝚑𝚊𝚗𝚗𝚎𝚕:* ${channelMeta.name}
┃ ▸ *𝚁𝚎𝚊𝚌𝚝𝚒𝚘𝚗:* ${emoji}
┃
╰──────────────┈⊷
> © Powered by Sila Tech`, 
            contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
        }, { quoted: fkontak });
        
    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { 
            text: `❎ 𝙴𝚛𝚛𝚘𝚛: ${e.message || "𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚜𝚎𝚗𝚍 𝚛𝚎𝚊𝚌𝚝𝚒𝚘𝚗"}`, 
            contextInfo: getContextInfo({ sender: sender }, "𝐒𝐈𝐋𝐀 𝐌𝐃", "255789661031")
        }, { quoted: fkontak });
    }
});