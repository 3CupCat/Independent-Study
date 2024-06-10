import Geolocation from "./Geolocation";
import Booking from "./Booking";
import React from "react";
import { Container } from "react-bootstrap";
import "./booking.css";

const BookingLayout = () => {
  return (
    <Container className="booking-container">
      <Geolocation />
      <Booking />
    </Container>
  );
};

export default BookingLayout;
