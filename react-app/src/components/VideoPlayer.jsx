import { useState, useEffect } from "react";
import "./VideoPlayer.css";

function VideoPlayer() {
  const [trailerData, setTrailerData] = useState({
    trailers: ["VWavstJydZU", "ahL5yAOXjzU"],
    selectedTrailerIndex: 0,
    player: null,
  });

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    const iframe = document.getElementById("player");

    iframe.onload = function () {
      iframe.style.height = iframe.parentNode.offsetHeight + "px";

      iframe.style.width = iframe.parentNode.offsetWidth + "px";
    };

    window.onYouTubeIframeAPIReady = () => {
      setTrailerData((prevData) => ({
        ...prevData,
        player: new window.YT.Player("player", {
          videoId: prevData.trailers[prevData.selectedTrailerIndex],
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
        }),
      }));
    };

    return () => {
      window.onYouTubeIframeAPIReady = null;
    };
  }, []);

  useEffect(() => {
    if (trailerData.player) {
      trailerData.player.loadVideoById(
        trailerData.trailers[trailerData.selectedTrailerIndex]
      );
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
          ? prevData.trailers.length - 1
          : prevData.selectedTrailerIndex - 1,
    }));
  }

  function handleNextTrailer() {
    setTrailerData((prevData) => ({
      ...prevData,
      selectedTrailerIndex:
        prevData.selectedTrailerIndex === prevData.trailers.length - 1
          ? 0
          : prevData.selectedTrailerIndex + 1,
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
