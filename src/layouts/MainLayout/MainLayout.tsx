import { Layout, Menu } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import React from "react";
import styles from "./MainLayout.module.css";
type propsType = {
  children: React.ReactNode;
};

const items = [
  { label: "item 1", key: "item-1" }, // remember to pass the key prop
  { label: "item 2", key: "item-2" }, // which is required
  {
    label: "sub menu",
    key: "submenu",
    children: [{ label: "item 3", key: "submenu-item-1" }],
  },
];

export default function MainLayout({ children }: propsType) {
  return (
    <div>
      <Layout className={styles.layout}>
        <Header className="header" style={{ display: "flex" }}>
          <div
            className="logo"
            style={{
              color: "#fff",
              fontSize: "24px",
            }}
          >
            HRM
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            //defaultSelectedKeys={["2"]}
            items={items}
          />
        </Header>
        <Layout style={{ flexDirection: "row" }}>
          <Sider
            width={200}
            className="site-layout-background"
            breakpoint="md"
            collapsedWidth="0"
          >
            <Menu
              mode="inline"
              //defaultSelectedKeys={["1"]}
              //defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
              items={items}
            />
          </Sider>
          <Layout style={{ width: "calc(100vw - 200px - 48px)" }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}
