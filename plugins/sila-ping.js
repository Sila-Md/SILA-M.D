const { cmd } = require('../command');
const { silainfo, myquoted } = require('../config');

cmd({
    pattern: "ping",
    alias: ["pong", "speed", "latency", "status", "uptime"],
    desc: "Check bot response speed and latency",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, reply, startTime }) => {
    try {
        const start = Date.now();
        
        // Send initial ping message with processing animation
        const processingMsg = await conn.sendMessage(from, {
            text: "╔► 𝐏𝐢𝐧𝐠𝐢𝐧𝐠: 📡\n╚► → 𝐂𝐡𝐞𝐜𝐤𝐢𝐧𝐠 𝐛𝐨𝐭 𝐬𝐩𝐞𝐞𝐝...\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡",
            ...silainfo()
        }, { quoted: myquoted });
        
        const end = Date.now();
        const latency = end - start;
        
        // Calculate uptime if startTime is available
        let uptimeText = "Not available";
        if (startTime) {
            const uptime = Date.now() - startTime;
            const days = Math.floor(uptime / (1000 * 60 * 60 * 24));
            const hours = Math.floor((uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((uptime % (1000 * 60)) / 1000);
            
            uptimeText = days > 0 ? `${days}d ${hours}h ${minutes}m` : 
                        hours > 0 ? `${hours}h ${minutes}m ${seconds}s` : 
                        `${minutes}m ${seconds}s`;
        }
        
        // Determine speed status
        let speedStatus = "⚡ 𝙴𝚡𝚌𝚎𝚕𝚕𝚎𝚗𝚝";
        let speedEmoji = "⚡";
        if (latency > 1000) {
            speedStatus = "🐌 𝚂𝚕𝚘𝚠";
            speedEmoji = "🐌";
        } else if (latency > 500) {
            speedStatus = "👍 𝙶𝚘𝚘𝚍";
            speedEmoji = "👍";
        } else if (latency > 200) {
            speedStatus = "🚀 𝙵𝚊𝚜𝚝";
            speedEmoji = "🚀";
        }
        
        // Create detailed ping response
        const pingMessage = `╔► 𝐏𝐨𝐧𝐠! 🏓
╠► 𝐋𝐚𝐭𝐞𝐧𝐜𝐲: ${latency}𝐦𝐬
╠► 𝐒𝐩𝐞𝐞𝐝: ${speedStatus} ${speedEmoji}
╠► 𝐔𝐩𝐭𝐢𝐦𝐞: ${uptimeText}
╠► 𝐓𝐢𝐦𝐞: ${new Date().toLocaleTimeString()}
╚► 𝐒𝐭𝐚𝐭𝐮𝐬: ✅ 𝐎𝐩𝐞𝐫𝐚𝐭𝐢𝐨𝐧𝐚𝐥

╔► 𝐏𝐞𝐫𝐟𝐨𝐫𝐦𝐚𝐧𝐜𝐞 𝐋𝐞𝐯𝐞𝐥:
╠► ${latency < 200 ? "🟢 𝐄𝐱𝐜𝐞𝐥𝐥𝐞𝐧𝐭" : latency < 500 ? "🟡 𝐆𝐨𝐨𝐝" : "🔴 𝐒𝐥𝐨𝐰"}
╚► → 𝐑𝐞𝐬𝐩𝐨𝐧𝐬𝐞 𝐭𝐢𝐦𝐞: ${latency}𝐦𝐬

> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`;
        
        // Delete processing message first
        if (processingMsg) {
            try {
                await conn.sendMessage(from, { delete: processingMsg.key });
            } catch (e) {
                // Ignore deletion errors
            }
        }
        
        // Send the final ping message
        await conn.sendMessage(from, {
            text: pingMessage,
            ...silainfo()
        }, { quoted: myquoted });
        
        // Add reaction to original message
        await conn.sendMessage(from, { 
            react: { text: `🏓`, key: mek.key } 
        });
        
    } catch (error) {
        console.error("Ping command error:", error);
        
        // Send error message in your format
        await conn.sendMessage(from, {
            text: `╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐜𝐡𝐞𝐜𝐤 𝐩𝐢𝐧𝐠\n\n╔► 𝐑𝐞𝐚𝐬𝐨𝐧:\n╚► → ${error.message}\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
            ...silainfo()
        }, { quoted: myquoted });
    }
});

cmd({
    pattern: "ping2",
    alias: ["p", "test", "simpleping", "quickping"],
    desc: "Simple ping test - quick version",
    category: "main",
    react: "🏓",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const start = Date.now();
        
        // Quick ping test
        const pongMsg = await conn.sendMessage(from, {
            text: "🏓",
            ...silainfo()
        }, { quoted: myquoted });
        
        const end = Date.now();
        const latency = end - start;
        
        // Simple and clean response
        const pingMessage = `╔► 𝐒𝐢𝐦𝐩𝐥𝐞 𝐏𝐢𝐧𝐠: 🏓
╠► 𝐑𝐞𝐬𝐩𝐨𝐧𝐬𝐞: ${latency}𝐦𝐬
╠► 𝐒𝐭𝐚𝐭𝐮𝐬: ${latency < 1000 ? "✅ 𝐎𝐊" : "⚠️ 𝐒𝐥𝐨𝐰"}
╚► → ${latency < 500 ? "𝐁𝐨𝐭 𝐢𝐬 𝐫𝐞𝐚𝐝𝐲!" : "𝐁𝐨𝐭 𝐢𝐬 𝐫𝐞𝐬𝐩𝐨𝐧𝐝𝐢𝐧𝐠..."}

> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`;
        
        // Delete the quick pong message
        if (pongMsg) {
            try {
                await conn.sendMessage(from, { delete: pongMsg.key });
            } catch (e) {
                // Ignore deletion errors
            }
        }
        
        // Send the simple ping result
        await conn.sendMessage(from, {
            text: pingMessage,
            ...silainfo()
        }, { quoted: myquoted });
        
    } catch (error) {
        console.error("Ping2 error:", error);
        
        await conn.sendMessage(from, {
            text: `╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐐𝐮𝐢𝐜𝐤 𝐩𝐢𝐧𝐠 𝐟𝐚𝐢𝐥𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
            ...silainfo()
        }, { quoted: myquoted });
    }
});

cmd({
    pattern: "speedtest",
    alias: ["speed", "testnet", "network"],
    desc: "Complete network speed test",
    category: "main",
    react: "📊",
    filename: __filename
},
async (conn, mek, m, { from, reply, startTime }) => {
    try {
        const start = Date.now();
        
        // Initial message
        const testMsg = await conn.sendMessage(from, {
            text: "╔► 𝐒𝐩𝐞𝐞𝐝 𝐓𝐞𝐬𝐭: 📊\n╚► → 𝐓𝐞𝐬𝐭𝐢𝐧𝐠 𝐧𝐞𝐭𝐰𝐨𝐫𝐤 𝐩𝐞𝐫𝐟𝐨𝐫𝐦𝐚𝐧𝐜𝐞...\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡",
            ...silainfo()
        }, { quoted: myquoted });
        
        // Multiple test points for better accuracy
        const testPoints = [];
        for (let i = 0; i < 3; i++) {
            const pointStart = Date.now();
            await conn.sendMessage(from, { text: "." }, { quoted: myquoted });
            const pointEnd = Date.now();
            testPoints.push(pointEnd - pointStart);
        }
        
        const end = Date.now();
        const totalTime = end - start;
        const avgLatency = testPoints.reduce((a, b) => a + b, 0) / testPoints.length;
        const minLatency = Math.min(...testPoints);
        const maxLatency = Math.max(...testPoints);
        
        // Delete test messages
        if (testMsg) {
            try {
                await conn.sendMessage(from, { delete: testMsg.key });
            } catch (e) {}
        }
        
        // Determine connection quality
        let connectionQuality = "🟢 Excellent";
        if (avgLatency > 2000) connectionQuality = "🔴 Poor";
        else if (avgLatency > 1000) connectionQuality = "🟡 Fair";
        else if (avgLatency > 500) connectionQuality = "🟠 Good";
        
        const speedMessage = `╔► 𝐒𝐩𝐞𝐞𝐝 𝐓𝐞𝐬𝐭 𝐑𝐞𝐬𝐮𝐥𝐭𝐬: 📊
╠► 𝐀𝐯𝐞𝐫𝐚𝐠𝐞 𝐋𝐚𝐭𝐞𝐧𝐜𝐲: ${avgLatency.toFixed(0)}𝐦𝐬
╠► 𝐌𝐢𝐧𝐢𝐦𝐮𝐦: ${minLatency}𝐦𝐬
╠► 𝐌𝐚𝐱𝐢𝐦𝐮𝐦: ${maxLatency}𝐦𝐬
╠► 𝐓𝐨𝐭𝐚𝐥 𝐓𝐞𝐬𝐭 𝐓𝐢𝐦𝐞: ${totalTime}𝐦𝐬
╠► 𝐂𝐨𝐧𝐧𝐞𝐜𝐭𝐢𝐨𝐧: ${connectionQuality}
╠► 𝐓𝐞𝐬𝐭 𝐏𝐨𝐢𝐧𝐭𝐬: ${testPoints.length}
╚► → ${avgLatency < 1000 ? "𝐍𝐞𝐭𝐰𝐨𝐫𝐤 𝐢𝐬 𝐬𝐭𝐚𝐛𝐥𝐞" : "𝐍𝐞𝐭𝐰𝐨𝐫𝐤 𝐦𝐚𝐲 𝐛𝐞 𝐬𝐥𝐨𝐰"}

╔► 𝐈𝐧𝐭𝐞𝐫𝐩𝐫𝐞𝐭𝐚𝐭𝐢𝐨𝐧:
╠► < 500𝐦𝐬: ⚡ 𝐄𝐱𝐜𝐞𝐥𝐥𝐞𝐧𝐭
╠► 500-1000𝐦𝐬: 👍 𝐆𝐨𝐨𝐝
╠► 1000-2000𝐦𝐬: ⚠️ 𝐀𝐜𝐜𝐞𝐩𝐭𝐚𝐛𝐥𝐞
╠► > 2000𝐦𝐬: 🐌 𝐒𝐥𝐨𝐰
╚►

> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`;
        
        await conn.sendMessage(from, {
            text: speedMessage,
            ...silainfo()
        }, { quoted: myquoted });
        
    } catch (error) {
        console.error("Speedtest error:", error);
        
        await conn.sendMessage(from, {
            text: `╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐒𝐩𝐞𝐞𝐝 𝐭𝐞𝐬𝐭 𝐟𝐚𝐢𝐥𝐞𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
            ...silainfo()
        }, { quoted: myquoted });
    }
});