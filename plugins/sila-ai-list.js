const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "openai",
    alias: ["chatgpt", "gpt3", "open-gpt", "gpt"],
    desc: "Chat with OpenAI (GPT-3.5/4)",
    category: "ai",
    react: "🧠",
    use: '.openai your question',
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, pushname }) => {
    try {
        if (!q) {
            return reply(`╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐚 𝐪𝐮𝐞𝐬𝐭𝐢𝐨𝐧\n\n╔► 𝐔𝐬𝐚𝐠𝐞:\n╚► → .openai What is AI?\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);
        }

        const processingMsg = await reply(`╔► 𝐏𝐫𝐨𝐜𝐞𝐬𝐬𝐢𝐧𝐠: ⏳\n╚► → 𝐀𝐬𝐤𝐢𝐧𝐠 𝐎𝐩𝐞𝐧𝐀𝐈...\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);

        try {
            const apiUrl = `https://vapis.my.id/api/openai?q=${encodeURIComponent(q)}`;
            const { data } = await axios.get(apiUrl, { timeout: 30000 });

            if (!data || !data.result) {
                if (processingMsg) {
                    try {
                        await conn.sendMessage(from, { delete: processingMsg.key });
                    } catch (e) {}
                }
                return reply(`╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐎𝐩𝐞𝐧𝐀𝐈 𝐟𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐫𝐞𝐬𝐩𝐨𝐧𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);
            }

            if (processingMsg) {
                try {
                    await conn.sendMessage(from, { delete: processingMsg.key });
                } catch (e) {}
            }

            const responseText = data.result.length > 3000 ? data.result.substring(0, 3000) + "..." : data.result;
            
            await reply(`╔► 𝐎𝐩𝐞𝐧𝐀𝐈 𝐑𝐞𝐬𝐩𝐨𝐧𝐬𝐞: 🧠\n╠► 𝐔𝐬𝐞𝐫: ${pushname || "User"}\n╠► 𝐐𝐮𝐞𝐬𝐭𝐢𝐨𝐧: ${q}\n╚►\n${responseText}\n\n╔► 𝐌𝐨𝐝𝐞𝐥: 𝐆𝐏𝐓-𝟑.𝟓\n╚► → 𝐑𝐞𝐬𝐩𝐨𝐧𝐬𝐞 𝐭𝐢𝐦𝐞: ${processingMsg ? Date.now() - processingMsg.messageTimestamp * 1000 : 'N/A'}𝐦𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);
            
            await conn.sendMessage(from, { react: { text: `✅`, key: mek.key } });

        } catch (apiError) {
            if (processingMsg) {
                try {
                    await conn.sendMessage(from, { delete: processingMsg.key });
                } catch (e) {}
            }
            throw apiError;
        }

    } catch (e) {
        console.error("OpenAI command error:", e);
        reply(`╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐫𝐞𝐝: ${e.message}\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);
    }
});

cmd({
    pattern: "ai",
    alias: ["bot", "sila", "gpt4", "bing", "chat", "assistant"],
    desc: "Chat with AI Assistant",
    category: "ai",
    react: "🤖",
    use: '.ai your message',
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, pushname }) => {
    try {
        if (!q) {
            return reply(`╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐞𝐧𝐭𝐞𝐫 𝐲𝐨𝐮𝐫 𝐦𝐞𝐬𝐬𝐚𝐠𝐞\n\n╔► 𝐄𝐱𝐚𝐦𝐩𝐥𝐞𝐬:\n╠► .ai Hello, how are you?\n╠► .ai Explain quantum computing\n╚► → .ai Write a poem about nature\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);
        }

        const processingMsg = await reply(`╔► 𝐏𝐫𝐨𝐜𝐞𝐬𝐬𝐢𝐧𝐠: ⏳\n╚► → 𝐓𝐡𝐢𝐧𝐤𝐢𝐧𝐠...\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);

        try {
            const apiUrl = `https://lance-frank-asta.onrender.com/api/gpt?q=${encodeURIComponent(q)}`;
            const { data } = await axios.get(apiUrl, { timeout: 30000 });

            if (!data || !data.message) {
                if (processingMsg) {
                    try {
                        await conn.sendMessage(from, { delete: processingMsg.key });
                    } catch (e) {}
                }
                return reply(`╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐈 𝐟𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐫𝐞𝐬𝐩𝐨𝐧𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);
            }

            if (processingMsg) {
                try {
                    await conn.sendMessage(from, { delete: processingMsg.key });
                } catch (e) {}
            }

            const responseText = data.message.length > 3000 ? data.message.substring(0, 3000) + "..." : data.message;
            
            await reply(`╔► 𝐀𝐈 𝐀𝐬𝐬𝐢𝐬𝐭𝐚𝐧𝐭: 🤖\n╠► 𝐔𝐬𝐞𝐫: ${pushname || "User"}\n╠► 𝐐𝐮𝐞𝐬𝐭𝐢𝐨𝐧: ${q.length > 100 ? q.substring(0, 100) + "..." : q}\n╚►\n${responseText}\n\n╔► 𝐓𝐢𝐩:\n╚► → 𝐔𝐬𝐞 .openai 𝐟𝐨𝐫 𝐆𝐏𝐓-𝟑.𝟓/𝟒\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);
            
            await conn.sendMessage(from, { react: { text: `✅`, key: mek.key } });

        } catch (apiError) {
            if (processingMsg) {
                try {
                    await conn.sendMessage(from, { delete: processingMsg.key });
                } catch (e) {}
            }
            throw apiError;
        }

    } catch (e) {
        console.error("AI command error:", e);
        reply(`╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐈 𝐬𝐞𝐫𝐯𝐢𝐜𝐞 𝐮𝐧𝐚𝐯𝐚𝐢𝐥𝐚𝐛𝐥𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);
    }
});

cmd({
    pattern: "deepseek",
    alias: ["deep", "seekai", "ds", "deepai"],
    desc: "Chat with DeepSeek AI",
    category: "ai",
    react: "👾",
    use: '.deepseek your question',
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, pushname }) => {
    try {
        if (!q) {
            return reply(`╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐞𝐧𝐭𝐞𝐫 𝐲𝐨𝐮𝐫 𝐪𝐮𝐞𝐬𝐭𝐢𝐨𝐧\n\n╔► 𝐔𝐬𝐚𝐠𝐞:\n╚► → .deepseek Explain machine learning\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);
        }

        const processingMsg = await reply(`╔► 𝐏𝐫𝐨𝐜𝐞𝐬𝐬𝐢𝐧𝐠: ⏳\n╚► → 𝐂𝐨𝐧𝐬𝐮𝐥𝐭𝐢𝐧𝐠 𝐃𝐞𝐞𝐩𝐒𝐞𝐞𝐤 𝐀𝐈...\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);

        try {
            const apiUrl = `https://api.ryzendesu.vip/api/ai/deepseek?text=${encodeURIComponent(q)}`;
            const { data } = await axios.get(apiUrl, { timeout: 30000 });

            if (!data || !data.answer) {
                if (processingMsg) {
                    try {
                        await conn.sendMessage(from, { delete: processingMsg.key });
                    } catch (e) {}
                }
                return reply(`╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐃𝐞𝐞𝐩𝐒𝐞𝐞𝐤 𝐀𝐈 𝐟𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐫𝐞𝐬𝐩𝐨𝐧𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);
            }

            if (processingMsg) {
                try {
                    await conn.sendMessage(from, { delete: processingMsg.key });
                } catch (e) {}
            }

            const responseText = data.answer.length > 3000 ? data.answer.substring(0, 3000) + "..." : data.answer;
            
            await reply(`╔► 𝐃𝐞𝐞𝐩𝐒𝐞𝐞𝐤 𝐀𝐈: 👾\n╠► 𝐔𝐬𝐞𝐫: ${pushname || "User"}\n╠► 𝐐𝐮𝐞𝐫𝐲: ${q.length > 80 ? q.substring(0, 80) + "..." : q}\n╚►\n${responseText}\n\n╔► 𝐀𝐈 𝐈𝐧𝐟𝐨:\n╚► → 𝐌𝐨𝐝𝐞𝐥: 𝐃𝐞𝐞𝐩𝐒𝐞𝐞𝐤-𝐂𝐡𝐚𝐭\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);
            
            await conn.sendMessage(from, { react: { text: `✅`, key: mek.key } });

        } catch (apiError) {
            if (processingMsg) {
                try {
                    await conn.sendMessage(from, { delete: processingMsg.key });
                } catch (e) {}
            }
            throw apiError;
        }

    } catch (e) {
        console.error("DeepSeek command error:", e);
        reply(`╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐃𝐞𝐞𝐩𝐒𝐞𝐞𝐤 𝐀𝐈 𝐮𝐧𝐚𝐯𝐚𝐢𝐥𝐚𝐛𝐥𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);
    }
});

cmd({
    pattern: "gemini",
    alias: ["googleai", "bard", "geminai"],
    desc: "Chat with Google Gemini AI",
    category: "ai",
    react: "🔷",
    use: '.gemini your question',
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, pushname }) => {
    try {
        if (!q) {
            return reply(`╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐞𝐧𝐭𝐞𝐫 𝐲𝐨𝐮𝐫 𝐪𝐮𝐞𝐬𝐭𝐢𝐨𝐧\n\n╔► 𝐄𝐱𝐚𝐦𝐩𝐥𝐞:\n╚► → .gemini What is Google Gemini?\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);
        }

        const processingMsg = await reply(`╔► 𝐏𝐫𝐨𝐜𝐞𝐬𝐬𝐢𝐧𝐠: ⏳\n╚► → 𝐂𝐨𝐧𝐧𝐞𝐜𝐭𝐢𝐧𝐠 𝐭𝐨 𝐆𝐨𝐨𝐠𝐥𝐞 𝐆𝐞𝐦𝐢𝐧𝐢...\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);

        try {
            const apiUrl = `https://api.ryzendesu.vip/api/ai/gemini?text=${encodeURIComponent(q)}`;
            const { data } = await axios.get(apiUrl, { timeout: 30000 });

            if (!data || !data.answer) {
                if (processingMsg) {
                    try {
                        await conn.sendMessage(from, { delete: processingMsg.key });
                    } catch (e) {}
                }
                
                // Alternative API fallback
                const altApiUrl = `https://aemt.me/gemini?text=${encodeURIComponent(q)}`;
                const altData = await axios.get(altApiUrl, { timeout: 30000 });
                
                if (!altData.data || !altData.data.result) {
                    return reply(`╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐆𝐞𝐦𝐢𝐧𝐢 𝐀𝐈 𝐟𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐫𝐞𝐬𝐩𝐨𝐧𝐝\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);
                }
                
                data.answer = altData.data.result;
            }

            if (processingMsg) {
                try {
                    await conn.sendMessage(from, { delete: processingMsg.key });
                } catch (e) {}
            }

            const responseText = data.answer.length > 3000 ? data.answer.substring(0, 3000) + "..." : data.answer;
            
            await reply(`╔► 𝐆𝐨𝐨𝐠𝐥𝐞 𝐆𝐞𝐦𝐢𝐧𝐢: 🔷\n╠► 𝐔𝐬𝐞𝐫: ${pushname || "User"}\n╠► 𝐐𝐮𝐞𝐬𝐭𝐢𝐨𝐧: ${q.length > 60 ? q.substring(0, 60) + "..." : q}\n╚►\n${responseText}\n\n╔► 𝐀𝐈 𝐈𝐧𝐟𝐨:\n╚► → 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝐆𝐨𝐨𝐠𝐥𝐞 𝐆𝐞𝐦𝐢𝐧𝐢 𝐏𝐫𝐨\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);
            
            await conn.sendMessage(from, { react: { text: `✅`, key: mek.key } });

        } catch (apiError) {
            if (processingMsg) {
                try {
                    await conn.sendMessage(from, { delete: processingMsg.key });
                } catch (e) {}
            }
            throw apiError;
        }

    } catch (e) {
        console.error("Gemini command error:", e);
        reply(`╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐆𝐞𝐦𝐢𝐧𝐢 𝐀𝐈 𝐮𝐧𝐚𝐯𝐚𝐢𝐥𝐚𝐛𝐥𝐞\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);
    }
});

cmd({
    pattern: "ask",
    alias: ["question", "q", "helpme"],
    desc: "Universal AI assistant - automatically chooses best AI",
    category: "ai",
    react: "💡",
    use: '.ask your question',
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, pushname }) => {
    try {
        if (!q) {
            return reply(`╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐏𝐥𝐞𝐚𝐬𝐞 𝐚𝐬𝐤 𝐚 𝐪𝐮𝐞𝐬𝐭𝐢𝐨𝐧\n\n╔► 𝐀𝐯𝐚𝐢𝐥𝐚𝐛𝐥𝐞 𝐀𝐈𝐬:\n╠► .openai - 𝐎𝐩𝐞𝐧𝐀𝐈 (𝐆𝐏𝐓)\n╠► .ai - 𝐀𝐈 𝐀𝐬𝐬𝐢𝐬𝐭𝐚𝐧𝐭\n╠► .deepseek - 𝐃𝐞𝐞𝐩𝐒𝐞𝐞𝐤 𝐀𝐈\n╠► .gemini - 𝐆𝐨𝐨𝐠𝐥𝐞 𝐆𝐞𝐦𝐢𝐧𝐢\n╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);
        }

        const processingMsg = await reply(`╔► 𝐀𝐧𝐚𝐥𝐲𝐳𝐢𝐧𝐠: 🔍\n╚► → 𝐂𝐡𝐨𝐨𝐬𝐢𝐧𝐠 𝐛𝐞𝐬𝐭 𝐀𝐈 𝐟𝐨𝐫 𝐲𝐨𝐮𝐫 𝐪𝐮𝐞𝐬𝐭𝐢𝐨𝐧...\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);

        // Choose AI based on query type
        let selectedAI = "openai"; // Default
        
        const queryLower = q.toLowerCase();
        
        if (queryLower.includes("code") || queryLower.includes("programming") || queryLower.includes("developer")) {
            selectedAI = "deepseek"; // Better for coding
        } else if (queryLower.includes("google") || queryLower.includes("search") || queryLower.includes("latest")) {
            selectedAI = "gemini"; // Google's AI for search-related
        } else if (queryLower.length < 30) {
            selectedAI = "ai"; // Simple AI for short queries
        }

        try {
            let apiUrl, responseData;
            
            switch(selectedAI) {
                case "openai":
                    apiUrl = `https://vapis.my.id/api/openai?q=${encodeURIComponent(q)}`;
                    responseData = await axios.get(apiUrl, { timeout: 30000 });
                    responseData = responseData.data?.result || "No response";
                    break;
                    
                case "ai":
                    apiUrl = `https://lance-frank-asta.onrender.com/api/gpt?q=${encodeURIComponent(q)}`;
                    responseData = await axios.get(apiUrl, { timeout: 30000 });
                    responseData = responseData.data?.message || "No response";
                    break;
                    
                case "deepseek":
                    apiUrl = `https://api.ryzendesu.vip/api/ai/deepseek?text=${encodeURIComponent(q)}`;
                    responseData = await axios.get(apiUrl, { timeout: 30000 });
                    responseData = responseData.data?.answer || "No response";
                    break;
                    
                case "gemini":
                    apiUrl = `https://api.ryzendesu.vip/api/ai/gemini?text=${encodeURIComponent(q)}`;
                    responseData = await axios.get(apiUrl, { timeout: 30000 });
                    responseData = responseData.data?.answer || "No response";
                    break;
            }

            if (processingMsg) {
                try {
                    await conn.sendMessage(from, { delete: processingMsg.key });
                } catch (e) {}
            }

            const aiNames = {
                "openai": "OpenAI GPT",
                "ai": "AI Assistant", 
                "deepseek": "DeepSeek AI",
                "gemini": "Google Gemini"
            };

            const responseText = typeof responseData === 'string' && responseData.length > 3000 ? 
                responseData.substring(0, 3000) + "..." : responseData;
            
            await reply(`╔► 𝐀𝐈 𝐀𝐬𝐬𝐢𝐬𝐭𝐚𝐧𝐭: 💡\n╠► 𝐔𝐬𝐞𝐫: ${pushname || "User"}\n╠► 𝐒𝐞𝐥𝐞𝐜𝐭𝐞𝐝 𝐀𝐈: ${aiNames[selectedAI]}\n╠► 𝐐𝐮𝐞𝐬𝐭𝐢𝐨𝐧: ${q.length > 70 ? q.substring(0, 70) + "..." : q}\n╚►\n${responseText}\n\n╔► 𝐍𝐨𝐭𝐞:\n╚► → 𝐔𝐬𝐞 𝐬𝐩𝐞𝐜𝐢𝐟𝐢𝐜 𝐀𝐈 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬 𝐟𝐨𝐫 𝐛𝐞𝐭𝐭𝐞𝐫 𝐫𝐞𝐬𝐮𝐥𝐭𝐬\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);
            
            await conn.sendMessage(from, { react: { text: `✅`, key: mek.key } });

        } catch (apiError) {
            if (processingMsg) {
                try {
                    await conn.sendMessage(from, { delete: processingMsg.key });
                } catch (e) {}
            }
            
            // Fallback to any working AI
            await reply(`╔► 𝐀𝐈 𝐀𝐬𝐬𝐢𝐬𝐭𝐚𝐧𝐭: 💡\n╚► → 𝐀𝐈 𝐬𝐞𝐫𝐯𝐢𝐜𝐞𝐬 𝐭𝐞𝐦𝐩𝐨𝐫𝐚𝐫𝐢𝐥𝐲 𝐮𝐧𝐚𝐯𝐚𝐢𝐥𝐚𝐛𝐥𝐞\n\n╔► 𝐓𝐫𝐲 𝐭𝐡𝐞𝐬𝐞 𝐢𝐧𝐬𝐭𝐞𝐚𝐝:\n╠► .openai - 𝐆𝐏𝐓-𝟑.𝟓/𝟒\n╠► .ai - 𝐁𝐚𝐬𝐢𝐜 𝐀𝐈\n╠► .deepseek - 𝐂𝐨𝐝𝐢𝐧𝐠 𝐀𝐈\n╠► .gemini - 𝐆𝐨𝐨𝐠𝐥𝐞'𝐬 𝐀𝐈\n╚►\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);
        }

    } catch (e) {
        console.error("Ask command error:", e);
        reply(`╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → 𝐀𝐈 𝐬𝐞𝐫𝐯𝐢𝐜𝐞𝐬 𝐜𝐮𝐫𝐫𝐞𝐧𝐭𝐥𝐲 𝐝𝐨𝐰𝐧\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`);
    }
});