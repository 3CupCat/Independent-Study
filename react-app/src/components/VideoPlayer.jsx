import React, { useState, useEffect } from "react";
import "./VideoPlayer.css";

function VideoPlayer() {
  const movieIds = [2, 1]; // 需要获取的 movieIds

  const [trailerData, setTrailerData] = useState({
    trailers: {},
    selectedTrailerIndex: 0,
    player: null,
  });

  // Fetch trailers from backend for all movie IDs
  useEffect(() => {
    async function fetchTrailer(movieId) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/movies/${movieId}/trailers`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const trailers = await response.json();
        console.log(`Fetched trailers for movieId ${movieId}:`, trailers);

        setTrailerData((prevData) => ({
          ...prevData,
          trailers: { ...prevData.trailers, [movieId]: trailers },
        }));
      } catch (error) {
        console.error("Error fetching trailers:", error);
      }
    }

    movieIds.forEach((id) => fetchTrailer(id));
  }, []);

  // Initialize YouTube player
  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      const movieId =
        movieIds[trailerData.selectedTrailerIndex % movieIds.length];
      const trailer = trailerData.trailers[movieId]
        ? trailerData.trailers[movieId][0]
        : null;

      if (trailer) {
        const player = new window.YT.Player("player", {
          videoId: trailer,
          playerVars: {
            controls: 0,
            modestbranding: 1,
            rel: 0,
            iv_load_policy: 3,
            autoplay: 1,
            loop: 0,
            enablejsapi: 1,
            widget_referrer: window.location.href,
            disablekb: 1,
          },
          events: {
            onReady: onPlayerReady,
          },
        });

        setTrailerData((prevData) => ({ ...prevData, player }));
      }
    };

    return () => {
      window.onYouTubeIframeAPIReady = null;
    };
  }, [trailerData.trailers]);

  // Load new video when selectedTrailerIndex changes
  useEffect(() => {
    const { player, selectedTrailerIndex } = trailerData;
    const movieId = movieIds[selectedTrailerIndex % movieIds.length];
    const trailer = trailerData.trailers[movieId]
      ? trailerData.trailers[movieId][0]
      : null;

    if (player && trailer) {
      player.loadVideoById(trailer);
    }
  }, [trailerData.selectedTrailerIndex]);

  function onPlayerReady(event) {
    event.target.setPlaybackQuality("hd1080");
  }

  function handlePreviousTrailer() {
    setTrailerData((prevData) => ({
      ...prevData,
      selectedTrailerIndex:
        prevData.selectedTrailerIndex === 0
          ? movieIds.length - 1
          : prevData.selectedTrailerIndex - 1,
    }));
  }

  function handleNextTrailer() {
    setTrailerData((prevData) => ({
      ...prevData,
      selectedTrailerIndex:
        (prevData.selectedTrailerIndex + 1) % movieIds.length,
    }));
  }

  return (
    <div id="player-container" style={{ width: "100%", height: "100%" }}>
      <div id="player"></div>
      <div id="button-container">
        <button id="prev-button" onClick={handlePreviousTrailer}>
          {"<"}
        </button>
        <button id="next-button" onClick={handleNextTrailer}>
          {">"}
        </button>
      </div>
    </div>
  );
}

export default VideoPlayer;
