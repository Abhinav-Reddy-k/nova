import { Form, message } from "antd";
import React from "react";

import { signUpWithEmail } from "../../app/firebase/authService";
import AuthHeader from "../auth/ui/AuthHeader";
import ReistrationSteps from "./ReistrationSteps";

function Register() {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try {
      await signUpWithEmail(values);
      message.success("Successfully registered");
    } catch (err) {
      if (err.code === "auth/weak-password") {
        message.error("The password is too weak.");
      } else {
        message.error(err.message);
      }
    }
  };

  return (
    <>
      <div id="main-wrapper" className="oxyy-login-register bg-dark">
        <div className="container">
          <div className="row g-0 min-vh-100 py-4 py-md-5">
            <ReistrationSteps currentStep={0} />

            <AuthHeader
              bgimg={
                "https://www.groovypost.com/wp-content/uploads/2021/04/email-laptop-featured.jpg"
              }
              head={"You're new here!"}
              sub={
                "Sign up with your email and personal details to get started!"
              }
            />

            <div className="col-lg-5 shadow-lg d-flex align-items-center rounded-3 rounded-start-0 bg-dark">
              <div className="container my-auto py-5">
                <div className="row">
                  <div className="col-11 col-lg-10 mx-auto">
                    <h3 className="text-white text-center mb-4">
                      Enter your details.
                    </h3>
                    <p className="text-muted text-center mb-4">
                      Enter the email address you use.
                    </p>
                    <Form
                      form={form}
                      name="register"
                      onFinish={onFinish}
                      scrollToFirstError
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
                          rules={[
                            {
                              type: "email",
                              message: "The input is not valid E-mail!",
                            },
                            {
                              required: true,
                              message: "Please input your E-mail!",
                            },
                          ]}
                        >
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Email"
                          />
                        </Form.Item>
                      </div>

                      <div className="mb-3">
                        <label
                          className="form-label text-light"
                          htmlFor="emailAddress"
                        >
                          Password
                        </label>
                        <Form.Item
                          name="password"
                          rules={[
                            {
                              required: true,
                              message: "Please input your password!",
                            },
                          ]}
                          hasFeedback
                        >
                          <input
                            type="password"
                            className="form-control"
                            id="emailAddress"
                            required=""
                            placeholder="Enter Password"
                          />
                        </Form.Item>
                      </div>

                      <div className="mb-3">
                        <label
                          className="form-label text-light"
                          htmlFor="emailAddress"
                        >
                          Confirm Password
                        </label>
                        <Form.Item
                          name="confirm"
                          dependencies={["password"]}
                          hasFeedback
                          rules={[
                            {
                              required: true,
                              message: "Please confirm your password!",
                            },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (
                                  !value ||
                                  getFieldValue("password") === value
                                ) {
                                  return Promise.resolve();
                                }

                                return Promise.reject(
                                  new Error(
                                    "The two passwords that you entered do not match!"
                                  )
                                );
                              },
                            }),
                          ]}
                        >
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Re-Enter Password"
                          />
                        </Form.Item>
                      </div>

                      <div className="mb-3">
                        <label
                          className="form-label text-light"
                          htmlFor="emailAddress"
                        >
                          User Name
                        </label>
                        <Form.Item
                          name="username"
                          tooltip="What do you want others to call you?"
                          rules={[
                            {
                              required: true,
                              message: "Please input your nickname!",
                              whitespace: true,
                            },
                          ]}
                        >
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Username"
                          />
                        </Form.Item>
                      </div>

                      <div className="d-grid my-4">
                        <Form.Item>
                          <button className="btn btn-primary" htmlType="submit">
                            Register
                          </button>
                        </Form.Item>
                      </div>
                    </Form>
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

export default Register;
