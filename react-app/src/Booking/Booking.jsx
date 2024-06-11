import React, { useState, useEffect } from "react";
import { Form, Button, ButtonGroup, Row, Col, Alert } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import "./booking.css";
import axios from "axios";

const Booking = () => {
  const isLargeScreen = useMediaQuery({ query: "(min-width: 768px)" });
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedTheaterId, setSelectedTheaterId] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedShowIndex, setSelectedShowIndex] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [isShowSelected, setIsShowSelected] = useState(false);
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [showDetail, setShowDetail] = useState([]);

  useEffect(() => {
    const fetchShowDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/booking/${movieId}`
        );
        setShowDetail(response.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      }
    };

    fetchShowDetail();
  }, [movieId]);

  // 縣市排序
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
  }, [showDetail]);

  // 影城依id由小~大排序
  const theaters = showDetail
    .filter((theater) => theater.address.startsWith(selectedCity))
    .sort((a, b) => a.theaterId - b.theaterId);

  // 預設選擇地區內,id最小影城
  useEffect(() => {
    if (theaters.length > 0) {
      setSelectedTheaterId(theaters[0].theaterId);
    }
  }, [selectedCity]);

  // 當前選擇的影城
  const selectedTheater = theaters.find(
    (theater) => theater.theaterId === selectedTheaterId
  );

  // 由小到大排序日期，預設最小日期
  // 切換影城時，呈現同原本所選日期；若無則依照上方邏輯
  useEffect(() => {
    if (selectedTheater) {
      const today = new Date().toISOString().split("T")[0];
      const availableDates = Array.from(
        new Set(
          selectedTheater.showList.map((show) => show.showTime.split(" ")[0])
        )
      ).sort((a, b) => new Date(a) - new Date(b));
      if (!selectedDate || !availableDates.includes(selectedDate)) {
        const closestDate =
          availableDates.find((date) => new Date(date) >= new Date(today)) ||
          availableDates[0];
        setSelectedDate(closestDate);
      }
    }
  }, [selectedTheater]);

  // 列出所選影城有場次的日期，並由小~大排序
  const dates = selectedTheater
    ? Array.from(
        new Set(
          selectedTheater.showList.map((show) => show.showTime.split(" ")[0])
        )
      ).sort((a, b) => new Date(a) - new Date(b))
    : [];

  // 將所選日期的場次，依時間小~大排序；若時間相同，再判斷id小~大
  const shows = selectedTheater
    ? selectedTheater.showList
        .filter((show) => show.showTime.startsWith(selectedDate))
        .sort((a, b) => {
          const timeA = new Date(a.showTime).getTime();
          const timeB = new Date(b.showTime).getTime();
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

  function handleNextStep() {
    if (!isShowSelected) {
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
        <Form.Label>請選擇影城：</Form.Label>
        <Form.Select
          value={selectedTheaterId || ""}
          onChange={(e) => {
            setSelectedTheaterId(Number(e.target.value));
            setSelectedShowIndex(null);
            setIsShowSelected(false);
          }}
        >
          {theaters.map((theater) => (
            <option value={theater.theaterId} key={theater.theaterId}>
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
                <span>{formatTime(show.showTime)}</span>
                <span>
                  {show.screenName} ( {show.screenClass} )
                </span>
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
