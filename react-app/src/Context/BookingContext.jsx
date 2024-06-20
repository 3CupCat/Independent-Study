import React, { createContext, useState } from "react";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  //以下為初始化
  // const [bookingData, setBookingData] = useState({
  //   theaterId: null,
  //   theaterName: "",
  //   address: "",
  //   showTimeId: null,
  //   showTime: "",
  //   screenId: null,
  //   screenName: "",
  //   screenClass: "",
  //   title: "",
  //   poster: "",
  //   seatStatusId: [],
  //   ticketTypeId: [],
  // });

  //測試用假資料
  const [bookingData, setBookingData] = useState({
    theaterId: 1,
    theaterName: "台中文心秀泰",
    address: "台中市南屯區文心南路289號7樓8樓",
    showTimeId: 1,
    showTime: "2024-06-18 18:00:00",
    screenId: 1,
    screenName: "丹普廳",
    screenClass: "2D",
    title: "猩球崛起：王國誕生",
    poster:
      "https://www.miranewcinemas.com/MiramarApp/Resource/8dc5e37386475be_S.jpg",
    seatStatusId: ["1排10號", "1排11號"],
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
      value={{ bookingData, updateBookingData, addSeatStatusId, addTicketTypeId, removeTicketTypeId }}
    >
      {children}
    </BookingContext.Provider>
  );
};
