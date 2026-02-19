const axios = require('axios');
const { cmd } = require('../command');

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
    pattern: "githubstalk",
    desc: "Fetch detailed GitHub user profile including profile picture.",
    category: "menu",
    react: "🖥️",
    filename: __filename
},
async (conn, mek, m, { from, args, reply, sender }) => {
    try {
        const username = args[0];
        if (!username) {
            return await conn.sendMessage(from, { 
                text: "❌ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝙶𝚒𝚝𝙷𝚞𝚋 𝚞𝚜𝚎𝚛𝚗𝚊𝚖𝚎.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }
        
        const apiUrl = `https://api.github.com/users/${username}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        let userInfo = `╭━━〔 🖥️ *𝙶𝙸𝚃𝙷𝚄𝙱 𝚂𝚃𝙰𝙻𝙺* 〕━━┈⊷
┃
┃ 👤 *𝚄𝚜𝚎𝚛𝚗𝚊𝚖𝚎*: ${data.name || data.login}
┃ 🔗 *𝚄𝚁𝙻*: ${data.html_url}
┃ 📝 *𝙱𝚒𝚘*: ${data.bio || '𝙽𝚘𝚝 𝚊𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎'}
┃ 🏙️ *𝙻𝚘𝚌𝚊𝚝𝚒𝚘𝚗*: ${data.location || '𝚄𝚗𝚔𝚗𝚘𝚠𝚗'}
┃ 📊 *𝙿𝚞𝚋𝚕𝚒𝚌 𝚁𝚎𝚙𝚘𝚜*: ${data.public_repos}
┃ 👥 *𝙵𝚘𝚕𝚕𝚘𝚠𝚎𝚛𝚜*: ${data.followers} | 𝙵𝚘𝚕𝚕𝚘𝚠𝚒𝚗𝚐: ${data.following}
┃ 📅 *𝙲𝚛𝚎𝚊𝚝𝚎𝚍*: ${new Date(data.created_at).toDateString()}
┃ 🔭 *𝙿𝚞𝚋𝚕𝚒𝚌 𝙶𝚒𝚜𝚝𝚜*: ${data.public_gists}
┃
╰━━━━━━━━━━━━━━━━━━┈⊷
> © Powered by Sila Tech`;

        await conn.sendMessage(from, {
            image: { url: data.avatar_url },
            caption: userInfo,
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
        
    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { 
            text: `❌ 𝙴𝚛𝚛𝚘𝚛: ${e.response ? e.response.data.message : e.message}\n\n> © Powered by Sila Tech`, 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }
});