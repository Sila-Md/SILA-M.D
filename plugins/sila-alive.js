const { cmd } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const { silainfo, myquoted } = require('../config');

cmd({
    pattern: "alive",
    alias: ["status", "runtime", "uptime", "on", "active", "bot", "info"],
    desc: "Check bot status and system information",
    category: "main",
    react: "🧚‍♂️",
    filename: __filename
},
async (conn, mek, m, { from, reply, pushName, sender, botNumber, participants, groupMetadata }) => {
    try {
        // Calculate memory usage
        const used = process.memoryUsage();
        const usedMB = (used.heapUsed / 1024 / 1024).toFixed(2);
        const totalMB = (os.totalmem() / 1024 / 1024).toFixed(2);
        const freeMB = (os.freemem() / 1024 / 1024).toFixed(2);
        const memoryPercent = ((used.heapUsed / os.totalmem()) * 100).toFixed(1);
        
        // Platform info
        const platform = os.platform();
        const arch = os.arch();
        const cpus = os.cpus().length;
        const cpuModel = os.cpus()[0].model;
        const hostname = os.hostname();
        
        // Network info
        const networkInterfaces = os.networkInterfaces();
        let ipAddress = "Not available";
        for (const iface in networkInterfaces) {
            for (const alias of networkInterfaces[iface]) {
                if (alias.family === 'IPv4' && !alias.internal) {
                    ipAddress = alias.address;
                    break;
                }
            }
        }
        
        // Bot runtime
        const uptime = runtime(process.uptime());
        
        // Determine memory status
        let memoryStatus = "🟢 Excellent";
        if (memoryPercent > 90) memoryStatus = "🔴 Critical";
        else if (memoryPercent > 80) memoryStatus = "🟠 High";
        else if (memoryPercent > 70) memoryStatus = "🟡 Moderate";
        
        // Create detailed alive message
        const aliveMessage = `╔► 𝐁𝐎𝐓 𝐒𝐓𝐀𝐓𝐔𝐒: ⚡
╠► 𝐒𝐭𝐚𝐭𝐮𝐬: ✅ 𝐎𝐍𝐋𝐈𝐍𝐄 𝐀𝐍𝐃 𝐀𝐂𝐓𝐈𝐕𝐄
╠► 𝐔𝐩𝐭𝐢𝐦𝐞: ${uptime}
╠► 𝐕𝐞𝐫𝐬𝐢𝐨𝐧: 𝐒𝐈𝐋𝐀 𝐌𝐃 𝐕𝟏.𝟎
╠► 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫: 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡
╚►

╔► 𝐒𝐘𝐒𝐓𝐄𝐌 𝐈𝐍𝐅𝐎: 🖥️
╠► 𝐌𝐞𝐦𝐨𝐫𝐲: ${usedMB}𝐌𝐁 / ${totalMB}𝐌𝐁 (${memoryPercent}%)
╠► 𝐒𝐭𝐚𝐭𝐮𝐬: ${memoryStatus}
╠► 𝐂𝐏𝐔: ${cpus} 𝐜𝐨𝐫𝐞𝐬
╠► 𝐀𝐫𝐜𝐡𝐢𝐭𝐞𝐜𝐭𝐮𝐫𝐞: ${arch}
╠► 𝐏𝐥𝐚𝐭𝐟𝐨𝐫𝐦: ${platform}
╠► 𝐇𝐨𝐬𝐭𝐧𝐚𝐦𝐞: ${hostname}
╠► 𝐈𝐏: ${ipAddress}
╚►

╔► 𝐏𝐄𝐑𝐅𝐎𝐑𝐌𝐀𝐍𝐂𝐄: 📊
╠► 𝐋𝐨𝐚𝐝 𝐀𝐯𝐞𝐫𝐚𝐠𝐞: ${os.loadavg()[0].toFixed(2)}
╠► 𝐅𝐫𝐞𝐞 𝐌𝐞𝐦𝐨𝐫𝐲: ${freeMB}𝐌𝐁
╠► 𝐓𝐨𝐭𝐚𝐥 𝐌𝐞𝐦𝐨𝐫𝐲: ${totalMB}𝐌𝐁
╠► 𝐂𝐏𝐔 𝐌𝐨𝐝𝐞𝐥: ${cpuModel.split(' ').slice(0, 3).join(' ')}
╚►

╔► 𝐁𝐎𝐓 𝐂𝐀𝐏𝐀𝐁𝐈𝐋𝐈𝐓𝐈𝐄𝐒: 🛠️
╠► 𝐆𝐫𝐨𝐮𝐩 𝐌𝐚𝐧𝐚𝐠𝐞𝐦𝐞𝐧𝐭: ✅
╠► 𝐌𝐞𝐝𝐢𝐚 𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝: ✅
╠► 𝐀𝐮𝐭𝐨𝐦𝐚𝐭𝐢𝐨𝐧: ✅
╠► 𝐌𝐮𝐥𝐭𝐢-𝐃𝐞𝐯𝐢𝐜𝐞: ✅
╠► 𝐒𝐞𝐜𝐮𝐫𝐢𝐭𝐲: ✅
╠► 𝐔𝐩𝐝𝐚𝐭𝐞𝐬: ✅
╚►

> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡
> 𝐓𝐲𝐩𝐞 .𝐡𝐞𝐥𝐩 𝐟𝐨𝐫 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬`;

        // Send the alive message
        await conn.sendMessage(
            from,
            {
                text: aliveMessage,
                ...silainfo()
            },
            { quoted: myquoted }
        );
        
        // Add reaction to the command message
        await conn.sendMessage(from, { 
            react: { text: `⚡`, key: mek.key } 
        });

    } catch (e) {
        console.error("Alive command error:", e);
        
        // Send error in your format
        await conn.sendMessage(
            from,
            {
                text: `╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐠𝐞𝐭 𝐛𝐨𝐭 𝐬𝐭𝐚𝐭𝐮𝐬\n\n╔► 𝐑𝐞𝐚𝐬𝐨𝐧:\n╚► → ${e.message}\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
                ...silainfo()
            },
            { quoted: myquoted }
        );
    }
});

cmd({
    pattern: "simplealive",
    alias: ["simple", "quickalive", "botstatus"],
    desc: "Simple bot status check",
    category: "main",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const uptime = runtime(process.uptime());
        const usedMB = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        
        const simpleMessage = `╔► 𝐒𝐈𝐋𝐀 𝐌𝐃 𝐁𝐎𝐓: 🤖
╠► 𝐒𝐭𝐚𝐭𝐮𝐬: ✅ 𝐎𝐍𝐋𝐈𝐍𝐄
╠► 𝐔𝐩𝐭𝐢𝐦𝐞: ${uptime}
╠► 𝐌𝐞𝐦𝐨𝐫𝐲: ${usedMB}𝐌𝐁
╠► 𝐕𝐞𝐫𝐬𝐢𝐨𝐧: 𝟏.𝟎
╠► 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫: 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡
╚►

╔► 𝐁𝐨𝐭 𝐢𝐬 𝐫𝐞𝐚𝐝𝐲 𝐭𝐨 𝐬𝐞𝐫𝐯𝐞!
╚► 𝐔𝐬𝐞 .𝐡𝐞𝐥𝐩 𝐟𝐨𝐫 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬

> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`;

        await conn.sendMessage(
            from,
            {
                text: simpleMessage,
                ...silainfo()
            },
            { quoted: myquoted }
        );
        
    } catch (e) {
        console.error("Simple alive error:", e);
        await conn.sendMessage(
            from,
            {
                text: `╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐁𝐨𝐭 𝐬𝐭𝐚𝐭𝐮𝐬 𝐮𝐧𝐚𝐯𝐚𝐢𝐥𝐚𝐛𝐥𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
                ...silainfo()
            },
            { quoted: myquoted }
        );
    }
});

