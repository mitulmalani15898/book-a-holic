/**
 * @author Prit Thakkar (B00890731)
 */
import { useState, useContext, React } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Form, Col, Row, Modal } from "react-bootstrap";
import "./payment.css";

import { BooksContext } from "../../Providers/BooksProvider";
import axios from "..//../axios";
import { useCookies } from "react-cookie";

/**
 *
 * @param {show, handleClose, total Price} for displaying, handling the close event and displaying
 * total amount at the time of checkout.
 * @returns Payment Modal of the existing cart
 */
export default function PaymentModal({ show, handleClose, totalPrice }) {
  const { cart, setCart, updateUserCart } = useContext(BooksContext);
  const [cookie] = useCookies(["Email"]);
  const navigate = useNavigate();

  const handleCheckout = async (event) => {
    const errorsFound = findErrorsInPayment();
    if (Object.keys(errorsFound).length > 0) {
      setErrors(errorsFound);
    } else {
      try {
        await axios.post("/payments", {
          email: cookie.Email,
          books: cart,
        });
        setCart([]);
        updateUserCart([]);
        navigate("/orders");
        handleClose();
      } catch (error) {
        alert("Error in payment, please try after sometime");
      }
    }
  };

  const [addPayment, setPayment] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    securityCode: "",
    paymentType: "",
  });
  const [errors, setErrors] = useState({});

  const findErrorsInPayment = () => {
    // name on card
    const {
      nameOnCard,
      cardNumber,
      expiryMonth,
      expiryYear,
      securityCode,
      paymentType,
    } = addPayment;
    const errors = {};
    if (!nameOnCard || nameOnCard.trim() === "") {
      errors.nameOnCard = "Name on Card cannnot be blank";
    }
    const cardRegex = /^(3|4|5){1}[0-9]{14,15}$/;

    if (
      !cardNumber ||
      cardNumber.trim() === "" ||
      !cardRegex.test(cardNumber.trim())
    ) {
      errors.cardNumber = "Card number must be a valid card number";
    }
    if (
      !expiryMonth ||
      expiryMonth.trim().length !== 2 ||
      expiryMonth.trim() > "12"
    ) {
      errors.expiryMonth =
        "Expity month must be in format (MM) and between 1-12";
    }
    if (
      !expiryYear ||
      expiryYear.trim().length !== 2 ||
      expiryYear.trim() < String(new Date().getFullYear()).substring(2)
    ) {
      errors.expiryYear =
        "Expiry year must be in format (YY) and should be past the current year";
    }
    if (!securityCode || securityCode.trim().length !== 3) {
      errors.securityCode = "Security code must be exactly 3 digits";
    }
    if (!paymentType || paymentType.trim() === "") {
      errors.paymentType = "Payment type must be selected";
    }
    return errors;
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="payment-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title className="payment-title">Pay Now</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          <Col>
            <Form.Group className="addpayment-element">
              <Form.Label>Name on Card</Form.Label>
              <Form.Control
                value={addPayment.nameOnCard}
                type="text"
                placeholder="Enter Name On Card"
                isInvalid={!!errors.nameOnCard}
                onChange={(event) => {
                  setPayment({ ...addPayment, nameOnCard: event.target.value });
                  if (!!errors.nameOnCard) {
                    setErrors({ ...errors, nameOnCard: null });
                  }
                }}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.nameOnCard}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="addpayment-element">
              <Form.Label>Card Type</Form.Label>
              <Form.Select
                aria-label="Select Card Type"
                value={addPayment.paymentType}
                isInvalid={!!errors.paymentType}
                onChange={(event) => {
                  setPayment({
                    ...addPayment,
                    paymentType: event.target.value,
                  });
                  if (!!errors.paymentType) {
                    setErrors({ ...errors, paymentType: null });
                  }
                }}
              >
                <option>Select Payment Type</option>
                <option>Master Card</option>
                <option>VISA</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.paymentType}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="addpayment-element">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Card Number"
                value={addPayment.cardNumber}
                isInvalid={!!errors.cardNumber}
                onChange={(event) => {
                  setPayment({
                    ...addPayment,
                    cardNumber: event.target.value,
                  });
                  if (!!errors.cardNumber) {
                    setErrors({ ...errors, cardNumber: null });
                  }
                }}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.cardNumber}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="addpayment-element">
              <Form.Label>Expiry Month</Form.Label>
              <Form.Control
                type="text"
                placeholder="Month (MM)"
                value={addPayment.expiryMonth}
                isInvalid={!!errors.expiryMonth}
                onChange={(event) => {
                  setPayment({
                    ...addPayment,
                    expiryMonth: event.target.value,
                  });
                  if (!!errors.expiryYear) {
                    setErrors({ ...errors, expiryMonth: null });
                  }
                }}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.expiryMonth}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="addpayment-element">
              <Form.Label>Expiry Year</Form.Label>
              <Form.Control
                type="text"
                placeholder=" Year (YY)"
                value={addPayment.expiryYear}
                isInvalid={!!errors.expiryYear}
                onChange={(event) => {
                  setPayment({ ...addPayment, expiryYear: event.target.value });
                  if (!!errors.expiryYear) {
                    setErrors({ ...errors, expiryYear: null });
                  }
                }}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.expiryYear}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="addpayment-element">
              <Form.Label>Security Code</Form.Label>
              <Form.Control
                type="password"
                placeholder="CVV"
                value={addPayment.securityCode}
                isInvalid={!!errors.securityCode}
                onChange={(event) => {
                  setPayment({
                    ...addPayment,
                    securityCode: event.target.value,
                  });
                  if (!!errors.securityCode) {
                    setErrors({ ...errors, securityCode: null });
                  }
                }}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.securityCode}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="addpayment-submit-button"
          onClick={(event) => handleCheckout(event)}
        >
          Pay {totalPrice}$
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
