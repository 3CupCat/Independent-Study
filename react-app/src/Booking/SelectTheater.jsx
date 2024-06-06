import React from "react";
import { Form, FormGroup, FormLabel, FormControl } from "react-bootstrap";

const SelectTheater = ({ theaters }) => {
  return (
    <div>
      <Form>
        <FormGroup controlId="theater" className="mb-3">
          <FormLabel>請選擇劇院：</FormLabel>
          <Form.Select name="theater">
            {theaters.map((theater) => (
              <option value={theater} key={theater}>
                {theater}
              </option>
            ))}
          </Form.Select>
        </FormGroup>
      </Form>
    </div>
  );
};

export default SelectTheater;
