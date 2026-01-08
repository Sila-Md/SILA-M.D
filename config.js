const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

const config = {
    SESSION_ID: process.env.SESSION_ID || "POPKID;;;fEFjEKzZ#FxcwFHsguBK-mbJSA4CAm6lS0Xrd8pN-IL3Qtq1DvIg",
    AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || "true",
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false",
    AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "true",
    AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*JUST FOLLOW MAIN==https://whatsapp.com/channel/0029VbBG4gfISTkCpKxyMH02 > https://chat.whatsapp.com/IdGNaKt80DEBqirc2ek4ks*",
    PREFIX: process.env.PREFIX || ".",
    BOT_NAME: process.env.BOT_NAME || "SILA-MD",
    STICKER_NAME: process.env.STICKER_NAME || "SILA-MD",
    CUSTOM_REACT: process.env.CUSTOM_REACT || "false",
    CUSTOM_REACT_EMOJIS: process.env.CUSTOM_REACT_EMOJIS || "💝,💖,💗,❤️‍🩹,❤️,🧡,💛,💚,💙,💜,🤎,🖤,🤍",
    DELETE_LINKS: process.env.DELETE_LINKS || "false",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "255789661031",
    OWNER_NAME: process.env.OWNER_NAME || "SILA WHISPER",
    DESCRIPTION: process.env.DESCRIPTION || "*© 𝐏𝐎𝐖𝐄𝐃 𝐁𝐘 𝐒𝐈𝐋𝐀 𝐓𝐄𝐂𝐇*",
    ALIVE_IMG: process.env.ALIVE_IMG || "https://files.catbox.moe/277zt9.jpg",
    LIVE_MSG: process.env.LIVE_MSG || "> HELLO I'AM *SILA WHISPER*🌝",
    READ_MESSAGE: process.env.READ_MESSAGE || "false",
    AUTO_REACT: process.env.AUTO_REACT || "false",
    ANTI_BAD: process.env.ANTI_BAD || "false",
    MODE: process.env.MODE || "public",
    ANTI_LINK: process.env.ANTI_LINK || "false",
    AUTO_VOICE: process.env.AUTO_VOICE || "false",
    AUTO_STICKER: process.env.AUTO_STICKER || "false",
    AUTO_REPLY: process.env.AUTO_REPLY || "false",
    ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "false",
    PUBLIC_MODE: process.env.PUBLIC_MODE || "true",
    AUTO_TYPING: process.env.AUTO_TYPING || "true",
    READ_CMD: process.env.READ_CMD || "false",
    DEV: process.env.DEV || "255789661031",
    ANTI_VV: process.env.ANTI_VV || "true",
    ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "inbox",
    AUTO_RECORDING: process.env.AUTO_RECORDING || "false",
    
    // Add images array for random selection
    BOT_IMAGES: [
        "https://files.catbox.moe/277zt9.jpg",
        "https://files.catbox.moe/277zt9.jpg",
        "https://files.catbox.moe/277zt9.jpg"
    ]
};

// SILAINFO function (not attached to config)
const silainfo = () => {
    const randomImage = config.BOT_IMAGES[Math.floor(Math.random() * config.BOT_IMAGES.length)];
    return {
        contextInfo: {
            externalAdReply: {
                title: '© Sila Tech',
                body: 'WhatsApp ‧ Verified',
                thumbnailUrl: randomImage,
                thumbnailWidth: 64,
                thumbnailHeight: 64,
                sourceUrl: 'https://whatsapp.com/channel/0029VbBG4gfISTkCpKxyMH02',
                mediaUrl: randomImage,
                showAdAttribution: true,
                renderLargerThumbnail: false,
                previewType: 'PHOTO',
                mediaType: 1
            },
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363402325089913@newsletter',
                newsletterName: '© Sila Tech',
                serverMessageId: Math.floor(Math.random() * 1000000)
            },
            isForwarded: true,
            forwardingScore: 999
        }
    };
};

// MYQUOTED object replaced with fakevCard
const fakevCard = {
    key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "status@broadcast"
    },
    message: {
        contactMessage: {
            displayName: "© SILA MD",
            vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:SILA-MD\nORG:SILA TECH;\nTEL;type=CELL;type=VOICE;waid=255612491554:+255612491554\nEND:VCARD`
        }
    }
};

module.exports = config;

// Export silainfo and fakevCard separately
module.exports.silainfo = silainfo;
module.exports.fakevCard = fakevCard;
