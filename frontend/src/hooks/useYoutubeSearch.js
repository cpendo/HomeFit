import { useState, useEffect } from "react";
// import axios from "axios";

const useYoutubeSearch = (workoutName) => {
  const [videoId, setVideoId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!workoutName) return;

    const fetchVideo = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiBase = import.meta.env.PROD ? "" : "http://localhost:5000";
        const response = await fetch(`${apiBase}/api/youtube?q=${workoutName}`);
        const data = await response.json();

        let video = data.items[0];
        setVideoId(video.id.videoId);
      } catch (err) {
        setError(err.message || "An error occurred while fetching videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [workoutName]);

  return { videoId, loading, error };
};

export default useYoutubeSearch;
