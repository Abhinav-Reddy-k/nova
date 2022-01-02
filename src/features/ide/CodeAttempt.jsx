import React from "react";
import CodeEditor from "./CodeEditor";
import { Card } from "antd";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentTask } from "./codeTasksSlice";

const CodeAttempt = () => {
  const params = useParams();
  const currentTask = useSelector(getCurrentTask(params.title));
  const testCases = currentTask["testCases"];
  return (
    <>
      <Card style={{ margin: "10px" }}>
        <pre>{currentTask.description.replace(/\\n/g, "\n")}</pre>
      </Card>
      <CodeEditor testCases={testCases} />
    </>
  );
};

export default CodeAttempt;
