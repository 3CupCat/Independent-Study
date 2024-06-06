import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faHeart,
  faHeartCrack,
} from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Modal as BootstrapModal,
} from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

// Navbar Function Component
const Navbar = ({ percentages, averageRating }) => {
  const isLargeScreen = useMediaQuery({ query: "(min-width: 768px)" });

  return (
    <Container className="bg-dark text-white mt-5 pt-5 py-3">
      <Row>
        <Col xs={12} lg={4} className="text-center">
          <img src="/comment1.jpg" alt="movie1" className="img-fluid" />
        </Col>
        <Col xs={12} lg={8}>
          <Row className="flex-wrap">
            <Col className="col-12 col-lg-8 col-xl-7 col-xxl-6">
              <h1>猩球崛起：王國誕生</h1>
            </Col>
            <Col className="col-12 col-lg-4 col-xl-5 col-xxl-6 pt-2">
              <span className="MDmoviestyle-text">
                評分
                <FontAwesomeIcon
                  icon={faStar}
                  style={{
                    color: "#FFD43B",
                    fontSize: "24px",
                    marginLeft: "10px",
                  }}
                />
                {averageRating}
              </span>
            </Col>
          </Row>
          <div className="mt-3">
            <p className="MDsmoviestyle-text">5星：{percentages[5]}%</p>
            <p className="MDsmoviestyle-text">4星：{percentages[4]}%</p>
            <p className="MDsmoviestyle-text">3星：{percentages[3]}%</p>
            <p className="MDsmoviestyle-text">2星：{percentages[2]}%</p>
            <p className="MDsmoviestyle-text">1星：{percentages[1]}%</p>
            <hr className="mshr-style" />
            <span className="msborder-style MDmoviestyle-text-small">
              現正熱映
            </span>
            <span className="msborder-style MDmoviestyle-text-small">
              大多好評
            </span>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

// Swiper Function Component
const Swiper = ({ onMessageSubmit }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowModal(false);
  };

  const handleButtonClick = () => {
    if (!isLoggedIn) {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleStarClick = (star) => {
    setRating(star);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = () => {
    const currentTime = new Date();
    if (rating < 1) {
      alert("評分星數最低為一顆星");
      return;
    }
    onMessageSubmit({ message, rating, time: currentTime });
    setMessage("");
    setRating(0);
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <FontAwesomeIcon
        key={star}
        icon={faStar}
        style={{
          color: star <= rating ? "#FFD700" : "#d3d3d3",
          cursor: "pointer",
        }}
        onClick={() => handleStarClick(star)}
      />
    ));
  };

  return (
    <Container className="bg-dark">
      {!isLoggedIn ? (
        <Button variant="primary" onClick={handleButtonClick}>
          我要評分
        </Button>
      ) : (
        <div>
          <div className="stars-container my-2">{renderStars()}</div>
          <Form.Control
            type="text"
            value={message}
            onChange={handleMessageChange}
            placeholder="歡迎留言，請注意用詞"
            className="mb-2"
          />
          <Button variant="success" onClick={handleSubmit}>
            送出
          </Button>
        </div>
      )}
      <BootstrapModal show={showModal} onHide={handleCloseModal}>
        <BootstrapModal.Header closeButton>
          <div className="text-black">
            <BootstrapModal.Title>請先登入</BootstrapModal.Title>
          </div>
        </BootstrapModal.Header>
        <BootstrapModal.Body>
          <Button variant="primary" onClick={handleLogin}>
            登入
          </Button>
        </BootstrapModal.Body>
      </BootstrapModal>
    </Container>
  );
};

// Tabbar Function Component
const Tabbar = ({ messages, onLikeClick, onCrackClick, onReportClick }) => {
  const isLargeScreen = useMediaQuery({ query: "(min-width: 768px)" });

  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          style={{ color: i <= rating ? "#FFD700" : "#d3d3d3" }}
        />
      );
    }
    return stars;
  };

  return (
    <Container className="bg-dark">
      <h2 className="mt-3">評論區</h2>
      {messages.map((msg, index) => (
        <div key={index} className="message mb-3 p-3 border rounded">
          <Row className="d-flex justify-content-between">
            <Col
              className={
                isLargeScreen
                  ? "col-4 d-flex align-items-center justify-content-start msreview-text"
                  : "col-12 d-flex align-items-center justify-content-start msreview-text"
              }
            >
              user: 咪咪
            </Col>
            <Col
              className={
                isLargeScreen
                  ? "col-4 d-flex align-items-center justify-content-center msreview-text"
                  : "col-12 d-flex align-items-center justify-content-start msreview-text"
              }
            >
              評分: {renderRatingStars(msg.rating)}
            </Col>
            <Col
              className={
                isLargeScreen
                  ? "col-4 d-flex align-items-center justify-content-end msreview-text"
                  : "col-12 d-flex align-items-center justify-content-start msreview-text"
              }
            >
              評論時間：{msg.time.toLocaleDateString()}{" "}
              {msg.time.toLocaleTimeString()}
            </Col>
          </Row>
          <p className="pt-2 MDsmoviestyle-text">{msg.message}</p>
          <div className="icon-right d-flex justify-content-end align-items-center">
            <FontAwesomeIcon
              icon={faHeart}
              style={{ color: "#e71313", cursor: "pointer" }}
              onClick={() => onLikeClick(index)}
            />
            <span className="mx-2 text-white">{msg.likeCount}</span>
            <FontAwesomeIcon
              icon={faHeartCrack}
              style={{ color: "#e71313", cursor: "pointer" }}
              onClick={() => onCrackClick(index)}
            />
            <span className="mx-2 text-white">{msg.crackCount}</span>
            <Button variant="link" className="p-0" onClick={onReportClick}>
              檢舉
            </Button>
          </div>
        </div>
      ))}
    </Container>
  );
};

