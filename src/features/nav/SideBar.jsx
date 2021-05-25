import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { AiOutlineDesktop, AiOutlinePieChart, AiOutlineTeam, AiOutlineUser, AiTwotoneFileText } from "react-icons/ai";

function SideBar() {
  const { Sider } = Layout;
  const { SubMenu } = Menu;
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed) => setCollapsed(collapsed);
  return (
    <Sider
      style={{ marginTop:"50px" }}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
    >
      <Menu theme="dark" mode="inline">
        <Menu.Item key="1">Option 1</Menu.Item>
        <Menu.Item key="2" icon={<AiOutlineDesktop />}>
          Option 2
        </Menu.Item>
        <SubMenu key="sub1" title="User" icon={<AiOutlineTeam/>}>
          <Menu.Item key="3">Tom</Menu.Item>
          <Menu.Item key="4">Bill</Menu.Item>
          <Menu.Item key="5">Alex</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title="Team">
          <Menu.Item key="6">Team 1</Menu.Item>
          <Menu.Item key="8">Team 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="9" icon={<AiTwotoneFileText />}>
          Files
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default SideBar;
