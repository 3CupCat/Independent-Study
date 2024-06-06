import React from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  VStack,
  HStack,
  chakra,
} from "@chakra-ui/react";

const movies = [
  {
    title: "Inception",
    releaseDate: "2010-07-16",
    duration: "148 min",
    image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    synopsis:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
    rating: 4.5,
  },
  {
    title: "Avengers: Endgame",
    releaseDate: "2019-04-26",
    duration: "181 min",
    image: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    synopsis:
      "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more to reverse Thanos' actions and restore balance to the universe.",
    rating: 4.8,
  },
  {
    title: "Interstellar",
    releaseDate: "2014-11-07",
    duration: "169 min",
    image:
      "https://upload.wikimedia.org/wikipedia/zh/thumb/b/be/The_Maze_Runner_poster.jpg/220px-The_Maze_Runner_poster.jpg",
    synopsis:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    rating: 4.6,
  },
  {
    title: "The Dark Knight",
    releaseDate: "2008-07-18",
    duration: "152 min",
    image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    synopsis:
      "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
    rating: 4.9,
  },
  {
    title: "Pulp Fiction",
    releaseDate: "1994-10-14",
    duration: "154 min",
    image:
      "https://upload.wikimedia.org/wikipedia/zh/thumb/b/be/The_Maze_Runner_poster.jpg/220px-The_Maze_Runner_poster.jpg",
    synopsis:
      "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    rating: 4.7,
  },
  {
    title: "The Shawshank Redemption",
    releaseDate: "1994-09-23",
    duration: "142 min",
    image: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    synopsis:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    rating: 4.9,
  },
  {
    title: "Fight Club",
    releaseDate: "1999-10-15",
    duration: "139 min",
    image: "https://image.tmdb.org/t/p/w500/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg",
    synopsis:
      "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
    rating: 4.8,
  },
  {
    title: "Forrest Gump",
    releaseDate: "1994-07-06",
    duration: "142 min",
    image: "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
    synopsis:
      "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal, and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
    rating: 4.8,
  },
  {
    title: "The Matrix",
    releaseDate: "1999-03-31",
    duration: "136 min",
    image:
      "https://upload.wikimedia.org/wikipedia/zh/thumb/b/be/The_Maze_Runner_poster.jpg/220px-The_Maze_Runner_poster.jpg",
    synopsis:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    rating: 4.7,
  },
  {
    title: "The Lord of the Rings: The Return of the King",
    releaseDate: "2003-12-17",
    duration: "201 min",
    image: "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
    synopsis:
      "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    rating: 4.9,
  },
];

const Favorites = () => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <chakra.span key={i} color={i <= rating ? "yellow.500" : "gray.300"}>
          ★
        </chakra.span>
      );
    }
    return stars;
  };

  return (
    <Box width="100%" p={4} maxH="100vh" overflowY="auto">
      <VStack spacing={4} align="center">
        {movies.map((movie, index) => (
          <Flex
            key={index}
            width="100%"
            maxW="700px"
            height="200px"
            mb={4}
            borderWidth="1px"
            borderColor="black"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
          >
            <Image
              src={movie.image}
              alt={movie.title}
              width="160px"
              height="auto"
              objectFit="cover"
            />
            <Box
              p={4}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Text color="black" fontSize="18px" mb={1} fontWeight="bold">
                {movie.title}
              </Text>
              <HStack spacing={1} mb={2}>
                <Text color="black" fontWeight="bold" fontSize="14px">
                  評分:
                </Text>
                {renderStars(movie.rating)}
              </HStack>
              <Text color="black" fontSize="14px" mb={1}>
                <strong>上映時間:</strong> {movie.releaseDate}
              </Text>
              <Text color="black" fontSize="14px" mb={1}>
                <strong>播放時長:</strong> {movie.duration}
              </Text>
              <Text color="black" fontSize="14px" mb={1}>
                <strong>大綱:</strong> {movie.synopsis}
              </Text>
            </Box>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default Favorites;
