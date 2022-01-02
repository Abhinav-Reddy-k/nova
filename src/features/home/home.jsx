import { Button, Layout, Typography } from "antd";
import React, { lazy, Suspense } from "react";
import { Link, Routes, Route, Navigate } from "react-router-dom";

import SideBar from "../nav/SideBar";
import TopAppBar from "../nav/TopAppBar";
import { useDispatch, useSelector } from "react-redux";
import { selectDisplayName } from "../auth/authSlice";
import { useEffect } from "react";
import { tasksLoaded } from "./homeSlice";
import { studentTasksListener } from "../../app/firebase/firestoreService";

const OnlineClass = lazy(() => import("../onlineClass/OnlineClass"));
const ProfileData = lazy(() => import("../Profile/ProfileData"));
const CodeEditor = lazy(() => import("../ide/CodeEditor"));
const CodingTasks = lazy(() => import("../ide/CodingTasks"));
const CodeAttempt = lazy(() => import("../ide/CodeAttempt"));
import LoadingSpinner from "../../app/common/LoadingSpinner";
import ErrorBoundary from "../../app/common/ErrorBoundary";

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
            <ErrorBoundary>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <>
                        <Typography.Title>Welcome {username}</Typography.Title>
                      </>
                    }
                  ></Route>
                  <Route
                    path="/onlineClasses"
                    element={<OnlineClass />}
                  ></Route>
                  <Route path="/profile" element={<ProfileData />}></Route>
                  <Route path="/ide" element={<CodeEditor />}></Route>
                  <Route path="/test" element={<CodingTasks />}></Route>
                  <Route
                    path="/test/attempt/:title"
                    element={<CodeAttempt />}
                  ></Route>
                  <Route path="/*" element={<Navigate to="/home" />}></Route>
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </Content>
          <Footer
            style={{ textAlign: "center", height: "20px", padding: "0px" }}
          >
            Nova ©2021 Created by Abhinav Reddy
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default Home;
