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

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ordersPerPage = 10;

  useEffect(() => {
    const fakeOrders = Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      date: `2023-01-${String(i + 1).padStart(2, "0")}`,
      total: `$${(i + 1) * 10}`,
      time: "19:00",
      cinema: "Cinema " + ((i % 5) + 1),
      hall: "Hall " + ((i % 3) + 1),
      seats: `A${(i % 10) + 1}, A${(i % 10) + 2}`,
      ticketType: "Standard",
      paymentMethod: "Credit Card",
    }));
    setOrders(fakeOrders);
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleShowModal = (order) => {
    setSelectedOrder(order);
    onOpen();
  };

  const handleCloseModal = () => {
    onClose();
    setSelectedOrder(null);
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <Box
      width="100%"
      p={4}
      boxShadow="md"
      bg="white"
      borderRadius="md"
      color="black"
    >
      <VStack spacing={4} align="center">
        <Text fontSize="2xl" fontWeight="bold">
          歷史訂單
        </Text>
        <Box maxH="400px" overflowY="auto" width="100%">
          <Table variant="striped" colorScheme="gray" size="sm">
            <Thead>
              <Tr>
                <Th>訂單號</Th>
                <Th>日期</Th>
                <Th>總金額</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentOrders.map((order) => (
                <Tr
                  key={order.id}
                  onClick={() => handleShowModal(order)}
                  _hover={{ cursor: "pointer", backgroundColor: "gray.100" }}
                >
                  <Td>{order.id}</Td>
                  <Td>{order.date}</Td>
                  <Td>{order.total}</Td>
                </Tr>
              ))}
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
          {[...Array(totalPages).keys()].map((number) => (
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

        {selectedOrder && (
          <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered>
            <ModalOverlay />
            <ModalContent maxWidth="400px" maxHeight="500px">
              <ModalHeader>訂單詳細資料</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text color="black">
                  <strong>訂單號:</strong> {selectedOrder.id}
                </Text>
                <Text color="black">
                  <strong>日期:</strong> {selectedOrder.date}
                </Text>
                <Text color="black">
                  <strong>時間:</strong> {selectedOrder.time}
                </Text>
                <Text color="black">
                  <strong>電影院:</strong> {selectedOrder.cinema}
                </Text>
                <Text color="black">
                  <strong>廳:</strong> {selectedOrder.hall}
                </Text>
                <Text color="black">
                  <strong>座位:</strong> {selectedOrder.seats}
                </Text>
                <Text color="black">
                  <strong>票種:</strong> {selectedOrder.ticketType}
                </Text>
                <Text color="black">
                  <strong>付款方式:</strong> {selectedOrder.paymentMethod}
                </Text>
                <Text color="black">
                  <strong>總金額:</strong> {selectedOrder.total}
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
      </VStack>
    </Box>
  );
};

export default OrderHistory;
