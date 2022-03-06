import React, { useEffect } from "react";
import CodeEditor from "./CodeEditor";
import { Card } from "antd";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  currentTaskProgressLoaded,
  getCurrentTask,
  myCodingTaskesLoaded,
} from "./codeTasksSlice";
import useDocListener from "../../app/hooks/useDocListener";
import {
  myCodeTestDocListener,
  myCodeTestProgressListener,
} from "../../app/firebase/firestore/codingCollection";
import { selectUid } from "../auth/authSlice";

const CodeAttempt = ({
  getCurrentTask,
  myCodingTaskesLoaded,
  uid,
  currentTaskProgressLoaded,
}) => {
  const { id } = useParams();
  useDocListener({
    query: () => myCodeTestDocListener(id),
    data: (codingTasks) => myCodingTaskesLoaded([codingTasks]),
    deps: [],
    stopListener: true,
    shouldExecuteQuery: !getCurrentTask(id),
  });

  useDocListener({
    query: () => myCodeTestProgressListener(id, uid),
    data: (codingProgress) => currentTaskProgressLoaded(codingProgress),
    deps: [],
    stopListener: true,
    shouldExecuteQuery: true,
  });

  const currentTask = getCurrentTask(id);
  const testCases = currentTask?.testCases;
  return (
    <>
      <Card style={{ margin: "10px" }}>
        <pre>{currentTask?.description.replace(/\\n/g, "\n")}</pre>
      </Card>
      <CodeEditor testCases={testCases} taskId={id} />
    </>
  );
};

const mapStateToProps = (state) => ({
  getCurrentTask: (id) => getCurrentTask(id)(state),
  uid: selectUid(state),
});

const mapDispatchToProps = (dispatch) => ({
  myCodingTaskesLoaded: (codingTasks) =>
    dispatch(myCodingTaskesLoaded(codingTasks)),
  currentTaskProgressLoaded: (codingProgress) =>
    dispatch(currentTaskProgressLoaded(codingProgress)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CodeAttempt);
