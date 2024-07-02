import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  InputGroup,
  FormControl,
  Card,
  Modal,
  ProgressBar,
} from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import "../pages/moviestyle.css";

const Rating = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movieId, reviewDetailDto } = location.state || {};
  const [messages, setMessages] = useState(reviewDetailDto?.comments || []);
  const [ratingStats, setRatingStats] = useState({
    1: reviewDetailDto?.oneStarRate || 0,
    2: reviewDetailDto?.twoStarRate || 0,
    3: reviewDetailDto?.threeStarRate || 0,
    4: reviewDetailDto?.fourStarRate || 0,
    5: reviewDetailDto?.fiveStarRate || 0,
  });
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editReviewId, setEditReviewId] = useState(null);
  const [editReviewContent, setEditReviewContent] = useState("");
  const [editReviewRating, setEditReviewRating] = useState(0);
  const [userReview, setUserReview] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteReviewId, setDeleteReviewId] = useState(null);

  useEffect(() => {
    const fetchUserReview = async () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const response = await axios.get(
            `http://localhost:8080/reviews/${movieId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserReview(response.data);
        } catch (error) {
          console.error("Error fetching user review:", error);
        }
      }
    };
    fetchUserReview();
  }, [movieId]);

  const handleStarClick = (star) => {
    setRating(star);
  };

  const handleMessageSubmit = async () => {
    if (rating < 1) {
      alert("評分星數最低為一顆星");
      return;
    }
    try {
      const token = Cookies.get("token");
      if (!token) {
        setShowLoginModal(true);
        return;
      }

      await axios.post(
        `http://localhost:8080/reviews/${movieId}`,
        { score: rating, comment: review },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages((prevMessages) => [
        {
          reviewId: Date.now(),
          comment: review,
          score: rating,
          reviewDate: new Date(),
          nickName: "您",
          isUser: true,
        },
        ...prevMessages,
      ]);
      setReview("");
      setRating(0);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleEditClick = (msg) => {
    setEditReviewId(msg.reviewId);
    setEditReviewContent(msg.comment);
    setEditReviewRating(msg.score);
    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {
    try {
      const token = Cookies.get("token");
      await axios.put(
        `http://localhost:8080/reviews/${movieId}`,
        { score: editReviewRating, comment: editReviewContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.reviewId === editReviewId
            ? { ...msg, comment: editReviewContent, score: editReviewRating }
            : msg
        )
      );
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const handleDeleteClick = (msg) => {
    setDeleteReviewId(msg.reviewId);
    setShowDeleteModal(true);
  };

  const handleDeleteSubmit = async () => {
    try {
      const token = Cookies.get("token");
      await axios.delete(`http://localhost:8080/reviews/${movieId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.reviewId !== deleteReviewId)
      );
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const calculatePercentages = () => {
    const totalRatings = Object.values(ratingStats).reduce(
      (sum, count) => sum + count,
      0
    );
    if (totalRatings === 0) return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    const percentages = {};
    for (let i = 1; i <= 5; i++) {
      percentages[i] = Math.round((ratingStats[i] / totalRatings) * 100);
    }
    return percentages;
  };

  const renderStars = (currentRating, onClick) => {
    const fullStars = Math.floor(currentRating);
    const halfStar = currentRating % 1 >= 0.5;

    return (
      <div>
        {[...Array(fullStars)].map((_, i) => (
          <FontAwesomeIcon
            key={i}
            icon={faStar}
            style={{ color: "#FFD700", cursor: "pointer" }}
            onClick={() => onClick(i + 1)}
          />
        ))}
        {halfStar && (
          <FontAwesomeIcon
            icon={faStarHalfAlt}
            style={{ color: "#FFD700", cursor: "pointer" }}
            onClick={() => onClick(fullStars + 0.5)}
          />
        )}
        {[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, i) => (
          <FontAwesomeIcon
            key={fullStars + i + 1}
            icon={faStar}
            style={{ color: "#d3d3d3", cursor: "pointer" }}
            onClick={() => onClick(fullStars + i + 1)}
          />
        ))}
      </div>
    );
  };

  const getInitialsAvatar = (nickname) => {
    const firstChar = nickname ? nickname.charAt(0).toUpperCase() : "匿";
    return (
      <div
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          backgroundColor: "#add8e6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        {firstChar}
      </div>
    );
  };

  const percentages = calculatePercentages();
  const averageRating = reviewDetailDto.scoreAvg.toFixed(1);

  return (
    <Container className="bg-dark text-white mt-4 pt-5 ps-0 pe-0">
      <Row className="justify-content-center">
        <Col className="mx-5">
          <Row className="mt-4">
            <Col lg={3}>
              <Image
                src={reviewDetailDto.poster}
                alt={reviewDetailDto.title}
                style={{
                  maxWidth: "245px",
                  height: "350px",
                  objectFit: "cover",
                }}
              />
            </Col>
            <Col lg={9}>
              <h1 className="ms-large-title">
                {reviewDetailDto.title}
              </h1>
              <Row>
                <Col lg={2}>
                  <div className="d-flex flex-column align-items-center">
                    <h2 className="mt-3 ms-md-title">{averageRating}</h2>
                    <div>
                      {renderStars(averageRating, handleStarClick)}
                    </div>
                    <p>
                      {reviewDetailDto.totalCommentsNum} 則評論
                    </p>
                  </div>
                </Col>

                <Col lg={10}>
                  <div className="mt-2">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div
                        key={star}
                        className="d-flex align-items-center mb-2"
                      >
                        <span className="me-2 small">{star}</span>
                        <ProgressBar
                          now={percentages[star]}
                          variant={"success"}
                          style={{ flex: 1, height: "10px" }}
                        />
                      </div>
                    ))}
                  </div>
                </Col>

                <Col lg={12}>
                  <hr className="mshr-style mt-4 mb-2" />
                  <Row>
                    <div className="mt-1">
                      {reviewDetailDto.isPlaying && (
                        <span className="msborder-style MDmoviestyle-text-small">
                          現正熱映
                        </span>
                      )}
                      {reviewDetailDto.scoreAvg >= 4 &&
                        reviewDetailDto.scoreAvg <= 5 && (
                          <span className="msborder-style MDmoviestyle-text-small">
                            壓倒性好評
                          </span>
                        )}
                      {reviewDetailDto.scoreAvg >= 3 &&
                        reviewDetailDto.scoreAvg < 4 && (
                          <span className="msborder-style MDmoviestyle-text-small">
                            大多好評
                          </span>
                        )}
                      {reviewDetailDto.scoreAvg >= 2 &&
                        reviewDetailDto.scoreAvg < 3 && (
                          <span className="msborder-style MDmoviestyle-text-small">
                            大多負評
                          </span>
                        )}
                      {reviewDetailDto.scoreAvg >= 1 &&
                        reviewDetailDto.scoreAvg < 2 && (
                          <span className="msborder-style MDmoviestyle-text-small">
                            壓倒性負評
                          </span>
                        )}
                    </div>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* todo */}

          <h2 className="mt-4 ms-0">我的評價</h2>
          <div className="d-flex align-items-center">
            <div>{renderStars(rating, handleStarClick)}</div>
          </div>
          <InputGroup className="mt-2">
            <FormControl
              placeholder="撰寫評論"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <Button variant="primary" onClick={handleMessageSubmit}>
              發布評論
            </Button>
          </InputGroup>
          <hr className="bg-white mt-4" />
          <h2 className="mt-4 mb-3">評論區</h2>
          {messages.map((msg, index) => (
            <Card
              key={index}
              className={`mt-3 MDmoviestyle-body MDmoviestyle-text bg-dark text-white position-relative ${
                msg.isUser ? "border border-warning" : ""
              }`}
            >
              <Card.Body>
                <div className="d-flex align-items-start">
                  <div style={{ marginTop: "15px" }}>
                    {msg.photo ? (
                      <img
                        src={msg.photo}
                        alt={msg.nickName || "匿名用戶"}
                        className="me-3"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                    ) : (
                      getInitialsAvatar(msg.nickName || "匿名用戶")
                    )}
                  </div>
                  <div>
                    <div className="d-flex flex-column">
                      <Card.Title className="mb-0 small">
                        {`${msg.nickName || "匿名用戶"}`}
                        <span
                          className="text-muted ms-2"
                          style={{ fontSize: "0.8em" }}
                        >
                          {[...Array(5)].map((_, i) => (
                            <FontAwesomeIcon
                              key={i}
                              icon={faStar}
                              style={{
                                color: i < msg.score ? "yellow" : "gray",
                              }}
                            />
                          ))}
                        </span>
                      </Card.Title>
                    </div>
                    <div>{msg.comment}</div>
                    {msg.isUser && (
                      <>
                        <Button
                          variant="outline-light"
                          size="sm"
                          className="mt-2 me-2"
                          onClick={() => handleEditClick(msg)}
                        >
                          編輯
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="mt-2"
                          onClick={() => handleDeleteClick(msg)}
                        >
                          刪除
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card.Body>
              <div
                className="position-absolute"
                style={{
                  bottom: "10px",
                  right: "10px",
                  fontSize: "0.8em",
                  color: "white",
                }}
              >
                {new Date(msg.reviewDate).toLocaleDateString()}{" "}
                {new Date(msg.reviewDate).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </Card>
          ))}
        </Col>
      </Row>

      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>請先登入</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="primary" onClick={() => navigate("/login")}>
            登入
          </Button>
        </Modal.Body>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>編輯評論</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center">
            <div>{renderStars(editReviewRating, setEditReviewRating)}</div>
          </div>
          <InputGroup className="mt-2">
            <FormControl
              placeholder="編輯評論"
              value={editReviewContent}
              onChange={(e) => setEditReviewContent(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            取消
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            更新評論
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>刪除評論</Modal.Title>
        </Modal.Header>
        <Modal.Body>你確定要刪除這條評論嗎？</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            取消
          </Button>
          <Button variant="danger" onClick={handleDeleteSubmit}>
            刪除
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Rating;
