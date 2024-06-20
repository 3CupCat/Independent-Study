import MovieInfomation from "./MovieInfomation";
import SelectTicket from "./SelectTicket";
import React from "react";
import "./payment.css";

const PaymentLayout = () => {
  return (
    <>
      <div className="payment-container">
        <MovieInfomation />
        <SelectTicket />
      </div>
    </>
  );
};

export default PaymentLayout;
