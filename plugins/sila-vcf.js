const { cmd } = require('../command');
const config = require('../config');
const fs = require('fs');
const path = require('path');

// Define fakevCard
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
    pattern: "vcards",
    alias: ["exportcontacts", "groupcontacts", "savecontacts", "vcf"],
    react: "📇",
    desc: "Export all group contacts to VCF file - Download and save to phone",
    category: "group",
    filename: __filename
}, 
async (conn, mek, m, { from, reply, isGroup, sender }) => {
    try {
        // Check if it's a group
        if (!isGroup) {
            return await reply("*❌ This command can only be used in groups*");
        }

        const groupId = from;
        
        // Get group metadata
        const groupMetadata = await conn.groupMetadata(groupId);
        const participants = groupMetadata.participants;
        
        if (!participants || participants.length === 0) {
            return await reply("*❌ No members found in this group*");
        }

        // Notify processing
        await reply(`*🔄 Processing ${participants.length} contacts... Please wait*`);

        // Create VCF content
        let vcfContent = '';
        let contactCount = 0;
        
        // Add each participant to VCF
        participants.forEach((participant, index) => {
            const phoneNumber = participant.id.split('@')[0];
            
            // Only add if it's a valid phone number (not bot)
            if (phoneNumber && phoneNumber.length >= 9) {
                // Get participant name (use id if no pushname)
                const participantName = participant.notify || participant.name || `Member_${index + 1}`;
                
                // Create vCard entry
                vcfContent += `BEGIN:VCARD\n`;
                vcfContent += `VERSION:3.0\n`;
                vcfContent += `FN:${participantName}\n`;
                vcfContent += `ORG:${groupMetadata.subject || 'WhatsApp Group'};\n`;
                vcfContent += `TEL;type=CELL;type=VOICE;waid=${phoneNumber}:+${phoneNumber}\n`;
                vcfContent += `ITEM1.TEL:+${phoneNumber}\n`;
                vcfContent += `ITEM1.X-ABLabel:WhatsApp\n`;
                vcfContent += `X-WA-GROUP:${groupMetadata.subject || 'Unknown'}\n`;
                vcfContent += `NOTE:Exported from ${groupMetadata.subject || 'WhatsApp Group'} via SILA-MD\n`;
                vcfContent += `END:VCARD\n\n`;
                
                contactCount++;
            }
        });

        if (contactCount === 0) {
            return await reply("*❌ No valid phone numbers found to export*");
        }

        // Add header info
        const header = `# SILA-MD Group Contacts Export
# Group: ${groupMetadata.subject}
# Total Members: ${participants.length}
# Exported Contacts: ${contactCount}
# Date: ${new Date().toLocaleString()}
# Exported by: @${sender.split('@')[0]}
# Powered by: SILA TECH\n\n`;

        const finalVcf = header + vcfContent;

        // Create temporary file
        const tempDir = './temp';
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        const fileName = `SILA-Group-Contacts-${Date.now()}.vcf`;
        const filePath = path.join(tempDir, fileName);
        
        fs.writeFileSync(filePath, finalVcf, 'utf8');

        // Send information message first
        const infoMsg = `╔═══════════════════════
║   📇 *GROUP CONTACTS EXPORT*
╚═══════════════════════

┌─「 📊 GROUP INFO 」━━━━━━━━━━━
│
│  *🏷️ Group:* ${groupMetadata.subject}
│  *👥 Total Members:* ${participants.length}
│  *📞 Exported Contacts:* ${contactCount}
│  *👤 Exported by:* @${sender.split('@')[0]}
│  *📅 Date:* ${new Date().toLocaleDateString()}
│
├─「 📱 HOW TO USE VCF 」━━━━━━━━
│
│  1. Download the VCF file below
│  2. Open Downloads/File Manager
│  3. Tap on the .vcf file
│  4. Select "Import to Contacts"
│  5. Choose "Save to Phone"
│  6. All contacts will be added
│
├─「 ⚡ FEATURES 」━━━━━━━━━━━━━━
│
│  ✓ All group members included
│  ✓ WhatsApp numbers saved
│  ✓ Group name in organization
│  ✓ Easy one-click import
│
└─「 💡 TIPS 」━━━━━━━━━━━━━━━━━
│
│  • Backup contacts first
│  • Check duplicates after import
│  • File will auto-delete in 24h
│
╰────────────────────────────

> © 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`;

        await conn.sendMessage(from, {
            text: infoMsg,
            mentions: [sender],
            ...fakevCard,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true
            }
        }, { quoted: mek });

        // Send the VCF file
        await conn.sendMessage(from, {
            document: fs.readFileSync(filePath),
            fileName: fileName,
            mimetype: 'text/vcard',
            caption: `📇 *Group Contacts Export*\n\n🏷️ *Group:* ${groupMetadata.subject}\n📞 *Contacts:* ${contactCount}\n📁 *File:* ${fileName}\n\n*Instructions:* Download and tap to import all contacts to your phone.\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`
        }, { quoted: mek });

        // Send preview of first 5 contacts
        let previewText = `📋 *CONTACTS PREVIEW (First 5):*\n\n`;
        participants.slice(0, 5).forEach((participant, index) => {
            const phoneNumber = participant.id.split('@')[0];
            const name = participant.notify || participant.name || `Member ${index + 1}`;
            previewText += `${index + 1}. *${name}*: +${phoneNumber}\n`;
        });
        
        if (participants.length > 5) {
            previewText += `\n...and ${participants.length - 5} more contacts in the VCF file.`;
        }

        await conn.sendMessage(from, {
            text: previewText,
            ...fakevCard,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true
            }
        }, { quoted: mek });

        // Clean up temp file after sending
        setTimeout(() => {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }, 30000); // Delete after 30 seconds

        // Send reaction
        await conn.sendMessage(from, {
            react: {
                text: "✅",
                key: mek.key
            }
        });

    } catch (error) {
        console.error('Error in vcards command:', error);
        
        const errorMsg = `╔═══════════════════════
║   ❌ *EXPORT FAILED*
╚═══════════════════════

┌─「 🚨 ERROR DETAILS 」━━━━━━━━
│
│  *Error:* ${error.message}
│  *Time:* ${new Date().toLocaleTimeString()}
│
├─「 🔧 TROUBLESHOOTING 」━━━━━
│
│  1. Check group permissions
│  2. Ensure bot is in group
│  3. Try again in 2 minutes
│  4. Contact support if persists
│
└─「 📞 SUPPORT 」━━━━━━━━━━━━━
│
│  ${config.OWNER_NAME}
│  ${config.OWNER_NUMBER}
│
╰────────────────────────────

> © 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`;
        
        await reply(errorMsg);
    }
});

// Additional command for quick export
cmd({
    pattern: "export",
    alias: ["savecontacts"],
    react: "💾",
    desc: "Quick export group contacts",
    category: "group",
    filename: __filename
}, 
async (conn, mek, m, { from, reply, isGroup }) => {
    if (!isGroup) {
        return await reply("*❌ Use this command in a group only*\n\nUse: .vcards for detailed export");
    }
    
    // Just show quick instructions
    await reply(`📲 *Quick Contacts Export*\n\nUse *${config.PREFIX}vcards* to export all group contacts to VCF file.\n\nFile can be directly imported to your phone contacts.\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);
});
