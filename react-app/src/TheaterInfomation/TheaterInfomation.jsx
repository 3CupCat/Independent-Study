import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TheaterInfomation.css";

const TheaterInfomation = () => {
  const isLargeScreen = useMediaQuery({ query: "(min-width: 768px)" });

  const theaterInfomations = [
    {
      theaterName: "臺中大遠百威秀影城",
      theaterImage:
        "https://lh3.googleusercontent.com/p/AF1QipMDzf1Pnmy5CKC7qeLQLDh23GgD4HkOVs8ny-Ro=s1360-w1360-h1020",
      address: "台中市西屯區臺灣大道三段251號13樓",
      tel: "(04)2258-8511",
    },
    {
      theaterName: "台中中港新光影城",
      theaterImage:
        "https://lh3.googleusercontent.com/p/AF1QipO7S5HhYmcf-DBpnuS8Rcq_E6ow5gAwPVLVVDhr=s1360-w1360-h1020",
      address: "台中市西屯區臺灣大道三段301號14樓",
      tel: "(04)2258-9911",
    },
    {
      theaterName: "台中TIGER CITY威秀影城",
      theaterImage:
        "https://lh3.googleusercontent.com/p/AF1QipPbh-XdfxnhpRn0Mtwv-iMhVZiZW2sVJvw1sTt4=s1360-w1360-h1020",
      address: "台中市西屯區河南路三段120-1號4樓",
      tel: "(04)3606-5566",
    },
    {
      theaterName: "台中日日新影城",
      theaterImage:
        "https://lh3.googleusercontent.com/p/AF1QipNGb5zD0xMWPeMDHEJA3JREpjuDxLIw00s0No4s=s1360-w1360-h1020",
      address: "台中市中區中華路一段58號",
      tel: "(04)2222-3138",
    },
    {
      theaterName: "全球影城",
      theaterImage:
        "https://lh3.googleusercontent.com/p/AF1QipN0uFOpgvVOJY-5GGAw3tJbTnS_hkMIMhIkRKb0=s1360-w1360-h1020",
      address: "台中市西區中華路一段1-1號",
      tel: "(04)2224-2588",
    },
    {
      theaterName: "台中文心秀泰影城",
      theaterImage:
        "https://lh3.googleusercontent.com/p/AF1QipNGemRylV8AQP74xuhKvktNvrTaDEHabBsyQF8=s1360-w1360-h1020",
      address: "台中市南屯區文心南路289號7樓8樓",
      tel: "(04)2473-5989",
    },
    {
      theaterName: "萬代福影城",
      theaterImage:
        "https://lh3.googleusercontent.com/p/AF1QipNpNxjPCa1mFBPjKt_oHutfxeASUDY7ck5_TGyz=s1360-w1360-h1020",
      address: "台中市中區公園路38號",
      tel: "(04)2221-0356",
    },
    {
      theaterName: "台中站前秀泰影城",
      theaterImage:
        "https://lh3.googleusercontent.com/p/AF1QipN7aWBMsLytwh7FwQHBYWKZ7edXr3wvw94jbF8q=s1360-w1360-h1020",
      address: "台中市東區南京路76號1樓",
      tel: "(04)2211-7988",
    },
    {
      theaterName: "台中大魯閣新時代威秀影城",
      theaterImage:
        "https://lh3.googleusercontent.com/p/AF1QipOR6buJoxLnnejJ_jq8Ht2ABmNis_xizs0ANW0=s1360-w1360-h1020",
      address: "台中市東區復興路四段186號4F",
      tel: "(04)2228-0388",
    },
  ];

  const openGoogleMap = (theaterName) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      theaterName
    )}`;
    window.open(url, "_blank");
  };

  return (
    <Container className="theat-container">
      <h2 className="title text-center my-4">影城資訊</h2>
      <Row>
        {theaterInfomations.map((theaterInfomation, index) => (
          <Col key={index} md={6} lg={4} className="mb-4">
            <Card
              className="theater-card"
              onClick={
                isLargeScreen
                  ? () => openGoogleMap(theaterInfomation.theaterName)
                  : null
              }
            >
              <div className="card-image-container">
                <Card.Img
                  variant="top"
                  src={theaterInfomation.theaterImage}
                  alt={theaterInfomation.theaterName}
                  className="card-image"
                />
              </div>
              <Card.Body>
                <Card.Title>{theaterInfomation.theaterName}</Card.Title>
                <Card.Text>
                  {theaterInfomation.address}
                  <br />
                  {theaterInfomation.tel}
                </Card.Text>
                {!isLargeScreen && (
                  <Button
                    variant="outline-light"
                    className="float-right"
                    onClick={() => openGoogleMap(theaterInfomation.theaterName)}
                  >
                    開啟地圖
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TheaterInfomation;
