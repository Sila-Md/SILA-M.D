const fs = require('fs');
const config = require('../config');
const { cmd, commands } = require('../command');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions');

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

//vcf//
cmd({
    pattern: 'savecontact',
    alias: ["vcf","scontact","savecontacts"],
    desc: 'gc vcard',
    category: 'tools',
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝚃𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚒𝚜 𝚏𝚘𝚛 𝚐𝚛𝚘𝚞𝚙𝚜 𝚘𝚗𝚕𝚢.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }
        
        if (!isOwner) {
            return await conn.sendMessage(from, { 
                text: "🚫 *𝚃𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚒𝚜 𝚏𝚘𝚛 𝚝𝚑𝚎 𝚘𝚠𝚗𝚎𝚛 𝚘𝚗𝚕𝚢*\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        let card = quoted || m;
        let cmiggc = groupMetadata;
        const { participants } = groupMetadata;
        
        let orgiggc = participants.map(a => a.id);
        let vcard = '';
        let noPort = 0;
        
        for (let a of cmiggc.participants) {
            vcard += `BEGIN:VCARD\nVERSION:3.0\nFN:[${noPort++}] +${a.id.split("@")[0]}\nTEL;type=CELL;type=VOICE;waid=${a.id.split("@")[0]}:+${a.id.split("@")[0]}\nEND:VCARD\n`;
        }

        let nmfilect = './contacts.vcf';
        
        await conn.sendMessage(from, { 
            text: '𝚂𝚊𝚟𝚒𝚗𝚐 ' + cmiggc.participants.length + ' 𝚙𝚊𝚛𝚝𝚒𝚌𝚒𝚙𝚊𝚗𝚝𝚜 𝚌𝚘𝚗𝚝𝚊𝚌𝚝',
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });

        fs.writeFileSync(nmfilect, vcard.trim());
        await sleep(2000);

        await conn.sendMessage(from, {
            document: fs.readFileSync(nmfilect), 
            mimetype: 'text/vcard', 
            fileName: 'sila_md.vcf', 
            caption: `╭━━〔 📇 *𝙲𝙾𝙽𝚃𝙰𝙲𝚃𝚂 𝚂𝙰𝚅𝙴𝙳* 〕━━┈⊷
┃
┃ 𝙶𝚛𝚘𝚞𝚙 𝙽𝚊𝚖𝚎: *${cmiggc.subject}*
┃ 𝙲𝚘𝚗𝚝𝚊𝚌𝚝𝚜: *${cmiggc.participants.length}*
┃
╰━━━━━━━━━━━━━━━━━━┈⊷
> © Powered by Sila Tech`,
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });

        fs.unlinkSync(nmfilect); // Cleanup the file after sending
        
    } catch (err) {
        console.error("Savecontact error:", err);
        await conn.sendMessage(from, { 
            text: err.toString(),
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }
});