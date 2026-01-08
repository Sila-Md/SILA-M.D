const { cmd } = require('../command');
const axios = require('axios');
const { silainfo, myquoted } = require('../config');

//=========== FB DOWNLOAD COMMAND ===========//
cmd({
    pattern: "fb",
    alias: ["facebook", "fbdl"],
    desc: "Download Facebook videos",
    category: "media",
    react: "📥",
    filename: __filename
},
async (conn, mek, m, { from, reply, args }) => {
    try {
        if (!args || args.length === 0) {
            await reply(`╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐞𝐧𝐭𝐞𝐫 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐮𝐫𝐥\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);
            return;
        }

        const facebookUrl = args[0];
        
        if (!facebookUrl.includes('facebook.com') && !facebookUrl.includes('fb.watch')) {
            await reply(`╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐮𝐫𝐥\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);
            return;
        }

        await reply(`╔► 𝐏𝐫𝐨𝐜𝐞𝐬𝐬𝐢𝐧𝐠: ⚙️\n╚► → 𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝𝐢𝐧𝐠 𝐯𝐢𝐝𝐞𝐨...\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);

        const apiUrl = `https://lance-frank-asta.onrender.com/api/downloader?url=${encodeURIComponent(facebookUrl)}`;
        const { data } = await axios.get(apiUrl);

        if (!data?.content?.status || !data?.content?.data?.result?.length) {
            throw new Error("𝐍𝐨 𝐯𝐢𝐝𝐞𝐨 𝐟𝐨𝐮𝐧𝐝");
        }

        let videoData = data.content.data.result.find(v => v.quality === "HD") || 
                       data.content.data.result.find(v => v.quality === "SD");

        if (!videoData) {
            throw new Error("𝐍𝐨 𝐯𝐚𝐥𝐢𝐝 𝐯𝐢𝐝𝐞𝐨 𝐮𝐫𝐥");
        }

        await conn.sendMessage(
            from,
            {
                video: { url: videoData.url },
                caption: `╔► 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐕𝐢𝐝𝐞𝐨: 📥\n╚► → 𝐐𝐮𝐚𝐥𝐢𝐭𝐲: ${videoData.quality}\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
                ...silainfo()
            },
            { quoted: myquoted }
        );

    } catch (error) {
        console.error("FB error:", error);
        await reply(`╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → ${error.message}\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);
    }
});