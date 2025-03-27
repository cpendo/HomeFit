import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

const useYoutubeSearch = (query) => {
  const [videoId, setVideoId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchVideo = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(BASE_URL, {
          params: {
            part: "snippet",
            q: `${query} demo`,
            key: API_KEY,
            type: "video",
            topicId: "/m/027x7n",
            videoEmbeddable: true,
            videoDuration: "short",
          },
        });

        let video = response.data.items[0];
        setVideoId(video.id.videoId);
      } catch (err) {
        setError(err.message || "An error occurred while fetching videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [query]);

  return { videoId, loading, error };
};

export default useYoutubeSearch;
