const { cmd } = require('../command');
const axios = require('axios');
const yts = require('yt-search');
const { silainfo, myquoted } = require('../config');

const AXIOS_DEFAULTS = {
    timeout: 60000,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*'
    }
};

async function getIzumiDownloadByUrl(youtubeUrl) {
    const apiUrl = `https://izumiiiiiiii.dpdns.org/downloader/youtube?url=${encodeURIComponent(youtubeUrl)}&format=mp3`;
    const res = await axios.get(apiUrl, AXIOS_DEFAULTS);
    if (res?.data?.result?.download) return res.data.result;
    throw new Error('Izumi API error');
}

async function getOkatsuDownloadByUrl(youtubeUrl) {
    const apiUrl = `https://okatsu-rolezapiiz.vercel.app/downloader/ytmp3?url=${encodeURIComponent(youtubeUrl)}`;
    const res = await axios.get(apiUrl, AXIOS_DEFAULTS);
    if (res?.data?.dl) {
        return {
            download: res.data.dl,
            title: res.data.title,
            thumbnail: res.data.thumb
        };
    }
    throw new Error('Okatsu API error');
}

//=========== SILA SONG COMMAND ===========//
cmd({
    pattern: "sila",
    alias: ["song", "music", "mp3", "silaplay"],
    desc: "Download YouTube audio",
    category: "media",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, args }) => {
    try {
        if (!args || args.length === 0) {
            await conn.sendMessage(
                from,
                {
                    text: "╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → .sila song name\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡",
                    ...silainfo()
                },
                { quoted: myquoted }
            );
            return;
        }

        const text = args.join(' ');
        
        // Searching message
        await conn.sendMessage(
            from,
            {
                text: "╔► 𝐒𝐈𝐋𝐀: 🔍\n╚► → Searching...\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡",
                ...silainfo()
            },
            { quoted: myquoted }
        );

        let video;
        if (text.includes('youtube.com') || text.includes('youtu.be')) {
            video = { url: text, title: 'YouTube Link' };
        } else {
            const search = await yts(text);
            if (!search || !search.videos.length) {
                throw new Error('No results found');
            }
            video = search.videos[0];
        }

        // Try APIs
        let audioData;
        try {
            audioData = await getIzumiDownloadByUrl(video.url);
        } catch (e1) {
            audioData = await getOkatsuDownloadByUrl(video.url);
        }

        // Send audio
        await conn.sendMessage(
            from,
            {
                audio: { url: audioData.download || audioData.dl },
                mimetype: 'audio/mpeg',
                fileName: `${(audioData.title || video.title || 'song').replace(/[<>:"/\\|?*]/g, '')}.mp3`,
                ptt: false,
                ...silainfo()
            },
            { quoted: myquoted }
        );

    } catch (error) {
        console.error("Sila command error:", error);
        
        await conn.sendMessage(
            from,
            {
                text: `╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → Failed to download\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡`,
                ...silainfo()
            },
            { quoted: myquoted }
        );
    }
});

//=========== SILA PLAY COMMAND (SIMPLE VERSION) ===========//
cmd({
    pattern: "silamp3",
    alias: ["play", "song", "silaplay2"],
    desc: "Quick music download",
    category: "media",
    react: "🎶",
    filename: __filename
},
async (conn, mek, m, { from, args }) => {
    try {
        if (!args || args.length === 0) {
            await conn.sendMessage(
                from,
                {
                    text: "╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → .silamp3 song name\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡",
                    ...silainfo()
                },
                { quoted: myquoted }
            );
            return;
        }

        const text = args.join(' ');
        
        // Quick search
        await conn.sendMessage(
            from,
            {
                text: "╔► 𝐒𝐈𝐋𝐀 𝐌𝐏𝟑: 🎶\n╚► → Processing...\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡",
                ...silainfo()
            },
            { quoted: myquoted }
        );

        // Try direct download
        try {
            const audioData = await getIzumiDownloadByQuery(text);
            
            await conn.sendMessage(
                from,
                {
                    audio: { url: audioData.download },
                    mimetype: 'audio/mpeg',
                    fileName: `${audioData.title || 'song'}.mp3`,
                    ...silainfo()
                },
                { quoted: myquoted }
            );
            
        } catch (error) {
            throw new Error('Download failed');
        }

    } catch (error) {
        console.error("Silamp3 command error:", error);
        
        await conn.sendMessage(
            from,
            {
                text: "╔► 𝐄𝐫𝐫𝐨𝐫: ❌\n╚► → Try .sila instead\n\n> © 𝐏𝐨𝐰𝐞𝐫𝐝 𝐁𝐲 𝐒𝐢𝐥𝐚 𝐓𝐞𝐜𝐡",
                ...silainfo()
            },
            { quoted: myquoted }
        );
    }
});

// Helper function for Izumi search
async function getIzumiDownloadByQuery(query) {
    const apiUrl = `https://izumiiiiiiii.dpdns.org/downloader/youtube-play?query=${encodeURIComponent(query)}`;
    const res = await axios.get(apiUrl, AXIOS_DEFAULTS);
    if (res?.data?.result?.download) return res.data.result;
    throw new Error('Izumi search error');
}