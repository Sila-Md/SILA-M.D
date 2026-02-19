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
    pattern: "xx",
    alias: ["delete", "del", "remove"],
    react: "🗑️",
    desc: "Delete quoted message and command message (Owner only)",
    category: "owner",
    filename: __filename
}, async (conn, mek, m, { from, quoted, isOwner, sender }) => {
    try {
        const ownerName = "𝐒𝐈𝐋𝐀 𝐌𝐃";
        const formattedOwnerNumber = "255789661031";
        
        if (!isOwner) {
            return await conn.sendMessage(from, { 
                text: "🚫 *𝚃𝚑𝚒𝚜 𝚒𝚜 𝚊𝚗 𝚘𝚠𝚗𝚎𝚛-𝚘𝚗𝚕𝚢 𝚌𝚘𝚖𝚖𝚊𝚗𝚍*\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });
        }
        
        if (!quoted) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚛𝚎𝚙𝚕𝚢 𝚝𝚘 𝚝𝚑𝚎 𝚖𝚎𝚜𝚜𝚊𝚐𝚎 𝚢𝚘𝚞 𝚠𝚊𝚗𝚝 𝚝𝚘 𝚍𝚎𝚕𝚎𝚝𝚎\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });
        }

        let successCount = 0;

        // Delete command message
        try {
            await conn.sendMessage(from, {
                delete: {
                    id: mek.key.id,
                    remoteJid: from,
                    fromMe: true
                }
            });
            successCount++;
        } catch (e) {
            console.log('Command delete failed:', e.message);
        }

        // Delete quoted message if from bot
        if (quoted.key.fromMe) {
            try {
                await conn.sendMessage(from, {
                    delete: {
                        id: quoted.key.id,
                        remoteJid: from,
                        fromMe: true
                    }
                });
                successCount++;
            } catch (e) {
                console.log('Quoted delete failed:', e.message);
            }
        } else {
            // If quoted message not from bot, edit it
            try {
                await conn.sendMessage(from, {
                    text: "🗑️ *𝙼𝚎𝚜𝚜𝚊𝚐𝚎 𝚌𝚕𝚎𝚊𝚛𝚎𝚍 𝚋𝚢 𝚊𝚍𝚖𝚒𝚗*",
                    edit: quoted.key
                });
                successCount++;
            } catch (editError) {
                console.log('Edit method failed:', editError.message);
            }
        }

        // Send temporary feedback
        if (successCount > 0) {
            const feedback = await conn.sendMessage(from, { 
                text: `🗑️ 𝙲𝚕𝚎𝚊𝚛𝚎𝚍 ${successCount} 𝚖𝚎𝚜𝚜𝚊𝚐𝚎(𝚜)`, 
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });
            
            setTimeout(async () => {
                try {
                    await conn.sendMessage(from, {
                        delete: {
                            id: feedback.key.id,
                            remoteJid: from,
                            fromMe: true
                        }
                    });
                } catch (e) {}
            }, 1500);
        } else {
            await conn.sendMessage(from, { 
                text: "❌ 𝙽𝚘 𝚖𝚎𝚜𝚜𝚊𝚐𝚎𝚜 𝚌𝚘𝚞𝚕𝚍 𝚋𝚎 𝚌𝚕𝚎𝚊𝚛𝚎𝚍\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender }, ownerName, formattedOwnerNumber)
            }, { quoted: fkontak });
        }

    } catch (error) {
        console.error('Delete command error:', error);
        await conn.sendMessage(from, { 
            text: "❌ 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚙𝚛𝚘𝚌𝚎𝚜𝚜 𝚍𝚎𝚕𝚎𝚝𝚎 𝚌𝚘𝚖𝚖𝚊𝚗𝚍\n\n> © Powered by Sila Tech", 
            contextInfo: getContextInfo({ sender: sender }, "𝐒𝐈𝐋𝐀 𝐌𝐃", "255789661031")
        }, { quoted: fkontak });
    }
});