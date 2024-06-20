import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BookingContext } from "../Context/BookingContext";
import "./payment.css";

const SelectTicket = () => {
  const { movieId } = useParams();
  const { bookingData, addTicketTypeId, removeTicketTypeId } = useContext(BookingContext);
  const isLargeScreen = useMediaQuery({ query: "(min-width: 768px)" });

  const [ticketTypes, setTicketTypes] = useState([]);
  const [ticketCounts, setTicketCounts] = useState({});
  const [ticketToRemove, setTicketToRemove] = useState(null);

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
        console.error("Error fetching ticket types", error);
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

  const handleSendOrder = () => {
    console.log({bookingData});
  }

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
        <div className="wrap">
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
                    {ticket.ticketType === "紅利點數" ? "250點" : `$${ticket.unitPrice}`}
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
        <Row className="d-flex justify-content-center my-4">
          <Col sm={4} md={4} lg={3}>
            <Button variant="outline-light" className="w-100" onClick={handleSendOrder}>
              確認訂單
            </Button>
          </Col>
        </Row>
      </Container>
  );
};

export default SelectTicket;