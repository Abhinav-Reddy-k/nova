import { Form, message } from "antd";
import React from "react";

import { sendPasswordReset } from "../../app/firebase/authService";
import { Link, useNavigate } from "react-router-dom";
import AuthHeader from "./ui/AuthHeader";

function ResetPassword() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      await sendPasswordReset(values.email);
      message.success("Password reset email sent!");
      navigate("/login");
    } catch (err) {
      message.error(err.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div id="main-wrapper" className="oxyy-login-register bg-dark">
        <div className="container">
          <div className="row g-0 min-vh-100 py-4 py-md-5">
            <AuthHeader
              bgimg={
                "https://media.istockphoto.com/photos/login-and-password-cyber-security-concept-data-protection-and-secured-picture-id1271787791?b=1&k=20&m=1271787791&s=170667a&w=0&h=riIFl9T6XhZgLYlSoTLdvvFf0JQpnmsoFyUW82MRP9c="
              }
              head={"Don't worry,"}
              sub={" We are here help you to recover your password."}
            />

            <div className="col-lg-5 shadow-lg d-flex align-items-center rounded-3 rounded-start-0 bg-dark">
              <div className="container my-auto py-5">
                <div className="row">
                  <div className="col-11 col-lg-10 mx-auto">
                    <h3 className="text-white text-center mb-4">
                      Forgot password?
                    </h3>
                    <p className="text-muted text-center mb-4">
                      Enter the email address you used when you joined and we
                      will send you a link to reset your password.
                    </p>
                    <Form
                      name="normal_login"
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      className="form-dark"
                    >
                      <div className="mb-3">
                        <label
                          className="form-label text-light"
                          htmlFor="emailAddress"
                        >
                          Email address
                        </label>
                        <Form.Item
                          name="email"
                          hasFeedback
                          rules={[
                            {
                              required: true,
                              message: "Please input your Email!",
                            },
                            {
                              type: "email",
                            },
                          ]}
                        >
                          <input
                            type="text"
                            className="form-control"
                            id="emailAddress"
                            required=""
                            placeholder="Enter Email"
                          />
                        </Form.Item>
                      </div>

                      <div className="d-grid my-4">
                        <Form.Item>
                          <button className="btn btn-primary" htmlType="submit">
                            Continue
                          </button>
                        </Form.Item>
                      </div>
                    </Form>
                    <div className="d-flex align-items-center my-3">
                      <hr className="flex-grow-1 bg-dark-4" />
                      <span className="mx-2 text-2 text-muted">
                        Or Sign In with Social
                      </span>
                      <hr className="flex-grow-1 bg-dark-4" />
                    </div>
                    <div className="d-flex flex-column align-items-center mb-4">
                      <ul className="social-icons social-icons-circle">
                        <li className="social-icons-facebook">
                          <a
                            href="#"
                            data-bs-toggle="tooltip"
                            data-bs-original-title="Log In with Facebook"
                          >
                            <i className="fab fa-facebook-f"></i>
                          </a>
                        </li>
                        <li className="social-icons-twitter">
                          <a
                            href="#"
                            data-bs-toggle="tooltip"
                            data-bs-original-title="Log In with Twitter"
                          >
                            <i className="fab fa-twitter"></i>
                          </a>
                        </li>
                        <li className="social-icons-google">
                          <a
                            href="#"
                            data-bs-toggle="tooltip"
                            data-bs-original-title="Log In with Google"
                          >
                            <i className="fab fa-google"></i>
                          </a>
                        </li>
                        <li className="social-icons-linkedin">
                          <a
                            href="#"
                            data-bs-toggle="tooltip"
                            data-bs-original-title="Log In with Linkedin"
                          >
                            <i className="fab fa-linkedin-in"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <p className="text-2 text-center text-light mb-0">
                      Return to
                      <Link to={"/login"}>Sign In</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
