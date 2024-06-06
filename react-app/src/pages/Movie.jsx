import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Button, Card, Image } from "react-bootstrap";
import "../pages/moviestyle.css";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const Detail = () => {
  const isLargeScreen = useMediaQuery({ query: "(min-width: 768px)" });
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 400) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Container className="bg-dark text-white mt-7 MDmoviestyle-text">
      <div
        className="position-fixed"
        style={{
          left: "90%",
          top: "30%",
          zIndex: 1000,
          display: isHidden ? "block" : "none",
          writingMode: "vertical-lr",
          maxWidth: "calc(100% - 200px)",
          overflowX: "hidden",
        }}
      >
        <Link to="/booking/01">
          <Button
            className="MDmoviestyle-text"
            style={{ padding: "8px 5px", fontWeight: "600" }}
          >
            立即訂票
          </Button>
        </Link>
      </div>
      <Row>
        <Col>
          <div className="mdmoviestyle-img-wrapper img-fluid position-relative">
            <img
              className="mdmoviestyle-img img-fluid"
              src="/bg1.jpg"
              alt="moviep"
            />
            <Link
              className="position-absolute top-50 start-50 translate-middle"
              to="https://www.youtube.com/watch?v=DHUpvwyb49o"
            >
              <FontAwesomeIcon
                icon={faYoutube}
                style={{ color: "#f90101", fontSize: "60px" }}
              />
            </Link>
            <div
              className={"position-absolute"}
              style={{ bottom: "-55px", left: "0", padding: "3px" }}
            >
              <h1 className="me-5">猩球崛起：王國誕生</h1>
              <h3>Kingdom of the Planet of the Apes</h3>
            </div>
            <div
              className={
                isLargeScreen ? "position-absolute" : "ms-dispaly-none"
              }
              style={{
                bottom: "-45px",
                right: "0",
                padding: "3px",
                display: isHidden ? "none" : "block",
              }}
            >
              <img
                src="/comment1.jpg"
                alt="movie1"
                className={isLargeScreen ? "img-fluid" : "ms-dispaly-none"}
                style={{
                  width: "100%",
                  height: "auto",
                  maxWidth: "250px",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  backgroundColor: "#fff",
                  marginBottom: "10px",
                }}
              />
              <Link to="/booking/01">
                <Button
                  className={isLargeScreen ? " " : "ms-dispaly-none"}
                  style={{ width: "100%", fontWeight: "600" }}
                >
                  立即訂票
                </Button>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col className="mt-2">
          <hr className="mshr-style" />
          <span className="msborder-style MDmoviestyle-text-small">保護級</span>
          <span className="msborder-style">
            <span className="MDmoviestyle-text-small">評分4.8</span>{" "}
            <FontAwesomeIcon
              icon={faStar}
              style={{ color: "#FFD43B", fontSize: "18px" }}
            />
          </span>
          <span className="msborder-style MDmoviestyle-text-small">動作片</span>
          <span className="msborder-style MDmoviestyle-text-small">
            105分鐘
          </span>
          <div className="mt-3 MDmoviestyle-text-small">
            故事背景發生在凱撒統治過後的幾世代。
            猩猩主導著世界，而人類則被迫在陰影中苟延殘喘的生活。
            隨著新的暴君領袖崛起，一隻年輕的猩猩踏上了一段質疑自己過去信念的旅程，牠也將做出影響猩猩和人類未來命運的選擇。
          </div>
          <div className="mt-3 MDmoviestyle-text-small">
            導演: 魯伯特·瓦耶特
          </div>
          <div className="MDmoviestyle-text-small">
            主演: 安迪·瑟金斯 / 詹姆斯·弗蘭科 / 芙蕾達·平托 / 約翰·利思戈 /
            布萊恩·考克斯
          </div>
          <div className="MDmoviestyle-text-small">語言: 英文 / 中文</div>
        </Col>
      </Row>
      <Row className="mt-5 justify-content-between">
        <h4>精彩劇照</h4>
        <img
          className="ms-stills col-xxl-4 col-xl-12 col-lg-12 d-flex justify-content-center mb-3"
          src="/moviep1.jpg"
          alt="moviep"
        ></img>
        <img
          className="ms-stills col-xxl-4 col-xl-12 col-lg-12 d-flex justify-content-center mb-3"
          src="/moviep2.jpg"
          alt="moviep"
        ></img>
        <img
          className="ms-stills col-xxl-4 col-xl-12 col-lg-12 d-flex justify-content-center mb-3"
          src="/moviep3.jpg"
          alt="moviep"
        ></img>
      </Row>
      <Row className="mt-5 justify-content-between">
        <h4>主要演員</h4>
        <img
          className="ms-stills col-xxl-4 col-xl-12 col-lg-12 d-flex justify-content-center mb-3"
          src="/actor1.jpg"
          alt="moviep"
        ></img>
        <img
          className="ms-stills col-xxl-4 col-xl-12 col-lg-12 d-flex justify-content-center mb-3"
          src="/actor2.jpg"
          alt="moviep"
        ></img>
        <img
          className="ms-stills col-xxl-4 col-xl-12 col-lg-12 d-flex justify-content-center mb-3"
          src="/actor3.jpg"
          alt="moviep"
        ></img>
      </Row>
      <Row className="d-flex justify-content-start mt-5">
        <Col>
          <span className="h4 me-3">精彩評論</span>
          <span className="MDmoviestyle-text-small">
            <Link to="/reviews" className="text-decoration-underline">
              查看更多
            </Link>
          </span>
          <hr className="mshr-style" />
          <Card className="mt-3 MDmoviestyle-body MDmoviestyle-text">
            觀眾甲
            <div className="mt-2 msuser-comment">
              影片情節緊湊，令人不禁感嘆猩猩的顯赫智力和領袖風範。
            </div>
          </Card>
          <Card className="mt-3 MDmoviestyle-body MDmoviestyle-text">
            觀眾乙
            <div className="mt-2 msuser-comment">
              從開始到結束都非常引人入勝，猩猩和人類之間的衝突展現得淋漓盡致。
            </div>
          </Card>
          <Card className="mt-3 MDmoviestyle-body MDmoviestyle-text">
            影評丙
            <div className="mt-2 msuser-comment">
              這部電影成功地將情感和動作交織在一起，不愧是年度大片。
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Detail;
