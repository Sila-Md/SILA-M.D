const { cmd } = require('../command');
const { silainfo, myquoted } = require('../config');

//=========== JID COMMAND ===========//
cmd({
    pattern: "jid",
    alias: ["id", "getid"],
    desc: "Get JID/ID of user or group",
    category: "info",
    react: "🆔",
    filename: __filename
},
async (conn, mek, m, { from, sender, pushName, isGroup }) => {
    try {
        let targetJid, targetName, targetType, groupName;
        
        // Check if message is a reply
        if (mek.message?.extendedTextMessage?.contextInfo?.participant) {
            targetJid = mek.message.extendedTextMessage.contextInfo.participant;
            targetName = '𝐑𝐞𝐩𝐥𝐢𝐞𝐝 𝐔𝐬𝐞𝐫';
            targetType = '𝐔𝐬𝐞𝐫';
        }
        // Check if in group
        else if (from.endsWith('@g.us')) {
            targetJid = sender;
            targetName = pushName ? pushName : '𝐆𝐫𝐨𝐮𝐩 𝐌𝐞𝐦𝐛𝐞𝐫';
            targetType = '𝐆𝐫𝐨𝐮𝐩 𝐌𝐞𝐦𝐛𝐞𝐫';
            
            // Get group info
            try {
                const groupMetadata = await conn.groupMetadata(from);
                groupName = groupMetadata.subject;
            } catch (e) {
                groupName = '𝐔𝐧𝐤𝐧𝐨𝐰𝐧 𝐆𝐫𝐨𝐮𝐩';
            }
        }
        // Private chat
        else {
            targetJid = sender;
            targetName = pushName ? pushName : '𝐘𝐨𝐮';
            targetType = '𝐔𝐬𝐞𝐫';
        }

        // Remove @s.whatsapp.net for display
        const rawJid = targetJid.split('@')[0];
        
        // Create response with mchoro (info tu)
        let finalMessage = `
╭▸───────────────▸╮
│   「 𝐒𝐈𝐋𝐀 𝐌𝐃 𝐉𝐈𝐃 」   │
╰▸───────────────▸╯
`;

        // Add group info if available
        if (groupName) {
            finalMessage += `
╔► 𝐆𝐫𝐨𝐮𝐩 𝐈𝐧𝐟𝐨:
╚► → 𝐍𝐚𝐦𝐞: ${groupName}
╚► → 𝐈𝐃: ${from}
`;
        }

        finalMessage += `
╔► 𝐔𝐬𝐞𝐫 𝐈𝐧𝐟𝐨:
╚► → 𝐍𝐚𝐦𝐞: ${targetName}
╚► → 𝐓𝐲𝐩𝐞: ${targetType}
╚► → 𝐉𝐈𝐃: ${targetJid}

╔► 𝐄𝐱𝐭𝐫𝐚𝐜𝐭𝐞𝐝 𝐈𝐃:
╚► → ${rawJid}

╔► 𝐂𝐨𝐩𝐲 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬:
╚► → \`${targetJid}\`
╚► → \`${rawJid}\`

╭▸───────────────▸╮
│    — 𝐒𝐈𝐋𝐀 𝐓𝐄𝐂𝐇 —    │
╰▸───────────────▸╯`;

        // Send the message
        await conn.sendMessage(
            from,
            {
                text: finalMessage,
                ...silainfo()
            },
            { quoted: myquoted }
        );

    } catch (error) {
        console.error("JID command error:", error);
        
        // Send error message (BILA MCHORO)
        await conn.sendMessage(
            from,
            {
                text: `*❌ ERROR*\n\nFailed to get JID\n\n*Reason:* ${error.message || 'Unknown error'}`,
                ...silainfo()
            },
            { quoted: myquoted }
        );
    }
});