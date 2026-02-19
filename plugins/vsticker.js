const path = require("path");
const { fetchGif, fetchImage, gifToSticker } = require('../lib/sticker-utils');
const { tmpdir } = require("os");
const fetch = require("node-fetch");
const Crypto = require("crypto");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require("../lib/functions");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const { cmd } = require('../command');
const { videoToWebp } = require('../lib/video-utils');
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
const config = require("../config");

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

cmd(
  {
    pattern: 'vsticker',
    alias: ['gsticker', 'g2s', 'gs', 'v2s', 'vs',],
    desc: 'Convert GIF/Video to a sticker.',
    category: 'sticker',
    use: '<reply media or URL>',
    filename: __filename,
  },
  async (conn, mek, m, { quoted, args, reply, from, sender }) => {
    try {
      if (!mek.quoted) {
        return await conn.sendMessage(from, { 
          text: '*𝚁𝚎𝚙𝚕𝚢 𝚝𝚘 𝚊 𝚟𝚒𝚍𝚎𝚘 𝚘𝚛 𝙶𝙸𝙵 𝚝𝚘 𝚌𝚘𝚗𝚟𝚎𝚛𝚝 𝚒𝚝 𝚝𝚘 𝚊 𝚜𝚝𝚒𝚌𝚔𝚎𝚛!*\n\n> © Powered by Sila Tech', 
          contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
      }

      const mime = mek.quoted.mtype;
      if (!['videoMessage', 'imageMessage'].includes(mime)) {
        return await conn.sendMessage(from, { 
          text: '*𝙿𝚕𝚎𝚊𝚜𝚎 𝚛𝚎𝚙𝚕𝚢 𝚝𝚘 𝚊 𝚟𝚊𝚕𝚒𝚍 𝚟𝚒𝚍𝚎𝚘 𝚘𝚛 𝙶𝙸𝙵.*\n\n> © Powered by Sila Tech', 
          contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
      }

      // Download the media file
      const media = await mek.quoted.download();

      // Convert the video to a WebP buffer
      const webpBuffer = await videoToWebp(media);

      // Generate sticker metadata
      const sticker = new Sticker(webpBuffer, {
        pack: config.STICKER_NAME || '𝚂𝙸𝙻𝙰 𝙼𝙳',
        author: '𝚂𝙸𝙻𝙰 𝙼𝙳', 
        type: StickerTypes.FULL,
        categories: ['🤩', '🎉'],
        id: '12345',
        quality: 75,
        background: 'transparent',
      });

      // Convert sticker to buffer and send
      const stickerBuffer = await sticker.toBuffer();
      return conn.sendMessage(mek.chat, { 
        sticker: stickerBuffer,
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
      
    } catch (error) {
      console.error(error);
      await conn.sendMessage(from, { 
        text: `❌ 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚛𝚎𝚍: ${error.message}\n\n> © Powered by Sila Tech`, 
        contextInfo: getContextInfo({ sender: sender })
      }, { quoted: fkontak });
    }
  }
);