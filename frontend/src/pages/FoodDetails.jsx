import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { Container, Row, Col } from 'react-bootstrap';
import Rating from 'react-rating';

import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../store/shopping-cart/cartSlice';

import '../styles/product-details.css';

import ProductCard from '../components/UI/ProductCard';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { post } from '../store/commentSlice';
import { getFood, resetFoodDetail } from '../store/foodDetailSlice';
import { getAllFood, resetFood } from '../store/foodSlice';
import Spinner from '../components/UI/Spinner';
import { toast } from 'react-toastify';
// import { auth } from '../firebase/firebase-config';

const FoodDetails = () => {
  const [tab, setTab] = useState('desc');
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Please enter your full name!')
      .min(4, 'Please enter your full name at least four characters!')
      .max(30, 'Too long!'),
    email: yup
      .string()
      .required('Please enter your email!')
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter your email a valid!'),
    reviewText: yup
      .string()
      .required('Please write your reviews!')
      .min(10, 'Please write your reviews at least ten characters!'),
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      reviewText: '',
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      dispatch(post(values));
      resetForm();
    },
  });

  useEffect(() => {
    dispatch(getFood(id));
  }, [dispatch, id]);

  const commentList = useSelector((state) => state.comment.commentList);
  const { food, isLoading, isSuccess, isError, message } = useSelector((state) => state.foodDetail);
  const foodList = useSelector((state) => state.foodList);
  const { currUser } = useSelector((state) => state.auth);

  const { name, price, category, desc, image, imageDetails, countInStock, rating } = food
    ? food
    : {
        name: '',
        price: 0,
        category: '',
        desc: '',
        image: '',
        imageDetails: [],
        countInStock: 0,
        rating: 0,
      };
  const [previewImg, setPreviewImg] = useState(image);
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    if (!currUser) {
      navigate('/login');
    } else {
      dispatch(
        addItem({
          id,
          name,
          price,
          quantity,
          image,
        })
      );
      setQuantity(1);
    }
  };

  const handleQuantityClick = (e) => {
    if (Number(e.target.value) !== quantity) {
      setQuantity(Number(e.target.value));
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }

    if (isSuccess) {
      dispatch(getAllFood({ category }));
      setPreviewImg(image);
      window.scrollTo(0, 0);
    }

    dispatch(resetFood());
    dispatch(resetFoodDetail());
  }, [dispatch, category, isSuccess, image, isError, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Helmet title="Product-details">
      <div className="content">
        <CommonSection title={name} />

        <section>
          <Container>
            {isLoading ? (
              <span className="text-center fw-bold fs-4">...</span>
            ) : (
              <Row>
                <Col lg="2" md="2">
                  <div className="product__images ">
                    {imageDetails?.map((imageUrl, idx) => (
                      <div
                        className="img__item mb-3"
                        key={idx}
                        onClick={() => setPreviewImg(imageUrl)}
                      >
                        <img src={imageUrl} alt="" className="w-50" />
                      </div>
                    ))}
                  </div>
                </Col>

                <Col lg="4" md="4">
                  <div className="product__main-img">
                    <img src={previewImg} alt="" className="w-100" />
                  </div>
                </Col>

                <Col lg="6" md="6">
                  <div className="single__product-content">
                    <h2 className="product__title mb-3">{name}</h2>
                    <p className="product__price">
                      Price: <span>${price}</span>
                    </p>
                    <p className="product__category">
                      Category: <span>{category}</span>
                    </p>
                    <p className="product__status">
                      Status: <span>{countInStock > 0 ? 'In Stock' : 'Unavailable'}</span>
                    </p>
                    <p className="product__review">
                      Review:{' '}
                      <span>
                        <Rating
                          start={0}
                          stop={5}
                          initialRating={rating}
                          emptySymbol={
                            <img src="/ratings/star-grey.png" className="icon" alt="star" />
                          }
                          placeholderSymbol={
                            <img src="/ratings/star-yellow.png" className="icon" alt="star" />
                          }
                          fullSymbol={
                            <img src="/ratings/star-yellow.png" className="icon" alt="star" />
                          }
                          readonly
                        />
                      </span>
                    </p>
                    {countInStock > 0 && (
                      <p className="product__quantity">
                        Quantity:{' '}
                        <span>
                          <select className="px-3" onClick={(e) => handleQuantityClick(e)}>
                            {Array.from({ length: countInStock }, (v, i) => i + 1).map(
                              (el, idx) => (
                                <option key={idx} value={el}>
                                  {el}
                                </option>
                              )
                            )}
                          </select>
                        </span>
                      </p>
                    )}
                    <button onClick={addToCart} className="addToCart__btn">
                      Add to Cart
                    </button>
                  </div>
                </Col>

                <Col lg="12">
                  <div className="tabs d-flex align-items-center gap-5 py-3">
                    <h6
                      className={` ${tab === 'desc' ? 'tab__active' : ''}`}
                      onClick={() => setTab('desc')}
                    >
                      Description
                    </h6>
                    <h6
                      className={` ${tab === 'rev' ? 'tab__active' : ''}`}
                      onClick={() => setTab('rev')}
                    >
                      Review
                    </h6>
                  </div>

                  {tab === 'desc' ? (
                    <div className="tab__content">
                      <p>{desc}</p>
                    </div>
                  ) : (
                    <div className="tab__form mb-3">
                      {commentList.length > 0 ? (
                        commentList.map((comment, idx) => (
                          <div className="review" key={idx}>
                            <p className="user__name mb-0">{comment.fullName}</p>
                            <p className="user__email">{comment.email}</p>
                            <p className="feedback__text">{comment.reviewText}</p>
                          </div>
                        ))
                      ) : (
                        <p className="no-review">No anyone review.</p>
                      )}

                      <form className="form" onSubmit={formik.handleSubmit}>
                        <div className="form__group">
                          <input
                            type="text"
                            placeholder="Full Name"
                            id="fullName"
                            name="fullName"
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.fullName && <p>{formik.errors.fullName}</p>}
                        </div>
                        <div className="form__group">
                          <input
                            type="email"
                            placeholder="Email"
                            id="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.email && <p>{formik.errors.email}</p>}
                        </div>

                        <div className="form__group">
                          <textarea
                            rows={5}
                            type="text"
                            placeholder="Write your review"
                            id="reviewText"
                            name="reviewText"
                            value={formik.values.reviewText}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.reviewText && <p>{formik.errors.reviewText}</p>}
                        </div>

                        <button type="submit" className="addToCart__btn">
                          Submit
                        </button>
                      </form>
                    </div>
                  )}
                </Col>

                <Col lg="12" className="mb-5 mt-4">
                  <h2 className="related__product-title">You might also like</h2>
                </Col>

                {foodList?.isLoading ? (
                  <span className="text-center fw-bold fs-4">Loading...!</span>
                ) : (
                  foodList.allFood?.foods.map((item) => (
                    <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={item._id}>
                      <ProductCard item={item} />
                    </Col>
                  ))
                )}
              </Row>
            )}
          </Container>
        </section>
      </div>
    </Helmet>
  );
};

export default FoodDetails;
