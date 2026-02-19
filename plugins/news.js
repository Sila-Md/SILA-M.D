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
    pattern: "news",
    desc: "Get the latest news headlines.",
    category: "news",
    react: "📰",
    filename: __filename
},
async (conn, mek, m, { from, reply, sender }) => {
    try {
        const apiKey = "0f2c43ab11324578a7b1709651736382";
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
        const articles = response.data.articles;

        if (!articles.length) {
            return await conn.sendMessage(from, { 
                text: "𝙽𝚘 𝚗𝚎𝚠𝚜 𝚊𝚛𝚝𝚒𝚌𝚕𝚎𝚜 𝚏𝚘𝚞𝚗𝚍.\n\n> © Powered by Sila Tech", 
                contextInfo: getContextInfo({ sender: sender })
            }, { quoted: fkontak });
        }

        // Send each article as a separate message with image and title
        for (let i = 0; i < Math.min(articles.length, 5); i++) {
            const article = articles[i];
            let message = `
╭━━〔 📰 *𝙽𝙴𝚆𝚂* 〕━━┈⊷
┃
┃ 📌 *${article.title}*
┃
┃ 📝 ${article.description || '𝙽𝚘 𝚍𝚎𝚜𝚌𝚛𝚒𝚙𝚝𝚒𝚘𝚗 𝚊𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎'}
┃
┃ 🔗 ${article.url}
┃
╰━━━━━━━━━━━━━━━━━━┈⊷
> © Powered by Sila Tech
            `;

            console.log('Article Image URL:', article.urlToImage);

            if (article.urlToImage) {
                // Send image with caption
                await conn.sendMessage(from, { 
                    image: { url: article.urlToImage }, 
                    caption: message,
                    contextInfo: getContextInfo({ sender: sender })
                }, { quoted: fkontak });
            } else {
                // Send text message if no image is available
                await conn.sendMessage(from, { 
                    text: message,
                    contextInfo: getContextInfo({ sender: sender })
                }, { quoted: fkontak });
            }
        }
        
    } catch (e) {
        console.error("Error fetching news:", e);
        await conn.sendMessage(from, { 
            text: "𝙲𝚘𝚞𝚕𝚍 𝚗𝚘𝚝 𝚏𝚎𝚝𝚌𝚑 𝚗𝚎𝚠𝚜. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚝𝚛𝚢 𝚊𝚐𝚊𝚒𝚗 𝚕𝚊�cle𝚝𝚎𝚛.\n\n> © Powered by Sila Tech", 
            contextInfo: getContextInfo({ sender: sender })
        }, { quoted: fkontak });
    }
});