import React, { createContext, useState } from "react";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  //以下為初始化
  const [bookingData, setBookingData] = useState({
    theaterId: null,
    theaterName: "",
    address: "",
    showTimeId: null,
    showTime: "",
    screenId: null,
    screenName: "",
    screenClass: "",
    title: "",
    poster: "",
    seatStatusId: [],
    ticketTypeId: [],
  });

  const updateBookingData = (newData) => {
    setBookingData((prevData) => ({ ...prevData, ...newData }));
  };

  const addSeatStatusId = (seatId) => {
    setBookingData((prevData) => ({
      ...prevData,
      seatStatusId: [...prevData.seatStatusId, seatId],
    }));
  };

  const addTicketTypeId = (ticketId) => {
    setBookingData((prevData) => ({
      ...prevData,
      ticketTypeId: [...prevData.ticketTypeId, ticketId],
    }));
  };

  const removeTicketTypeId = (ticketId) => {
    setBookingData((prevData) => {
      const updatedTicketTypeId = [...prevData.ticketTypeId];
      const index = updatedTicketTypeId.lastIndexOf(ticketId);
      if (index !== -1) {
        updatedTicketTypeId.splice(index, 1);
      }
      return { ...prevData, ticketTypeId: updatedTicketTypeId };
    });
  };

  return (
    <BookingContext.Provider
      value={{
        bookingData,
        updateBookingData,
        addSeatStatusId,
        addTicketTypeId,
        removeTicketTypeId,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
