import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import ButtonHome from "../components/Button/ButtonHome";
import MovieList from "../components/MovieList";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";

const Home = () => {
  const nowPlayingData = [
    {
      src: "/Dune.jpg",
      alt: "Dune",
      title: "Dune",
      path: "/booking/:id",
    },
    {
      src: "/Maleficent.jpg",
      alt: "Maleficent",
      title: "Maleficent",
      path: "/movies/maleficent",
    },
    {
      src: "/InsideOut2.jpg",
      alt: "Inside Out 2",
      title: "Inside Out 2",
      path: "/movies/insideout2",
    },
    {
      src: "/FastAndFurious.jpg",
      alt: "Fast & Furious",
      title: "Fast & Furious",
      path: "/movies/fastfurious",
    },
    {
      src: "/GranTurismo.jpg",
      alt: "Gran Turismo",
      title: "Gran Turismo",
      path: "/movies/granturismo",
    },
    {
      src: "/Elemental.jpg",
      alt: "Elemental",
      title: "Elemental",
      path: "/movies/elemental",
    },
  ];

  const comingSoonData = [
    { src: "/Coco.jpg", alt: "Coco", title: "Coco", path: "/movies/coco" },
    {
      src: "/ToyStory.jpg",
      alt: "Toy Story",
      title: "Toy Story",
      path: "/movies/toystory",
    },
    {
      src: "/FrozeII.jpg",
      alt: "Frozen II",
      title: "Frozen II",
      path: "/movies/frozen2",
    },
    { src: "/Wish.jpg", alt: "Wish", title: "Wish", path: "/movies/wish" },
    {
      src: "/TheIncredibles.jpg",
      alt: "The Incredibles",
      title: "The Incredibles",
      path: "/movies/incredibles",
    },
    {
      src: "/Ratatouille.jpg",
      alt: "Ratatouille",
      title: "Ratatouille",
      path: "/movies/ratatouille",
    },
  ];

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
    if (navRef.current) {
      const height = navRef.current.offsetHeight;
      setNavHeight(height);
    }
  }, []);

  return (
    <Box bg={bg} color="white" minHeight="100vh" pt="4rem">
      <Box
        position="relative"
        width="100%"
        height={{ base: "60vh", lg: `calc(100vh - ${navHeight}px)` }} // 小屏幕上设置成60vh
      >
        <VideoPlayer style={{ width: "100%", height: "100%" }} />
      </Box>
      <Box minHeight="50px" />
      <Flex
        justify="center"
        mt={12}
        mb={8}
        ref={navRef}
        direction={{ base: "column", lg: "row" }} // 小屏幕上纵向排列
        alignItems={{ base: "center", lg: "unset" }} // 小屏幕上标签居中
      >
        <ButtonHome
          onClick={() => setShowNowPlaying(true)}
          bg={showNowPlaying ? buttonActiveBg : buttonBg}
          color={showNowPlaying ? buttonTextColor : buttonInactiveTextColor}
          _hover={{ bg: buttonHoverBg }}
          _focus={{ boxShadow: buttonFocusBoxShadow }}
          label="現正熱映"
          mb={{ base: 4, lg: 0 }} // 小屏幕上添加底部外边距
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
