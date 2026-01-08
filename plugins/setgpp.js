const { cmd } = require('../command');
const config = require('../config');
const fs = require('fs');
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');

// Define fakevCard (same as owner command)
const fakevCard = {
    key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "status@broadcast"
    },
    message: {
        contactMessage: {
            displayName: "© SILA-MD",
            vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:SILA MD\nORG:SILA TECH;\nTEL;type=CELL;type=VOICE;waid=${config.OWNER_NUMBER.replace('+', '')}:${config.OWNER_NUMBER}\nEND:VCARD`
        }
    }
};

cmd({
    pattern: "setgpp",
    alias: ["setgrouppic", "setgrouppicture", "setgroupicon", "changepic"],
    react: "🖼️",
    desc: "Change group profile picture - Reply to an image",
    category: "group",
    filename: __filename
}, 
async (conn, mek, m, { from, reply, isGroup, sender, isAdmin, isBotAdmin }) => {
    try {
        // Check if it's a group
        if (!isGroup) {
            return await reply("*❌ This command can only be used in groups*");
        }

        const groupId = from;
        const quoted = mek.message.extendedTextMessage?.contextInfo?.quotedMessage;
        const hasMedia = mek.message?.imageMessage || quoted?.imageMessage;
        
        // Check bot admin status
        if (!isBotAdmin) {
            return await reply("*❌ I need to be an admin to change group picture*");
        }

        // Check user admin status
        if (!isAdmin) {
            return await reply("*❌ You must be an admin to use this command*");
        }

        // Check if there's media (image)
        if (!hasMedia) {
            const usage = `╔═══════════════════════
║   🖼️ *SET GROUP PICTURE*
╚═══════════════════════

┌─「 📝 DESCRIPTION 」━━━━━━━━━━━
│
│  Change group profile picture
│  by replying to an image
│
├─「 📌 USAGE 」━━━━━━━━━━━━━━━━
│
│  ${config.PREFIX}setgpp [reply to image]
│
├─「 ⚙️ REQUIREMENTS 」━━━━━━━━━━
│
│  ✓ Bot must be admin
│  ✓ User must be admin
│  ✓ Image must be provided
│  ✓ Image size < 5MB
│
└─「 💡 EXAMPLE 」━━━━━━━━━━━━━━
│
│  1. Send an image to group
│  2. Reply with: .setgpp
│
╰────────────────────────────

> © 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`;

            return await conn.sendMessage(from, {
                image: { url: 'https://files.catbox.moe/jwmx1j.jpg' },
                caption: usage,
                ...fakevCard,
                contextInfo: {
                    mentionedJid: [sender],
                    forwardingScore: 999,
                    isForwarded: true
                }
            }, { quoted: mek });
        }

        // Get the image message
        const imageMsg = mek.message?.imageMessage || quoted?.imageMessage;
        
        if (!imageMsg) {
            return await reply("*❌ Please provide an image*");
        }

        // Check image size (max 5MB)
        if (imageMsg.fileLength > 5 * 1024 * 1024) {
            return await reply("*❌ Image size should be less than 5MB*");
        }

        // Notify processing
        await reply("*🔄 Processing your image... Please wait*");

        try {
            // Download the image
            const stream = await downloadContentFromMessage(imageMsg, 'image');
            let buffer = Buffer.from([]);
            
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }

            // Convert buffer to base64
            const base64 = buffer.toString('base64');
            
            // Update group picture
            await conn.updateProfilePicture(groupId, base64);

            // Get group metadata
            const groupMetadata = await conn.groupMetadata(groupId);
            
            // Send success message
            const successMsg = `╔═══════════════════════
║   ✅ *GROUP PICTURE UPDATED*
╚═══════════════════════

┌─「 📊 DETAILS 」━━━━━━━━━━━━━━
│
│  *📌 Status:* Successfully Changed
│  *👤 Changed by:* @${sender.split('@')[0]}
│  *🏷️ Group:* ${groupMetadata.subject}
│  *👥 Members:* ${groupMetadata.participants.length}
│  *🕐 Time:* ${new Date().toLocaleTimeString()}
│
├─「 📸 PREVIEW 」━━━━━━━━━━━━━━
│
│  The new group picture has been
│  set successfully! Check the
│  group info to see the change.
│
└─「 ⚡ NEXT STEPS 」━━━━━━━━━━━━
│
│  ✓ Picture updated in group
│  ✓ Visible to all members
│  ✓ Refresh group info to view
│
╰────────────────────────────

> © 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`;

            await conn.sendMessage(from, {
                image: buffer,
                caption: successMsg,
                mentions: [sender],
                ...fakevCard,
                contextInfo: {
                    mentionedJid: [sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363402325089913@newsletter',
                        newsletterName: 'SILA MD',
                        serverMessageId: Math.floor(Math.random() * 1000)
                    }
                }
            }, { quoted: mek });

            // Send reaction
            await conn.sendMessage(from, {
                react: {
                    text: "✅",
                    key: mek.key
                }
            });

        } catch (updateError) {
            console.error('Error updating group picture:', updateError);
            
            if (updateError.message.includes('401') || updateError.message.includes('permission')) {
                await reply("*❌ Bot doesn't have permission to change group picture*");
            } else if (updateError.message.includes('404') || updateError.message.includes('not found')) {
                await reply("*❌ Group not found or bot is not in the group*");
            } else if (updateError.message.includes('500') || updateError.message.includes('server')) {
                await reply("*❌ WhatsApp server error. Please try again later*");
            } else if (updateError.message.includes('rate') || updateError.message.includes('limit')) {
                await reply("*❌ Rate limit exceeded. Please wait before trying again*");
            } else {
                const errorMsg = `╔═══════════════════════
║   ❌ *UPDATE FAILED*
╚═══════════════════════

┌─「 🚨 ERROR DETAILS 」━━━━━━━━
│
│  *Error:* ${updateError.message}
│  *Time:* ${new Date().toLocaleTimeString()}
│
├─「 🔧 TROUBLESHOOTING 」━━━━━
│
│  1. Check bot admin status
│  2. Verify image format
│  3. Ensure image < 5MB
│  4. Try again in 5 minutes
│
└─「 📞 SUPPORT 」━━━━━━━━━━━━━
│
│  Contact: ${config.OWNER_NAME}
│  Number: ${config.OWNER_NUMBER}
│
╰────────────────────────────

> © 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`;
                
                await reply(errorMsg);
            }
        }

    } catch (error) {
        console.error('Error in setgpp command:', error);
        
        const errorMsg = `*❌ Command Error:* ${error.message}

_Check if:_
✓ You're in a group
✓ Bot is admin
✓ You're admin
✓ Image is provided

> © 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`;
        
        await reply(errorMsg);
    }
});
