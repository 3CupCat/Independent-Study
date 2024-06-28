import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  Thead,
  VStack,
  Text,
  HStack,
  Button,
  useDisclosure,
  Link,
  Flex,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@chakra-ui/icons";
import axios from "axios";
import Cookies from "js-cookie";

const BonusPoints = () => {
  const [points, setPoints] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pointsPerPage = 10;

  useEffect(() => {
    const fetchBonus = async () => {
      const token = Cookies.get("token");
      if (!token) {
        alert("未找到token，請重新登錄");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:8080/bonus/BonusPoints",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Bonus data:", response.data);
        setPoints(response.data);
      } catch (error) {
        console.error("Error fetching Bonus Point:", error);
        alert("無法獲取紅利點數，請稍後再試");
      }
    };

    fetchBonus();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleShowModal = (point) => {
    setSelectedPoint(point);
    onOpen();
  };

  const handleCloseModal = () => {
    onClose();
    setSelectedPoint(null);
  };

  const formatDate = (dateString) => {
    return dateString.replace(/-/g, "/");
  };

  const indexOfLastPoint = currentPage * pointsPerPage;
  const indexOfFirstPoint = indexOfLastPoint - pointsPerPage;
  const currentPoints = points.slice(indexOfFirstPoint, indexOfLastPoint);

  const totalPages = Math.ceil(points.length / pointsPerPage);

  return (
    <Box
      direction="column"
      h="full"
      justifyContent="center"
      maxW="800px"
      mx="auto"
      p="6"
      boxShadow="lg"
      bg="white"
      borderRadius="md"
      color="black"
    >
      <VStack spacing={4} align="center" height="full">
        <Box maxHeight="full" overflowY="auto" width="100%">
          <Table variant="striped" colorScheme="white" size="sm" height="100%">
            <Thead>
              <Tr>
                <Th
                  color="white"
                  fontSize="18px"
                  textAlign="center"
                  borderTopLeftRadius="md"
                >
                  紅利編號
                </Th>
                <Th color="white" fontSize="18px" textAlign="center">
                  訂單日期
                </Th>
                <Th
                  color="white"
                  fontSize="18px"
                  textAlign="center"
                  borderTopRightRadius="md"
                >
                  點數
                </Th>
              </Tr>
            </Thead>
            <Tbody height="full">
              {points.length === 0 ? (
                <Tr>
                  <Td colSpan="3" height="full">
                    <Flex justify="center" align="center" height="full">
                      <Text
                        color="black"
                        fontSize="24px"
                        fontWeight="bold"
                        mt={3}
                        textAlign="center"
                      >
                        目前沒有紅利點數! 快
                        <Link
                          href="/"
                          color="teal.500"
                          textDecoration="underline"
                        >
                          去蒐集
                        </Link>
                        吧!
                      </Text>
                    </Flex>
                  </Td>
                </Tr>
              ) : (
                currentPoints.map((point) => (
                  <Tr
                    key={point.bonus.id}
                    onClick={() => handleShowModal(point)}
                    _hover={{ cursor: "pointer", backgroundColor: "gray.100" }}
                  >
                    <Td fontSize="16px" textAlign="center">
                      {point.bonus.id}
                    </Td>
                    <Td fontSize="16px" textAlign="center">
                      {formatDate(point.order.orderDate.split(" ")[0])}
                    </Td>
                    <Td fontSize="16px" textAlign="center">
                      {point.bonus.bonus}
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </Box>
        <HStack spacing={2}>
          <Button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            leftIcon={<ArrowLeftIcon />}
          >
            First
          </Button>
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            leftIcon={<ChevronLeftIcon />}
          >
            Prev
          </Button>
          {[...Array(totalPages > 3 ? 3 : totalPages).keys()].map((number) => (
            <Button
              key={number + 1}
              onClick={() => handlePageChange(number + 1)}
              isActive={number + 1 === currentPage}
            >
              {number + 1}
            </Button>
          ))}
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            rightIcon={<ChevronRightIcon />}
          >
            Next
          </Button>
          <Button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            rightIcon={<ArrowRightIcon />}
          >
            Last
          </Button>
        </HStack>

        {selectedPoint && (
          <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered>
            <ModalOverlay />
            <ModalContent textAlign="center">
              <ModalHeader color="black">紅利點數詳細資料</ModalHeader>
              <ModalCloseButton color="black" />
              <ModalBody>
                <Text color="black" fontSize="16px" textAlign="center">
                  <strong>紅利編號:</strong> {selectedPoint.bonus.id}
                </Text>
                <Text color="black" fontSize="16px" textAlign="center">
                  <strong>點數:</strong> {selectedPoint.bonus.bonus}
                </Text>
                <Text color="black" fontSize="16px" textAlign="center">
                  <strong>訂單日期:</strong>{" "}
                  {formatDate(selectedPoint.order.orderDate.split(" ")[0])}
                </Text>
                <Text color="black" fontSize="16px" textAlign="center">
                  <strong>放映日期:</strong>{" "}
                  {formatDate(selectedPoint.showtime.showTime.split(" ")[0])}
                </Text>
                <Text color="black" fontSize="16px" textAlign="center">
                  <strong>電影:</strong> {selectedPoint.movie.title}
                </Text>
                <Text color="black" fontSize="16px" textAlign="center">
                  <strong>戲院:</strong> {selectedPoint.theater.theaterName}
                </Text>
                <Text color="black" fontSize="16px" textAlign="center">
                  <strong>影廳:</strong> {selectedPoint.screen.screenName}
                </Text>
                <Text color="black" fontSize="16px" textAlign="center">
                  <strong>支付方式:</strong> {selectedPoint.payment.payway}
                </Text>
                <Text color="black" fontSize="16px" textAlign="center">
                  <strong>支付狀態:</strong> {selectedPoint.payment.payStatus}
                </Text>
              </ModalBody>
              <ModalFooter>
                {/* <Button variant="ghost" onClick={handleCloseModal}>關閉</Button> */}
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </VStack>
    </Box>
  );
};

export default BonusPoints;
