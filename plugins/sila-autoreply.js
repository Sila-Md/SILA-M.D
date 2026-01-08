const { cmd } = require('../command');
const config = require('../config');

// Define fakevCard
const fakevCard = {
    key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "status@broadcast"
    },
    message: {
        contactMessage: {
            displayName: "© SILA AI 🎅",
            vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:SILA AI CHRISTMAS\nORG:SILA AI;\nTEL;type=CELL;type=VOICE;waid=255612491554:+255612491554\nEND:VCARD`
        }
    }
};

// Auto-reply configuration
const autoReplies = {
    // Greetings
    'sila': {
        reply: `╔═══════════════════════
║  *𝚂𝙸𝙻𝙰 𝙼𝙳 𝙱𝙾𝚃*
╚═══════════════════════

┌─「 𝙰𝙱𝙾𝚄𝚃 𝙼𝙴 」━━━━━━━━━━━━━━━
│ 
│  *🤖 I'm SILA MD - Premium WhatsApp Bot*
│  *⚡ Version:* 3.0.0 Premium
│  *🎯 Features:* AI, Downloader, Games & More
│  *🔧 Owner:* ${config.OWNER_NAME || 'SILA TECH'}
│ 
└────────────────────

*💬 Need help?* Type *.menu* to see all commands

*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`,
        image: 'https://files.catbox.moe/jwmx1j.jpg'
    },
    
    'hi': {
        reply: `*👋 Hello there! Welcome to SILA MD Bot!*\n\nI'm here to assist you with various features. Use *.menu* to explore my capabilities! 😊\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    'hello': {
        reply: `*🤗 Greetings! I'm SILA MD Bot*\n\nReady to help you with AI chat, downloads, games, and much more! Type *.menu* to begin.\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    'hey': {
        reply: `*😄 Hey! What's up?*\n\nI'm SILA MD Bot, your digital assistant. How can I help you today?\n\n*💡 Tip:* Try *.ai* for AI chat or *.menu* for all commands\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    // Help requests
    'i need help': {
        reply: `*🆘 Need assistance? I'm here to help!*\n\nHere are some quick options:\n• *.menu* - See all commands\n• *.help* - Get help menu\n• *.owner* - Contact owner\n• *.groupmenu* - Group commands\n\nOr just ask me anything! 🤖\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    'help': {
        reply: `*❓ How can I assist you?*\n\nHere's what I can do:\n• 🤖 *AI Chat* - Use *.ai* or *.gpt*\n• 📥 *Downloads* - Use *.dlmenu*\n• 🎮 *Games* - Use *.funmenu*\n• 🛠️ *Tools* - Use *.othermenu*\n\nType *.menu* for complete command list!\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    // Time-based greetings
    'good morning': {
        reply: `*🌅 Good Morning! Have a wonderful day ahead!*\n\nStart your day with SILA MD Bot! Need anything? I'm here to help. ☀️\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    'morning': {
        reply: `*🌄 Morning! Ready for a new day?*\n\nHow can I assist you this morning? Try some commands or ask me anything!\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    'good': {
        reply: `*👍 Good to hear that!*\n\nIs there anything specific you'd like me to help you with today? 😊\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    'goodbye': {
        reply: `*👋 Goodbye! Take care and see you soon!*\n\nRemember, I'm always here when you need assistance. Have a great day! 😊\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    // Identity questions
    'who are you': {
        reply: `*🤖 I'm SILA MD - Advanced WhatsApp Bot*\n\n*🎯 Features Include:*\n• 🤖 AI Chat (GPT, Gemini, Claude)\n• 📥 Media Downloader\n• 🎮 Fun & Games\n• 🛠️ Utility Tools\n• 👥 Group Management\n\n*⚡ Version:* 3.0.0 Premium\n*👑 Owner:* ${config.OWNER_NAME || 'SILA TECH'}\n\nUse *.menu* to explore everything!\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    'what is your name': {
        reply: `*🤖 My name is SILA MD Bot*\n\nI'm a multi-functional WhatsApp bot created by SILA TECH to make your WhatsApp experience better! ✨\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    // Additional common phrases
    'thanks': {
        reply: `*🙏 You're welcome!*\n\nGlad I could help! If you need anything else, just let me know. 😊\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    'thank you': {
        reply: `*😊 You're most welcome!*\n\nIt's my pleasure to assist you. Feel free to ask for help anytime! 🌟\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    'how are you': {
        reply: `*😊 I'm doing great, thank you for asking!*\n\nAs an AI bot, I'm always ready to help you. How about you? What can I do for you today?\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    'hii': {
        reply: `*👋 Hii there! Welcome to SILA MD Bot!*\n\nI'm excited to help you today. What would you like to do? 🤔\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    'yo': {
        reply: `*😎 Yo! What's good?*\n\nReady to use some cool bot features? Let's get started! 🚀\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    'sup': {
        reply: `*🤙 Sup! Not much, just waiting to help you!*\n\nWhat's on your mind? I've got plenty of features to explore. 😄\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    'bot': {
        reply: `*🤖 That's me! SILA MD Bot at your service!*\n\nNeed anything? I'm equipped with AI, downloaders, games, and much more! 💪\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    'cool': {
        reply: `*😎 Cool indeed!*\n\nWant to see something really cool? Try my AI features with *.ai* or check out my games! 🎮\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    'awesome': {
        reply: `*🌟 Awesome! Glad you think so!*\n\nI've got many awesome features waiting for you. Explore with *.menu*! 🚀\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    'wassup': {
        reply: `*🤘 Wassup! Everything's good here!*\n\nHow about you? Ready to use some amazing bot features? Let's go! 💥\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    'nice': {
        reply: `*😊 Nice! I appreciate that!*\n\nWant to see more nice features? Check out what I can do with *.menu*! ✨\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    'ok': {
        reply: `*👌 Okay!*\n\nLet me know if you need anything specific, or try *.menu* to see all options! 👍\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    'okay': {
        reply: `*👍 Okay then!*\n\nI'm here if you need help with anything. Don't hesitate to ask! 😊\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    'alright': {
        reply: `*👊 Alright!*\n\nReady to proceed? I've got your back with all bot features! 💪\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    'great': {
        reply: `*🎉 Great!*\n\nThat's wonderful to hear! How can I make your experience even greater today? 😄\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    'wow': {
        reply: `*😲 Wow! Thanks!*\n\nI'm glad you're impressed! Wait till you see all my features - they're even more wow! 🌟\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    }
};

// Emoji auto-replies
const emojiReplies = {
    '😂': {
        reply: `*😂 Haha! That's hilarious!*\n\nGlad to see you laughing! Want some fun? Try *.funmenu* for games and entertainment! 😄\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    '😊': {
        reply: `*😊 Smiling is contagious!*\n\nYour smile just made my day better too! How can I help spread more joy? 🌟\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    '❤️': {
        reply: `*❤️ Love is in the air!*\n\nSending love right back at you! 💕 Need something sweet? Try my features! 🍬\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    '😍': {
        reply: `*😍 Aww, thank you!*\n\nYou're making me blush! Want to see something really loveable? Check out my features! 💖\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    '👍': {
        reply: `*👍 Thumbs up!*\n\nAppreciate the approval! Ready to explore more cool features? Let's go! 🚀\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    '🔥': {
        reply: `*🔥 Fire! That's lit!*\n\nFeeling the heat? I've got some 🔥 features too! Check them out! 💪\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    '🎉': {
        reply: `*🎉 Party time!*\n\nLet's celebrate! Want some party features? Try my fun commands! 🥳\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    '🤔': {
        reply: `*🤔 Thinking hard?*\n\nNeed help figuring something out? I'm here to assist! Try *.ai* for smart answers! 💡\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    '😎': {
        reply: `*😎 Cool shades!*\n\nLooking cool! Want to see some cool features? I've got plenty! 😄\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    '💀': {
        reply: `*💀 That's dead!*\n\nBut I'm very much alive and kicking! Ready to help you with anything! 👻\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    '✨': {
        reply: `*✨ Sparkling!*\n\nJust like my features! Want to see something magical? Explore my capabilities! 🌟\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    '🥺': {
        reply: `*🥺 Aww, don't be sad!*\n\nI'm here to help cheer you up! Try *.funmenu* for some entertainment! 😊\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    '🙏': {
        reply: `*🙏 Bless you!*\n\nWishing you all the best! How can I be of service today? 😇\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    '🤣': {
        reply: `*🤣 ROFL! That's too funny!*\n\nGlad you're having fun! Want more laughs? Check out my fun features! 😂\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    '🥰': {
        reply: `*🥰 So sweet!*\n\nYou're making me feel all warm and fuzzy! 💖 Need something lovely?\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    },
    
    '😘': {
        reply: `*😘 Sending kisses back!*\n\nMwah! 💋 Want to see some heartwarming features? I've got them! ❤️\n\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`
    }
};

// Main message handler (without command pattern)
module.exports = async (conn, mek, m, { from, sender, body, isGroup }) => {
    try {
        // Skip if message is from bot itself
        if (mek.key.fromMe) return;
        
        // Get message text (lowercase for matching)
        const message = (body || '').toLowerCase().trim();
        
        // Skip empty messages
        if (!message) return;
        
        // Skip if it's a command (starts with prefix)
        if (message.startsWith(config.PREFIX)) return;
        
        // Check for exact word matches
        for (const [keyword, response] of Object.entries(autoReplies)) {
            if (message === keyword.toLowerCase() || 
                message.includes(keyword.toLowerCase())) {
                
                // Add small delay for natural feel
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Send reply
                if (response.image) {
                    await conn.sendMessage(from, {
                        image: { url: response.image },
                        caption: response.reply,
                        ...fakevCard
                    }, { quoted: mek });
                } else {
                    await conn.sendMessage(from, {
                        text: response.reply,
                        ...fakevCard
                    }, { quoted: mek });
                }
                return;
            }
        }
        
        // Check for emoji matches
        for (const [emoji, response] of Object.entries(emojiReplies)) {
            if (message.includes(emoji)) {
                await new Promise(resolve => setTimeout(resolve, 800));
                await conn.sendMessage(from, {
                    text: response.reply,
                    ...fakevCard
                }, { quoted: mek });
                return;
            }
        }
        
    } catch (error) {
        console.error('Error in auto-reply handler:', error);
    }
};

// Optional: Command to toggle auto-replies
cmd({
    pattern: "autoreply",
    alias: ["ar"],
    desc: "Toggle auto-reply feature",
    category: "owner",
    react: "🤖",
    filename: __filename
}, 
async (conn, mek, m, { from, reply, isOwner }) => {
    try {
        if (!isOwner) {
            await reply("*❌ Owner only command*");
            return;
        }
        
        const statusText = `╔═══════════════════════
║  *𝙰𝚄𝚃𝙾-𝚁𝙴𝙿𝙻𝚈 𝚂𝚃𝙰𝚃𝚄𝚂*
╚═══════════════════════

┌─「 𝙲𝚄𝚁𝚁𝙴𝙽𝚃 𝚂𝚃𝙰𝚃𝚄𝚂 」━━━━━━━━
│ 
│  *🤖 Auto-Reply:* ✅ ACTIVE
│  *📊 Keywords:* ${Object.keys(autoReplies).length}
│  *🎭 Emojis:* ${Object.keys(emojiReplies).length}
│  *⚡ Response Time:* 1-2 seconds
│ 
└────────────────────

*📝 Supported Keywords:*
${Object.keys(autoReplies).slice(0, 10).join(', ')}...

*😄 Supported Emojis:*
${Object.keys(emojiReplies).slice(0, 10).join(' ')}

*💡 Feature:* Replies automatically to common messages without prefix

*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`;
        
        await conn.sendMessage(from, { text: statusText });
        
    } catch (error) {
        console.error('Error in autoreply command:', error);
        reply(`*❌ Error:* ${error.message}`);
    }
});
