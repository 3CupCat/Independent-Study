import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import "./booking.css";

const SelectDate = ({ dates }) => {
  const isLargeScreen = useMediaQuery({ query: "(min-width: 768px)" });
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);

  function handleSelectDate(index) {
    setSelectedDateIndex(index);
  }

  return (
    <div className={isLargeScreen ? "" : "scroll-container mb-3"}>
      <ButtonGroup
        size="lg"
        className={isLargeScreen ? "d-flex flex-wrap mb-3" : ""}
      >
        {dates.map((date, index) => (
          <Button
            key={index}
            variant={selectedDateIndex === index ? "danger" : "dark"}
            onClick={() => handleSelectDate(index)}
          >
            {date}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default SelectDate;
