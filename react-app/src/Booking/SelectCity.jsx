import React from "react";
import { Form, FormGroup, FormLabel, FormControl } from "react-bootstrap";

const SelectCity = ({ cities }) => {
  function handleSelectChange(event) {
    const form = event.target.form;
    // form.submit(); // 留意: 測試請註解掉下方這行
  }

  return (
    <div>
      <Form>
        <FormGroup controlId="city" className="mb-3">
          <FormLabel>請選擇地區：</FormLabel>
          <Form.Select name="city" onChange={handleSelectChange}>
            {cities.map((city) => (
              <option value={city} key={city}>
                {city}
              </option>
            ))}
          </Form.Select>
        </FormGroup>
      </Form>
    </div>
  );
};

export default SelectCity;
