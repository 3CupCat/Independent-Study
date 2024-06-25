import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Alert,
  Modal,
  Toast,
} from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BookingContext } from "../Context/BookingContext";
import "./order.css";
import Cookies from 'js-cookie';

const SelectTicket = () => {
  const { movieId } = useParams();
  const {
    bookingData,
    updateBookingData,
    addTicketTypeId,
    removeTicketTypeId,
  } = useContext(BookingContext);
  const isLargeScreen = useMediaQuery({ query: "(min-width: 768px)" });
  const navigate = useNavigate();

  const [ticketTypes, setTicketTypes] = useState([]);
  const [ticketCounts, setTicketCounts] = useState({});
  const [ticketToRemove, setTicketToRemove] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const fetchTicketTypeDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/booking/${movieId}/order`
        );
        const data = response.data;
        setTicketTypes(data);

        const initialCounts = data.reduce((counts, ticket) => {
          counts[ticket.ticketType] = 0;
          return counts;
        }, {});
        setTicketCounts(initialCounts);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      }
    };

    fetchTicketTypeDetail();
  }, [movieId]);

  useEffect(() => {
    if (ticketToRemove !== null) {
      removeTicketTypeId(ticketToRemove);
      setTicketToRemove(null);
    }
  }, [ticketToRemove, removeTicketTypeId]);

  const subTotalPrice = ticketTypes.reduce((total, ticket) => {
    return total + ticketCounts[ticket.ticketType] * ticket.unitPrice;
  }, 0);

  const bookingFee = ticketTypes.reduce((total, ticket) => {
    return (
      total +
      Math.floor(ticketCounts[ticket.ticketType] * ticket.unitPrice * 0.1)
    );
  }, 0);

  const totalCount = ticketTypes.reduce((total, ticket) => {
    return total + ticketCounts[ticket.ticketType];
  }, 0);

  const totalPrice = subTotalPrice + bookingFee;

  const handleAddTicket = (ticket) => {
    if (totalCount < bookingData.seatStatusId.length) {
      setTicketCounts((prevCounts) => ({
        ...prevCounts,
        [ticket.ticketType]: prevCounts[ticket.ticketType] + 1,
      }));
      addTicketTypeId(ticket.id);
    }
  };

  const handleMinusTicket = (ticket) => {
    const newCount = Math.max(ticketCounts[ticket.ticketType] - 1, 0);
    if (newCount < ticketCounts[ticket.ticketType]) {
      removeTicketTypeId(ticket.id);
    }
    setTicketCounts((prevCounts) => ({
      ...prevCounts,
      [ticket.ticketType]: newCount,
    }));
  };

  const isLogin = async () => {
    try {
      const token = Cookies.get('token');
      return !!token;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleSendOrder = async () => {
    // 防止重複提交
    if (toastMessage !== "") {
      setShowModal(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `http://localhost:8080/booking/${movieId}/order`,
        bookingData
      );

      if (response.data) {
        setToastMessage("正在為您導轉至付款頁面...");
        setShowToast(true);
        setTimeout(() => {
          const newWindow = window.open();
          newWindow.document.open();
          newWindow.document.write(response.data);
          newWindow.document.close();
          navigate("/member");
        }, 3000);
      } else {
        setToastMessage("正在為您導轉至歷史訂單...");
        setShowToast(true);
        setTimeout(() => {
          navigate("/member");
        }, 3000);
      }

      console.log(response.data); // 在這裡處理後端的回應
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        setError("訂單提交失敗，請稍後再試。");
        console.log(error.request);
      } else {
        setError("訂單提交失敗，請稍後再試。");
        console.log("Error", error.message);
      }
      console.log(error.config);
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  const handleOrderConfirmation = async () => {
    const loggedIn = await isLogin();
    if (loggedIn) {
      setShowModal(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleRedirect = () => {
    navigate("/login");
  };

  return (
    <Container className="my-4">
      <h2 className="text-center">選擇電影票</h2>
      <div
        className={
          isLargeScreen ? "ticket-counter-m mb-3" : "ticket-counter-sm mb-3"
        }
      >
        已選擇 {totalCount} / {bookingData.seatStatusId.length} 張票
      </div>
      <div className="wrap mb-3">
        <table>
          <thead>
            <tr>
              <th>票種</th>
              <th>單價</th>
              <th>數量</th>
              <th>小計</th>
            </tr>
          </thead>
          <tbody>
            {ticketTypes.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.ticketType}</td>
                <td>
                  {ticket.ticketType === "紅利點數"
                    ? "250點"
                    : `$${ticket.unitPrice}`}
                </td>
                <td>
                  <button
                    className={
                      ticketCounts[ticket.ticketType] === 0
                        ? "count-button-disabled"
                        : "count-button"
                    }
                    onClick={() => handleMinusTicket(ticket)}
                  >
                    -
                  </button>
                  <span className={isLargeScreen ? "mx-2" : null}>
                    {ticketCounts[ticket.ticketType]}
                  </span>
                  <button
                    className={
                      totalCount === bookingData.seatStatusId.length
                        ? "count-button-disabled"
                        : "count-button"
                    }
                    onClick={() => handleAddTicket(ticket)}
                  >
                    +
                  </button>
                </td>
                <td>${ticketCounts[ticket.ticketType] * ticket.unitPrice}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="text-s">
                小計
              </td>
              <td>${subTotalPrice}</td>
            </tr>
            <tr>
              <td colSpan="3" className="text-s">
                預訂費 (10%)
              </td>
              <td>${bookingFee}</td>
            </tr>
            <tr>
              <td colSpan="3" className="text-s">
                總計
              </td>
              <td>${totalPrice}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row className="d-flex justify-content-center my-4">
        <Col sm={4} md={4} lg={3}>
          <Button
            variant="outline-light"
            className="w-100"
            onClick={handleOrderConfirmation}
            disabled={loading}
          >
            {loading ? <Spinner animation="border" size="sm" /> : "確認訂單"}
          </Button>
        </Col>
      </Row>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        centered={!isLargeScreen}
      >
        <Modal.Header closeButton>
          <Modal.Title className="send-order-modal-title">
            購買票券須知事項
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="send-order-modal-body">
          這裡顯示購買票券須知事項的內容。Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Praesentium earum molestias recusandae, iusto
          dolorum debitis harum laudantium non itaque similique eum
          exercitationem dignissimos aperiam nam. Aliquid dolores itaque
          asperiores beatae.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            取消
          </Button>
          <Button variant="primary" onClick={handleSendOrder}>
            確認
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        backdrop="static"
        centered={!isLargeScreen}
      >
        <Modal.Header closeButton>
          <Modal.Title className="send-order-modal-title">
            您還未登入
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="send-order-modal-body">
          快點去登入
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLoginModal(false)}>
            取消
          </Button>
          <Button variant="primary" onClick={handleRedirect}>
          前往登入頁面
          </Button>
        </Modal.Footer>
      </Modal>
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        bg="dark"
        className="send-order-toast"
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </Container>
  );
};

export default SelectTicket;
