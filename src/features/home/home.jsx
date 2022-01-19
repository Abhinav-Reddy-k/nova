import { Layout } from "antd";
import React, { Suspense, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import SideBar from "../nav/SideBar";
import TopAppBar from "../nav/TopAppBar";

import LoadingSpinner from "../../app/common/LoadingSpinner";
import ErrorBoundary from "../../app/common/ErrorBoundary";
import { useSelector } from "react-redux";
import { selectRequestedUrl } from "./homeSlice";

function Home() {
  const { Header, Content, Footer } = Layout;
  const requestedUrl = useSelector(selectRequestedUrl);
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/home/${requestedUrl}`);
  }, []);

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
