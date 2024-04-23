import React, { useEffect } from 'react';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { sendEmailVerification, updateEmail, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetail, resetState } from '../store/userDetailSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/UI/Spinner';
import { reset, updateUserDetail } from '../store/authSlice';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let userDetail = useSelector((state) => state.userDetail);
  let { isSuccess, isError, message, isLoading } = useSelector((state) => state.auth);

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
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: userDetail.currUser ? userDetail.currUser.user.fullName : '',
      email: userDetail.currUser ? userDetail.currUser?.user.email : '',
      photoUrl: userDetail.currUser
        ? userDetail.currUser.user.photoUrl
        : 'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png',
    },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      const user = {
        fullName: values.fullName,
        email: values.email,
        photoUrl: values.photoUrl,
      };
      await dispatch(updateUserDetail(user));
      resetForm();
    },
  });

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
      navigate('/home');
      toast.success('You updated profile successfully!', {
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
    dispatch(getUserDetail());
    return () => {
      dispatch(resetState());
      dispatch(reset());
    };
  }, [isError, message, navigate, isSuccess, dispatch]);

  if (userDetail.isLoading) {
    return <Spinner />;
  }
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Helmet title="Profile">
      <div className="content">
        <CommonSection title="Your Profile" />

        <section>
          <Container>
            <Row>
              <Col lg="6" md="6" sm="12" className="m-auto text-center">
                <form className="form mb-5" onSubmit={formik.handleSubmit}>
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
                    <input
                      type="text"
                      placeholder="Photo Url"
                      id="photoUrl"
                      name="photoUrl"
                      value={formik.values.photoUrl}
                      onChange={formik.handleChange}
                    />
                    <p
                      style={{
                        color: '#212245',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        paddingTop: '15px',
                      }}
                    >
                      Description Image
                    </p>
                    <input
                      type="image"
                      src={formik.values.photoUrl}
                      alt="avatar"
                      height="500px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="form__group">
                    <p className="text-start fs-5">
                      <Link to="/changePassword">Change to password</Link>
                    </p>
                  </div>

                  <button type="submit" className="addToCart__btn">
                    Update
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

export default Profile;
