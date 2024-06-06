import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import Seat from './Seat'; // 視需要引入Seat組件
import { Container, Row, Col, Button } from "react-bootstrap";

import MovieInfomation from './SeatMovieInfomation';


const SeatSelector = ({ seats, toggleSeat }) => {
  const handleSubmit = () => {
    const selectedSeatDetails = seats.flat().filter(seat => seat.status === 'selected').map(seat => ({
      row: seat.row,
      col: seat.col,
      status: seat.status,
      cinema: seat.cinema,
      movieName: seat.movieName,
    }));
    console.log(JSON.stringify(selectedSeatDetails));
  };


  return (
    // <>
    //   {seats.map((seat, index) => (
    //     <Seat key={index} seat={seat} toggleSeat={toggleSeat} />
    //   ))}
    //   <button onClick={handleSubmit}>Submit</button>
    // </>
    <>
     <Container>
        <Row className="justify-content-center mb-3">
          <Col xs="auto" className="text-center">
            <div className="color-square bg-danger"></div>
            <p className="color-square-p">已選取</p>
          </Col>
          <Col xs="auto" className="text-center">
            <div className="color-square bg-secondary"></div>
            <p className="color-square-p">不可選取</p>
          </Col>
        </Row>
        <Row className="justify-content-center mb-4">
          <Col xs={12} className="text-center">
            <div className="screen-indicator">螢幕</div>
          </Col>
        </Row>
        
    <div className="horizontal-scroll">
      <div className="seat-container">
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {row.map((seat, index) => (
              <div key={index} >
                <Seat seat={seat} toggleSeat={toggleSeat} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
        {/* <Row className="justify-content-center mt-3">
            <h5 className="centered-white-textchoose">choose：</h5>
          <Col xs="auto">
            <div className="selected-seats">
              {selectedSeats.map((seat, index) => (
                <div key={index} className="selected-seat">
                   {seat.row}排,  {seat.col}號
                </div>
              ))}
            </div>
          </Col>
        </Row> */}
        <Row className="justify-content-center mt-3">
          <Col xs="auto">
            <Button onClick={handleSubmit}>Submit</Button>
          </Col>
        </Row>
      </Container>
    
    </>
  );
};

export default SeatSelector;