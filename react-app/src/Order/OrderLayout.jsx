import MovieInfomation from "./MovieInfomation";
import SelectTicket from "./SelectTicket";
import React from "react";
import "./order.css";

const OrderLayout = () => {
  return (
    <>
      <div className="payment-container">
        <MovieInfomation />
        <SelectTicket />
      </div>
    </>
  );
};

export default OrderLayout;
