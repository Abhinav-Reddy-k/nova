import React from "react";
import { Row } from "antd";
import { useSelector } from "react-redux";
import { selectCurrentCodingTasks } from "./codeTasksSlice";
import TaskCard from "./TaskCard";
import Nodata from "../../app/common/Nodata";

const CodeTestsGrid = () => {
  const myCodingTasks = useSelector(selectCurrentCodingTasks);
  return (
    <Row justify="center">
      {myCodingTasks.length === 0 && <Nodata />}

      {myCodingTasks.map((task, index) => (
        <TaskCard key={index} taskData={task} index={index} />
      ))}
    </Row>
  );
};

export default CodeTestsGrid;
