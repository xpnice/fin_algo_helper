/// <reference path="./index.d.ts" />

import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme, Empty } from "antd";
import LinearRegression from "../LinearRegression";
import { parseSubString } from "../../utils/general";

const { Header, Content, Sider } = Layout;

// 样式常量
const SIDER_WIDTH = 230;

// 枚举常量
const NAV_ITEM_LABELS = ["Machine Learning", "Deep Learning"];
const SIDER_ML_ITEM_LABELS = {
  "Supervised Learning": [
    "Linear Regression",
    "Logistic Regression",
    "Support Vector Machine",
    "Desicision Tree",
    "Random Forest",
    "K-Nearest Neighbors",
  ],
  "Unsupervised Learning": ["K-Means Clustering"],
  "Reinforcement Learning": [],
};

// 组件枚举
const CONTENT_PAGES = [[<LinearRegression />]];

// 初始化顶部导航数据结构
const navItems: MenuProps["items"] = NAV_ITEM_LABELS.map((key, index) => ({
  key: `nav${index}`,
  label: NAV_ITEM_LABELS[index],
}));

// 初始化侧边导航数据结构
const mlSiderItems: MenuProps["items"] = Object.entries(
  SIDER_ML_ITEM_LABELS
).reduce((menuItems: MenuProps["items"], [category, labels], index) => {
  const key = `sider${index}`;

  const children =
    labels.length > 0
      ? labels.map((label, j) => ({
          key: `sider${index}-${j}`,
          label,
        }))
      : undefined;

  const menuItem = {
    key,
    label: category,
    children,
  };

  return [...(menuItems || []), menuItem];
}, []);

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // 导航状态
  const [navSelectedKeys, setNavSelectedKeys] = useState(["nav0"]);
  const [siderSelectedKeys, setSiderSelectedKeys] = useState(["sider0-0"]);

  //切换侧边导航
  function changeSiderSelectedKey(item: any) {
    console.log(item);
    if (item.keyPath.length < 2) return;
    setSiderSelectedKeys([item.key]);
  }

  // 切换顶部导航
  function changeNavSelectedKey(item: { key: string; keyPath: string[] }) {
    setNavSelectedKeys([item.key]);
  }

  return (
    <Layout style={{ maxHeight: "100vh" }}>
      <Header
        style={{
          position: "fixed",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["nav0"]}
          items={navItems}
          style={{ flex: 1, minWidth: 0, userSelect: "none" }}
          selectedKeys={navSelectedKeys}
          onSelect={changeNavSelectedKey}
        />
      </Header>
      <Layout>
        <Sider
          width={SIDER_WIDTH}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 64,
            bottom: 0,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["sider0-0"]}
            defaultOpenKeys={["sider0"]}
            style={{ height: "100%", borderRight: 0, userSelect: "none" }}
            items={mlSiderItems}
            selectedKeys={siderSelectedKeys}
            onSelect={changeSiderSelectedKey}
          />
        </Sider>
        <Layout
          style={{
            padding: `64px 24px 24px ${SIDER_WIDTH + 24}px`,
            minHeight: "100vh",
          }}
        >
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Machine Learning</Breadcrumb.Item>
            <Breadcrumb.Item>
              {
                /* TODO: 并不优雅 想办法优化一下 */
                Object.keys(SIDER_ML_ITEM_LABELS)[
                  parseSubString(siderSelectedKeys[0])[0]
                ]
              }
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {
                /* TODO: 并不优雅 想办法优化一下 */
                SIDER_ML_ITEM_LABELS[
                  Object.keys(SIDER_ML_ITEM_LABELS)[
                    parseSubString(siderSelectedKeys[0])[0]
                  ] as
                    | "Supervised Learning"
                    | "Unsupervised Learning"
                    | "Reinforcement Learning"
                ][parseSubString(siderSelectedKeys[0])[1]]
              }
            </Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              marginLeft: 0,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflowY: "scroll",
            }}
          >
            {(function () {
              try {
                const [siderIndex, itemIndex] = parseSubString(
                  siderSelectedKeys[0]
                );
                if (
                  CONTENT_PAGES[siderIndex] &&
                  CONTENT_PAGES[siderIndex][itemIndex]
                )
                  return CONTENT_PAGES[siderIndex][itemIndex];
                throw new Error("Page Not Found");
              } catch {
                return (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    imageStyle={{
                      marginTop: "calc(50vh - 134px)",
                    }}
                  />
                );
              }
            })()}
            {/* <p>long content</p>
            {
              // indicates very long content
              Array.from({ length: 100 }, (_, index) => (
                <React.Fragment key={index}>
                  {index % 20 === 0 && index ? "more" : "..."}
                  <br />
                </React.Fragment>
              ))
            } */}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