// Rating Function Component
const Rating = () => {
  const [messages, setMessages] = useState([]);
  const [showReportModal, setShowReportModal] = useState(false);
  const [ratingStats, setRatingStats] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });

  const handleLikeClick = (index) => {
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      updatedMessages[index] = {
        ...updatedMessages[index],
        likeCount: (updatedMessages[index].likeCount || 0) + 1,
      };
      return updatedMessages;
    });
  };

  const handleCrackClick = (index) => {
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      updatedMessages[index] = {
        ...updatedMessages[index],
        crackCount: (updatedMessages[index].crackCount || 0) + 1,
      };
      return updatedMessages;
    });
  };

  const handleMessageSubmit = (messageData) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { ...messageData, likeCount: 0, crackCount: 0 },
    ]);
    setRatingStats((prevStats) => ({
      ...prevStats,
      [messageData.rating]: prevStats[messageData.rating] + 1,
    }));
  };

  const handleReportClick = () => {
    setShowReportModal(true);
  };

  const handleCloseReportModal = () => {
    setShowReportModal(false);
  };

  const calculatePercentages = () => {
    const totalRatings = Object.values(ratingStats).reduce(
      (sum, count) => sum + count,
      0
    );
    if (totalRatings === 0) return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    const percentages = {};
    for (let i = 1; i <= 5; i++) {
      percentages[i] = ((ratingStats[i] / totalRatings) * 100).toFixed(2);
    }
    return percentages;
  };

  const calculateAverageRating = () => {
    const totalRating = messages.reduce((sum, msg) => sum + msg.rating, 0);
    const totalMessages = messages.length;
    if (totalMessages === 0) return "";

    return (totalRating / totalMessages).toFixed(1);
  };

  const percentages = calculatePercentages();
  const averageRating = calculateAverageRating();

  return (
    <Container className="bg-dark">
      <Navbar percentages={percentages} averageRating={averageRating} />
      <Swiper onMessageSubmit={handleMessageSubmit} />
      <Tabbar
        messages={messages}
        onLikeClick={handleLikeClick}
        onCrackClick={handleCrackClick}
        onReportClick={handleReportClick}
      />
      <BootstrapModal show={showReportModal} onHide={handleCloseReportModal}>
        <BootstrapModal.Header closeButton></BootstrapModal.Header>
        <BootstrapModal.Body>
          <p className="text-black">感謝您的檢舉，我們會盡快為您處理</p>
          <Button variant="secondary" onClick={handleCloseReportModal}>
            關閉
          </Button>
        </BootstrapModal.Body>
      </BootstrapModal>
    </Container>
  );
};

export default Rating;
