const config = require('../config')
const { cmd, commands } = require('../command');
const { silainfo, myquoted } = require('../config');

cmd({
    pattern: "menu2",
    alias: ["allmenu","fullmenu","list","cmd2"],
    desc: "Show all bot commands",
    category: "main",
    react: "📋",
    filename: __filename
}, 
async (conn, mek, m, { from, reply, react, pushName, sender }) => {
    try {
        let dec = `
╭▸─────────────────▸╮
│    「 𝐒𝐈𝐋𝐀 𝐌𝐃 𝐌𝐄𝐍𝐔 」    │
╰▸─────────────────▸╯

╔► 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐒
╚► → song
╚► → play
╚► → ytmp3
╚► → ytmp4
╚► → video
╚► → audio
╚► → tiktok
╚► → fb
╚► → ig
╚► → twitter
╚► → spotify
╚► → pinterest
╚► → apk
╚► → mediafire
╚► → gdrive

╔► 𝐆𝐑𝐎𝐔𝐏
╚► → add
╚► → kick
╚► → promote
╚► → demote
╚► → ginfo
╚► → grouplink
╚► → tagall
╚► → tagadmins
╚► → hidetag
╚► → invite
╚► → setwelcome
╚► → goodbye
╚► → lockgc
╚► → unlockgc
╚► → mute
╚► → unmute

╔► 𝐎𝐖𝐍𝐄𝐑
╚► → block
╚► → unblock
╚► → restart
╚► → shutdown
╚► → setpp
╚► → broadcast
╚► → eval
╚► → exec

╔► 𝐅𝐔𝐍 & 𝐆𝐀𝐌𝐄𝐒
╚► → sticker
╚► → emojimix
╚► → rate
╚► → ship
╚► → joke
╚► → truth
╚► → dare
╚► → fact
╚► → character
╚► → pickup

╔► 𝐀𝐈 & 𝐓𝐎𝐎𝐋𝐒
╚► → ai
╚► → gpt
╚► → gpt4
╚► → bing
╚► → imagine
╚► → trt
╚► → tts
╚► → fancy
╚► → base64
╚► → binary

╔► 𝐈𝐍𝐅𝐎
╚► → alive
╚► → ping
╚► → speed
╚► → runtime
╚► → owner
╚► → repo
╚► → menu

╔► 𝐎𝐓𝐇𝐄𝐑𝐒
╚► → anime
╚► → waifu
╚► → logo
╚► → weather
╚► → news
╚► → wikipedia
╚► → githubstalk

╭▸─────────────────▸╮
│    — 𝐒𝐈𝐋𝐀 𝐓𝐄𝐂𝐇 —    │
╰▸─────────────────▸╯

*Total Commands:* ${commands.length}
*User:* ${pushName || sender.split('@')[0]}

╔═❯ ${config.DESCRIPTION}`;

        const buttonMessage = {
            text: dec,
            footer: "📱 Click buttons below for more",
            buttons: [
                { 
                    buttonId: "owner_info", 
                    buttonText: { displayText: '👑 Owner Info' } 
                },
                { 
                    buttonId: "cmd_list", 
                    buttonText: { displayText: '📜 All Commands' } 
                }
            ],
            ...silainfo()
        };
        
        await conn.sendMessage(
            from,
            buttonMessage,
            { quoted: myquoted }
        );
        
        await react("✅");

    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message}`);
    }
});

// Handle button responses
cmd({
    on: "click",
    fromMe: false,
    dontAddCommandList: true
},
async (conn, mek, m, { from, body, reply, react, sender }) => {
    try {
        if (body === "owner_info") {
            await react("👑");
            
            // Owner vcard info
            const ownerInfo = `╭▸─────────────────▸╮
│    「 𝐎𝐖𝐍𝐄𝐑 𝐈𝐍𝐅𝐎 」    │
╰▸─────────────────▸╯

╔► 𝐍𝐚𝐦𝐞
╚► → SILA AI

╔► 𝐍𝐮𝐦𝐛𝐞𝐫
╚► → +${config.OWNER_NUMBER}

╔► 𝐁𝐨𝐭 𝐍𝐚𝐦𝐞
╚► → ${config.BOT_NAME}

╔► 𝐏𝐫𝐞𝐟𝐢𝐱
╚► → ${config.PREFIX}

╔► 𝐕𝐞𝐫𝐬𝐢𝐨𝐧
╚► → S1

╭▸─────────────────▸╮
│ — 𝐒𝐈𝐋𝐀 𝐓𝐄𝐂𝐇 — │
╰▸─────────────────▸╯

*Contact owner for support*`;
            
            // Create vcard
            const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${config.OWNER_NAME}
N:;${config.OWNER_NAME};;;
TEL;type=CELL;type=VOICE;waid=${config.OWNER_NUMBER}:+${config.OWNER_NUMBER}
ORG:SILA TECH;
TITLE:Bot Owner
NOTE:Contact for bot support
URL:https://wa.me/${config.OWNER_NUMBER}
END:VCARD`;
            
            await conn.sendMessage(from, {
                contacts: {
                    displayName: config.OWNER_NAME,
                    contacts: [{
                        vcard: vcard
                    }]
                },
                caption: ownerInfo
            }, { quoted: myquoted });
            
        } else if (body === "cmd_list") {
            await react("📜");
            
            // Group commands by category
            const categories = {};
            commands.forEach(cmd => {
                if (!categories[cmd.category]) {
                    categories[cmd.category] = [];
                }
                categories[cmd.category].push(cmd.pattern);
            });
            
            let cmdList = `╭▸─────────────────▸╮
│    「 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒 𝐋𝐈𝐒𝐓 」    │
╰▸─────────────────▸╯\n\n`;
            
            for (const [category, cmds] of Object.entries(categories)) {
                cmdList += `╔► ${category.toUpperCase()}\n`;
                cmds.forEach(cmd => {
                    cmdList += `╚► → ${config.PREFIX}${cmd}\n`;
                });
                cmdList += '\n';
            }
            
            cmdList += `╭▸─────────────────▸╮
│ — 𝐓𝐨𝐭𝐚𝐥: ${commands.length} 𝐂𝐦𝐝𝐬 — │
╰▸─────────────────▸╯`;
            
            await reply(cmdList);
        }
        
    } catch (error) {
        console.error("Button handler error:", error);
        await react("❌");
        reply("❌ *Action failed!*");
    }
});
