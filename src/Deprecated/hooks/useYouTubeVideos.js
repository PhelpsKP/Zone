import { useState, useEffect } from "react";

console.log("API Key:", process.env.REACT_APP_YOUTUBE_API_KEY);

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const CHANNEL_ID = "UC34jAbk1iaDn9-e4vIeBqIQ"; // Replace with your actual YouTube channel ID


function useYouTubeVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=UU${CHANNEL_ID.slice(
            2
          )}&key=${API_KEY}`
        );
        const data = await response.json();
        if (data.items) {
          setVideos(data.items);
        }
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return { videos, loading };
}

export default useYouTubeVideos;
