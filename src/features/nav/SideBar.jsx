import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { AiOutlineCodeSandbox, AiTwotoneFileText } from "react-icons/ai";
import { FaBookReader, FaLaptopCode } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

import { SiGoogleclassroom } from "react-icons/si";

function SideBar() {
  const { Sider } = Layout;
  const { SubMenu, Item } = Menu;
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed) => setCollapsed(collapsed);
  return (
    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
      }}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
    >
      <Menu theme="dark" mode="inline">
        <Item key="logo" icon={<MdDashboard />}>
          <Link to="/home">Dashboard</Link>
        </Item>
        <Item key="onlineClasses" icon={<SiGoogleclassroom />}>
          <Link to="/home/onlineClasses">Online Classes</Link>
        </Item>

        <Item key="ide" icon={<AiOutlineCodeSandbox />}>
          <Link to="/home/ide">Code Editor</Link>
        </Item>

        <Item key="codetask" icon={<FaLaptopCode />}>
          <Link to="/home/test">Coding Test</Link>
        </Item>
        <Item key="resources" icon={<FaBookReader />}>
          <Link to="/home/resources">Study Material</Link>
        </Item>
      </Menu>
    </Sider>
  );
}

export default SideBar;
