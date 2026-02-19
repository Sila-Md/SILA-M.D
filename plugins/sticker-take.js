const { cmd } = require('../command');
const crypto = require('crypto');
const webp = require('node-webpmux');
const axios = require('axios');
const fs = require('fs-extra');
const { exec } = require('child_process');
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
const Config = require('../config');

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

// Take Sticker 
cmd(
    {
        pattern: 'take',
        alias: ['rename', 'stake'],
        desc: 'Create a sticker with a custom pack name.',
        category: 'sticker',
        use: '<reply media or URL>',
        filename: __filename,
    },
    async (conn, mek, m, { quoted, args, q, reply, from, sender }) => {
        try {
            if (!mek.quoted) {
                return await conn.sendMessage(from, { 
                    text: "*𝚁𝚎𝚙𝚕𝚢 𝚝𝚘 𝚊𝚗𝚢 𝚜𝚝𝚒𝚌𝚔𝚎𝚛.*\n\n> © Powered by Sila Tech", 
                    contextInfo: getContextInfo({ sender: sender })
                }, { quoted: fkontak });
            }
            
            if (!q) {
                return await conn.sendMessage(from, { 
                    text: "*𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝚙𝚊𝚌𝚔 𝚗𝚊𝚖𝚎 𝚞𝚜𝚒𝚗𝚐 .take <packname>*\n\n> © Powered by Sila Tech", 
                    contextInfo: getContextInfo({ sender: sender })
                }, { quoted: fkontak });
            }

            let mime = mek.quoted.mtype;
            let pack = q;

            if (mime === "imageMessage" || mime === "stickerMessage") {
                let media = await mek.quoted.download();
                let sticker = new Sticker(media, {
                    pack: pack, 
                    type: StickerTypes.FULL,
                    categories: ["🤩", "🎉"],
                    id: "12345",
                    quality: 75,
                    background: 'transparent',
                });
                const buffer = await sticker.toBuffer();
                return conn.sendMessage(mek.chat, { 
                    sticker: buffer,
                    contextInfo: getContextInfo({ sender: sender })
                }, { quoted: fkontak });
            } else {
                return await conn.sendMessage(from, { 
                    text: "*𝚄𝚑𝚑, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚛𝚎𝚙𝚕𝚢 𝚝𝚘 𝚊𝚗 𝚒𝚖𝚊𝚐𝚎.*\n\n> © Powered by Sila Tech", 
                    contextInfo: getContextInfo({ sender: sender })
                }, { quoted: fkontak });
            }
        } catch (error) {
            console.error("Take command error:", error);
            await conn.sendMessage(from, { 
                text: `❌ 𝙴𝚛𝚛𝚘𝚛: ${error.message}\n\n> © Powered by Sila Tech`, 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }
    }
);

// Sticker create 
cmd(
    {
        pattern: 'sticker',
        alias: ['s', 'stickergif'],
        desc: 'Create a sticker from an image, video, or URL.',
        category: 'sticker',
        use: '<reply media or URL>',
        filename: __filename,
    },
    async (conn, mek, m, { quoted, args, q, reply, from, sender }) => {
        try {
            if (!mek.quoted) {
                return await conn.sendMessage(from, { 
                    text: "*𝚁𝚎𝚙𝚕𝚢 𝚝𝚘 𝚊𝚗𝚢 𝙸𝚖𝚊𝚐𝚎 𝚘𝚛 𝚅𝚒𝚍𝚎𝚘.*\n\n> © Powered by Sila Tech", 
                    contextInfo: getContextInfo({ sender: sender })
                }, { quoted: fkontak });
            }
            
            let mime = mek.quoted.mtype;
            let pack = Config.STICKER_NAME || "𝚂𝙸𝙻𝙰 𝙼𝙳";
            
            if (mime === "imageMessage" || mime === "stickerMessage") {
                let media = await mek.quoted.download();
                let sticker = new Sticker(media, {
                    pack: pack, 
                    type: StickerTypes.FULL,
                    categories: ["🤩", "🎉"], 
                    id: "12345",
                    quality: 75, 
                    background: 'transparent',
                });
                const buffer = await sticker.toBuffer();
                return conn.sendMessage(mek.chat, { 
                    sticker: buffer,
                    contextInfo: getContextInfo({ sender: sender })
                }, { quoted: fkontak });
            } else {
                return await conn.sendMessage(from, { 
                    text: "*𝚄𝚑𝚑, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚛𝚎𝚙𝚕𝚢 𝚝𝚘 𝚊𝚗 𝚒𝚖𝚊𝚐𝚎.*\n\n> © Powered by Sila Tech", 
                    contextInfo: getContextInfo({ sender: sender })
                }, { quoted: fkontak });
            }
        } catch (error) {
            console.error("Sticker command error:", error);
            await conn.sendMessage(from, { 
                text: `❌ 𝙴𝚛𝚛𝚘𝚛: ${error.message}\n\n> © Powered by Sila Tech`, 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }
    }
);