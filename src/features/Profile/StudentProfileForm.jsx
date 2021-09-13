import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Typography,
} from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { setStudentProfileData } from "../../app/firebase/firestoreService";

import { selectCurrentUser } from "../auth/authSlice";

function StudentProfileForm() {
  const { displayName, uid, photoURL, email } = useSelector(selectCurrentUser);
  const onFinish = async (val) => {
    const studentProfile = { ...val, uid, displayName, photoURL, email };
    try {
      await setStudentProfileData(studentProfile);
      message.success("Profile update successfull");
      window.location.reload();
    } catch (err) {
      message.error(err.message);
    }
  };

  const onFinishFailed = (err) => console.log(err);

  return (
    <>
      <Row justify="space-around">
        <Col span={15}>
          <Typography.Title align="center" level={4}>
            Student Profile Data
          </Typography.Title>
          <Typography.Title level={5} type="secondary" align="center">
            Please input your data
          </Typography.Title>
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
            <Form.Item
              name="rollno"
              label="Roll Number"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please input your Roll Number!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="branch" label="Branch">
              <Select>
                <Select.Option value="cse">CSE</Select.Option>
                <Select.Option value="ece">ECE</Select.Option>
                <Select.Option value="it">IT</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="section"
              label="Section"
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
              <Input />
            </Form.Item>
            <Form.Item
              name="from_year"
              label="From Year"
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
              <InputNumber min={2017} />
            </Form.Item>
            <Form.Item
              name="to_year"
              label="To Year"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please input collage final academic year!!",
                },
                {
                  type: "number",
                },
              ]}
            >
              <InputNumber min={2017} />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="student-form-button"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default StudentProfileForm;
