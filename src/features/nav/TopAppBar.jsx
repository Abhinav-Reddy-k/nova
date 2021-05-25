import { Menu } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { signOut } from "../../app/firebase/auth";
import { logout } from "../auth/authSlice";

function TopAppBar() {
  const dispatch = useDispatch();

  const onLogout = () => {
    signOut().then(() => {
      dispatch(logout());
    });
  };
  return (
    <Menu
      mode="horizontal"
      style={{ position: "fixed", width: "100%" }}
      defaultSelectedKeys={["logo"]}
    >
      <Menu.Item key="logo">NOVA</Menu.Item>
      <Menu.Item key="logout" onClick={onLogout} style={{ float: "right" }}>
        Logout
      </Menu.Item>
      <Menu.Item key="profile" style={{ float: "right" }}>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
    </Menu>
  );
}

export default TopAppBar;
