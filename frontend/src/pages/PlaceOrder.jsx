import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Card, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const cart = useSelector((state) => state.cart.cart);

  // if (!cart.shippingAddress.address) {
  //   navigate('/shipping');
  // } else if (!cart.paymentMethod) {
  //   navigate('/payment');
  // }
  //   Calculate prices
  // const addDecimals = (num) => {
  //   return (Math.round(num * 100) / 100).toFixed(2);
  // };

  // cart.itemsPrice = addDecimals(
  //   cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  // );
  // cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  // cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  // cart.totalPrice = (
  //   Number(cart.itemsPrice) +
  //   Number(cart.shippingPrice) +
  //   Number(cart.taxPrice)
  // ).toFixed(2);

  //   const orderCreate = useSelector((state) => state.orderCreate)
  //   const { order, success, error } = orderCreate

  //   useEffect(() => {
  //     if (success) {
  //       history.push(`/order/${order._id}`)
  //       dispatch({ type: USER_DETAILS_RESET })
  //       dispatch({ type: ORDER_CREATE_RESET })
  //     }
  //     // eslint-disable-next-line
  //   }, [history, success])

  //   const placeOrderHandler = () => {
  //     dispatch(
  //       createOrder({
  //         orderItems: cart.cartItems,
  //         shippingAddress: cart.shippingAddress,
  //         paymentMethod: cart.paymentMethod,
  //         itemsPrice: cart.itemsPrice,
  //         shippingPrice: cart.shippingPrice,
  //         taxPrice: cart.taxPrice,
  //         totalPrice: cart.totalPrice,
  //       })
  //     )
  //   }

  return (
    <>
      <Helmet title="Place Order">
        <div className="content">
          <CommonSection title="Place Order" />
          <section>
            <Container>
              <Row>
                <Col lg={4} md={2}></Col>
                <Col lg={4} md={2}></Col>
                <Col lg={4} md={2}></Col>
              </Row>
            </Container>
          </section>
        </div>
      </Helmet>
    </>
  );
};

export default PlaceOrder;
