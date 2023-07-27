import React, { useState, useEffect } from "react";
import classes from "../../../styles/login.module.css";
import { useNavigate } from "react-router-dom";
import { actions } from "../../../redux/store/store";
import { useLoginMutation } from "../../../api/auth";
import { FiMail } from 'react-icons/fi';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { BiLock } from 'react-icons/bi';
import { Formik } from 'formik';
import { Form, Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';
import BTlogo from '../../../assets/Images/btlogo.png';
import BTcolorLogo from '../../../assets/Images/btcolorlogo.png';
import '../../../App.css';
import { toast } from "react-toastify";

const Login = (props: any) => {

  const { onStopUserQuery } = props;
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const informationFormValidation = Yup.object().shape({
    username: Yup.string().required('Email is Required'),
    password: Yup.string().required('Password is Required'),
  });

  const handleSubmit = async (values: any) => {
    setError("");
    const data: any = {} = await login(
      values
    );
    if (data.data.status === 200) {
      if (data?.data?.result?.role === 'user') {
        onStopUserQuery(false);
        actions.auth.setCurrentUser(data?.data?.result);
        actions.auth.setLoading(data.isLoading);
        actions.auth.setToken(data?.data?.result?.token);
        localStorage.setItem('token', data?.data?.result?.token);
        toast.success(`${data?.data?.message}`);
        navigate("/dashboard");
      } else {
        toast.error(`This user does not have admin rights`);
      }
    } else {
      if (data?.status === 401 || data?.data?.status === 401) {
        toast.error(`${data?.data?.message}`);
      } else {
        toast.error(`Something went wrong`);
      }
    }
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div className={classes.mainLogo}>
          <img src={BTlogo} alt="logo" />
        </div>
        <div className={classes.mainForm}>
          <img src={BTcolorLogo} alt="logo" className={classes.btcolorLogo} />
          <h1 className={classes.welcomeText}>Welcome back</h1>
          <p className={classes.sublinewelcome}>Enter your email and password to Login</p>

          <div style={{ paddingTop: '46px' }}>
            <Formik
              enableReinitialize
              initialValues={{
                username: '',
                password: '',
              }}
              validationSchema={informationFormValidation}
              onSubmit={(values) => {
                handleSubmit(values);
              }}>
              {({ values, handleChange, handleBlur, handleSubmit, errors, touched, isValid, dirty }) => (
                <Form
                  onSubmit={handleSubmit}
                  role="form"
                  className={classes.validationFormContainer}
                >
                  <div>
                    <div className={classes.newValidationForm}>
                      <Form.Group>
                        <Row className={classes.newElementFormRow}>
                          <Col xl={12} style={{ position: 'relative' }}>
                            <FiMail className={classes.inputIcon} />
                            <span className={classes.formBorder}></span>
                            <Form.Control
                              type="username"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="username"
                              className={classes.elementFormInput}
                              placeholder="Email"
                            />
                          </Col>
                          <Col xl={12} style={{ position: 'relative', alignItems: 'flex-end', justifyContent: 'flex-end', display: 'flex' }}>
                            {errors.username && touched.username && (
                              <div style={{ color: 'red', fontSize: '12px' }}>{errors.username} </div>
                            )}
                          </Col>
                        </Row>
                        <Row className={classes.newElementFormRow}>
                          <Col xl={12} style={{ position: 'relative' }}>
                            <BiLock className={classes.inputIcon} />
                            <span className={classes.formBorder}></span>
                            <Form.Control
                              type={showPassword ? "password" : "text"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="password"
                              className={classes.elementFormInput}
                              placeholder="Password"
                            />
                            {showPassword ?
                              <AiOutlineEyeInvisible style={{ position: 'absolute', right: '5%', top: '33%', fontSize: '20px' }} onClick={() => setShowPassword(!showPassword)} />
                              :
                              <AiOutlineEye style={{ position: 'absolute', right: '5%', top: '33%', fontSize: '20px' }} onClick={() => setShowPassword(!showPassword)} />
                            }
                          </Col>
                          <Col xl={12} style={{ position: 'relative', alignItems: 'flex-end', justifyContent: 'flex-end', display: 'flex' }}>
                            {errors.password && touched.password && (
                              <div style={{ color: 'red', fontSize: '12px' }}>{errors.password} </div>
                            )}
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className={classes.forgot} style={{ cursor: 'pointer' }}>Forgot Password?</div>
                          </Col>
                        </Row>
                      </Form.Group>

                      <Row className={classes.newValidationFormRow}>
                        <Col xl={12}>
                          {error && (
                            <div style={{ color: 'red', fontSize: '14px', justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop: '20px' }}>
                              {error}
                            </div>
                          )}
                          <div style={{ marginTop: '50px' }}>
                            <button type="submit" className={classes.loginBtn}>Login</button>
                          </div>
                          <div style={{ textAlign: 'center', marginTop: '24px' }}>
                            <div style={{ color: '#48576ECC' }}>Don’t have an account? <span className={classes.signup} style={{ cursor: 'pointer' }}>Sign Up Now</span></div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;
