import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import CommonSection from '../components/UI/CommonSection';
import Helmet from '../components/Helmet/Helmet';

import '../styles/checkout.css';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../store/shopping-cart/cartSlice';

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingAddress } = useSelector((state) => state.cart.cart);

  if (!shippingAddress.address) {
    navigate('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeOrder');
  };

  return (
    <Helmet title="Payment">
      <div className="content">
        <CommonSection title="Payment" />
        <section>
          <Container>
            <h6 className="mb-4">Select Method</h6>
            <form className="checkout__form" onSubmit={submitHandler}>
              <Row>
                <Col lg="2" md="1">
                  <div className="d-flex align-items-center mb-4">
                    <label for="paypal" className="me-2">
                      Paypal
                    </label>
                    <input
                      type="radio"
                      id="paypal"
                      name="paymentMethod"
                      value="Paypal"
                      checked
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                  </div>
                </Col>

                <Col lg="2" md="1">
                  <div className="d-flex align-items-center mb-4">
                    <label for="creditCard" className="me-2">
                      Credit Card
                    </label>
                    <input
                      type="radio"
                      id="creditCard"
                      name="paymentMethod"
                      value="Credit Card"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                  </div>
                </Col>
              </Row>
              <button type="submit" className="addToCart__btn">
                Continue
              </button>
            </form>
          </Container>
        </section>
      </div>
    </Helmet>
  );
};

export default Payment;
