import MovieInfomation from "./SeatMovieInfomation";
import React from "react";
import SeatSelector from "./SeatSelector";
import './SeatLayout.css';
import { useState, useEffect } from 'react';

// import SeatSelector from "./SeatSelector";



const SeatLayout = () => {
  
   
  
  const initialSeats = [ 
    [
      { row: 1, col: 1, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
      { row: 1, col: 2, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
      { row: 1, col: 3, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
      { row: 1, col: 4, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
      { row: 1, col: 5, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
      { row: 1, col: 6, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
      { row: 1, col: 7, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
      { row: 1, col: 8, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
      { row: 1, col: 9, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
      { row: 1, col: 10, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
      { row: 1, col: 11, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
      { row: 1, col: 12, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
      { row: 1, col: 13, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
      { row: 1, col: 14, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },

  ],
  [
    { row: 2, col: 1, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 2, col: 2, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 2, col: 3, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 2, col: 4, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 2, col: 5, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 2, col: 6, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 2, col: 7, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 2, col: 8, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 2, col: 9, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 2, col: 10, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 2, col: 11, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 2, col: 12, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 2, col: 13, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 2, col: 14, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 2, col: 15, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },

  ],
  [
    { row: 3, col: 1, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 3, col: 2, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 3, col: 1, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 3, col: 2, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 3, col: 3, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 3, col: 4, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 3, col: 5, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 3, col: 6, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
   
  ],
  [
    { row: 4, col: 1, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 4, col: 2, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 4, col: 3, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 4, col: 4, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 4, col: 5, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 4, col: 6, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 4, col: 7, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 4, col: 8, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 4, col: 9, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 4, col: 10, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
  ],
  [
    { row: 5, col: 1, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 5, col: 2, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 5, col: 3, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 5, col: 4, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 5, col: 5, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 5, col: 6, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 5, col: 7, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 5, col: 8, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 5, col: 9, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 5, col: 10, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 5, col: 11, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 5, col: 12, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 5, col: 13, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 5, col: 14, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 5, col: 15, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 5, col: 16, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 5, col: 17, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 5, col: 18, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 5, col: 19, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 5, col: 20, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 5, col: 21, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 5, col: 22, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 5, col: 23, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 5, col: 24, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 5, col: 25, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 5, col: 26, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 5, col: 27, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 5, col: 28, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 5, col: 29, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 5, col: 30, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 5, col: 31, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 5, col: 32, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 5, col: 33, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 5, col: 34, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 5, col: 35, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 6, col: 36, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
  ],
  [
    { row: 6, col: 1, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 6, col: 2, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 6, col: 3, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 6, col: 4, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 6, col: 5, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 6, col: 6, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 6, col: 7, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 6, col: 8, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 6, col: 9, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 6, col: 10, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 6, col: 11, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 6, col: 12, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 6, col: 13, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 6, col: 14, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 6, col: 15, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 6, col: 16, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 6, col: 17, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 6, col: 18, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 6, col: 19, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 6, col: 20, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 6, col: 21, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 6, col: 22, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 6, col: 23, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 6, col: 24, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 6, col: 25, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 6, col: 26, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 6, col: 27, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 6, col: 28, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 6, col: 29, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 6, col: 30, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 6, col: 31, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 6, col: 32, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 6, col: 33, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 6, col: 34, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 6, col: 35, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
    { row: 6, col: 36, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
  ] 
];
const [seats, setSeats] = useState([]);
const [selectedSeats, setSelectedSeats] = useState([]);

useEffect(() => {
  // 模拟API调用
  setTimeout(() => {
    const fetchedSeats = [
      [
        { row: 1, col: 1, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 1, col: 2, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 1, col: 3, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 1, col: 4, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 1, col: 5, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 1, col: 6, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 1, col: 7, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 1, col: 8, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 1, col: 9, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 1, col: 10, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 1, col: 11, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 1, col: 12, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 1, col: 13, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 1, col: 14, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
      ],
      [
        { row: 2, col: 1, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 2, col: 2, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 2, col: 3, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 2, col: 4, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 2, col: 5, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 2, col: 6, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 2, col: 7, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 2, col: 8, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 2, col: 9, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 2, col: 10, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 2, col: 11, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 2, col: 12, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 2, col: 13, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 2, col: 14, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 2, col: 15, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
      ],
      [
        { row: 3, col: 1, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 3, col: 2, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 3, col: 3, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 3, col: 4, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 3, col: 5, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 3, col: 6, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 3, col: 7, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 3, col: 8, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 3, col: 9, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 3, col: 10, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 3, col: 11, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 3, col: 12, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },

      ],
      [
        { row: 4, col: 1, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 4, col: 2, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 4, col: 3, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 4, col: 4, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 4, col: 5, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 4, col: 6, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 4, col: 7, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 4, col: 8, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 4, col: 9, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 4, col: 10, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 4, col: 11, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 4, col: 12, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },


      ],
      [
        { row: 5, col: 1, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 5, col: 2, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 5, col: 3, status:'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 5, col: 4, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 5, col: 5, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 5, col: 6, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 5, col: 7, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 5, col: 8, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 5, col: 9, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 5, col: 10, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 5, col: 11, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 5, col: 12, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 5, col: 13, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 5, col: 14, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 5, col: 15, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 5, col: 16, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 5, col: 17, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 5, col: 18, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 5, col: 19, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 5, col: 20, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 5, col: 21, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 5, col: 22, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 5, col: 23, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 5, col: 24, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 5, col: 25, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 5, col: 26, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 5, col: 27, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 5, col: 28, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 5, col: 29, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 5, col: 30, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 5, col: 31, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 5, col: 32, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 5, col: 33, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 5, col: 34, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 5, col: 35, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 6, col: 36, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
      ],
      [
        { row: 6, col: 1, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 6, col: 2, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 6, col: 3, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 6, col: 4, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 6, col: 5, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 6, col: 6, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 6, col: 7, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 6, col: 8, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 6, col: 9, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 6, col: 10, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 6, col: 11, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 6, col: 12, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 6, col: 13, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 6, col: 14, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 6, col: 15, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 6, col: 16, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 6, col: 17, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 6, col: 18, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 6, col: 19, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 6, col: 20, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 6, col: 21, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 6, col: 22, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 6, col: 23, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 6, col: 24, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 6, col: 25, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 6, col: 26, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 6, col: 27, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 6, col: 28, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 6, col: 29, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 6, col: 30, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 6, col: 31, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 6, col: 32, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 6, col: 33, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 6, col: 34, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 6, col: 35, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 6, col: 36, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
      ],
      [
        { row: 7, col: 1, status:'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 7, col: 2, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 7, col: 3, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 7, col: 4, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 7, col: 5, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 7, col: 6, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 7, col: 7, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 7, col: 8, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 7, col: 9, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 7, col: 10, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 7, col: 11, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 7, col: 12, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 7, col: 13, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
      ],
      [
        { row: 8, col: 1, status:'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 8, col: 2, status:'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 8, col: 3, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 8, col: 4, status:'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 8, col: 5, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 8, col: 6, status:'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 8, col: 7, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 8, col: 8, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 8, col: 9, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 8, col: 10, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 8, col: 11, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 8, col: 12, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 8, col: 13, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
      ],
      [
        { row: 9, col: 1, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 9, col: 2, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 9, col: 3, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 9, col: 4, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 9, col: 5, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 9, col: 6, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 9, col: 7, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 9, col: 8, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 9, col: 9, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 9, col: 10, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 9, col: 11, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 9, col: 12, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 9, col: 13, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 9, col: 14, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },

      ],
      [
        { row: 10, col: 1, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 2, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 3, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 4, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 5, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 6, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 7, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 8, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 9, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 10, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 11, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 12, status: 'unavailable', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 13, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 14, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },





      ],
      [
        { row: 10, col: 1, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 2, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 3, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 4, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 5, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 6, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
      ],
      [
        { row: 10, col: 1, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 2, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 3, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 4, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 5, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 6, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
      ],
      [
        { row: 10, col: 1, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 2, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 3, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 4, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 5, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 6, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
      ],
      [
        { row: 10, col: 1, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 2, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 3, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 4, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 5, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 6, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
      ],
      [
        { row: 10, col: 1, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 2, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 3, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 4, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 5, status: 'empty', cinema: 'AMC Theatres', movieName: 'The Godfather' },
        { row: 10, col: 6, status: 'reserved', cinema: 'AMC Theatres', movieName: 'The Godfather' },
      ],

    ];

    setSeats(fetchedSeats);  // 设置获取到的座位数据
  }, 2000);  // 2秒钟后模拟完成API调用
}, []);
















const toggleSeat = (seatToToggle) => {
  const newSeatsArray = seats.map(rowSeats =>
    rowSeats.map(seat => {
      if (seat.row === seatToToggle.row && seat.col === seatToToggle.col) {
        switch (seat.status) {
          case 'empty':
            if (selectedSeats.length < 6) {
              return { ...seat, status: 'selected' };
            } else {
              alert("You can't select more than 6 seats!");
              return seat;
            }
          case 'selected':
            return { ...seat, status: 'empty' };
          case 'reserved':
          case 'unavailable':
            return seat;
          default:
            return seat;
        }
      }
      return seat;
    })
  );
// 定义切换座位状态的函数
// const toggleSeat = (seatToToggle) => {
//   let newSeatsArray = seats.map(row_Seats => {
//     return row_Seats.map(seat => {
//       if (seat.row === seatToToggle.row && seat.col === seatToToggle.col) {
//         let newSeat;
//         switch (seat.status) {
//           case "empty":
//             if (selectedSeats.length < 6)
//               newSeat = { ...seat, status: 'selected' };
//             else {
//                 alert("You can't select more than 6 seats!");
//                 newSeat = seat;
//               }
//               break;
//             case "selected":
//               newSeat = { ...seat, status: 'empty' };
//               break;
//             case "unavailable":
//               newSeat = seat;
//               break;
//               default:
//                 newSeat = seat;
//                 break;
//               }
//               return newSeat;
//             }
//             return seat;
//           });
//         });
        
        // setSeats(newSeatsArray);
        // setSelectedSeats(newSeatsArray.flat().filter(seat => seat.status === "selected"));
        const newSelectedSeats = newSeatsArray.flat().filter(seat => seat.status === "selected");
          setSeats(newSeatsArray);
          setSelectedSeats(newSelectedSeats);
      };
      
      
      const movieInfomation = {
        theaterName: "台中文心秀泰",
        movieName: "猩球崛起：王國誕生",
        movieImage:
          "https://www.miranewcinemas.com/MiramarApp/Resource/8dc5e37386475be_S.jpg",
        showTime: "May 17, 10:20",
        screen: "丹普廳",
        seat: selectedSeats.map(seat => `${seat.row}排, ${seat.col}號`),
        quantity: selectedSeats.length,
      };
      return (
        <>
      <div className="bb">
          <MovieInfomation movieInfomation={movieInfomation} />
          <SeatSelector seats={seats} toggleSeat={toggleSeat} />
      </div>
      
      
    </>
  );
};

export default SeatLayout;
