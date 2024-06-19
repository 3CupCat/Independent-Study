import MovieInfomation from "./MovieInfomation";
import SelectTicket from "./SelectTicket";
import Payment from "./Payment";
import React from "react";
import "./payment.css";

const PaymentLayout = () => {
  const payments = ["Visa", "MasterCard", "JCB", "PayPal", "LinePay"];

  const movieInfomation = {
    theaterName: "台中文心秀泰",
    movieName: "猩球崛起：王國誕生",
    movieImage:
      "https://www.miranewcinemas.com/MiramarApp/Resource/8dc5e37386475be_S.jpg",
    showTime: "May 17, 10:20",
    screen: "丹普廳",
    seat: ["F4", "F5"],
    quantity: 2,
  };

  const ticketTypes = [
    { type: "adult", label: "成人", price: 250 },
    { type: "child", label: "兒童", price: 200 },
    { type: "student", label: "學生", price: 225 },
  ];

  return (
    <>
      <div className="payment-container">
        <MovieInfomation />
        <SelectTicket
          movieInfomation={movieInfomation}
          ticketTypes={ticketTypes}
        />
        <Payment payments={payments} />
      </div>
    </>
  );
};

export default PaymentLayout;
