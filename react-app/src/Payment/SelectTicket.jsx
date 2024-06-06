import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import "./payment.css";

const SelectTicket = ({ movieInfomation, ticketTypes }) => {
  const isLargeScreen = useMediaQuery({ query: "(min-width: 768px)" });

  const [ticketCounts, setTicketCounts] = useState({
    adult: 0,
    child: 0,
    student: 0,
    bonus: 0,
  });

  const bonusTicketPrice = 0;

  const subTotalPrice =
    ticketTypes.reduce((total, ticket) => {
      return total + ticketCounts[ticket.type] * ticket.price;
    }, 0) +
    ticketCounts.bonus * bonusTicketPrice;

  const bookingFee =
    ticketTypes.reduce((total, ticket) => {
      return total + Math.floor(ticketCounts[ticket.type] * ticket.price * 0.1);
    }, 0) + Math.floor(ticketCounts.bonus * bonusTicketPrice * 0.1);

  const totalCount =
    ticketTypes.reduce((total, ticket) => {
      return total + ticketCounts[ticket.type];
    }, 0) + ticketCounts.bonus;

  const totalPrice = subTotalPrice + bookingFee;

  const handleAddTicket = (type) => {
    if (totalCount < movieInfomation.seat.length) {
      setTicketCounts((prevCounts) => ({
        ...prevCounts,
        [type]: prevCounts[type] + 1,
      }));
    }
  };

  const handleMinusTicket = (type) => {
    setTicketCounts((prevCounts) => ({
      ...prevCounts,
      [type]: Math.max(prevCounts[type] - 1, 0),
    }));
  };

  return (
    <Container className="my-4">
      <h2 className="text-center">選擇電影票</h2>
      <div
        className={
          isLargeScreen ? "ticket-counter-m mb-3" : "ticket-counter-sm mb-3"
        }
      >
        已選擇 {totalCount} / {movieInfomation.seat.length} 張票
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
              <tr key={ticket.type}>
                <td>{ticket.label}</td>
                <td>${ticket.price}</td>
                <td>
                  <button
                    className={
                      ticketCounts[ticket.type] === 0
                        ? "count-button-disabled"
                        : "count-button"
                    }
                    onClick={() => handleMinusTicket(ticket.type)}
                  >
                    -
                  </button>
                  <span className={isLargeScreen ? "mx-2" : null}>
                    {ticketCounts[ticket.type]}
                  </span>
                  <button
                    className={
                      totalCount === movieInfomation.seat.length
                        ? "count-button-disabled"
                        : "count-button"
                    }
                    onClick={() => handleAddTicket(ticket.type)}
                  >
                    +
                  </button>
                </td>
                <td>${ticketCounts[ticket.type] * ticket.price}</td>
              </tr>
            ))}
            <tr>
              <td>紅利點數</td>
              <td>2500點</td>
              <td>
                <button
                  className={
                    ticketCounts.bonus === 0
                      ? "count-button-disabled"
                      : "count-button"
                  }
                  onClick={() => handleMinusTicket("bonus")}
                >
                  -
                </button>
                <span className={isLargeScreen ? "mx-2" : null}>
                  {ticketCounts.bonus}
                </span>
                <button
                  className={
                    totalCount === movieInfomation.seat.length
                      ? "count-button-disabled"
                      : "count-button"
                  }
                  onClick={() => handleAddTicket("bonus")}
                >
                  +
                </button>
              </td>
              <td>${ticketCounts.bonus * bonusTicketPrice}</td>
            </tr>
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
    </Container>
  );
};

SelectTicket.propTypes = {
  movieInfomation: PropTypes.shape({
    theaterName: PropTypes.string.isRequired,
    movieName: PropTypes.string.isRequired,
    movieImage: PropTypes.string.isRequired,
    showTime: PropTypes.string.isRequired,
    screen: PropTypes.string.isRequired,
    seat: PropTypes.arrayOf(PropTypes.string).isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  ticketTypes: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default SelectTicket;
