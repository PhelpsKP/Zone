import React from "react";
import useYouTubeVideos from "../hooks/useYouTubeVideos";

function VideoGallery() {
  const { videos, loading } = useYouTubeVideos();

  if (loading) return <div>Loading videos...</div>;

  return (
    <section className="video-gallery-section">
      <div className="container">
        <div className="gallery-header">
          <div className="gallery-subtitle">Videos</div>
          <h2 className="gallery-title">Selected Work</h2>
          <p className="gallery-description">
            Our unique approach to creativity means that the worlds we build transcend the media they inhabit.
          </p>
        </div>
        <div className="gallery-slider">
          <button className="gallery-prev" aria-label="Previous slide">
            ‹
          </button>
          <div className="slider-wrapper">
            {videos.map((video) => (
              <div key={video.id} className="video-item">
                <iframe
                  width="100%"
                  height="200"
                  src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
                  title={video.snippet.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <p>{video.snippet.title}</p>
              </div>
            ))}
          </div>
          <button className="gallery-next" aria-label="Next slide">
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

export default VideoGallery;
