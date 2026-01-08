const { cmd } = require('../command');
const { downloadContentFromMessage } = require("@whiskeysockets/baileys");
const { silainfo, myquoted } = require('../config');

//=========== VV COMMAND ===========//
cmd({
    pattern: "vv",
    alias: ["antivv", "avv", "viewonce", "open", "openphoto", "openvideo", "vvphoto"],
    desc: "Retrieve view once media",
    category: "media",
    react: "👁️",
    filename: __filename
},
async (conn, mek, m, { from, reply, sender, isOwner }) => {
    try {
        // Send initial reaction
        await conn.sendMessage(from, {
            react: {
                text: "😃",
                key: mek.key
            }
        });

        // Owner check
        if (!isOwner) {
            await conn.sendMessage(
                from,
                {
                    text: `╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐎𝐰𝐧𝐞𝐫 𝐨𝐧𝐥𝐲 𝐜𝐨𝐦𝐦𝐚𝐧𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
                    ...silainfo()
                },
                { quoted: myquoted }
            );
            return;
        }

        const quoted = mek.message?.extendedTextMessage?.contextInfo?.quotedMessage;

        // Check if message is quoted
        if (!quoted) {
            await conn.sendMessage(
                from,
                {
                    text: `╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐫𝐞𝐩𝐥𝐲 𝐭𝐨 𝐚 𝐯𝐢𝐞𝐰 𝐨𝐧𝐜𝐞 𝐦𝐞𝐝𝐢𝐚\n\n╔► 𝐔𝐬𝐚𝐠𝐞:\n╚► → .𝐯𝐯 (𝐫𝐞𝐩𝐥𝐲 𝐭𝐨 𝐩𝐡𝐨𝐭𝐨/𝐯𝐢𝐝𝐞𝐨/𝐚𝐮𝐝𝐢𝐨)\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
                    ...silainfo()
                },
                { quoted: myquoted }
            );
            return;
        }

        // Identify media type
        let type = Object.keys(quoted)[0];
        if (!["imageMessage", "videoMessage", "audioMessage"].includes(type)) {
            await conn.sendMessage(
                from,
                {
                    text: `╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐫𝐞𝐩𝐥𝐲 𝐭𝐨 𝐩𝐡𝐨𝐭𝐨, 𝐯𝐢𝐝𝐞𝐨 𝐨𝐫 𝐚𝐮𝐝𝐢𝐨\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
                    ...silainfo()
                },
                { quoted: myquoted }
            );
            return;
        }

        // Download media
        const stream = await downloadContentFromMessage(quoted[type], type.replace("Message", ""));
        let buffer = Buffer.from([]);
        for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

        // Prepare message content
        let mediaType = "";
        let sendContent = {};
        
        if (type === "imageMessage") {
            mediaType = "𝐈𝐦𝐚𝐠𝐞";
            sendContent = {
                image: buffer,
                caption: quoted[type]?.caption || `╔► 𝐕𝐢𝐞𝐰 𝐎𝐧𝐜𝐞 𝐑𝐞𝐭𝐫𝐢𝐞𝐯𝐞𝐝: 👁️\n╚► → 𝐓𝐲𝐩𝐞: ${mediaType}\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
                mimetype: quoted[type]?.mimetype || "image/jpeg",
                ...silainfo()
            };
        } else if (type === "videoMessage") {
            mediaType = "𝐕𝐢𝐝𝐞𝐨";
            sendContent = {
                video: buffer,
                caption: quoted[type]?.caption || `╔► 𝐕𝐢𝐞𝐰 𝐎𝐧𝐜𝐞 𝐑𝐞𝐭𝐫𝐢𝐞𝐯𝐞𝐝: 👁️\n╚► → 𝐓𝐲𝐩𝐞: ${mediaType}\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
                mimetype: quoted[type]?.mimetype || "video/mp4",
                ...silainfo()
            };
        } else if (type === "audioMessage") {
            mediaType = "𝐀𝐮𝐝𝐢𝐨";
            sendContent = {
                audio: buffer,
                mimetype: quoted[type]?.mimetype || "audio/mp4",
                ptt: quoted[type]?.ptt || false,
                ...silainfo()
            };
        }

        // Send back media
        await conn.sendMessage(from, sendContent, { quoted: myquoted });

        // Send success reaction
        await conn.sendMessage(from, {
            react: {
                text: "✅",
                key: mek.key
            }
        });

    } catch (error) {
        console.error("VV command error:", error);
        
        // Send error reaction
        await conn.sendMessage(from, {
            react: {
                text: "❌",
                key: mek.key
            }
        });
        
        await conn.sendMessage(
            from,
            {
                text: `╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐫𝐞𝐭𝐫𝐢𝐞𝐯𝐞 𝐦𝐞𝐝𝐢𝐚\n\n╔► 𝐑𝐞𝐚𝐬𝐨𝐧:\n╚► → ${error.message}\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
                ...silainfo()
            },
            { quoted: myquoted }
        );
    }
});