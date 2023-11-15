const express = require('express');
const ytdl = require('ytdl-core');
const router = express.Router();

// GetAudio Function
async function getAudio(vidUrl) {
    try {
        const info = await ytdl.getInfo(vidUrl);
        const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
        if (audioFormats.length === 0) {
            throw new Error("No audio format found for the video");
        }
        const audioFormat = audioFormats[0];
        const audioUrl = audioFormat.url;
        return audioUrl;
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        throw error;
    }
}

// define the home page route
router.get('/', async (req, res) => {
    const videoLink = "https://www.youtube.com/watch?v=" + req.query.id;
  try {
    const audioUrl = await getAudio(videoLink);
    res.status(200).json({
        url: audioUrl
    });
  }
  catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({"error": "Error retrieving audio URL"});
  }
});

module.exports = router;