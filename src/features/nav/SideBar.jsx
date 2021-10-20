import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  AiOutlineDesktop,
  AiOutlineTeam,
  AiTwotoneFileText,
} from "react-icons/ai";

import { SiGoogleclassroom } from "react-icons/si";

function SideBar() {
  const { Sider } = Layout;
  const { SubMenu } = Menu;
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed) => setCollapsed(collapsed);
  return (
    <Sider
      style={{ marginTop: "50px" }}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
    >
      <Menu theme="dark" mode="inline">
        <Menu.Item key="1" icon={<SiGoogleclassroom />}>
          <Link to="/home/onlineClasses" replace>
            Online Classes
          </Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<AiOutlineDesktop />}>
          Completed Tasks
        </Menu.Item>
        <SubMenu key="sub1" title="Study Material" icon={<AiOutlineTeam />}>
          <Menu.Item key="3">Java</Menu.Item>
          <Menu.Item key="4">Os</Menu.Item>
          <Menu.Item key="5">DBMS</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title="Results">
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
