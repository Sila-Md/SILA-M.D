const fetch = require('node-fetch');
const { cmd } = require('../command');

cmd({
    pattern: "repo",
    alias: ["sc", "script", "source", "code"],
    desc: "Fetch GitHub repository information",
    react: "📂",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { from, sender, reply }) => {
    const githubRepoURL = 'https://github.com/Sila-Md/SILA-MD';

    try {
        // Extract username and repo name from the URL
        const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);

        // Fetch repository details
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
        
        if (!response.ok) {
            throw new Error(`GitHub API failed with status ${response.status}`);
        }

        const repoData = await response.json();

        // Create clean formatted info
        const formattedInfo = `╔► 𝐆𝐢𝐭𝐇𝐮𝐛 𝐑𝐞𝐩𝐨𝐬𝐢𝐭𝐨𝐫𝐲: 📂
╠► 𝐍𝐚𝐦𝐞: ${repoData.name}
╠► 𝐎𝐰𝐧𝐞𝐫: ${repoData.owner.login}
╠► 𝐒𝐭𝐚𝐫𝐬: ⭐ ${repoData.stargazers_count}
╠► 𝐅𝐨𝐫𝐤𝐬: 🍴 ${repoData.forks_count}
╠► 𝐖𝐚𝐭𝐜𝐡𝐞𝐫𝐬: 👁️ ${repoData.watchers_count}
╠► 𝐋𝐚𝐧𝐠𝐮𝐚𝐠𝐞: ${repoData.language || 'Not specified'}
╠► 𝐂𝐫𝐞𝐚𝐭𝐞𝐝: ${new Date(repoData.created_at).toLocaleDateString()}
╚► 𝐋𝐢𝐧𝐤: ${repoData.html_url}

╔► 𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧:
╚► → ${repoData.description || 'No description available'}

> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`;

        // Send image with context info
        await conn.sendMessage(from, {
            image: { url: `https://files.catbox.moe/qi3kij.jpg` },
            caption: formattedInfo,
            contextInfo: { 
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402325089913@newsletter',
                    newsletterName: '🎅𝚂𝙸𝙻𝙰 𝚃𝙴𝙲𝙷🎅',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Repo command error:", error);
        reply(`╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐟𝐞𝐭𝐜𝐡 𝐫𝐞𝐩𝐨𝐬𝐢𝐭𝐨𝐫𝐲 𝐢𝐧𝐟𝐨\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);
    }
});