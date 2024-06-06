import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
  Text,
  Flex,
} from "@chakra-ui/react";

const BonusPoints = () => {
  const [points, setPoints] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pointsPerPage = 10;

  useEffect(() => {
    // 插入假資料
    const fakePoints = Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      date: `2023-01-${String(i + 1).padStart(2, "0")}`,
      points: (i + 1) * 10,
      description: `Description for bonus point ${i + 1}`,
    }));
    setPoints(fakePoints);
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

  const indexOfLastPoint = currentPage * pointsPerPage;
  const indexOfFirstPoint = indexOfLastPoint - pointsPerPage;
  const currentPoints = points.slice(indexOfFirstPoint, indexOfLastPoint);

  const totalPages = Math.ceil(points.length / pointsPerPage);

  return (
    <Box
      width="100%"
      maxWidth="800px"
      margin="0 auto"
      padding="20px"
      boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
      backgroundColor="#fff"
      borderRadius="8px"
    >
      <Text
        as="h2"
        color={"black"}
        textAlign="center"
        fontSize="24px"
        marginBottom="20px"
      >
        紅利點數
      </Text>
      <Box maxHeight="400px" overflowY="auto">
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>編號</Th>
              <Th>日期</Th>
              <Th>點數</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentPoints.map((point) => (
              <Tr
                key={point.id}
                onClick={() => handleShowModal(point)}
                _hover={{ cursor: "pointer", backgroundColor: "#f5f5f5" }}
              >
                <Td>{point.id}</Td>
                <Td>{point.date}</Td>
                <Td>{point.points}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Flex justifyContent="center" marginTop="20px">
        <Button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          margin="0 2px"
        >
          First
        </Button>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          margin="0 2px"
        >
          Prev
        </Button>
        {[...Array(totalPages).keys()].map((number) => (
          <Button
            key={number + 1}
            onClick={() => handlePageChange(number + 1)}
            isActive={number + 1 === currentPage}
            margin="0 2px"
          >
            {number + 1}
          </Button>
        ))}
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          margin="0 2px"
        >
          Next
        </Button>
        <Button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          margin="0 2px"
        >
          Last
        </Button>
      </Flex>

      {selectedPoint && (
        <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered>
          <ModalOverlay />
          <ModalContent maxWidth="350px" maxHeight="400px">
            <ModalHeader color="black">紅利點數詳細資料</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text color="black">
                <strong>編號:</strong> {selectedPoint.id}
              </Text>
              <Text color="black">
                <strong>日期:</strong> {selectedPoint.date}
              </Text>
              <Text color="black">
                <strong>點數:</strong> {selectedPoint.points}
              </Text>
              <Text color="black">
                <strong>描述:</strong> {selectedPoint.description}
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={handleCloseModal}>
                關閉
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default BonusPoints;
