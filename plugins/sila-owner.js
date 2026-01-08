const { cmd } = require('../command');
const config = require('../config');

// Define fakevCard
const fakevCard = {
    key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "status@broadcast"
    },
    message: {
        contactMessage: {
            displayName: "© SILA AI 🎅",
            vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:SILA AI CHRISTMAS\nORG:SILA AI;\nTEL;type=CELL;type=VOICE;waid=255612491554:+255612491554\nEND:VCARD`
        }
    }
};

cmd({
    pattern: "owner",
    alias: ["creator", "dev", "developer"],
    react: "👑", 
    desc: "Get owner contact details",
    category: "main",
    filename: __filename
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        const ownerNumber = config.OWNER_NUMBER;
        const ownerName = config.OWNER_NAME;
        
        // Check if owner number exists
        if (!ownerNumber) {
            await reply("*❌ Owner number not configured*");
            return;
        }

        // Create vCard for real contact
        const vcard = 'BEGIN:VCARD\n' +
                      'VERSION:3.0\n' +
                      `FN:${ownerName}\n` +  
                      `ORG:SILA TECH;\n` +
                      `TEL;type=CELL;type=VOICE;waid=${ownerNumber.replace('+', '')}:${ownerNumber}\n` + 
                      'END:VCARD';

        // Send real contact vCard
        await conn.sendMessage(from, {
            contacts: {
                displayName: ownerName,
                contacts: [{ vcard }]
            }
        });

        // Send owner info with image
        const ownerInfo = `╔═══════════════════════
║  *𝚂𝙸𝙻𝙰 𝙼𝙳 𝙾𝚆𝙽𝙴𝚁*
╚═══════════════════════

┌─「 𝙾𝚆𝙽𝙴𝚁 𝙳𝙴𝚃𝙰𝙸𝙻𝚂 」━━━━━━━━━━
│ 
│  *👑 Name:* ${ownerName}
│  *📞 Number:* ${ownerNumber}
│  *🏢 Organization:* SILA TECH
│  *📊 Bot Version:* 3.0.0 Premium
│  *⚡ Status:* Available
│ 
└────────────────────

┌─「 𝙲𝙾𝙽𝚃𝙰𝙲𝚃 𝙸𝙽𝙵𝙾 」━━━━━━━━━━━━
│ 
│  *💬 WhatsApp:* wa.me/${ownerNumber.replace('+', '')}
│  *📢 Channel:* https://whatsapp.com/channel/0029VbBG4gfISTkCpKxyMH02
│  *💻 GitHub:* https://github.com/Sila-Md
│ 
└────────────────────

*📩 Need Help?* Contact the owner directly or join our support group.

*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`;

        await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/jwmx1j.jpg' },
            caption: ownerInfo,
            ...fakevCard,
            contextInfo: {
                mentionedJid: [`${ownerNumber.replace('+', '')}@s.whatsapp.net`],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402325089913@newsletter',
                    newsletterName: 'SILA MD',
                    serverMessageId: 150
                }            
            }
        }, { quoted: mek });

        // Send audio if available
        try {
            await conn.sendMessage(from, {
                audio: { 
                    url: 'https://files.catbox.moe/zwkdda.mp3' 
                },
                mimetype: 'audio/mpeg',
                ptt: false
            }, { quoted: mek });
        } catch (audioError) {
            console.log('Audio not sent:', audioError.message);
        }

    } catch (error) {
        console.error('Error in owner command:', error);
        reply(`*❌ Error:* ${error.message}`);
    }
});
