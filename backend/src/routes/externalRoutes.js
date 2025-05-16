const express = require("express");
const axios = require("axios");
const router = express.Router();

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";

router.get("/youtube", async (req, res) => {
  const { q } = req.query;

  try {
    const response = await axios.get(YOUTUBE_BASE_URL, {
      params: {
        part: "snippet",
        q: `${q} demo`,
        key: process.env.YOUTUBE_API_KEY,
        type: "video",
        topicId: "/m/027x7n",
        videoEmbeddable: true,
        videoDuration: "short",
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    //console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch from YouTube API" });
  }
});

module.exports = router;
