const { cmd } = require('../command');
const fs = require('fs');
const path = require('path');

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

// Command to post status in group
cmd({
    pattern: "poststatus",
    alias: ["post", "announce", "broadcastgroup"],
    desc: "Post a message as status to all groups (Owner only)",
    category: "owner",
    react: "📢",
    filename: __filename
},
async (conn, mek, m, { from, args, q, isOwner, sender, reply }) => {
    try {
        // Owner check
        if (!isOwner) {
            return await conn.sendMessage(from, { 
                text: "🚫 *𝚃𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚒𝚜 𝚘𝚗𝚕𝚢 𝚊𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎 𝚝𝚘 𝚝𝚑𝚎 𝚋𝚘𝚝 𝚘𝚠𝚗𝚎𝚛.*\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        if (!q) {
            return await conn.sendMessage(from, { 
                text: "📢 *𝚄𝚜𝚊𝚐𝚎:* .poststatus <𝚖𝚎𝚜𝚜𝚊𝚐𝚎>\n\n𝙴𝚡𝚊𝚖𝚙𝚕𝚎: .poststatus 𝙷𝚎𝚕𝚕𝚘 𝚎𝚟𝚎𝚛𝚢𝚘𝚗𝚎!\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        // Send confirmation
        const { key } = await conn.sendMessage(from, { 
            text: "📤 *𝙿𝚘𝚜𝚝𝚒𝚗𝚐 𝚜𝚝𝚊𝚝𝚞𝚜 𝚝𝚘 𝚊𝚕𝚕 𝚐𝚛𝚘𝚞𝚙𝚜...*",
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });

        // Get all chats
        const chats = conn.chats?.all() || [];
        const groups = chats.filter(chat => chat.id.endsWith('@g.us'));
        
        let sentCount = 0;
        let failedCount = 0;

        // Message to post
        const statusMessage = `📢 *𝙶𝚁𝙾𝚄𝙿 𝙰𝙽𝙽𝙾𝚄𝙽𝙲𝙴𝙼𝙴𝙽𝚃*\n\n${q}\n\n> © Powered by Sila Tech`;

        // Post to each group
        for (const group of groups) {
            try {
                await conn.sendMessage(group.id, {
                    text: statusMessage,
                    contextInfo: getContextInfo({ sender: sender })
                }, { quoted: fkontak });
                sentCount++;
                
                // Small delay to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 1000));
                
            } catch (err) {
                console.error(`Failed to post to ${group.id}:`, err);
                failedCount++;
            }
        }

        // Update status
        const resultText = `✅ *𝚂𝚝𝚊𝚝𝚞𝚜 𝙿𝚘𝚜𝚝𝚒𝚗𝚐 𝙲𝚘𝚖𝚙𝚕𝚎𝚝𝚎*\n\n📤 𝚂𝚎𝚗𝚝: ${sentCount} 𝚐𝚛𝚘𝚞𝚙𝚜\n❌ 𝙵𝚊𝚒𝚕𝚎𝚍: ${failedCount} 𝚐𝚛𝚘𝚞𝚙𝚜\n\n> © Powered by Sila Tech`;
        
        await conn.sendMessage(from, { 
            text: resultText,
            edit: key,
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });

    } catch (error) {
        console.error("Post Status Error:", error);
        await conn.sendMessage(from, { 
            text: `❌ 𝙴𝚛𝚛𝚘𝚛: ${error.message}\n\n> © Powered by Sila Tech`, 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }
});

// Command to post status with image/video
cmd({
    pattern: "postmedia",
    alias: ["postimg", "postvideo"],
    desc: "Post media as status to all groups (Owner only)",
    category: "owner",
    react: "📸",
    filename: __filename
},
async (conn, mek, m, { from, args, q, isOwner, sender, reply, quoted }) => {
    try {
        // Owner check
        if (!isOwner) {
            return await conn.sendMessage(from, { 
                text: "🚫 *𝚃𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚒𝚜 𝚘𝚗𝚕𝚢 𝚊𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎 𝚝𝚘 𝚝𝚑𝚎 𝚋𝚘𝚝 𝚘𝚠𝚗𝚎𝚛.*\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        // Check if there's a quoted media
        if (!mek.quoted) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚛𝚎𝚙𝚕𝚢 𝚝𝚘 𝚊𝚗 𝚒𝚖𝚊𝚐𝚎 𝚘𝚛 𝚟𝚒𝚍𝚎𝚘 𝚝𝚘 𝚙𝚘𝚜𝚝.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        const mime = mek.quoted.mtype;
        const isImage = mime === "imageMessage";
        const isVideo = mime === "videoMessage";

        if (!isImage && !isVideo) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚛𝚎𝚙𝚕𝚢 𝚝𝚘 𝚊𝚗 𝚒𝚖𝚊𝚐𝚎 𝚘𝚛 𝚟𝚒𝚍𝚎𝚘 𝚘𝚗𝚕𝚢.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        // Download media
        const mediaBuffer = await mek.quoted.download();
        const caption = q || "📢 *𝙶𝚁𝙾𝚄𝙿 𝙰𝙽𝙽𝙾𝚄𝙽𝙲𝙴𝙼𝙴𝙽𝚃*";

        // Send confirmation
        const { key } = await conn.sendMessage(from, { 
            text: "📤 *𝙿𝚘𝚜𝚝𝚒𝚗𝚐 𝚖𝚎𝚍𝚒𝚊 𝚝𝚘 𝚊𝚕𝚕 𝚐𝚛𝚘𝚞𝚙𝚜...*",
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });

        // Get all chats
        const chats = conn.chats?.all() || [];
        const groups = chats.filter(chat => chat.id.endsWith('@g.us'));
        
        let sentCount = 0;
        let failedCount = 0;

        // Post to each group
        for (const group of groups) {
            try {
                if (isImage) {
                    await conn.sendMessage(group.id, {
                        image: mediaBuffer,
                        caption: `${caption}\n\n> © Powered by Sila Tech`,
                        contextInfo: getContextInfo({ sender: sender })
                    }, { quoted: fkontak });
                } else {
                    await conn.sendMessage(group.id, {
                        video: mediaBuffer,
                        caption: `${caption}\n\n> © Powered by Sila Tech`,
                        contextInfo: getContextInfo({ sender: sender })
                    }, { quoted: fkontak });
                }
                sentCount++;
                
                // Small delay to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 1500));
                
            } catch (err) {
                console.error(`Failed to post to ${group.id}:`, err);
                failedCount++;
            }
        }

        // Update status
        const resultText = `✅ *𝙼𝚎𝚍𝚒𝚊 𝙿𝚘𝚜𝚝𝚒𝚗𝚐 𝙲𝚘𝚖𝚙𝚕𝚎𝚝𝚎*\n\n📤 𝚂𝚎𝚗𝚝: ${sentCount} 𝚐𝚛𝚘𝚞𝚙𝚜\n❌ 𝙵𝚊𝚒𝚕𝚎𝚍: ${failedCount} 𝚐𝚛𝚘𝚞𝚙𝚜\n\n> © Powered by Sila Tech`;
        
        await conn.sendMessage(from, { 
            text: resultText,
            edit: key,
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });

    } catch (error) {
        console.error("Post Media Error:", error);
        await conn.sendMessage(from, { 
            text: `❌ 𝙴𝚛𝚛𝚘𝚛: ${error.message}\n\n> © Powered by Sila Tech`, 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }
});