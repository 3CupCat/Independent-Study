import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import ButtonHome from "../components/Button/ButtonHome";
import MovieList from "../components/MovieList";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";

const Home = () => {
  const [nowPlayingData, setNowPlayingData] = useState([]);
  const [comingSoonData, setComingSoonData] = useState([]);
  const navRef = useRef(null);
  const [navHeight, setNavHeight] = useState(0);
  const [showNowPlaying, setShowNowPlaying] = useState(true);
  const movieData = showNowPlaying ? nowPlayingData : comingSoonData;
  const navigate = useNavigate();
  const bg = useColorModeValue("#000000", "#000000");
  const buttonBg = useColorModeValue("#2D2D2D", "#2D2D2D");
  const buttonActiveBg = useColorModeValue("#000000", "#000000");
  const buttonTextColor = useColorModeValue("#FFFFF0", "#FFFFF0");
  const buttonInactiveTextColor = useColorModeValue("#A8A8A8", "#A8A8A8");
  const buttonHoverBg = useColorModeValue("#3D3D3D", "#3D3D3D");
  const buttonFocusBoxShadow = "0 0 0 4px #FFFFF0";

  const handleMovieClick = (path) => {
    navigate(path);
  };

  useEffect(() => {
    fetchMovies("/api/movies/details/", 1, 6).then((data) =>
      setNowPlayingData(data)
    );

    fetchMovies("/api/movies/details/", 7, 12).then((data) =>
      setComingSoonData(data)
    );

    if (navRef.current) {
      const height = navRef.current.offsetHeight;
      setNavHeight(height);
    }
  }, []);

  const fetchMovies = async (baseUrl, start, end) => {
    const movies = [];
    for (let i = start; i <= end; i++) {
      const url = baseUrl + i;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch movie ${i}`);
        }
        const movieData = await response.json();
        movies.push(movieData);
      } catch (error) {
        console.error(`Error fetching movie ${i}:`, error);
      }
    }
    return movies;
  };

  return (
    <Box bg={bg} color="white" minHeight="100vh" pt="4rem">
      <Box
        position="relative"
        width="100%"
        height={{ base: "60vh", lg: `calc(100vh - ${navHeight}px)` }}
      >
        <VideoPlayer style={{ width: "100%", height: "100%" }} />
      </Box>
      <Box minHeight="50px" />
      <Flex
        justify="center"
        mt={12}
        mb={8}
        ref={navRef}
        direction={{ base: "column", lg: "row" }}
        alignItems={{ base: "center", lg: "unset" }}
      >
        <ButtonHome
          onClick={() => setShowNowPlaying(true)}
          bg={showNowPlaying ? buttonActiveBg : buttonBg}
          color={showNowPlaying ? buttonTextColor : buttonInactiveTextColor}
          _hover={{ bg: buttonHoverBg }}
          _focus={{ boxShadow: buttonFocusBoxShadow }}
          label="現正熱映"
          mb={{ base: 4, lg: 0 }}
        />
        <ButtonHome
          onClick={() => setShowNowPlaying(false)}
          bg={!showNowPlaying ? buttonActiveBg : buttonBg}
          color={!showNowPlaying ? buttonTextColor : buttonInactiveTextColor}
          _hover={{ bg: buttonHoverBg }}
          _focus={{ boxShadow: buttonFocusBoxShadow }}
          label="即將上映"
        />
      </Flex>
      <Box minHeight="50px" />
      <MovieList movieData={movieData} onMovieClick={handleMovieClick} />
      <Box minHeight="50px" />
    </Box>
  );
};

export default Home;
