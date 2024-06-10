import React, { useState, useEffect } from "react";
import { Form, Button, ButtonGroup, Row, Col, Alert } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import "./booking.css";

const Booking = () => {
  const isLargeScreen = useMediaQuery({ query: "(min-width: 768px)" });
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedTheaterId, setSelectedTheaterId] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedShowIndex, setSelectedShowIndex] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [isShowSelected, setIsShowSelected] = useState(false);
  const navigate = useNavigate();

  const showDetail = [
    {
      id: 1,
      theaterName: "臺中大遠百威秀影城",
      address: "台中市西屯區臺灣大道三段251號13樓",
      shows: [
        { showtime: "2024-06-10 10:00:00", screenId: 1, screenName: 1 },
        { showtime: "2024-06-10 11:00:00", screenId: 2, screenName: 3 },
        { showtime: "2024-06-11 12:00:00", screenId: 1, screenName: 1 },
        { showtime: "2024-06-11 13:00:00", screenId: 2, screenName: 3 },
        { showtime: "2024-06-12 14:00:00", screenId: 1, screenName: 1 },
        { showtime: "2024-06-12 15:00:00", screenId: 2, screenName: 3 },
        { showtime: "2024-06-13 16:00:00", screenId: 1, screenName: 1 },
        { showtime: "2024-06-13 17:00:00", screenId: 2, screenName: 3 },
        { showtime: "2024-06-14 18:00:00", screenId: 1, screenName: 1 },
        { showtime: "2024-06-14 19:00:00", screenId: 2, screenName: 3 },
        { showtime: "2024-06-15 20:00:00", screenId: 1, screenName: 1 },
        { showtime: "2024-06-15 21:00:00", screenId: 2, screenName: 3 },
        { showtime: "2024-06-16 22:00:00", screenId: 1, screenName: 1 },
        { showtime: "2024-06-16 23:00:00", screenId: 2, screenName: 3 },
      ],
    },
    {
      id: 2,
      theaterName: "台中中港新光影城",
      address: "台中市西屯區臺灣大道三段301號14樓",
      shows: [
        { showtime: "2024-06-10 00:00:00", screenId: 3, screenName: 1 },
        { showtime: "2024-06-10 01:00:00", screenId: 4, screenName: 3 },
        { showtime: "2024-06-11 02:00:00", screenId: 3, screenName: 1 },
        { showtime: "2024-06-11 03:00:00", screenId: 4, screenName: 3 },
        { showtime: "2024-06-12 04:00:00", screenId: 3, screenName: 1 },
        { showtime: "2024-06-12 05:00:00", screenId: 4, screenName: 3 },
        { showtime: "2024-06-13 06:00:00", screenId: 3, screenName: 1 },
        { showtime: "2024-06-13 07:00:00", screenId: 4, screenName: 3 },
        { showtime: "2024-06-14 08:00:00", screenId: 3, screenName: 1 },
        { showtime: "2024-06-14 09:00:00", screenId: 4, screenName: 3 },
        { showtime: "2024-06-15 10:00:00", screenId: 3, screenName: 1 },
        { showtime: "2024-06-15 11:00:00", screenId: 4, screenName: 3 },
        { showtime: "2024-06-16 12:00:00", screenId: 3, screenName: 1 },
        { showtime: "2024-06-16 13:00:00", screenId: 4, screenName: 3 },
      ],
    },
    {
      id: 3,
      theaterName: "員林影城",
      address: "彰化縣員林市南昌路39號3樓",
      shows: [
        { showtime: "2024-06-10 10:30:00", screenId: 5, screenName: 1 },
        { showtime: "2024-06-10 11:30:00", screenId: 7, screenName: 3 },
        { showtime: "2024-06-11 12:30:00", screenId: 5, screenName: 1 },
        { showtime: "2024-06-11 13:30:00", screenId: 7, screenName: 3 },
        { showtime: "2024-06-12 14:30:00", screenId: 5, screenName: 1 },
        { showtime: "2024-06-12 15:30:00", screenId: 7, screenName: 3 },
        { showtime: "2024-06-13 16:30:00", screenId: 5, screenName: 1 },
        { showtime: "2024-06-13 17:30:00", screenId: 7, screenName: 3 },
        { showtime: "2024-06-14 18:30:00", screenId: 5, screenName: 1 },
        { showtime: "2024-06-14 19:30:00", screenId: 7, screenName: 3 },
        { showtime: "2024-06-15 20:30:00", screenId: 5, screenName: 1 },
        { showtime: "2024-06-15 21:30:00", screenId: 7, screenName: 3 },
        { showtime: "2024-06-16 22:30:00", screenId: 5, screenName: 1 },
        { showtime: "2024-06-16 23:30:00", screenId: 7, screenName: 3 },
        { showtime: "2024-06-16 23:30:00", screenId: 6, screenName: 2 },
      ],
    },
  ];

  // 縣市排序(連江縣 === 馬祖)
  const cities = [
    "基隆市",
    "台北市",
    "新北市",
    "桃園市",
    "新竹市",
    "新竹縣",
    "苗栗縣",
    "台中市",
    "彰化縣",
    "南投縣",
    "雲林縣",
    "嘉義市",
    "嘉義縣",
    "台南市",
    "高雄市",
    "屏東縣",
    "宜蘭縣",
    "花蓮縣",
    "台東縣",
    "澎湖縣",
    "金門縣",
    "連江縣",
  ];

  // 尋訪列表中，有影城的縣市
  const availableCities = cities.map((city) => ({
    name: city,
    disabled: !showDetail.some((theater) => theater.address.startsWith(city)),
  }));

  // 載入時，選擇第一個縣市
  useEffect(() => {
    const firstAvailableCity = availableCities.find((city) => !city.disabled);
    setSelectedCity(firstAvailableCity ? firstAvailableCity.name : "");
  }, []);

  // 影城依id由小~大排序
  const theaters = showDetail
    .filter((theater) => theater.address.startsWith(selectedCity))
    .sort((a, b) => a.id - b.id);

  // 預設呈現第一個影城
  useEffect(() => {
    if (theaters.length > 0) {
      setSelectedTheaterId(theaters[0].id);
    }
  }, [selectedCity]);

  // 當前選擇的影城
  const selectedTheater = theaters.find(
    (theater) => theater.id === selectedTheaterId
  );

  // 設定預設日期
  useEffect(() => {
    if (selectedTheater) {
      if (!selectedDate) {
        const today = new Date().toISOString().split("T")[0];
        const todayDate = selectedTheater.shows.some((show) =>
          show.showtime.startsWith(today)
        )
          ? today
          : selectedTheater.shows[0].showtime.split(" ")[0];
        setSelectedDate(todayDate);
      }
    }
  }, [selectedTheater]);

  // 列出所選影城有場次的日期
  const dates = selectedTheater
    ? Array.from(
        new Set(
          selectedTheater.shows.map((show) => show.showtime.split(" ")[0])
        )
      )
    : [];

  // 將所選日期的場次，依時間小~大排序；若時間相同，再判斷id小~大
  const shows = selectedTheater
    ? selectedTheater.shows
        .filter((show) => show.showtime.startsWith(selectedDate))
        .sort((a, b) => {
          const timeA = new Date(a.showtime).getTime();
          const timeB = new Date(b.showtime).getTime();
          return timeA - timeB || a.screenId - b.screenId;
        })
    : [];

  function handleSelectDate(date) {
    setSelectedDate(date);
    setSelectedShowIndex(null);
  }

  function handleSelectShow(index) {
    setSelectedShowIndex(index);
    setIsShowSelected(index !== null);
  }

  function handleNextStep(event) {
    if (!isShowSelected) {
      event.preventDefault();
      setShowAlert(true);
    } else {
      const newUrl = `${window.location.pathname}/seats`;
      navigate(newUrl);
    }
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  }

  function formatTime(timeString) {
    const date = new Date(timeString);
    return date.toTimeString().split(" ")[0].substring(0, 5);
  }

  return (
    <>
      <Form.Group controlId="city" className="mb-3">
        <Form.Label>請選擇地區：</Form.Label>
        <Form.Select
          value={selectedCity}
          onChange={(e) => {
            setSelectedCity(e.target.value);
            setSelectedTheaterId(null);
            setSelectedShowIndex(null);
            setIsShowSelected(false);
          }}
        >
          {availableCities.map((city) => (
            <option key={city.name} value={city.name} disabled={city.disabled}>
              {city.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="theater" className="mb-3">
        <Form.Label>請選擇劇院：</Form.Label>
        <Form.Select
          value={selectedTheaterId}
          onChange={(e) => {
            setSelectedTheaterId(Number(e.target.value));
            setSelectedShowIndex(null);
            setIsShowSelected(false);
          }}
        >
          {theaters.map((theater) => (
            <option value={theater.id} key={theater.id}>
              {theater.theaterName}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <div className={isLargeScreen ? "" : "scroll-container mb-3"}>
        <ButtonGroup
          size="lg"
          className={isLargeScreen ? "d-flex flex-wrap mb-3" : ""}
        >
          {dates.map((date, index) => (
            <Button
              key={index}
              variant={selectedDate === date ? "danger" : "dark"}
              onClick={() => handleSelectDate(date)}
            >
              {date === new Date().toISOString().split("T")[0]
                ? "Today"
                : formatDate(date)}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <Row className="justify-content-start">
        {shows.map((show, index) => (
          <Col xs={4} sm={4} md={4} lg={3} key={index} className="mb-3">
            <Button
              variant={selectedShowIndex === index ? "danger" : "dark"}
              className="w-100"
              onClick={() => handleSelectShow(index)}
            >
              <div className="d-flex flex-column align-items-center">
                <span>{formatTime(show.showtime)}</span>
                <span>Screen {show.screenName}</span>
              </div>
            </Button>
          </Col>
        ))}
      </Row>
      {showAlert && <Alert variant="danger">請先選擇場次</Alert>}
      <Row className="d-flex justify-content-center">
        <Col sm={4} md={4} lg={3}>
          <Button
            variant="outline-light"
            className="w-100"
            onClick={handleNextStep}
          >
            下一步
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Booking;
