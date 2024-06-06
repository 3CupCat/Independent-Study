import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import "./payment.css";

const Payment = ({ payments }) => {
  return (
    <Container className="my-4">
      <h2 className="text-center mb-3">選擇付款方式</h2>
      <Form>
        <Form.Group as={Row} className="mb-3" controlId="payment">
          <Col>
            <Form.Select name="payment">
              {payments.map((payment, index) => (
                <option key={index} value={payment}>
                  {payment}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>
      </Form>
      <Row className="d-flex justify-content-center">
        <Col sm={4} md={4} lg={3}>
          <Button variant="outline-light" type="submit" className="w-100">
            確認付款
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

Payment.propTypes = {
  payments: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Payment;
