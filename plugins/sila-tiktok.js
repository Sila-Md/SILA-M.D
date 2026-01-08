const { cmd } = require('../command');
const axios = require('axios');
const { silainfo, myquoted } = require('../config');

//=========== TIKTOK DOWNLOAD COMMAND ===========//
cmd({
    pattern: "tiktok",
    alias: ["ttdl", "tt", "tiktokdl"],
    desc: "Download TikTok video without watermark",
    category: "media",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, reply, args }) => {
    try {
        if (!args || args.length === 0) {
            await reply(`╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐞𝐧𝐭𝐞𝐫 𝐓𝐢𝐤𝐓𝐨𝐤 𝐮𝐫𝐥\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);
            return;
        }

        const tiktokUrl = args[0];
        
        if (!tiktokUrl.includes('tiktok.com')) {
            await reply(`╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐓𝐢𝐤𝐓𝐨𝐤 𝐮𝐫𝐥\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);
            return;
        }

        await reply(`╔► 𝐏𝐫𝐨𝐜𝐞𝐬𝐬𝐢𝐧𝐠: ⚙️\n╚► → 𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝𝐢𝐧𝐠 𝐓𝐢𝐤𝐓𝐨𝐤 𝐯𝐢𝐝𝐞𝐨...\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);

        const apiUrl = `https://delirius-apiofc.vercel.app/download/tiktok?url=${encodeURIComponent(tiktokUrl)}`;
        const { data } = await axios.get(apiUrl);
        
        if (!data.status || !data.data) {
            throw new Error("𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐟𝐞𝐭𝐜𝐡 𝐓𝐢𝐤𝐓𝐨𝐤 𝐯𝐢𝐝𝐞𝐨");
        }

        const { title, like, comment, share, author, meta } = data.data;
        const videoUrl = meta.media.find(v => v.type === "video")?.org;
        
        if (!videoUrl) {
            throw new Error("𝐍𝐨 𝐯𝐢𝐝𝐞𝐨 𝐮𝐫𝐥 𝐟𝐨𝐮𝐧𝐝");
        }

        const caption = `╔► 𝐓𝐢𝐤𝐓𝐨𝐤 𝐕𝐢𝐝𝐞𝐨: 🎵\n╚► → 𝐔𝐬𝐞𝐫: ${author.nickname}\n╚► → 𝐓𝐢𝐭𝐥𝐞: ${title || 'No title'}\n\n╔► 𝐒𝐭𝐚𝐭𝐬:\n╚► → 👍 𝐋𝐢𝐤𝐞𝐬: ${like}\n╚► → 💬 𝐂𝐨𝐦𝐦𝐞𝐧𝐭𝐬: ${comment}\n╚► → 🔁 𝐒𝐡𝐚𝐫𝐞𝐬: ${share}\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`;

        await conn.sendMessage(
            from,
            {
                video: { url: videoUrl },
                caption: caption,
                ...silainfo()
            },
            { quoted: myquoted }
        );

    } catch (error) {
        console.error("TikTok error:", error);
        await reply(`╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → ${error.message}\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);
    }
});