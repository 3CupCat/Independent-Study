import React from 'react';
import './Seat.css'; // 如果你创建了一些CSS样式
import {Button} from "react-bootstrap";


const Seat = ({ seat, toggleSeat }) => {
    // 根据座位状态分配CSS类名
    const getSeatClass = (status) => {
        switch(status) {
            case 'empty':
                return 'seat empty';
            case 'selected':
                return 'seat selected';
            case 'reserved':
                return 'seat reserved';
            case 'unavailable':
                return 'seat unavailable';
            default:
                return 'seat';
        }
    }
    const handleSeatClick = () => {
        toggleSeat(seat);
    };

    return (
        <button className={getSeatClass(seat.status)} onClick={handleSeatClick}>
             {seat.row},  {seat.col}
        </button>
        
    );
};


export default Seat;