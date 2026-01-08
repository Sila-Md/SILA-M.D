const { cmd } = require('../command');
const { silainfo, myquoted } = require('../config');

cmd({
    pattern: "delete",
    alias: ["del", "remove"],
    desc: "Delete bot's message",
    category: "group",
    react: "🗑️",
    filename: __filename
},
async (conn, mek, m, { from, reply, isAdmin, isBotAdmin }) => {
    try {
        if (!from.endsWith('@g.us')) {
            return await reply("*❌ 𝐄𝐑𝐑𝐎𝐑*\n\n𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐨𝐧𝐥𝐲 𝐰𝐨𝐫𝐤𝐬 𝐢𝐧 𝐠𝐫𝐨𝐮𝐩𝐬");
        }
        
        if (!isAdmin && !isBotAdmin) {
            return await reply("*❌ 𝐄𝐑𝐑𝐎𝐑*\n\n𝐘𝐨𝐮 𝐧𝐞𝐞𝐝 𝐭𝐨 𝐛𝐞 𝐚𝐝𝐦𝐢𝐧 𝐭𝐨 𝐮𝐬𝐞 𝐭𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝");
        }
        
        if (!mek.message?.extendedTextMessage?.contextInfo?.stanzaId) {
            return await reply("*❌ 𝐄𝐑𝐑𝐎𝐑*\n\n𝐏𝐥𝐞𝐚𝐬𝐞 𝐫𝐞𝐩𝐥𝐲 𝐭𝐨 𝐭𝐡𝐞 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐲𝐨𝐮 𝐰𝐚𝐧𝐭 𝐭𝐨 𝐝𝐞𝐥𝐞𝐭𝐞");
        }
        
        const msgId = mek.message.extendedTextMessage.contextInfo.stanzaId;
        await conn.sendMessage(from, { delete: msgId });
        
        await conn.sendMessage(
            from,
            {
                text: `
╚► → 𝐌𝐞𝐬𝐬𝐚𝐠𝐞 𝐝𝐞𝐥𝐞𝐭𝐞𝐝 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲
`,
                ...silainfo()
            },
            { quoted: myquoted }
        );
        
    } catch (error) {
        console.error("Delete error:", error);
        await reply(`*❌ 𝐄𝐑𝐑𝐎𝐑*\n\n𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐝𝐞𝐥𝐞𝐭𝐞 𝐦𝐞𝐬𝐬𝐚𝐠𝐞\n\n*𝐑𝐞𝐚𝐬𝐨𝐧:* ${error.message}`);
    }
});