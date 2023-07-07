import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import CommonSection from '../components/UI/CommonSection';
import Helmet from '../components/Helmet/Helmet';

import '../styles/checkout.css';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../store/shopping-cart/cartSlice';

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingAddress } = useSelector((state) => state.cart.cart);

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <Helmet title="Shipping">
      <div className="content">
        <CommonSection title="Shipping" />
        <section>
          <Container>
            <Row>
              <Col lg="8" md="6">
                <h6 className="mb-4">Shipping Address</h6>
                <form className="checkout__form" onSubmit={submitHandler}>
                  <div className="form__group">
                    <input
                      type="text"
                      placeholder="Enter your address"
                      required
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="form__group">
                    <input
                      type="text"
                      placeholder="Enter your city"
                      required
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="form__group">
                    <input
                      type="text"
                      placeholder="Enter your postal code"
                      required
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </div>
                  <div className="form__group">
                    <input
                      type="text"
                      placeholder="Enter your country"
                      required
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="addToCart__btn">
                    Continue
                  </button>
                </form>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </Helmet>
  );
};

export default Shipping;
