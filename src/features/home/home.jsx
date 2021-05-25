import { Button, Layout } from "antd";
import React from "react";
import { Link } from "react-router-dom";

import SideBar from "../nav/SideBar";
import TopAppBar from "../nav/TopAppBar";

function Home() {


  const { Header, Sider, Content, Footer } = Layout;

  return (
    <>
      <TopAppBar />
      <Layout hasSider={true} style={{ minHeight: "100vh" }}>
        <SideBar />
        <Content style={{ marginTop: "50px" }}>
          <Link to={"/profile"}>
            <Button>profile</Button>
          </Link>
          <Link to={"/registration/profile"}>
            <Button>R</Button>
          </Link>
        </Content>
      </Layout>
    </>
  );
}

export default Home;

// <Link to={"/resetPassword"}>
//         <Button>Reset Password</Button>
//       </Link>
//       <Link to={"/login"}>
//         <Button>Login</Button>
//       </Link>
//       <Link to={"/register"}>
//         <Button>Register</Button>
//       </Link>
//       <Link to={"/verifyEmail"}>
//         <Button>email verify</Button>
//       </Link>
{
  /* <Button onClick={onSignOut}>Sign out</Button> */
}
