import SelectCity from "./SelectCity";
import Geolocation from "./Geolocation";
import SelectTheater from "./SelectTheater";
import SelectDate from "./SelectDate";
import SelectShow from "./SelectShow";
import FormAttribute from "./FormAttribute";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "./booking.css";

const BookingLayout = () => {
  const cities = [
    "基隆市",
    "臺北市",
    "新北市",
    "桃園市",
    "新竹市",
    "新竹縣",
    "苗栗縣",
    "臺中市",
    "彰化縣",
    "南投縣",
    "雲林縣",
    "嘉義市",
    "嘉義縣",
    "臺南市",
    "高雄市",
    "屏東縣",
    "宜蘭縣",
    "花蓮縣",
    "臺東縣",
    "澎湖縣",
    "金門縣",
    "連江縣",
  ];

  const theaters = ["基隆秀泰影城", "基隆沒有威秀", "基隆還有哪間影城"];

  const dates = ["Today", "5/20", "5/21", "5/22", "5/23", "5/24", "5/25"];

  const shows = [
    { time: "10:20", screen: 1 },
    { time: "11:20", screen: 3 },
    { time: "12:20", screen: 1 },
    { time: "13:20", screen: 3 },
    { time: "15:20", screen: 1 },
    { time: "16:20", screen: 3 },
    { time: "17:20", screen: 1 },
    { time: "18:20", screen: 3 },
    { time: "19:20", screen: 1 },
  ];

  const [isShowSelected, setIsShowSelected] = useState(false);

  function handleShowSelect(index) {
    setIsShowSelected(index !== null);
  }

  return (
    <Container className="booking-container">
      <Geolocation />
      <SelectCity cities={cities} />
      <SelectTheater theaters={theaters} />
      <SelectDate dates={dates} />
      <SelectShow shows={shows} onShowSelect={handleShowSelect} />
      <FormAttribute isShowSelected={isShowSelected} />
    </Container>
  );
};

export default BookingLayout;
