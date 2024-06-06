import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Box, Flex, Grid, Text, useColorModeValue } from "@chakra-ui/react";
import MovieData from "../components/MovieData";
import ButtonHome from "../components/Button/ButtonHome";

const Overview = () => {
  const navigate = useNavigate();

  const nowPlayingData = [
    { src: "/Dune.jpg", alt: "Dune", title: "Dune", path: "/movies/:id" },
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
    { src: "/Soul.jpg", alt: "Soul", title: "Soul", path: "/movies/soul" },
  ];

  const comingSoonData = [
    { src: "/Coco.jpg", alt: "Coco", title: "Coco", path: "/movies/coco" },
    {
      src: "/ToyStory.jpg",
      alt: "ToyStory",
      title: "ToyStory",
      path: "/movies/toystory",
    },
    {
      src: "/FrozeII.jpg",
      alt: "FrozeII",
      title: "FrozeII",
      path: "/movies/frozen2",
    },
    { src: "/Wish.jpg", alt: "Wish", title: "Wish", path: "/movies/wish" },
    {
      src: "/TheIncredibles.jpg",
      alt: "TheIncredibles",
      title: "TheIncredibles",
      path: "/movies/incredibles",
    },
    {
      src: "/Ratatouille.jpg",
      alt: "Ratatouille",
      title: "Ratatouille",
      path: "/movies/ratatouille",
    },
  ];

  const [showNowPlaying, setShowNowPlaying] = useState(true);

  const movieData = showNowPlaying ? nowPlayingData : comingSoonData;

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

  return (
    <Box bg={bg} color="white" minHeight="100vh">
      {" "}
      <Box height="80px" />{" "}
      <Box p="4">
        <Flex justifyContent="center" mb="12">
          <ButtonHome
            onClick={() => setShowNowPlaying(true)}
            bg={showNowPlaying ? buttonActiveBg : buttonBg}
            color={showNowPlaying ? buttonTextColor : buttonInactiveTextColor}
            _hover={{ bg: buttonHoverBg }}
            _focus={{ boxShadow: buttonFocusBoxShadow }}
            label="現正熱映"
          />
          <ButtonHome
            onClick={() => setShowNowPlaying(false)}
            bg={showNowPlaying ? buttonBg : buttonActiveBg}
            color={showNowPlaying ? buttonInactiveTextColor : buttonTextColor}
            _hover={{ bg: buttonHoverBg }}
            _focus={{ boxShadow: buttonFocusBoxShadow }}
            label="即將上映"
          />
        </Flex>

        <Box mt="12">
          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(6, 1fr)",
            }}
            gap="6"
            mb="12"
          >
            {movieData.map((movie, index) => (
              <Flex
                key={index}
                direction="column"
                alignItems="center"
                mt={{ base: "6", md: "6", lg: "12" }}
                onClick={() => handleMovieClick(movie.path)}
                cursor="pointer"
              >
                <MovieData
                  src={movie.src}
                  alt={movie.alt}
                  title={movie.title}
                />
                <Text mt="8" textAlign="center" color="white">
                  {movie.title}
                </Text>
              </Flex>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Overview;
