import React from "react";
import { Button, Card, message } from "antd";
import { Link } from "react-router-dom";

const TaskCard = ({ taskData, index }) => {
  const { title, teacherPhoto, isStarted, subject, section, teacher, id } =
    taskData;
  return (
    <Card
      hoverable
      key={index}
      style={{
        width: 330,
        margin: "8px",
      }}
      cover={
        <img
          alt="example"
          style={{ objectFit: "cover" }}
          height="250px"
          width="200px"
          src={teacherPhoto}
        />
      }
      actions={[
        <Link key="1" to={`/home/test/attempt/${id}`}>
          <Button>Attempt</Button>
        </Link>,
      ]}
    >
      <Card.Meta title={title} description={`${subject} (${section})`} />
      <pre>
        <br />
        {`  -- ${teacher}`}
      </pre>
    </Card>
  );
};

export default TaskCard;
