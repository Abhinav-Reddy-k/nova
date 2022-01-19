import React from "react";
import CodeEditor from "./CodeEditor";
import { Card } from "antd";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentTask, myCodingTaskesLoaded } from "./codeTasksSlice";
import useDocListener from "../../app/hooks/useDocListener";
import { myCodeTestDocListener } from "../../app/firebase/firestore/codingCollection";

const CodeAttempt = ({ getCurrentTask, myCodingTaskesLoaded }) => {
  const params = useParams();
  useDocListener({
    query: () => myCodeTestDocListener(params.title),
    data: (codingTasks) => myCodingTaskesLoaded([codingTasks]),
    deps: [],
    stopListener: true,
    shouldExecuteQuery: !getCurrentTask(params.title),
  });
  const currentTask = getCurrentTask(params.title);
  const testCases = currentTask?.testCases;
  return (
    <>
      <Card style={{ margin: "10px" }}>
        <pre>{currentTask?.description.replace(/\\n/g, "\n")}</pre>
      </Card>
      <CodeEditor testCases={testCases} />
    </>
  );
};

const mapStateToProps = (state) => ({
  getCurrentTask: (id) => getCurrentTask(id)(state),
});

const mapDispatchToProps = (dispatch) => ({
  myCodingTaskesLoaded: (codingTasks) =>
    dispatch(myCodingTaskesLoaded(codingTasks)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CodeAttempt);
