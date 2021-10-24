import { Button, Layout, Typography } from "antd";
import React from "react";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";

import SideBar from "../nav/SideBar";
import TopAppBar from "../nav/TopAppBar";
import { useDispatch, useSelector } from "react-redux";
import { selectDisplayName } from "../auth/authSlice";
import { useEffect } from "react";
import { tasksLoaded } from "./homeSlice";
import { studentTasksListener } from "../../app/firebase/firestoreService";
import OnlineClass from "../onlineClass/OnlineClass";
import ProfileData from "../Profile/ProfileData";
import { Redirect } from "react-router";
import CodeEditor from "../ide/CodeEditor";
import CodingTasks from "../ide/CodingTasks";
import CodeAttempt from "../ide/CodeAttempt";

function Home() {
  const { Header, Sider, Content, Footer } = Layout;
  const username = useSelector(selectDisplayName);
  const dispatch = useDispatch();
  useEffect(() => {
    studentTasksListener(1, "cse", "A").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let tasks = [];
        let docData = doc.data();
        tasks.push({ ...docData, time: docData.time.toDate().toString() });
        dispatch(tasksLoaded(tasks));
      });
    });
  }, [username]);

  return (
    <>
      <TopAppBar />
      <Layout hasSider={true} style={{ minHeight: "100vh" }}>
        <SideBar />
        <Content style={{ marginTop: "50px" }}>
          <Switch>
            <Route exact path="/home">
              <>
                <Typography.Title>Welcome {username}</Typography.Title>
              </>
            </Route>
            <Route exact path="/home/onlineClasses">
              <OnlineClass />
            </Route>
            <Route exact path="/home/profile">
              <ProfileData />
            </Route>
            <Route exact path="/home/ide">
              <CodeEditor />
            </Route>
            <Route exact path="/home/test">
              <CodingTasks />
            </Route>
            <Route path="/home/test/attempt/:title">
              <CodeAttempt />
            </Route>
            <Redirect to="/home" />
          </Switch>
        </Content>
      </Layout>
    </>
  );
}

export default Home;
