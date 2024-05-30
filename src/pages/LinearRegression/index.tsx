/// <reference path="./index.d.ts" />

import React, { useState } from "react";
import { Steps, theme } from "antd";
// import { Button, message, } from "antd";

import Tuning from "./components/Tuning";
import CollisionAlert from "./components/Training";
import LinearRegressionDescription from "./components/introduction";

const LinearRegression: React.FC = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  // const prev = () => {
  //   setCurrent(current - 1);
  // };

  const steps = [
    {
      title: "Introduction",
      content: <LinearRegressionDescription next={next}/>,
    },
    {
      title: "Tuning Hyperparameters",
      content: <Tuning next={next} />,
    },
    {
      title: "Model Training",
      content: <CollisionAlert />,
    },
    {
      title: "Results & Evaluation",
      content: "Last-content",
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    minHeight: "calc(100vh - 238px)",
    // textAlign: "center",
    padding: 16,
    // color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      {/* <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div> */}
    </>
  );
};

export default LinearRegression;
