import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container } from 'react-bootstrap';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';

const Contact = () => {
  return (
    <Helmet title="Contact">
      <div className="content">
        <CommonSection title="Contact" />
        <section>
          <Container>
            <Col lg="12">
              <p>
                You can contact us via hotline <span className="fw-bold fs-4">1900561275</span> or{' '}
                <Link to="/checkout" className="fw-bold fs-4">
                  PAY HERE
                </Link>{' '}
                for more information.
              </p>
            </Col>
          </Container>
        </section>
      </div>
    </Helmet>
  );
};

export default Contact;