cmd({
    pattern: "sysinfo",
    alias: ["system", "serverinfo", "hostinfo"],
    desc: "Detailed system information",
    category: "main",
    react: "🖥️",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        // Get detailed system info
        const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
        const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
        const usedMem = ((os.totalmem() - os.freemem()) / 1024 / 1024 / 1024).toFixed(2);
        const memoryPercent = (((os.totalmem() - os.freemem()) / os.totalmem()) * 100).toFixed(1);
        
        const cpus = os.cpus();
        const cpuSpeed = cpus[0].speed;
        const loadAvg = os.loadavg();
        
        // Get Node.js info
        const nodeVersion = process.version;
        const v8Version = process.versions.v8;
        const nodeUptime = runtime(process.uptime());
        
        const sysInfoMessage = `╔► 𝐒𝐘𝐒𝐓𝐄𝐌 𝐃𝐄𝐓𝐀𝐈𝐋𝐒: 🖥️
╠► 𝐎𝐩𝐞𝐫𝐚𝐭𝐢𝐧𝐠 𝐒𝐲𝐬𝐭𝐞𝐦: ${os.type()} ${os.release()}
╠► 𝐇𝐨𝐬𝐭𝐧𝐚𝐦𝐞: ${os.hostname()}
╠► 𝐀𝐫𝐜𝐡𝐢𝐭𝐞𝐜𝐭𝐮𝐫𝐞: ${os.arch()}
╠► 𝐏𝐥𝐚𝐭𝐟𝐨𝐫𝐦: ${os.platform()}
╚►

╔► 𝐌𝐄𝐌𝐎𝐑𝐘 𝐈𝐍𝐅𝐎: 💾
╠► 𝐓𝐨𝐭𝐚𝐥: ${totalMem}𝐆𝐁
╠► 𝐔𝐬𝐞𝐝: ${usedMem}𝐆𝐁
╠► 𝐅𝐫𝐞𝐞: ${freeMem}𝐆𝐁
╠► 𝐔𝐬𝐚𝐠𝐞: ${memoryPercent}%
╚►

╔► 𝐂𝐏𝐔 𝐈𝐍𝐅𝐎: ⚙️
╠► 𝐂𝐨𝐫𝐞𝐬: ${cpus.length}
╠► 𝐌𝐨𝐝𝐞𝐥: ${cpus[0].model}
╠► 𝐒𝐩𝐞𝐞𝐝: ${cpuSpeed}𝐌𝐇𝐳
╠► 𝐋𝐨𝐚𝐝 𝐀𝐯𝐞𝐫𝐚𝐠𝐞 (1min): ${loadAvg[0].toFixed(2)}
╠► 𝐋𝐨𝐚𝐝 𝐀𝐯𝐞𝐫𝐚𝐠𝐞 (5min): ${loadAvg[1].toFixed(2)}
╚►

╔► 𝐍𝐎𝐃𝐄.𝐉𝐒 𝐈𝐍𝐅𝐎: 🟢
╠► 𝐕𝐞𝐫𝐬𝐢𝐨𝐧: ${nodeVersion}
╠► 𝐕𝟖 𝐕𝐞𝐫𝐬𝐢𝐨𝐧: ${v8Version}
╠► 𝐔𝐩𝐭𝐢𝐦𝐞: ${nodeUptime}
╠► 𝐏𝐫𝐨𝐜𝐞𝐬𝐬 𝐏𝐈𝐃: ${process.pid}
╚►

> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`;

        await conn.sendMessage(
            from,
            {
                text: sysInfoMessage,
                ...silainfo()
            },
            { quoted: myquoted }
        );
        
    } catch (e) {
        console.error("Sysinfo error:", e);
        await conn.sendMessage(
            from,
            {
                text: `╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐂𝐚𝐧𝐧𝐨𝐭 𝐠𝐞𝐭 𝐬𝐲𝐬𝐭𝐞𝐦 𝐢𝐧𝐟𝐨\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
                ...silainfo()
            },
            { quoted: myquoted }
        );
    }
});
