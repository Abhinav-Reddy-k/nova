import { Button, Layout, Typography } from "antd";
import React, { lazy, Suspense } from "react";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";

import SideBar from "../nav/SideBar";
import TopAppBar from "../nav/TopAppBar";
import { useDispatch, useSelector } from "react-redux";
import { selectDisplayName } from "../auth/authSlice";
import { useEffect } from "react";
import { tasksLoaded } from "./homeSlice";
import { studentTasksListener } from "../../app/firebase/firestoreService";
import { Redirect } from "react-router";

const OnlineClass = lazy(() => import("../onlineClass/OnlineClass"));
const ProfileData = lazy(() => import("../Profile/ProfileData"));
const CodeEditor = lazy(() => import("../ide/CodeEditor"));
const CodingTasks = lazy(() => import("../ide/CodingTasks"));
const CodeAttempt = lazy(() => import("../ide/CodeAttempt"));
import LoadingSpinner from "../../app/common/LoadingSpinner";

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
      <Layout hasSider={true} style={{ height: "100vh" }}>
        <SideBar style={{ marginTop: "45px" }} />
        <Layout>
          <Header
            style={{
              padding: 0,
              background: "#fff",
              height: "45px",
              lineHeight: "45px",
            }}
          >
            <TopAppBar />
          </Header>
          <Content
            style={{
              display: "block",
              overflow: "scroll",
            }}
          >
            <Suspense fallback={<LoadingSpinner />}>
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
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default Home;
