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
  setCodeTestProgress,
} from "../../app/firebase/firestore/codingCollection";
import { selectProfileData } from "../Profile/profileSlice";
import { selectUid } from "../auth/authSlice";

const CodeAttempt = ({
  getCurrentTask,
  myCodingTaskesLoaded,
  uid,
  currentTaskProgressLoaded,
}) => {
  const params = useParams();
  useDocListener({
    query: () => myCodeTestDocListener(params.title),
    data: (codingTasks) => myCodingTaskesLoaded([codingTasks]),
    deps: [],
    stopListener: true,
    shouldExecuteQuery: !getCurrentTask(params.title),
  });

  useDocListener({
    query: () => myCodeTestProgressListener(params.title, uid),
    data: (codingProgress) => currentTaskProgressLoaded(codingProgress),
    deps: [],
    stopListener: true,
    shouldExecuteQuery: true,
  });

  const currentTask = getCurrentTask(params.title);
  const testCases = currentTask?.testCases;
  return (
    <>
      <Card style={{ margin: "10px" }}>
        <pre>{currentTask?.description.replace(/\\n/g, "\n")}</pre>
      </Card>
      <CodeEditor testCases={testCases} taskId={params.title} />
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
