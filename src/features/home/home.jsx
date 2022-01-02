import { Layout } from "antd";
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

import SideBar from "../nav/SideBar";
import TopAppBar from "../nav/TopAppBar";
import { useDispatch, useSelector } from "react-redux";
import { selectDisplayName } from "../auth/authSlice";
import { useEffect } from "react";
import { tasksLoaded } from "./homeSlice";
import { studentTasksListener } from "../../app/firebase/firestoreService";

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
                <Outlet />
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
