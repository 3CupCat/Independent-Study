import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";

const SelectShow = ({ shows, onShowSelect }) => {
  const [selectedShowIndex, setSelectedShowIndex] = useState(null);

  function handleSelectShow(index) {
    setSelectedShowIndex(index);
    onShowSelect(index);
  }

  return (
    <div>
      <Row className="justify-content-start">
        {shows.map((show, index) => (
          <Col xs={4} sm={4} md={4} lg={3} key={index} className="mb-3">
            <Button
              variant={selectedShowIndex === index ? "danger" : "dark"}
              className="w-100"
              onClick={() => handleSelectShow(index)}
            >
              <div className="d-flex flex-column align-items-center">
                <span>{show.time}</span>
                <span>Screen {show.screen}</span>
              </div>
            </Button>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SelectShow;
