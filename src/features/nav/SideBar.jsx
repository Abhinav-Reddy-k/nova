import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  AiFillCalculator,
  AiOutlineCodeSandbox,
  AiOutlineDesktop,
  AiOutlineTeam,
  AiTwotoneFileText,
} from "react-icons/ai";
import { FaLaptopCode } from "react-icons/fa";

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
        <Item key="logo">
          <Link to="/home" replace>
            NOVA
          </Link>
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
        <SubMenu key="sub1" title="Study Material" icon={<AiOutlineTeam />}>
          <Menu.Item key="3">Java</Menu.Item>
          <Menu.Item key="4">Os</Menu.Item>
          <Menu.Item key="5">DBMS</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title="Results" icon={AiFillCalculator}>
          <Menu.Item key="6">Java</Menu.Item>
          <Menu.Item key="8">os</Menu.Item>
        </SubMenu>
        <Menu.Item key="9" icon={<AiTwotoneFileText />}>
          Assignments
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default SideBar;
