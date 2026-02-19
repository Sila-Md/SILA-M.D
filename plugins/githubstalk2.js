const { cmd } = require('../command');
const axios = require('axios');

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

cmd({
    pattern: "githubstalk2",
    alias: ["github2", "ghstalk", "gitstalk"],
    desc: "Stalk a GitHub user profile",
    category: "search",
    react: "🔍",
    filename: __filename
}, async (conn, mek, m, { from, text, q, sender }) => {
    try {
        if (!q) {
            return await conn.sendMessage(from, {
                text: `╭━━〔 🔍 *𝙶𝙸𝚃𝙷𝚄𝙱 𝚂𝚃𝙰𝙻𝙺* 〕━━┈⊷
┃
┃ ❗ 𝚄𝚜𝚎𝚛𝚗𝚊𝚖𝚎 𝚛𝚎𝚚𝚞𝚒𝚛𝚎𝚍
┃
┃ 📌 𝙴𝚡𝚊𝚖𝚙𝚕𝚎: 
┃ .githubstalk2 𝚙𝚘𝚙𝚔𝚒𝚍𝚖𝚍
┃
╰━━━━━━━━━━━━━━━━━━┈⊷
> © Powered by Sila Tech`,
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        await conn.sendMessage(from, {
            text: `⏳ *𝙵𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝙶𝚒𝚝𝙷𝚞𝚋 𝚙𝚛𝚘𝚏𝚒𝚕𝚎...*`,
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });

        const apiUrl = `https://apis.davidcyriltech.my.id/githubStalk?user=${encodeURIComponent(q)}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.status === 200 && data.success) {
            const user = data.result;

            let stalkMsg = `╭━━〔 🐙 *𝙶𝙸𝚃𝙷𝚄𝙱 𝙿𝚁𝙾𝙵𝙸𝙻𝙴* 〕━━┈⊷
┃
┃ 🧑 *𝙽𝚊𝚖𝚎:* ${user.name || '𝙽𝚘𝚝 𝚜𝚎𝚝'}
┃ 🆔 *𝚄𝚜𝚎𝚛:* ${user.login}
┃ 📝 *𝙱𝚒𝚘:* ${user.bio || '𝙽𝚘 𝚋𝚒𝚘'}
┃
┃ 📊 *𝚂𝚝𝚊𝚝𝚜*
┃ 📁 𝚁𝚎𝚙𝚘𝚜: ${user.public_repos}
┃ 👥 𝙵𝚘𝚕𝚕𝚘𝚠𝚎𝚛𝚜: ${user.followers}
┃ 🔄 𝙵𝚘𝚕𝚕𝚘𝚠𝚒𝚗𝚐: ${user.following}
┃
┃ 📍 *𝙻𝚘𝚌𝚊𝚝𝚒𝚘𝚗:* ${user.location || '𝚄𝚗𝚔𝚗𝚘𝚠𝚗'}
┃ 🏢 *𝙲𝚘𝚖𝚙𝚊𝚗𝚢:* ${user.company || '𝙽𝚘𝚗𝚎'}
┃
┃ 🔗 ${user.html_url}
┃
╰━━━━━━━━━━━━━━━━━━┈⊷
> © Powered by Sila Tech`;

            await conn.sendMessage(from, {
                image: { url: user.avatar_url },
                caption: stalkMsg,
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });

        } else {
            return await conn.sendMessage(from, {
                text: `╭━━〔 ❌ *𝙽𝙾𝚃 𝙵𝙾𝚄𝙽𝙳* 〕━━┈⊷
┃
┃ ❗ 𝚄𝚜𝚎𝚛 𝚍𝚘𝚎𝚜 𝚗𝚘𝚝 𝚎𝚡𝚒𝚜𝚝
┃
┃ 🔍 𝙲𝚑𝚎𝚌𝚔 𝚞𝚜𝚎𝚛𝚗𝚊𝚖𝚎 & 𝚛𝚎𝚝𝚛𝚢
┃
╰━━━━━━━━━━━━━━━━━━┈⊷
> © Powered by Sila Tech`,
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

    } catch (e) {
        console.error("GitHub Stalk Error:", e);
        await conn.sendMessage(from, {
            text: `╭━━〔 ⚠️ *𝙴𝚁𝚁𝙾𝚁* 〕━━┈⊷
┃
┃ ❗ 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚏𝚎𝚝𝚌𝚑 𝚙𝚛𝚘𝚏𝚒𝚕𝚎
┃
┃ 🔄 𝚃𝚛𝚢 𝚊𝚐𝚊𝚒𝚗 𝚕𝚊𝚝𝚎𝚛
┃
╰━━━━━━━━━━━━━━━━━━┈⊷
> © Powered by Sila Tech`,
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }
});