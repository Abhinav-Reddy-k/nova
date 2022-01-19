import { Button, Form, Input, InputNumber, message, Select } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { setStudentProfileData } from "../../app/firebase/firestoreService";

import { selectCurrentUser } from "../auth/authSlice";
import AuthHeader from "../auth/ui/AuthHeader";
import ReistrationSteps from "../registration/ReistrationSteps";

function StudentProfileForm() {
  const { displayName, photoURL, email, uid } = useSelector(selectCurrentUser);
  const onFinish = async (val) => {
    const studentProfile = { ...val, displayName, photoURL, email };
    try {
      await setStudentProfileData(studentProfile, uid);
      window.location.reload();
    } catch (err) {
      message.error(err.message);
    }
  };

  const onFinishFailed = (err) => console.log(err);

  return (
    <>
      <div id="main-wrapper" className="oxyy-login-register bg-dark">
        <div className="container">
          <div className="row g-0 min-vh-100 py-4 py-md-5">
            <ReistrationSteps currentStep={2} />
            <AuthHeader
              bgimg={
                "https://static.wixstatic.com/media/11062b_4456ba5e63714bc79e2a51e9218fd0d1~mv2.jpg/v1/crop/x_14,y_0,w_4972,h_3333/fill/w_560,h_374,al_c,q_80,usm_0.66_1.00_0.01/Work%20Desk.webp"
              }
              head={"Your Profile"}
              sub={"Keep your profile up to date"}
            />
            <div className="col-lg-5 shadow-lg d-flex align-items-center rounded-3 rounded-start-0 bg-dark">
              <div className="container my-auto py-5">
                <div className="row">
                  <div className="col-11 col-lg-10 mx-auto">
                    <h3 className="text-white text-center mb-4">
                      Students Profile Data
                    </h3>
                    <p className="text-muted text-center mb-4">
                      Enter your course details.
                    </p>
                    <Form
                      name="student-info"
                      labelAlign="left"
                      initialValues={{
                        remember: true,
                      }}
                      labelCol={{ span: 5 }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                    >
                      <div className="mb-3">
                        <label className="form-label text-light">Roll No</label>
                        <Form.Item
                          name="rollno"
                          hasFeedback
                          rules={[
                            {
                              required: true,
                              message: "Please input your Roll Number!",
                            },
                          ]}
                        >
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Roll Number"
                          />
                        </Form.Item>
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-light">Branch</label>
                        <Form.Item name="branch">
                          <Select>
                            <Select.Option value="cse">CSE</Select.Option>
                            <Select.Option value="ece">ECE</Select.Option>
                            <Select.Option value="it">IT</Select.Option>
                          </Select>
                        </Form.Item>
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-light">Section</label>
                        <Form.Item
                          name="section"
                          hasFeedback
                          rules={[
                            {
                              required: true,
                              message: "Please input your section",
                            },
                            {
                              max: 1,
                              message: "only one letter",
                            },
                          ]}
                        >
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Section"
                          />
                        </Form.Item>
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-light">
                          From Year
                        </label>
                        <Form.Item
                          name="from_year"
                          hasFeedback
                          rules={[
                            {
                              required: true,
                              message: "Please input collage joining year !!",
                            },
                            {
                              type: "number",
                            },
                          ]}
                        >
                          <InputNumber
                            type="number"
                            className="form-control"
                            placeholder="Enter From Year"
                          />
                        </Form.Item>
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-light">To Year</label>
                        <Form.Item
                          name="to_year"
                          hasFeedback
                          rules={[
                            {
                              required: true,
                              message:
                                "Please input collage final academic year!!",
                            },
                            {
                              type: "number",
                            },
                          ]}
                        >
                          <InputNumber
                            type="number"
                            className="form-control"
                            placeholder="Enter To Year"
                          />
                        </Form.Item>
                      </div>
                      <div className="d-grid my-4">
                        <Form.Item>
                          <button className="btn btn-primary" htmlType="submit">
                            Submit
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

export default StudentProfileForm;
