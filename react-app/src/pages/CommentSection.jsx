import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faHeart,
  faHeartCrack,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import {
  Box,
  Image,
  Text,
  Flex,
  Progress,
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  HStack,
  Divider,
  Avatar,
  IconButton,
} from "@chakra-ui/react";

// Rating Function Component
const Rating = () => {
  const [messages, setMessages] = useState([
    {
      user: "三杯鴨",
      time: "2024/06/29 15:21:13",
      rating: 5,
      message: "非常好看，讓我想起了被猩猩支配的恐懼！",
      likeCount: 1000,
      crackCount: 100,
    },
  ]);
  const [ratingStats, setRatingStats] = useState({
    1: 2,
    2: 20,
    3: 15,
    4: 20,
    5: 120,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [review, setReview] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isReportOpen,
    onOpen: onReportOpen,
    onClose: onReportClose,
  } = useDisclosure();

  const handleStarClick = (star) => {
    setRating(star);
  };

  const handleLikeClick = (index) => {
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      updatedMessages[index] = {
        ...updatedMessages[index],
        likeCount: (updatedMessages[index].likeCount || 0) + 1,
      };
      return updatedMessages;
    });
  };

  const handleCrackClick = (index) => {
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      updatedMessages[index] = {
        ...updatedMessages[index],
        crackCount: (updatedMessages[index].crackCount || 0) + 1,
      };
      return updatedMessages;
    });
  };

  const handleMessageSubmit = (messageData) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { ...messageData, likeCount: 0, crackCount: 0 },
    ]);
    setRatingStats((prevStats) => ({
      ...prevStats,
      [messageData.rating]: prevStats[messageData.rating] + 1,
    }));
  };

  const calculatePercentages = () => {
    const totalRatings = Object.values(ratingStats).reduce(
      (sum, count) => sum + count,
      0
    );
    if (totalRatings === 0) return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    const percentages = {};
    for (let i = 1; i <= 5; i++) {
      percentages[i] = ((ratingStats[i] / totalRatings) * 100).toFixed(2);
      percentages[i] = parseFloat(percentages[i]);
    }
    return percentages;
  };

  const calculateAverageRating = () => {
    const totalRating = messages.reduce((sum, msg) => sum + msg.rating, 0);
    const totalMessages = messages.length;
    if (totalMessages === 0) return "";

    return (totalRating / totalMessages).toFixed(1);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    onClose();
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = () => {
    const currentTime = new Date();
    if (rating < 1) {
      alert("評分星數最低為一顆星");
      return;
    }
    handleMessageSubmit({ message, rating, time: currentTime });
    setMessage("");
    setRating(0);
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <FontAwesomeIcon
        key={star}
        icon={faStar}
        style={{
          color: star <= rating ? "#FFD700" : "#d3d3d3",
          cursor: "pointer",
        }}
        onClick={() => handleStarClick(star)}
      />
    ));
  };

  const percentages = calculatePercentages();
  const averageRating = calculateAverageRating();

  return (
    <Box bg="gray.800" color="white" p={5}>
      <Flex>
        <Image
          src="/comment1.jpg"
          alt="movie1"
          boxSize="600px"
          objectFit="cover"
          mt={10}
        />
        <Box ml={6} flex="1">
          <Text fontSize="4xl" mt={10}>
            猩球崛起：王國誕生
          </Text>
          <HStack align="flex-start" mt={4} spacing={6}>
            <VStack align="center" spacing={2} mt={1} ms={7} me={6}>
              <Text fontSize="6xl">{averageRating || "3.7"}</Text>
              <Flex>
                {[1, 2, 3, 4, 5].map((star) => (
                  <FontAwesomeIcon
                    key={star}
                    icon={faStar}
                    style={{
                      color:
                        star <= Math.round(averageRating)
                          ? "#FFD700"
                          : "#d3d3d3",
                    }}
                  />
                ))}
              </Flex>
              <Text>2000 則評論</Text>
            </VStack>
            <VStack align="flex-start" spacing={0} w="80%">
              {[5, 4, 3, 2, 1].map((star) => (
                <HStack key={star} align="center" w="full" spacing={0}>
                  <Text w="10%" ms={5}>
                    {star}
                  </Text>
                  <Progress
                    value={percentages[star]}
                    colorScheme={
                      star === 5
                        ? "green"
                        : star === 4
                        ? "blue"
                        : star === 3
                        ? "yellow"
                        : star === 2
                        ? "red"
                        : "gray"
                    }
                    size="lg"
                    w="80%"
                  />
                  <Text w="10%" ms={2}>
                    {percentages[star]}%
                  </Text>
                </HStack>
              ))}
            </VStack>
          </HStack>
          <Divider orientation="horizontal" borderColor="gray.500" mt={8} />
          <Flex mt={4}>
            <Button colorScheme="blue" mr={3}>
              現正熱映
            </Button>
            <Button colorScheme="blue">大多好評</Button>
          </Flex>
        </Box>
      </Flex>
      <Box bg="gray.800" color="white" p={5} borderRadius="md" w="full" mt={10}>
        <VStack align="flex-start" spacing={4}>
          <Text fontSize="2xl">我的評價</Text>
          <HStack spacing={2}>
            {[1, 2, 3, 4, 5].map((star) => (
              <FontAwesomeIcon
                key={star}
                icon={faStar}
                style={{
                  color: star <= rating ? "#FFD700" : "#d3d3d3",
                  cursor: "pointer",
                }}
                onClick={() => handleStarClick(star)}
              />
            ))}
          </HStack>
          <Flex w="full" align="center" bg="gray.700" p={2} borderRadius="md">
            <Avatar size="md" src="your-avatar-url.png" mr={4} />
            <Input
              placeholder="撰寫評論"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              bg="white"
              color="black"
              borderRadius="md"
              flex="1"
            />
          </Flex>
          <Button
            alignSelf="flex-end"
            colorScheme="blue"
            onClick={() => console.log("發布評論")}
          >
            發布評論
          </Button>
        </VStack>
        <Divider orientation="horizontal" borderColor="gray.500" mt={12} />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>請先登入</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button colorScheme="blue" onClick={handleLogin}>
              登入
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              關閉
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box mt={5}>
        <Text fontSize="2xl" mb={4}>
          評論區
        </Text>
        {messages.map((msg, index) => (
          <Box key={index} bg="gray.700" p={4} my={3} borderRadius="md">
            <Flex justifyContent="space-between">
              <Flex alignItems="center">
                <Avatar size="md" src="your-avatar-url.png" mr={4} />
                <Box>
                  <HStack>
                    <Text>{msg.user}</Text>
                    <Text>{msg.time}</Text>
                  </HStack>
                  <HStack>
                    {[...Array(5)].map((_, i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        style={{
                          color: i < msg.rating ? "#FFD700" : "#d3d3d3",
                        }}
                      />
                    ))}
                  </HStack>
                </Box>
              </Flex>
              <Flex alignItems="center">
                <IconButton
                  icon={<FontAwesomeIcon icon={faHeart} />}
                  colorScheme="red"
                  variant="ghost"
                  onClick={() => handleLikeClick(index)}
                />
                <Text mx={2}>{msg.likeCount}</Text>
                <IconButton
                  icon={<FontAwesomeIcon icon={faHeartCrack} />}
                  colorScheme="red"
                  variant="ghost"
                  onClick={() => handleCrackClick(index)}
                />
                <Text mx={2}>{msg.crackCount}</Text>
                <IconButton
                  icon={<FontAwesomeIcon icon={faFlag} />}
                  colorScheme="red"
                  variant="ghost"
                />
              </Flex>
            </Flex>
            <Text
              pt={2}
              mt={2}
              border="1px"
              borderColor="gray.600"
              p={3}
              borderRadius="md"
            >
              {msg.message}
            </Text>
          </Box>
        ))}
      </Box>
      <Modal isOpen={isReportOpen} onClose={onReportClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Text>感謝您的檢舉，我們會盡快為您處理</Text>
            <Button mt={3} onClick={onReportClose}>
              關閉
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Rating;
