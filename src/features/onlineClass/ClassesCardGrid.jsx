import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentClasses } from "./classesSlice";
import { Button, Card, Col, Row } from "antd";

function ClassesCardGrid() {
  const { Meta } = Card;
  const currentClasses = useSelector(selectCurrentClasses);
  return (
    <>
      <Row justify="center">
        {currentClasses.map((cls, index) => {
          let start_time = cls.startTime.split(" ");
          return (
            <Col key={index}>
              <Card
                hoverable
                key={index}
                style={{
                  width: 260,
                  margin: "8px",
                }}
                cover={<img alt="example" src={cls.teacherPhoto} />}
                actions={[
                  <Button key={index}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={cls.classUrl}
                    >
                      Join
                    </a>
                  </Button>,
                ]}
              >
                <Meta
                  title={`${cls.subject} (${cls.section})`}
                  description={cls.description}
                />
                <br />
                <pre>Started At : {start_time[4]}</pre>
                <pre>{`On ${start_time[2]} ${start_time[1]}`}</pre>
                <pre> --Taught by {cls.teacher}</pre>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default ClassesCardGrid;
